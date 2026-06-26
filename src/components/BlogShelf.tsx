"use client";

import { useState } from "react";
import type { Post } from "@/lib/blog";

const BOOK_COLORS = ["#E24B4A", "#185FA5", "#1D9E75", "#BA7517", "#534AB7", "#D4537E", "#D85A30", "#639922"];

const SPINE_FONTS = [
  { family: "'Georgia', serif", weight: 400, letterSpacing: 3, uppercase: true, fontSize: 13 },
  { family: "'Courier New', monospace", weight: 700, letterSpacing: 2, uppercase: true, fontSize: 12 },
  { family: "var(--font-syne), sans-serif", weight: 800, letterSpacing: 0, uppercase: false, fontSize: 14 },
  { family: "'Times New Roman', serif", weight: 400, letterSpacing: 4, uppercase: true, fontSize: 14 },
  { family: "var(--font-inter), sans-serif", weight: 300, letterSpacing: 6, uppercase: true, fontSize: 11 },
  { family: "'Impact', sans-serif", weight: 400, letterSpacing: 1, uppercase: true, fontSize: 13 },
  { family: "'Palatino', 'Book Antiqua', serif", weight: 400, letterSpacing: 2, uppercase: false, fontSize: 13 },
  { family: "system-ui, sans-serif", weight: 900, letterSpacing: 0, uppercase: true, fontSize: 12 },
];

const BOOK_HEIGHTS = [520, 460, 490, 430, 480, 450, 500, 420];
const SPINE_WIDTHS = [80, 70, 85, 75, 80, 72, 78, 82];
const FACE_WIDTH = 240;

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
            const isOpen = openIndex === i;
            const currentWidth = isOpen ? FACE_WIDTH : spineWidth;
            const spineText = post.spineTitle || post.title.toUpperCase();
            const displayText = spineFont.uppercase ? spineText.toUpperCase() : spineText;

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
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "20px 6px",
                    opacity: isOpen ? 0 : 1,
                    transition: "opacity 0.3s ease",
                    overflow: "hidden",
                  }}
                >
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

                {/* Face — visible when open */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: color,
                    borderRadius: "3px 8px 8px 3px",
                    padding: "28px 24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    opacity: isOpen ? 1 : 0,
                    transition: "opacity 0.4s ease 0.15s",
                    overflow: "hidden",
                    boxShadow: isOpen ? "4px 0 24px rgba(0,0,0,0.35)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: 2,
                      textTransform: "uppercase",
                      marginBottom: 12,
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
                    }}
                  >
                    {post.title}
                  </span>
                  <span style={{ width: 30, height: 1, background: "rgba(255,255,255,0.3)", marginBottom: 14, flexShrink: 0 }} />
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
                    }}
                  >
                    {post.description}
                  </span>
                  <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6 }}>
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
                </div>
              </a>
            );
          })}
          {/* Decorative accent spine */}
          <div className="rounded-[2px] flex-shrink-0" style={{ width: 18, height: 460, background: "#534AB7" }} />
          {/* Coming soon placeholder */}
          <div
            className="rounded-[3px] flex items-center justify-center flex-shrink-0"
            style={{ width: 70, height: 360, border: "1px dashed rgba(255,255,255,0.15)" }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontFamily: "'Georgia', serif",
                fontSize: 9,
                color: "rgba(255,255,255,0.2)",
                letterSpacing: 3,
                textTransform: "uppercase",
              }}
            >
              Coming Soon
            </span>
          </div>
        </div>
        {/* Shelf */}
        <div className="max-w-6xl mx-auto">
          <div style={{ height: 2, background: "rgba(255,255,255,0.15)" }} />
          <div className="rounded-b" style={{ height: 8, background: "rgba(255,255,255,0.04)" }} />
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
