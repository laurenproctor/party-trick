# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every page of the Party Trick app fully responsive at 600px (phone) and 900px (tablet) breakpoints.

**Architecture:** Add a shared `<SiteNav>` component with hamburger toggle, add a `600px` media query to `tokens.css` and `globals.css` with responsive grid utility classes, then replace hardcoded inline grid styles in each page with those CSS classes.

**Tech Stack:** Next.js App Router, TypeScript, CSS custom properties (no new dependencies)

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `app/components/SiteNav.tsx` | **Create** | Shared nav with hamburger toggle (replaces inline nav in all pages) |
| `app/globals.css` | **Modify** | Mobile nav overlay styles + `.grid-2`, `.grid-3`, `.grid-4` responsive utility classes |
| `app/design/tokens.css` | **Modify** | Extend 900px block + new 600px breakpoint for type scale, spacing, footer |
| `app/page.tsx` | **Modify** | Replace inline nav + inline grid styles with `SiteNav` + CSS classes |
| `app/play/page.tsx` | **Modify** | Replace inline nav + 2-col grid with `SiteNav` + CSS classes |
| `app/pricing/page.tsx` | **Modify** | Replace inline nav + grids with `SiteNav` + CSS classes |
| `app/how-it-works/page.tsx` | **Modify** | Replace inline nav + fixed-sidebar grid with `SiteNav` + CSS classes |
| `app/contact/page.tsx` | **Modify** | Replace inline nav + polaroid row with `SiteNav` + CSS class |
| `app/refunds/page.tsx` | **Modify** | Replace inline nav + 2-col layout with `SiteNav` + CSS class |

---

## Task 1: Add responsive CSS (tokens + globals)

**Files:**
- Modify: `app/design/tokens.css:872-875`
- Modify: `app/globals.css` (append after line 450)

- [ ] **Step 1: Extend the 900px block in `tokens.css`**

Find the existing block at line 872 and replace it:

```css
/* responsive */
@media (max-width: 900px) {
  :root { --t-mega: 80px; --t-d1: 56px; --t-d2: 38px; --t-d3: 26px; --margin: 16px; --gutter: 16px; }
  .pt-foot { grid-template-columns: 1fr 1fr; gap: var(--s-5); }
  .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
  .grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
}

@media (max-width: 600px) {
  :root {
    --t-mega: 56px; --t-d1: 40px; --t-d2: 28px; --t-d3: 20px;
    --t-d4: 26px; --t-lede: 20px; --t-body: 16px; --t-small: 15px;
    --margin: 16px; --gutter: 12px;
  }
  .pt-foot { grid-template-columns: 1fr 1fr; gap: var(--s-4); }
  .pt-foot-bar { flex-direction: column; gap: var(--s-2); text-align: center; }
  .grid-4 { grid-template-columns: 1fr !important; }
  .grid-3 { grid-template-columns: 1fr !important; }
  .grid-2 { grid-template-columns: 1fr !important; }
  .grid-auto-2 { grid-template-columns: 1fr !important; }
  .shout { font-size: calc(var(--t-d1) * 0.9); }
}
```

- [ ] **Step 2: Add mobile nav overlay + responsive grid utilities to `globals.css`**

Append this block at the end of `app/globals.css`:

```css
/* ============================================================
   RESPONSIVE GRID UTILITIES
   ============================================================ */
.grid-2  { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--gutter); }
.grid-3  { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--gutter); }
.grid-4  { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--gutter); }
.grid-auto-2 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--gutter); }

/* ============================================================
   MOBILE NAV
   ============================================================ */
.pt-hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 24px;
  line-height: 1;
  color: var(--ink);
}

.pt-nav-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--paper);
  z-index: 200;
  flex-direction: column;
  padding: var(--s-5) var(--margin);
}

.pt-nav-overlay.open {
  display: flex;
}

.pt-nav-overlay-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--s-8);
}

.pt-nav-overlay-close {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: var(--ink);
  line-height: 1;
  padding: 4px 8px;
}

.pt-nav-overlay-links {
  display: flex;
  flex-direction: column;
  gap: var(--s-6);
}

.pt-nav-overlay-links a {
  font-family: var(--display-cond);
  font-size: var(--t-d2);
  text-transform: uppercase;
  text-decoration: none;
  color: var(--ink);
  line-height: 1;
  letter-spacing: -0.02em;
}

.pt-nav-overlay-links a:hover {
  color: var(--red);
}

.pt-nav-mobile-right {
  display: none;
  align-items: center;
  gap: var(--s-3);
}

@media (max-width: 600px) {
  .pt-links { display: none; }
  .pt-hamburger { display: block; }
  .pt-nav-mobile-right { display: flex; }
  .pt-nav .logo { font-size: 28px; }
  .pt-sysbar { padding: 4px 16px; gap: var(--s-2); font-size: 11px; }
}
```

- [ ] **Step 3: Commit**

```bash
git add app/design/tokens.css app/globals.css
git commit -m "feat(mobile): add responsive breakpoints and grid utilities"
```

---

## Task 2: Create shared SiteNav component

**Files:**
- Create: `app/components/SiteNav.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState } from "react";
import { Show, UserButton } from "@clerk/nextjs";

interface SiteNavProps {
  page: string;
  activeLink?: string;
}

export default function SiteNav({ page, activeLink }: SiteNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* sysbar */}
      <div className="pt-sysbar">
        <span className="blink">●</span>
        <span>P<span className="art">ART</span>Y TRICK</span>
        <span className="sep">/</span>
        <span>{page}</span>
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
          <a href="/play" className={activeLink === "play" ? "active" : ""}>Play</a>
          <a href="/how-it-works" className={activeLink === "how-it-works" ? "active" : ""}>How It Works</a>
          <a href="/contact" className={activeLink === "contact" ? "active" : ""}>Contact</a>
        </div>
        {/* mobile right: Play CTA + hamburger */}
        <div className="pt-nav-mobile-right">
          <a href="/play" className="btn btn-sm btn-red">Play →</a>
          <button
            className="pt-hamburger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* mobile overlay */}
      <div className={`pt-nav-overlay${open ? " open" : ""}`}>
        <div className="pt-nav-overlay-header">
          <a href="/" className="logo" style={{ fontFamily: "var(--punk-idols)", fontSize: 28, textDecoration: "none", color: "var(--ink)", letterSpacing: "-0.02em", textTransform: "lowercase" }}>
            P<span className="art">ART</span>y Tr<span className="x">i</span>ck<sup style={{ fontFamily: "var(--mono)", fontSize: 9, color: "var(--red)" }}>™</sup>
          </a>
          <button
            className="pt-nav-overlay-close"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <div className="pt-nav-overlay-links">
          <a href="/play" onClick={() => setOpen(false)}>Play</a>
          <a href="/pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="/how-it-works" onClick={() => setOpen(false)}>How It Works</a>
          <a href="/sign-in" onClick={() => setOpen(false)}>Sign In</a>
          <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/SiteNav.tsx
git commit -m "feat(mobile): create shared SiteNav component with hamburger menu"
```

---

## Task 3: Update homepage (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Add SiteNav import**

At the top of the file, after the existing import:

```tsx
import SiteNav from "./components/SiteNav";
```

- [ ] **Step 2: Replace inline sysbar + nav with SiteNav**

Remove this block (lines 28–55):
```tsx
      {/* sysbar */}
      <div className="pt-sysbar">
        ...
      </div>

      {/* nav */}
      <nav className="pt-nav">
        ...
      </nav>
```

Replace with:
```tsx
      <SiteNav page="HOME" />
```

- [ ] **Step 3: Replace How It Works grid inline style with CSS class**

Change:
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "var(--s-6)" }}>
```
To:
```tsx
          <div className="grid-3" style={{ gap: "var(--s-6)" }}>
```

- [ ] **Step 4: Replace Portraits grid inline style with CSS class**

Change:
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-7)", alignItems: "start" }}>
```
To:
```tsx
          <div className="grid-4" style={{ gap: "var(--s-7)", alignItems: "start" }}>
```

- [ ] **Step 5: Replace Party Mode Callout 2-col grid with CSS class**

Change:
```tsx
        <section style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "center" }}>
```
To:
```tsx
        <section className="grid-2" style={{ paddingTop: "var(--s-9)", paddingBottom: "var(--s-10)", borderBottom: "2px solid var(--ink)", gap: "var(--s-10)", alignItems: "center" }}>
```

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx
git commit -m "feat(mobile): make homepage responsive"
```

---

## Task 4: Update play page (`app/play/page.tsx`)

**Files:**
- Modify: `app/play/page.tsx`

- [ ] **Step 1: Add SiteNav import**

```tsx
import SiteNav from "../components/SiteNav";
```

- [ ] **Step 2: Replace inline sysbar + nav with SiteNav**

Remove the sysbar and nav blocks and replace with:
```tsx
      <SiteNav page="PLAY" activeLink="play" />
```

- [ ] **Step 3: Replace input state 2-col grid**

Change (line 91):
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "start" }}>
```
To:
```tsx
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
```

- [ ] **Step 4: Replace loading state 2-col grid**

Change (line 145):
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "start" }}>
```
To:
```tsx
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
```

- [ ] **Step 5: Replace result state 2-col grid**

Change (line 168):
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "start" }}>
```
To:
```tsx
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
```

- [ ] **Step 6: Commit**

```bash
git add app/play/page.tsx
git commit -m "feat(mobile): make play page responsive"
```

---

## Task 5: Update pricing page (`app/pricing/page.tsx`)

**Files:**
- Modify: `app/pricing/page.tsx`

- [ ] **Step 1: Add SiteNav import**

```tsx
import SiteNav from "../components/SiteNav";
```

- [ ] **Step 2: Replace inline sysbar + nav with SiteNav**

```tsx
      <SiteNav page="PRICING" activeLink="pricing" />
```

- [ ] **Step 3: Replace hero 2-col grid**

Find the hero section grid (around line 61):
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "end" }}>
```
Replace with:
```tsx
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "end" }}>
```

- [ ] **Step 4: Replace party mode section 2-col grids**

Find each `gridTemplateColumns: "1fr 1fr"` inside the pricing page and replace the `style` with `className="grid-2"` (keeping any other inline styles like padding/margin on the parent section separately). There are multiple instances — find all of them and replace.

Pattern to find: `style={{ display: "grid", gridTemplateColumns: "1fr 1fr",`
Replace each instance's `display` and `gridTemplateColumns` with `className="grid-2"`, keeping remaining style props.

- [ ] **Step 5: Replace addon 4-col grid**

Find (around line 234):
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--s-4)", alignItems: "stretch" }}>
```
Replace with:
```tsx
          <div className="grid-4" style={{ gap: "var(--s-4)", alignItems: "stretch" }}>
```

- [ ] **Step 6: Replace subscription tiers 3-col grid**

Find the grid with 3 subscription tiers:
```tsx
style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
```
Replace with `className="grid-3"` keeping gap and other styles.

- [ ] **Step 7: Commit**

```bash
git add app/pricing/page.tsx
git commit -m "feat(mobile): make pricing page responsive"
```

---

## Task 6: Update how-it-works page (`app/how-it-works/page.tsx`)

**Files:**
- Modify: `app/how-it-works/page.tsx`

- [ ] **Step 1: Add SiteNav import**

```tsx
import SiteNav from "../components/SiteNav";
```

- [ ] **Step 2: Replace inline sysbar + nav with SiteNav**

```tsx
      <SiteNav page="HOW IT WORKS" activeLink="how-it-works" />
```

- [ ] **Step 3: Make the steps 3-col grid responsive**

The steps grid uses `gridTemplateColumns: "120px 1fr 220px"`. Replace the inline style on the step grid div:

```tsx
// Before
style={{
  display: "grid",
  gridTemplateColumns: "120px 1fr 220px",
  gap: "var(--s-6)",
  paddingTop: "var(--s-7)",
  paddingBottom: "var(--s-7)",
  borderBottom: i < STEPS.length - 1 ? "1px solid var(--ink-faint)" : "none",
  alignItems: "start",
}}
```

```tsx
// After
className="hiw-step"
style={{
  paddingTop: "var(--s-7)",
  paddingBottom: "var(--s-7)",
  borderBottom: i < STEPS.length - 1 ? "1px solid var(--ink-faint)" : "none",
}}
```

Then add this to `globals.css`:
```css
.hiw-step {
  display: grid;
  grid-template-columns: 120px 1fr 220px;
  gap: var(--s-6);
  align-items: start;
}

@media (max-width: 900px) {
  .hiw-step { grid-template-columns: 80px 1fr; }
  .hiw-step > :last-child { display: none; }
}

@media (max-width: 600px) {
  .hiw-step { grid-template-columns: 1fr; }
  .hiw-step > :first-child { margin-bottom: calc(-1 * var(--s-4)); }
}
```

- [ ] **Step 4: Replace Honesty Box 2-col grid**

Find:
```tsx
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--s-10)", alignItems: "start" }}>
```
Replace with:
```tsx
          <div className="grid-2" style={{ gap: "var(--s-10)", alignItems: "start" }}>
```

- [ ] **Step 5: Replace Why It Works 3-col grid**

Find:
```tsx
style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
```
Replace with `className="grid-3"` keeping gap.

- [ ] **Step 6: Commit**

```bash
git add app/how-it-works/page.tsx app/globals.css
git commit -m "feat(mobile): make how-it-works page responsive"
```

---

## Task 7: Update contact page (`app/contact/page.tsx`)

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Add SiteNav import**

```tsx
import SiteNav from "../components/SiteNav";
```

- [ ] **Step 2: Replace inline sysbar + nav with SiteNav**

```tsx
      <SiteNav page="CONTACT" />
```

- [ ] **Step 3: Replace any 2-col grid with CSS class**

Find all `gridTemplateColumns: "1fr 1fr"` inline styles and replace `display + gridTemplateColumns` with `className="grid-2"`.

- [ ] **Step 4: Make polaroid row stack on mobile**

Find the flex row of response-time polaroids. Replace:
```tsx
style={{ display: "flex", gap: "var(--s-6)", flexWrap: "wrap" }}
```
With:
```tsx
className="contact-polaroids"
```

Add to `globals.css`:
```css
.contact-polaroids {
  display: flex;
  gap: var(--s-6);
  flex-wrap: wrap;
}

@media (max-width: 600px) {
  .contact-polaroids { flex-direction: column; }
  .contact-polaroids .polaroid,
  .contact-polaroids .polaroid-tilt-r { width: 100%; max-width: 280px; }
}
```

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx app/globals.css
git commit -m "feat(mobile): make contact page responsive"
```

---

## Task 8: Update refunds page (`app/refunds/page.tsx`)

**Files:**
- Modify: `app/refunds/page.tsx`

- [ ] **Step 1: Add SiteNav import**

```tsx
import SiteNav from "../components/SiteNav";
```

- [ ] **Step 2: Replace inline sysbar + nav with SiteNav**

```tsx
      <SiteNav page="REFUNDS" />
```

- [ ] **Step 3: Replace 2-col policy grid with CSS class**

Find `gridTemplateColumns: "1fr 1fr"` or any 2-col section and replace with `className="grid-2"`.

- [ ] **Step 4: Commit**

```bash
git add app/refunds/page.tsx
git commit -m "feat(mobile): make refunds page responsive"
```

---

## Task 9: Update remaining pages (privacy, terms, sign-in, sign-up)

**Files:**
- Modify: `app/privacy-policy/page.tsx`, `app/terms-of-service/page.tsx`, `app/terms/page.tsx`, `app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx`

- [ ] **Step 1: For each page, add SiteNav import and replace the inline sysbar + nav**

```tsx
import SiteNav from "../components/SiteNav";
// (adjust relative path depth as needed)
```

Replace each page's sysbar + nav block with the appropriate `<SiteNav page="PAGE_NAME" />` call.

Use these page names:
- `privacy-policy/page.tsx` → `<SiteNav page="PRIVACY" />`
- `terms-of-service/page.tsx` → `<SiteNav page="TERMS" />`
- `terms/page.tsx` → `<SiteNav page="TERMS" />`
- `sign-in/[[...sign-in]]/page.tsx` → `<SiteNav page="SIGN IN" />`
- `sign-up/[[...sign-up]]/page.tsx` → `<SiteNav page="SIGN UP" />`

Note: for `sign-in` and `sign-up`, the relative import path is `../../components/SiteNav`.

- [ ] **Step 2: Commit**

```bash
git add app/privacy-policy/page.tsx app/terms-of-service/page.tsx app/terms/page.tsx \
  "app/sign-in/[[...sign-in]]/page.tsx" "app/sign-up/[[...sign-up]]/page.tsx"
git commit -m "feat(mobile): add SiteNav to remaining pages"
```

---

## Task 10: Final QA + deploy

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Open Chrome DevTools → device toolbar. Check each page at:**
  - 375px (iPhone SE)
  - 390px (iPhone 14)
  - 768px (iPad)

**Check for:**
- No horizontal scroll on any page
- Nav hamburger visible at 375px, links hidden
- Hamburger overlay opens and closes
- Play → CTA visible in mobile nav
- `/play`: input above result (single column)
- Grids are single column at 375px
- Footer stacks to 2 columns

- [ ] **Step 3: Fix any regressions found**

- [ ] **Step 4: Deploy preview**

```bash
vercel
```

- [ ] **Step 5: Test on a real phone using the preview URL**

- [ ] **Step 6: Final commit if fixes were made**

```bash
git add -A
git commit -m "fix(mobile): QA fixes from device testing"
```
