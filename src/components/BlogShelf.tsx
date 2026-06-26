"use client";

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

function getBookStyle(index: number) {
  const color = BOOK_COLORS[index % BOOK_COLORS.length];
  const heights = [520, 460, 490, 430, 480, 450, 500, 420];
  const widths = [80, 70, 85, 75, 80, 72, 78, 82];
  const height = heights[index % heights.length];
  const width = widths[index % widths.length];
  const spineFont = SPINE_FONTS[index % SPINE_FONTS.length];
  return { color, height, width, spineFont };
}

function BookCard({ post, index }: { post: Post; index: number }) {
  const book = getBookStyle(index);
  const spineText = post.spineTitle || post.title.toUpperCase();
  const displayText = book.spineFont.uppercase ? spineText.toUpperCase() : spineText;
  const faceWidth = Math.max(book.width * 2.8, 200);

  return (
    <a
      href={`/blog/${post.slug}`}
      className="book-container no-underline block"
      style={{
        width: book.width,
        height: book.height,
        perspective: 1200,
        cursor: "pointer",
      }}
    >
      <div
        className="book-inner"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          transformOrigin: "left center",
        }}
      >
        {/* Spine (front) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: book.color,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backfaceVisibility: "hidden",
            padding: "20px 6px",
          }}
        >
          <span
            style={{
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              fontFamily: book.spineFont.family,
              fontSize: book.spineFont.fontSize,
              fontWeight: book.spineFont.weight,
              color: "#fff",
              letterSpacing: book.spineFont.letterSpacing,
              lineHeight: 1.2,
              textAlign: "center",
            }}
          >
            {displayText}
          </span>
        </div>

        {/* Face (back - revealed on hover) */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: faceWidth,
            height: "100%",
            background: book.color,
            borderRadius: "3px 8px 8px 3px",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            padding: "28px 24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            boxShadow: "4px 0 20px rgba(0,0,0,0.4)",
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
          <span style={{ width: 30, height: 1, background: "rgba(255,255,255,0.3)", marginBottom: 14 }} />
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
      </div>
    </a>
  );
}

export default function BlogShelf({ posts }: { posts: Post[] }) {
  return (
    <>
      <style>{`
        .book-container:hover .book-inner {
          transform: rotateY(-180deg);
        }
        .book-container:hover {
          z-index: 10;
        }
      `}</style>

      {/* Desktop bookshelf */}
      <div className="hidden md:block">
        <div className="flex items-end justify-center gap-3 px-12 pb-8 max-w-5xl mx-auto" style={{ minHeight: 580 }}>
          {posts.map((post, i) => (
            <BookCard key={post.slug} post={post} index={i} />
          ))}
          {/* Decorative accent spine */}
          <div className="rounded-[2px]" style={{ width: 18, height: 460, background: "#534AB7" }} />
          {/* Coming soon placeholder */}
          <div
            className="rounded-[3px] flex items-center justify-center"
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
        <div className="max-w-5xl mx-auto">
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
