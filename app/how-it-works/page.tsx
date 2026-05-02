import SiteNav from "../components/SiteNav";

const STEPS = [
  {
    num: "01",
    label: "catch the moment",
    head: "Hit record. Don't think about it.",
    body: "Your friend is mid-sentence being exactly themselves. Someone is ordering wrong. The vibe is already happening. You don't stage it. You don't wait for a better angle. You just point and press. The less curated, the more accurate.",
    aside: "unfiltered works better",
  },
  {
    num: "02",
    label: "the read",
    head: "We form an opinion immediately.",
    body: "Once you record, Party Trick processes the moment — what was said, how it was said, what the situation implies, what signals are leaking through that the person definitely didn't intend. This is not a personality quiz. It's a fast, confident read of exactly who this person is being right now.",
    aside: "takes about as long as a first impression",
  },
  {
    num: "03",
    label: "the portrait",
    head: "Not flattering. Not neutral. Specific.",
    body: "The read becomes a portrait. Features are exaggerated. Assumptions are made visible. The things someone would never say out loud get drawn in. It looks like a bad drawing because bad drawings have the courage to commit. It will be accurate in ways the subject will find annoying.",
    aside: "intentionally bad",
  },
  {
    num: "04",
    label: "fresh reads",
    head: "Go again. It gets worse in a better way.",
    body: "You get up to two more interpretations of the same moment. Ask for a harder read. Ask it to focus on the drink order. Ask it to remove that cigarette (you don't smoke). Each Fresh Read escalates — same input, totally different conclusion. This is the part where everyone starts arguing about which one is most accurate.",
    aside: "never the same angle twice",
  },
  {
    num: "05",
    label: "party mode",
    head: "One person pays. Everyone gets got.",
    body: "One person unlocks a Party session. Everyone takes turns. The phone passes around the table. Each person gets their moment captured. The best parties end with at least one person saying 'that's not even close' about a portrait that is clearly them. We've seen it happen.",
    aside: "pass the phone",
  },
];

const FAQS = [
  {
    q: "Is this going to be mean?",
    a: "It's going to be accurate. There's a difference. Party Trick doesn't target protected attributes or go for cruelty. It goes for specificity. You will probably recognize the person. They might have feelings about it.",
  },
  {
    q: "What actually happens to my recording?",
    a: "It gets transcribed and analyzed to build your Fresh Read. We're not archiving your voice or building a profile. We process the moment, generate the portrait, and move on. The output lives at a shareable link as long as you want it to.",
  },
  {
    q: "The portrait doesn't look like them.",
    a: "That's the point. The portrait looks like who they're being in this moment — not their LinkedIn photo. If your friend is being incredibly particular about the restaurant wine list, the portrait will look like someone who is incredibly particular about the restaurant wine list. That's accurate.",
  },
  {
    q: "Can I use this on myself?",
    a: "Yes. It's worse. Turns out people are extremely willing to describe their own moments and then extremely upset when they're read correctly. Go for it.",
  },
  {
    q: "What's a Fresh Read?",
    a: "A Fresh Read is a new interpretation of the same moment. Same input, different conclusion. Some reframe the situation. Some push harder. Some change what details matter. The point is that interpretation is unstable — and watching it shift in real time is most of the fun.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <SiteNav page="HOW IT WORKS" activeLink="how-it-works" />

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 var(--margin)" }}>

        {/* ── HERO ── */}
        <section style={{ paddingTop: "var(--s-8)", paddingBottom: "var(--s-9)", borderBottom: "2px solid var(--ink)", position: "relative" }}>
          <div className="tape tape-red tape-xl tape-l3" style={{ position: "absolute", top: 0, right: 80 }} />

          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ HOW THIS WORKS ]</p>

          <h1 className="shout" style={{ marginBottom: "var(--s-5)", maxWidth: "80%" }}>
            It reads the room.{" "}
            <span style={{ color: "var(--red)" }}>Then it reads you.</span>
          </h1>

          <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-lede)", lineHeight: 1.55, maxWidth: 640, color: "var(--ink-soft)", marginBottom: "var(--s-7)" }}>
            Party Trick takes a moment — caught on audio, completely unfiltered — and produces a portrait that is intentionally bad and specifically accurate. Here's exactly how that happens.
          </p>

          <a href="/play" className="btn btn-lg btn-red">
            Skip the explanation → just try it <span className="arrow">→</span>
          </a>
        </section>

        {/* ── STEPS ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)" }}>
          {STEPS.map(({ num, label, head, body, aside }, i) => (
            <div
              key={num}
              className="hiw-step"
              style={{
                paddingTop: "var(--s-7)",
                paddingBottom: "var(--s-7)",
                borderBottom: i < STEPS.length - 1 ? "1px solid var(--ink-faint)" : "none",
              }}
            >
              {/* number */}
              <div>
                <span style={{ fontFamily: "var(--display-bebas)", fontSize: "var(--t-d1)", color: "var(--red)", lineHeight: 0.8, display: "block" }}>{num}</span>
                <span className="t-micro" style={{ color: "var(--ink-soft)", marginTop: "var(--s-2)", display: "block" }}>{label}</span>
              </div>

              {/* content */}
              <div>
                <h2 style={{ fontFamily: "var(--display-cond)", fontSize: "var(--t-d3)", textTransform: "uppercase", lineHeight: 1, marginBottom: "var(--s-4)", letterSpacing: "-0.01em" }}>
                  {head}
                </h2>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", lineHeight: 1.65, color: "var(--ink-soft)", maxWidth: 560 }}>
                  {body}
                </p>
              </div>

              {/* aside */}
              <div style={{ paddingTop: "var(--s-3)" }}>
                <span
                  className="scrawl scrawl-sm"
                  style={{
                    display: "inline-block",
                    transform: i % 2 === 0 ? "rotate(-2deg)" : "rotate(1.5deg)",
                    fontSize: 20,
                  }}
                >
                  {aside}
                </span>
              </div>
            </div>
          ))}
        </section>

        {/* ── THE HONESTY BOX ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)" }}>
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
            <div>
              <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ WHAT THIS IS ]</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
                {[
                  "A moment capture system",
                  "A fast interpretation engine",
                  "A generator of social reactions",
                  "Intentionally bad on purpose",
                  "Surprisingly accurate by accident",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", borderTop: "1px solid var(--ink-faint)", paddingTop: "var(--s-3)" }}>
                    <span style={{ color: "var(--red)", fontFamily: "var(--term)", fontSize: 20, lineHeight: 1 }}>✓</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="t-cap" style={{ color: "var(--ink-soft)", marginBottom: "var(--s-5)" }}>[ WHAT THIS ISN'T ]</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-3)" }}>
                {[
                  "A factual representation",
                  "A personality analysis tool",
                  "A stable identity model",
                  "A flattering portrait service",
                  "Going to be subtle about it",
                ].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: "var(--s-4)", borderTop: "1px solid var(--ink-faint)", paddingTop: "var(--s-3)" }}>
                    <span style={{ color: "var(--ink-soft)", fontFamily: "var(--term)", fontSize: 20, lineHeight: 1 }}>✗</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "var(--ink-soft)", textDecoration: "line-through", textDecorationColor: "var(--ink-faint)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY IT WORKS ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-6)" }}>[ WHY IT WORKS ]</p>

          <div className="grid-3" style={{ gap: "var(--s-6)" }}>
            {[
              {
                label: "it commits",
                text: "Most things wait for more information before saying anything. Party Trick decides immediately, from partial information, with total confidence. That commitment is why it lands.",
              },
              {
                label: "recognition > accuracy",
                text: "People don't respond to correct. They respond to 'oh god that's them.' The portrait doesn't need to be a photograph. It needs to feel true. Those are different things.",
              },
              {
                label: "the tension is the thing",
                text: "The best moments are the ones where one person says 'that's not even close' and everyone else goes quiet. That gap between read and reality is where the conversation actually starts.",
              },
            ].map(({ label, text }) => (
              <div key={label} style={{ borderTop: "2px solid var(--ink)", paddingTop: "var(--s-5)" }}>
                <p style={{ fontFamily: "var(--hand)", fontSize: 26, color: "var(--red)", marginBottom: "var(--s-4)", lineHeight: 1.1 }}>{label}</p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", lineHeight: 1.65, color: "var(--ink-soft)" }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)" }}>
          <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-7)" }}>[ QUESTIONS PEOPLE ASK WITH A TONE ]</p>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, maxWidth: 800 }}>
            {FAQS.map(({ q, a }, i) => (
              <div
                key={q}
                style={{
                  borderTop: "2px solid var(--ink)",
                  paddingTop: "var(--s-5)",
                  paddingBottom: "var(--s-6)",
                  borderBottom: i === FAQS.length - 1 ? "2px solid var(--ink)" : "none",
                }}
              >
                <p style={{ fontFamily: "var(--display-black)", fontSize: "var(--t-body)", textTransform: "uppercase", letterSpacing: "0.03em", marginBottom: "var(--s-3)" }}>
                  <span style={{ color: "var(--red)", marginRight: "var(--s-3)" }}>Q.</span>
                  {q}
                </p>
                <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", lineHeight: 1.65, color: "var(--ink-soft)", paddingLeft: "var(--s-7)" }}>
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* ── FINAL CTA ── */}
      <section style={{
        paddingTop: "var(--s-9)",
        paddingBottom: "var(--s-10)",
        textAlign: "center",
        position: "relative",
        background: "var(--accent-deep)",
        paddingLeft: "var(--margin)",
        paddingRight: "var(--margin)",
      }}>
        <div className="tape tape-green tape-xl tape-l3" style={{ position: "absolute", top: -52, left: "var(--margin)" }} />
        <div className="tape tape-black tape-xl tape-r3" style={{ position: "absolute", top: -40, right: "15%" }} />

        <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-5)" }}>[ OKAY YOU'VE READ ENOUGH ]</p>

        <h2 className="shout" style={{ marginBottom: "var(--s-4)", color: "var(--paper)" }}>
          The first one is{" "}
          <span style={{ color: "var(--red)" }}>free.</span>
        </h2>

        <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", color: "rgba(255,255,255,0.6)", marginBottom: "var(--s-7)", lineHeight: 1.5 }}>
          No login required. No commitment. Just a moment and whatever we do with it.
        </p>

        <div style={{ display: "flex", gap: "var(--s-4)", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/play" className="btn btn-lg btn-red">
            Get a Party Trick <span className="arrow">→</span>
          </a>
          <a href="/pricing" className="btn btn-lg">
            See Pricing <span className="arrow">→</span>
          </a>
        </div>
      </section>

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
