import { NextRequest, NextResponse } from "next/server";
import { runTextPipeline } from "@/lib/audio/pipeline";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  let moment: string;
  try {
    const body = await req.json();
    moment = typeof body.moment === "string" ? body.moment.trim() : "";
    if (!moment) return NextResponse.json({ error: "moment_required" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  console.log("play_submitted");

  try {
    const { intelligence, humorFilter, imageSpecs, prompts, comparison } = await runTextPipeline(moment);
    console.log("play_generated");
    return NextResponse.json({ intelligence, humorFilter, imageSpecs, prompts, comparison });
  } catch (err) {
    console.error("[generate] pipeline failed:", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ error: "generation_failed", detail: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}
