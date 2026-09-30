import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Every page's Open Graph image: its own title on the site's dark violet ground. */
export function ogImage(title: string, eyebrow = "RingPost") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(90% 90% at 0% 0%, rgba(124,107,255,0.45), rgba(10,10,15,0) 60%), radial-gradient(60% 60% at 100% 100%, rgba(255,122,89,0.22), rgba(10,10,15,0) 60%), #0a0a0f",
          color: "#f5f5f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: "7px solid #7c6bff", borderRightColor: "#22d3ee", display: "flex" }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>RingPost</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#a594ff" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 58 : 72, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "#a1a1b5" }}>The AI front desk for local businesses · ringpost.tech</div>
      </div>
    ),
    OG_SIZE,
  );
}
