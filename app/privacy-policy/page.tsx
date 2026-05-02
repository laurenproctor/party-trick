import { Show, UserButton } from "@clerk/nextjs";

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* sysbar */}
      <div className="pt-sysbar">
        <span className="blink">●</span>
        <span>P<span className="art">ART</span>Y TRICK</span>
        <span className="sep">/</span>
        <span>PRIVACY POLICY</span>
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
      <section style={{ position: "relative", background: "var(--ink)", padding: "var(--s-8) var(--margin)", marginBottom: "var(--s-9)" }}>
        <p className="t-cap" style={{ color: "var(--red)", marginBottom: "var(--s-4)" }}>
          [LEGAL / BORING BUT IMPORTANT]
        </p>

        <h1 className="shout" style={{ marginBottom: "var(--s-5)", maxWidth: "100%", color: "var(--paper)" }}>
          We use your data to make the app work.{" "}
          <span style={{ color: "var(--red)" }}>Not to sell you things.</span>
        </h1>

        <p style={{ fontFamily: "var(--mono)", fontSize: 20, lineHeight: 1.6, margin: 0, color: "var(--ink-faint)" }}>
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
              Party Trick ("we," "us," "our") is a social web app that generates comedic images from your descriptions.
              This Privacy Policy explains what data we collect, why we collect it, and what we do with it.
              We'll try to keep this readable.
            </p>
          </div>

          {[
            {
              number: "01",
              title: "What we collect",
              items: [
                ["Text you submit", "The descriptions and prompts you type in to generate images. We store these to power regeneration and improve the pipeline."],
                ["Generated images", "The outputs we create from your prompts. Stored so you can share and revisit them."],
                ["Account info", "If you sign up: email address, name, and profile data from your sign-in provider (e.g. Google). Used to manage your account."],
                ["Payment info", "Processed by Stripe. We never see or store your full card number."],
                ["Usage data", "Which features you use, how often, session duration. Used to make the app less bad."],
                ["Device & browser info", "Standard technical data (browser type, IP address, referring URL). Used for security and debugging."],
              ],
            },
            {
              number: "02",
              title: "What we don't collect",
              items: [
                ["Audio recordings", "If you use voice input, we transcribe it immediately and discard the audio. We do not store recordings."],
                ["Biometric data", "We don't collect or process biometric identifiers."],
                ["Sensitive personal info", "We don't ask for or want it. Don't put it in your prompts."],
              ],
            },
            {
              number: "03",
              title: "How we use it",
              items: [
                ["To generate images", "Your prompts go to a generation pipeline. That's the whole product."],
                ["To operate the app", "Authentication, payments, session management, abuse prevention."],
                ["To improve Party Trick", "Aggregate usage patterns help us understand what's working and what's broken."],
                ["To send you emails", "Only transactional ones — receipts, password resets, that kind of thing. No newsletters unless you opt in."],
              ],
            },
            {
              number: "04",
              title: "Who we share it with",
              items: [
                ["Stripe", "Payment processing. They have their own privacy policy."],
                ["Supabase", "Database and file storage. Your data lives on their infrastructure."],
                ["Clerk", "Authentication. Manages sign-in, sessions, and identity."],
                ["Image generation providers", "Your prompts are sent to the models that generate images. We use providers that do not train on user data."],
                ["No one else", "We do not sell your data. We do not broker it. We do not share it for advertising."],
              ],
            },
            {
              number: "05",
              title: "Cookies & tracking",
              items: [
                ["Session cookies", "Required for you to stay logged in. No way around this."],
                ["Analytics", "We use privacy-respecting analytics. No third-party ad trackers."],
                ["No cross-site tracking", "We don't follow you around the internet."],
              ],
            },
            {
              number: "06",
              title: "Your rights",
              items: [
                ["Access", "You can ask what data we have about you."],
                ["Deletion", "You can ask us to delete your account and associated data. We'll do it."],
                ["Export", "You can request a copy of your data."],
                ["Correction", "If something's wrong, tell us and we'll fix it."],
                ["To exercise any of these", "Email us at legal@partytrick.app"],
              ],
            },
            {
              number: "07",
              title: "Data retention",
              items: [
                ["Generations", "Stored until you delete them or close your account."],
                ["Account data", "Deleted within 30 days of account closure."],
                ["Logs & usage data", "Retained for up to 90 days for debugging, then deleted."],
                ["Payments", "Stripe retains transaction records for legal and financial compliance."],
              ],
            },
            {
              number: "08",
              title: "Security",
              items: [
                ["Encryption in transit", "All data is transmitted over HTTPS."],
                ["Encryption at rest", "Sensitive data is encrypted at rest in our database."],
                ["Access controls", "Only the people who need to fix things have access to production data."],
                ["No system is perfect", "If we discover a breach that affects you, we'll tell you."],
              ],
            },
            {
              number: "09",
              title: "Children",
              items: [
                ["Age requirement", "Party Trick is not for children under 13. We do not knowingly collect data from anyone under 13."],
                ["If you're a parent", "If you think your child has an account, contact us and we'll delete it."],
              ],
            },
            {
              number: "10",
              title: "Changes to this policy",
              items: [
                ["We'll update this page", "If we make material changes, we'll notify you via email or in-app notice."],
                ["Continued use = acceptance", "Using Party Trick after changes means you accept the updated policy."],
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
              If you have questions about this policy or your data, email{" "}
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
            <a href="/privacy-policy" className="active">Privacy</a>
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
