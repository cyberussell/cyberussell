"use client";

import { useState } from "react";
import { ArrowRight, Wallet, CheckCircle } from "lucide-react";
import {
  HERO_BADGE,
  HERO_SOURCE,
  HERO_SUBTEXT,
  HERO_CTA_BELOW,
  HERO_STATS,
  HERO_WIDGET_CHIPS,
  HERO_WIDGET_STATS,
  TRUST_BAR_ITEMS,
} from "@/data/content";

type IncomePath = { title: string; detail: string };
type AIResult = {
  category: string;
  description: string;
  earning_range: string;
  income_paths: IncomePath[];
  first_step: string;
};

export default function Hero() {
  const [skillInput, setSkillInput] = useState("");
  const [result, setResult] = useState<AIResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      else setResult(data);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main id="hero" className="bg-[#0F0F1A] relative flex flex-col flex-grow overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ background: "radial-gradient(circle at top right, rgba(232,55,58,0.14), transparent 50%)" }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-16 md:pt-20 pb-12 flex flex-col lg:flex-row gap-12 lg:gap-6 items-start relative z-10">
        {/* Left column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 w-fit">
            <span className="text-[#FFD23F] text-[12px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase">
              {HERO_BADGE}
            </span>
          </div>

          <h1 className="font-sans text-[34px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight">
            <span className="text-white">2.41 million</span>{" "}
            <span className="text-[#E8373A]">Filipinos have no job.</span>
            <br />
            <span className="text-white">Will you be the next one</span>{" "}
            <span className="text-[#FFD23F]">to break free?</span>
          </h1>

          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/65 max-w-[480px] leading-[1.8]">
            {HERO_SUBTEXT}
          </p>

          <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 italic">
            {HERO_SOURCE}
          </p>

          <div className="flex flex-wrap gap-4 mt-2">
            {HERO_STATS.map(({ value, label, color, bg, border }) => (
              <div key={value} className={`flex flex-col ${bg} border ${border} rounded-lg p-4 min-w-[140px] flex-1`}>
                <span className={`font-sans text-[20px] font-bold ${color}`}>{value}</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3">
            <p className="block md:hidden font-[family-name:var(--font-inter)] text-[13px] text-white/60 text-center">
              👇 Start here — it&apos;s free
            </p>
            <div className="relative w-full md:max-w-[380px]">
              <div className="absolute inset-0 rounded-[10px] border-2 border-[#E8373A] animate-pulse pointer-events-none" />
              <a
                href="#downloads"
                className="relative bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[17px] py-[18px] px-9 rounded-[10px] w-full min-h-[56px] flex justify-center items-center gap-2 hover:opacity-90 transition-all"
                style={{ boxShadow: "0 0 20px rgba(232,55,58,0.3)" }}
              >
                ↓ Get the Free Guide
              </a>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 text-center md:text-left md:max-w-[380px]">
              {HERO_CTA_BELOW}
            </p>
          </div>
        </div>

        {/* Right column: Skill Finder widget */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="bg-[#18181F] border border-white/[0.12] rounded-2xl w-full max-w-[480px] overflow-hidden flex flex-col shadow-2xl">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#E8373A] to-[#FFD23F]" />

            <div className="p-6 md:p-8 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white uppercase tracking-[0.05em]">
                  Skill Finder
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#00C97A] animate-pulse" />
                  <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/50 uppercase tracking-[0.05em]">
                    Active
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white/80">
                  What is your skill?
                </label>
                <div className="relative flex">
                  <input
                    type="text"
                    placeholder="e.g. cooking, design, phone repair..."
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                    className="w-full bg-[#222230] border border-white/10 rounded-l-lg py-3 px-4 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-[#E8373A] transition-colors font-[family-name:var(--font-inter)]"
                  />
                  <button
                    onClick={() => handleSearch()}
                    disabled={loading}
                    className="bg-[#E8373A] px-4 rounded-r-lg flex items-center justify-center hover:opacity-90 transition-colors disabled:opacity-60"
                  >
                    {loading
                      ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      : <ArrowRight size={20} color="white" strokeWidth={2} />
                    }
                  </button>
                </div>
              </div>

              {/* Chips */}
              <div className="flex flex-wrap gap-2">
                {(HERO_WIDGET_CHIPS as readonly string[]).map((skill) => (
                  <button
                    key={skill}
                    onClick={() => { setSkillInput(skill); handleSearch(skill); }}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-[family-name:var(--font-inter)] text-[12px] text-white/70 hover:bg-[#E8373A]/20 hover:border-[#E8373A]/50 hover:text-[#E8373A] transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>

              {/* Loading */}
              {loading && (
                <div className="animate-pulse space-y-2 p-3 rounded-lg" style={{ background: "rgba(255,255,255,0.04)" }}>
                  <p className="text-[12px] text-white/40">Finding your income paths...</p>
                  <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.08)", width: "75%" }} />
                  <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.08)", width: "50%" }} />
                  <div className="h-2 rounded" style={{ background: "rgba(255,255,255,0.08)", width: "65%" }} />
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 rounded-lg" style={{ background: "rgba(232,55,58,0.08)", border: "1px solid rgba(232,55,58,0.3)" }}>
                  <p className="text-[12px] text-[#FF6B6B] mb-2">{error}</p>
                  <button onClick={() => { setError(null); setSkillInput(""); }} className="text-[12px] text-white bg-[#E8373A] px-3 py-1.5 rounded">
                    Try Again
                  </button>
                </div>
              )}

              {/* Result */}
              {result && !loading && (
                <div className="rounded-lg overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.10)" }}>
                  <div className="p-4" style={{ background: "#111118" }}>
                    <div className="flex gap-2 flex-wrap mb-3">
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.25)", color: "#00C97A" }}>
                        {result.category}
                      </span>
                      <span className="text-[11px] font-bold px-3 py-1 rounded-full" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.25)", color: "#00C97A" }}>
                        {result.earning_range}
                      </span>
                    </div>

                    <p className="text-[13px] mb-3" style={{ color: "rgba(255,255,255,0.6)", lineHeight: "1.7" }}>
                      {result.description}
                    </p>

                    <p className="text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.3)" }}>
                      Your 4 income paths
                    </p>

                    <div className="flex flex-col mb-3" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                      {result.income_paths.map((path, i) => (
                        <div key={i} className="flex gap-3 items-start py-2 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                          <CheckCircle size={14} color="#00C97A" strokeWidth={2.5} className="shrink-0 mt-[2px]" />
                          <div>
                            <p className="text-[12px] font-bold text-white">{path.title}</p>
                            <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.5)" }}>{path.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg p-3 mb-3" style={{ background: "rgba(255,210,63,0.08)", border: "1px solid rgba(255,210,63,0.2)" }}>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: "#FFD23F" }}>
                        Your first step this week
                      </p>
                      <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.8)", lineHeight: "1.65" }}>
                        {result.first_step}
                      </p>
                    </div>

                    <a
                      href="#downloads"
                      className="block w-full text-center py-3 rounded-lg font-bold text-[13px] text-white"
                      style={{ background: "#E8373A" }}
                    >
                      Get the Full Free Guide →
                    </a>
                  </div>
                </div>
              )}

              {/* Stats (hidden when result is showing) */}
              {!result && !loading && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {HERO_WIDGET_STATS.map(({ value, label, color }) => (
                      <div key={value} className="bg-[#222230] p-4 rounded-lg flex flex-col justify-start border border-white/5">
                        <span className={`font-sans text-[20px] font-bold ${color}`}>{value}</span>
                        <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/50 leading-[1.5] mt-1">{label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                    <div className="bg-[#00C97A]/10 text-[#00C97A] px-2 py-1 rounded-full font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.05em] border border-[#00C97A]/20 flex items-center gap-1">
                      <Wallet size={11} strokeWidth={2.5} />
                      GCash
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/40">
                      No credit card · PDF instantly
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="bg-[#F7F7FB] text-[#0F0F1A] border-t border-b border-black/5 py-4 w-full mt-auto">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-wrap justify-center md:justify-between items-center gap-4 font-[family-name:var(--font-inter)] text-[14px] font-medium">
          {TRUST_BAR_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#00C97A]" />
              <span className="opacity-80">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
