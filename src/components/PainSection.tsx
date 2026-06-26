import {
  MapPin,
  TrendingDown,
  GraduationCap,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";
import { HERO_BADGE, HERO_SOURCE, HERO_STATS, PAIN_STAT_CARDS, PAIN_ITEMS } from "@/data/content";

const ICON_MAP: Record<string, LucideIcon> = {
  MapPin,
  TrendingDown,
  GraduationCap,
  Lightbulb,
};

export default function PainSection() {
  return (
    <section id="problema" className="bg-[#111118] w-full px-6 md:px-10 py-12 md:py-[72px]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
            THE TRUTH
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-white tracking-tight leading-tight mb-4">
            Why It&apos;s Hard to Earn in the Philippines Right Now
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 max-w-[560px] leading-[1.8]">
            This is not a problem of laziness or lack of talent. It is a
            systemic problem — and the data proves it.
          </p>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 w-fit mt-6">
            <span className="text-[#FFD23F] text-[12px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase">
              {HERO_BADGE}
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 italic mt-2">
            {HERO_SOURCE}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            {HERO_STATS.map(({ value, label, color, bg, border }) => (
              <div key={value} className={`flex flex-col ${bg} border ${border} rounded-lg p-4 min-w-[140px] flex-1`}>
                <span className={`font-sans text-[20px] font-bold ${color}`}>{value}</span>
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Left: Stat cards */}
          <div className="flex flex-col gap-6">
            {PAIN_STAT_CARDS.map(({ stat, title, desc, source }) => (
              <div
                key={stat}
                className="bg-[#18181F] border border-white/[0.12] border-l-[3px] border-l-[#E8373A] rounded-[12px] p-7 hover:border-white/20 transition-colors"
              >
                <div className={`font-sans font-extrabold text-[#E8373A] leading-none mb-4 ${stat.length > 6 ? "text-[28px] md:text-[38px]" : "text-[44px] md:text-[64px]"}`}>
                  {stat}
                </div>
                <h3 className="font-[family-name:var(--font-inter)] text-[16px] font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 mb-6 leading-[1.8]">
                  {desc}
                </p>
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/20 italic">
                  {source}
                </span>
              </div>
            ))}
          </div>

          {/* Right: Pain list */}
          <div className="flex flex-col">
            {PAIN_ITEMS.map(({ icon, title, detail, data }, i) => {
              const Icon = ICON_MAP[icon];
              return (
                <div
                  key={title}
                  className={`flex items-start gap-[14px] py-6 ${i < PAIN_ITEMS.length - 1 ? "border-b border-white/[0.07]" : ""} ${i === 0 ? "pt-0" : ""}`}
                >
                  <div className="w-11 h-11 shrink-0 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-lg flex items-center justify-center mt-[2px]">
                    <Icon size={20} color="#E8373A" strokeWidth={1.8} aria-hidden="true" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-[family-name:var(--font-inter)] text-[16px] font-bold text-white mb-1">
                      {title}
                    </h4>
                    <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.8] mb-2">
                      {detail}
                    </p>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 italic">
                      {data}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
