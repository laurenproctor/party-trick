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

export type VariationMode = "escalate" | "reframe" | "absurdify" | "localize";

export type GenerationMode = "first" | "regenerate";

export type PromptVariant = {
  mode: VariationMode;
  generationMode: GenerationMode;
  scenePacket: ScenePacket;
  renderedPrompt: string;
};
