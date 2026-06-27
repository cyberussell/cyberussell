"use client";

import { useState, useRef } from "react";
import type { Post } from "@/lib/blog";
import BlogShelf from "@/components/BlogShelf";
import { BOOK_DESIGNS } from "@/components/BlogShelf";
import ShareButtons from "@/components/ShareButtons";
import SubscribeForm from "@/components/SubscribeForm";

function BookThumbnail({ index, title }: { index: number; title: string }) {
  const design = BOOK_DESIGNS[index % BOOK_DESIGNS.length];
  const displayTitle = title.toUpperCase();

  return (
    <div
      className="float-left mr-5 mb-3 flex-shrink-0 hidden md:block"
      style={{
        width: 100,
        height: 140,
        background: design.main,
        borderRadius: "3px 6px 6px 3px",
        position: "relative",
        overflow: "hidden",
        boxShadow: "2px 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Spine edge */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: 8,
        background: "linear-gradient(to right, rgba(0,0,0,0.2), transparent)",
      }} />
      {/* Top highlight */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: "linear-gradient(to bottom, rgba(255,255,255,0.1), transparent)",
        borderRadius: "3px 6px 0 0",
      }} />
      {/* Accent band */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 24,
        background: design.accent,
        borderRadius: "3px 6px 0 0",
      }} />
      {/* Title */}
      <div style={{
        position: "absolute", top: 28, left: 10, right: 10, bottom: 24,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{
          fontFamily: design.font.family,
          fontSize: 9,
          fontWeight: design.font.weight,
          color: design.textColor,
          lineHeight: 1.3,
          textAlign: "center",
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 5,
          WebkitBoxOrient: "vertical",
        }}>
          {displayTitle}
        </span>
      </div>
      {/* Publisher */}
      <div style={{
        position: "absolute", bottom: 8, left: 0, right: 0,
        textAlign: "center",
      }}>
        <span style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 5,
          color: "rgba(255,255,255,0.4)",
          letterSpacing: 1,
        }}>
          CYBERUSSELL
        </span>
      </div>
      {/* Page edge right */}
      <div style={{
        position: "absolute", top: 6, bottom: 6, right: 0, width: 2,
        background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 4px)",
        borderRadius: "0 6px 6px 0",
      }} />
    </div>
  );
}

export default function BlogShelfWithReader({ posts }: { posts: Post[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const readerRef = useRef<HTMLDivElement>(null);
  const shelfRef = useRef<HTMLDivElement>(null);

  const post = posts[selectedIndex];

  function handleSelect(index: number) {
    setSelectedIndex(index);
    readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function scrollToShelf() {
    shelfRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div ref={shelfRef}>
        <BlogShelf posts={posts} onSelectPost={handleSelect} />
      </div>

      {post && (
        <div ref={readerRef} className="max-w-2xl mx-auto mt-16 scroll-mt-8">
          <div className="mb-8">
            <BookThumbnail index={selectedIndex} title={post.spineTitle || post.title} />
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border font-[family-name:var(--font-inter)] ${
                post.lang === "fil"
                  ? "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20"
                  : "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20"
              }`}>
                {post.lang === "fil" ? "Filipino" : "English"}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">
                {new Date(post.date).toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">· {post.readTime}</span>
            </div>
            <h2 className="font-sans text-[26px] md:text-[38px] font-bold text-white leading-tight mb-4">
              {post.title}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              {post.description}
            </p>
            <span className="inline-block mt-3 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#E8373A] cursor-pointer hover:underline" onClick={() => readerRef.current?.querySelector('.prose-cyberussell')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>
              Read full article &darr;
            </span>
          </div>
          <div style={{ clear: "both" }} />
          <div className="h-[1px] bg-white/10 mb-8" />
          <div
            className="prose-cyberussell"
            dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          />
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
            {post.tags.map((tag) => (
              <span key={tag} className="font-[family-name:var(--font-inter)] text-[11px] text-white/35 bg-white/5 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          <ShareButtons slug={post.slug} title={post.title} />
          <div className="mt-10">
            <SubscribeForm />
          </div>
          <div className="text-center mt-10">
            <button
              onClick={scrollToShelf}
              className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 hover:text-white transition-colors cursor-pointer bg-transparent border-none"
            >
              ↑ Back to the shelf
            </button>
          </div>
        </div>
      )}
    </>
  );
}
