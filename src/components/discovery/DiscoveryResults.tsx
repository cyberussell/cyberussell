"use client";

import { Sparkles, Target, Clock, Star, ArrowRight, RotateCcw, Download, Square, CheckSquare } from "lucide-react";
import { useState } from "react";
import type { DiscoveryResult } from "@/lib/discovery/types";

export default function DiscoveryResults({ result, onRestart }: { result: DiscoveryResult; onRestart: () => void }) {
  const [missionChecked, setMissionChecked] = useState<boolean[]>(result.todays_mission.map(() => false));
  const topMatch = result.career_matches[0];

  function toggleMission(i: number) {
    setMissionChecked((prev) => prev.map((v, j) => (j === i ? !v : v)));
  }

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 md:pt-16 pb-16">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#00C97A] uppercase tracking-[2px] mb-4">
          <Sparkles size={14} strokeWidth={2} />
          Discovery Complete
        </span>
        <h1 className="font-sans text-[32px] md:text-[42px] font-extrabold text-white leading-[1.1] mb-3">
          You have more skills than you think.
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/45 max-w-[480px] mx-auto">
          Here&apos;s what we discovered from your answers — and the best path forward.
        </p>
      </div>

      {/* Hidden Skills */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Sparkles size={18} className="text-[#FFD23F]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] font-bold text-white">Your Hidden Skills</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {result.hidden_skills.map((skill) => (
            <div key={skill.name} className="bg-[#18181F] border border-white/[0.08] rounded-xl p-5">
              <h3 className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#FFD23F] mb-1.5">{skill.name}</h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{skill.why}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Strengths */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Target size={18} className="text-[#E8373A]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] font-bold text-white">Your Strongest Strengths</h2>
        </div>
        <div className="bg-[#18181F] border border-white/[0.08] rounded-xl p-6 flex flex-col gap-4">
          {result.strengths.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white w-[140px] shrink-0">{s.name}</span>
              <div className="flex-1 h-[8px] bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#E8373A] to-[#FFD23F] transition-all duration-1000"
                  style={{ width: `${s.score}%` }}
                />
              </div>
              <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/40 w-[40px] text-right">{s.score}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Career Matches */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-5">
          <Star size={18} className="text-[#00C97A]" strokeWidth={2} />
          <h2 className="font-sans text-[22px] font-bold text-white">Best Career Matches</h2>
        </div>
        <div className="flex flex-col gap-4">
          {result.career_matches.map((match, i) => (
            <div
              key={match.slug}
              className={`bg-[#18181F] rounded-xl overflow-hidden ${i === 0 ? "border-2 border-[#FFD23F]/30" : "border border-white/[0.08]"}`}
            >
              {i === 0 && (
                <div className="bg-[#FFD23F]/[0.08] px-5 py-2 border-b border-[#FFD23F]/15">
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[1px]">Best Match</span>
                </div>
              )}
              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-sans text-[20px] font-bold text-white">{match.skill}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star
                        key={si}
                        size={14}
                        className={si < Math.round(match.match_score / 20) ? "text-[#FFD23F]" : "text-white/10"}
                        strokeWidth={0}
                        fill={si < Math.round(match.match_score / 20) ? "#FFD23F" : "rgba(255,255,255,0.06)"}
                      />
                    ))}
                    <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#FFD23F] ml-1">{match.match_score}%</span>
                  </div>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] mb-4">{match.why_it_fits}</p>
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] font-[family-name:var(--font-inter)]">
                  <span className="text-[#00C97A] font-bold">{match.beginner_income}</span>
                  <span className="text-white/30">{match.difficulty}</span>
                  <span className="flex items-center gap-1 text-white/30">
                    <Clock size={11} strokeWidth={2} />
                    {match.time_to_first_income}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Next Step */}
      {topMatch && (
        <section className="mb-10">
          <div className="bg-gradient-to-br from-[#E8373A]/[0.08] to-[#FFD23F]/[0.05] border border-[#E8373A]/20 rounded-2xl p-6 md:p-8 text-center">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#E8373A] uppercase tracking-[2.5px] mb-3 block">
              Recommended Next Step
            </span>
            <h2 className="font-sans text-[24px] md:text-[28px] font-bold text-white mb-3">
              Start your {topMatch.skill} journey today.
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mb-6 max-w-[400px] mx-auto">
              Your Career Blueprint has everything you need — a step-by-step roadmap, income paths, tools, and platforms.
            </p>
            <a
              href={`/careers/${topMatch.slug}`}
              className="inline-flex items-center gap-2 bg-[#E8373A] hover:bg-[#FF4A4D] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-4 px-8 rounded-xl transition-colors"
            >
              Continue to Your Career Blueprint
              <ArrowRight size={18} strokeWidth={2.5} />
            </a>
          </div>
        </section>
      )}

      {/* Today's Mission */}
      <section className="mb-10">
        <div className="bg-[#18181F] border border-[#FFD23F]/15 rounded-2xl p-6 md:p-8">
          <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F] uppercase tracking-[2.5px] mb-1 block">
            Today&apos;s First Mission
          </span>
          <h3 className="font-sans text-[20px] font-bold text-white mb-5">
            Do these 3 things before you close this page.
          </h3>
          <div className="flex flex-col gap-3 mb-4">
            {result.todays_mission.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleMission(i)}
                className={`flex items-start gap-3 text-left px-4 py-3.5 rounded-xl border transition-all duration-200 ${
                  missionChecked[i]
                    ? "bg-[#00C97A]/[0.06] border-[#00C97A]/20"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]"
                }`}
              >
                {missionChecked[i] ? (
                  <CheckSquare size={18} className="text-[#00C97A] shrink-0 mt-[1px]" strokeWidth={2} />
                ) : (
                  <Square size={18} className="text-white/25 shrink-0 mt-[1px]" strokeWidth={2} />
                )}
                <span className={`font-[family-name:var(--font-inter)] text-[14px] leading-[1.5] ${missionChecked[i] ? "text-white/40 line-through" : "text-white/70"}`}>
                  {item.task}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-white/20" strokeWidth={2} />
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/25">
              Estimated time: {result.estimated_mission_time}
            </span>
          </div>
        </div>
      </section>

      {/* Download + Restart */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 transition-colors py-2.5 px-5 rounded-lg hover:bg-white/[0.04]"
        >
          <RotateCcw size={14} strokeWidth={2} />
          Start Over
        </button>
      </div>
    </div>
  );
}
