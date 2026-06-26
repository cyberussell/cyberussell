"use client";

import type { Post } from "@/lib/blog";

const BOOK_COLORS = ["#E24B4A", "#185FA5", "#1D9E75", "#BA7517", "#534AB7", "#D4537E", "#D85A30", "#639922"];

function getBookStyle(index: number, total: number) {
  const color = BOOK_COLORS[index % BOOK_COLORS.length];
  const heights = [520, 460, 490, 430, 480, 450, 500, 420];
  const widths = [100, 240, 85, 110, 95, 105, 88, 115];
  const height = heights[index % heights.length];
  const width = widths[index % widths.length];
  const isFeatured = index === 0 && total > 1;
  return { color, height, width: isFeatured ? 260 : width, isFeatured };
}

export default function BlogShelf({ posts }: { posts: Post[] }) {
  return (
    <>
      {/* Desktop bookshelf */}
      <div className="hidden md:block">
        <div className="flex items-end justify-center gap-4 px-12 pb-8 max-w-5xl mx-auto" style={{ minHeight: 580 }}>
          {posts.map((post, i) => {
            const book = getBookStyle(i, posts.length);
            return book.isFeatured ? (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-[3px] flex flex-col items-center justify-center cursor-pointer no-underline"
                style={{
                  width: book.width,
                  height: book.height,
                  background: book.color,
                  padding: 16,
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <span
                  className="font-[family-name:var(--font-inter)] uppercase"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", letterSpacing: 2, marginBottom: 10 }}
                >
                  {post.lang === "fil" ? "Filipino" : "English"}
                </span>
                <span
                  className="font-[family-name:var(--font-syne)] text-center"
                  style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}
                >
                  {post.title}
                </span>
                <span style={{ width: 30, height: 1, background: "rgba(255,255,255,0.3)", margin: "14px 0" }} />
                <span
                  className="font-[family-name:var(--font-inter)]"
                  style={{ fontSize: 10, color: "rgba(255,255,255,0.5)" }}
                >
                  {post.readTime}
                </span>
              </a>
            ) : (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="rounded-[3px] flex items-center justify-center cursor-pointer no-underline"
                style={{
                  width: book.width,
                  height: book.height,
                  background: book.color,
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "none")}
              >
                <span
                  className="font-[family-name:var(--font-syne)]"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                    letterSpacing: 1,
                    padding: "16px 0",
                  }}
                >
                  {post.spineTitle || post.title.toUpperCase()}
                </span>
              </a>
            );
          })}
          {/* Decorative accent spine */}
          <div className="rounded-[2px]" style={{ width: 22, height: 460, background: "#534AB7" }} />
          {/* Coming soon placeholder */}
          <div
            className="rounded-[3px] flex items-center justify-center"
            style={{ width: 100, height: 360, border: "1px dashed rgba(255,255,255,0.15)" }}
          >
            <span
              className="font-[family-name:var(--font-inter)]"
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: 9,
                color: "rgba(255,255,255,0.25)",
                letterSpacing: 1,
              }}
            >
              COMING SOON
            </span>
          </div>
        </div>
        {/* Shelf */}
        <div className="mx-5" style={{ height: 2, background: "rgba(255,255,255,0.15)" }} />
        <div className="mx-4 rounded-b" style={{ height: 8, background: "rgba(255,255,255,0.04)" }} />
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
