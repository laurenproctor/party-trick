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
};

export async function generateComparisonImages(prompt: string): Promise<ComparisonResult> {
  const [openaiRes, replicateRes] = await Promise.all([
    openai.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    }),
    replicate.run("black-forest-labs/flux-schnell", {
      input: { prompt, aspect_ratio: "1:1" },
    }),
  ]);

  return {
    openai: {
      label: "OpenAI",
      prompt,
      url: openaiRes.data?.[0]?.url ?? "",
    },
    replicate: {
      label: "Replicate (Flux)",
      prompt,
      url: (replicateRes as string[])[0] ?? "",
    },
  };
}
