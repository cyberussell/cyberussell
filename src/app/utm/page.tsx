"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SOURCES = ["tiktok", "facebook", "youtube", "instagram", "twitter", "whatsapp", "messenger", "other"];
const PAGES = [
  { label: "Homepage", value: "https://www.cyberussell.com" },
  { label: "Blog", value: "https://www.cyberussell.com/blog" },
  { label: "Blog Post — Your Skill Has a Price", value: "https://www.cyberussell.com/blog/how-to-earn-money-online-philippines-beginners" },
  { label: "Platforms / Find Work", value: "https://www.cyberussell.com/platforms" },
  { label: "Contact", value: "https://www.cyberussell.com/contact" },
];

export default function UTMPage() {
  const [source, setSource] = useState("tiktok");
  const [campaign, setCampaign] = useState("");
  const [page, setPage] = useState(PAGES[0].value);
  const [copied, setCopied] = useState(false);

  const utmLink = `${page}?utm_source=${source}&utm_medium=social&utm_campaign=${campaign || "general"}`;

  function copy() {
    navigator.clipboard.writeText(utmLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-block bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              UTM Builder
            </span>
          </div>
          <h1 className="font-sans text-[26px] md:text-[34px] font-bold text-white mb-3 leading-tight">
            Social Media Link Tracker
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.8]">
            Generate tracking links for your social media posts. GA4 will show you exactly which platform and campaign is driving traffic to your site.
          </p>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Platform */}
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50 uppercase tracking-[1px]">
              Platform
            </label>
            <div className="flex flex-wrap gap-2">
              {SOURCES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSource(s)}
                  className={`px-4 py-2 rounded-lg border font-[family-name:var(--font-inter)] text-[13px] font-bold capitalize transition-all ${
                    source === s
                      ? "bg-[#E8373A] border-[#E8373A] text-white"
                      : "bg-[#18181F] border-white/10 text-white/60 hover:border-white/30"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Page */}
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50 uppercase tracking-[1px]">
              Destination Page
            </label>
            <select
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className="bg-[#18181F] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] focus:outline-none focus:border-[#E8373A] transition-colors font-[family-name:var(--font-inter)]"
            >
              {PAGES.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Campaign */}
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50 uppercase tracking-[1px]">
              Campaign Name <span className="text-white/25 normal-case font-normal">(optional — e.g. "skill-video", "june-promo")</span>
            </label>
            <input
              type="text"
              value={campaign}
              onChange={(e) => setCampaign(e.target.value.toLowerCase().replace(/\s+/g, "-"))}
              placeholder="e.g. skill-video, blog-post-1"
              className="bg-[#18181F] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#E8373A] transition-colors font-[family-name:var(--font-inter)]"
            />
          </div>

          {/* Result */}
          <div className="flex flex-col gap-2">
            <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50 uppercase tracking-[1px]">
              Your Tracking Link
            </label>
            <div className="bg-[#18181F] border border-[#FFD23F]/30 rounded-lg px-4 py-3 flex items-center justify-between gap-3">
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#FFD23F] break-all leading-[1.6]">
                {utmLink}
              </p>
              <button
                onClick={copy}
                className="shrink-0 bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F] p-2 rounded-lg hover:bg-[#FFD23F]/20 transition-colors"
              >
                {copied ? <Check size={16} strokeWidth={2.5} /> : <Copy size={16} strokeWidth={2.5} />}
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5">
            <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/40 uppercase tracking-[1px] mb-3">How to use</p>
            <ol className="flex flex-col gap-2">
              {[
                "Select the platform where you will post",
                "Choose which page you want people to land on",
                "Add a campaign name to identify the specific post or video",
                "Copy the link and paste it in your TikTok bio, Facebook post, or YouTube description",
                "Check GA4 → Acquisition → Traffic acquisition to see results",
              ].map((step, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] bg-[#E8373A]/10 rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-[1px]">{i + 1}</span>
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="text-center mt-10">
          <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 hover:text-white transition-colors">
            ← Back to cyberussell.com
          </a>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
