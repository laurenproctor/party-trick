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
