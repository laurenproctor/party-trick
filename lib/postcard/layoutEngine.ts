import type { ToneId, ArtifactFormat } from "./types";
import type { LayoutStyle } from "./tones";
import { getTone } from "./tones";

// ─── Theme system ─────────────────────────────────────────────────────────────
// ArtifactTheme is first-class — not a template, not a skin.
// Future themes: collectible_drop_01, zine_evidence, ticker_tape, etc.

export type TexurePack = {
  id: string;
  cssFilter: string;        // e.g. "contrast(1.05) saturate(0.9)"
  backgroundImage?: string; // CSS background-image for grain/texture
  opacity: number;
};

export type BorderSystem = {
  style: "none" | "hairline" | "double_rule" | "torn_edge" | "stamp_border";
  color: string;
  width: string;
};

export type StampFamily = {
  id: string;
  placeholder: string;   // text to show in postage placeholder
  style: "rectangular" | "round" | "vintage_hex";
};

export type ArtifactTheme = {
  id: string;
  label: string;
  texturePack: TexurePack;
  borderSystem: BorderSystem;
  stampFamily: StampFamily;
  layoutFamily: "standard" | "editorial" | "collectible" | "evidence";
};

// ─── Layout specs ─────────────────────────────────────────────────────────────

export type FrontLayout = {
  id: string;
  format: ArtifactFormat;
  tone: ToneId;
  themeId: string;
  imagePosition: "fill" | "centered" | "bleed" | "inset";
  brandingPosition: "bottom-right" | "bottom-left" | "top-left" | "none";
  textureOverlay: string;
  borderStyle: BorderSystem["style"];
  toneClass: string;           // CSS class token applied to front element
  aspectRatio: string;         // CSS aspect-ratio value
};

export type BackLayout = {
  id: string;
  format: ArtifactFormat;
  tone: ToneId;
  themeId: string;
  layoutStyle: LayoutStyle;
  messageZone: {
    gridColumn: string;
    typographyProfile: string;
    maxLines: number;
    lineHeightScale: number;
  };
  addressZone: {
    gridColumn: string;
  };
  postageZone: {
    position: "top-right" | "bottom-right";
    stampFamily: StampFamily["style"];
  };
  divider: "vertical-line" | "none";
  messageAlignment: "left" | "center";
};

// ─── Default theme ────────────────────────────────────────────────────────────

const DEFAULT_THEME: ArtifactTheme = {
  id: "standard",
  label: "Standard",
  texturePack: {
    id: "matte_grain",
    cssFilter: "contrast(1.02) saturate(0.95)",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
    opacity: 0.04,
  },
  borderSystem: {
    style: "none",
    color: "transparent",
    width: "0",
  },
  stampFamily: {
    id: "standard",
    placeholder: "POSTAGE",
    style: "rectangular",
  },
  layoutFamily: "standard",
};

// ─── Theme registry ───────────────────────────────────────────────────────────
// Register future themes here. Key = theme ID.

const THEME_REGISTRY: Record<string, ArtifactTheme> = {
  standard: DEFAULT_THEME,
  // editorial: { ... },      // future: newspaper clipping energy
  // evidence: { ... },       // future: classified document aesthetic
  // collectible_01: { ... }, // future: limited drop with foil stamp
};

function getTheme(themeId: string): ArtifactTheme {
  return THEME_REGISTRY[themeId] ?? DEFAULT_THEME;
}

// ─── Format dimensions ────────────────────────────────────────────────────────

const FORMAT_ASPECT_RATIOS: Record<ArtifactFormat, string> = {
  postcard: "6 / 4",
  evidence_packet: "9 / 6",
  collectible_drop: "5 / 5",
  poster: "10 / 8",
  mini_zine: "8.5 / 5.5",
};

// ─── Layout generation ────────────────────────────────────────────────────────

export function generateFrontLayout(
  tone: ToneId,
  format: ArtifactFormat = "postcard",
  themeId = "standard"
): FrontLayout {
  const preset = getTone(tone);
  const theme = getTheme(themeId);

  const imagePosition: FrontLayout["imagePosition"] =
    preset.layoutStyle === "full_bleed_confrontational" ? "bleed" :
    preset.layoutStyle === "sparse_dramatic" ? "inset" :
    "fill";

  return {
    id: `front_${tone}_${format}_${themeId}`,
    format,
    tone,
    themeId,
    imagePosition,
    brandingPosition: "bottom-right",
    textureOverlay: theme.texturePack.backgroundImage ?? "",
    borderStyle: theme.borderSystem.style,
    toneClass: `tone-${tone}`,
    aspectRatio: FORMAT_ASPECT_RATIOS[format],
  };
}

export function generateBackLayout(
  tone: ToneId,
  format: ArtifactFormat = "postcard",
  themeId = "standard"
): BackLayout {
  const preset = getTone(tone);
  const theme = getTheme(themeId);

  // Message zone takes left 55%, address takes right 40%, 5% gutter
  const messageGridColumn =
    preset.layoutStyle === "formal_grid" ? "1 / 7" :
    preset.layoutStyle === "asymmetric_left" ? "1 / 8" :
    "1 / 7";

  const addressGridColumn =
    preset.layoutStyle === "formal_grid" ? "8 / 13" :
    preset.layoutStyle === "asymmetric_left" ? "9 / 13" :
    "8 / 13";

  return {
    id: `back_${tone}_${format}_${themeId}`,
    format,
    tone,
    themeId,
    layoutStyle: preset.layoutStyle,
    messageZone: {
      gridColumn: messageGridColumn,
      typographyProfile: preset.typographyProfile,
      maxLines: preset.layoutStyle === "compressed_chaos" ? 10 : 6,
      lineHeightScale: preset.layoutStyle === "wide_spacing" ? 1.8 : 1.5,
    },
    addressZone: {
      gridColumn: addressGridColumn,
    },
    postageZone: {
      position: "top-right",
      stampFamily: theme.stampFamily.style,
    },
    divider: "vertical-line",
    messageAlignment:
      preset.layoutStyle === "tight_centered" ? "center" : "left",
  };
}
