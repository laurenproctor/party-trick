"use client";

import { useState } from "react";
import { Show, UserButton } from "@clerk/nextjs";

const REASONS = [
  { value: "too-accurate", label: "It was too accurate and I wasn't ready" },
  { value: "not-accurate", label: "It wasn't accurate enough (bold)" },
  { value: "showed-someone", label: "I showed someone and now I regret it" },
  { value: "expected-flattering", label: "I expected something flattering (why)" },
  { value: "other", label: "Other (we'll need details)" },
];

export default function RefundPolicyPage() {
  const [reason, setReason] = useState("");
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
        <span>REFUND POLICY</span>
        <span className="right">
          <Show when="signed-out">
            <a href="/sign-in" style={{ color: "var(--paper)", textDecoration: "none" }}>Sign in</a>
            <span className="sep">·</span>
            <a href="/sign-up" style={{ color: "var(--red)", textDecoration: "none" }}>Sign up</a>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </span>
      </div>

      {/* nav */}
      <nav className="pt-nav">
        <a href="/" className="logo">
          P<span className="art">ART</span>y Tr<span className="x">i</span>ck<sup>™</sup>
        </a>
        <div className="pt-links">
          <a href="/play">Play</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--accent-deep)", padding: "var(--s-8) var(--margin)", marginBottom: "var(--s-9)" }}>
        <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>
          [ REFUNDS / THE PART WE HOPED YOU WOULDN'T FIND ]
        </p>
        <h1 className="shout" style={{ marginBottom: "var(--s-5)", color: "var(--paper)" }}>
          Oh. You want your money back.{" "}
          <span style={{ color: "var(--red)" }}>Noted.</span>
        </h1>
        <p style={{ fontFamily: "var(--mono)", fontSize: 22, lineHeight: 1.5, margin: 0, color: "var(--paper)", opacity: 0.85, maxWidth: 680 }}>
          We spent actual time making that portrait. It was intentionally bad. That was the point.
          But fine. Tell us what happened.
        </p>
        <div className="tape tape-green tape-l3" style={{ position: "absolute", top: -16, right: 80 }} />
      </section>

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 var(--margin)" }}>

        {/* ── POLICY ── */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-9)", marginBottom: "var(--s-10)", alignItems: "start" }}>
          <div>
            <p className="t-d4" style={{ marginBottom: "var(--s-5)" }}>
              The policy.{" "}
              <span className="scrawl scrawl-sm" style={{ display: "inline", transform: "rotate(-2deg)", fontSize: 20 }}>
                Such as it is.
              </span>
            </p>

            <ul style={{ listStyle: "none", padding: "0 0 0 var(--s-5)", margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
              {[
                ["You must submit the form below.", "No exceptions. Not even for charm."],
                ["You must attach the offending portrait.", "We need to see it. For quality purposes. Not because we're curious."],
                ["You must tell us why.", "\"I don't like it\" is not a reason. \"It captured something I wasn't prepared to confront publicly\" is a reason."],
                ["We review every request personally.", "This is not automated. A real human will read your complaint and feel things about it."],
                ["Approved refunds are processed within 5–7 business days.", "We are not fast about this. Neither were you when you uploaded that moment."],
              ].map(([rule, note]) => (
                <li key={rule} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-3)", alignItems: "flex-start" }}>
                  <svg className="glyph" width="14" height="14" viewBox="0 0 56 56" style={{ flexShrink: 0, marginTop: 3 }}>
                    <polygon points="28,5 34,22 52,22 38,32 44,50 28,40 12,50 18,32 4,22 22,22" fill="var(--red)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                  <span>
                    <span style={{ fontWeight: 700, color: "var(--ink)" }}>{rule}</span>
                    <span style={{ color: "var(--ink-soft)" }}> {note}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
            <div className="card" style={{ borderLeft: "4px solid var(--red)" }}>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-3)" }}>[ JUST SO WE'RE CLEAR ]</p>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", lineHeight: 1.6, margin: 0, color: "var(--ink-soft)" }}>
                The portrait was bad on purpose. We did that. With skill. The inaccuracy was intentional.
                The watermark was intentional. The fact that it looked like you was also intentional,
                and frankly the most impressive part.
              </p>
            </div>
            <div className="card">
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-3)" }}>[ THINGS WE WILL NOT REFUND ]</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {[
                  "Emotional damage (this was disclosed)",
                  "Hurt feelings (see above)",
                  "The fact that you showed it to your boss",
                  "Purchases made during a party (you were warned)",
                  "Anything described as \"not what I expected\" (what did you expect)",
                ].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)", color: "var(--ink-soft)" }}>
                    <span style={{ color: "var(--red)", flexShrink: 0 }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── FORM ── */}
        <section style={{ maxWidth: 640, marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ THE FORM ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-3)" }}>Alright. Make your case.</h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginBottom: "var(--s-7)", lineHeight: 1.6 }}>
            Fill this out completely. We read every one. We will have feelings about yours.
          </p>

          {submitted ? (
            <div style={{ padding: "var(--s-8) 0" }}>
              <p className="t-d3" style={{ marginBottom: "var(--s-4)" }}>
                Received. <span style={{ color: "var(--red)" }}>✓</span>
              </p>
              <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "block", marginTop: "var(--s-3)", fontSize: 24 }}>
                We'll review it. Solemnly. With our full attention.{" "}
                <span style={{ color: "#00d647" }}>Probably.</span>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--s-6)" }}>

              <label className="field">
                <span className="field-label">Your email</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-soft)", display: "block", marginBottom: "var(--s-2)", letterSpacing: "0.05em" }}>
                  (so we know who to solemnly process)
                </span>
                <input className="input" type="email" required placeholder="you@somewhere.com" />
              </label>

              <label className="field">
                <span className="field-label">Order or transaction reference</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-soft)", display: "block", marginBottom: "var(--s-2)", letterSpacing: "0.05em" }}>
                  (from your confirmation email — we need proof this actually happened)
                </span>
                <input className="input" type="text" required placeholder="PT-XXXX or Stripe ref" />
              </label>

              <div className="field">
                <span className="field-label">Why didn't you like it?</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-1)", marginTop: "var(--s-2)" }}>
                  {REASONS.map((opt) => (
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
                        border: reason === opt.value ? "2px solid var(--red)" : "2px solid transparent",
                        background: reason === opt.value ? "rgba(0,214,71,0.07)" : "transparent",
                        transition: "all var(--dur-fast)",
                      }}
                    >
                      <input
                        type="radio"
                        name="reason"
                        value={opt.value}
                        checked={reason === opt.value}
                        onChange={() => setReason(opt.value)}
                        style={{ accentColor: "var(--red)" }}
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <label className="field">
                <span className="field-label">Tell us more</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-soft)", display: "block", marginBottom: "var(--s-2)", letterSpacing: "0.05em" }}>
                  ("I didn't like it" will not be sufficient. We have been warned to warn you.)
                </span>
                <textarea className="textarea" required rows={5} placeholder="Describe, in detail, what went wrong. Be specific. We can take it." />
              </label>

              <label className="field">
                <span className="field-label">
                  Attach the portrait
                  <span style={{ fontFamily: "var(--mono)", fontWeight: 400, textTransform: "none", letterSpacing: 0, fontSize: "var(--t-micro)", color: "var(--red)", marginLeft: "var(--s-2)" }}>
                    (required)
                  </span>
                </span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-soft)", display: "block", marginBottom: "var(--s-2)", letterSpacing: "0.05em" }}>
                  (we need to see the specific portrait you're complaining about — yes, this is intentional)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  required
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
                  Submit refund request <span className="arrow">→</span>
                </button>
                <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "block", marginTop: "var(--s-4)", fontSize: 22 }}>
                  We'll review it carefully.{" "}
                  <span style={{ color: "#00d647" }}>No promises.</span>
                </p>
              </div>

            </form>
          )}
        </section>

      </main>

      {/* footer */}
      <footer>
        <div className="marquee" style={{ background: "#0044ff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", color: "#fff" }}>
          <div className="marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>
                <span>IT READS THE ROOM</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>INTENTIONALLY BAD · SPECIFICALLY YOU</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>PASS THE PHONE · EVERYONE PLAYS</span>
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
            <div className="ascii">{"the portrait you deserve"}</div>
          </div>
          <div>
            <h5>Product</h5>
            <a href="/play">Play</a>
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
          <span>MADE IN NYC WITH CHAOS & ♥︎</span>
        </div>
      </footer>
    </>
  );
}
