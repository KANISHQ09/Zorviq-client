import { ImageResponse } from "next/og";

export const alt = "Zorviq AI website builder";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          color: "white",
          background:
            "radial-gradient(circle at 20% 20%, #7c3aed 0, transparent 34%), linear-gradient(135deg, #050505 0%, #101014 100%)",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div style={{ fontSize: 34, letterSpacing: 8, color: "#c4b5fd" }}>ZORVIQ</div>
        <div style={{ marginTop: 34, fontSize: 86, fontWeight: 900, lineHeight: 0.98 }}>
          AI Website Builder
        </div>
        <div style={{ marginTop: 28, maxWidth: 760, fontSize: 34, color: "#d4d4d8" }}>
          Turn prompts into no-code landing pages, portfolios, SaaS sites, and stores.
        </div>
      </div>
    ),
    size,
  );
}
