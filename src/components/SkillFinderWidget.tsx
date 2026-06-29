"use client";

import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Sparkles,
  Target,
  Gift,
  RotateCcw,
  ChefHat,
  Palette,
  Wrench,
  Video,
  PenLine,
  CornerDownRight,
  Search,
  type LucideIcon,
} from "lucide-react";
import {
  HERO_WIDGET_CHIPS,
} from "@/data/content";

const CHIP_ICONS: Record<string, LucideIcon> = {
  cooking: ChefHat,
  Canva: Palette,
  "phone repair": Wrench,
  "video editing": Video,
  writing: PenLine,
};

type IncomePath = { title: string; detail: string };
type AIResult = {
  category: string;
  description: string;
  earning_range: string;
  income_paths: IncomePath[];
  first_step: string;
};

export default function SkillFinderWidget({ careerSlugs = [] }: { careerSlugs?: string[] }) {
  const [skillInput, setSkillInput] = useState("");
  const [result, setResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const t = setTimeout(() => {
      inputRef.current?.focus();
    }, 800);
    return () => clearTimeout(t);
  }, [mounted]);

  async function handleSearch(overrideSkill?: string) {
    const skill = overrideSkill ?? skillInput;
    if (!skill.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/api/skill-finder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skill }),
      });
      const data = await res.json();
      if (data.error) setError(data.error);
      else {
        setResult(data);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "skill_search", { skill_query: skill, source: "hero" });
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function findCareerSlug(input: string): string | null {
    const normalized = input.toLowerCase().trim().replace(/\s+/g, "-");
    if (careerSlugs.includes(normalized)) return normalized;
    const single = careerSlugs.find((s) => s.includes(normalized) || normalized.includes(s));
    return single ?? null;
  }

  function handleReset() {
    setSkillInput("");
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  }

  return (
    <div
      className={`flex flex-col items-center w-full max-w-[520px] transition-all duration-700 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Start Here label */}
      <div className="flex flex-col items-center gap-2 mb-5">
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#FFD23F]/30" />
          <span className="font-[family-name:var(--font-inter)] text-[13px] font-extrabold text-[#FFD23F] uppercase tracking-[4px]">
            Start Here
          </span>
          <span className="h-px w-8 bg-[#FFD23F]/30" />
        </div>
        <svg width="12" height="8" viewBox="0 0 12 8" className="text-[#FFD23F]/60 animate-bounce" style={{ animationDuration: "2s" }}>
          <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Widget card with gradient border */}
      <div
        className="relative w-full rounded-2xl p-[1.5px]"
        style={{
          background: "linear-gradient(135deg, #E8373A, #FFD23F 50%, #E8373A)",
          boxShadow: "0 4px 60px rgba(255,210,63,0.08), 0 0 100px rgba(255,210,63,0.04)",
        }}
      >
        <div className="bg-[#14141E] rounded-[14.5px] overflow-hidden flex flex-col">
          <div className="p-7 md:p-9 flex flex-col gap-6">
            {/* Header row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#FFD23F]/10 border border-[#FFD23F]/20 flex items-center justify-center shrink-0">
                  <Target size={24} className="text-[#FFD23F]" strokeWidth={1.8} />
                </div>
                <h3 className="font-sans text-[22px] md:text-[24px] font-bold leading-tight">
                  <span className="text-white">Discover What Your </span>
                  <span className="text-[#FFD23F]">Skills</span>
                  <span className="text-white"> Are Worth</span>
                </h3>
              </div>
              <div className="shrink-0 bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 py-2 flex flex-col items-center gap-0.5">
                <div className="flex items-center gap-1.5">
                  <Gift size={13} className="text-[#FFD23F]" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-extrabold text-[#FFD23F] uppercase tracking-[0.05em]">
                    100% Free
                  </span>
                </div>
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/40">
                  No hidden costs
                </span>
              </div>
            </div>

            {/* Supporting copy */}
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 leading-[1.7]">
              Tell us what you&apos;re good at. We&apos;ll show you{" "}
              <span className="text-[#FFD23F] font-medium">realistic ways to earn</span>{" "}
              from it online.
            </p>

            {/* Search input */}
            <div
              className="relative flex rounded-xl"
              style={{
                boxShadow: "0 0 20px rgba(255,210,63,0.08), 0 0 40px rgba(255,210,63,0.04)",
              }}
            >
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <Search size={18} className="text-white/25" strokeWidth={2} />
              </div>
              <input
                ref={inputRef}
                type="text"
                placeholder="e.g. cooking, design, phone repair..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                className="w-full bg-[#1a1a28] border border-white/[0.10] rounded-l-xl py-[18px] pl-11 pr-5 text-white text-[15px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F]/40 focus:bg-[#1c1c2c] transition-all duration-200 font-[family-name:var(--font-inter)]"
              />
              <button
                onClick={() => handleSearch()}
                disabled={loading}
                className="bg-[#E8373A] px-6 rounded-r-xl flex items-center justify-center hover:bg-[#FF4A4D] transition-colors disabled:opacity-60"
              >
                {loading
                  ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  : <ArrowRight size={22} color="white" strokeWidth={2.5} />
                }
              </button>
            </div>

            {/* Chips */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <CornerDownRight size={14} className="text-white/25" strokeWidth={2} />
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
                  Not sure what to type? Try these:
                </span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {(HERO_WIDGET_CHIPS as readonly string[]).map((skill) => {
                  const Icon = CHIP_ICONS[skill];
                  return (
                    <button
                      key={skill}
                      onClick={() => { setSkillInput(skill); handleSearch(skill); }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] font-[family-name:var(--font-inter)] text-[13px] font-medium text-white/55 hover:bg-white/[0.07] hover:text-white/80 hover:border-white/[0.18] hover:-translate-y-[1px] transition-all duration-200 cursor-pointer"
                    >
                      {Icon && <Icon size={14} strokeWidth={1.8} className="text-[#FFD23F]/60" />}
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="animate-pulse space-y-2 p-4 rounded-xl" style={{ background: "rgba(255,255,255,0.03)" }}>
                <p className="text-[12px] text-white/55 font-[family-name:var(--font-inter)]">Finding your income paths...</p>
                <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.08)", width: "75%" }} />
                <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.08)", width: "50%" }} />
                <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.08)", width: "65%" }} />
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="p-4 rounded-xl" style={{ background: "rgba(232,55,58,0.08)", border: "1px solid rgba(232,55,58,0.25)" }}>
                <p className="text-[12px] text-[#FF6B6B] mb-2 font-[family-name:var(--font-inter)]">{error}</p>
                <button onClick={() => { setError(null); setSkillInput(""); }} className="text-[12px] text-white bg-[#E8373A] px-3 py-1.5 rounded font-[family-name:var(--font-inter)]">
                  Try Again
                </button>
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
                <div className="p-4" style={{ background: "#111118" }}>
                  <div className="flex gap-2 flex-wrap mb-3">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full font-[family-name:var(--font-inter)]" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.25)", color: "#00C97A" }}>
                      {result.category}
                    </span>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full font-[family-name:var(--font-inter)]" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.25)", color: "#00C97A" }}>
                      {result.earning_range}
                    </span>
                  </div>

                  <p className="text-[13px] mb-3 font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                    {result.description}
                  </p>

                  <p className="text-[10px] font-bold uppercase tracking-widest mb-2 font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Your 4 income paths
                  </p>

                  <div className="flex flex-col mb-3">
                    {result.income_paths.map((path, i) => (
                      <div key={i} className="flex gap-3 items-start py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                        <CheckCircle size={14} color="#00C97A" strokeWidth={2.5} className="shrink-0 mt-[2px]" />
                        <div>
                          <p className="text-[12px] font-bold text-white font-[family-name:var(--font-inter)]">{path.title}</p>
                          <p className="text-[11px] font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.5)" }}>{path.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-lg p-3 mb-3" style={{ background: "rgba(255,210,63,0.08)", border: "1px solid rgba(255,210,63,0.2)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-1 font-[family-name:var(--font-inter)]" style={{ color: "#FFD23F" }}>
                      Your first step this week
                    </p>
                    <p className="text-[12px] font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.65" }}>
                      {result.first_step}
                    </p>
                  </div>

                  {(() => {
                const matchedSlug = findCareerSlug(skillInput);
                return matchedSlug ? (
                  <a
                    href={`/careers/${matchedSlug}`}
                    className="block w-full text-center py-3 rounded-lg font-bold text-[13px] text-white mb-2 font-[family-name:var(--font-inter)]"
                    style={{ background: "#E8373A" }}
                  >
                    View Complete Career Blueprint →
                  </a>
                ) : (
                  <a
                    href="/#downloads"
                    className="block w-full text-center py-3 rounded-lg font-bold text-[13px] text-white mb-2 font-[family-name:var(--font-inter)]"
                    style={{ background: "#E8373A" }}
                  >
                    ↓ Get free guides to start earning →
                  </a>
                );
              })()}
                  <div className="flex justify-center gap-3 mb-3">
                    <a href="https://www.tiktok.com/@cyberussell" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.4)" }}>TikTok</a>
                    <a href="https://www.facebook.com/cyberussellofficial" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.4)" }}>Facebook</a>
                    <a href="https://www.youtube.com/@CyberRussell" target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.4)" }}>YouTube</a>
                  </div>
                  <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] font-medium text-white/40 hover:text-white/60 hover:border-white/[0.15] transition-colors"
                  >
                    <RotateCcw size={13} strokeWidth={2} />
                    Try another skill
                  </button>
                </div>
              </div>
            )}

            {/* Reassurance row */}
            {!result && !loading && (
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Sparkles size={14} className="text-[#FFD23F]" strokeWidth={2} />
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/70">
                      Free forever
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 leading-[1.5]">
                    All tools and guides are 100% free
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-[#FFD23F]" strokeWidth={2} />
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/70">
                      No sign-up
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 leading-[1.5]">
                    No email. No account. Just use it.
                  </span>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-[#FFD23F]" strokeWidth={2} />
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/70">
                      Takes 30 seconds
                    </span>
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 leading-[1.5]">
                    Get your earning ideas in less than a minute
                  </span>
                </div>
              </div>
            )}

            {/* Discovery link */}
            {!result && !loading && (
              <a
                href="/discover"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/[0.06] font-[family-name:var(--font-inter)] text-[12px] font-medium text-white/35 hover:text-white/55 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all"
              >
                Not sure what your skill is? Discover it →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
