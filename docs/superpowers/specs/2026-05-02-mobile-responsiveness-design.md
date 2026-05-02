# Mobile Responsiveness — Design Spec
_2026-05-02_

## Context

The app currently has a single breakpoint at `max-width: 900px` (tablet) with no phone-specific rules. All multi-column grids, fixed-width elements, and the navigation are broken on screens below ~600px. This spec defines the full responsive treatment for every page.

---

## Breakpoints

| Name | Max-width | Target |
|------|-----------|--------|
| Tablet | 900px | Already exists — extend it |
| Phone | 600px | New — add everywhere |

---

## 1. Navigation

**Desktop (>900px):** Unchanged — logo left, links right.

**Phone (≤600px):**
- Logo left, Play CTA button + ☰ hamburger icon right
- Hamburger opens a full-screen overlay (`position: fixed; inset: 0`) with large stacked nav links
- Toggle via `data-nav-open` attribute on `<body>` — pure CSS show/hide, no library
- ✕ close button inside overlay
- Links in overlay: Pricing, How It Works, Sign In, Contact

**Files:** `app/globals.css` (overlay styles), nav component (hamburger button markup + JS toggle)

---

## 2. Typography

Extend `tokens.css` existing `@media (max-width: 900px)` block, and add a new `@media (max-width: 600px)` block:

- Logo: 42px → 28px at 600px
- Nav links: 22px → hidden (replaced by hamburger)
- Display headings (`--t-d1`, `--t-d2`, `--t-d3`): further reduction at 600px
- `--margin`: further reduction to `12px` at 600px
- `--gutter`: reduce to `8px` at 600px

---

## 3. Grid Layouts

All multi-column grids collapse at phone breakpoint. Apply via CSS classes rather than inline styles where possible so media queries can override.

| Page | Desktop | Tablet (≤900px) | Phone (≤600px) |
|------|---------|-----------------|----------------|
| Homepage portraits | 4-col | 2-col | 1-col |
| Homepage how-it-works | 3-col | 2-col | 1-col |
| Homepage "Better With People" | 2-col | 2-col | 1-col |
| Pricing hero | 2-col | 1-col | 1-col |
| Pricing addon grid | 4-col | 2-col | 1-col |
| Pricing subscription tiers | 3-col | 1-col | 1-col |
| How It Works 3-col (fixed sidebars) | `120px 1fr 220px` | `1fr` | `1fr` |
| How It Works "Why It Works" | 3-col | 2-col | 1-col |
| Contact polaroid row | flex row | flex row | flex column |
| Refunds 2-col | 2-col | 1-col | 1-col |

---

## 4. /play Page

**Desktop:** Input panel left, result panel right (2-col).

**Phone (≤600px):**
- Single column — input stacks above result
- Generate/action buttons go full-width
- No JS state change — pure CSS column flex/grid

---

## 5. Fixed Widths

Replace hardcoded px widths with responsive equivalents:

| Element | Current | Mobile |
|---------|---------|--------|
| Polaroid cards | `width: 220px` | `width: 100%; max-width: 220px` |
| How It Works left sidebar | `120px` (grid column) | collapses into stacked layout |
| How It Works right sidebar | `220px` (grid column) | collapses into stacked layout |

---

## 6. Spacing

`--margin` already drops at 900px. Add further reduction at 600px:
- `--margin: 12px`
- `--gutter: 8px`

---

## Files to Modify

1. `app/globals.css` — hamburger overlay styles, utility grid classes, mobile overrides
2. `app/tokens.css` — extend 900px block + new 600px breakpoint
3. `app/page.tsx` — homepage: replace inline grid styles with CSS classes
4. `app/pricing/page.tsx` — replace inline grid styles with CSS classes
5. `app/how-it-works/page.tsx` — fixed sidebar grid → responsive
6. `app/play/page.tsx` — 2-col → stacked single column on phone
7. `app/contact/page.tsx` — polaroid row → column on phone
8. `app/refunds/page.tsx` — 2-col → 1-col on phone
9. Nav component — hamburger button markup + toggle script

---

## Verification

1. Open each page in Chrome DevTools device toolbar at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad)
2. Check: no horizontal scroll, no overflowing text, no broken grids
3. Nav: hamburger opens overlay, ✕ closes it, Play button visible
4. `/play`: input appears above result at 375px
5. Deploy preview to Vercel and test on a real phone
