import { NextRequest, NextResponse } from "next/server";
import { runAudioIntelligencePipeline } from "@/lib/audio/pipeline";

export const maxDuration = 120;

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log("[analyze] handler entered, id:", id);

  const formData = await req.formData();
  console.log("[analyze] formData parsed");
  const file = formData.get("audio") as File | null;
  if (!file) return NextResponse.json({ error: "audio_required" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "audio/wav";
  const durationSeconds = Number(formData.get("duration") ?? 0);

  let intelligence, humorFilter, imageSpecs, prompts, comparison;
  try {
    console.log("[analyze] starting pipeline, buffer size:", buffer.length, "mime:", mimeType, "duration:", durationSeconds);
    ({ intelligence, humorFilter, imageSpecs, prompts, comparison } = await runAudioIntelligencePipeline(
      buffer,
      mimeType,
      durationSeconds
    ));
    console.log("[analyze] pipeline complete");
  } catch (err) {
    console.error("[analyze] pipeline error:", err instanceof Error ? err.message : String(err));
    if (err instanceof Error && err.stack) console.error("[analyze] stack:", err.stack.split("\n").slice(0,5).join(" | "));
    return NextResponse.json({ error: "pipeline_failed", detail: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }

  return NextResponse.json({ intelligence, humorFilter, imageSpecs, prompts, comparison });
}
