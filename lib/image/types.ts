export type ScenePacket = {
  sceneSummary: string;
  mainCharacter: {
    role: string;
    vibe: string;
    expression: string;
    pose: string;
    fashion: string;
  };
  socialContext: {
    location: string;
    energy: string;
    backgroundCharacters: string[];
  };
  comicAngle: {
    joke: string;
    metaphor: string;
    exaggerationTarget: string;
  };
  mustAvoid: string[];
};

export type VariationMode =
  | "default_read"
  | "truer_read"
  | "weirder_read"
  | "roast_harder"
  | "chaos"
  | "cinematic";

export type GenerationMode = "first" | "fresh_read";

export type PromptVariant = {
  mode: VariationMode;
  generationMode: GenerationMode;
  scenePacket: ScenePacket;
  renderedPrompt: string;
};
