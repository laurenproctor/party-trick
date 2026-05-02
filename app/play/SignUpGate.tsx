"use client";

export type GateReason = "deeper" | "worse" | "highres" | "save";

const COPY: Record<GateReason, { headline: string; subhead: string }> = {
  deeper: {
    headline: "The next one is worse in a better way.",
    subhead: "Sign up to unlock more reads.",
  },
  worse: {
    headline: "You think that was bad?",
    subhead: "It gets worse.",
  },
  highres: {
    headline: "You deserve the full version.",
    subhead: "Remove the filter.",
  },
  save: {
    headline: "It'll be gone if you leave.",
    subhead: "Save it to your account.",
  },
};

interface SignUpGateProps {
  reason: GateReason;
  onDismiss: () => void;
}

export default function SignUpGate({ reason, onDismiss }: SignUpGateProps) {
  const { headline, subhead } = COPY[reason];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--margin)",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}
    >
      <div style={{
        background: "var(--paper)",
        border: "2px solid var(--ink)",
        padding: "var(--s-7) var(--s-7) var(--s-6)",
        maxWidth: 480,
        width: "100%",
        position: "relative",
      }}>
        {/* tape decoration */}
        <div className="tape tape-green tape-l3" style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%) rotate(-2deg)" }} />

        <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ NOT SO FAST ]</p>

        <h2 style={{
          fontFamily: "var(--hand)",
          fontSize: "clamp(28px, 5vw, 42px)",
          lineHeight: 1.05,
          textTransform: "uppercase",
          marginBottom: "var(--s-3)",
          color: "var(--ink)",
        }}>
          {headline}
        </h2>

        <p style={{
          fontFamily: "var(--mono)",
          fontSize: "var(--t-body)",
          color: "var(--ink-soft)",
          marginBottom: "var(--s-6)",
          lineHeight: 1.5,
        }}>
          {subhead}
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
          <a
            href="/sign-up"
            className="btn btn-lg btn-red"
            style={{ textAlign: "center", justifyContent: "center" }}
            onClick={() => console.log("cta_signup_clicked")}
          >
            Sign Up Free <span className="arrow">→</span>
          </a>
          <button
            onClick={onDismiss}
            className="btn btn-lg"
            style={{ background: "transparent", color: "var(--ink-soft)", border: "none", fontSize: "var(--t-small)", fontFamily: "var(--hand)", cursor: "pointer", textTransform: "uppercase" }}
          >
            I'll Stay Blurry
          </button>
        </div>
      </div>
    </div>
  );
}
