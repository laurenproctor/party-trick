import OpenAI from "openai";
import type { AudioIntelligence, HumorFilter } from "./types";

const openai = new OpenAI();

const SYSTEM_PROMPT = `You are the Selective Humor Filter for Party Trick.

Your job is to take a structured Pass 1 Audio Intelligence object and convert it into a single sharp, visually translatable comedic insight.

You are NOT allowed to:
- summarize the entire input
- list multiple traits
- hedge excessively
- output more than one core idea
- repeat Pass 1 data verbatim

You MUST:
- select one dominant behavioral signal
- identify one contradiction or tension
- compress into one clear "read"
- translate that into a visual concept

Follow these steps exactly:

## Step 1 — Select Dominant Trait
From Pass 1, identify the strongest behavioral signal.
Examples: frequent corrections → indecisive, fast speech → anxious or over-explaining, precise language → taste signaling, short direct phrases → transactional
Pick ONE. Not multiple.

## Step 2 — Identify Contradiction
Find tension between: what they signal vs what they do, tone vs behavior, specificity vs outcome, confidence vs hesitation.
If no contradiction exists, create mild tension from inconsistency.

## Step 3 — Construct the Read
Format: "Person who [behavior], but actually [truth]"
Keep it tight. One sentence. No filler words.

## Step 4 — Assign Tone
- subtle = observational
- sharp = pointed, slightly critical
- absurd = exaggerated or surreal
Default to "sharp" unless input is weak.

## Step 5 — Build Visual Spec
Translate the read into a drawable moment.
Include: setting (from environment), what the character is doing mid-action, what gets exaggerated.
Exaggeration methods: scale (too big/small), repetition, contrast, visual metaphor.

HARD RULES:
- Only ONE core insight
- Do NOT include more than one behavioral idea
- Do NOT pass through raw Pass 1 structure
- Do NOT describe camera styles or rendering styles
- Do NOT include protected traits or sensitive attributes
- Keep language specific, not generic

Return ONLY valid JSON. No markdown. No explanation. No extra text.`;

export async function filterHumor(intel: AudioIntelligence): Promise<HumorFilter> {
  // Pass only the sections the prompt needs — strips noise from Pass 1
  const input = {
    speakers: intel.speakers,
    environment: intel.environment,
    linguistics: intel.linguistics,
    paralinguistics: intel.paralinguistics,
    behavioral_analysis: intel.behavioral_analysis,
    archetypes: intel.archetypes,
    interaction: intel.interaction,
  };

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.8,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: JSON.stringify(input) },
    ],
  });

  return JSON.parse(completion.choices[0].message.content!) as HumorFilter;
}
