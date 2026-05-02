"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import WatermarkCanvas from "./WatermarkCanvas";
import SignUpGate, { type GateReason } from "./SignUpGate";

type PageState = "input" | "loading" | "result" | "locked";

const LOCKED_BUTTONS: { label: string; reason: GateReason }[] = [
  { label: "What's actually going on here?", reason: "deeper" },
  { label: "Say it like you mean it", reason: "worse" },
  { label: "Remove the filter", reason: "highres" },
  { label: "Save this", reason: "save" },
];

export default function PlayPage() {
  const { isLoaded } = useUser();
  const [state, setState] = useState<PageState>("input");
  const [moment, setMoment] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [gate, setGate] = useState<GateReason | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!moment.trim()) return;

    setState("loading");
    setError(null);
    console.log("play_submitted");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moment: moment.trim() }),
      });

      if (res.status === 403) {
        setState("locked");
        return;
      }

      if (!res.ok) {
        throw new Error("generation failed");
      }

      const data = await res.json();
      setImageUrl(data.imageUrl);
      setState("result");
    } catch {
      setError("Something went wrong. Try again.");
      setState("input");
    }
  }

  if (!isLoaded) return null;

  return (
    <>
      {/* sysbar */}
      <div className="pt-sysbar">
        <span className="blink">●</span>
        <span>P<span className="art">ART</span>Y TRICK</span>
        <span className="sep">/</span>
        <span>PLAY</span>
        <span className="right">
          <a href="/sign-in" style={{ color: "var(--paper)", textDecoration: "none" }}>Sign in</a>
          <span className="sep">·</span>
          <a href="/sign-up" style={{ color: "var(--red)", textDecoration: "none" }}>Sign up</a>
        </span>
      </div>

      {/* nav */}
      <nav className="pt-nav">
        <a href="/" className="logo">
          P<span className="art">ART</span>y Tr<span className="x">i</span>ck<sup>™</sup>
        </a>
        <div className="pt-links">
          <a href="/play" className="active">Play</a>
          <a href="/how-it-works">How It Works</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "var(--s-8) var(--margin) var(--s-10)" }}>

        {/* ── INPUT STATE ── */}
        {state === "input" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "start" }}>
            <div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ YOUR MOMENT ]</p>
              <h1 className="shout" style={{ marginBottom: "var(--s-5)", maxWidth: "90%" }}>
                Describe the{" "}
                <span style={{ color: "var(--red)" }}>moment.</span>
              </h1>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "var(--s-7)" }}>
                Where were they? What happened? The less filtered, the better it works.
              </p>

              <form onSubmit={handleSubmit}>
                <label className="field-label" htmlFor="moment-input">The moment</label>
                <textarea
                  id="moment-input"
                  className="textarea"
                  rows={5}
                  placeholder="Describe the moment"
                  value={moment}
                  onChange={(e) => setMoment(e.target.value)}
                  style={{ marginBottom: "var(--s-5)", resize: "vertical" }}
                  autoFocus
                />
                {error && (
                  <p className="field-error" style={{ marginBottom: "var(--s-4)" }}>{error}</p>
                )}
                <button
                  type="submit"
                  className="btn btn-lg btn-red"
                  disabled={!moment.trim()}
                  style={{ opacity: moment.trim() ? 1 : 0.5 }}
                >
                  Get My Party Trick <span className="arrow">→</span>
                </button>
              </form>

              <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1.5deg)", display: "inline-block", fontSize: 18, marginTop: "var(--s-5)", color: "var(--ink-soft)" }}>
                First one's free. No sign-up required.
              </p>
            </div>

            {/* placeholder polaroid */}
            <div className="polaroid-tf02" style={{ transform: "rotate(1.5deg)", width: "100%", position: "relative" }}>
              <img src="/assets/tape-green-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(-5deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
              <div style={{ width: "100%", aspectRatio: "3/4", background: "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 6px, transparent 6px 12px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>yours here</span>
              </div>
              <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>the portrait you deserve</p>
            </div>
          </div>
        )}

        {/* ── LOADING STATE ── */}
        {state === "loading" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "start" }}>
            <div style={{ paddingTop: "var(--s-8)" }}>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ FORMING AN OPINION ]</p>
              <h2 style={{ fontFamily: "var(--display-cond)", fontSize: "var(--t-d2)", textTransform: "uppercase", lineHeight: 1, marginBottom: "var(--s-5)" }}>
                Reading the room...
              </h2>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6 }}>
                Takes about as long as a first impression.
              </p>
            </div>

            <div className="polaroid-tf02" style={{ transform: "rotate(1deg)", width: "100%", position: "relative" }}>
              <img src="/assets/tape-black-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(3deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
              <div style={{ width: "100%", aspectRatio: "3/4", background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="blink" style={{ color: "var(--red)", fontFamily: "var(--display-bebas)", fontSize: 48, letterSpacing: "0.05em" }}>●</span>
              </div>
              <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>forming an opinion</p>
            </div>
          </div>
        )}

        {/* ── RESULT STATE ── */}
        {state === "result" && imageUrl && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "start" }}>
            <div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ FRESH READ ]</p>
              <h2 className="shout" style={{ marginBottom: "var(--s-4)" }}>
                There it is.
              </h2>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "var(--s-7)" }}>
                Sign up to go deeper, get the full version, or save it.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
                {LOCKED_BUTTONS.map(({ label, reason }) => (
                  <button
                    key={reason}
                    className="btn btn-lg"
                    style={{ justifyContent: "space-between", background: "var(--paper)", color: "var(--ink)", position: "relative" }}
                    onClick={() => {
                      setGate(reason);
                      console.log("paywall_opened");
                    }}
                  >
                    <span>{label}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "var(--red)", letterSpacing: "0.1em" }}>SIGN UP →</span>
                  </button>
                ))}
              </div>

              <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "inline-block", fontSize: 18, marginTop: "var(--s-5)", color: "var(--ink-soft)" }}>
                or it disappears when you close this tab
              </p>
            </div>

            <div className="polaroid-tf02" style={{ transform: "rotate(-1.5deg)", width: "100%", position: "relative" }}>
              <img src="/assets/tape-red-1.png" alt="" style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%) rotate(4deg)", width: 160, opacity: 0.9, pointerEvents: "none", zIndex: 2 }} />
              <WatermarkCanvas imageUrl={imageUrl} />
              <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>the free version</p>
            </div>
          </div>
        )}

        {/* ── LOCKED STATE (already used free) ── */}
        {state === "locked" && (
          <div style={{ paddingTop: "var(--s-6)", maxWidth: 640 }}>
            <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ YOU'VE HAD YOUR FREE ONE ]</p>
            <h1 className="shout" style={{ marginBottom: "var(--s-5)" }}>
              That was the{" "}
              <span style={{ color: "var(--red)" }}>polite version.</span>
            </h1>
            <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "var(--s-7)" }}>
              Sign up to get more Party Tricks, unlock Fresh Reads, and see the full unfiltered version.
            </p>
            <div style={{ display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
              <a
                href="/sign-up"
                className="btn btn-lg btn-red"
                onClick={() => console.log("cta_signup_clicked")}
              >
                See the real read <span className="arrow">→</span>
              </a>
              <a href="/pricing" className="btn btn-lg">
                See Pricing <span className="arrow">→</span>
              </a>
            </div>
          </div>
        )}

      </main>

      {/* sign-up gate modal */}
      {gate && (
        <SignUpGate reason={gate} onDismiss={() => setGate(null)} />
      )}

      {/* footer */}
      <footer>
        <div className="marquee" style={{ background: "#0044ff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", color: "#fff" }}>
          <div className="marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>
                <span>THE PORTRAIT YOU DESERVE. DRAWN WRONG. READ RIGHT.</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>DESCRIBE A MOMENT · GET A CURSED IMAGE</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>PASS THE PHONE · EVERYONE PLAYS</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>INTENTIONALLY BAD · SPECIFICALLY YOU</span>
                <span style={{ color: "var(--red)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>
        <div className="pt-foot">
          <div>
            <div className="colofon">P<span className="art">ART</span>y Tr<span className="x">i</span>ck</div>
            <div className="ascii">{"the portrait you deserve"}</div>
          </div>
          <div>
            <h5>Product</h5>
            <a href="/play">Play</a>
            <a href="/how-it-works">How It Works</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h5>Legal</h5>
            <a href="/privacy-policy">Privacy</a>
            <a href="/terms-of-service">Terms</a>
            <a href="/refunds">Refunds</a>
          </div>
          <div>
            <h5>Status</h5>
            <a href="#">All systems go</a>
          </div>
        </div>
        <div className="pt-foot-bar">
          <span>© 2026 P<span className="art">ART</span>y Trick</span>
          <span className="blink">●</span>
          <span>MADE IN NYC WITH ♥︎ & CHAOS</span>
        </div>
      </footer>
    </>
  );
}
