import type { PostcardProvider } from "./provider";
import type {
  ArtifactDraft,
  PreviewResult,
  SendResult,
  DeliveryEstimate,
  RecipientAddress,
} from "./types";

// ─── LobAdapter ───────────────────────────────────────────────────────────────
// SCAFFOLD ONLY. No real API calls are made here.
//
// To activate:
//   1. Set LOB_API_KEY in Vercel env vars
//   2. Set POSTCARD_PROVIDER=lob
//   3. Implement the methods below using the Lob Node SDK: npm install lob-ts
//   4. Replace all `throw new LobNotConfiguredError()` with real calls
//
// Architecture contract:
//   - Party Trick renders front + back as print-ready image assets
//   - LobAdapter uploads those assets and submits to Lob's /postcards endpoint
//   - Lob handles ONLY print production + mailing + delivery
//   - Lob NEVER controls layout, typography, or emotional presentation
//
// ─── Lob API shapes (for future implementer) ──────────────────────────────────
//
// POST https://api.lob.com/v1/postcards
// Authorization: Basic <base64(LOB_API_KEY:)>
// Content-Type: application/json
//
// {
//   "description": "Party Trick postcard — {draft.id}",
//   "to": {
//     "name": "{recipientAddress.name}",
//     "address_line1": "{recipientAddress.line1}",
//     "address_line2": "{recipientAddress.line2 | undefined}",
//     "address_city": "{recipientAddress.city}",
//     "address_state": "{recipientAddress.state}",
//     "address_zip": "{recipientAddress.zip}",
//     "address_country": "{recipientAddress.country}"
//   },
//   "from": {
//     "name": "{senderName}",
//     // Party Trick's return address — configure separately
//   },
//   "front": "<url or HTML string of print-ready front asset>",
//   "back":  "<url or HTML string of print-ready back asset>",
//   "size": "6x4"   // Lob postcard size code for standard 6×4
// }
//
// Lob response includes:
//   - id: string (Lob's postcard ID — store for tracking)
//   - expected_delivery_date: ISO date string
//   - tracking_number?: string (USPS tracking)
//   - status: "in_transit" | "in_local_area" | "processed_for_delivery" | "re-routed" | "returned_to_sender"
//
// ─── Asset upload notes ────────────────────────────────────────────────────────
//
// Lob accepts either:
//   a) A URL to a publicly accessible image (JPEG/PNG, 300dpi, with bleed)
//   b) An HTML string it will render (NOT recommended — defeats our layout ownership)
//
// Party Trick strategy: use option (a) with pre-rendered assets.
// Render front + back server-side to a Vercel-hosted URL, pass those URLs to Lob.
// This keeps our rendering pipeline 100% inside Party Trick.
//
// Required asset specs:
//   Size: 6.25" × 4.25" (includes 1/8" bleed on all sides)
//   Resolution: 300 DPI
//   Color: CMYK preferred; RGB accepted
//   Format: JPEG or PNG
//
// ─────────────────────────────────────────────────────────────────────────────

export class LobNotConfiguredError extends Error {
  constructor() {
    super(
      "LobAdapter is not yet configured. Set LOB_API_KEY and POSTCARD_PROVIDER=lob, then implement the methods in lobAdapter.ts."
    );
    this.name = "LobNotConfiguredError";
  }
}

// Lob API request/response types (for future implementer reference)
// These match Lob's v1 API — verify against https://docs.lob.com

export type LobAddress = {
  name: string;
  address_line1: string;
  address_line2?: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  address_country: string;
};

export type LobPostcardRequest = {
  description: string;
  to: LobAddress;
  from: LobAddress;
  front: string;   // URL to print-ready front asset
  back: string;    // URL to print-ready back asset
  size: "4x6" | "6x4" | "6x9" | "6x11";
  metadata?: Record<string, string>; // up to 500 chars per value
  mail_type?: "usps_first_class" | "usps_standard";
};

export type LobPostcardResponse = {
  id: string;
  description: string;
  to: LobAddress;
  from: LobAddress;
  size: string;
  status: string;
  expected_delivery_date: string;
  tracking_number?: string;
  date_created: string;
  date_modified: string;
  deleted: boolean;
};

export class LobAdapter implements PostcardProvider {
  // When implementing: const lob = new Lob({ apiKey: process.env.LOB_API_KEY! })

  async createDraft(draft: ArtifactDraft): Promise<ArtifactDraft> {
    // Future: validate address against Lob's /us_verifications endpoint
    // const verified = await lob.usVerifications.verify({ primary_line: draft.recipientAddress.line1, ... })
    // Return draft with statusInfo = { status: "previewing" }
    void draft;
    throw new LobNotConfiguredError();
  }

  async generatePreview(draft: ArtifactDraft): Promise<PreviewResult> {
    // Future:
    // 1. Call renderFront(draft) + renderBack(draft) to get render specs
    // 2. Generate print-ready assets server-side (Satori/Puppeteer → PNG at 300dpi)
    // 3. Upload assets to Vercel Blob or equivalent CDN
    // 4. Return PreviewResult with those CDN URLs
    // Lob itself is NOT called at preview stage — preview is Party Trick-rendered only
    void draft;
    throw new LobNotConfiguredError();
  }

  async sendPostcard(draft: ArtifactDraft): Promise<SendResult> {
    // Future:
    // 1. Ensure previewFrontUrl + previewBackUrl are set (print-ready assets)
    // 2. Build LobPostcardRequest from draft
    // 3. Call lob.postcards.create(request)
    // 4. Return SendResult with Lob's id as trackingId
    //
    // const request: LobPostcardRequest = {
    //   description: `Party Trick postcard ${draft.id}`,
    //   to: addressToLob(draft.recipientAddress),
    //   from: PARTY_TRICK_RETURN_ADDRESS,
    //   front: draft.previewFrontUrl!,
    //   back: draft.previewBackUrl!,
    //   size: "6x4",
    //   metadata: {
    //     draft_id: draft.id,
    //     tone: draft.tone,
    //     generation_id: draft.metadata?.generationId ?? "",
    //   },
    // }
    // const response = await lob.postcards.create(request)
    void draft;
    throw new LobNotConfiguredError();
  }

  async estimateDelivery(_address: RecipientAddress): Promise<DeliveryEstimate> {
    // Future: Lob doesn't have a dedicated delivery estimate endpoint.
    // Use USPS zone lookup or hardcode 3–5 day USPS First Class estimate.
    throw new LobNotConfiguredError();
  }
}

// ─── Address transformer (for future implementer) ─────────────────────────────

function addressToLob(address: RecipientAddress): LobAddress {
  return {
    name: address.name,
    address_line1: address.line1,
    address_line2: address.line2,
    address_city: address.city,
    address_state: address.state,
    address_zip: address.zip,
    address_country: address.country,
  };
}

// Suppress unused warning until implementation
void addressToLob;
