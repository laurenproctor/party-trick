import { generateFrontLayout, generateBackLayout } from "./layoutEngine";
import type { FrontLayout, BackLayout } from "./layoutEngine";
import type { ArtifactDraft } from "./types";
import { getTone } from "./tones";

// ─── Render ───────────────────────────────────────────────────────────────────
// Pure data layer — no DOM, no React.
// Returns layout specs + styling metadata that components consume.
// Separating rendering intent from rendering execution keeps
// the provider layer (Lob) dumb — it receives assets, not instructions.

export type FrontRenderSpec = {
  layout: FrontLayout;
  imageUrl: string;
  textureOverlay: string;
  brandingLabel: string;
  toneAccentHex: string;
  cssVars: Record<string, string>;
};

export type BackRenderSpec = {
  layout: BackLayout;
  message: string;
  handwritingStyle: ArtifactDraft["handwritingStyle"];
  senderName: string;
  recipientName: string;
  recipientAddress: ArtifactDraft["recipientAddress"];
  toneAccentHex: string;
  cssVars: Record<string, string>;
  postageLabel: string;
};

export function renderFront(draft: ArtifactDraft): FrontRenderSpec {
  const layout = generateFrontLayout(
    draft.tone,
    draft.format,
    draft.frontLayoutId ?? "standard"
  );
  const tone = getTone(draft.tone);

  return {
    layout,
    imageUrl: draft.imageUrl,
    textureOverlay: layout.textureOverlay,
    brandingLabel: "pARTy Trick",
    toneAccentHex: tone.accentHex,
    cssVars: tone.cssVars,
  };
}

export function renderBack(draft: ArtifactDraft): BackRenderSpec {
  const layout = generateBackLayout(
    draft.tone,
    draft.format,
    draft.backLayoutId ?? "standard"
  );
  const tone = getTone(draft.tone);

  return {
    layout,
    message: draft.personalizedMessage,
    handwritingStyle: draft.handwritingStyle,
    senderName: draft.senderName,
    recipientName: draft.recipientName,
    recipientAddress: draft.recipientAddress,
    toneAccentHex: tone.accentHex,
    cssVars: tone.cssVars,
    postageLabel: "POSTAGE",
  };
}
