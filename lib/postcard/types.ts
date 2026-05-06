import { z } from "zod";

// ─── Artifact Format ──────────────────────────────────────────────────────────
// Not every physical object is a postcard. Keep the format layer open.

export const ArtifactFormatSchema = z.enum([
  "postcard",        // 4×6 standard mailable postcard (active)
  "evidence_packet", // future: sealed dossier energy
  "collectible_drop",// future: limited edition physical drop
  "poster",          // future: 8×10 / 11×14 wall artifact
  "mini_zine",       // future: folded, stapled, mailed chaos
]);

// ─── Tone ─────────────────────────────────────────────────────────────────────

export const ToneIdSchema = z.enum([
  "loving",
  "brutal",
  "psychic",
  "existential",
  "romantic",
  "corporate",
  "delusional_confidence",
]);

// ─── Handwriting ──────────────────────────────────────────────────────────────

export const HandwritingStyleSchema = z.enum([
  "editorial_scrawl",  // restrained, notebook-margin energy (default)
  "annotation",        // clinical, marginalia-precise
  "deliberate",        // measured, slightly formal
  "unhinged",          // readable but barely
]);

// ─── Status (discriminated union) ─────────────────────────────────────────────

export const ArtifactStatusSchema = z.discriminatedUnion("status", [
  z.object({ status: z.literal("draft") }),
  z.object({ status: z.literal("previewing") }),
  z.object({
    status: z.literal("ready"),
    previewGeneratedAt: z.date(),
  }),
  z.object({
    status: z.literal("sent"),
    sentAt: z.date(),
    trackingId: z.string().optional(),
  }),
  z.object({
    status: z.literal("failed"),
    reason: z.string(),
  }),
]);

// ─── Address ──────────────────────────────────────────────────────────────────

export const RecipientAddressSchema = z.object({
  name: z.string().min(1),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().length(2),
  zip: z.string().min(5),
  country: z.string().default("US"),
});

// ─── Metadata layer ───────────────────────────────────────────────────────────
// Lightweight provenance: connects artifacts to generation sessions,
// enables future collections, rarity systems, and analytics callbacks.

export const ArtifactMetadataSchema = z
  .object({
    generationId: z.string().optional(),
    sessionId: z.string().optional(),
    toneVersion: z.string().optional(),
    artifactVersion: z.string().optional(),
    createdFrom: z.enum(["play", "regeneration", "manual"]).optional(),
  })
  .optional();

// ─── Delivery window ──────────────────────────────────────────────────────────

export const DeliveryWindowSchema = z.object({
  min: z.number().int().positive(),
  max: z.number().int().positive(),
  unit: z.enum(["days", "weeks"]),
});

// ─── ArtifactDraft (the core model) ───────────────────────────────────────────

export const ArtifactDraftSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  format: ArtifactFormatSchema.default("postcard"),

  // Presentation
  imageUrl: z.string().url(),
  senderName: z.string().min(1),
  recipientName: z.string().min(1),
  recipientAddress: RecipientAddressSchema,
  personalizedMessage: z.string().max(500),

  // Emotional layer
  tone: ToneIdSchema,
  handwritingStyle: HandwritingStyleSchema.default("editorial_scrawl"),

  // Fulfillment
  provider: z.enum(["mock", "lob"]).default("mock"),
  statusInfo: ArtifactStatusSchema,

  // Layout outputs (populated by layoutEngine after preview generation)
  frontLayoutId: z.string().optional(),
  backLayoutId: z.string().optional(),

  // Preview outputs
  previewFrontUrl: z.string().url().optional(),
  previewBackUrl: z.string().url().optional(),
  estimatedDeliveryWindow: DeliveryWindowSchema.optional(),

  // Provenance
  metadata: ArtifactMetadataSchema,
});

// ─── Result types ─────────────────────────────────────────────────────────────

export type ProviderSimulationResult = {
  provider: string;
  requestId: string;
  status: "simulated" | "queued" | "processing";
  simulatedAt: string;
  assetSpecs: {
    frontAssetUrl: string;
    backAssetUrl: string;
    size: string;
    dpi: number;
    bleedMm: number;
  };
};

export type DeliveryEstimate = {
  min: number;
  max: number;
  unit: "days" | "weeks";
  carrier: string;
  notes?: string;
};

export type PreviewResult = {
  previewFrontUrl: string;
  previewBackUrl: string;
  estimatedDelivery: DeliveryEstimate;
  providerSimulation: ProviderSimulationResult;
  layoutMeta: {
    frontLayoutId: string;
    backLayoutId: string;
    tone: string;
    format: string;
  };
};

export type SendResult = {
  trackingId: string;
  estimatedDelivery: DeliveryEstimate;
  provider: string;
  status: "queued" | "processing";
};

// ─── Inferred types ───────────────────────────────────────────────────────────

export type ArtifactFormat = z.infer<typeof ArtifactFormatSchema>;
export type ToneId = z.infer<typeof ToneIdSchema>;
export type HandwritingStyle = z.infer<typeof HandwritingStyleSchema>;
export type ArtifactStatus = z.infer<typeof ArtifactStatusSchema>;
export type RecipientAddress = z.infer<typeof RecipientAddressSchema>;
export type ArtifactMetadata = z.infer<typeof ArtifactMetadataSchema>;
export type ArtifactDraft = z.infer<typeof ArtifactDraftSchema>;
export type DeliveryWindow = z.infer<typeof DeliveryWindowSchema>;
