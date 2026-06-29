import { Clock, Zap, CheckCircle } from "lucide-react";
import type { Career } from "@/lib/careers/types";

const DIFFICULTY_LABEL: Record<Career["difficulty"], string> = {
  beginner: "Beginner-friendly",
  intermediate: "Some experience needed",
  advanced: "Requires experience",
};

export default function CareerHero({ career }: { career: Career }) {
  return (
    <section className="bg-[#0F0F1A] pt-12 md:pt-20 pb-10 md:pb-14 px-6 md:px-10 relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ background: "radial-gradient(circle at top right, rgba(232,55,58,0.12), transparent 50%)" }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2px] text-[#E8373A] bg-[#E8373A]/10 border border-[#E8373A]/20 px-3 py-1 rounded-full">
            Career Blueprint
          </span>
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2px] text-white/40 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full">
            {career.category}
          </span>
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2px] text-white/40 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full">
            {DIFFICULTY_LABEL[career.difficulty]}
          </span>
        </div>

        <h1 className="font-sans text-[32px] md:text-[48px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
          {career.skill}
        </h1>

        <p className="font-[family-name:var(--font-inter)] text-[17px] md:text-[19px] text-white/60 leading-[1.7] max-w-[640px] mb-8">
          {career.tagline}
        </p>

        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 bg-[#00C97A]/10 border border-[#00C97A]/20 rounded-lg px-4 py-2.5">
            <Zap size={16} className="text-[#00C97A]" strokeWidth={2} />
            <div>
              <span className="font-sans text-[18px] font-bold text-[#00C97A]">
                ₱{career.earning_range.min.toLocaleString()}–₱{career.earning_range.max.toLocaleString()}
              </span>
              <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/40 ml-1">/month</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-lg px-4 py-2.5">
            <Clock size={16} className="text-[#FFD23F]" strokeWidth={2} />
            <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white/70">
              First income in {career.time_to_first_income}
            </span>
          </div>
        </div>

        {career.prerequisites.length > 0 && (
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] w-full mb-1">
              What you need to start
            </span>
            {career.prerequisites.map((p) => (
              <span key={p} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] text-white/50">
                <CheckCircle size={13} className="text-[#00C97A]" strokeWidth={2.5} />
                {p}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
