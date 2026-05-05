import OpenAI from "openai";
import type { HumorFilter, ImageSpec } from "./types";

const openai = new OpenAI();

const SYSTEM_PROMPT = `You are the ImageSpec Generator for Party Trick.

Your job is to take a distilled comedic read (core_insight + tone) and generate exactly 5 ImageSpec objects — each one a distinct visual interpretation of the same joke.

RULES:
- All 5 specs must express the same core_insight.read
- At least 3 must be meaningfully different visual strategies. Up to 2 can be stronger variations of the best idea.
- Use at least 3 different exaggeration.method values across the 5: "scale", "repetition", "contrast", "metaphor"
- No repeated action phrasing, prop sets, or exaggeration.description structure across specs
- Each character must be mid-action: leaning, reaching, pointing, pacing, gesturing — never standing still
- 2–4 props per spec, specifically chosen to reinforce the character's intended identity
- expression maps to tone: subtle→uncertain, sharp→strained, absurd→intense
- setting should feel specific, not generic ("a chain restaurant booth" not "a restaurant")

OUTPUT: Return ONLY a valid JSON array of exactly 5 ImageSpec objects. No markdown. No wrapper key. Raw array only.

Schema for each ImageSpec:
{
  "setting": "string — specific location",
  "time_of_day": "day" | "night" | "unclear",
  "character": {
    "role": "string — who this person is in the scene",
    "action": "string — what they are doing mid-action",
    "expression": "string — facial expression"
  },
  "props": ["string", ...],
  "exaggeration": {
    "target": "string — what is being exaggerated",
    "method": "scale" | "repetition" | "contrast" | "metaphor",
    "description": "string — how the exaggeration manifests visually"
  },
  "composition": {
    "focus": "single_subject",
    "framing": "medium_shot"
  },
  "tone": "subtle" | "sharp" | "absurd"
}`;

export async function generateImageSpecs(humorFilter: HumorFilter): Promise<ImageSpec[]> {
  const input = {
    core_insight: humorFilter.core_insight,
    tone: humorFilter.tone,
  };

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.9,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: JSON.stringify(input) },
    ],
  });

  const raw = completion.choices[0].message.content!.trim();

  // Strip markdown code fences if present
  const json = raw.startsWith("```") ? raw.replace(/```[a-z]*\n?/g, "").trim() : raw;

  const parsed = JSON.parse(json);

  const specs: ImageSpec[] = Array.isArray(parsed) ? parsed : parsed.specs ?? parsed.image_specs ?? Object.values(parsed)[0];

  if (!Array.isArray(specs) || specs.length !== 5) {
    throw new Error(`generateImageSpecs: expected 5 specs, got ${Array.isArray(specs) ? specs.length : typeof specs}`);
  }

  return specs;
}
