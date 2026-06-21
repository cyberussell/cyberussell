import { ArrowRight, Wallet } from "lucide-react";
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

export default function Hero() {
  return (
    <main id="hero" className="bg-[#0F0F1A] relative flex flex-col flex-grow overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ background: "radial-gradient(circle at top right, rgba(232,55,58,0.14), transparent 50%)" }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pt-16 md:pt-20 pb-12 flex flex-col lg:flex-row gap-12 lg:gap-6 items-start relative z-10">
        {/* Left column */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 w-fit">
            <span className="text-[#FFD23F] text-[12px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase">
              {HERO_BADGE}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-[family-name:var(--font-syne)] text-[34px] md:text-[52px] font-extrabold leading-[1.1] tracking-tight">
            <span className="text-white">2.41 million</span>{" "}
            <span className="text-[#E8373A]">Filipinos have no job.</span>
            <br />
            <span className="text-white">Will you be the next one</span>{" "}
            <span className="text-[#FFD23F]">to break free?</span>
          </h1>

          {/* Subtext */}
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/65 max-w-[480px] leading-[1.8]">
            {HERO_SUBTEXT}
          </p>

          {/* Source */}
          <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 italic">
            {HERO_SOURCE}
          </p>

          {/* Stat pills */}
          <div className="flex flex-wrap gap-4 mt-2">
            {HERO_STATS.map(({ value, label, color, bg, border }) => (
              <div key={value} className={`flex flex-col ${bg} border ${border} rounded-lg p-4 min-w-[140px] flex-1`}>
                <span className={`font-[family-name:var(--font-syne)] text-[20px] font-bold ${color}`}>{value}</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-4 flex flex-col gap-3">
            <button
              className="bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[17px] py-4 px-9 rounded-[10px] w-full md:max-w-[380px] min-h-[52px] flex justify-center items-center gap-2 hover:opacity-90 transition-all"
              style={{ boxShadow: "0 0 20px rgba(232,55,58,0.3)" }}
            >
              ↓ Get the Free Guide
            </button>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 text-center md:text-left md:max-w-[380px]">
              {HERO_CTA_BELOW}
            </p>
          </div>
        </div>

        {/* Right column: Skill Finder widget */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0">
          <div className="bg-[#18181F] border border-white/[0.12] rounded-2xl w-full max-w-[480px] overflow-hidden flex flex-col shadow-2xl">
            <div className="h-[2px] w-full bg-gradient-to-r from-[#E8373A] to-[#FFD23F]" />

            <div className="p-6 md:p-8 flex flex-col gap-6">
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
                    className="w-full bg-[#222230] border border-white/10 rounded-l-lg py-3 px-4 text-white text-[14px] placeholder-white/30 focus:outline-none focus:border-[#E8373A] transition-colors font-[family-name:var(--font-inter)]"
                  />
                  <button className="bg-[#E8373A] px-4 rounded-r-lg flex items-center justify-center hover:opacity-90 transition-colors">
                    <ArrowRight size={20} color="white" strokeWidth={2} />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {HERO_WIDGET_CHIPS.map((skill) => (
                  <button
                    key={skill}
                    className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 font-[family-name:var(--font-inter)] text-[12px] text-white/70 hover:bg-[#E8373A]/20 hover:border-[#E8373A]/50 hover:text-[#E8373A] transition-colors"
                  >
                    {skill}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                {HERO_WIDGET_STATS.map(({ value, label, color }) => (
                  <div key={label} className="bg-[#222230] p-4 rounded-lg flex flex-col justify-center items-center border border-white/5">
                    <span className={`font-[family-name:var(--font-syne)] text-[20px] font-bold ${color}`}>{value}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/40 uppercase tracking-[0.05em] text-center mt-1">{label}</span>
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
