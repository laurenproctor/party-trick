"use client";

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

export default function PricingPage() {
  return (
    <>
      {/* sysbar */}
      <div className="pt-sysbar">
        <span className="blink">●</span>
        <span>P<span className="art">ART</span>Y TRICK</span>
        <span className="sep">/</span>
        <span>PRICING</span>
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
          <a href="/pricing" className="active">Pricing</a>
        </div>
      </nav>

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "var(--s-5) var(--margin) 0" }}>

        {/* ── [01] HERO ── */}
        <section style={{ marginBottom: "var(--s-10)", position: "relative", paddingTop: "var(--s-8)", paddingBottom: "var(--s-9)" }}>
          <div className="tape tape-green tape-l3" style={{ position: "absolute", top: 0, right: 80 }} />
          <div className="tape tape-black tape-r2" style={{ position: "absolute", bottom: 0, left: "20%" }} />

          <h1 className="shout" style={{ marginBottom: "var(--s-5)", maxWidth: "80%" }}>
            Pick Your Version{" "}
            <span style={{ color: "var(--red)" }}>of the Night</span>
          </h1>

          <p style={{ fontFamily: "var(--mono)", fontSize: 28, lineHeight: 1.45, marginBottom: "var(--s-7)", maxWidth: 680 }}>
            Play solo, or start a party. It only gets worse{" "}
            <span style={{ fontStyle: "italic" }}>(in a good way).</span>
          </p>

          <div style={{ display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <a href="/play" className="btn btn-lg btn-red">
              Start a Party <span className="arrow">→</span>
            </a>
            <a href="/play" className="btn btn-lg">
              Try It Solo <span className="arrow">→</span>
            </a>
          </div>
        </section>

        {/* ── [02] PARTY MODE ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ PARTY MODE ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-3)" }}>Start a Party</h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", marginBottom: "var(--s-7)", color: "var(--ink-soft)" }}>
            Take turns. It gets weird. Then it gets accurate.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-6)" }}>

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

        {/* ── [03] SOLO ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ NOT READY TO COMMIT? ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-3)" }}>Not Ready to Commit?</h2>
          <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", marginBottom: "var(--s-7)", color: "var(--ink-soft)" }}>
            Try a few versions of yourself.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-6)" }}>

            {/* Quick Tricks */}
            <div className="card">
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ QUICK TRICKS ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$4.32</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-3)" }}>5 Party Tricks</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["See different versions of the same moment", "Find the one that actually hits", "Same engine as Party Mode"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/play" className="btn btn-lg" style={{ display: "inline-block" }}>
                Get 5 Tricks <span className="arrow">→</span>
              </a>
            </div>

            {/* Deep Cuts */}
            <div className="card">
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ DEEP CUTS ]</p>
              <div style={{ marginBottom: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d3)", lineHeight: 1 }}>$8.32</span>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", marginLeft: "var(--s-3)" }}>15 Party Tricks</span>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-6)", display: "flex", flexDirection: "column", gap: "var(--s-2)" }}>
                {["Push the joke further", "Try different interpretations", "This is where it gets specific"].map((item) => (
                  <li key={item} style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", display: "flex", gap: "var(--s-2)" }}>
                    <span style={{ color: "var(--red)" }}>→</span> {item}
                  </li>
                ))}
              </ul>
              <a href="/play" className="btn btn-lg" style={{ display: "inline-block" }}>
                Get 15 Tricks <span className="arrow">→</span>
              </a>
            </div>

          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [04] FREE PREVIEW ── */}
        <section style={{ marginBottom: "var(--s-10)", maxWidth: 640 }}>
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

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-4)" }}>
            {[
              ["Save / Download", "$2.32"],
              ['Lock "This Is Me"', "$1.32"],
              ["Send as a postcard", "—"],
              ["Put it on something you'll regret later", "—"],
            ].map(([action, price]) => (
              <div key={action} style={{ borderTop: "2px solid var(--ink)", paddingTop: "var(--s-4)" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", marginBottom: "var(--s-3)", lineHeight: 1.3 }}>{action}</p>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d4)", color: price === "—" ? "var(--ink-faint)" : "var(--ink)" }}>{price}</span>
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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--s-6)" }}>

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

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--s-6)" }}>
            {[
              ["01", "Describe a moment", "Say what happened. Or just talk."],
              ["02", "See a version of yourself", "Not always flattering."],
              ["03", "Try it again", "It gets worse. Or better. Same thing."],
            ].map(([num, title, desc]) => (
              <div key={num} style={{ borderTop: "2px solid var(--ink)", paddingTop: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d4)", color: "var(--red)", display: "block", marginBottom: "var(--s-3)" }}>{num}</span>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", fontWeight: 600, marginBottom: "var(--s-2)" }}>{title}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="rule-fat" style={{ marginBottom: "var(--s-10)" }} />

        {/* ── [08] SOCIAL PROOF ── */}
        <section style={{ marginBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-8)" }}>[ WHAT PEOPLE SAY ]</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--s-5)", alignItems: "flex-start" }}>
            {QUOTES.map((quote, i) => {
              const tilts = ["rotate(-2deg)", "rotate(1.5deg)", "rotate(-1deg)", "rotate(3deg)", "rotate(-2.5deg)"];
              const sizes = [28, 24, 32, 22, 26];
              return (
                <div
                  key={quote}
                  className="scrawl"
                  style={{
                    transform: tilts[i],
                    fontSize: sizes[i],
                    display: "inline-block",
                    padding: "var(--s-4) var(--s-5)",
                    border: "2px solid var(--ink)",
                    background: i % 2 === 0 ? "var(--paper)" : "var(--accent-deep)",
                    color: i % 2 === 0 ? "var(--ink)" : "var(--paper)",
                    maxWidth: 280,
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
        <section style={{ marginBottom: "var(--s-10)", maxWidth: 720 }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ QUESTIONS ]</p>
          <h2 className="t-d2" style={{ marginBottom: "var(--s-8)" }}>Questions</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {FAQ.map(([q, a], i) => (
              <div key={q} style={{ borderTop: i === 0 ? "2px solid var(--ink)" : "1px solid var(--ink-faint)", borderBottom: i === FAQ.length - 1 ? "2px solid var(--ink)" : "none", padding: "var(--s-5) 0" }}>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", fontWeight: 600, marginBottom: "var(--s-2)" }}>{q}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)" }}>{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── [10] FINAL CTA ── */}
        <section style={{ paddingBottom: "var(--s-10)", paddingTop: "var(--s-8)", textAlign: "center", position: "relative", background: "var(--accent-deep)", marginLeft: "calc(var(--margin) * -1)", marginRight: "calc(var(--margin) * -1)", paddingLeft: "var(--margin)", paddingRight: "var(--margin)" }}>
          <div className="tape tape-black tape-r3" style={{ position: "absolute", top: -20, left: "15%" }} />
          <div className="tape tape-green tape-l3" style={{ position: "absolute", top: -10, right: "20%" }} />

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

      </main>

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
            <div className="ascii">{`>_ it reads the room`}</div>
          </div>
          <div>
            <h5>Product</h5>
            <a href="/play">Play</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h5>Legal</h5>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
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
