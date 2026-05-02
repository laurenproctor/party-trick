# Clerk Auth — Design Spec
**Date:** 2026-05-01

## Overview

Add Clerk authentication to Party Trick with dedicated `/sign-in` and `/sign-up` pages using embedded Clerk components inside the existing Party Trick page chrome.

---

## Architecture

- **Package:** `@clerk/nextjs`
- **Provider:** `ClerkProvider` wraps children in `app/layout.tsx`
- **Middleware:** `middleware.ts` at project root using `clerkMiddleware()` with explicit public route list
- **Public routes:** `/`, `/sign-in(.*)`, `/sign-up(.*)`, `/pricing`, `/contact`, `/privacy-policy`, `/terms`, `/terms-of-service`
- **Protected routes:** `/play`, `/party/(.*)`, `/result/(.*)`

---

## New Routes

Two new pages using Clerk's required catch-all pattern:

- `app/sign-in/[[...sign-in]]/page.tsx` — renders `<SignIn />` component
- `app/sign-up/[[...sign-up]]/page.tsx` — renders `<SignUp />` component

Each page includes:
- Full Party Trick chrome: sysbar, nav, footer
- Sysbar breadcrumb: `/ SIGN IN` or `/ SIGN UP`
- Nav: Play / Pricing / Contact links + auth state slot (see Nav Changes)
- `<SignIn />` or `<SignUp />` component centered in `<main>` with generous vertical padding
- No hero section

Clerk environment variables to add to `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/play
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/play
```

---

## Clerk Component Theming

Use Clerk's `appearance` prop to match Party Trick design tokens:

- `colorBackground`: `var(--paper)` (`#f5f0e8`)
- `colorText`: `var(--ink)` (`#1a1410`)
- `colorPrimary`: `var(--red)` (`#ff2d20`)
- `colorInputBackground`: `var(--paper)`
- `colorInputText`: `var(--ink)`
- `fontFamily`: `var(--mono)` (IBM Plex Mono)
- `borderRadius`: `0` (flat, matches the site's sharp aesthetic)

---

## Nav Changes

All three pages with hardcoded navs (homepage, pricing, contact) get updated:

**Signed out state:** Add a `<SignInButton>` link styled as a nav link on the right of `.pt-links`
```
Play  Pricing  Contact  |  Sign in
```

**Signed in state:** Replace "Sign in" with Clerk's `<UserButton />` component in the same position

Since there is no shared nav component yet, this change is applied to all three pages individually: `app/page.tsx`, `app/pricing/page.tsx`, `app/contact/page.tsx`.

---

## Verification

1. `npm install @clerk/nextjs` succeeds
2. Dev server starts without errors
3. `/sign-in` and `/sign-up` routes render with full Party Trick chrome
4. Clerk form fields reflect design token colors
5. Signing up redirects to `/play`
6. Signing in redirects to `/play`
7. Nav shows "Sign in" when logged out, `<UserButton />` when logged in — on all three pages
8. `/play` is inaccessible when logged out (redirects to `/sign-in`)
9. Public routes (`/`, `/pricing`, `/contact`) remain accessible without auth
