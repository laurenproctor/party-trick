"use client";

import { TONE_LIST } from "../../lib/postcard/tones";
import type { ToneId } from "../../lib/postcard/types";

interface ToneSelectorProps {
  value: ToneId;
  onChange: (tone: ToneId) => void;
}

export default function ToneSelector({ value, onChange }: ToneSelectorProps) {
  return (
    <div
      role="radiogroup"
      aria-label="Select tone"
      style={{
        display: "flex",
        gap: "var(--s-2, 8px)",
        overflowX: "auto",
        paddingBottom: "var(--s-2, 8px)",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {TONE_LIST.map((tone) => {
        const isActive = tone.id === value;
        return (
          <button
            key={tone.id}
            role="radio"
            aria-checked={isActive}
            type="button"
            onClick={() => onChange(tone.id)}
            style={{
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "var(--s-1, 4px)",
              padding: "var(--s-3, 12px) var(--s-4, 16px)",
              background: isActive ? tone.accentHex : "var(--paper-2, #f0f0ec)",
              color: isActive ? getContrastColor(tone.accentHex) : "var(--ink, #0a0a0a)",
              border: isActive
                ? `2px solid ${tone.accentHex}`
                : "2px solid transparent",
              cursor: "pointer",
              transition: "background 0.15s, color 0.15s, border-color 0.15s",
              minWidth: 120,
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono, monospace)",
                fontSize: "var(--t-small, 14px)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                lineHeight: 1,
              }}
            >
              {tone.label}
            </span>
            <span
              style={{
                fontFamily: "var(--sans, sans-serif)",
                fontSize: "var(--t-micro, 11px)",
                opacity: isActive ? 0.85 : 0.6,
                lineHeight: 1.3,
                maxWidth: 140,
              }}
            >
              {tone.shortDescription}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Determine readable text color for a given background hex
function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#0a0a0a" : "#ffffff";
}
