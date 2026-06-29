"use client";

import { useState } from "react";
import { Clock, Square, CheckSquare } from "lucide-react";
import type { TodaysMission } from "@/lib/careers/types";

export default function CareerMission({ mission }: { mission: TodaysMission }) {
  const [checked, setChecked] = useState<boolean[]>(mission.tasks.map(() => false));

  function toggle(i: number) {
    setChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  }

  const completed = checked.filter(Boolean).length;

  return (
    <section className="bg-[#0F0F1A] py-10 md:py-14 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#FFD23F]/[0.06] to-[#E8373A]/[0.04] border border-[#FFD23F]/15 rounded-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] text-[#FFD23F]">
                Today&apos;s Mission
              </span>
              <h3 className="font-sans text-[20px] md:text-[24px] font-bold text-white mt-1">
                Complete these before you leave.
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] rounded-lg px-3 py-2 shrink-0">
              <Clock size={14} className="text-[#FFD23F]" strokeWidth={2} />
              <span className="font-[family-name:var(--font-inter)] text-[12px] font-medium text-white/50">
                {mission.estimated_time}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {mission.tasks.map((task, i) => (
              <button
                key={i}
                onClick={() => toggle(i)}
                className={`flex items-start gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  checked[i]
                    ? "bg-[#00C97A]/[0.06] border-[#00C97A]/20"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                }`}
              >
                {checked[i] ? (
                  <CheckSquare size={18} className="text-[#00C97A] shrink-0 mt-[1px]" strokeWidth={2} />
                ) : (
                  <Square size={18} className="text-white/25 shrink-0 mt-[1px]" strokeWidth={2} />
                )}
                <span
                  className={`font-[family-name:var(--font-inter)] text-[14px] leading-[1.5] transition-colors ${
                    checked[i] ? "text-white/40 line-through" : "text-white/75"
                  }`}
                >
                  {task}
                </span>
              </button>
            ))}
          </div>

          {completed === mission.tasks.length && (
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#00C97A] font-medium mt-4 text-center">
              All tasks complete — you&apos;re ahead of 90% of beginners. Keep going.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
