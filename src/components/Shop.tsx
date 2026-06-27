"use client";

import { useState } from "react";
import {
  Rocket,
  Bot,
  FileText,
  Download,
  ShoppingCart,
  ArrowRight,
  Bell,
  CheckCircle2,
  Star,
  Zap,
  BookOpen,
  Loader2,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";
import { track } from "@vercel/analytics";
import { PRODUCTS } from "@/data/products";

const ICON_MAP: Record<string, LucideIcon> = {
  Rocket,
  Bot,
  FileText,
};

export default function Shop() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [refInput, setRefInput] = useState("");
  const [disputeState, setDisputeState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [disputeMsg, setDisputeMsg] = useState("");
  const [disputeUrl, setDisputeUrl] = useState("");

  async function handleDispute() {
    if (!refInput.trim()) return;
    setDisputeState("loading");
    try {
      const res = await fetch("/api/dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referenceId: refInput.trim() }),
      });
      const data = await res.json();
      if (data.downloadUrl) {
        setDisputeState("success");
        setDisputeMsg(data.productTitle);
        setDisputeUrl(data.downloadUrl);
      } else {
        setDisputeState("error");
        setDisputeMsg(data.error || "Something went wrong.");
      }
    } catch {
      setDisputeState("error");
      setDisputeMsg("Something went wrong. Please try again.");
    }
  }

  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const status = params?.get("status") as string | null;

  async function handleBuy(productId: string) {
    setLoadingId(productId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        track("shop_checkout", { product: productId });
        window.location.href = data.checkoutUrl;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoadingId(null);
    }
  }
  const featured = PRODUCTS[0];
  const FeaturedIcon = ICON_MAP[featured.coverIcon];
  const paid = PRODUCTS.find((p) => p.id === "freelancer-starter-kit-complete")!;
  const PaidIcon = ICON_MAP[paid.coverIcon];
  const aiGuide = PRODUCTS.find((p) => p.id === "chatgpt-claude-for-filipinos")!;
  const AiGuideIcon = ICON_MAP[aiGuide.coverIcon];
  const rest = PRODUCTS.filter((p) => p.id !== featured.id && p.id !== paid.id && p.id !== aiGuide.id);

  return (
    <div className="space-y-16">
      {status === "cancelled" && (
        <div className="bg-[#E8373A]/10 border border-[#E8373A]/25 rounded-[10px] p-5 flex items-center gap-3">
          <Bell size={20} className="text-[#E8373A] shrink-0" />
          <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80">
            Payment was cancelled. No charges were made.
          </span>
        </div>
      )}

      {/* ── Featured Product (Hero Card) ── */}
      <div className="relative bg-gradient-to-br from-[#00C97A]/10 via-[#18181F] to-[#18181F] border border-[#00C97A]/25 rounded-[16px] overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00C97A]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Cover */}
          <div className="relative flex items-center justify-center py-16 md:py-20 border-b md:border-b-0 md:border-r border-white/[0.07]" style={{ backgroundColor: featured.coverBg }}>
            <div className="relative">
              <div className="w-[180px] h-[240px] md:w-[200px] md:h-[270px] bg-gradient-to-br from-[#00C97A]/20 to-[#00C97A]/5 border border-[#00C97A]/30 rounded-[8px] flex flex-col items-center justify-center shadow-2xl shadow-[#00C97A]/10"
                style={{ transform: "perspective(800px) rotateY(-5deg)" }}>
                <FeaturedIcon size={48} color="#00C97A" strokeWidth={1.2} />
                <span className="font-sans text-[16px] md:text-[18px] font-bold text-white text-center mt-4 px-4 leading-tight">
                  {featured.title}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/55 mt-2 uppercase tracking-[0.1em]">
                  Cyberussell
                </span>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[11px] font-extrabold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">
              Free Download
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-white leading-tight mb-3">
              {featured.title}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">
              {featured.description}
            </p>

            {/* What's inside */}
            <ul className="space-y-3 mb-8">
              {(featured.highlights ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00C97A] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* Price + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href={featured.file ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={(e) => {
                  if (featured.file) {
                    e.preventDefault();
                    track("shop_download", { product: featured.id });
                    if (typeof window !== "undefined" && window.gtag) {
                      window.gtag("event", "shop_download", {
                        product_name: featured.title,
                        event_callback: () => { window.open(featured.file, "_blank"); },
                      });
                    } else {
                      window.open(featured.file, "_blank");
                    }
                  }
                }}
                className="bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[15px] font-extrabold px-8 py-4 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 min-h-[52px] min-w-[260px] shadow-lg shadow-[#00C97A]/20"
              >
                <Download size={18} strokeWidth={2.5} />
                Download Free PDF
              </a>
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/35">
                No email required · Instant download
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Paid Product (Complete Edition) ── */}
      <div className="relative bg-gradient-to-br from-[#FFD23F]/10 via-[#18181F] to-[#18181F] border border-[#FFD23F]/25 rounded-[16px] overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FFD23F]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Cover */}
          <div className="relative flex items-center justify-center py-16 md:py-20 border-b md:border-b-0 md:border-r border-white/[0.07]" style={{ backgroundColor: paid.coverBg }}>
            <div className="relative">
              <div className="w-[180px] h-[240px] md:w-[200px] md:h-[270px] bg-gradient-to-br from-[#FFD23F]/20 to-[#FFD23F]/5 border border-[#FFD23F]/30 rounded-[8px] flex flex-col items-center justify-center shadow-2xl shadow-[#FFD23F]/10"
                style={{ transform: "perspective(800px) rotateY(-5deg)" }}>
                <PaidIcon size={48} color="#FFD23F" strokeWidth={1.2} />
                <span className="font-sans text-[16px] md:text-[18px] font-bold text-white text-center mt-4 px-4 leading-tight">
                  {paid.title}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/55 mt-2 uppercase tracking-[0.1em]">
                  Cyberussell
                </span>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[11px] font-extrabold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">
              {paid.priceLabel}
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F]/70 uppercase tracking-[0.15em] mb-2">
              {paid.tag}
            </span>
            <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-white leading-tight mb-3">
              {paid.title}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">
              {paid.description}
            </p>

            <ul className="space-y-3 mb-8">
              {(paid.highlights ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FFD23F] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/shop/freelancer-kit"
                className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[15px] font-extrabold px-8 py-4 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 min-h-[52px] min-w-[260px] shadow-lg shadow-[#FFD23F]/20"
              >
                Click to see details
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/35">
                Instant download · 11 files · PayMongo / GCash / Maya accepted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Guide (ChatGPT & Claude) ── */}
      <div className="relative bg-gradient-to-br from-[#3B82F6]/10 via-[#18181F] to-[#18181F] border border-[#3B82F6]/25 rounded-[16px] overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <div className="relative flex items-center justify-center py-16 md:py-20 border-b md:border-b-0 md:border-r border-white/[0.07]" style={{ backgroundColor: aiGuide.coverBg }}>
            <div className="relative">
              <div className="w-[180px] h-[240px] md:w-[200px] md:h-[270px] bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/5 border border-[#3B82F6]/30 rounded-[8px] flex flex-col items-center justify-center shadow-2xl shadow-[#3B82F6]/10"
                style={{ transform: "perspective(800px) rotateY(-5deg)" }}>
                <AiGuideIcon size={48} color="#3B82F6" strokeWidth={1.2} />
                <span className="font-sans text-[16px] md:text-[18px] font-bold text-white text-center mt-4 px-4 leading-tight">
                  {aiGuide.title}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/55 mt-2 uppercase tracking-[0.1em]">
                  Cyberussell
                </span>
              </div>
            </div>
            <div className="absolute top-4 left-4 bg-[#3B82F6] text-white font-[family-name:var(--font-inter)] text-[11px] font-extrabold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">
              {aiGuide.priceLabel}
            </div>
          </div>

          <div className="p-8 md:p-10 flex flex-col justify-center">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#3B82F6]/70 uppercase tracking-[0.15em] mb-2">
              {aiGuide.tag}
            </span>
            <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-white leading-tight mb-3">
              {aiGuide.title}
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">
              {aiGuide.description}
            </p>

            <ul className="space-y-3 mb-8">
              {(aiGuide.highlights ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#3B82F6] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="/shop/chatgpt-claude"
                className="bg-[#3B82F6] text-white font-[family-name:var(--font-inter)] text-[15px] font-extrabold px-8 py-4 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 min-h-[52px] min-w-[260px] shadow-lg shadow-[#3B82F6]/20"
              >
                Click to see details
                <ArrowRight size={18} strokeWidth={2.5} />
              </a>
              <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/35">
                Instant download · 20 pages · PayMongo / GCash / Maya accepted
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Coming Soon Section ── */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Zap size={18} className="text-[#E8373A]" strokeWidth={2.5} />
          <h3 className="font-sans text-[20px] md:text-[24px] font-bold text-white">
            Trending — Premium Guides
          </h3>
        </div>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-6">
          Based on what Filipino online workers are searching for right now.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((product) => {
            const Icon = ICON_MAP[product.coverIcon];
            return (
              <div
                key={product.id}
                className="bg-[#18181F] border border-white/[0.08] rounded-[14px] overflow-hidden flex flex-col h-full opacity-70"
              >
                {/* Mini cover */}
                <div className="flex items-center gap-5 p-6 border-b border-white/[0.06]">
                  <div
                    className="w-[72px] h-[96px] shrink-0 rounded-[6px] flex items-center justify-center border grayscale"
                    style={{
                      backgroundColor: product.coverBg,
                      borderColor: `${product.coverColor}30`,
                    }}
                  >
                    <Icon size={28} color={product.coverColor} strokeWidth={1.4} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className="inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.1em] uppercase px-2 py-0.5 rounded mb-2"
                      style={{
                        color: product.tagColor,
                        backgroundColor: `${product.tagColor}15`,
                      }}
                    >
                      {product.tag}
                    </span>
                    <h4 className="font-sans text-[17px] font-bold text-white leading-tight">
                      {product.title}
                    </h4>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex flex-col flex-grow">
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-5 flex-grow">
                    {product.description}
                  </p>
                  {product.active && product.price > 0 ? (
                    <button
                      onClick={() => handleBuy(product.id)}
                      disabled={loadingId === product.id}
                      className="w-full bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F] font-[family-name:var(--font-inter)] text-[13px] font-bold py-3 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#FFD23F]/20 transition-colors"
                    >
                      {loadingId === product.id ? (
                        <Loader2 size={14} strokeWidth={2.5} className="animate-spin" />
                      ) : (
                        <ShoppingCart size={14} strokeWidth={2.5} />
                      )}
                      {loadingId === product.id ? "Processing..." : `Buy Now — ${product.priceLabel}`}
                    </button>
                  ) : (
                    <button
                      className="w-full bg-white/5 border border-white/10 text-white/55 font-[family-name:var(--font-inter)] text-[13px] font-bold py-3 rounded-[8px] flex items-center justify-center gap-2 cursor-not-allowed"
                      disabled
                    >
                      <Bell size={14} strokeWidth={2.5} />
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Already Paid? ── */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <HelpCircle size={18} className="text-white/65" strokeWidth={2.5} />
          <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-white">
            Already paid but didn&apos;t get your download?
          </h3>
        </div>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-5">
          Enter your PayMongo reference number and we&apos;ll generate a new download link for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={refInput}
            onChange={(e) => {
              setRefInput(e.target.value);
              if (disputeState !== "idle") setDisputeState("idle");
            }}
            placeholder="e.g. cs_xxxxx or reference number"
            className="flex-1 bg-[#0F0F1A] border border-white/10 rounded-[8px] px-4 py-3 font-[family-name:var(--font-inter)] text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#FFD23F]/40 transition-colors"
          />
          <button
            onClick={handleDispute}
            disabled={disputeState === "loading" || !refInput.trim()}
            className="bg-white/10 border border-white/15 text-white font-[family-name:var(--font-inter)] text-[13px] font-bold px-6 py-3 rounded-[8px] hover:bg-white/15 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {disputeState === "loading" ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              "Get Download Link"
            )}
          </button>
        </div>

        {disputeState === "success" && (
          <div className="mt-4 bg-[#00C97A]/10 border border-[#00C97A]/25 rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <CheckCircle2 size={18} className="text-[#00C97A] shrink-0" />
            <div className="flex-1">
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80">
                Found it! <span className="font-bold text-[#FFD23F]">{disputeMsg}</span>
              </span>
            </div>
            <a
              href={disputeUrl}
              className="bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[12px] font-extrabold px-4 py-2 rounded-[6px] hover:opacity-90 transition-all flex items-center gap-1.5 shrink-0"
            >
              <Download size={14} strokeWidth={2.5} />
              Download
            </a>
          </div>
        )}

        {disputeState === "error" && (
          <div className="mt-4 bg-[#E8373A]/10 border border-[#E8373A]/25 rounded-[8px] p-4 flex items-start gap-3">
            <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">
              {disputeMsg}
            </span>
          </div>
        )}

        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 mt-4">
          Can&apos;t find your reference? Check your GCash/Maya/bank app for the transaction details, or{" "}
          <a href="/contact" className="text-[#E8373A] hover:underline">contact us</a>.
        </p>
      </div>
    </div>
  );
}
