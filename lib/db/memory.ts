import type { ScenePacket } from "@/lib/image/types";
import type { PromptVariant } from "@/lib/image/types";

export type SessionImage = {
  imageUrl: string;
  variant: PromptVariant;
  createdAt: Date;
};

export type Session = {
  id: string;
  scenePacket: ScenePacket;
  images: SessionImage[];
};

export const sessions = new Map<string, Session>();

export const TEST_SCENE: ScenePacket = {
  sceneSummary:
    "A person stands frozen at a bar for four minutes, audibly deliberating between a mezcal negroni and a Aperol spritz, before quietly asking for a vodka soda",
  mainCharacter: {
    role: "chronic overthinker at a bar",
    vibe: "performatively intellectual but deeply indecisive",
    expression: "the face of someone who just lost an internal debate",
    pose: "one finger raised mid-sentence, mouth slightly open, eyes glazed",
    fashion:
      "blazer over a band tee, glasses pushed up on forehead, lanyard still on from earlier",
  },
  socialContext: {
    location: "loud downtown bar with a chalkboard cocktail menu",
    energy: "friday night, everyone behind them is waiting",
    backgroundCharacters: [
      "bartender with a neutral thousand-yard stare",
      "friend who has already finished their first drink",
      "stranger visibly sighing",
    ],
  },
  comicAngle: {
    joke: "after a four-minute soliloquy about flavor profiles, they order the most boring drink possible",
    metaphor: "a philosophy PhD thesis that concludes with a shrug",
    exaggerationTarget: "the gulf between their deliberation and the outcome",
  },
  mustAvoid: ["photorealism", "cruelty", "making them look stupid — just very earnest"],
};
