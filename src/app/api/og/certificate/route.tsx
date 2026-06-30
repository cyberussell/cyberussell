import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") ?? "Learner";
  const pillar = searchParams.get("pillar") ?? "AI Foundations";
  const type = searchParams.get("type") ?? "certificate"; // certificate | badge

  if (type === "badge") {
    return new ImageResponse(
      (
        <div
          style={{
            width: "1080px",
            height: "1080px",
            background: "linear-gradient(135deg, #0a0a14 0%, #12121e 50%, #0a0a14 100%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, -apple-system, sans-serif",
            position: "relative",
          }}
        >
          {/* Background glow */}
          <div style={{ position: "absolute", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(255,210,63,0.15) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

          {/* Logo area */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "40px" }}>
            <div style={{ background: "rgba(255,210,63,0.15)", border: "1px solid rgba(255,210,63,0.3)", borderRadius: "12px", padding: "8px 16px" }}>
              <span style={{ color: "#FFD23F", fontSize: "14px", fontWeight: "700", letterSpacing: "3px", textTransform: "uppercase" }}>CYBERUSSELL</span>
            </div>
          </div>

          {/* Badge circle */}
          <div style={{
            width: "280px", height: "280px", borderRadius: "50%",
            background: "linear-gradient(135deg, #FFD23F 0%, #F5A623 100%)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 80px rgba(255,210,63,0.4), 0 0 160px rgba(255,210,63,0.15)",
            marginBottom: "40px",
          }}>
            <span style={{ fontSize: "80px", marginBottom: "8px" }}>🏅</span>
            <span style={{ color: "#0a0a14", fontSize: "14px", fontWeight: "900", letterSpacing: "2px", textTransform: "uppercase" }}>BIDA BADGE</span>
          </div>

          {/* Badge name */}
          <div style={{ color: "#FFD23F", fontSize: "36px", fontWeight: "800", letterSpacing: "1px", marginBottom: "12px", textAlign: "center" }}>
            AI Foundations Explorer
          </div>

          {/* Awarded to */}
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "16px", fontWeight: "600", letterSpacing: "3px", textTransform: "uppercase", marginBottom: "8px" }}>
            AWARDED TO
          </div>
          <div style={{ color: "#ffffff", fontSize: "42px", fontWeight: "800", textAlign: "center", marginBottom: "24px" }}>
            {name}
          </div>

          {/* Pillar tag */}
          <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "100px", padding: "8px 24px" }}>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", fontWeight: "600" }}>Pillar 1 · {pillar}</span>
          </div>

          {/* Bottom */}
          <div style={{ position: "absolute", bottom: "40px", color: "rgba(255,255,255,0.2)", fontSize: "13px", letterSpacing: "1px" }}>
            cyberussell.com · Learning System
          </div>
        </div>
      ),
      { width: 1080, height: 1080 }
    );
  }

  // Certificate — 1200×630
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #0a0a14 0%, #12121e 60%, #0a0a14 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          padding: "60px",
        }}
      >
        {/* Border */}
        <div style={{ position: "absolute", inset: "20px", border: "1px solid rgba(255,210,63,0.2)", borderRadius: "16px" }} />
        <div style={{ position: "absolute", inset: "24px", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px" }} />

        {/* Glow */}
        <div style={{ position: "absolute", width: "600px", height: "300px", borderRadius: "50%", background: "radial-gradient(ellipse, rgba(255,210,63,0.08) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />

        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
          <span style={{ color: "#FFD23F", fontSize: "13px", fontWeight: "800", letterSpacing: "4px", textTransform: "uppercase" }}>CYBERUSSELL LEARNING SYSTEM</span>
        </div>

        {/* Certificate of */}
        <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "15px", fontWeight: "600", letterSpacing: "5px", textTransform: "uppercase", marginBottom: "8px" }}>
          CERTIFICATE OF COMPLETION
        </div>

        {/* Name */}
        <div style={{ color: "#ffffff", fontSize: "52px", fontWeight: "800", textAlign: "center", marginBottom: "4px", lineHeight: 1.1 }}>
          {name}
        </div>

        {/* divider */}
        <div style={{ width: "80px", height: "2px", background: "linear-gradient(90deg, transparent, #FFD23F, transparent)", margin: "16px 0" }} />

        {/* Pillar */}
        <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "16px", fontWeight: "500", marginBottom: "6px", letterSpacing: "1px" }}>
          has successfully completed
        </div>
        <div style={{ color: "#FFD23F", fontSize: "28px", fontWeight: "800", textAlign: "center", letterSpacing: "0.5px" }}>
          Pillar 1: {pillar}
        </div>

        {/* Badge + date row */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "rgba(255,210,63,0.1)", border: "1px solid rgba(255,210,63,0.25)", borderRadius: "100px", padding: "8px 20px" }}>
            <span style={{ fontSize: "20px" }}>🏅</span>
            <span style={{ color: "#FFD23F", fontSize: "14px", fontWeight: "700" }}>AI Foundations Explorer</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "13px" }}>
            {new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
