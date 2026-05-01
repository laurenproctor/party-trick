import { NextRequest, NextResponse } from "next/server";
import { sessions } from "@/lib/db/memory";
import { inferScene } from "@/lib/audio/inferScene";
import type { AudioEvidence } from "@/lib/audio/types";

const DUMMY_EVIDENCE: AudioEvidence = {
  transcript:
    "Okay so I've been going back and forth on this for like twenty minutes. " +
    "I originally wanted the oat milk latte but then I saw they have the seasonal thing, " +
    "and honestly the seasonal thing looked kind of... a lot? Like a lot of syrup. " +
    "So then I was thinking maybe just a cortado, which is what I usually get, " +
    "but the cortado here is four dollars more than the place I normally go. " +
    "Which is fine, it's fine, I just — okay. Yeah. I'll do the cortado. " +
    "Actually wait, do you have oat milk? Okay great. Then the oat milk cortado. " +
    "Actually, you know what, just a black coffee is fine.",
  durationSeconds: 34,
  language: "en",
};

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = sessions.get(id);

  if (!session) {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }

  const result = await inferScene(DUMMY_EVIDENCE);

  session.scenePacket = result.scenePacket;
  sessions.set(id, session);

  return NextResponse.json({
    sessionId: id,
    humanInference: result.humanInference,
    scenePacket: result.scenePacket,
  });
}
