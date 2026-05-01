import type { VariationMode } from "./types";

export type ModelTier = "default" | "chaos" | "premium";

export type ProviderName = "replicate" | "openai";

const TIER_MAP: Record<ModelTier, ProviderName> = {
  default: "replicate",
  chaos: "replicate",
  premium: "openai",
};

const MODE_TIER_MAP: Record<VariationMode, ModelTier> = {
  escalate: "default",
  reframe: "default",
  absurdify: "chaos",
  localize: "default",
};

export function resolveProvider(mode: VariationMode): ProviderName {
  return TIER_MAP[MODE_TIER_MAP[mode]];
}
