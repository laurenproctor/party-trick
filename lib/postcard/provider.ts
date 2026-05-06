import type { ArtifactDraft, PreviewResult, SendResult, DeliveryEstimate, RecipientAddress } from "./types";

// ─── Provider interface ───────────────────────────────────────────────────────
// Party Trick owns all composition, typography, layout, and emotional
// presentation. The provider only handles print + mail infrastructure.
//
// IMPORTANT: Never leak rendering logic into a provider implementation.
// Providers receive finalized asset URLs — they do not control design.

export interface PostcardProvider {
  /** Validate a draft and prepare it for preview generation */
  createDraft(draft: ArtifactDraft): Promise<ArtifactDraft>;

  /** Generate front/back preview assets from a draft */
  generatePreview(draft: ArtifactDraft): Promise<PreviewResult>;

  /** Submit a finalized draft for physical fulfillment */
  sendPostcard(draft: ArtifactDraft): Promise<SendResult>;

  /** Estimate delivery window for a given address */
  estimateDelivery(address: RecipientAddress): Promise<DeliveryEstimate>;
}

// ─── Provider factory ─────────────────────────────────────────────────────────
// Reads POSTCARD_PROVIDER env var. Defaults to "mock" so production
// never accidentally fires real mail during development.

export async function getPostcardProvider(): Promise<PostcardProvider> {
  const providerName = process.env.POSTCARD_PROVIDER ?? "mock";

  if (providerName === "lob") {
    const { LobAdapter } = await import("./lobAdapter");
    return new LobAdapter();
  }

  // Default: mock
  const { MockPostcardProvider } = await import("./mockProvider");
  return new MockPostcardProvider();
}
