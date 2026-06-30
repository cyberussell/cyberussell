"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Download, Share2, ArrowRight, ExternalLink } from "lucide-react";

type Learner = { name: string; email: string; badges: { id: string; name: string }[]; certificates: { id: string; name: string }[] };

export default function CongratulationsPage() {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/foundations/complete"; return; }
      if (!d.learner.completed_pillars?.includes("foundations")) {
        window.location.href = "/learn/foundations/assessment";
        return;
      }
      setLearner(d.learner);
      setLoading(false);
    });
  }, []);

  function certificateUrl(type: "certificate" | "badge") {
    if (!learner) return "#";
    return `/api/og/certificate?name=${encodeURIComponent(learner.name)}&pillar=AI+Foundations&type=${type}`;
  }

  function downloadCertificate() {
    const link = document.createElement("a");
    link.href = certificateUrl("certificate");
    link.download = "cyberussell-ai-foundations-certificate.png";
    link.click();
  }

  function shareToFacebook() {
    setSharing(true);
    const imageUrl = `${window.location.origin}${certificateUrl("badge")}`;
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + "/learn/foundations")}&quote=${encodeURIComponent(`I just earned the AI Foundations Explorer Bida Badge on Cyberussell! 🏅 Pillar 1 complete. Learning to use AI the right way. 🚀 #Cyberussell #AILearning #BidaBadge`)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    setTimeout(() => setSharing(false), 2000);
    // If Web Share API is available (mobile)
    if (navigator.share) {
      navigator.share({
        title: "I earned my AI Foundations Explorer Bida Badge! 🏅",
        text: "Just completed Pillar 1: AI Foundations on Cyberussell. Earned my first Bida Badge! 🚀",
        url: window.location.origin + "/learn/foundations",
      }).catch(() => {});
    }
    void imageUrl;
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#0F0F1A] flex items-center justify-center">
          <Loader2 size={28} className="text-white/20 animate-spin" />
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16">
        <div className="max-w-xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-[64px] mb-2">🎉</div>
            <h1 className="font-sans text-[32px] md:text-[40px] font-bold text-white mb-3 leading-tight">Congratulations!</h1>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-relaxed">
              You earned your first Cyberussell Bida Badge,<br />
              <span className="text-white/80 font-medium">{learner?.name}!</span>
            </p>
          </div>

          {/* Badge card */}
          <div className="bg-[#14141e] border border-[#FFD23F]/20 rounded-2xl p-6 mb-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFD23F]/5 to-transparent pointer-events-none" />

            <div className="flex items-center gap-5 mb-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#FFD23F] to-[#F5A623] flex items-center justify-center text-[36px] shadow-lg shadow-[#FFD23F]/20 shrink-0">
                🏅
              </div>
              <div>
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F]/60 uppercase tracking-[2px] mb-1">Bida Badge</p>
                <p className="font-sans text-[20px] font-bold text-white">AI Foundations Explorer</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mt-0.5">Pillar 1 · {new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" })}</p>
              </div>
            </div>

            {/* Preview of badge image */}
            {learner && (
              <div className="rounded-xl overflow-hidden border border-white/[0.06] mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={certificateUrl("badge")}
                  alt="Bida Badge"
                  className="w-full"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>
            )}

            <div className="flex gap-2">
              <button
                onClick={shareToFacebook}
                disabled={sharing}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#1877F2] text-white font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#1877F2]/90 transition-colors"
              >
                <Share2 size={14} strokeWidth={2.5} />
                {sharing ? "Opening..." : "Share to Facebook"}
              </button>
            </div>
          </div>

          {/* Certificate card */}
          <div className="bg-[#14141e] border border-[#818CF8]/20 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#818CF8]/10 flex items-center justify-center text-[28px] shrink-0">
                📜
              </div>
              <div>
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#818CF8]/60 uppercase tracking-[2px] mb-1">Certificate</p>
                <p className="font-sans text-[16px] font-bold text-white">Cyberussell AI Foundations Certificate</p>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={learner ? certificateUrl("certificate") : "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-white/[0.10] text-white/70 font-[family-name:var(--font-inter)] text-[13px] font-medium hover:bg-white/[0.04] transition-colors"
              >
                <ExternalLink size={14} strokeWidth={2} />
                View Certificate
              </a>
              <button
                onClick={downloadCertificate}
                className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#818CF8]/10 border border-[#818CF8]/20 text-[#818CF8] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#818CF8]/20 transition-colors"
              >
                <Download size={14} strokeWidth={2.5} />
                Download
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <a
              href="/learn/dashboard"
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-[#14141e] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.05] flex items-center justify-center text-[18px]">📊</div>
                <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white">View My Dashboard</span>
              </div>
              <ArrowRight size={16} className="text-white/30" />
            </a>

            <a
              href="/learn/think"
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-gradient-to-r from-[#FFD23F]/10 to-transparent border border-[#FFD23F]/20 hover:border-[#FFD23F]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFD23F]/10 flex items-center justify-center text-[18px]">🚀</div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white">Continue to Pillar 2</p>
                  <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">Think with AI</p>
                </div>
              </div>
              <ArrowRight size={16} className="text-[#FFD23F]" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
