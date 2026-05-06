type FaviconState = "idle" | "active" | "reveal";

let idleTimer: NodeJS.Timeout | null = null;
let lastInteraction = Date.now();

const IDLE_INTERVAL = 212000;

function setFavicon(href: string) {
  let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = href;
}

export function setFaviconState(state: FaviconState) {
  if (state === "idle") setFavicon("/favicon-idle.svg");
  if (state === "active") setFavicon("/favicon-active.svg");
  if (state === "reveal") setFavicon("/favicon-reveal.svg");
}

export function registerInteraction() {
  lastInteraction = Date.now();
  setFaviconState("idle");
}

export function startIdleWatcher() {
  if (idleTimer) clearInterval(idleTimer);

  idleTimer = setInterval(() => {
    const now = Date.now();
    const elapsed = now - lastInteraction;

    if (elapsed >= IDLE_INTERVAL) {
      setFaviconState("active");
      setTimeout(() => setFaviconState("idle"), 3200);
      lastInteraction = now;
    }
  }, 1000);
}
