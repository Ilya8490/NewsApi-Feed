import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, rgba(29,78,216,1) 0%, rgba(15,118,110,1) 100%)",
          borderRadius: 42,
          position: "relative"
        }}
      >
        <div
          style={{
            height: 112,
            width: 112,
            borderRadius: 28,
            background: "rgba(255,255,255,0.94)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 10,
            padding: "22px"
          }}
        >
          <div style={{ height: 14, width: 48, borderRadius: 999, background: "#2563EB" }} />
          <div style={{ height: 9, width: 62, borderRadius: 999, background: "#CBD5E1" }} />
          <div style={{ height: 9, width: 52, borderRadius: 999, background: "#CBD5E1" }} />
          <div style={{ height: 12, width: 38, borderRadius: 999, background: "#10B981" }} />
        </div>
      </div>
    ),
    size
  );
}
