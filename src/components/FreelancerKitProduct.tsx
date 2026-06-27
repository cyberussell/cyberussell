"use client";

import { useState } from "react";
import {
  CheckCircle2,
  ShoppingCart,
  Loader2,
  Rocket,
  FileText,
  Shield,
  Clock,
  ArrowLeft,
  Minus,
} from "lucide-react";
import { track } from "@vercel/analytics";

const FILES = [
  { num: "01", name: "Quick Start Guide — ang complete guide ng freelancing" },
  { num: "02", name: "Platform Setup Checklists — OnlineJobs.ph, Fiverr, Upwork, FB Groups" },
  { num: "03", name: "5 Client Proposal Templates — copy and customize" },
  { num: "04", name: "Scam Protection Checklist — 10 red flags na dapat malaman" },
  { num: "05", name: "30-Day Action Plan — 1 oras sa kada-araw" },
  { num: "06", name: "Invoice Template — professional, export as PDF" },
  { num: "07", name: "Freelance Contract Template — plain English, protects you" },
  { num: "08", name: "Income & Expense Tracker (Google Sheets)" },
  { num: "09", name: "Job Application Tracker (Google Sheets)" },
  { num: "10", name: '"What to Say" Cheat Sheets — 10 real situations' },
  { num: "11", name: "Resource Directory — lahat ng free Cyberussell tools" },
];

const COMPARISON = [
  { feature: "Quick checklist", free: true, paid: true },
  { feature: "30-day action plan", free: false, paid: true },
  { feature: "Proposal templates", free: false, paid: "5 templates" },
  { feature: "Invoice + contract", free: false, paid: true },
  { feature: "Income + job trackers", free: false, paid: true },
  { feature: '"What to Say" cheat sheets', free: false, paid: true },
  { feature: "Scam checklist", free: false, paid: true },
  { feature: "Platform setup checklists", free: false, paid: true },
];

export default function FreelancerKitProduct() {
  const [loading, setLoading] = useState(false);

  async function handleBuy() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: "freelancer-starter-kit-complete" }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        track("shop_checkout", { product: "freelancer-starter-kit-complete" });
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
      {/* Back link */}
      <a
        href="/shop"
        className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/55 hover:text-white transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Shop
      </a>

      {/* Hero */}
      <div>
        <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F]/70 uppercase tracking-[0.15em] mb-3 block">
          Freelancer Starter Kit · Cyberussell
        </span>
        <h1 className="font-sans text-[28px] md:text-[40px] font-bold text-white leading-tight mb-4">
          Freelancer Starter Kit — Complete Edition
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-white/70 leading-[1.8] max-w-2xl">
          11 ready-to-use files para sa mga Filipino beginners na gustong kumita online — mula sa pag-setup ng device at internet, hanggang sa pagkuha ng unang client at unang kita. Lahat ng kailangan mo, nasa iisang download.
        </p>
      </div>

      {/* What's Inside */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <FileText size={20} className="text-[#FFD23F]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white">
            What&apos;s Inside
          </h2>
        </div>
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] overflow-hidden">
          {FILES.map((file, i) => (
            <div
              key={file.num}
              className={`flex items-start gap-4 px-6 py-4 ${i < FILES.length - 1 ? "border-b border-white/[0.06]" : ""}`}
            >
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#FFD23F] mt-0.5 shrink-0 w-[28px]">
                {file.num}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[14px] md:text-[15px] text-white/70 leading-[1.6]">
                {file.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Who This Is For */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Rocket size={20} className="text-[#00C97A]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white">
            Who This Is For
          </h2>
        </div>
        <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/70 leading-[1.8] max-w-2xl">
          Basta marunong kang mag-Facebook at alam mo ang Chrome — kahit wala kang online experience, ang guide na ito ay ginawa para mas madaling maintindihan. Para ito sa mga shifters or yung gusto talagang mag work sa bahay lang gamit ang internet.
        </p>
      </div>

      {/* Honest Disclaimer */}
      <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[14px] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <Shield size={20} className="text-[#E8373A]" strokeWidth={2} />
          <h2 className="font-sans text-[20px] md:text-[22px] font-bold text-white">
            Honest Disclaimer
          </h2>
        </div>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
          Malamang ₱0–₱3,000 lang ang kikitain mo sa unang buwan at normal naman talaga &apos;yon. Lahat ng successful na Filipino freelancer ay dumaan sa ganoon. Need mo ng tiyaga. Kung wala ka non, hindi ito para sa iyo. Pero kung gusto mo? Mas mura pa ito sa Jollibee. At kapag natutunan mo &apos;to? Maraming Jollibee meals para sa &apos;yo at sa pamilya mo!
        </p>
      </div>

      {/* Free vs Paid Comparison */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Clock size={20} className="text-[#3B82F6]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] md:text-[26px] font-bold text-white">
            Free vs Complete Edition
          </h2>
        </div>
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_120px_120px] gap-0 px-6 py-4 border-b border-white/[0.1]">
            <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/35 uppercase tracking-[0.1em]">
              Feature
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/35 uppercase tracking-[0.1em] text-center">
              Free
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#FFD23F]/60 uppercase tracking-[0.1em] text-center">
              Complete
            </span>
          </div>
          {/* Rows */}
          {COMPARISON.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_80px_80px] md:grid-cols-[1fr_120px_120px] gap-0 px-6 py-3.5 ${i < COMPARISON.length - 1 ? "border-b border-white/[0.06]" : ""}`}
            >
              <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">
                {row.feature}
              </span>
              <span className="flex justify-center">
                {row.free ? (
                  <CheckCircle2 size={16} className="text-[#00C97A]" strokeWidth={2.5} />
                ) : (
                  <Minus size={16} className="text-white/20" strokeWidth={2} />
                )}
              </span>
              <span className="flex justify-center">
                {typeof row.paid === "string" ? (
                  <span className="font-[family-name:var(--font-inter)] text-[12px] text-[#FFD23F] font-bold">
                    {row.paid}
                  </span>
                ) : (
                  <CheckCircle2 size={16} className="text-[#FFD23F]" strokeWidth={2.5} />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-[#FFD23F]/10 via-[#18181F] to-[#18181F] border border-[#FFD23F]/25 rounded-[16px] p-8 md:p-10 text-center">
        <h2 className="font-sans text-[24px] md:text-[30px] font-bold text-white mb-3">
          Ready ka na ba?
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 mb-8 max-w-md mx-auto leading-[1.7]">
          11 files. Lahat ng kailangan mo para magsimula. Mas mura pa sa isang Jollibee Family Meal.
        </p>
        <button
          onClick={handleBuy}
          disabled={loading}
          className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[16px] font-extrabold px-10 py-4 rounded-[10px] hover:opacity-90 transition-all inline-flex items-center gap-2.5 min-h-[56px] shadow-lg shadow-[#FFD23F]/20 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <ShoppingCart size={20} strokeWidth={2.5} />
          )}
          {loading ? "Processing..." : "Bilhin ito sa halagang— ₱199"}
        </button>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-4">
          Instant download · 11 files · PayMongo / GCash / Maya accepted
        </p>
      </div>
    </div>
  );
}
