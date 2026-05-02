"use client";

import { useEffect, useRef, useState } from "react";

interface WatermarkCanvasProps {
  imageUrl: string;
  alt?: string;
}

export default function WatermarkCanvas({ imageUrl, alt = "Your Party Trick" }: WatermarkCanvasProps) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const processed = useRef(false);

  useEffect(() => {
    if (processed.current || !imageUrl) return;

    async function process() {
      await document.fonts.ready;

      const img = new Image();
      img.crossOrigin = "anonymous";

      img.onload = () => {
        processed.current = true;

        const MAX_WIDTH = 600;
        const scale = Math.min(1, MAX_WIDTH / img.naturalWidth);
        const w = Math.round(img.naturalWidth * scale);
        const h = Math.round(img.naturalHeight * scale);

        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d")!;

        // Draw the source image at reduced size
        ctx.drawImage(img, 0, 0, w, h);

        // Watermark layer
        ctx.save();
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = "#ffffff";

        const fontSize = Math.round(w / 10);
        ctx.font = `${fontSize}px 'Punk Idols', Anton, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        // Rotate and tile "PARTY TRICK" diagonally
        ctx.translate(w / 2, h / 2);
        ctx.rotate(-Math.PI / 6); // -30°

        const text = "PARTY TRICK";
        const textWidth = ctx.measureText(text).width;
        const colGap = textWidth + 40;
        const rowGap = fontSize + 30;

        const cols = Math.ceil((w + h) / colGap) + 2;
        const rows = Math.ceil((w + h) / rowGap) + 2;
        const startX = -cols * colGap;
        const startY = -rows * rowGap;

        for (let row = 0; row < rows * 2; row++) {
          for (let col = 0; col < cols * 2; col++) {
            const x = startX + col * colGap + (row % 2 === 0 ? 0 : colGap / 2);
            const y = startY + row * rowGap;
            ctx.fillText(text, x, y);
          }
        }

        ctx.restore();

        setDataUrl(canvas.toDataURL("image/jpeg", 0.55));
      };

      img.src = imageUrl;
    }

    process();
  }, [imageUrl]);

  if (!dataUrl) {
    return (
      <div style={{
        width: "100%",
        aspectRatio: "3/4",
        background: "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 6px, transparent 6px 12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          processing...
        </span>
      </div>
    );
  }

  return (
    <img
      src={dataUrl}
      alt={alt}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
}
