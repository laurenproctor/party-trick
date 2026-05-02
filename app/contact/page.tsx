"use client";

import { useState } from "react";

const URGENCY_OPTIONS = [
  { value: "calm", label: "I'm calm" },
  { value: "spiraling", label: "Mildly spiraling" },
  { value: "ruined", label: "This ruined the moment" },
  { value: "improved", label: "This improved the moment too much" },
];

export default function ContactPage() {
  const [urgency, setUrgency] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* sysbar */}
      <div className="pt-sysbar">
        <span className="blink">●</span>
        <span>P<span className="art">ART</span>Y TRICK</span>
        <span className="sep">/</span>
        <span>CONTACT</span>
        <span className="right">
          <span>EST. 2026</span>
        </span>
      </div>

      {/* nav */}
      <nav className="pt-nav">
        <a href="/" className="logo">
          P<span className="art">ART</span>y Tr<span className="x">i</span>ck<sup>™</sup>
        </a>
        <div className="pt-links">
          <a href="/play">Play</a>
          <a href="/contact" className="active">Contact</a>
        </div>
      </nav>

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "var(--s-5) var(--margin) 0" }}>

        {/* ── HERO ── */}
        <section style={{ marginBottom: "var(--s-9)", position: "relative", background: "var(--accent-deep)", padding: "var(--s-8) var(--margin)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>
            [SUPPORT / FEEDBACK / EXISTENTIAL QUERIES]
          </p>

          <h1 className="shout" style={{ marginBottom: "var(--s-5)", maxWidth: "100%", color: "var(--paper)" }}>
            You made it to the least fun page on the site.{" "}
            <span style={{ color: "var(--red)" }}>Respect.</span>
          </h1>

          <p style={{ fontFamily: "var(--mono)", fontSize: 28, lineHeight: 1.45, margin: 0, color: "var(--paper)" }}>
            If something{" "}
            <span className="hover-glyph">
              <span className="hover-glyph-icon" style={{ bottom: "100%" }}>
                <svg className="glyph" width="28" height="28" viewBox="0 0 56 56">
                  <path d="M 12 24 Q 12 8, 28 8 Q 44 8, 44 24 Q 44 34, 38 38 L 38 46 L 32 46 L 32 42 L 24 42 L 24 46 L 18 46 L 18 38 Q 12 34, 12 24 Z" fill="none" stroke="var(--paper)" strokeWidth="2.5" strokeLinejoin="round"/>
                  <circle cx="22" cy="24" r="3" fill="var(--red)"/>
                  <circle cx="34" cy="24" r="3" fill="var(--red)"/>
                  <path d="M 26 32 L 30 32" stroke="var(--paper)" strokeWidth="2"/>
                </svg>
              </span>
              broke
            </span>

            , felt{" "}
            <span className="hover-glyph">
              <span className="hover-glyph-icon" style={{ bottom: "100%" }}>
                <svg className="glyph" width="24" height="24" viewBox="0 0 56 56">
                  <polygon points="28,5 52,50 4,50" fill="var(--hi-yellow)" stroke="var(--paper)" strokeWidth="2.5" strokeLinejoin="round"/>
                  <path d="M 28 20 L 28 36" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="28" cy="42" r="2" fill="var(--ink)"/>
                </svg>
              </span>
              weird
            </span>
            , or{" "}
            <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
              worked so well
              <svg viewBox="0 0 180 48" preserveAspectRatio="none" style={{ position: "absolute", inset: "-8px -10px", width: "calc(100% + 20px)", height: "calc(100% + 16px)", pointerEvents: "none" }} aria-hidden="true">
                <ellipse cx="90" cy="24" rx="86" ry="20" fill="none" stroke="var(--red)" strokeWidth="2.5" strokeLinecap="round" pathLength="100"
                  style={{ strokeDasharray: "97 3", strokeDashoffset: "0", filter: "url(#squiggle)" }} />
                <filter id="squiggle">
                  <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="3" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </svg>
            </span>
            {" "}it made you suspicious,{" "}
            <span style={{ fontStyle: "italic", fontWeight: 700 }}>tell us.</span>
          </p>

          {/* tape decoration */}
          <div className="tape tape-green tape-l3" style={{ position: "absolute", top: -16, right: 80 }} />
        </section>

        {/* ── REASONS ── */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-6)", marginBottom: "var(--s-5)" }}>
          <div>
            <p className="t-d4" style={{ marginBottom: "var(--s-5)" }}>
              We read everything.{" "}
              <span className="scrawl scrawl-sm" style={{ display: "inline", transform: "rotate(-2deg)", fontSize: 22 }}>
                Eventually.
              </span>
            </p>

            <ul style={{ listStyle: "none", padding: "0 0 0 var(--s-5)", margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
              {[
                ["Something not working?", "Tell us what happened"],
                ["Got charged and now questioning your life choices?", "We can help"],
                ["Want to collaborate, invest, or \"take this to the next level\"?", "Bold. Go ahead"],
                ["Just want to say something cryptic?", "We'll interpret it generously"],
              ].map(([situation, response]) => (
                <li key={situation} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-3)", alignItems: "flex-start" }}>
                  <svg className="glyph" width="14" height="14" viewBox="0 0 56 56" style={{ flexShrink: 0, marginTop: 3 }}>
                    <polygon points="28,5 34,22 52,22 38,32 44,50 28,40 12,50 18,32 4,22 22,22" fill="var(--red)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                  <span>
                    <span style={{ color: "var(--ink-soft)" }}>{situation}</span>
                    <span style={{ color: "var(--red)" }}> → </span>
                    <span style={{ fontStyle: "italic", fontWeight: 700, color: "var(--ink)" }}>{response}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* response time — polaroids: 2 top, 1 centered below */}
          <div style={{ alignSelf: "start", marginTop: "var(--s-7)", display: "flex", flexDirection: "column", gap: 32, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 32 }}>
              {[
                { speed: "FAST", cond: "if it's broken", tilt: "polaroid", bg: "var(--red)", color: "var(--ink)" },
                { speed: "MEDIUM", cond: "if it's interesting", tilt: "polaroid polaroid-tilt-r", bg: "var(--accent)", color: "var(--paper)" },
              ].map(({ speed, cond, tilt, bg, color }) => (
                <div key={speed} className={tilt} style={{ width: 220 }}>
                  <div className="ph" style={{ height: 150, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--hero-tape)", fontSize: 54, color, letterSpacing: "0.02em" }}>
                    {speed}
                  </div>
                  <span className="caption">{cond}</span>
                </div>
              ))}
            </div>
            <div className="polaroid" style={{ width: 220 }}>
              <div className="ph" style={{ height: 150, background: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--hero-tape)", fontSize: 54, color: "var(--paper)", letterSpacing: "0.02em" }}>
                SLOW
              </div>
              <span className="caption">if it&apos;s philosophical</span>
            </div>
          </div>
        </section>

        {/* ── FORM ── */}
        <section style={{ maxWidth: 640, marginBottom: "var(--s-10)" }}>
          {submitted ? (
            <div style={{ padding: "var(--s-8) 0", textAlign: "center" }}>
              <p className="t-d3" style={{ marginBottom: "var(--s-4)" }}>
                Sent. <span style={{ color: "var(--red)" }}>✓</span>
              </p>
              <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "inline-block", marginTop: "var(--s-3)" }}>
                We'll get back to you. Not instantly. But not never.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--s-6)", paddingTop: "var(--s-7)" }}>

              <label className="field">
                <span className="field-label">
                  Your email
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", display: "block", marginBottom: "var(--s-2)", letterSpacing: "0.05em" }}>
                  (we will only use this for good or neutral purposes)
                </span>
                <input className="input" type="email" required placeholder="you@somewhere.com" />
              </label>

              <label className="field">
                <span className="field-label">
                  What happened
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", display: "block", marginBottom: "var(--s-2)", letterSpacing: "0.05em" }}>
                  (be honest. the worse it sounds, the better we can fix it)
                </span>
                <textarea className="textarea" required placeholder="Start anywhere." />
              </label>

              <div className="field">
                <span className="field-label" style={{ lineHeight: 1 }}>How urgent is this?</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-1)", marginTop: "var(--s-2)" }}>
                  {URGENCY_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "var(--s-3)",
                        fontFamily: "var(--mono)",
                        fontSize: "var(--t-small)",
                        lineHeight: 1,
                        cursor: "pointer",
                        padding: "8px",
                        border: urgency === opt.value ? "2px solid var(--red)" : "2px solid transparent",
                        background: urgency === opt.value ? "rgba(0,214,71,0.07)" : "transparent",
                        transition: "all var(--dur-fast)",
                      }}
                    >
                      <input
                        type="radio"
                        name="urgency"
                        value={opt.value}
                        checked={urgency === opt.value}
                        onChange={() => setUrgency(opt.value)}
                        style={{ accentColor: "var(--red)" }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <label className="field">
                <span className="field-label">
                  Attach evidence
                  <span style={{ fontFamily: "var(--mono)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: "var(--t-micro)", color: "var(--ink-faint)", marginLeft: "var(--s-2)" }}>
                    (optional)
                  </span>
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", display: "block", marginBottom: "var(--s-2)", letterSpacing: "0.05em" }}>
                  (screenshots, receipts, emotional damage)
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "var(--t-small)",
                    width: "100%",
                    padding: "10px 12px",
                    border: "2px dashed var(--ink)",
                    background: "var(--paper)",
                    cursor: "pointer",
                  }}
                />
              </label>

              <div>
                <button className="btn btn-lg btn-red" type="submit">
                  Send it <span className="arrow">→</span>
                </button>
                <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "inline-block", marginTop: "var(--s-3)", marginLeft: 32, color: "#0044ff", fontSize: 20 }}>
                  We'll get back to you. Not instantly. But not never.
                </p>
              </div>

            </form>
          )}
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ paddingBottom: "var(--s-10)", paddingTop: "var(--s-8)", textAlign: "center", position: "relative", background: "var(--red)", marginLeft: "calc(var(--margin) * -1)", marginRight: "calc(var(--margin) * -1)", paddingLeft: "var(--margin)", paddingRight: "var(--margin)" }}>
          <div className="tape tape-black tape-xl tape-r3" style={{ position: "absolute", top: -32, left: "15%" }} />
          <div className="tape tape-black-2 tape-xl tape-l6" style={{ position: "absolute", top: -20, right: "20%" }} />

          <p className="t-cap" style={{ marginBottom: "var(--s-4)" }}>[ NOT DONE YET ]</p>

          <h2 className="t-d2" style={{ marginBottom: "var(--s-4)" }}>
            Most people don't stop at one.
          </h2>

          <p style={{ fontFamily: "var(--hand)", fontSize: 28, color: "var(--red)", marginBottom: "var(--s-6)", transform: "rotate(-1deg)", display: "inline-block" }}>
            The next one is usually better. Or worse in a more interesting way.
          </p>

          <div style={{ marginTop: "var(--s-5)" }}>
            <a href="/play" className="btn btn-lg btn-blue">
              Get another Party Trick <span className="arrow">→</span>
            </a>
          </div>
        </section>

      </main>

      {/* footer */}
      <footer>
        {/* ── MARQUEE ── */}
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
                <span>THE NEXT ONE IS ALWAYS WORSE IN A MORE INTERESTING WAY</span>
                <span style={{ color: "var(--red)" }}>✦</span>
              </span>
            ))}
          </div>
        </div>

        <div className="pt-foot">
          <div>
            <div className="colofon">P<span className="art">ART</span>y Tr<span className="x">i</span>ck</div>
            <div className="ascii">{`>_ the portrait you deserve`}</div>
          </div>
          <div>
            <h5>Product</h5>
            <a href="/play">Play</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h5>Legal</h5>
            <a href="#">Privacy</a>
            <a href="/terms-of-service">Terms</a>
          </div>
          <div>
            <h5>Status</h5>
            <a href="#">All systems go</a>
          </div>
        </div>
        <div className="pt-foot-bar">
          <span>© 2026 P<span className="art">ART</span>y Trick</span>
          <span className="blink">●</span>
          <span>MADE IN NYC WITH CHAOS & ♥︎</span>
        </div>
      </footer>
    </>
  );
}
