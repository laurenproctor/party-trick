import { NextResponse } from "next/server";
import { generateImageFromScenePacket } from "@/lib/image/orchestrator";
import { TEST_SCENE, sessions } from "@/lib/db/memory";
import type { Session } from "@/lib/db/memory";
import { randomUUID } from "crypto";

export async function POST() {
  const sessionId = randomUUID();

  const result = await generateImageFromScenePacket({
    scenePacket: TEST_SCENE,
    variationMode: "default_read",
  });

  const session: Session = {
    id: sessionId,
    scenePacket: TEST_SCENE,
    images: [
      {
        imageUrl: result.imageUrl,
        variant: result.variant,
        createdAt: new Date(),
      },
    ],
  };

  sessions.set(sessionId, session);

  return NextResponse.json({
    sessionId,
    imageUrl: result.imageUrl,
    prompt: result.variant.renderedPrompt,
  });
}
