"use client";

import { useState } from "react";
import {
  ChefHat,
  Palette,
  PenLine,
  Share2,
  Wrench,
  Video,
  GraduationCap,
  ShoppingBag,
  HelpCircle,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/data/content";

const ICON_MAP: Record<string, LucideIcon> = {
  ChefHat,
  Palette,
  PenLine,
  Share2,
  Wrench,
  Video,
  GraduationCap,
  ShoppingBag,
  HelpCircle,
};

type IncomePath = { title: string; detail: string };
type AIResult = {
  category: string;
  description: string;
  earning_range: string;
  income_paths: IncomePath[];
  first_step: string;
};

export default function SkillFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeCategory = SKILL_CATEGORIES.find((c) => c.label === selected);

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
      if (data.error) {
        setError(data.error);
      } else {
        setResult(data);
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "skill_search", { skill_query: skill });
        }
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="skill-finder" className="bg-[#111118] py-12 md:py-[72px] px-6 md:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-11">
          <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
            INTERACTIVE TOOL
          </span>
          <h2 className="font-sans text-[26px] md:text-[38px] font-bold text-white mb-4 leading-tight">
            &ldquo;Yes, I Can Do That&rdquo; — Find Your Skill
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/70 max-w-[560px] leading-[1.8]">
            Type any skill — in English or Filipino. We will show you exactly
            how to earn from it, based on real market data.
          </p>
        </div>

        {/* Tool header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-sans text-[18px] font-bold text-white">
              Skill-to-Income Matcher
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 mt-0.5">
              Type your skill or pick a category below
            </p>
          </div>
          <div className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-[#00C97A] px-3 py-1 rounded-full font-[family-name:var(--font-inter)] text-[11px] font-bold">
            🆓 Free · No sign-up
          </div>
        </div>

        {/* Search input */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="relative flex">
            <input
              type="text"
              placeholder="e.g. cooking, design, phone repair, magluto, nagtatahi..."
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              className="w-full bg-[#222230] border border-white/10 rounded-l-lg py-3 px-4 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-[#E8373A] transition-colors font-[family-name:var(--font-inter)]"
            />
            <button
              onClick={() => handleSearch()}
              className="bg-[#E8373A] px-5 rounded-r-lg flex items-center justify-center hover:opacity-90 transition-colors"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span className="text-white font-bold text-[18px]">→</span>
              )}
            </button>
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2">
            {(["cooking", "Canva", "phone repair", "video editing", "writing"] as const).map((skill) => (
              <button
                key={skill}
                onClick={() => { setSkillInput(skill); handleSearch(skill); }}
                className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-[family-name:var(--font-inter)] text-[12px] text-white/70 hover:bg-[#E8373A]/20 hover:border-[#E8373A]/50 hover:text-[#E8373A] transition-colors"
              >
                {skill}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="animate-pulse space-y-3 p-4 bg-[#18181F] rounded-2xl border border-white/10 mb-6">
            <div className="text-sm text-white/55 mb-3">Finding your income paths...</div>
            <div className="h-3 bg-white/10 rounded w-3/4"></div>
            <div className="h-3 bg-white/10 rounded w-1/2"></div>
            <div className="h-3 bg-white/10 rounded w-2/3"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="border border-[#E8373A] rounded-lg p-4 mt-3 mb-6">
            <p className="text-[#E8373A] text-sm mb-3">{error}</p>
            <button
              onClick={() => { setError(null); setSkillInput(""); }}
              className="text-sm text-white bg-[#E8373A] px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}

        {/* AI Result */}
        {result && !loading && (
          <div className="bg-[#18181F] border border-white/[0.12] rounded-2xl p-6 md:p-8 mb-8">
            {/* Pills */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-[12px] font-bold text-[#00C97A] bg-[#00C97A]/10 border border-[#00C97A]/20 px-3 py-1 rounded-full">
                {result.category}
              </span>
              <span className="text-[12px] font-bold text-[#00C97A] bg-[#00C97A]/10 border border-[#00C97A]/20 px-3 py-1 rounded-full">
                {result.earning_range}
              </span>
            </div>

            {/* Description */}
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7] mb-5">
              {result.description}
            </p>

            {/* Income paths */}
            <div className="mb-2">
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[1px]">
                YOUR 4 INCOME PATHS
              </span>
            </div>
            <div className="flex flex-col divide-y divide-white/[0.06] mb-5">
              {result.income_paths.map((path, i) => (
                <div key={i} className="flex items-start gap-3 py-3">
                  <CheckCircle size={16} color="#00C97A" strokeWidth={2} className="shrink-0 mt-[2px]" />
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white">
                      {path.title}
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/70 mt-0.5">
                      {path.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* First step */}
            <div className="rounded-lg p-3 mb-4" style={{ background: "rgba(255,210,63,0.08)", border: "1px solid rgba(255,210,63,0.2)" }}>
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F] uppercase tracking-[1px] mb-1">
                YOUR FIRST STEP THIS WEEK
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white leading-[1.65]">
                {result.first_step}
              </p>
            </div>

            {/* CTA */}
            <a
              href="/#subscribe-form"
              className="block w-full bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg min-h-[48px] hover:opacity-90 transition-all text-center mb-3"
            >
              Get the Full Guide — Subscribe Free →
            </a>
            <div className="flex justify-center gap-4">
              <a href="https://www.tiktok.com/@cyberussell" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/55 hover:text-white transition-colors">TikTok</a>
              <a href="https://www.facebook.com/cyberussellofficial" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/55 hover:text-white transition-colors">Facebook</a>
              <a href="https://www.youtube.com/@CyberRussell" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/55 hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        )}

        {/* Category grid */}
        <div className="mb-3">
          <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">
            OR PICK A CATEGORY
          </span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
          {SKILL_CATEGORIES.map(({ icon, label }) => {
            const Icon = ICON_MAP[icon];
            const isActive = selected === label;
            return (
              <button
                key={label}
                onClick={() => setSelected(isActive ? null : label)}
                className={`flex flex-col items-center justify-center gap-1 p-4 rounded-xl border min-h-[88px] transition-all duration-200 font-[family-name:var(--font-inter)] text-[12px] font-medium
                  ${isActive
                    ? "bg-[#E8373A]/15 border-[#E8373A]/50 text-[#E8373A]"
                    : "bg-[#18181F] border-white/10 text-white/70 hover:bg-[#E8373A]/10 hover:border-[#E8373A]/30 hover:text-white"
                  }`}
              >
                <Icon
                  style={{ width: 28, height: 28, marginBottom: 10 }}
                  color={isActive ? "#E8373A" : "rgba(255,255,255,0.6)"}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
                <span className="text-center leading-tight">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Category result */}
        {activeCategory && (
          <div className="bg-[#18181F] border border-[#E8373A]/30 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#00C97A] animate-pulse" />
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#00C97A] uppercase tracking-[0.05em]">
                Match Found
              </span>
            </div>
            <h3 className="font-sans text-[22px] font-bold text-white mb-3">{activeCategory.label}</h3>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.8] mb-5">
              {activeCategory.result.description}
            </p>
            <div className="mb-5">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[0.05em]">
                Estimated earning
              </span>
              <p className="font-sans text-[22px] font-bold text-[#00C97A] mt-1">
                {activeCategory.result.earning}
              </p>
            </div>
            <div className="flex flex-col gap-2 mb-6">
              {activeCategory.result.paths.map((path) => (
                <div key={path} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E8373A] mt-[7px] shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">{path}</span>
                </div>
              ))}
              {activeCategory.result.recommendedLink && (
                <a href={activeCategory.result.recommendedLink.url} target="_blank" rel="noopener noreferrer sponsored" className="inline-flex items-center gap-1 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#E8373A] hover:underline mt-1">
                  {activeCategory.result.recommendedLink.text}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Subscribe + follow strip */}
        <div className="bg-gradient-to-r from-[#E8373A]/10 to-[#FFD23F]/10 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-sans text-[20px] font-bold text-white mb-1">Want detailed guides for your skill?</h4>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70">
              Subscribe and follow — we send new income guides every week.
            </p>
          </div>
          <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
            <a
              href="/#subscribe-form"
              className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg min-h-[48px] hover:opacity-90 transition-all text-center"
            >
              Subscribe — Free
            </a>
            <div className="flex justify-center gap-4">
              <a href="https://www.tiktok.com/@cyberussell" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/55 hover:text-white transition-colors">TikTok</a>
              <a href="https://www.facebook.com/cyberussellofficial" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/55 hover:text-white transition-colors">Facebook</a>
              <a href="https://www.youtube.com/@CyberRussell" target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/55 hover:text-white transition-colors">YouTube</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
