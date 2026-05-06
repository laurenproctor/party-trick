"use client";

import { useMemo } from "react";
import PostcardFront from "./PostcardFront";
import PostcardBack from "./PostcardBack";
import { renderFront, renderBack } from "../../lib/postcard/render";
import type { ArtifactDraft } from "../../lib/postcard/types";

interface PostcardPreviewProps {
  draft: ArtifactDraft;
  side?: "front" | "back";
  className?: string;
}

// PostcardPreview is intentionally decoupled from the generation pipeline.
// Pass any imageUrl — it does not need to come from Party Trick's pipeline.

export default function PostcardPreview({
  draft,
  side = "front",
  className = "",
}: PostcardPreviewProps) {
  const frontSpec = useMemo(() => renderFront(draft), [draft]);
  const backSpec = useMemo(() => renderBack(draft), [draft]);

  return (
    <div className={className} style={{ width: "100%" }}>
      {side === "front" ? (
        <PostcardFront spec={frontSpec} />
      ) : (
        <PostcardBack spec={backSpec} />
      )}
    </div>
  );
}
