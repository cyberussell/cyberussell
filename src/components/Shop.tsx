"use client";

import { useState, useRef } from "react";
import {
  Rocket,
  Bot,
  FileText,
  Download,
  ShoppingCart,
  ArrowRight,
  Bell,
  CheckCircle2,
  Zap,
  BookOpen,
  Loader2,
  HelpCircle,
  ChevronDown,
  Shield,
  Users,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { track } from "@vercel/analytics";
import { PRODUCTS } from "@/data/products";

const ICON_MAP: Record<string, LucideIcon> = { Rocket, Bot, FileText };


const TRUST_POINTS = [
  { icon: BookOpen, title: "Research-Backed", desc: "Real data from PSA, DOLE, and verified sources." },
  { icon: Users, title: "Built for Filipinos", desc: "Taglish. PH platforms. Local payment methods." },
  { icon: Zap, title: "Instant Download", desc: "GCash, Maya, or bank — files in seconds." },
  { icon: RefreshCw, title: "Lifetime Updates", desc: "Updated guide? You get it free. No repurchase." },
  { icon: Shield, title: "No Subscriptions", desc: "One-time payment. Lifetime access. No hidden fees." },
];


const SHOP_FAQS = [
  { q: "Paano ko mada-download ang ebook?", a: "After payment via GCash, Maya, or bank transfer through PayMongo, you'll get an instant download link. The file is yours forever — no expiry, no DRM." },
  { q: "May refund ba?", a: "Dahil digital product ito at instant download, hindi po kami nag-o-offer ng refund. Pero kung may issue sa download, contact us and we'll fix it right away." },
  { q: "Puwede ba sa phone i-read?", a: "Oo! All our ebooks are in PDF format — readable on any phone, tablet, or computer. No special app needed." },
  { q: "Ano ang difference ng Free vs Complete Edition?", a: "The Free Starter Kit is a checklist to get you started. The Complete Edition has 11 files — action plans, templates, contracts, and everything you need to land your first client." },
  { q: "Safe ba ang payment?", a: "Yes. We use PayMongo, the same payment processor used by major Philippine businesses. We never see your card or GCash details." },
];

export default function Shop() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [refInput, setRefInput] = useState("");
  const [disputeState, setDisputeState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [disputeMsg, setDisputeMsg] = useState("");
  const [disputeUrl, setDisputeUrl] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const lastSubmit = useRef(0);

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

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    const now = Date.now();
    if (now - lastSubmit.current < 30_000) return;
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim())) return;
    lastSubmit.current = now;
    setEmailStatus("loading");
    try {
      const params = new URLSearchParams({ name: "", email });
      await fetch(
        `https://script.google.com/macros/s/AKfycbwsbD7W3ZYIte7UHvzvkWfNQ4pZ1QwVB5alvt3ok3u7lYVz1pyUtDiTTIcKI9Ebfp05/exec?${params.toString()}`,
        { method: "GET", mode: "no-cors" }
      );
      setEmailStatus("success");
      setEmail("");
    } catch {
      setEmailStatus("error");
    }
  }

  const params = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const status = params?.get("status") as string | null;

  const featured = PRODUCTS[0];
  const FeaturedIcon = ICON_MAP[featured.coverIcon];
  const paid = PRODUCTS.find((p) => p.id === "freelancer-starter-kit-complete")!;
  const PaidIcon = ICON_MAP[paid.coverIcon];
  const aiGuide = PRODUCTS.find((p) => p.id === "chatgpt-claude-for-filipinos")!;
  const AiGuideIcon = ICON_MAP[aiGuide.coverIcon];
  const rest = PRODUCTS.filter((p) => p.id !== featured.id && p.id !== paid.id && p.id !== aiGuide.id);

  return (
    <div className="space-y-20">
      {status === "cancelled" && (
        <div className="bg-[#E8373A]/10 border border-[#E8373A]/25 rounded-[10px] p-5 flex items-center gap-3">
          <Bell size={20} className="text-[#E8373A] shrink-0" />
          <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80">
            Payment was cancelled. No charges were made.
          </span>
        </div>
      )}

      {/* ═══ BENTO GRID — Desktop only ═══ */}
      <div className="hidden lg:grid grid-cols-12 gap-4" style={{ gridAutoRows: "min-content" }}>

        {/* Free Kit — large left tile spanning 2 rows */}
        <div className="col-span-7 row-span-2 relative bg-gradient-to-br from-[#00C97A]/10 via-[#18181F] to-[#18181F] border border-[#00C97A]/20 rounded-[16px] overflow-hidden group">
          <div className="absolute top-0 right-0 w-[280px] h-[280px] bg-[#00C97A]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="relative flex items-center justify-center py-14 border-b border-white/[0.06]" style={{ backgroundColor: featured.coverBg }}>
            <div className="w-[170px] h-[230px] bg-gradient-to-br from-[#00C97A]/20 to-[#00C97A]/5 border border-[#00C97A]/30 rounded-[8px] flex flex-col items-center justify-center shadow-2xl shadow-[#00C97A]/10 group-hover:scale-[1.03] transition-transform duration-500"
              style={{ transform: "perspective(800px) rotateY(-5deg)" }}>
              <FeaturedIcon size={44} color="#00C97A" strokeWidth={1.2} />
              <span className="font-sans text-[17px] font-bold text-white text-center mt-3 px-4 leading-tight">
                {featured.title}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/50 mt-2 uppercase tracking-[0.1em]">Cyberussell</span>
            </div>
            <div className="absolute top-4 left-4 bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[11px] font-extrabold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">
              Free Download
            </div>
          </div>
          <div className="p-7">
            <h2 className="font-sans text-[26px] font-bold text-white leading-tight mb-2">{featured.title}</h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7] mb-5">{featured.description}</p>
            <ul className="space-y-2 mb-6">
              {(featured.highlights ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 size={14} className="text-[#00C97A] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-[1.5]">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4">
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
                className="bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[14px] font-extrabold px-7 py-3.5 rounded-[10px] hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-[#00C97A]/20"
              >
                <Download size={16} strokeWidth={2.5} />
                Download Free PDF
              </a>
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">No email required</span>
            </div>
          </div>
        </div>

        {/* Complete Edition — top right compact card */}
        <div className="col-span-5 relative bg-gradient-to-br from-[#FFD23F]/8 via-[#18181F] to-[#18181F] border border-[#FFD23F]/20 rounded-[16px] overflow-hidden group hover:border-[#FFD23F]/40 transition-colors">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#FFD23F]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="p-6 relative flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-[72px] h-[96px] shrink-0 bg-gradient-to-br from-[#FFD23F]/20 to-[#FFD23F]/5 border border-[#FFD23F]/30 rounded-[6px] flex flex-col items-center justify-center shadow-lg shadow-[#FFD23F]/10">
                <PaidIcon size={28} color="#FFD23F" strokeWidth={1.2} />
                <span className="font-[family-name:var(--font-inter)] text-[8px] text-white/50 mt-1 uppercase tracking-[0.1em]">Cyberussell</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[10px] font-extrabold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full">{paid.priceLabel}</span>
                  <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F]/60 uppercase tracking-[0.15em]">11 files</span>
                </div>
                <h3 className="font-sans text-[19px] font-bold text-white leading-tight">{paid.title}</h3>
              </div>
            </div>
            <ul className="space-y-3 mb-6 flex-1">
              {(paid.highlights ?? []).slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#FFD23F] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
            <a href="/shop/freelancer-kit" className="w-full bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[14px] font-extrabold py-3.5 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FFD23F]/20">
              See Details <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>

        {/* AI Guide — bottom right compact card */}
        <div className="col-span-5 relative bg-gradient-to-br from-[#3B82F6]/8 via-[#18181F] to-[#18181F] border border-[#3B82F6]/20 rounded-[16px] overflow-hidden group hover:border-[#3B82F6]/40 transition-colors">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[#3B82F6]/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="p-6 relative flex flex-col h-full">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-[72px] h-[96px] shrink-0 bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/5 border border-[#3B82F6]/30 rounded-[6px] flex flex-col items-center justify-center shadow-lg shadow-[#3B82F6]/10">
                <AiGuideIcon size={28} color="#3B82F6" strokeWidth={1.2} />
                <span className="font-[family-name:var(--font-inter)] text-[8px] text-white/50 mt-1 uppercase tracking-[0.1em]">Cyberussell</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-[#3B82F6] text-white font-[family-name:var(--font-inter)] text-[10px] font-extrabold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full">{aiGuide.priceLabel}</span>
                  <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#3B82F6]/60 uppercase tracking-[0.15em]">{aiGuide.tag}</span>
                </div>
                <h3 className="font-sans text-[19px] font-bold text-white leading-tight">{aiGuide.title}</h3>
              </div>
            </div>
            <ul className="space-y-3 mb-6 flex-1">
              {(aiGuide.highlights ?? []).slice(0, 3).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={14} className="text-[#3B82F6] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
            <a href="/shop/chatgpt-claude" className="w-full bg-[#3B82F6] text-white font-[family-name:var(--font-inter)] text-[14px] font-extrabold py-3.5 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3B82F6]/20">
              See Details <ArrowRight size={14} strokeWidth={2.5} />
            </a>
          </div>
        </div>
      </div>

      {/* ═══ MOBILE — stacked cards ═══ */}
      <div className="lg:hidden space-y-10">
        {/* Free Product */}
        <div className="relative bg-gradient-to-br from-[#00C97A]/10 via-[#18181F] to-[#18181F] border border-[#00C97A]/25 rounded-[16px] overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#00C97A]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative flex items-center justify-center py-16 border-b border-white/[0.07]" style={{ backgroundColor: featured.coverBg }}>
            <div className="w-[180px] h-[240px] bg-gradient-to-br from-[#00C97A]/20 to-[#00C97A]/5 border border-[#00C97A]/30 rounded-[8px] flex flex-col items-center justify-center shadow-2xl shadow-[#00C97A]/10"
              style={{ transform: "perspective(800px) rotateY(-5deg)" }}>
              <FeaturedIcon size={48} color="#00C97A" strokeWidth={1.2} />
              <span className="font-sans text-[16px] font-bold text-white text-center mt-4 px-4 leading-tight">{featured.title}</span>
              <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/55 mt-2 uppercase tracking-[0.1em]">Cyberussell</span>
            </div>
            <div className="absolute top-4 left-4 bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[11px] font-extrabold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">Free Download</div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h2 className="font-sans text-[24px] font-bold text-white leading-tight mb-3">{featured.title}</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">{featured.description}</p>
            <ul className="space-y-3 mb-8">
              {(featured.highlights ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#00C97A] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
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
                    window.gtag("event", "shop_download", { product_name: featured.title, event_callback: () => { window.open(featured.file, "_blank"); } });
                  } else { window.open(featured.file, "_blank"); }
                }
              }}
              className="bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[15px] font-extrabold px-8 py-4 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 min-h-[52px] shadow-lg shadow-[#00C97A]/20"
            >
              <Download size={18} strokeWidth={2.5} />
              Download Free PDF
            </a>
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-3">No email required · Instant download</span>
          </div>
        </div>

        {/* Paid Complete Edition */}
        <div className="relative bg-gradient-to-br from-[#FFD23F]/10 via-[#18181F] to-[#18181F] border border-[#FFD23F]/25 rounded-[16px] overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#FFD23F]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative flex items-center justify-center py-16 border-b border-white/[0.07]" style={{ backgroundColor: paid.coverBg }}>
            <div className="w-[180px] h-[240px] bg-gradient-to-br from-[#FFD23F]/20 to-[#FFD23F]/5 border border-[#FFD23F]/30 rounded-[8px] flex flex-col items-center justify-center shadow-2xl shadow-[#FFD23F]/10"
              style={{ transform: "perspective(800px) rotateY(-5deg)" }}>
              <PaidIcon size={48} color="#FFD23F" strokeWidth={1.2} />
              <span className="font-sans text-[16px] font-bold text-white text-center mt-4 px-4 leading-tight">{paid.title}</span>
              <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/55 mt-2 uppercase tracking-[0.1em]">Cyberussell</span>
            </div>
            <div className="absolute top-4 left-4 bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[11px] font-extrabold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">{paid.priceLabel}</div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F]/70 uppercase tracking-[0.15em] mb-2">{paid.tag}</span>
            <h2 className="font-sans text-[24px] font-bold text-white leading-tight mb-3">{paid.title}</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">{paid.description}</p>
            <ul className="space-y-3 mb-8">
              {(paid.highlights ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#FFD23F] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
            <a href="/shop/freelancer-kit" className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[15px] font-extrabold px-8 py-4 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 min-h-[52px] shadow-lg shadow-[#FFD23F]/20">
              Click to see details <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-3">Instant download · 11 files · PayMongo / GCash / Maya</span>
          </div>
        </div>

        {/* AI Guide */}
        <div className="relative bg-gradient-to-br from-[#3B82F6]/10 via-[#18181F] to-[#18181F] border border-[#3B82F6]/25 rounded-[16px] overflow-hidden">
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#3B82F6]/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="relative flex items-center justify-center py-16 border-b border-white/[0.07]" style={{ backgroundColor: aiGuide.coverBg }}>
            <div className="w-[180px] h-[240px] bg-gradient-to-br from-[#3B82F6]/20 to-[#3B82F6]/5 border border-[#3B82F6]/30 rounded-[8px] flex flex-col items-center justify-center shadow-2xl shadow-[#3B82F6]/10"
              style={{ transform: "perspective(800px) rotateY(-5deg)" }}>
              <AiGuideIcon size={48} color="#3B82F6" strokeWidth={1.2} />
              <span className="font-sans text-[16px] font-bold text-white text-center mt-4 px-4 leading-tight">{aiGuide.title}</span>
              <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/55 mt-2 uppercase tracking-[0.1em]">Cyberussell</span>
            </div>
            <div className="absolute top-4 left-4 bg-[#3B82F6] text-white font-[family-name:var(--font-inter)] text-[11px] font-extrabold uppercase tracking-[0.1em] px-3 py-1.5 rounded-full">{aiGuide.priceLabel}</div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#3B82F6]/70 uppercase tracking-[0.15em] mb-2">{aiGuide.tag}</span>
            <h2 className="font-sans text-[24px] font-bold text-white leading-tight mb-3">{aiGuide.title}</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-6">{aiGuide.description}</p>
            <ul className="space-y-3 mb-8">
              {(aiGuide.highlights ?? []).map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-[#3B82F6] mt-0.5 shrink-0" strokeWidth={2.5} />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
            <a href="/shop/chatgpt-claude" className="bg-[#3B82F6] text-white font-[family-name:var(--font-inter)] text-[15px] font-extrabold px-8 py-4 rounded-[10px] hover:opacity-90 transition-all flex items-center justify-center gap-2 min-h-[52px] shadow-lg shadow-[#3B82F6]/20">
              Click to see details <ArrowRight size={18} strokeWidth={2.5} />
            </a>
            <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-3">Instant download · 20 pages · PayMongo / GCash / Maya</span>
          </div>
        </div>
      </div>


      {/* ═══ LEARNING PATH ═══ */}
      <div>
        <div className="mb-8">
          <h3 className="font-sans text-[20px] md:text-[24px] font-bold text-white mb-2">Learning Path</h3>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">Follow the roadmap — from zero to earning.</p>
        </div>
        <div className="relative bg-[#18181F] border border-white/[0.08] rounded-[16px] p-6 md:p-10">
          {/* Desktop: horizontal tracker with text below each node */}
          <div className="hidden md:block">
            {(() => {
              const steps = [
                { title: featured.title, desc: "Learn what to prepare and where to sign up.", price: "Free", color: "#00C97A", href: featured.file, isDownload: true },
                { title: paid.title, desc: "Templates, action plans, and contracts for your first client.", price: paid.priceLabel, color: "#FFD23F", href: "/shop/freelancer-kit" },
                { title: aiGuide.title, desc: "Use AI to 10x your output and earn more per hour.", price: aiGuide.priceLabel, color: "#3B82F6", href: "/shop/chatgpt-claude" },
              ];
              return (
                <div className="relative">
                  {/* Track line behind nodes */}
                  <div className="absolute top-7 left-[calc(16.67%)] right-[calc(16.67%)] h-[4px] bg-white/[0.06] rounded-full" />
                  <div className="absolute top-7 left-[calc(16.67%)] right-[calc(16.67%)] h-[4px] rounded-full bg-gradient-to-r from-[#00C97A] via-[#FFD23F] to-[#3B82F6]" />

                  {/* Nodes + text as unified columns */}
                  <div className="relative z-10 grid grid-cols-3 gap-4">
                    {steps.map((step, i) => (
                      <a
                        key={i}
                        href={step.href}
                        {...(step.isDownload ? { target: "_blank", rel: "noopener noreferrer", download: true } : {})}
                        className="flex flex-col items-center text-center group"
                      >
                        <div
                          className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 mb-4"
                          style={{ backgroundColor: step.color, boxShadow: `0 0 20px ${step.color}40` }}
                        >
                          {i === 0 && <Rocket size={22} className="text-[#0F0F1A]" strokeWidth={2} />}
                          {i === 1 && <FileText size={22} className="text-[#0F0F1A]" strokeWidth={2} />}
                          {i === 2 && <Bot size={22} className="text-[#0F0F1A]" strokeWidth={2} />}
                        </div>
                        <h4 className="font-sans text-[15px] font-bold text-white mb-1 leading-tight group-hover:underline">{step.title}</h4>
                        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 leading-relaxed mb-2">{step.desc}</p>
                        <span className="font-[family-name:var(--font-inter)] text-[14px] font-bold" style={{ color: step.color }}>{step.price}</span>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Mobile: vertical tracker */}
          <div className="md:hidden">
            {[
              { title: featured.title, desc: "Learn what to prepare and where to sign up.", price: "Free", color: "#00C97A", href: featured.file, isDownload: true },
              { title: paid.title, desc: "Templates, action plans, and contracts for your first client.", price: paid.priceLabel, color: "#FFD23F", href: "/shop/freelancer-kit" },
              { title: aiGuide.title, desc: "Use AI to 10x your output and earn more per hour.", price: aiGuide.priceLabel, color: "#3B82F6", href: "/shop/chatgpt-claude" },
            ].map((step, i, arr) => (
              <a
                key={i}
                href={step.href}
                {...(step.isDownload ? { target: "_blank", rel: "noopener noreferrer", download: true } : {})}
                className="flex items-start gap-4 group"
              >
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 shadow-lg"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 16px ${step.color}40` }}
                  >
                    {i === 0 && <Rocket size={20} className="text-[#0F0F1A]" strokeWidth={2} />}
                    {i === 1 && <FileText size={20} className="text-[#0F0F1A]" strokeWidth={2} />}
                    {i === 2 && <Bot size={20} className="text-[#0F0F1A]" strokeWidth={2} />}
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-[3px] h-10 rounded-full my-1" style={{ backgroundColor: `${step.color}40` }} />
                  )}
                </div>
                <div className={i < arr.length - 1 ? "pb-6" : ""}>
                  <h4 className="font-sans text-[15px] font-bold text-white mb-1 leading-tight group-hover:underline">{step.title}</h4>
                  <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 leading-relaxed mb-1">{step.desc}</p>
                  <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold" style={{ color: step.color }}>{step.price}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ COMING SOON ═══ */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Zap size={18} className="text-[#E8373A]" strokeWidth={2.5} />
          <h3 className="font-sans text-[20px] md:text-[24px] font-bold text-white">Coming Soon</h3>
        </div>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 mb-6">Based on what Filipino online workers are searching for right now.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((product) => {
            const Icon = ICON_MAP[product.coverIcon];
            return (
              <div key={product.id} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] overflow-hidden flex flex-col h-full opacity-70">
                <div className="flex items-center gap-5 p-6 border-b border-white/[0.06]">
                  <div className="w-[72px] h-[96px] shrink-0 rounded-[6px] flex items-center justify-center border grayscale"
                    style={{ backgroundColor: product.coverBg, borderColor: `${product.coverColor}30` }}>
                    <Icon size={28} color={product.coverColor} strokeWidth={1.4} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.1em] uppercase px-2 py-0.5 rounded mb-2"
                      style={{ color: product.tagColor, backgroundColor: `${product.tagColor}15` }}>{product.tag}</span>
                    <h4 className="font-sans text-[17px] font-bold text-white leading-tight">{product.title}</h4>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-5 flex-grow">{product.description}</p>
                  {product.active && product.price > 0 ? (
                    <button onClick={() => handleBuy(product.id)} disabled={loadingId === product.id}
                      className="w-full bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F] font-[family-name:var(--font-inter)] text-[13px] font-bold py-3 rounded-[8px] flex items-center justify-center gap-2 hover:bg-[#FFD23F]/20 transition-colors">
                      {loadingId === product.id ? <Loader2 size={14} strokeWidth={2.5} className="animate-spin" /> : <ShoppingCart size={14} strokeWidth={2.5} />}
                      {loadingId === product.id ? "Processing..." : `Buy Now — ${product.priceLabel}`}
                    </button>
                  ) : (
                    <button className="w-full bg-white/5 border border-white/10 text-white/55 font-[family-name:var(--font-inter)] text-[13px] font-bold py-3 rounded-[8px] flex items-center justify-center gap-2 cursor-not-allowed" disabled>
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


      {/* ═══ 2-col: FAQ+Subscribe | Why Buy+Already Paid ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left: FAQ + Subscribe */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-sans text-[20px] md:text-[24px] font-bold text-white mb-6">Buying & Downloads FAQ</h3>
            <div className="flex flex-col gap-3">
              {SHOP_FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="border border-white/[0.08] rounded-[12px] overflow-hidden bg-[#18181F]">
                    <button onClick={() => setOpenFaq(isOpen ? null : i)}
                      className="w-full flex items-center justify-between px-5 min-h-[56px] text-left hover:bg-white/5 transition-colors">
                      <span className="text-white text-[15px] font-semibold pr-4">{faq.q}</span>
                      <ChevronDown size={16} className={`text-white/40 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-white/55 text-[14px] leading-[1.8] font-[family-name:var(--font-inter)]">{faq.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#FFD23F]/10 via-[#18181F] to-[#18181F] border border-[#FFD23F]/20 rounded-[16px] p-6 md:p-8 flex-1">
            <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-white mb-3">Get Notified on New Guides</h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-5">
              Join Filipino learners who get first access to new ebooks, free downloads, and earning tips.
            </p>
            {emailStatus === "success" ? (
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#00C97A]">✓ You&apos;re in! We&apos;ll send you updates.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
                  <input type="text" name="website" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" />
                </div>
                <input type="email" placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="flex-1 bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-2.5 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]" />
                <button type="submit" disabled={emailStatus === "loading"}
                  className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] font-bold text-[13px] px-5 py-2.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-60 whitespace-nowrap">
                  {emailStatus === "loading" ? "..." : "Subscribe"}
                </button>
              </form>
            )}
            {emailStatus === "error" && (
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#E8373A] mt-3">Something went wrong. Please try again.</p>
            )}
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 mt-4 leading-relaxed">
              By subscribing, you agree to receive occasional emails about new guides, free downloads, and earning tips. We respect your privacy and will never share your email with third parties. You can unsubscribe at any time by clicking the link in any email.
            </p>
          </div>
        </div>

        {/* Right: Why Buy + Already Paid */}
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-sans text-[20px] md:text-[24px] font-bold text-white mb-6">Why Buy From Cyberussell</h3>
            <div className="flex flex-col gap-3">
              {TRUST_POINTS.map((point) => (
                <div key={point.title} className="flex items-center gap-3 bg-[#18181F] border border-white/[0.08] rounded-[12px] px-5 min-h-[56px]">
                  <point.icon size={16} className="text-[#FFD23F] shrink-0" strokeWidth={1.8} />
                  <div>
                    <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white">{point.title}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/40 ml-2">{point.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8 flex-1">
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
              <input type="text" value={refInput}
                onChange={(e) => { setRefInput(e.target.value); if (disputeState !== "idle") setDisputeState("idle"); }}
                placeholder="e.g. cs_xxxxx or reference number"
                className="flex-1 bg-[#0F0F1A] border border-white/10 rounded-[8px] px-4 py-3 font-[family-name:var(--font-inter)] text-[14px] text-white placeholder:text-white/25 focus:outline-none focus:border-[#FFD23F]/40 transition-colors" />
              <button onClick={handleDispute} disabled={disputeState === "loading" || !refInput.trim()}
                className="bg-white/10 border border-white/15 text-white font-[family-name:var(--font-inter)] text-[13px] font-bold px-6 py-3 rounded-[8px] hover:bg-white/15 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed shrink-0">
                {disputeState === "loading" ? <Loader2 size={14} className="animate-spin" /> : "Get Download Link"}
              </button>
            </div>
            {disputeState === "success" && (
              <div className="mt-4 bg-[#00C97A]/10 border border-[#00C97A]/25 rounded-[8px] p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <CheckCircle2 size={18} className="text-[#00C97A] shrink-0" />
                <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80 flex-1">
                  Found it! <span className="font-bold text-[#FFD23F]">{disputeMsg}</span>
                </span>
                <a href={disputeUrl} className="bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[12px] font-extrabold px-4 py-2 rounded-[6px] hover:opacity-90 transition-all flex items-center gap-1.5 shrink-0">
                  <Download size={14} strokeWidth={2.5} /> Download
                </a>
              </div>
            )}
            {disputeState === "error" && (
              <div className="mt-4 bg-[#E8373A]/10 border border-[#E8373A]/25 rounded-[8px] p-4 flex items-start gap-3">
                <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{disputeMsg}</span>
              </div>
            )}
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 mt-4">
              Can&apos;t find your reference? Check your GCash/Maya/bank app for the transaction details, or{" "}
              <a href="/contact" className="text-[#E8373A] hover:underline">contact us</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
