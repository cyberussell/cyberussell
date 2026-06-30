"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Loader2, BookOpen, Lock, Medal, ScrollText, Star, LogOut, ArrowRight } from "lucide-react";

type Learner = {
  name: string;
  email: string;
  avatar: string;
  provider: string;
  created_at: string;
  completed_pillars: string[];
  assessment_scores: Record<string, number>;
  badges: { id: string; name: string; earned_at: string }[];
  certificates: { id: string; name: string; earned_at: string }[];
};

const ALL_PILLARS = [
  { id: "foundations", label: "AI Foundations", href: "/learn/foundations", pillar: 1, desc: "Understand how AI works before trusting it.", color: "#4F8EF7" },
  { id: "think", label: "Think with AI", href: "/learn/think", pillar: 2, desc: "Collaborate with AI as a thinking partner.", color: "#A78BFA", requires: "foundations" },
  { id: "workflows", label: "AI Workflows", href: "/learn/workflows", pillar: 3, desc: "Build repeatable AI-powered workflows.", color: "#34D399", requires: "think" },
  { id: "skills", label: "Digital Skills", href: "/learn/skills", pillar: 4, desc: "Practical skills for the digital economy.", color: "#FB923C", requires: "workflows" },
  { id: "freelancing", label: "Freelancing", href: "/learn/freelancing", pillar: 5, desc: "Earn online with your AI-powered skills.", color: "#F472B6", requires: "skills" },
  { id: "online-jobs", label: "Online Jobs", href: "/learn/online-jobs", pillar: 6, desc: "Get hired for remote work opportunities.", color: "#FFD23F", requires: "freelancing" },
];

function pillarsUnlocked(completed: string[]): Set<string> {
  const unlocked = new Set<string>();
  for (const p of ALL_PILLARS) {
    if (!p.requires || completed.includes(p.requires)) unlocked.add(p.id);
  }
  return unlocked;
}

export default function DashboardPage() {
  const [learner, setLearner] = useState<Learner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/learner/auth").then((r) => r.json()).then((d) => {
      if (!d.learner) { window.location.href = "/learn/foundations/complete"; return; }
      setLearner(d.learner);
      setLoading(false);
    });
  }, []);

  async function logout() {
    await fetch("/api/learner/auth", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "logout" }) });
    window.location.href = "/learn";
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

  if (!learner) return null;

  const completed = learner.completed_pillars ?? [];
  const unlocked = pillarsUnlocked(completed);
  const progress = Math.round((completed.length / ALL_PILLARS.length) * 100);
  const level = completed.length === 0 ? "Beginner" : completed.length <= 2 ? "Explorer" : completed.length <= 4 ? "Practitioner" : "Advanced";

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A] px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Profile header */}
          <div className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-6 mb-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FFD23F]/20 to-[#F5A623]/10 border border-[#FFD23F]/20 flex items-center justify-center text-[28px] shrink-0">
              {learner.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={learner.avatar} alt={learner.name} className="w-full h-full rounded-2xl object-cover" />
              ) : (
                <span>{learner.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-sans text-[22px] font-bold text-white truncate">{learner.name}</h1>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40">{learner.email}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <Star size={13} className="text-[#FFD23F]" strokeWidth={2} />
                <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#FFD23F]">{level}</span>
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">· via {learner.provider}</span>
              </div>
            </div>
            <button onClick={logout} className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/55 hover:bg-white/[0.04] transition-colors shrink-0">
              <LogOut size={13} strokeWidth={2} /> Sign Out
            </button>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: "Progress", value: `${progress}%`, sub: `${completed.length}/${ALL_PILLARS.length} pillars`, color: "#4F8EF7" },
              { label: "Bida Badges", value: learner.badges.length, sub: "earned", color: "#FFD23F" },
              { label: "Certificates", value: learner.certificates.length, sub: "received", color: "#818CF8" },
            ].map((s) => (
              <div key={s.label} className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-4 text-center">
                <p className="font-sans text-[28px] font-bold" style={{ color: s.color }}>{s.value}</p>
                <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 uppercase tracking-[1px]">{s.label}</p>
                <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">Learning Path Progress</span>
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-[#4F8EF7] font-bold">{progress}%</span>
            </div>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#4F8EF7] to-[#818CF8] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Pillars */}
          <div className="mb-6">
            <h2 className="font-sans text-[18px] font-bold text-white mb-4">Learning Path</h2>
            <div className="space-y-2">
              {ALL_PILLARS.map((p) => {
                const isCompleted = completed.includes(p.id);
                const isUnlocked = unlocked.has(p.id);
                const score = learner.assessment_scores?.[p.id];
                return (
                  <a
                    key={p.id}
                    href={isUnlocked ? p.href : undefined}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isCompleted ? "border-[#00C97A]/20 bg-[#00C97A]/[0.03]" : isUnlocked ? "border-white/[0.06] bg-[#14141e] hover:border-white/[0.12]" : "border-white/[0.04] bg-[#14141e]/50 opacity-50 cursor-not-allowed"}`}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${p.color}15` }}>
                      {isCompleted ? (
                        <span className="text-[18px]">✅</span>
                      ) : isUnlocked ? (
                        <BookOpen size={18} style={{ color: p.color }} strokeWidth={1.8} />
                      ) : (
                        <Lock size={16} className="text-white/20" strokeWidth={1.8} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">Pillar {p.pillar}</p>
                        {isCompleted && score && <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#00C97A]">{score}%</span>}
                      </div>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-white truncate">{p.label}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 truncate">{p.desc}</p>
                    </div>
                    {isUnlocked && !isCompleted && <ArrowRight size={15} className="text-white/25 shrink-0" />}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Badges */}
          {learner.badges.length > 0 && (
            <div className="mb-6">
              <h2 className="font-sans text-[18px] font-bold text-white mb-4">Bida Badges</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {learner.badges.map((b) => (
                  <div key={b.id} className="bg-[#14141e] border border-[#FFD23F]/15 rounded-2xl p-4 text-center">
                    <div className="text-[32px] mb-2">🏅</div>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white">{b.name}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-1">{new Date(b.earned_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certificates */}
          {learner.certificates.length > 0 && (
            <div>
              <h2 className="font-sans text-[18px] font-bold text-white mb-4">Certificates</h2>
              <div className="space-y-2">
                {learner.certificates.map((c) => (
                  <a
                    key={c.id}
                    href={`/api/og/certificate?name=${encodeURIComponent(learner.name)}&pillar=AI+Foundations&type=certificate`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-2xl bg-[#14141e] border border-[#818CF8]/15 hover:border-[#818CF8]/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#818CF8]/10 flex items-center justify-center text-[20px] shrink-0">📜</div>
                    <div className="flex-1">
                      <p className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-white">{c.name}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30">{new Date(c.earned_at).toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" })}</p>
                    </div>
                    <Medal size={15} className="text-[#818CF8]/50 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
