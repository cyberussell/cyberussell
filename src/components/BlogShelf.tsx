"use client";

import { useState } from "react";
import type { Post } from "@/lib/blog";

const BOOK_COLORS = ["#E24B4A", "#185FA5", "#1D9E75", "#BA7517", "#534AB7", "#D4537E", "#D85A30", "#639922"];

const SPINE_FONTS = [
  { family: "var(--font-syne), sans-serif", weight: 900, letterSpacing: 1, uppercase: true, fontSize: 18 },
  { family: "'Georgia', serif", weight: 700, letterSpacing: 3, uppercase: true, fontSize: 16 },
  { family: "system-ui, sans-serif", weight: 900, letterSpacing: 0, uppercase: true, fontSize: 20 },
  { family: "'Courier New', monospace", weight: 700, letterSpacing: 2, uppercase: true, fontSize: 15 },
  { family: "var(--font-inter), sans-serif", weight: 800, letterSpacing: 4, uppercase: true, fontSize: 14 },
  { family: "'Impact', sans-serif", weight: 400, letterSpacing: 1, uppercase: true, fontSize: 18 },
  { family: "var(--font-syne), sans-serif", weight: 800, letterSpacing: 2, uppercase: true, fontSize: 16 },
  { family: "system-ui, sans-serif", weight: 900, letterSpacing: 1, uppercase: true, fontSize: 17 },
];

const BOOK_HEIGHTS = [520, 460, 490, 430, 480, 450, 500, 420];
const SPINE_WIDTHS = [85, 75, 90, 78, 85, 76, 82, 86];
const FACE_WIDTH = 240;

type SpineStamp = {
  type: "publisher" | "edition" | "barcode" | "seal" | "stripe" | "dot-pattern" | "year-mark" | "logo-block";
  position: "top" | "bottom";
};

const SPINE_STAMPS: SpineStamp[][] = [
  [{ type: "publisher", position: "bottom" }, { type: "stripe", position: "top" }],
  [{ type: "barcode", position: "bottom" }, { type: "dot-pattern", position: "top" }],
  [{ type: "seal", position: "bottom" }, { type: "year-mark", position: "top" }],
  [{ type: "logo-block", position: "top" }, { type: "edition", position: "bottom" }],
  [{ type: "stripe", position: "top" }, { type: "publisher", position: "bottom" }],
  [{ type: "year-mark", position: "top" }, { type: "barcode", position: "bottom" }],
  [{ type: "edition", position: "bottom" }, { type: "seal", position: "top" }],
  [{ type: "dot-pattern", position: "top" }, { type: "logo-block", position: "bottom" }],
];

function StampElement({ stamp, spineWidth }: { stamp: SpineStamp; spineWidth: number }) {
  const w = spineWidth - 16;
  const o = "rgba(255,255,255,0.2)";
  const o2 = "rgba(255,255,255,0.12)";

  switch (stamp.type) {
    case "publisher":
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
          <div style={{ width: 20, height: 20, border: `1.5px solid ${o}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "'Georgia', serif", fontSize: 9, color: o, fontWeight: 700 }}>C</span>
          </div>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 6, color: o2, letterSpacing: 1 }}>PRESS</span>
        </div>
      );
    case "barcode":
      return (
        <div style={{ display: "flex", gap: 1.5, alignItems: "flex-end", height: 18 }}>
          {[12, 16, 10, 18, 8, 14, 12, 16, 10, 14, 8].map((h, j) => (
            <div key={j} style={{ width: 2, height: h, background: o2, borderRadius: 0.5 }} />
          ))}
        </div>
      );
    case "seal":
      return (
        <div style={{ position: "relative", width: 28, height: 28 }}>
          <div style={{
            width: 28, height: 28, border: `1.5px solid ${o}`, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ width: 18, height: 18, border: `1px solid ${o2}`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 7, color: o, fontFamily: "'Georgia', serif", fontWeight: 700 }}>★</span>
            </div>
          </div>
        </div>
      );
    case "edition":
      return (
        <div style={{ border: `1px solid ${o2}`, padding: "3px 6px", borderRadius: 2 }}>
          <span style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: o, letterSpacing: 1 }}>1ST ED.</span>
        </div>
      );
    case "stripe":
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 2, width: Math.min(w, 40) }}>
          <div style={{ height: 2, background: o2, borderRadius: 1 }} />
          <div style={{ height: 2, background: o, borderRadius: 1 }} />
          <div style={{ height: 2, background: o2, borderRadius: 1 }} />
        </div>
      );
    case "dot-pattern":
      return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 4px)", gap: 3 }}>
          {Array.from({ length: 9 }).map((_, j) => (
            <div key={j} style={{ width: 4, height: 4, borderRadius: "50%", background: j % 2 === 0 ? o : o2 }} />
          ))}
        </div>
      );
    case "year-mark":
      return (
        <span style={{ fontFamily: "'Georgia', serif", fontSize: 9, color: o, fontStyle: "italic" }}>2026</span>
      );
    case "logo-block":
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
          <div style={{ width: 16, height: 16, background: o2, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 8, height: 8, border: `1.5px solid ${o}`, borderRadius: 1 }} />
          </div>
        </div>
      );
    default:
      return null;
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

export default function BlogShelf({ posts }: { posts: Post[] }) {
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
            const color = BOOK_COLORS[i % BOOK_COLORS.length];
            const spineFont = SPINE_FONTS[i % SPINE_FONTS.length];
            const height = BOOK_HEIGHTS[i % BOOK_HEIGHTS.length];
            const spineWidth = SPINE_WIDTHS[i % SPINE_WIDTHS.length];
            const stamps = SPINE_STAMPS[i % SPINE_STAMPS.length];
            const isOpen = openIndex === i;
            const currentWidth = isOpen ? FACE_WIDTH : spineWidth;
            const spineText = post.spineTitle || post.title.toUpperCase();
            const displayText = spineFont.uppercase ? spineText.toUpperCase() : spineText;
            const topStamp = stamps.find((s) => s.position === "top");
            const bottomStamp = stamps.find((s) => s.position === "bottom");

            const isFirst = i === 0;

            return (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
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
              >
                {/* Spine — visible when closed */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: color,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "24px 6px",
                    opacity: isOpen ? 0 : 1,
                    transition: "opacity 0.3s ease",
                    overflow: "hidden",
                  }}
                >
                  <SpineCreases />

                  {/* Top stamp */}
                  {topStamp && (
                    <div style={{ flexShrink: 0, zIndex: 1 }}>
                      <StampElement stamp={topStamp} spineWidth={spineWidth} />
                    </div>
                  )}

                  {/* Title */}
                  <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>
                    <span
                      style={{
                        writingMode: "vertical-rl",
                        textOrientation: "mixed",
                        fontFamily: spineFont.family,
                        fontSize: spineFont.fontSize,
                        fontWeight: spineFont.weight,
                        color: "#fff",
                        letterSpacing: spineFont.letterSpacing,
                        lineHeight: 1.2,
                        textAlign: "center",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {displayText}
                    </span>
                  </div>

                  {/* Bottom stamp */}
                  {bottomStamp && (
                    <div style={{ flexShrink: 0, zIndex: 1 }}>
                      <StampElement stamp={bottomStamp} spineWidth={spineWidth} />
                    </div>
                  )}
                </div>

                {/* Face — visible when open */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: color,
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
              </a>
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
        {/* Hint */}
        <p
          className="text-center font-[family-name:var(--font-inter)] py-4"
          style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}
        >
          Hover a book to peek, click to read
        </p>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {posts.map((post, i) => {
          const color = BOOK_COLORS[i % BOOK_COLORS.length];
          return (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block rounded-2xl p-5 no-underline"
              style={{ background: "#18181F", borderLeft: `4px solid ${color}` }}
            >
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className="font-[family-name:var(--font-inter)] font-bold rounded-full px-2.5 py-0.5"
                  style={{
                    fontSize: 11,
                    color,
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
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
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-relaxed mb-3">
                {post.description}
              </p>
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
            </a>
          );
        })}
      </div>
    </>
  );
}
