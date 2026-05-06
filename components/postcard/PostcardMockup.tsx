"use client";

import { useState, useEffect } from "react";
import PostcardPreview from "./PostcardPreview";
import type { ArtifactDraft } from "../../lib/postcard/types";

interface PostcardMockupProps {
  draft: ArtifactDraft;
  initialSide?: "front" | "back";
  className?: string;
}

// PostcardMockup — realistic angled card with front/back flip.
// Single-pass settle animation on mount. One clean ease. No bouncing.
// Click anywhere on the card to flip.

export default function PostcardMockup({
  draft,
  initialSide = "front",
  className = "",
}: PostcardMockupProps) {
  const [side, setSide] = useState<"front" | "back">(initialSide);
  const [flipping, setFlipping] = useState(false);
  const [settled, setSettled] = useState(false);

  // Settle animation — card rotates into place once on mount
  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 60);
    return () => clearTimeout(t);
  }, []);

  function handleFlip() {
    if (flipping) return;
    setFlipping(true);
    setTimeout(() => {
      setSide((s) => (s === "front" ? "back" : "front"));
      setFlipping(false);
    }, 220);
  }

  const settleRotate = settled ? "-2deg" : "-6deg";
  const settleTranslate = settled ? "0px, 0px" : "4px, 8px";

  return (
    <div
      className={className}
      style={{
        perspective: "1200px",
        width: "100%",
        cursor: "pointer",
      }}
      onClick={handleFlip}
      role="button"
      aria-label={`Postcard ${side} — click to flip`}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleFlip()}
    >
      {/* Outer wrapper: physical tilt + settle animation */}
      <div
        style={{
          transform: `rotate(${settleRotate}) translate(${settleTranslate})`,
          transition: settled
            ? "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
            : "none",
          position: "relative",
        }}
      >
        {/* 3D flip container */}
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: flipping ? "rotateY(90deg)" : "rotateY(0deg)",
            transition: "transform 0.22s ease-in-out",
          }}
        >
          {/* Card face */}
          <div
            style={{
              borderRadius: 2,
              overflow: "hidden",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(0,0,0,0.06)",
            }}
          >
            <PostcardPreview draft={draft} side={side} />
          </div>
        </div>

        {/* Subtle cast shadow — separate element so it doesn't flip */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: -8,
            left: "3%",
            right: "3%",
            height: 16,
            background: "rgba(0,0,0,0.08)",
            filter: "blur(8px)",
            borderRadius: "50%",
            zIndex: -1,
          }}
        />
      </div>

      {/* Flip hint */}
      <p
        style={{
          textAlign: "center",
          marginTop: "var(--s-4, 16px)",
          fontFamily: "var(--mono, monospace)",
          fontSize: "var(--t-micro, 11px)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-faint, #888)",
          opacity: settled ? 1 : 0,
          transition: "opacity 0.4s 0.4s",
          userSelect: "none",
        }}
      >
        {side === "front" ? "click to see the back →" : "← click to flip back"}
      </p>
    </div>
  );
}
