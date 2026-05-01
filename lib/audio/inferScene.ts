import OpenAI from "openai";
import type { AudioEvidence, HumanInference } from "./types";
import type { ScenePacket } from "@/lib/image/types";

const openai = new OpenAI();

export type InferenceResult = {
  humanInference: HumanInference;
  scenePacket: ScenePacket;
};

const SYSTEM_PROMPT = `You are a scene inference engine for a comedic image generator.

Given a transcript of someone speaking, infer:
1. Details about the person speaking (HumanInference)
2. A vivid scene description (ScenePacket) for image generation

Rules:
- Use hedged language: "likely", "seems", "reads as", "suggests"
- Infer setting, mood, behavior, and visual cues from context
- Avoid referencing protected attributes (race, religion, disability, etc.)
- Focus on behavior, choices, social dynamics, and situational comedy
- The ScenePacket should be vivid, specific, and comedically exaggerated
- mustAvoid must include "photorealism" and any sensitive inferences

Respond with valid JSON only. No explanation outside the JSON object.`;

const RESPONSE_SCHEMA = `{
  "humanInference": {
    "name": string | null,
    "age": string | null,
    "occupation": string | null,
    "personality": string[],
    "quirks": string[],
    "rawQuotes": string[]
  },
  "scenePacket": {
    "sceneSummary": string,
    "mainCharacter": {
      "role": string,
      "vibe": string,
      "expression": string,
      "pose": string,
      "fashion": string
    },
    "socialContext": {
      "location": string,
      "energy": string,
      "backgroundCharacters": string[]
    },
    "comicAngle": {
      "joke": string,
      "metaphor": string,
      "exaggerationTarget": string
    },
    "mustAvoid": string[]
  }
}`;

export async function inferScene(
  evidence: AudioEvidence
): Promise<InferenceResult> {
  const userPrompt = `Transcript (${evidence.durationSeconds}s${evidence.language ? `, language: ${evidence.language}` : ""}):

"${evidence.transcript}"

Infer the scene and return JSON matching this schema:
${RESPONSE_SCHEMA}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
    response_format: { type: "json_object" },
    temperature: 0.8,
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) throw new Error("No response from inference model");

  return JSON.parse(raw) as InferenceResult;
}
