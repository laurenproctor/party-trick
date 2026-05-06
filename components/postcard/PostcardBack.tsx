"use client";

import HandwritingPreview from "./HandwritingPreview";
import type { BackRenderSpec } from "../../lib/postcard/render";

interface PostcardBackProps {
  spec: BackRenderSpec;
  className?: string;
}

export default function PostcardBack({ spec, className = "" }: PostcardBackProps) {
  const { layout, message, handwritingStyle, recipientName, recipientAddress, senderName, toneAccentHex, cssVars } = spec;

  const isCenter = layout.messageAlignment === "center";

  return (
    <div
      className={`postcard-back tone-${layout.tone} ${className}`}
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "6 / 4",
        background: "#faf9f6",
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "auto 1fr auto",
        gap: "0",
        padding: "5% 4%",
        fontFamily: "var(--sans)",
        overflow: "hidden",
        ...cssVarsToStyle(cssVars),
      }}
    >
      {/* ── Vertical divider ── */}
      {layout.divider === "vertical-line" && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "10%",
            bottom: "10%",
            left: "54%",
            width: 1,
            background: "rgba(10,10,10,0.15)",
          }}
        />
      )}

      {/* ── Message zone (left) ── */}
      <div
        style={{
          gridColumn: layout.messageZone.gridColumn,
          gridRow: "1 / 4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          paddingRight: "6%",
          paddingTop: "4%",
        }}
      >
        {/* Tone-accent top rule */}
        <div
          style={{
            width: 28,
            height: 2,
            background: toneAccentHex,
            marginBottom: "6%",
            alignSelf: isCenter ? "center" : "flex-start",
          }}
        />

        <HandwritingPreview
          message={message || "Write something worth mailing."}
          style={handwritingStyle}
          seed={hashString(message)}
          fontSize="clamp(10px, 2.2%, 16px)"
          lineHeight={layout.messageZone.lineHeightScale}
          color="var(--ink, #0a0a0a)"
        />

        {/* Sender sign-off */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "8%",
            fontFamily: "var(--hand)",
            fontSize: "clamp(9px, 1.8%, 13px)",
            color: "var(--ink-soft, #555)",
            transform: "rotate(-1deg)",
            alignSelf: isCenter ? "center" : "flex-start",
          }}
        >
          — {senderName || "anonymous"}
        </div>
      </div>

      {/* ── Address zone (right) ── */}
      <div
        style={{
          gridColumn: layout.addressZone.gridColumn,
          gridRow: "2 / 4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          paddingBottom: "4%",
          paddingLeft: "4%",
        }}
      >
        <div
          style={{
            fontFamily: "var(--sans)",
            fontSize: "clamp(8px, 1.6%, 12px)",
            lineHeight: 1.6,
            color: "var(--ink, #0a0a0a)",
          }}
        >
          <div style={{ fontWeight: 600, marginBottom: "0.2em" }}>{recipientName}</div>
          <div>{recipientAddress.line1}</div>
          {recipientAddress.line2 && <div>{recipientAddress.line2}</div>}
          <div>
            {recipientAddress.city}, {recipientAddress.state} {recipientAddress.zip}
          </div>
          {recipientAddress.country !== "US" && (
            <div style={{ marginTop: "0.3em", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.85em" }}>
              {recipientAddress.country}
            </div>
          )}
        </div>
      </div>

      {/* ── Postage placeholder (top-right) ── */}
      <div
        style={{
          gridColumn: layout.addressZone.gridColumn,
          gridRow: "1 / 2",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          paddingLeft: "4%",
        }}
      >
        <PostagePlaceholder accentHex={toneAccentHex} />
      </div>
    </div>
  );
}

function PostagePlaceholder({ accentHex }: { accentHex: string }) {
  return (
    <div
      style={{
        width: "clamp(32px, 6%, 48px)",
        aspectRatio: "3 / 4",
        border: `1.5px dashed ${accentHex}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: 0.5,
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: "clamp(5px, 0.9%, 7px)",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: accentHex,
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
      >
        POSTAGE
      </span>
    </div>
  );
}

function cssVarsToStyle(vars: Record<string, string>): React.CSSProperties {
  return vars as unknown as React.CSSProperties;
}

function hashString(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = (h * 33) ^ s.charCodeAt(i);
  return Math.abs(h);
}

import type React from "react";
