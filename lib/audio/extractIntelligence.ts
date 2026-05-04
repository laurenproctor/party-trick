import OpenAI from "openai";
import type { AudioIntelligence } from "./types";

const openai = new OpenAI();

const SYSTEM_PROMPT = `You are an audio intelligence analyst for a social comedy app called Party Trick.
Your job is to extract structured behavioral, emotional, and contextual signals from a conversation transcript.

Rules:
- Use hedged, observational language. Infer from speech patterns and behavior only.
- Never infer race, religion, or disability.
- Focus on social dynamics, energy, and comedic archetypes.
- If uncertain, use low confidence scores (0.0–0.4).
- Return ONLY valid JSON. No markdown, no explanation, no extra fields.
- Every field in the schema is required. Never omit a field.
- notable_behaviors must be a non-empty array.

The "archetypes.primary" field should be vivid, specific, and a little cutting. Examples:
  "the guy who just got promoted and needs everyone to know"
  "person who read one book about psychology and hasn't stopped"
  "someone who peaked at a regional debate tournament in 2009"
  "person who is very calm about something they are not calm about"`;

const SCHEMA_HINT = `{
  "transcript": { "full_text": "", "segments": [], "overall_confidence": 0 },
  "speakers": {
    "total_count": 1,
    "primary_speaker_id": "speaker_0",
    "profiles": [{
      "speaker_id": "speaker_0",
      "estimated_age_range": "adult",
      "perceived_gender": "",
      "vocal_characteristics": { "pitch": "mid", "stability": "stable", "clarity": "clear", "energy": "medium" },
      "accent": { "detected": "", "confidence": 0, "notes": "" },
      "communication_style": { "directness": "direct", "assertiveness": "medium", "tone": "neutral" },
      "emotional_state": { "primary": "", "secondary": null, "intensity": "medium" },
      "cognitive_state": { "clarity": "clear", "intoxication_likelihood": "low" }
    }]
  },
  "environment": { "setting": "", "background_noise": [], "density": "quiet", "movement": "stationary", "time_context_guess": "unclear", "confidence": 0 },
  "interaction": { "type": "", "intent": "", "dynamics": { "dominance_pattern": "unclear", "interruptions": false, "engagement_level": "medium" } },
  "linguistics": { "key_phrases": [], "vocabulary_level": "moderate", "filler_usage": "low", "notable_patterns": [] },
  "paralinguistics": { "speech_rate": "moderate", "rhythm": "smooth", "emphasis_style": "", "pauses": "minimal" },
  "behavioral_analysis": { "decision_style": "", "social_positioning": "", "notable_behaviors": [] },
  "archetypes": { "primary": "", "secondary": null, "confidence": 0 },
  "meta": { "signal_quality": 0, "inference_confidence": 0, "notes": "" }
}`;

export async function extractIntelligence(
  transcript: AudioIntelligence["transcript"],
  durationSeconds: number
): Promise<AudioIntelligence> {
  const segmentLines = transcript.segments.length > 0
    ? transcript.segments
        .map((s) => `[${s.speaker_id} ${s.start.toFixed(1)}s–${s.end.toFixed(1)}s]: ${s.text}`)
        .join("\n")
    : "(no speaker segments — single channel)";

  const userPrompt = `Audio recording: ${durationSeconds}s

TRANSCRIPT:
${transcript.full_text}

SPEAKER SEGMENTS:
${segmentLines}

Fill every field in this JSON schema. The transcript field will be replaced with the real transcript data — write placeholder values there. Return everything else fully populated.

Schema:
${SCHEMA_HINT}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.7,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPrompt },
    ],
  });

  const parsed = JSON.parse(completion.choices[0].message.content!) as AudioIntelligence;

  // Always use Deepgram's transcript verbatim — never GPT's reconstruction
  return { ...parsed, transcript };
}
