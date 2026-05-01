import type { VariationMode } from "./types";
import { STYLES, type StyleName } from "./styles";
import type { Style } from "./styles";

export type ProviderName = "replicate" | "openai";

const MODE_PROVIDER_MAP: Record<VariationMode, ProviderName> = {
  default_read: "replicate",
  truer_read: "openai",
  weirder_read: "replicate",
  roast_harder: "replicate",
  chaos: "replicate",
  cinematic: "openai",
};

const MODE_STYLE_MAP: Record<VariationMode, StyleName> = {
  default_read: "bad_courtroom_sketch",
  truer_read: "bar_napkin",
  weirder_read: "bar_napkin",
  roast_harder: "bad_courtroom_sketch",
  chaos: "full_chaos",
  cinematic: "cinematic_sketch",
};

export function resolveProvider(mode: VariationMode): ProviderName {
  return MODE_PROVIDER_MAP[mode];
}

export function resolveStyle(mode: VariationMode): Style {
  return STYLES[MODE_STYLE_MAP[mode]];
}
