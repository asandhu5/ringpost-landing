import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/** Every page's sharing image: its own title on the site's light ground, with the ring. */
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
          background: "radial-gradient(70% 80% at 100% 0%, rgba(124,107,255,0.22), rgba(247,248,250,0) 60%), radial-gradient(60% 70% at 100% 100%, rgba(34,211,238,0.18), rgba(247,248,250,0) 60%), #f7f8fa",
          color: "#0b1b2b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: "7px solid #7c6bff", borderRightColor: "#22d3ee", display: "flex" }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1, color: "#0b1b2b" }}>RingPost</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 24, letterSpacing: 6, textTransform: "uppercase", color: "#5b4ee6" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 60 ? 58 : 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        </div>
        <div style={{ fontSize: 24, color: "#4a5666" }}>Your AI business partner · ringpost.tech</div>
      </div>
    ),
    OG_SIZE,
  );
}
