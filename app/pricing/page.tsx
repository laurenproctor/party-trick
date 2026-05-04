"use client";

import SiteNav from "../components/SiteNav";

const QUOTES = [
  "this is painfully accurate",
  "why do i always become this person",
  "do me worse",
  "wait this is actually me",
  "this is too real",
];

const FAQ = [
  ["Do I need an account?", "Not to try it. Only to save things."],
  ["Can multiple people use Party Mode?", "Yes. That's the point."],
  ["Are generations unlimited in Party Mode?", "Within the session, yes. Don't waste them."],
  ['What does "bad illustration" mean?', "You'll understand immediately."],
  ["Can I share these?", "You probably will."],
];

async function handleBuy(priceId: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  const { url } = await res.json();
  window.location.href = url;
}

export default function PricingPage() {
  return (
    <>
      <SiteNav page="PRICING" />

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "var(--s-5) var(--margin) 0" }}>

        {/* ── [01] HERO ── */}
        <section style={{ marginBottom: "var(--s-10)", position: "relative", paddingTop: "var(--s-8)", paddingBottom: "var(--s-9)", borderBottom: "2px solid var(--ink)" }}>
          <div className="tape tape-green tape-l3" style={{ position: "absolute", top: 0, right: 80 }} />
          <div className="tape tape-black tape-r2" style={{ position: "absolute", bottom: 0, left: "20%" }} />

          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "end" }}>
            <div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ PRICING ]</p>
              <h1 className="shout" style={{ marginBottom: "var(--s-5)" }}>
                Choose Your{" "}
                <span style={{ color: "var(--red)" }}>Damage.</span>
              </h1>
              <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", lineHeight: 1.6, color: "var(--ink-soft)" }}>
                A few Party Tricks or full control of the room. However this night is going, there&apos;s a trick for it.
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)", paddingBottom: "var(--s-2)" }}>
              {[
                { label: "Free", detail: "1 Party Trick · low-res · watermark" },
                { label: "From $4.32", detail: "Party Trick packs · 5 or 15 Tricks" },
                { label: "From $6.32", detail: "Party Mode · 5 or 15 minutes" },
                { label: "From $10/mo", detail: "Subscription · 30–250 Tricks" },
              ].map(({ label, detail }) => (
                <div key={label} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "var(--s-4)", alignItems: "baseline", borderTop: "1px solid var(--ink-faint)", paddingTop: "var(--s-3)" }}>
                  <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d4)", lineHeight: 1 }}>{label}</span>
                  <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)" }}>{detail}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: "var(--s-3)", paddingTop: "var(--s-5)" }}>
                <a href="/play" className="btn btn-lg btn-red">Start a Party <span className="arrow">→</span></a>
                <a href="/play" className="btn btn-lg">Get Party Tricks <span className="arrow">→</span></a>
              </div>
            </div>
          </div>
        </section>

        {/* ── [02] PARTY MODE ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ PARTY MODE ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-3)" }}>Start a Party</h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", marginBottom: "var(--s-7)", color: "var(--ink-soft)" }}>
            Take turns. It gets weird. Then it gets accurate.
          </p>

          <div className="grid-2" style={{ gap: "var(--s-6)" }}>

            {/* Quick Party */}
            <div className="card">
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ QUICK PARTY ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$6.32</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-3)" }}>5 minutes</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["Try it with friends", "Fast, chaotic, immediate", "Enough to see what happens"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/play" className="btn btn-lg" style={{ display: "inline-block" }}>
                Start Quick Party <span className="arrow">→</span>
              </a>
            </div>

            {/* Real Party */}
            <div className="card" style={{ position: "relative" }}>
              <div className="card-stamp">MOST FUN</div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ REAL PARTY ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$8.32</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-3)" }}>15 minutes</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["Actually take turns", "Multiple versions per person", "Where it starts to feel a little too accurate"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/play" className="btn btn-lg btn-red" style={{ display: "inline-block" }}>
                Start Real Party <span className="arrow">→</span>
              </a>
            </div>

          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [03] GET PARTY TRICKS ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ NOT READY TO COMMIT? ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-3)" }}>Not Ready to Commit?</h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", marginBottom: "var(--s-7)", color: "var(--ink-soft)" }}>
            Try a few versions of yourself.
          </p>

          <div className="grid-2" style={{ gap: "var(--s-6)" }}>

            {/* 2 Tricks pack */}
            <div className="card">
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ QUICK TRICKS ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$4.32</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-3)" }}>2 Party Tricks</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["See different versions of the same moment", "Find the one that actually hits", "No clock, no pressure"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_STRIPE_PRICE_2_TRICKS!)}
                className="btn btn-lg"
                style={{ display: "inline-block" }}
              >
                Get 2 Tricks <span className="arrow">→</span>
              </button>
            </div>

            {/* 4-minute session */}
            <div className="card" style={{ position: "relative" }}>
              <div className="card-stamp">MOST FUN</div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ 4-MINUTE SESSION ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$4.32</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-3)" }}>unlimited for 4 min</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["Go as many times as you want", "Pass the phone, do it together", "This is where it gets specific"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBuy(process.env.NEXT_PUBLIC_STRIPE_PRICE_SESSION!)}
                className="btn btn-lg btn-red"
                style={{ display: "inline-block" }}
              >
                Start 4-Min Session <span className="arrow">→</span>
              </button>
            </div>

          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [04] FREE PREVIEW ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ JUST CURIOUS? ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-5)" }}>Just Curious?</h2>

          <div className="card" style={{ display: "flex", gap: "var(--s-8)", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>Free</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["1 Party Trick", "Low resolution", "Slightly aggressive watermark"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/play" className="btn btn-lg" style={{ display: "inline-block" }}>
                Try It Free <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [05] POST-MOMENT ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ WHEN IT ACTUALLY FEELS LIKE YOU ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-3)" }}>When It Actually Feels Like You</h2>
          <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "inline-block", marginBottom: "var(--s-7)", fontSize: 22 }}>
            You'll know the one.
          </p>

          <div className="grid-4" style={{ gap: "var(--s-4)", alignItems: "stretch" }}>
            {[
              ["Save / Download HD", "$2.32"],
              ['Lock "This Is Me"', "$1.32"],
              ["Send as a postcard", "Coming soon"],
              ["Put it on something you'll regret later", "Coming soon"],
            ].map(([action, price]) => (
              <div key={action} style={{ borderTop: "2px solid var(--ink)", paddingTop: "var(--s-4)", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", marginBottom: "var(--s-3)", lineHeight: 1.3 }}>{action}</p>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d4)", color: price === "Coming soon" ? "var(--ink-faint)" : "var(--ink)" }}>{price}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [06] SUBSCRIPTION ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ SEE YOUR PATTERNS OVER TIME ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-3)" }}>See Your Patterns Over Time</h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", marginBottom: "var(--s-7)", color: "var(--ink-soft)" }}>
            You don't just do this once.
          </p>

          <div className="grid-3" style={{ gap: "var(--s-6)" }}>

            {/* Basic */}
            <div className="card">
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ BASIC ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$10</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-2)" }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["30 Party Tricks", "Save your history", "Revisit past versions"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Plus */}
            <div className="card" style={{ position: "relative" }}>
              <div className="card-stamp">MOST POPULAR</div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ PLUS ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$20</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-2)" }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["100 Party Tricks", "Priority generation", "Discounted Party Mode"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Power */}
            <div className="card">
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ POWER ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$40</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-2)" }}>/month</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["250 Party Tricks", "Priority queue", "Deeper identity tracking"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [07] HOW IT WORKS ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ HOW THIS WORKS ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-8)" }}>How This Works</h2>

          <div className="grid-3" style={{ gap: "var(--s-6)" }}>
            {[
              ["01", "Record audio or choose your own (poorly guided) adventure.", "Turn on your microphone and talk naturally. Party Trick discerns who you are from voice, words, and environmental cues."],
              ["02", "Get a portrait", "Intentionally bad. Specifically you. Not flattering. Accurate."],
              ["03", "Forward accordingly", "Pass the phone. Start an argument. Send it as a postcard. Get it printed on a t-shirt you'll wear ironically and then just wear."],
            ].map(([num, title, desc]) => (
              <div key={num} style={{ borderTop: "2px solid var(--ink)", paddingTop: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d4)", color: "var(--red)", display: "block", marginBottom: "var(--s-3)" }}>{num}</span>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", fontWeight: 700, marginBottom: "var(--s-3)" }}>{title}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [08] SOCIAL PROOF ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-8)" }}>[ WHAT PEOPLE SAY ]</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-8)", alignItems: "center", justifyContent: "center" }}>
            {QUOTES.map((quote, i) => {
              const tilts = ["-2deg", "1.5deg", "-1deg", "3deg", "-2.5deg"];
              const sizes = [28, 24, 32, 22, 26];
              return (
                <div
                  key={quote}
                  className="hand-box quote-card"
                  style={{
                    ["--quote-tilt" as string]: `rotate(${tilts[i]})`,
                    transform: `rotate(${tilts[i]})`,
                    fontFamily: "var(--hand-ball)",
                    fontSize: sizes[i],
                    lineHeight: 1.2,
                    color: "var(--ink)",
                    textAlign: "center",
                    maxWidth: 280,
                    padding: "var(--s-6) var(--s-5)",
                  }}
                >
                  "{quote}"
                </div>
              );
            })}
          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [09] FAQ ── */}
        <section style={{ maxWidth: 720, marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ QUESTIONS ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-8)" }}>Questions</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQ.map(([q, a], i) => (
              <div key={q} style={{ borderTop: i === 0 ? "2px solid var(--ink)" : "1px solid var(--ink-faint)", padding: "var(--s-5) 0" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", fontWeight: 600, marginBottom: "var(--s-2)" }}>{q}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)" }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── [10] FINAL CTA ── */}
      <section style={{ paddingBottom: "var(--s-10)", paddingTop: "var(--s-8)", textAlign: "center", position: "relative", background: "var(--accent-deep)", paddingLeft: "var(--margin)", paddingRight: "var(--margin)" }}>
        <div className="tape tape-black tape-xl tape-r3" style={{ position: "absolute", top: -52, left: "var(--margin)" }} />
        <div className="tape tape-green tape-xl tape-l3" style={{ position: "absolute", top: -40, right: "20%" }} />

        <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ YOU'RE PROBABLY CURIOUS ]</p>

        <h2 className="shout" style={{ marginBottom: "var(--s-7)", color: "var(--paper)" }}>
          You're Probably{" "}
          <span style={{ color: "var(--red)" }}>Curious</span>
        </h2>

        <div style={{ display: "flex", gap: "var(--s-4)", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/play" className="btn btn-lg btn-red">
            Start a Party <span className="arrow">→</span>
          </a>
          <a href="/play" className="btn btn-lg">
            Try One First <span className="arrow">→</span>
          </a>
        </div>
      </section>

      {/* footer */}
      <footer>
        {/* marquee */}
        <div className="marquee" style={{ background: "#0044ff", borderTop: "2px solid var(--ink)", borderBottom: "2px solid var(--ink)", color: "#fff" }}>
          <div className="marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i}>
                <span>IT GETS ACCURATE</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>PASS THE PHONE</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>DESCRIBE A MOMENT · GET A CURSED IMAGE</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>THE NEXT ONE IS ALWAYS WORSE IN A MORE INTERESTING WAY</span>
                <span style={{ color: "var(--red)" }}>✦</span>
                <span>YOU'LL KNOW THE ONE</span>
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
            <a href="#">Privacy</a>
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
