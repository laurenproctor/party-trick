import { Show, UserButton } from "@clerk/nextjs";

export default function TermsPage() {
  return (
    <>
      {/* sysbar */}
      <div className="pt-sysbar">
        <span className="blink">●</span>
        <span>P<span className="art">ART</span>Y TRICK</span>
        <span className="sep">/</span>
        <span>TERMS OF SERVICE</span>
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
          <a href="/how-it-works">How It Works</a>
          <a href="/contact">Contact</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: "relative", background: "var(--accent-deep)", padding: "var(--s-8) var(--margin)", marginBottom: "var(--s-9)" }}>
        <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>
          [LEGAL / THE PART EVERYONE SKIPS]
        </p>

        <h1 className="shout" style={{ marginBottom: "var(--s-5)", maxWidth: "100%", color: "var(--paper)" }}>
          These are the rules.{" "}
          <span style={{ color: "var(--red)" }}>They're pretty reasonable.</span>
        </h1>

        <p style={{ fontFamily: "var(--mono)", fontSize: 20, lineHeight: 1.6, margin: 0, color: "rgba(255,255,255,0.5)" }}>
          Last updated: May 1, 2026
        </p>

        <div className="tape tape-green tape-l3" style={{ position: "absolute", top: -16, right: 80 }} />
      </section>

      <main style={{ maxWidth: "var(--max-w)", margin: "0 auto", padding: "0 var(--margin)" }}>

        {/* ── CONTENT ── */}
        <section style={{ maxWidth: 760, marginBottom: "var(--s-10)", display: "flex", flexDirection: "column", gap: "var(--s-8)" }}>

          {/* Intro */}
          <div>
            <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", lineHeight: 1.75, color: "var(--ink-soft)" }}>
              These Terms of Service ("Terms") govern your use of Party Trick ("we," "us," "our") — the app, the website,
              the generated images, all of it. By using Party Trick, you agree to these Terms. If you don't agree, don't use it.
              That's the whole system.
            </p>
          </div>

          {[
            {
              number: "01",
              title: "What Party Trick is",
              items: [
                ["The service", "Party Trick lets you describe a moment and receive a generated image. The outputs are intentionally absurd. We are not responsible for how funny or unfunny they are."],
                ["Not a professional tool", "This is a party app. Do not use it for anything that requires accuracy, professionalism, or dignity."],
                ["Subject to change", "We can add, remove, or change features at any time. We'll try to give you notice for big changes."],
              ],
            },
            {
              number: "02",
              title: "Your account",
              items: [
                ["You must be 13 or older", "By using Party Trick, you confirm you are at least 13 years old."],
                ["Keep your credentials safe", "You're responsible for your account. Don't share your password. If something looks compromised, tell us."],
                ["One account per person", "Don't create multiple accounts to game the free tier or exploit limits."],
                ["We can suspend accounts", "If you violate these Terms, we can suspend or terminate your account. We'd rather not, but we will."],
              ],
            },
            {
              number: "03",
              title: "What you can do",
              items: [
                ["Generate images", "Use the app as intended. Describe moments, get images, share them."],
                ["Share outputs", "You can share your generated images. You own the outputs you generate, subject to the limits below."],
                ["Use Party Mode", "One payer can unlock a session. Everyone else can participate for free within that session."],
              ],
            },
            {
              number: "04",
              title: "What you can't do",
              items: [
                ["Generate harmful content", "No sexual content involving minors. No content designed to harass specific individuals. No content that violates applicable law."],
                ["Abuse the generation pipeline", "Don't scrape, flood, or automate requests to overwhelm our systems. Don't reverse-engineer the generation pipeline."],
                ["Misrepresent outputs", "Don't present a generated image as a real photograph. Don't use outputs to deceive, defame, or defraud anyone."],
                ["Resell access", "Don't resell or sublicense access to Party Trick without our written permission."],
                ["Violate anyone's rights", "Don't submit prompts that infringe on someone else's intellectual property, privacy, or publicity rights."],
              ],
            },
            {
              number: "05",
              title: "Content & ownership",
              items: [
                ["Your prompts", "You own the text you submit. By submitting it, you grant us a license to process it to deliver the service."],
                ["Generated images", "You own the images generated from your prompts. We retain a license to use anonymized outputs to improve the service."],
                ["Our stuff", "The app, the UI, the brand, the name, the logo — all ours. Don't copy or repurpose them without permission."],
                ["No guarantees on output", "We make no guarantees that outputs will be good, funny, accurate, or usable for any particular purpose. That's kind of the point."],
              ],
            },
            {
              number: "06",
              title: "Payments",
              items: [
                ["Processed by Stripe", "All payments are handled by Stripe. By paying, you also agree to Stripe's terms."],
                ["No refunds on generated content", "Once a generation has run, the compute cost is incurred. We don't offer refunds for completed generations."],
                ["Refunds for billing errors", "If you were charged incorrectly, contact us and we'll make it right."],
                ["Party Mode sessions", "Party Mode unlocks are non-transferable and expire at the end of the session timer."],
                ["Pricing can change", "We'll give you advance notice before changing prices on existing subscription tiers."],
              ],
            },
            {
              number: "07",
              title: "Disclaimers",
              items: [
                ["Provided as-is", "Party Trick is provided without warranty of any kind. We don't guarantee uptime, accuracy, or that it will work at your specific party."],
                ["Not liable for outputs", "We are not responsible for how you use or share generated images. The comedy is yours; so is the context."],
                ["Limitation of liability", "To the maximum extent permitted by law, our total liability to you for any claim is limited to the amount you paid us in the 12 months before the claim arose."],
              ],
            },
            {
              number: "08",
              title: "Termination",
              items: [
                ["You can leave anytime", "Delete your account at any time from settings. We'll remove your data per our Privacy Policy."],
                ["We can end this too", "We can suspend or terminate your access for violating these Terms, for legal reasons, or if we shut down the service."],
                ["What survives", "Sections on content ownership, disclaimers, and limitation of liability survive termination."],
              ],
            },
            {
              number: "09",
              title: "Governing law",
              items: [
                ["New York", "These Terms are governed by the laws of the State of New York, without regard to its conflict of law provisions."],
                ["Disputes", "If we have a dispute, we'll try to resolve it directly first. If that fails, disputes will be resolved through binding arbitration in New York, NY."],
              ],
            },
            {
              number: "10",
              title: "Changes to these Terms",
              items: [
                ["We can update these", "We'll update this page when Terms change. For material changes, we'll notify you by email or in-app."],
                ["Continued use = acceptance", "Using Party Trick after changes are posted means you accept the updated Terms."],
              ],
            },
          ].map(({ number, title, items }) => (
            <div key={number}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "var(--s-4)", marginBottom: "var(--s-5)", borderBottom: "2px solid var(--ink)", paddingBottom: "var(--s-3)" }}>
                <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--red)", letterSpacing: "0.1em" }}>
                  {number}
                </span>
                <h2 style={{ fontFamily: "var(--display-black)", fontSize: "var(--t-d4)", margin: 0, lineHeight: 1 }}>
                  {title}
                </h2>
              </div>
              <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
                {items.map(([term, description]) => (
                  <div key={term} style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "var(--s-5)", alignItems: "baseline" }}>
                    <dt style={{ fontFamily: "var(--mono)", fontSize: "var(--t-small)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.5 }}>
                      {term}
                    </dt>
                    <dd style={{ margin: 0, fontFamily: "var(--mono)", fontSize: "var(--t-small)", color: "var(--ink-soft)", lineHeight: 1.7 }}>
                      {description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          {/* Contact */}
          <div style={{ background: "var(--paper-2)", padding: "var(--s-7)", borderLeft: "4px solid var(--red)" }}>
            <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-3)" }}>[QUESTIONS?]</p>
            <p style={{ fontFamily: "var(--mono)", fontSize: "var(--t-body)", lineHeight: 1.7, margin: 0 }}>
              If you have questions about these Terms, email{" "}
              <a href="mailto:legal@partytrick.app" style={{ color: "var(--accent)", fontWeight: 700 }}>
                legal@partytrick.app
              </a>
              . We'll respond like actual humans.
            </p>
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
            <a href="/terms-of-service" className="active">Terms</a>
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
