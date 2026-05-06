import { randomUUID } from "crypto";
import type { PostcardProvider } from "./provider";
import type {
  ArtifactDraft,
  PreviewResult,
  SendResult,
  DeliveryEstimate,
  RecipientAddress,
} from "./types";
import { generateFrontLayout, generateBackLayout } from "./layoutEngine";

// ─── MockPostcardProvider ─────────────────────────────────────────────────────
// Simulates the full fulfillment lifecycle without touching any external API.
// Returns deterministic, inspectable results for development and testing.
// Replace with LobAdapter by setting POSTCARD_PROVIDER=lob.

export class MockPostcardProvider implements PostcardProvider {
  async createDraft(draft: ArtifactDraft): Promise<ArtifactDraft> {
    console.log("[MockProvider] createDraft", { id: draft.id, tone: draft.tone, format: draft.format });

    return {
      ...draft,
      statusInfo: { status: "previewing" },
    };
  }

  async generatePreview(draft: ArtifactDraft): Promise<PreviewResult> {
    console.log("[MockProvider] generatePreview", { id: draft.id });

    const frontLayout = generateFrontLayout(draft.tone, draft.format);
    const backLayout = generateBackLayout(draft.tone, draft.format);

    // In production (Lob), these would be rendered asset URLs uploaded to Lob's API.
    // Here they point back to our own preview endpoint with the draft encoded.
    const previewBase = `/api/postcard/preview`;
    const previewFrontUrl = `${previewBase}?id=${draft.id}&side=front&tone=${draft.tone}`;
    const previewBackUrl = `${previewBase}?id=${draft.id}&side=back&tone=${draft.tone}`;

    const delivery = this._estimateDeliveryForZip(draft.recipientAddress.zip);

    return {
      previewFrontUrl,
      previewBackUrl,
      estimatedDelivery: delivery,
      layoutMeta: {
        frontLayoutId: frontLayout.id,
        backLayoutId: backLayout.id,
        tone: draft.tone,
        format: draft.format,
      },
      providerSimulation: {
        provider: "mock",
        requestId: randomUUID(),
        status: "simulated",
        simulatedAt: new Date().toISOString(),
        assetSpecs: {
          // Lob expects print-ready assets at these dimensions:
          // Front: 6.25" × 4.25" at 300dpi (bleed) = 1875 × 1275px
          // Back:  6.25" × 4.25" at 300dpi (bleed) = 1875 × 1275px
          frontAssetUrl: previewFrontUrl,
          backAssetUrl: previewBackUrl,
          size: "6.25in × 4.25in",
          dpi: 300,
          bleedMm: 3.175, // standard 1/8" bleed
        },
      },
    };
  }

  async sendPostcard(draft: ArtifactDraft): Promise<SendResult> {
    console.log("[MockProvider] sendPostcard — MOCK, no mail sent", { id: draft.id });

    const delivery = this._estimateDeliveryForZip(draft.recipientAddress.zip);
    const trackingId = `MOCK-${randomUUID().slice(0, 8).toUpperCase()}`;

    return {
      trackingId,
      estimatedDelivery: delivery,
      provider: "mock",
      status: "queued",
    };
  }

  async estimateDelivery(address: RecipientAddress): Promise<DeliveryEstimate> {
    return this._estimateDeliveryForZip(address.zip);
  }

  // ─── Internal ───────────────────────────────────────────────────────────────

  private _estimateDeliveryForZip(_zip: string): DeliveryEstimate {
    // Real implementation would use USPS zones or Lob's delivery estimates.
    // Mock returns a plausible 3–5 business day window.
    return {
      min: 3,
      max: 5,
      unit: "days",
      carrier: "USPS First Class",
      notes: "Estimated. Actual delivery may vary.",
    };
  }
}
