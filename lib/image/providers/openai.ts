import OpenAI from "openai";

const openai = new OpenAI();

export type GenerationResult = {
  imageUrl: string;
  provider: "openai";
};

export async function generateOpenAI(prompt: string): Promise<GenerationResult> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt,
    size: "1024x1024",
    quality: "standard",
    n: 1,
  });

  const url = response.data?.[0]?.url;
  if (!url) throw new Error("dall-e-3 returned no image url");

  return { imageUrl: url, provider: "openai" };
}
