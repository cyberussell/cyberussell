"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Share2, ArrowRight } from "lucide-react";

type Learner = { name: string; badges: { id: string; name: string }[]; certificates: { id: string; name: string }[] };

export default function MissionsCongratulationsPage() {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/missions"; return; }
      if (!d.learner.completed_pillars?.includes("missions")) {
        window.location.href = "/learn/missions/assessment";
        return;
      }
      setLearner(d.learner);
      setLoading(false);
    });
  }, []);

  function shareToFacebook() {
    setSharing(true);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.cyberussell.com/learn/missions")}&quote=${encodeURIComponent(`Mission complete! 🎯 I just finished all 7 AI Missions on Cyberussell — real deliverables, real results. Pillar 6 done! 🚀 #Cyberussell #AILearning #MissionComplete`)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    setTimeout(() => setSharing(false), 2000);
    if (navigator.share) {
      navigator.share({
        title: "Mission Complete! All 7 AI Missions Done 🎯",
        text: "Just completed all 7 AI Missions on Cyberussell. Real projects, real deliverables! 🚀",
        url: "https://www.cyberussell.com/learn/missions",
      }).catch(() => {});
    }
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
        <div className="max-w-2xl mx-auto text-center">

          <div className="text-[72px] mb-6">🎯</div>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 6 Complete</span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[44px] font-bold text-white mb-4 leading-tight">
            Mission Complete Bida!
          </h1>

          {learner && (
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 mb-2">
              Congrats, <span className="text-white font-bold">{learner.name}</span>!
            </p>
          )}

          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/45 leading-[1.8] mb-10 max-w-lg mx-auto">
            You&apos;ve completed all 7 AI Missions and built a real portfolio of deliverables — a resume, a landing page, a proposal, a business plan, a content calendar, a logo, and a blog article. You don&apos;t just know AI. You use it.
          </p>

          <div className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#FFD23F]/10 border border-[#FFD23F]/20 flex items-center justify-center text-[28px]">🏅</div>
            </div>
            <p className="font-sans text-[16px] font-bold text-white mb-1">Mission Complete Bida Badge</p>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">Earned by completing all 7 AI Missions in the Cyberussell Learning Program</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <button
              onClick={shareToFacebook}
              disabled={sharing}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1877F2] text-white font-[family-name:var(--font-inter)] text-[14px] font-bold hover:bg-[#1877F2]/90 transition-colors disabled:opacity-60"
            >
              <Share2 size={15} />
              {sharing ? "Sharing..." : "Share on Facebook"}
            </button>
            <a
              href="/learn/dashboard"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[14px] font-bold hover:bg-[#FFD23F]/90 transition-colors"
            >
              View Learning Dashboard
              <ArrowRight size={15} />
            </a>
          </div>

          <a href="/careers" className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 hover:text-white/60 transition-colors">
            Explore Career Blueprints →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
