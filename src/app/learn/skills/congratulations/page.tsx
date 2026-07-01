"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, Share2, ArrowRight } from "lucide-react";

type Learner = { name: string; badges: { id: string; name: string }[]; certificates: { id: string; name: string }[] };

export default function SkillsCongratulationsPage() {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/skills"; return; }
      if (!d.learner.completed_pillars?.includes("skills")) {
        window.location.href = "/learn/skills/assessment";
        return;
      }
      setLearner(d.learner);
      setLoading(false);
    });
  }, []);

  function shareToFacebook() {
    setSharing(true);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://www.cyberussell.com/learn/skills")}&quote=${encodeURIComponent(`I just earned the Digital Skills Bida Badge on Cyberussell! 🛠️ Pillar 5 complete. Building real digital skills with AI. 🚀 #Cyberussell #AILearning #BidaBadge`)}`;
    window.open(shareUrl, "_blank", "width=600,height=400");
    setTimeout(() => setSharing(false), 2000);
    if (navigator.share) {
      navigator.share({
        title: "I earned my Digital Skills Bida Badge! 🛠️",
        text: "Just completed Pillar 5: Digital Skills on Cyberussell. Building real skills with AI! 🚀",
        url: "https://www.cyberussell.com/learn/skills",
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

          <div className="text-[72px] mb-6">🛠️</div>

          <div className="inline-flex items-center gap-2 bg-[#FB923C]/10 border border-[#FB923C]/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-[#FB923C] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 Complete</span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[44px] font-bold text-white mb-4 leading-tight">
            Digital Skills Bida!
          </h1>

          {learner && (
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 mb-2">
              Congrats, <span className="text-white font-bold">{learner.name}</span>!
            </p>
          )}

          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/45 leading-[1.8] mb-10 max-w-lg mx-auto">
            You&apos;ve completed Pillar 5 and proven you can apply AI to real digital skills — website creation, SEO, design, writing, marketing, and more.
          </p>

          <div className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-xl bg-[#FB923C]/10 border border-[#FB923C]/20 flex items-center justify-center text-[28px]">🏅</div>
            </div>
            <p className="font-sans text-[16px] font-bold text-white mb-1">Digital Skills Bida Badge</p>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">Earned by completing Pillar 5 of the Cyberussell Learning Program</p>
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
              href="/learn/missions"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[14px] font-bold hover:bg-[#FFD23F]/90 transition-colors"
            >
              Start Pillar 6: AI Missions
              <ArrowRight size={15} />
            </a>
          </div>

          <a href="/learn/dashboard" className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 hover:text-white/60 transition-colors">
            View Learning Dashboard →
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
