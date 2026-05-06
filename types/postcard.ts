// Re-export all public postcard/artifact types from a single entry point.
// Consumers import from here rather than diving into lib/postcard internals.

export type {
  ArtifactFormat,
  ToneId,
  HandwritingStyle,
  ArtifactStatus,
  RecipientAddress,
  ArtifactMetadata,
  ArtifactDraft,
  DeliveryWindow,
  PreviewResult,
  SendResult,
  DeliveryEstimate,
  ProviderSimulationResult,
} from "../lib/postcard/types";

export {
  ArtifactFormatSchema,
  ToneIdSchema,
  HandwritingStyleSchema,
  ArtifactStatusSchema,
  RecipientAddressSchema,
  ArtifactMetadataSchema,
  ArtifactDraftSchema,
} from "../lib/postcard/types";

export type { TonePreset, TypographyProfile, LayoutStyle, UiAccent } from "../lib/postcard/tones";
export { TONE_PRESETS, TONE_LIST, getTone } from "../lib/postcard/tones";

export type { FrontLayout, BackLayout, ArtifactTheme } from "../lib/postcard/layoutEngine";
export { generateFrontLayout, generateBackLayout } from "../lib/postcard/layoutEngine";

export type { FrontRenderSpec, BackRenderSpec } from "../lib/postcard/render";
export { renderFront, renderBack } from "../lib/postcard/render";

export type { HandwritingToken, CharVariance } from "../lib/postcard/handwriting";
export { decomposeMessage, getCharVariance } from "../lib/postcard/handwriting";
