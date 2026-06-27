"use client";

import { useState } from "react";
import type { Post } from "@/lib/blog";

export type BookDesign = {
  main: string;
  accent: string;
  textColor: string;
  accentTextColor: string;
  layout: "band-top" | "band-bottom" | "split" | "stripe-top" | "stripe-bottom" | "full-accent-top" | "full-accent-bottom" | "double-band";
  font: { family: string; weight: number; letterSpacing: number; fontSize: number };
};

export const BOOK_DESIGNS: BookDesign[] = [
  { main: "#E24B4A", accent: "#B82E31", textColor: "#fff", accentTextColor: "#fff", layout: "band-top", font: { family: "var(--font-syne), sans-serif", weight: 900, letterSpacing: 1, fontSize: 18 } },
  { main: "#185FA5", accent: "#F5C842", textColor: "#fff", accentTextColor: "#185FA5", layout: "stripe-bottom", font: { family: "'Georgia', serif", weight: 700, letterSpacing: 3, fontSize: 16 } },
  { main: "#1D9E75", accent: "#FFFFFF", textColor: "#fff", accentTextColor: "#1D9E75", layout: "full-accent-top", font: { family: "system-ui, sans-serif", weight: 900, letterSpacing: 0, fontSize: 20 } },
  { main: "#BA7517", accent: "#2B2117", textColor: "#fff", accentTextColor: "#F5C842", layout: "split", font: { family: "'Courier New', monospace", weight: 700, letterSpacing: 2, fontSize: 15 } },
  { main: "#534AB7", accent: "#FFFFFF", textColor: "#fff", accentTextColor: "#534AB7", layout: "band-bottom", font: { family: "var(--font-inter), sans-serif", weight: 800, letterSpacing: 4, fontSize: 14 } },
  { main: "#D4537E", accent: "#F7D6E0", textColor: "#fff", accentTextColor: "#D4537E", layout: "double-band", font: { family: "var(--font-syne), sans-serif", weight: 800, letterSpacing: 2, fontSize: 16 } },
  { main: "#D85A30", accent: "#FFFFFF", textColor: "#fff", accentTextColor: "#D85A30", layout: "stripe-top", font: { family: "system-ui, sans-serif", weight: 900, letterSpacing: 1, fontSize: 17 } },
  { main: "#2D5F4A", accent: "#E8D5B0", textColor: "#fff", accentTextColor: "#2D5F4A", layout: "full-accent-bottom", font: { family: "'Georgia', serif", weight: 700, letterSpacing: 3, fontSize: 16 } },
];

const BOOK_HEIGHTS = [520, 460, 490, 430, 480, 450, 500, 420];
const SPINE_WIDTHS = [85, 75, 90, 78, 85, 76, 82, 86];
const FACE_WIDTH = 240;

function SpineLayout({ design, spineText, height }: { design: BookDesign; spineText: string; height: number }) {
  const { main, accent, textColor, accentTextColor, layout, font } = design;
  const displayText = spineText.toUpperCase();
  const bandH = Math.round(height * 0.18);
  const stripeH = 3;

  const titleEl = (color: string) => (
    <span style={{
      writingMode: "vertical-rl", textOrientation: "mixed",
      fontFamily: font.family, fontSize: font.fontSize, fontWeight: font.weight,
      color, letterSpacing: font.letterSpacing, lineHeight: 1.2,
      textAlign: "center", whiteSpace: "nowrap",
    }}>
      {displayText}
    </span>
  );

  const publisherEl = (color: string) => (
    <span style={{
      writingMode: "vertical-rl", textOrientation: "mixed",
      fontFamily: "'Courier New', monospace", fontSize: 7, fontWeight: 700,
      color, letterSpacing: 1.5, opacity: 0.7,
    }}>
      CYBERUSSELL
    </span>
  );

  const horizontalLines = (color: string, count: number) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 3, width: "60%", alignSelf: "center" }}>
      {Array.from({ length: count }).map((_, j) => (
        <div key={j} style={{ height: stripeH, background: color, opacity: 0.5, borderRadius: 1 }} />
      ))}
    </div>
  );

  switch (layout) {
    case "band-top":
      return (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: bandH, background: accent, borderRadius: "3px 3px 0 0", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 4, padding: "8px 0" }}>
            {horizontalLines(accentTextColor, 3)}
          </div>
          <div style={{ position: "absolute", top: bandH, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 6px" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{titleEl(textColor)}</div>
            <div style={{ flexShrink: 0, marginTop: 8 }}>{publisherEl(textColor)}</div>
          </div>
        </>
      );
    case "band-bottom":
      return (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: bandH, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 6px" }}>
            <div style={{ flexShrink: 0, marginBottom: 8 }}>{publisherEl(textColor)}</div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{titleEl(textColor)}</div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: bandH, background: accent, borderRadius: "0 0 3px 3px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {horizontalLines(accentTextColor, 2)}
          </div>
        </>
      );
    case "split":
      return (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: accent, borderRadius: "3px 3px 0 0", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 6px" }}>
            {titleEl(accentTextColor)}
          </div>
          <div style={{ position: "absolute", top: "45%", left: 0, right: 0, height: 4, display: "flex", gap: 0 }}>
            <div style={{ flex: 1, height: "100%", background: "rgba(255,255,255,0.3)" }} />
          </div>
          <div style={{ position: "absolute", top: "45%", left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 6px" }}>
            {publisherEl(textColor)}
          </div>
        </>
      );
    case "stripe-top":
      return (
        <>
          <div style={{ position: "absolute", top: 12, left: "15%", right: "15%", display: "flex", flexDirection: "column", gap: 3 }}>
            <div style={{ height: stripeH, background: accent, borderRadius: 1 }} />
            <div style={{ height: stripeH, background: accent, opacity: 0.5, borderRadius: 1 }} />
          </div>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 6px 24px" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{titleEl(textColor)}</div>
            <div style={{ flexShrink: 0, marginTop: 8 }}>{publisherEl(textColor)}</div>
          </div>
        </>
      );
    case "stripe-bottom":
      return (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 6px 40px" }}>
            <div style={{ flexShrink: 0, marginBottom: 8 }}>{publisherEl(textColor)}</div>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{titleEl(textColor)}</div>
          </div>
          <div style={{ position: "absolute", bottom: 16, left: "12%", right: "12%", height: bandH * 0.4, background: accent, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Courier New', monospace", fontSize: 6, color: accentTextColor, fontWeight: 700, letterSpacing: 1 }}>2026</span>
          </div>
        </>
      );
    case "full-accent-top":
      return (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: bandH * 1.5, background: accent, borderRadius: "3px 3px 0 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", padding: "8px 6px" }}>
            {publisherEl(accentTextColor)}
          </div>
          <div style={{ position: "absolute", top: bandH * 1.5, left: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 6px" }}>
            {titleEl(textColor)}
          </div>
        </>
      );
    case "full-accent-bottom":
      return (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: bandH * 1.2, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 6px" }}>
            {titleEl(textColor)}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: bandH * 1.2, background: accent, borderRadius: "0 0 3px 3px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 6px" }}>
            {publisherEl(accentTextColor)}
          </div>
        </>
      );
    case "double-band":
      return (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: bandH * 0.6, background: accent, borderRadius: "3px 3px 0 0" }} />
          <div style={{ position: "absolute", top: bandH * 0.6, left: 0, right: 0, bottom: bandH * 0.6, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 6px" }}>
            <div style={{ flex: 1, display: "flex", alignItems: "center" }}>{titleEl(textColor)}</div>
            <div style={{ flexShrink: 0, marginTop: 6 }}>{publisherEl(textColor)}</div>
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: bandH * 0.6, background: accent, borderRadius: "0 0 3px 3px" }} />
        </>
      );
  }
}

function SpineCreases() {
  return (
    <>
      {/* Top crease */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 6,
        borderBottom: "1px solid rgba(0,0,0,0.15)",
        background: "linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)",
        borderRadius: "3px 3px 0 0",
      }} />
      {/* Bottom crease */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
        borderTop: "1px solid rgba(0,0,0,0.15)",
        background: "linear-gradient(to top, rgba(255,255,255,0.06), transparent)",
        borderRadius: "0 0 3px 3px",
      }} />
      {/* Vertical edge shadow (left) */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: 4,
        background: "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
        borderRadius: "3px 0 0 3px",
      }} />
      {/* Vertical highlight (right) */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: 3,
        background: "linear-gradient(to left, rgba(255,255,255,0.06), transparent)",
        borderRadius: "0 3px 3px 0",
      }} />
      {/* Inner fold line near top */}
      <div style={{
        position: "absolute", top: 14, left: "15%", right: "15%", height: 1,
        background: "rgba(0,0,0,0.08)",
      }} />
      {/* Inner fold line near bottom */}
      <div style={{
        position: "absolute", bottom: 14, left: "15%", right: "15%", height: 1,
        background: "rgba(0,0,0,0.08)",
      }} />
    </>
  );
}

function FaceCreases() {
  return (
    <>
      {/* Spine edge shadow */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: 12,
        background: "linear-gradient(to right, rgba(0,0,0,0.2), rgba(0,0,0,0.05), transparent)",
        borderRadius: "3px 0 0 3px",
      }} />
      {/* Top edge */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 4,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.06), transparent)",
        borderRadius: "3px 8px 0 0",
      }} />
      {/* Bottom edge */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 4,
        background: "linear-gradient(to top, rgba(0,0,0,0.1), transparent)",
        borderRadius: "0 0 8px 3px",
      }} />
      {/* Subtle page edge on right */}
      <div style={{
        position: "absolute", top: 8, bottom: 8, right: 0, width: 3,
        background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 4px)",
        borderRadius: "0 8px 8px 0",
      }} />
    </>
  );
}

export default function BlogShelf({ posts, onSelectPost }: { posts: Post[]; onSelectPost?: (index: number) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      {/* Desktop bookshelf */}
      <div className="hidden md:block">
        <div
          className="flex items-end justify-center px-12 pb-8 max-w-6xl mx-auto"
          style={{ minHeight: 580, gap: 4 }}
          onMouseLeave={() => setOpenIndex(null)}
        >
          {posts.map((post, i) => {
            const design = BOOK_DESIGNS[i % BOOK_DESIGNS.length];
            const height = BOOK_HEIGHTS[i % BOOK_HEIGHTS.length];
            const spineWidth = SPINE_WIDTHS[i % SPINE_WIDTHS.length];
            const isOpen = openIndex === i;
            const currentWidth = isOpen ? FACE_WIDTH : spineWidth;
            const spineText = post.spineTitle || post.title.toUpperCase();

            const isFirst = i === 0;

            return (
              <div
                key={post.slug}
                className="no-underline block relative"
                style={{
                  width: currentWidth,
                  height,
                  transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  flexShrink: 0,
                  ...(isFirst && !isOpen ? { transform: "rotate(4deg)", transformOrigin: "bottom left", marginRight: 30 } : {}),
                }}
                onMouseEnter={() => setOpenIndex(i)}
                onClick={() => onSelectPost?.(i)}
              >
                {/* Spine — visible when closed */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: design.main,
                    borderRadius: 3,
                    opacity: isOpen ? 0 : 1,
                    transition: "opacity 0.3s ease",
                    overflow: "hidden",
                  }}
                >
                  <SpineCreases />
                  <SpineLayout design={design} spineText={spineText} height={height} />
                </div>

                {/* Face — visible when open */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: design.main,
                    borderRadius: "3px 8px 8px 3px",
                    padding: "32px 28px 28px 32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    opacity: isOpen ? 1 : 0,
                    transition: "opacity 0.4s ease 0.15s",
                    overflow: "hidden",
                    boxShadow: isOpen ? "4px 0 24px rgba(0,0,0,0.35)" : "none",
                  }}
                >
                  <FaceCreases />

                  {/* Cover stamp */}
                  <div style={{ position: "absolute", top: 20, right: 20, opacity: 0.25, zIndex: 1 }}>
                    <div style={{
                      width: 40, height: 40, border: "2px solid rgba(255,255,255,0.4)",
                      borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      transform: "rotate(-12deg)",
                    }}>
                      <div style={{
                        width: 30, height: 30, border: "1px solid rgba(255,255,255,0.3)",
                        borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontFamily: "'Georgia', serif", fontSize: 8, color: "rgba(255,255,255,0.6)", fontWeight: 700 }}>CR</span>
                      </div>
                    </div>
                  </div>

                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 12,
                      zIndex: 1,
                    }}
                  >
                    {post.lang === "fil" ? "Filipino" : "English"} · {post.readTime}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontSize: 20,
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.3,
                      marginBottom: 14,
                      zIndex: 1,
                    }}
                  >
                    {post.title}
                  </span>
                  <span style={{ width: 30, height: 1, background: "rgba(255,255,255,0.3)", marginBottom: 14, flexShrink: 0, zIndex: 1 }} />
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 13,
                      color: "rgba(255,255,255,0.6)",
                      lineHeight: 1.7,
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      zIndex: 1,
                    }}
                  >
                    {post.description}
                  </span>
                  <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6, zIndex: 1 }}>
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontFamily: "var(--font-inter), sans-serif",
                          fontSize: 10,
                          color: "rgba(255,255,255,0.4)",
                          background: "rgba(255,255,255,0.1)",
                          padding: "3px 10px",
                          borderRadius: 99,
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom publisher line */}
                  <div style={{ position: "absolute", bottom: 16, left: 32, right: 28, display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 1 }}>
                    <span style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: "rgba(255,255,255,0.2)", letterSpacing: 1 }}>CYBERUSSELL PRESS</span>
                    <div style={{ display: "flex", gap: 1, height: 12 }}>
                      {[8, 12, 6, 12, 8, 10, 6, 12, 8].map((h, j) => (
                        <div key={j} style={{ width: 1.5, height: h, background: "rgba(255,255,255,0.15)", borderRadius: 0.5 }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* Coming soon placeholder */}
          <div
            className="rounded-[3px] flex items-center justify-center flex-shrink-0 relative"
            style={{ width: 70, height: 400, background: "rgba(255,255,255,0.06)" }}
          >
            <SpineCreases />
            <span
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontFamily: "'Georgia', serif",
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: 3,
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Coming Soon
            </span>
          </div>
        </div>
        {/* Shelf */}
        <div className="max-w-6xl mx-auto">
          <div style={{ height: 3, background: "rgba(255,255,255,0.12)", borderRadius: 1 }} />
          <div style={{ height: 10, background: "linear-gradient(to bottom, rgba(255,255,255,0.04), transparent)", borderRadius: "0 0 4px 4px" }} />
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {posts.map((post, i) => {
          const d = BOOK_DESIGNS[i % BOOK_DESIGNS.length];
          return (
            <div
              key={post.slug}
              onClick={() => onSelectPost?.(i)}
              className="block rounded-2xl p-5 no-underline cursor-pointer"
              style={{ background: "#18181F", borderLeft: `4px solid ${d.main}` }}
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="font-[family-name:var(--font-inter)] font-bold rounded-full px-2.5 py-0.5"
                  style={{
                    fontSize: 11,
                    color: d.main,
                    background: `${d.main}15`,
                    border: `1px solid ${d.main}30`,
                  }}
                >
                  {post.lang === "fil" ? "Filipino" : "English"}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-white/30" style={{ fontSize: 11 }}>
                  {new Date(post.date).toLocaleDateString("en-PH", { year: "numeric", month: "short", day: "numeric" })}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-white/30" style={{ fontSize: 11 }}>
                  · {post.readTime}
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-syne)] text-[17px] font-bold text-white mb-1.5 leading-snug">
                {post.title}
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 leading-relaxed mb-2">
                {post.description}
              </p>
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#E8373A]">
                Read &rarr;
              </span>
              <div className="flex flex-wrap gap-1.5">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-[family-name:var(--font-inter)] text-white/30 rounded-full px-2.5 py-0.5"
                    style={{ fontSize: 11, background: "rgba(255,255,255,0.05)" }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
