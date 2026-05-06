"use client";

interface WatermarkCanvasProps {
  imageUrl: string;
  alt?: string;
}

export default function WatermarkCanvas({ imageUrl, alt = "Your Party Trick" }: WatermarkCanvasProps) {
  if (!imageUrl) {
    return (
      <div style={{
        width: "100%",
        aspectRatio: "1/1",
        background: "repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 6px, transparent 6px 12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <span style={{ fontFamily: "var(--mono)", fontSize: "var(--t-micro)", color: "var(--ink-faint)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
          no image
        </span>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
}
