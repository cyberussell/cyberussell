import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  const imageUrl = new URL("/russell-hero.jpg", "https://www.cyberussell.com").toString();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background photo — mirrored so Russell faces right (away from text) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "left center",
            transform: "scaleX(-1)",
          }}
        />

        {/* Full dark overlay like the services hero */}
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,20,0.72)" }} />

        {/* Top color bar */}
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

        {/* Content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "52px 64px",
          }}
        >
          {/* Logo + page label */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ fontSize: "26px", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.5px" }}>Cyber</span>
            <span style={{ fontSize: "26px", fontWeight: 800, color: "#FFD23F", letterSpacing: "-0.5px" }}>ussell</span>
            <span style={{ marginLeft: "16px", fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: "2.5px" }}>SERVICES</span>
          </div>

          {/* Main copy */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "620px" }}>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#FFD23F", letterSpacing: "2px" }}>HIRE A FILIPINO AI-POWERED BUILDER</span>

            <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
              <span style={{ fontSize: "54px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1.5px" }}>Your website.</span>
              <span style={{ fontSize: "54px", fontWeight: 800, color: "#ffffff", lineHeight: 1.1, letterSpacing: "-1.5px" }}>Your brand.</span>
              <span style={{ fontSize: "54px", fontWeight: 800, color: "#E8373A", lineHeight: 1.1, letterSpacing: "-1.5px" }}>Built to earn.</span>
            </div>

            <span style={{ fontSize: "18px", color: "rgba(255,255,255,0.55)", lineHeight: 1.55, maxWidth: "560px" }}>
              Web design, AI automation, and digital strategy — at rates that make sense for growing businesses.
            </span>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: "10px" }}>
            {[
              { label: "Web Design", color: "#FFD23F", bg: "rgba(255,210,63,0.12)", border: "rgba(255,210,63,0.3)" },
              { label: "AI Automation", color: "rgba(255,255,255,0.5)", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)" },
              { label: "Digital Strategy", color: "rgba(255,255,255,0.5)", bg: "rgba(255,255,255,0.05)", border: "rgba(255,255,255,0.12)" },
              { label: "Inquire Now →", color: "#E8373A", bg: "rgba(232,55,58,0.10)", border: "rgba(232,55,58,0.25)" },
            ].map(({ label, color, bg, border }) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: bg,
                  border: `1px solid ${border}`,
                  borderRadius: "8px",
                  padding: "8px 18px",
                }}
              >
                <span style={{ fontSize: "13px", fontWeight: 700, color }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
