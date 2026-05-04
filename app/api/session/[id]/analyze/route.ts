import { NextRequest, NextResponse } from "next/server";
import { sessions } from "@/lib/db/memory";
import { runAudioIntelligencePipeline } from "@/lib/audio/pipeline";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = sessions.get(id);
  if (!session) return NextResponse.json({ error: "session_not_found" }, { status: 404 });

  const formData = await req.formData();
  const file = formData.get("audio") as File | null;
  if (!file) return NextResponse.json({ error: "audio_required" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const mimeType = file.type || "audio/wav";
  const durationSeconds = Number(formData.get("duration") ?? 0);

  const { intelligence, scenePacket } = await runAudioIntelligencePipeline(
    buffer,
    mimeType,
    durationSeconds
  );

  session.scenePacket = scenePacket;
  sessions.set(id, session);

  return NextResponse.json({ intelligence, scenePacket });
}
