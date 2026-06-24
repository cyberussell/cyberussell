"use client";

import { useState } from "react";

export default function ShareSiteButton() {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const shareData = {
      title: "Cyberussell — Your Skills. Your Income.",
      text: "Free, data-backed guides for Filipinos who want to earn online. No email. No payment.",
      url: "https://www.cyberussell.com",
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // user cancelled
      }
    } else {
      await navigator.clipboard.writeText("https://www.cyberussell.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      onClick={handleShare}
      className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 hover:text-white transition-colors text-left"
    >
      {copied ? "Link Copied!" : "Share This Site"}
    </button>
  );
}
