"use client";

import { useState } from "react";

export default function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.cyberussell.com/blog/${slug}`;

  function shareOnFacebook() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank", "width=600,height=400");
  }

  function shareOnX() {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank", "width=600,height=400");
  }

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="pt-8 border-t border-white/10">
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 mb-4">Share this article</p>
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={shareOnFacebook}
          className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#1877F2]/90 text-white font-[family-name:var(--font-inter)] font-semibold text-[13px] px-4 py-2.5 rounded-lg transition-all"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.884v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
          </svg>
          Facebook
        </button>

        <button
          onClick={shareOnX}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-[family-name:var(--font-inter)] font-semibold text-[13px] px-4 py-2.5 rounded-lg transition-all"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          X
        </button>

        <button
          onClick={copyLink}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-[family-name:var(--font-inter)] font-semibold text-[13px] px-4 py-2.5 rounded-lg transition-all"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          {copied ? "Copied!" : "Copy link"}
        </button>
      </div>
    </div>
  );
}
