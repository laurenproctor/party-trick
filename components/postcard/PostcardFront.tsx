"use client";

import type { FrontRenderSpec } from "../../lib/postcard/render";

interface PostcardFrontProps {
  spec: FrontRenderSpec;
  className?: string;
}

// Grain texture as inline SVG data URI — no external assets required
const GRAIN_TEXTURE = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`;

export default function PostcardFront({ spec, className = "" }: PostcardFrontProps) {
  const { layout, imageUrl, toneAccentHex, cssVars } = spec;

  return (
    <div
      className={`postcard-front tone-${layout.tone} ${className}`}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: layout.aspectRatio,
        overflow: "hidden",
        background: "#f5f4f0",
        ...cssVarsToStyle(cssVars),
      }}
    >
      {/* ── Image layer ── */}
      <img
        src={imageUrl}
        alt="Party Trick"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: layout.imagePosition === "inset" ? "contain" : "cover",
          objectPosition: "center",
          display: "block",
          padding: layout.imagePosition === "inset" ? "8%" : 0,
        }}
      />

      {/* ── Matte texture overlay ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: GRAIN_TEXTURE,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />

      {/* ── Subtle vignette ── */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.12) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Branding mark ── */}
      {layout.brandingPosition !== "none" && (
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: layout.brandingPosition === "bottom-right" ? "4%" : undefined,
            left: layout.brandingPosition === "bottom-left" ? "4%" : undefined,
            fontFamily: "var(--punk-idols, Anton, sans-serif)",
            fontSize: "clamp(8px, 1.4%, 14px)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.7)",
            mixBlendMode: "screen",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          p<span style={{ color: toneAccentHex, opacity: 0.9 }}>ART</span>y Tr
          <span style={{ fontSize: "0.85em" }}>i</span>ck
        </div>
      )}
    </div>
  );
}

function cssVarsToStyle(vars: Record<string, string>): React.CSSProperties {
  return vars as unknown as React.CSSProperties;
}

import type React from "react";
