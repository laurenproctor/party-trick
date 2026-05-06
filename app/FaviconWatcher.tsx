"use client";

import { useEffect } from "react";
import { startIdleWatcher, registerInteraction } from "@/lib/faviconState";

export default function FaviconWatcher() {
  useEffect(() => {
    startIdleWatcher();

    const events = ["click", "mousemove", "keydown", "touchstart"] as const;
    const handler = () => registerInteraction();

    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, handler));
  }, []);

  return null;
}
