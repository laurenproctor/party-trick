export type GenerationResult = {
  imageUrl: string;
  provider: "openai";
};

export async function generateOpenAI(prompt: string): Promise<GenerationResult> {
  // stub
  void prompt;
  return { imageUrl: "", provider: "openai" };
}
