import { NextRequest, NextResponse } from "next/server";
import { generateImageFromScenePacket } from "@/lib/image/orchestrator";
import { TEST_SCENE } from "@/lib/db/memory";
import type { VariationMode } from "@/lib/image/types";

const VALID_MODES: VariationMode[] = [
  "default_read",
  "truer_read",
  "weirder_read",
  "roast_harder",
  "chaos",
  "cinematic",
];

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { variationMode = "default_read" } = body as {
    variationMode?: VariationMode;
  };

  if (!VALID_MODES.includes(variationMode)) {
    return NextResponse.json({ error: "Invalid variationMode for Fresh Read" }, { status: 400 });
  }

  // TODO: replace TEST_SCENE with session.scenePacket once sessions are wired
  const result = await generateImageFromScenePacket({
    scenePacket: TEST_SCENE,
    variationMode,
  });

  return NextResponse.json({
    imageUrl: result.imageUrl,
    prompt: result.variant.renderedPrompt,
  });
}
