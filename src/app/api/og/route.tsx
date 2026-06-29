import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "#0F0F1A",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle at top right, rgba(232,55,58,0.2), transparent 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "400px",
            height: "400px",
            background: "radial-gradient(circle at bottom left, rgba(255,210,63,0.1), transparent 60%)",
          }}
        />

        {/* Top bar accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(to right, #E8373A, #FFD23F)",
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "white",
              letterSpacing: "-0.5px",
            }}
          >
            Cyber
          </span>
          <span
            style={{
              fontSize: "28px",
              fontWeight: 800,
              color: "#FFD23F",
              letterSpacing: "-0.5px",
            }}
          >
            ussell
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            You have a skill.
          </span>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#FFD23F",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            Find out how to earn
          </span>
          <span
            style={{
              fontSize: "56px",
              fontWeight: 800,
              color: "#E8373A",
              lineHeight: 1.1,
              letterSpacing: "-1px",
            }}
          >
            from it online.
          </span>
        </div>

        {/* Subtext */}
        <span
          style={{
            fontSize: "22px",
            color: "rgba(255,255,255,0.5)",
            lineHeight: 1.6,
            maxWidth: "700px",
          }}
        >
          Free career blueprints, tools, and guides for Filipinos who want to earn online.
        </span>

        {/* Bottom badges */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            position: "absolute",
            bottom: "60px",
            left: "80px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(0,201,122,0.1)",
              border: "1px solid rgba(0,201,122,0.2)",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#00C97A" }}>Free Forever</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>Built for Filipinos</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "8px",
              padding: "8px 16px",
            }}
          >
            <span style={{ fontSize: "14px", fontWeight: 700, color: "rgba(255,255,255,0.5)" }}>No Sign-up Required</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
