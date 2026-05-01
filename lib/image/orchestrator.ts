import type { ScenePacket, VariationMode, PromptVariant } from "./types";
import { buildPrompt } from "./promptBuilder";
import { resolveProvider } from "./modelRouter";
import { generateOpenAI } from "./providers/openai";
import { generateReplicate } from "./providers/replicate";

export type GenerationInput = {
  scenePacket: ScenePacket;
  variationMode: VariationMode;
};

export type GenerationOutput = {
  imageUrl: string;
  provider: string;
  variant: PromptVariant;
};

export async function generateImageFromScenePacket(
  input: GenerationInput
): Promise<GenerationOutput> {
  const { scenePacket, variationMode } = input;

  const renderedPrompt = buildPrompt(scenePacket, variationMode);
  const provider = resolveProvider(variationMode);

  const variant: PromptVariant = {
    mode: variationMode,
    generationMode: "first",
    scenePacket,
    renderedPrompt,
  };

  const result =
    provider === "openai"
      ? await generateOpenAI(renderedPrompt)
      : await generateReplicate(renderedPrompt);

  return { imageUrl: result.imageUrl, provider: result.provider, variant };
}
