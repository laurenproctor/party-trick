export type GenerationResult = {
  imageUrl: string;
  provider: "replicate";
};

export async function generateReplicate(prompt: string): Promise<GenerationResult> {
  // stub
  void prompt;
  return { imageUrl: "", provider: "replicate" };
}
