import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { generateImageFromScenePacket } from "@/lib/image/orchestrator";
import { sessions } from "@/lib/db/memory";
import type { Session } from "@/lib/db/memory";
import type { ScenePacket } from "@/lib/image/types";
import { randomUUID } from "crypto";

const FREE_COOKIE = "pt_free_used";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function momentToScenePacket(moment: string): ScenePacket {
  return {
    sceneSummary: moment,
    mainCharacter: {
      role: "subject of the moment",
      vibe: "caught off guard",
      expression: "unguarded",
      pose: "mid-action",
      fashion: "whatever they had on",
    },
    socialContext: {
      location: "the scene described",
      energy: "candid",
      backgroundCharacters: [],
    },
    comicAngle: {
      joke: "the gap between who they think they are and who they're being",
      metaphor: "a snapshot taken one second too late",
      exaggerationTarget: "their defining trait in this moment",
    },
    mustAvoid: ["photorealism", "cruelty", "protected attributes"],
  };
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  const cookies = req.cookies;
  const freeUsed = cookies.get(FREE_COOKIE)?.value === "1";

  // Block if anonymous and already used their free generation
  if (freeUsed && !userId) {
    console.log("play_blocked_free_used");
    return NextResponse.json({ error: "free_used" }, { status: 403 });
  }

  let moment: string;
  try {
    const body = await req.json();
    moment = typeof body.moment === "string" ? body.moment.trim() : "";
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  if (!moment) {
    return NextResponse.json({ error: "moment_required" }, { status: 400 });
  }

  console.log("play_submitted");

  const scenePacket = momentToScenePacket(moment);
  const sessionId = randomUUID();

  const result = await generateImageFromScenePacket({
    scenePacket,
    variationMode: "default_read",
  });

  const session: Session = {
    id: sessionId,
    scenePacket,
    images: [
      {
        imageUrl: result.imageUrl,
        variant: result.variant,
        createdAt: new Date(),
      },
    ],
  };

  sessions.set(sessionId, session);

  console.log("play_generated");

  const response = NextResponse.json({ imageUrl: result.imageUrl });

  // Set free-used cookie for anonymous users
  if (!userId) {
    response.cookies.set(FREE_COOKIE, "1", {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
    });
  }

  return response;
}
