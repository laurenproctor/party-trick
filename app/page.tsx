import { Show, UserButton } from "@clerk/nextjs";

const PORTRAITS = [
  { src: "/assets/bad-drawings/portrait-j-wine.png", label: "She didn't want wine. She wanted control." },
  { src: null, label: "third date, wrong restaurant" },
  { src: null, label: "the group chat i go quiet in" },
  { src: null, label: "airport bar, delayed flight" },
];

const EXAMPLES = [
  { moment: "the work happy hour where i became too honest", verdict: "painfully accurate" },
  { moment: "third date energy, wrong restaurant choice", verdict: "this is too real" },
  { moment: "the dinner where i ordered for the table without asking", verdict: "do me worse" },
  { moment: "the group chat i go quiet in", verdict: "wait this is actually me" },
  { moment: "airport bar, delayed flight, two and a half glasses of wine deep", verdict: "why do i always become this person" },
];

const HOW_IT_WORKS = [
  ["01", "Record audio or choose your own (poorly guided) adventure.", "Turn on your microphone and talk naturally. Party Trick discerns who you are from voice, words, and environmental cues."],
  ["02", "Get a portrait", "Intentionally bad. Specifically you. Not flattering. Accurate."],
  ["03", "Forward accordingly", "Pass the phone. Start an argument. Send it as a postcard. Get it printed on a t-shirt you'll wear ironically and then just wear."],
];

export default function HomePage() {
  return (
    <>
      {/* sysbar */}
      <div className="pt-sysbar">
        <span className="blink">●</span>
        <span>P<span className="art">ART</span>Y TRICK</span>
        <span className="sep">/</span>
        <span>HOME</span>
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
          <a href="/pricing">Pricing</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 var(--margin)" }}>

        {/* ── HERO ── */}
        <section style={{ paddingTop: "var(--s-8)", paddingBottom: "var(--s-10)", position: "relative" }}>
          <div className="tape tape-green tape-l3" style={{ position: "absolute", top: 0, right: 120 }} />

          <h1 className="shout" style={{ marginBottom: "var(--s-6)", maxWidth: "90%" }}>
            Bad drawings of{" "}
            <span style={{ color: "var(--red)" }}>exactly</span>{" "}
            the person you are.
          </h1>

          <p style={{ fontFamily: "var(--mono)", fontSize: 28, lineHeight: 1.5, marginBottom: "var(--s-8)", maxWidth: 680, color: "var(--ink-soft)" }}>
            You provide the evidence. The portrait provides the verdict.{" "}
            <span style={{ fontStyle: "italic" }}>Forward accordingly.</span>
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "var(--s-5)", flexWrap: "wrap" }}>
              <a href="/play" className="btn btn-lg btn-red">
                Get a Party Trick <span className="arrow">→</span>
              </a>
              <a href="/play" className="btn btn-lg">
                Start a Party <span className="arrow">→</span>
              </a>
            </div>
            <p className="scrawl scrawl-sm" style={{ transform: "rotate(-1deg)", display: "inline-block", fontSize: 20, margin: 0 }}>
              First one's free. The rest cost a little. <span style={{ color: "#0044ff" }}>Worth it.</span>
            </p>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ HOW THIS WORKS ]</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--s-6)" }}>
            {HOW_IT_WORKS.map(([num, title, desc]) => (
              <div key={num} style={{ borderTop: "2px solid var(--ink)", paddingTop: "var(--s-5)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d4)", color: "var(--red)", display: "block", marginBottom: "var(--s-3)" }}>{num}</span>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", fontWeight: 700, marginBottom: "var(--s-3)" }}>{title}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PORTRAITS ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-7)" }}>[ A RECORD OF MOMENTS, MISREAD CORRECTLY ]</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-7)", alignItems: "start" }}>
            {PORTRAITS.map(({ src, label }, i) => {
              const tilts = ["-1.5deg", "2deg", "-2.5deg", "1deg"];
              const tapes = [
                "/assets/tape-green-1.png",
                "/assets/tape-red-1.png",
                "/assets/tape-blue-1.png",
                "/assets/tape-green-2.png",
              ];
              const tapeRotations = ["-8deg", "5deg", "-4deg", "7deg"];
              return (
                <div
                  key={label}
                  className="polaroid-tf02"
                  style={{ transform: `rotate(${tilts[i]})`, width: "100%" }}
                >
                  <img
                    src={tapes[i]}
                    alt=""
                    style={{
                      position: "absolute",
                      top: -18,
                      left: "50%",
                      transform: `translateX(-50%) rotate(${tapeRotations[i]})`,
                      width: 160,
                      opacity: 0.9,
                      pointerEvents: "none",
                      zIndex: 2,
                    }}
                  />
                  {src ? (
                    <img src={src} alt={label} style={{ display: "block", width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", aspectRatio: "3/4", background: "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 6px, transparent 6px 12px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>yours here</span>
                    </div>
                  )}
                  <p style={{ fontFamily: "var(--hand)", fontSize: 18, lineHeight: 1.3, textAlign: "center", margin: "10px 0 4px", color: "var(--ink)" }}>{label}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── PARTY MODE CALLOUT ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "center" }}>
          <div>
            <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>[ BETTER WITH PEOPLE ]</p>
            <h2 className="t-d2" style={{ marginBottom: "var(--s-5)" }}>Pass the phone.</h2>
            <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", lineHeight: 1.6, marginBottom: "var(--s-7)", color: "var(--ink-soft)" }}>
              Party Mode unlocks for one person and everyone plays. Take turns. Judge each other.
              Try to figure out who the portrait actually got right.
            </p>
            <a href="/play" className="btn btn-lg btn-red">
              Start a Party <span className="arrow">→</span>
            </a>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
            <div className="polaroid" style={{ width: "100%" }}>
              <div className="ph" style={{ height: 120, background: "var(--accent-deep)", justifyContent: "center", flexDirection: "row", padding: "0 var(--s-5)", alignItems: "center", gap: "var(--s-3)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: 36, color: "var(--paper)", letterSpacing: "0.03em" }}>QUICK PARTY</span>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: 36, color: "var(--paper)", opacity: 0.6 }}>$6.32</span>
              </div>
              <div style={{ position: "relative" }}>
                <img src="/assets/site-imgs/fast-party.png" alt="Quick Party example" style={{ display: "block", width: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "var(--s-5)", left: "var(--s-5)", right: "var(--s-5)" }}>
                  <a href="/play" className="btn btn-lg" style={{ display: "block", textAlign: "center" }}>
                    Start Your 5 Minute Party <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="polaroid polaroid-tilt-r" style={{ width: "100%" }}>
              <div className="ph" style={{ height: 120, background: "var(--red)", justifyContent: "center", flexDirection: "row", padding: "0 var(--s-5)", alignItems: "center", gap: "var(--s-3)" }}>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: 36, color: "var(--ink)", letterSpacing: "0.03em" }}>REAL PARTY</span>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: 36, color: "var(--ink)", opacity: 0.6 }}>$8.32</span>
              </div>
              <div style={{ position: "relative" }}>
                <img src="/assets/site-imgs/bachelorette-party.png" alt="Real Party example" style={{ display: "block", width: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: "var(--s-5)", left: "var(--s-5)", right: "var(--s-5)" }}>
                  <a href="/play" className="btn btn-lg btn-red" style={{ display: "block", textAlign: "center" }}>
                    Start Your 15 Minute Party <span className="arrow">→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXAMPLES ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ REAL MOMENTS. REAL VERDICTS. ]</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {EXAMPLES.map(({ moment, verdict }, i) => (
              <div
                key={moment}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                  gap: "var(--s-6)",
                  padding: "var(--s-5) 0",
                  borderBottom: i < EXAMPLES.length - 1 ? "1px solid var(--ink-faint)" : "none",
                }}
              >
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", lineHeight: 1.4, margin: 0 }}>
                  <span style={{ color: "var(--red)", marginRight: "var(--s-3)" }}>→</span>
                  {moment}
                </p>
                <span
                  className="scrawl scrawl-sm"
                  style={{
                    fontSize: 18,
                    color: "var(--ink-soft)",
                    whiteSpace: "nowrap",
                    transform: i % 2 === 0 ? "rotate(-1.5deg)" : "rotate(1deg)",
                    display: "inline-block",
                  }}
                >
                  "{verdict}"
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{
          paddingTop: "var(--s-9)",
          paddingBottom: "var(--s-10)",
          textAlign: "center",
          position: "relative",
          background: "var(--accent-deep)",
          marginLeft: "calc(var(--margin) * -1)",
          marginRight: "calc(var(--margin) * -1)",
          paddingLeft: "var(--margin)",
          paddingRight: "var(--margin)",
        }}>
          <div className="tape tape-green tape-xl tape-l3" style={{ position: "absolute", top: -32, right: "15%" }} />
          <div className="tape tape-black tape-xl tape-r3" style={{ position: "absolute", top: -20, left: "25%" }} />

          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ GO ON THEN ]</p>

          <h2 className="shout" style={{ marginBottom: "var(--s-7)", color: "var(--paper)" }}>
            The first one is{" "}
            <span style={{ color: "var(--red)" }}>free.</span>
          </h2>

          <div style={{ display: "flex", gap: "var(--s-4)", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/play" className="btn btn-lg btn-red">
              Get a Party Trick <span className="arrow">→</span>
            </a>
            <a href="/pricing" className="btn btn-lg">
              See Pricing <span className="arrow">→</span>
            </a>
          </div>
        </section>

      </main>

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
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
          </div>
          <div>
            <h5>Legal</h5>
            <a href="/privacy-policy">Privacy</a>
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
