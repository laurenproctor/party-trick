import { NextRequest, NextResponse } from "next/server";
import { ArtifactDraftSchema } from "@/lib/postcard/types";
import { getPostcardProvider } from "@/lib/postcard/provider";
import { randomUUID } from "crypto";
import { z } from "zod";

export const maxDuration = 30;

// POST /api/postcard/preview
// Accepts an ArtifactDraft payload (without id/createdAt — we generate those).
// Returns preview URLs, delivery estimate, layout metadata, and provider simulation.
// No persistence. No real mail. Safe to call freely during development.

const PreviewRequestSchema = ArtifactDraftSchema.omit({
  id: true,
  createdAt: true,
  statusInfo: true,
  previewFrontUrl: true,
  previewBackUrl: true,
  estimatedDeliveryWindow: true,
  frontLayoutId: true,
  backLayoutId: true,
}).extend({
  // Allow partial address for preview (user may still be filling it out)
  recipientAddress: z
    .object({
      name: z.string().default("Recipient"),
      line1: z.string().default("123 Main St"),
      line2: z.string().optional(),
      city: z.string().default("New York"),
      state: z.string().default("NY"),
      zip: z.string().default("10001"),
      country: z.string().default("US"),
    })
    .default({ name: "Recipient", line1: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "US" }),
});

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = PreviewRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const draft = {
    ...parsed.data,
    id: randomUUID(),
    createdAt: new Date(),
    statusInfo: { status: "previewing" as const },
  };

  try {
    const provider = await getPostcardProvider();
    const result = await provider.generatePreview(draft);

    return NextResponse.json({
      ok: true,
      draftId: draft.id,
      tone: draft.tone,
      format: draft.format,
      ...result,
    });
  } catch (err) {
    console.error("[postcard/preview] error:", err instanceof Error ? err.message : String(err));
    return NextResponse.json(
      { error: "preview_failed", detail: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

// GET /api/postcard/preview?id=...&side=front|back&tone=...
// Returns a simple visual placeholder — real implementation would render
// the postcard front/back using Satori or similar server-side renderer.
// For now: returns an SVG placeholder with tone color + side label.

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const side = searchParams.get("side") ?? "front";
  const tone = searchParams.get("tone") ?? "existential";
  const id = searchParams.get("id") ?? "preview";

  const toneColors: Record<string, string> = {
    loving: "#ff4444",
    brutal: "#0a0a0a",
    psychic: "#7c3aed",
    existential: "#0044ff",
    romantic: "#e11d48",
    corporate: "#6b7280",
    delusional_confidence: "#00d647",
  };

  const accent = toneColors[tone] ?? "#0044ff";
  const bg = side === "front" ? "#1a1a1a" : "#faf9f6";
  const fg = side === "front" ? "#ffffff" : "#0a0a0a";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="${bg}"/>
  <rect x="0" y="0" width="600" height="4" fill="${accent}"/>
  <text x="300" y="185" font-family="monospace" font-size="11" fill="${fg}" opacity="0.4" text-anchor="middle" letter-spacing="3">PARTY TRICK</text>
  <text x="300" y="215" font-family="monospace" font-size="14" fill="${accent}" text-anchor="middle" letter-spacing="2">${side.toUpperCase()} / ${tone.replace("_", " ").toUpperCase()}</text>
  <text x="300" y="240" font-family="monospace" font-size="9" fill="${fg}" opacity="0.25" text-anchor="middle">${id}</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
