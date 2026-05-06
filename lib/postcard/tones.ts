import type { ToneId } from "./types";

// ─── Typography profiles ───────────────────────────────────────────────────────
// Describe typographic intent — components translate these into actual CSS.

export type TypographyProfile =
  | "editorial_mono"          // spare, precise, IBM Plex Mono energy
  | "condensed_black"         // high-tension, Anton/Bebas
  | "slightly_irregular_serif"// subtle imperfection, Special Elite
  | "wide_spaced_grotesque"   // breathing room, Space Grotesk
  | "hand_annotated"          // Poesing, marginalia feel
  | "corporate_sans"          // Inter, over-formatted
  | "deranged_confident";     // mix: large caps + hand in same block

export type LayoutStyle =
  | "tight_centered"
  | "wide_spacing"
  | "asymmetric_left"
  | "formal_grid"
  | "compressed_chaos"
  | "sparse_dramatic"
  | "full_bleed_confrontational";

export type UiAccent =
  | "warm_red"
  | "cold_blue"
  | "void_black"
  | "electric_green"
  | "bruised_purple"
  | "off_white_paper"
  | "corporate_grey";

// ─── TonePreset ───────────────────────────────────────────────────────────────

export type TonePreset = {
  id: ToneId;
  label: string;
  shortDescription: string;
  uiAccent: UiAccent;
  accentHex: string;         // resolved hex for inline use
  typographyProfile: TypographyProfile;
  layoutStyle: LayoutStyle;
  promptModifier: string;    // injected into message generation
  cssVars: Record<string, string>; // overrides applied when tone is active
};

// ─── Presets ──────────────────────────────────────────────────────────────────

export const TONE_PRESETS: Record<ToneId, TonePreset> = {
  loving: {
    id: "loving",
    label: "Loving",
    shortDescription: "Sincere in a way that's almost suspicious.",
    uiAccent: "warm_red",
    accentHex: "#ff4444",
    typographyProfile: "hand_annotated",
    layoutStyle: "tight_centered",
    promptModifier:
      "Write with genuine warmth and specificity. Name the exact thing you love about this moment. No irony — or at least bury it deep.",
    cssVars: {
      "--tone-accent": "#ff4444",
      "--tone-font": "var(--hand)",
      "--tone-spacing": "0.02em",
      "--tone-size": "1em",
    },
  },

  brutal: {
    id: "brutal",
    label: "Brutal",
    shortDescription: "What everyone was thinking.",
    uiAccent: "void_black",
    accentHex: "#0a0a0a",
    typographyProfile: "condensed_black",
    layoutStyle: "full_bleed_confrontational",
    promptModifier:
      "Write like a roast writer who respects the person. Sharp, specific, no softening. One sentence that lands.",
    cssVars: {
      "--tone-accent": "#0a0a0a",
      "--tone-font": "var(--display-cond)",
      "--tone-spacing": "-0.02em",
      "--tone-size": "1.15em",
    },
  },

  psychic: {
    id: "psychic",
    label: "Psychic",
    shortDescription: "Cryptic certainty about something you can't explain.",
    uiAccent: "bruised_purple",
    accentHex: "#7c3aed",
    typographyProfile: "slightly_irregular_serif",
    layoutStyle: "wide_spacing",
    promptModifier:
      "Write like an eerie prophecy with emotional confidence. Present observations as fated facts. No hedging. Use second person.",
    cssVars: {
      "--tone-accent": "#7c3aed",
      "--tone-font": "var(--typed)",
      "--tone-spacing": "0.08em",
      "--tone-size": "0.95em",
    },
  },

  existential: {
    id: "existential",
    label: "Existential",
    shortDescription: "The moment and what it means. Or doesn't.",
    uiAccent: "cold_blue",
    accentHex: "#0044ff",
    typographyProfile: "editorial_mono",
    layoutStyle: "sparse_dramatic",
    promptModifier:
      "Write like someone who is amused and slightly terrified by the implications. Keep it short. Let the silence do work.",
    cssVars: {
      "--tone-accent": "#0044ff",
      "--tone-font": "var(--mono)",
      "--tone-spacing": "0.04em",
      "--tone-size": "0.9em",
    },
  },

  romantic: {
    id: "romantic",
    label: "Romantic",
    shortDescription: "Intensely felt. Possibly misread.",
    uiAccent: "warm_red",
    accentHex: "#e11d48",
    typographyProfile: "hand_annotated",
    layoutStyle: "asymmetric_left",
    promptModifier:
      "Write like the message you'd leave on a napkin. Specific, slightly over the top, earnest enough to be embarrassing. Make it memorable.",
    cssVars: {
      "--tone-accent": "#e11d48",
      "--tone-font": "var(--hand)",
      "--tone-spacing": "0.01em",
      "--tone-size": "1.05em",
    },
  },

  corporate: {
    id: "corporate",
    label: "Corporate",
    shortDescription: "Formally noted. Action items pending.",
    uiAccent: "corporate_grey",
    accentHex: "#6b7280",
    typographyProfile: "corporate_sans",
    layoutStyle: "formal_grid",
    promptModifier:
      "Write in the register of a performance review or internal memo. Reference the moment in sanitized language. Identify key learnings. Sign off professionally.",
    cssVars: {
      "--tone-accent": "#6b7280",
      "--tone-font": "var(--sans)",
      "--tone-spacing": "0.01em",
      "--tone-size": "0.85em",
    },
  },

  delusional_confidence: {
    id: "delusional_confidence",
    label: "Delusional Confidence",
    shortDescription: "Fully committed. No notes.",
    uiAccent: "electric_green",
    accentHex: "#00d647",
    typographyProfile: "deranged_confident",
    layoutStyle: "compressed_chaos",
    promptModifier:
      "Write like someone who has absolutely no doubt they are right. Large claims, total conviction, specific personal detail. Do not qualify anything.",
    cssVars: {
      "--tone-accent": "#00d647",
      "--tone-font": "var(--punk-idols)",
      "--tone-spacing": "0.06em",
      "--tone-size": "1.1em",
    },
  },
};

export const TONE_LIST = Object.values(TONE_PRESETS);

export function getTone(id: ToneId): TonePreset {
  return TONE_PRESETS[id];
}
