export type StyleName =
  | "bad_courtroom_sketch"
  | "bar_napkin"
  | "full_chaos"
  | "cinematic_sketch";

export type Style = {
  name: StyleName;
  descriptor: string;
  negativePrompt: string;
};

export const STYLES: Record<StyleName, Style> = {
  bad_courtroom_sketch: {
    name: "bad_courtroom_sketch",
    descriptor:
      "courtroom sketch art, hand-drawn pencil, crude likeness, slightly off proportions, newspaper editorial illustration, intentionally imperfect, not photorealistic",
    negativePrompt: "photorealistic, polished, digital art, clean lines",
  },
  bar_napkin: {
    name: "bar_napkin",
    descriptor:
      "rough ballpoint pen sketch on a bar napkin, wobbly lines, smudged ink, hastily drawn, recognizable but exaggerated caricature, not photorealistic",
    negativePrompt: "photorealistic, high resolution, professional illustration",
  },
  full_chaos: {
    name: "full_chaos",
    descriptor:
      "chaotic mixed-media collage, clashing colors, absurdist composition, fever dream aesthetic, recognizable but wildly exaggerated, intentionally imperfect, not photorealistic",
    negativePrompt: "photorealistic, minimal, clean, subtle",
  },
  cinematic_sketch: {
    name: "cinematic_sketch",
    descriptor:
      "dramatic courtroom sketch with cinematic lighting, high contrast chiaroscuro, epic scale applied to mundane subject, editorial illustration with movie-poster gravitas, intentionally imperfect, not photorealistic",
    negativePrompt: "photorealistic, cheerful, casual, flat lighting",
  },
};
