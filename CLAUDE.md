# Claude Code Operating System — Party Trick

## Role

You are building Party Trick, a real-time AI-powered social web app designed for group usage.

This is NOT a generic AI app.

This is a **behavior-driven product** where:

* speed > quality
* iteration > perfection
* recognition > aesthetics

---

## Core Rule

Every decision must optimize for:

> “Does this make the user generate one more version?”

If not, deprioritize or remove it.

---

## Product Priorities (in order)

1. Generation speed and responsiveness
2. Regeneration flow (low friction)
3. Funny + recognizable outputs
4. Group usability (passing device, shared reactions)
5. Clean monetization insertion points

---

## Non-Goals (Strict)

Do NOT:

* build a full social network feed in v1
* over-engineer image quality controls
* add complex editing tools
* require login before first generation
* create pro-grade customization UI

Avoid anything that slows down:

* first output
* regeneration loop

---

## Architecture Requirements

Use:

* Next.js (App Router)
* TypeScript
* Clerk (auth)
* Supabase (DB + storage)
* Stripe (payments)
* Server Actions or API routes
* Background job queue for generation

---

## Core Routes

Implement:

* `/` → homepage (examples + CTA)
* `/play` → main generation interface
* `/party/[sessionId]` → Party Mode session
* `/result/[id]` → shareable output page

---

## Core Features to Build First

1. Free generation (no login)
2. Audio input + transcription
3. Prompt pipeline (modular)
4. Image generation endpoint
5. Regeneration system
6. Identity labeling
7. Watermark + caption overlay
8. Basic Stripe checkout
9. Party Mode timer

---

## Generation Constraints

All outputs must:

* be intentionally “bad” stylistically
* include visual humor (not just captions)
* feel socially specific
* avoid cruelty or protected attributes

---

## Regeneration Rules

* Never reuse the same comedic angle
* Each regeneration must escalate specificity
* Preserve the same moment
* Change interpretation, not just style

---

## UI Rules

* Do not label buttons as “Generate” or “Regenerate”

* Use:

  * “Try another”
  * “Go deeper”
  * “Make it worse”

* Show results immediately

* Keep interface minimal

---

## Party Mode Rules

* One payer unlocks session
* Multiple users interact sequentially
* No per-action payment during session
* Timer must be visible

---

## Data Model (High Level)

Tables:

* users
* sessions (party mode)
* generations
* identity_labels
* payments

---

## Final Instruction

Build fast, test quickly, prioritize experience over completeness.

If forced to choose:

* choose fun over correctness
* choose speed over flexibility
* choose clarity over features
