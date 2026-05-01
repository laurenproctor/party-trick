import { NextResponse } from "next/server";
import { sessions } from "@/lib/db/memory";
import { TEST_SCENE } from "@/lib/db/memory";
import { randomUUID } from "crypto";

export async function POST() {
  const sessionId = randomUUID();

  sessions.set(sessionId, {
    id: sessionId,
    scenePacket: TEST_SCENE,
    images: [],
  });

  return NextResponse.json({
    sessionId,
    message: "upload audio next",
  });
}
