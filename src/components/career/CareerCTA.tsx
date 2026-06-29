"use client";

import { ArrowLeft, Square } from "lucide-react";
import type { TodaysMission } from "@/lib/careers/types";

export default function CareerCTA({ skill, mission }: { skill: string; mission: TodaysMission }) {
  return (
    <section className="bg-[#111118] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Mission reminder */}
        <div className="bg-gradient-to-br from-[#FFD23F]/[0.06] to-[#E8373A]/[0.04] border border-[#FFD23F]/15 rounded-2xl p-6 md:p-8 mb-8">
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] text-[#FFD23F]">
            Before you leave
          </span>
          <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-white mt-2 mb-5">
            Complete these 3 tasks today.
          </h2>

          <div className="flex flex-col gap-3 mb-4">
            {mission.tasks.map((task, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.06]"
              >
                <Square size={18} className="text-white/25 shrink-0 mt-[1px]" strokeWidth={2} />
                <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.5]">
                  {task}
                </span>
              </div>
            ))}
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35">
            Estimated time: {mission.estimated_time} · No sign-up required · All free
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="bg-[#E8373A] hover:bg-[#FF4A4D] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3.5 px-8 rounded-xl min-h-[48px] flex items-center justify-center gap-2 transition-colors"
          >
            ↑ Back to Phase 1
          </a>
          <a
            href="/"
            className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-medium text-white/40 hover:text-white/60 transition-colors py-3.5 px-6"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            Try a different skill
          </a>
        </div>
      </div>
    </section>
  );
}
