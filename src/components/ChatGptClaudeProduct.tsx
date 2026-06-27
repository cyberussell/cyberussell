"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ShoppingCart,
  Loader2,
  Bot,
  BookOpen,
  Zap,
  Shield,
  ArrowLeft,
  Minus,
} from "lucide-react";
import { track } from "@vercel/analytics";

const CHAPTERS = [
  { num: "01", name: "What Are ChatGPT and Claude?" },
  { num: "02", name: "The Real Difference Between Them" },
  { num: "03", name: "Which One Should You Use?" },
  { num: "04", name: "Way #1 — Freelance Writing and Content" },
  { num: "05", name: "Way #2 — Virtual Assistant Work" },
  { num: "06", name: "Way #3 — Digital Products" },
  { num: "07", name: "10 Prompts You Can Use Right Now" },
  { num: "08", name: "Common Mistakes About AI — And the Truth" },
  { num: "09", name: "The Philippine Income Reality" },
  { num: "10", name: "Quick Reference and Cheat Sheet" },
  { num: "11", name: "What to Do Next" },
];

const COMPARISON = [
  { feature: "ChatGPT vs Claude comparison", free: false, paid: true },
  { feature: "3 earning paths with income data", free: false, paid: true },
  { feature: "10 copy-paste prompts", free: false, paid: true },
  { feature: "PSA/DOLE-sourced income figures", free: false, paid: true },
  { feature: "Quick reference cheat sheet", free: false, paid: true },
  { feature: "Platform links and setup guide", free: false, paid: true },
];

export default function ChatGptClaudeProduct() {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "chatgpt-claude-for-filipinos" }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        track("shop_checkout", { product: "chatgpt-claude-for-filipinos" });
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-14">
      <a
        href="/shop"
        className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/55 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Shop
      </a>

      {/* Hero */}
      <div>
        <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#3B82F6]/70 uppercase tracking-[0.15em] mb-3 block">
          Trending · Cyberussell
        </span>
        <h1 className="font-sans text-[28px] md:text-[40px] font-bold text-white leading-tight mb-4">
          ChatGPT &amp; Claude for Filipinos
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-white/70 leading-[1.8] max-w-2xl">
          20-page guide na nagtuturo kung paano gamitin ang ChatGPT at Claude para kumita online — may 10 ready-to-use prompts, 3 earning paths, at real income data mula sa PSA at DOLE.
        </p>
      </div>

      {/* What makes this different */}
      <div className="bg-[#3B82F6]/5 border border-[#3B82F6]/15 rounded-[14px] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <Zap size={20} className="text-[#3B82F6]" strokeWidth={2} />
          <h2 className="font-sans text-[20px] md:text-[22px] font-bold text-white">
            Bakit iba &apos;to sa ibang AI guides?
          </h2>
        </div>
        <ul className="space-y-3">
          {[
            "Hindi hype — walang \"₱50,000 a month\" na walang explanation",
            "Lahat ng income numbers ay galing sa PSA, DOLE, Wise.com, at Ecomobi (2025–2026)",
            "10 prompts na copy-paste ready — hindi theory, actual prompts",
            "Designed for Filipinos — hindi US-centric, hindi puro tech jargon",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#3B82F6] mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* What's Inside */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={20} className="text-[#3B82F6]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white">
            What&apos;s Inside (11 Chapters)
          </h2>
        </div>
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] overflow-hidden">
          {CHAPTERS.map((ch, i) => (
            <div
              key={ch.num}
              className={`flex items-start gap-4 px-6 py-4 ${i < CHAPTERS.length - 1 ? "border-b border-white/[0.06]" : ""}`}
            >
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#3B82F6] mt-0.5 shrink-0 w-[28px]">
                {ch.num}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[14px] md:text-[15px] text-white/70 leading-[1.6]">
                {ch.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3 Earning Paths */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Bot size={20} className="text-[#00C97A]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white">
            3 Earning Paths na Tinuro
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { title: "Freelance Writing", income: "₱10K–₱30K/mo", timeline: "6–18 months", source: "OKGames, 2026" },
            { title: "VA Work", income: "₱8K–₱28K/mo", timeline: "Immediate start", source: "Wise.com, 2026" },
            { title: "Digital Products", income: "₱990–₱19.8K/mo", timeline: "Depends on volume", source: "Industry data" },
          ].map((path) => (
            <div key={path.title} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5">
              <h3 className="font-sans text-[16px] font-bold text-white mb-2">{path.title}</h3>
              <p className="font-[family-name:var(--font-inter)] text-[20px] font-bold text-[#00C97A] mb-1">{path.income}</p>
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/55">{path.timeline}</p>
              <p className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 mt-2">Source: {path.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Who This Is For */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Shield size={20} className="text-[#FFD23F]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white">
            Para Kanino Ito?
          </h2>
        </div>
        <ul className="space-y-2">
          {[
            "Filipinos na bago sa AI tools — o gumagamit na pero hindi sure kung tama ang ginagawa",
            "Gusto kumita ng extra income online — freelancing, VA work, o digital products",
            "Nag-try na matuto pero sobrang technical o US-focused yung mga guides",
            "Gusto malaman ang totoo — hindi sales pitch",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-[#FFD23F] mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* What's included comparison */}
      <div>
        <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white mb-6">
          What You Get for ₱99
        </h2>
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] overflow-hidden">
          <div className="grid grid-cols-[1fr_80px] md:grid-cols-[1fr_120px] gap-0 px-6 py-4 border-b border-white/[0.1]">
            <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/35 uppercase tracking-[0.1em]">
              Included
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#3B82F6]/60 uppercase tracking-[0.1em] text-center">
              ₱99
            </span>
          </div>
          {COMPARISON.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_80px] md:grid-cols-[1fr_120px] gap-0 px-6 py-3.5 ${i < COMPARISON.length - 1 ? "border-b border-white/[0.06]" : ""}`}
            >
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">
                {row.feature}
              </span>
              <span className="flex justify-center">
                {row.paid ? (
                  <CheckCircle2 size={16} className="text-[#3B82F6]" strokeWidth={2.5} />
                ) : (
                  <Minus size={16} className="text-white/20" strokeWidth={2} />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#3B82F6]/10 via-[#18181F] to-[#18181F] border border-[#3B82F6]/25 rounded-[16px] p-8 md:p-10 text-center">
        <h2 className="font-sans text-[24px] md:text-[30px] font-bold text-white mb-3">
          Simulan mo na.
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 mb-8 max-w-md mx-auto leading-[1.7]">
          20 pages. 10 prompts. 3 earning paths. Mas mura pa sa isang Grab Food order.
        </p>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="bg-[#3B82F6] text-white font-[family-name:var(--font-inter)] text-[16px] font-extrabold px-10 py-4 rounded-[10px] hover:opacity-90 transition-all inline-flex items-center gap-2.5 min-h-[56px] shadow-lg shadow-[#3B82F6]/20 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <ShoppingCart size={20} strokeWidth={2.5} />
          )}
          {loading ? "Processing..." : "Bilhin — ₱99"}
        </button>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-4">
          Instant download · 20 pages · PayMongo / GCash / Maya accepted
        </p>
      </div>
    </div>
  );
}
