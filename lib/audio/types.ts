export type Session = {
  id: string;
  createdAt: Date;
  audioEvidence: AudioEvidence;
  inference: HumanInference;
};

export type AudioEvidence = {
  transcript: string;
  durationSeconds: number;
  language?: string;
};

export type HumanInference = {
  name?: string;
  age?: string;
  occupation?: string;
  personality: string[];
  quirks: string[];
  rawQuotes: string[];
};
