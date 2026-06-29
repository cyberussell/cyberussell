import { Flag } from "lucide-react";
import type { RoadmapPhase } from "@/lib/careers/types";

const PHASE_COLORS = [
  { dot: "bg-[#E8373A]", border: "border-[#E8373A]/20", bg: "bg-[#E8373A]/5" },
  { dot: "bg-[#FFD23F]", border: "border-[#FFD23F]/20", bg: "bg-[#FFD23F]/5" },
  { dot: "bg-[#3B82F6]", border: "border-[#3B82F6]/20", bg: "bg-[#3B82F6]/5" },
  { dot: "bg-[#00C97A]", border: "border-[#00C97A]/20", bg: "bg-[#00C97A]/5" },
];

export default function CareerRoadmap({ roadmap }: { roadmap: RoadmapPhase[] }) {
  return (
    <section className="bg-[#0F0F1A] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
          Your Roadmap
        </span>
        <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-white leading-tight mb-4">
          Step-by-step — from zero to earning.
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 mb-10">
          Follow each phase in order. Don&apos;t skip ahead until you hit the milestone.
        </p>

        <div className="flex flex-col gap-6">
          {roadmap.map((phase, i) => {
            const color = PHASE_COLORS[i % PHASE_COLORS.length];
            return (
              <div key={phase.phase} className={`bg-[#18181F] border ${color.border} rounded-xl overflow-hidden`}>
                <div className={`flex items-center justify-between px-6 py-4 border-b ${color.border} ${color.bg}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${color.dot}`} />
                    <h3 className="font-sans text-[18px] font-bold text-white">
                      Phase {phase.phase}: {phase.title}
                    </h3>
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/35 uppercase tracking-[0.05em]">
                    {phase.duration}
                  </span>
                </div>

                <div className="px-6 py-5 flex flex-col gap-4">
                  {phase.steps.map((step, j) => (
                    <div key={j} className="flex items-start gap-3">
                      <span className="font-sans text-[14px] font-bold text-white/20 mt-[1px] w-5 shrink-0 text-right">
                        {j + 1}
                      </span>
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white leading-[1.5]">
                          {step.action}
                        </p>
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7] mt-0.5">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={`flex items-center gap-2 px-6 py-3 border-t ${color.border} ${color.bg}`}>
                  <Flag size={13} className="text-white/30" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/45">
                    Milestone: {phase.milestone}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
