import { ImageResponse } from "next/og";

export const size = {
  width: 256,
  height: 256
};

export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "56px",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: 40,
            background: "rgba(255,255,255,0.92)",
            display: "flex",
            flexDirection: "column",
            padding: "32px",
            gap: "18px",
            boxShadow: "0 20px 60px rgba(15,23,42,0.18)"
          }}
        >
          <div
            style={{
              height: 22,
              width: 96,
              borderRadius: 999,
              background: "#2563EB"
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 10 }}>
            <div style={{ height: 14, width: 150, borderRadius: 999, background: "#CBD5E1" }} />
            <div style={{ height: 14, width: 120, borderRadius: 999, background: "#CBD5E1" }} />
            <div style={{ height: 14, width: 132, borderRadius: 999, background: "#CBD5E1" }} />
          </div>
          <div
            style={{
              marginTop: "auto",
              height: 20,
              width: 76,
              borderRadius: 999,
              background: "#10B981"
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 44,
            height: 44,
            width: 44,
            borderRadius: 999,
            background: "#10B981",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: 16,
              height: 10,
              borderLeft: "4px solid white",
              borderBottom: "4px solid white",
              transform: "rotate(-45deg) translateY(-1px)"
            }}
          />
        </div>
      </div>
    ),
    size
  );
}
