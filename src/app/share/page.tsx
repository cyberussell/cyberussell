"use client";

import { useState } from "react";

async function copyToClipboard(text: string, setCopied: (v: boolean) => void) {
  try {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
}

const SHARE_CARDS = [
  {
    platform: "Facebook",
    emoji: "📘",
    text: "I found a free website that helps Filipinos earn online using their existing skills. No email needed. No payment. Real data from PSA and DOLE. Check it out: cyberussell.com",
    directLabel: "Share on Facebook →",
    directHref: "https://www.facebook.com/sharer/sharer.php?u=https://cyberussell.com",
    directColor: "#1877F2",
  },
  {
    platform: "Messenger",
    emoji: "💬",
    text: "Ate/Kuya — may libre na website akong nakita para sa mga gustong kumita online. Walang bayad, walang email. Tingnan mo: cyberussell.com",
    directLabel: null,
    directHref: null,
    directColor: null,
  },
  {
    platform: "WhatsApp",
    emoji: "🟢",
    text: "Check this out — free website for Filipinos who want to earn online. Real data, free guides, no payment needed: cyberussell.com",
    directLabel: "Open WhatsApp and Share →",
    directHref: "https://wa.me/?text=Check%20this%20out%20%E2%80%94%20free%20website%20for%20Filipinos%20who%20want%20to%20earn%20online.%20Real%20data%2C%20free%20guides%2C%20no%20payment%20needed%3A%20cyberussell.com",
    directColor: "#25D366",
  },
  {
    platform: "Copy Link",
    emoji: "🔗",
    text: "https://cyberussell.com",
    directLabel: null,
    directHref: null,
    directColor: null,
  },
];

export default function SharePage() {
  const [copied, setCopied] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px]">
              Share this site
            </span>
          </div>
          <h1 className="font-sans text-[28px] md:text-[38px] font-bold text-white mb-4 leading-tight">
            Help a Filipino earn online today
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8]">
            This site is free. No email. No payment. The best thing you can do
            is share it with someone who needs it.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {SHARE_CARDS.map((card, i) => {
            const isCopied = copied === i;
            return (
              <div
                key={card.platform}
                className="bg-[#18181F] border border-white/[0.12] rounded-2xl p-6"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[18px]">{card.emoji}</span>
                  <h3 className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white">
                    {card.platform}
                  </h3>
                </div>

                {/* Text box */}
                <div
                  className="rounded-lg p-3 mb-3 select-all cursor-text"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <p
                    className="font-[family-name:var(--font-inter)] text-[13px] leading-[1.65]"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    {card.text}
                  </p>
                </div>

                {/* Copy button */}
                <button
                  onClick={() => copyToClipboard(card.text, (v) => { if (v) setCopied(i); else setCopied(null); })}
                  className="font-[family-name:var(--font-inter)] text-[12px] font-semibold px-4 py-2 rounded-lg min-h-[36px] transition-all duration-150"
                  style={{
                    background: isCopied ? "rgba(0,201,122,0.15)" : "rgba(255,255,255,0.08)",
                    border: isCopied ? "1px solid rgba(0,201,122,0.3)" : "1px solid rgba(255,255,255,0.15)",
                    color: isCopied ? "#00C97A" : "rgba(255,255,255,0.7)",
                  }}
                >
                  {isCopied ? "✓ Copied!" : "Copy"}
                </button>

                {/* Direct share button */}
                {card.directHref && (
                  <a
                    href={card.directHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-[13px] font-semibold py-2 px-4 rounded-lg mt-2"
                    style={{ background: card.directColor!, color: "white", textDecoration: "none" }}
                  >
                    {card.directLabel}
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Back link */}
        <div className="text-center mt-10">
          <a
            href="/"
            className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors"
          >
            ← Back to cyberussell.com
          </a>
        </div>
      </div>
    </main>
  );
}
