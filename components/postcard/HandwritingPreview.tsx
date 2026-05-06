"use client";

import { useMemo } from "react";
import { decomposeMessage } from "../../lib/postcard/handwriting";
import type { HandwritingStyle } from "../../lib/postcard/types";

interface HandwritingPreviewProps {
  message: string;
  style?: HandwritingStyle;
  seed?: number;
  fontSize?: string | number;
  color?: string;
  lineHeight?: number;
  className?: string;
}

export default function HandwritingPreview({
  message,
  style = "editorial_scrawl",
  seed = 42,
  fontSize = "1em",
  color = "var(--ink, #0a0a0a)",
  lineHeight = 1.6,
  className = "",
}: HandwritingPreviewProps) {
  const tokens = useMemo(
    () => decomposeMessage(message, style, seed),
    [message, style, seed]
  );

  const fontFamily = getFontForStyle(style);

  return (
    <div
      className={className}
      style={{
        fontFamily,
        fontSize,
        color,
        lineHeight,
        wordSpacing: "0.05em",
        // Subtle global tilt — the whole block leans slightly
        transform: "rotate(-0.4deg)",
        transformOrigin: "top left",
      }}
    >
      {tokens.map((token, i) => {
        if (token.type === "newline") {
          return <br key={`nl-${i}`} />;
        }

        return (
          <span
            key={`word-${i}`}
            style={{
              display: "inline-block",
              marginRight: `calc(0.28em + ${token.extraSpacing.toFixed(1)}px)`,
              verticalAlign: "baseline",
            }}
          >
            {token.chars.map(({ char, css }, ci) => (
              <span key={ci} style={css}>
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </div>
  );
}

function getFontForStyle(style: HandwritingStyle): string {
  switch (style) {
    case "editorial_scrawl":
      return "var(--hand, 'Poesing', 'Reenie Beanie', cursive)";
    case "annotation":
      return "var(--hand-ball, 'Poesing', 'Kalam', cursive)";
    case "deliberate":
      return "var(--typed, 'Special Elite', 'Courier New', monospace)";
    case "unhinged":
      return "var(--hand-brush, 'Poesing', 'Reenie Beanie', cursive)";
  }
}
