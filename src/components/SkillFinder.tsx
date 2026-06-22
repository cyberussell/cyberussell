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

export default function SkillFinder() {
  const [selected, setSelected] = useState<string | null>(null);
  const activeCategory = SKILL_CATEGORIES.find((c) => c.label === selected);

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
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 max-w-[560px] leading-[1.8]">
            Pick your skill category. We will show you which income paths are
            available for you — based on real market data.
          </p>
        </div>

        {/* Tool header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-sans text-[18px] font-bold text-white">
              Skill-to-Income Matcher
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-0.5">
              Pick your skill category
            </p>
          </div>
          <div className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-[#00C97A] px-3 py-1 rounded-full font-[family-name:var(--font-inter)] text-[11px] font-bold">
            🆓 Free · No sign-up
          </div>
        </div>

        {/* Category grid */}
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
                />
                <span className="text-center leading-tight">{label}</span>
              </button>
            );
          })}
        </div>

        {/* Results area */}
        {activeCategory ? (
          <div className="bg-[#18181F] border border-[#E8373A]/30 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-2 h-2 rounded-full bg-[#00C97A] animate-pulse" />
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#00C97A] uppercase tracking-[0.05em]">
                Match Found
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1">
                <h3 className="font-sans text-[22px] font-bold text-white mb-3">
                  {activeCategory.label}
                </h3>
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
                      <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.6]">
                        {path}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg min-h-[48px] hover:opacity-90 transition-all w-full md:w-auto">
                  ↓ {activeCategory.result.button}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#18181F] border border-white/10 rounded-2xl p-6 md:p-8 mb-8 text-center">
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/40 leading-[1.8]">
              Select a skill category above to see matching income opportunities.
            </p>
          </div>
        )}

        {/* Download CTA strip */}
        <div className="bg-gradient-to-r from-[#E8373A]/10 to-[#FFD23F]/10 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-sans text-[20px] font-bold text-white mb-1">
              Want more detail?
            </h4>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55">
              Download the complete Skill-to-Income Guide — free, PDF, 15 pages.
            </p>
          </div>
          <button className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg min-h-[48px] hover:opacity-90 transition-all shrink-0 w-full md:w-auto">
            ↓ Download Free
          </button>
        </div>
      </div>
    </section>
  );
}
