import type { HandwritingStyle } from "./types";

// ─── Handwriting simulation ───────────────────────────────────────────────────
// Goal: restrained editorial scrawl. Notebook annotation energy.
// NOT: greeting card cursive. NOT: uncanny-valley realism.
// Subtle variance > realism. Each character gets slight rotation,
// baseline drift, and kerning irregularity via CSS transforms.

export type CharVariance = {
  rotate: number;       // degrees ±
  translateX: number;   // px — kerning drift
  translateY: number;   // px — baseline drift
  scaleX: number;       // subtle width compression/expansion
  opacity: number;      // very slight — ink pressure variation
};

export type HandwritingConfig = {
  rotationRange: number;    // max degrees of rotation per char
  baselineDrift: number;    // max px of vertical drift
  kerningDrift: number;     // max px of horizontal drift
  scaleRange: number;       // scaleX variance (1 ± this)
  opacityRange: number;     // opacity variance (1 ± this)
  wordSpacingVariance: number; // extra px between some words
};

const STYLE_CONFIGS: Record<HandwritingStyle, HandwritingConfig> = {
  editorial_scrawl: {
    rotationRange: 2.5,
    baselineDrift: 1.5,
    kerningDrift: 0.8,
    scaleRange: 0.04,
    opacityRange: 0.06,
    wordSpacingVariance: 1.5,
  },
  annotation: {
    rotationRange: 1.2,
    baselineDrift: 0.8,
    kerningDrift: 0.4,
    scaleRange: 0.02,
    opacityRange: 0.04,
    wordSpacingVariance: 0.5,
  },
  deliberate: {
    rotationRange: 0.8,
    baselineDrift: 0.5,
    kerningDrift: 0.3,
    scaleRange: 0.015,
    opacityRange: 0.03,
    wordSpacingVariance: 0.3,
  },
  unhinged: {
    rotationRange: 5,
    baselineDrift: 3,
    kerningDrift: 1.5,
    scaleRange: 0.08,
    opacityRange: 0.12,
    wordSpacingVariance: 3,
  },
};

// ─── Seeded pseudo-random ─────────────────────────────────────────────────────
// Stable per (seed, index) pair so preview renders consistently.
// Not cryptographic — just needs to look the same on each render.

function seededRandom(seed: number, index: number): () => number {
  let s = (seed * 9301 + 49297 + index * 233) % 233280;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

// ─── Per-character variance ───────────────────────────────────────────────────

export function getCharVariance(
  index: number,
  style: HandwritingStyle = "editorial_scrawl",
  seed = 42
): CharVariance {
  const config = STYLE_CONFIGS[style];
  const rand = seededRandom(seed, index);

  const r = () => rand() * 2 - 1; // [-1, 1]

  return {
    rotate: r() * config.rotationRange,
    translateX: r() * config.kerningDrift,
    translateY: r() * config.baselineDrift,
    scaleX: 1 + r() * config.scaleRange,
    opacity: 1 - Math.abs(r()) * config.opacityRange,
  };
}

// ─── CSS transform string ─────────────────────────────────────────────────────

export function charVarianceToCss(v: CharVariance): React.CSSProperties {
  return {
    display: "inline-block",
    transform: `rotate(${v.rotate.toFixed(2)}deg) translateX(${v.translateX.toFixed(2)}px) translateY(${v.translateY.toFixed(2)}px) scaleX(${v.scaleX.toFixed(3)})`,
    opacity: v.opacity,
  };
}

// ─── Word-level spacing variance ─────────────────────────────────────────────

export function getWordSpacing(
  wordIndex: number,
  style: HandwritingStyle = "editorial_scrawl",
  seed = 42
): number {
  const config = STYLE_CONFIGS[style];
  const rand = seededRandom(seed + 1000, wordIndex);
  return rand() * config.wordSpacingVariance;
}

// ─── Full message decomposition ───────────────────────────────────────────────
// Returns an array of tokens (words/spaces) with per-character variance data.

export type HandwritingToken =
  | {
      type: "word";
      chars: Array<{ char: string; css: React.CSSProperties }>;
      extraSpacing: number;
    }
  | { type: "newline" };

export function decomposeMessage(
  message: string,
  style: HandwritingStyle = "editorial_scrawl",
  seed = 42
): HandwritingToken[] {
  const tokens: HandwritingToken[] = [];
  let charIndex = 0;
  let wordIndex = 0;

  const lines = message.split("\n");

  for (let li = 0; li < lines.length; li++) {
    if (li > 0) tokens.push({ type: "newline" });

    const words = lines[li].split(" ");
    for (const word of words) {
      if (!word) continue;
      const chars = word.split("").map((char) => ({
        char,
        css: charVarianceToCss(getCharVariance(charIndex++, style, seed)),
      }));
      tokens.push({
        type: "word",
        chars,
        extraSpacing: getWordSpacing(wordIndex++, style, seed),
      });
    }
  }

  return tokens;
}

// React import for CSSProperties type
import type React from "react";
