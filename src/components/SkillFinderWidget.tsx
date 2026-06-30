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
  LayoutGrid,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { HERO_WIDGET_CHIPS } from "@/data/content";

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
  blueprint_slug: string | null;
};

function ResultPanel({
  result,
  loading,
  error,
  onReset,
  onClearError,
  split,
}: {
  result: AIResult | null;
  loading: boolean;
  error: string | null;
  onReset: () => void;
  onClearError: () => void;
  split: boolean;
}) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-5 py-10">
        <div className="w-12 h-12 rounded-xl bg-[#FFD23F]/10 border border-[#FFD23F]/20 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-[#FFD23F]/30 border-t-[#FFD23F] rounded-full animate-spin" />
        </div>
        <div className="w-full max-w-[240px] flex flex-col gap-2">
          <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#E8373A] to-[#FFD23F] rounded-full animate-[progress_2s_ease-in-out_infinite]" />
          </div>
          <p className="text-[12px] text-white/40 font-[family-name:var(--font-inter)] text-center">
            Finding your earning path...
          </p>
        </div>
        <style>{`@keyframes progress { 0% { width: 10%; } 50% { width: 80%; } 100% { width: 10%; } }`}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-10">
        <div className="p-5 rounded-xl w-full" style={{ background: "rgba(232,55,58,0.08)", border: "1px solid rgba(232,55,58,0.25)" }}>
          <p className="text-[13px] text-[#FF6B6B] mb-3 font-[family-name:var(--font-inter)]">{error}</p>
          <button onClick={onClearError} className="text-[12px] text-white bg-[#E8373A] px-3 py-1.5 rounded font-[family-name:var(--font-inter)]">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 py-12">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">
          <LayoutGrid size={28} className="text-white/15" strokeWidth={1.5} />
        </div>
        <div className="text-center">
          <p className="text-[14px] font-medium text-white/30 font-[family-name:var(--font-inter)] mb-1">Your results will appear here</p>
          <p className="text-[12px] text-white/20 font-[family-name:var(--font-inter)]">Type a skill on the left to get started</p>
        </div>
        <div className="flex flex-col gap-2 w-full mt-2">
          {["Income paths with peso ranges", "Platforms to earn from", "Your first action step"].map((hint, i) => (
            <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <div className="w-1.5 h-1.5 rounded-full bg-white/15 shrink-0" />
              <span className="text-[12px] text-white/20 font-[family-name:var(--font-inter)]">{hint}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-0 ${split ? "h-full overflow-y-auto" : ""}`}>
      <div className="flex gap-2 flex-wrap mb-4">
        <span className="text-[11px] font-bold px-3 py-1 rounded-full font-[family-name:var(--font-inter)]" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.25)", color: "#00C97A" }}>
          {result.category}
        </span>
        <span className="text-[11px] font-bold px-3 py-1 rounded-full font-[family-name:var(--font-inter)]" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.25)", color: "#00C97A" }}>
          {result.earning_range}
        </span>
      </div>

      <p className="text-[13px] mb-4 font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
        {result.description}
      </p>

      <p className="text-[10px] font-bold uppercase tracking-widest mb-3 font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.3)" }}>
        Best ways to earn
      </p>

      <div className="flex flex-col mb-4">
        {result.income_paths.map((path, i) => (
          <div key={i} className="flex gap-3 items-start py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            <CheckCircle size={14} color="#00C97A" strokeWidth={2.5} className="shrink-0 mt-[2px]" />
            <div>
              <p className="text-[12px] font-bold text-white font-[family-name:var(--font-inter)]">{path.title}</p>
              <p className="text-[11px] font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.5)" }}>{path.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(255,210,63,0.08)", border: "1px solid rgba(255,210,63,0.2)" }}>
        <div className="flex items-center gap-1.5 mb-1.5">
          <TrendingUp size={11} className="text-[#FFD23F]" strokeWidth={2.5} />
          <p className="text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-inter)]" style={{ color: "#FFD23F" }}>
            Your first step this week
          </p>
        </div>
        <p className="text-[12px] font-[family-name:var(--font-inter)]" style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.65" }}>
          {result.first_step}
        </p>
      </div>

      {result.blueprint_slug ? (
        <a
          href={`/careers/${result.blueprint_slug}`}
          className="relative block w-full text-center py-3 rounded-lg font-bold text-[13px] text-white mb-2 font-[family-name:var(--font-inter)] overflow-hidden"
          style={{ background: "#E8373A" }}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
          <span className="relative">View Complete Career Blueprint →</span>
          <style>{`@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }`}</style>
        </a>
      ) : (
        <a
          href="/careers"
          className="block w-full text-center py-3 rounded-lg font-bold text-[13px] text-white mb-2 font-[family-name:var(--font-inter)]"
          style={{ background: "#E8373A" }}
        >
          Browse All Career Blueprints →
        </a>
      )}

      <button
        onClick={onReset}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] font-medium text-white/40 hover:text-white/60 hover:border-white/[0.15] transition-colors"
      >
        <RotateCcw size={13} strokeWidth={2} />
        Try another skill
      </button>
    </div>
  );
}

export default function SkillFinderWidget({ split = false }: { split?: boolean }) {
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
    const t = setTimeout(() => { inputRef.current?.focus(); }, 800);
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

  function handleReset() {
    setSkillInput("");
    setResult(null);
    setError(null);
    inputRef.current?.focus();
  }

  const searchPanel = (
    <div className={`flex flex-col gap-6 ${split ? "p-7 md:p-9" : "p-7 md:p-9"}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#FFD23F]/10 border border-[#FFD23F]/20 flex items-center justify-center shrink-0">
            <Target size={24} className="text-[#FFD23F]" strokeWidth={1.8} />
          </div>
          <h3 className="font-sans text-[20px] md:text-[22px] font-bold leading-tight">
            <span className="text-white">Find the Best Way to </span>
            <span className="text-[#FFD23F]">Earn</span>
            <span className="text-white"> From Your Skill</span>
          </h3>
        </div>
        <div className="shrink-0 bg-white/[0.06] border border-white/[0.10] rounded-xl px-3 py-2 flex flex-col items-center gap-0.5">
          <div className="flex items-center gap-1.5">
            <Gift size={13} className="text-[#FFD23F]" strokeWidth={2} />
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-extrabold text-[#FFD23F] uppercase tracking-[0.05em]">
              100% Free
            </span>
          </div>
          <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/40">No hidden costs</span>
        </div>
      </div>

      {/* Supporting copy */}
      <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 leading-[1.7]">
        Tell us what you&apos;re good at. We&apos;ll show you{" "}
        <span className="text-[#FFD23F] font-medium">realistic ways to earn</span>{" "}
        from it online.
      </p>

      {/* Search input */}
      <div className="relative flex rounded-xl" style={{ boxShadow: "0 0 20px rgba(255,210,63,0.08), 0 0 40px rgba(255,210,63,0.04)" }}>
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

      {/* Stacked-only: loading + error + result + reassurance */}
      {!split && (
        <>
          {loading && (
            <div className="flex flex-col gap-3 py-2">
              <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#E8373A] to-[#FFD23F] rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: "70%" }} />
              </div>
              <p className="text-[12px] text-white/45 font-[family-name:var(--font-inter)] text-center">Analyzing your skill...</p>
              <style>{`@keyframes progress { 0% { width: 10%; } 50% { width: 80%; } 100% { width: 10%; } }`}</style>
            </div>
          )}

          {error && (
            <div className="p-4 rounded-xl" style={{ background: "rgba(232,55,58,0.08)", border: "1px solid rgba(232,55,58,0.25)" }}>
              <p className="text-[12px] text-[#FF6B6B] mb-2 font-[family-name:var(--font-inter)]">{error}</p>
              <button onClick={() => { setError(null); setSkillInput(""); }} className="text-[12px] text-white bg-[#E8373A] px-3 py-1.5 rounded font-[family-name:var(--font-inter)]">
                Try Again
              </button>
            </div>
          )}

          {result && !loading && (
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
              <div className="p-4" style={{ background: "#111118" }}>
                <ResultPanel result={result} loading={false} error={null} onReset={handleReset} onClearError={() => setError(null)} split={false} />
              </div>
            </div>
          )}

          {!result && !loading && (
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#FFD23F]" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/70">Free forever</span>
                </div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 leading-[1.5]">All tools and guides are 100% free</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Shield size={14} className="text-[#FFD23F]" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/70">No sign-up</span>
                </div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 leading-[1.5]">No email. No account. Just use it.</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#FFD23F]" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/70">Takes 30 seconds</span>
                </div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 leading-[1.5]">Get your earning ideas in less than a minute</span>
              </div>
            </div>
          )}
        </>
      )}

      {/* Split-only: reassurance always shown at bottom */}
      {split && !result && !loading && (
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/[0.06] mt-auto">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Sparkles size={12} className="text-[#FFD23F]" strokeWidth={2} />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/60">Free</span>
            </div>
            <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 leading-[1.5]">No cost, ever</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Shield size={12} className="text-[#FFD23F]" strokeWidth={2} />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/60">No sign-up</span>
            </div>
            <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 leading-[1.5]">No account needed</span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-[#FFD23F]" strokeWidth={2} />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/60">30 seconds</span>
            </div>
            <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 leading-[1.5]">Results instantly</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className={`flex flex-col items-center w-full transition-all duration-700 ease-out ${split ? "max-w-[900px]" : "max-w-[520px]"} ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
      <div
        className="relative w-full rounded-2xl p-[1.5px]"
        style={{
          background: "linear-gradient(135deg, #E8373A, #FFD23F 50%, #E8373A)",
          boxShadow: "0 4px 60px rgba(255,210,63,0.08), 0 0 100px rgba(255,210,63,0.04)",
        }}
      >
        <div className={`bg-[#14141E] rounded-[14.5px] overflow-hidden ${split ? "flex flex-col lg:flex-row" : "flex flex-col"}`}>
          {/* Search panel */}
          <div className={split ? "lg:w-[420px] shrink-0" : "w-full"}>
            {searchPanel}
          </div>

          {/* Result panel (split only) */}
          {split && (
            <div className="flex-1 lg:border-l border-t lg:border-t-0 border-white/[0.07] p-7 md:p-9">
              <ResultPanel
                result={result}
                loading={loading}
                error={error}
                onReset={handleReset}
                onClearError={() => setError(null)}
                split={true}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
