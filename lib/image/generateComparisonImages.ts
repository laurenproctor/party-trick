import OpenAI from "openai";
import Replicate from "replicate";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export type ComparisonResult = {
  openai: { label: string; prompt: string; url: string };
  replicate: { label: string; prompt: string; url: string };
  caption: string;
};

async function generateCaption(prompt: string): Promise<string> {
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.9,
    max_tokens: 60,
    messages: [
      {
        role: "system",
        content: `You write one-line captions for satirical portrait illustrations.
Your caption must:
- Be one sentence, under 15 words
- Name the specific thing being exaggerated (not generic)
- Be dry and cutting, not cute
- Sound like something you'd caption a photo with at a roast
- Never start with "A" or "The"
Return only the caption text, no quotes, no punctuation at the end.`,
      },
      { role: "user", content: prompt },
    ],
  });
  return res.choices[0]?.message?.content?.trim() ?? "caught in the act";
}

function extractReplicateUrl(replicateRes: unknown): string {
  const arr = replicateRes as Array<unknown>;
  const first = arr[0];
  if (!first) return "";
  if (typeof first === "string") return first;
  if (typeof (first as { url?: unknown }).url === "function")
    return String((first as { url: () => unknown }).url());
  if (typeof (first as { url?: unknown }).url === "string")
    return (first as { url: string }).url;
  return "";
}

export async function generateComparisonImages(prompt: string): Promise<ComparisonResult> {
  const [openaiRes, replicateResult, caption] = await Promise.all([
    openai.images.generate({
      model: "dall-e-3",
      prompt,
      size: "1024x1024",
      response_format: "url",
    }),
    replicate.run("black-forest-labs/flux-schnell", {
      input: { prompt, aspect_ratio: "1:1" },
    }).catch((err) => {
      console.error("[generateComparisonImages] replicate failed:", err?.message ?? err);
      return null;
    }),
    generateCaption(prompt),
  ]);

  const replicateUrl = replicateResult ? extractReplicateUrl(replicateResult) : "";
  console.log("[generateComparisonImages] replicate url:", replicateUrl?.slice(0, 80));

  return {
    openai: { label: "OpenAI", prompt, url: openaiRes.data?.[0]?.url ?? "" },
    replicate: { label: "Replicate (Flux)", prompt, url: replicateUrl },
    caption,
  };
}
