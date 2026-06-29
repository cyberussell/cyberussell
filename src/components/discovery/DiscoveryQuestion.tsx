"use client";

import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import type { Question } from "@/lib/discovery/questions";

interface Props {
  question: Question;
  selected: string[];
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onBack?: () => void;
  canAdvance: boolean;
  step: number;
  totalSteps: number;
  minutesLeft: number;
}

export default function DiscoveryQuestion({ question, selected, onSelect, onNext, onBack, canAdvance, step, totalSteps, minutesLeft }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-12 md:pt-20 pb-16 min-h-[80vh] flex flex-col">
      {/* Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/30 uppercase tracking-[1px]">
            Question {step} of {totalSteps}
          </span>
          <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/25">
            <Clock size={12} strokeWidth={2} />
            About {minutesLeft} {minutesLeft === 1 ? "minute" : "minutes"} remaining
          </span>
        </div>
        <div className="h-[4px] bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#E8373A] to-[#FFD23F] rounded-full transition-all duration-500"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1">
        <h1 className="font-sans text-[28px] md:text-[36px] font-bold text-white leading-tight mb-3">
          {question.title}
        </h1>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-8">
          {question.subtitle}
        </p>

        {/* Options */}
        <div className={`grid gap-3 ${question.options.length > 6 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
          {question.options.map((option) => {
            const isSelected = selected.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => {
                  onSelect(option.id);
                  if (question.type === "single") {
                    setTimeout(onNext, 300);
                  }
                }}
                className={`flex items-center gap-3 px-5 py-4 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? "bg-[#FFD23F]/[0.08] border-[#FFD23F]/30 shadow-[0_0_20px_rgba(255,210,63,0.06)]"
                    : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
                }`}
              >
                {option.emoji && (
                  <span className="text-[20px] shrink-0">{option.emoji}</span>
                )}
                <span className={`font-[family-name:var(--font-inter)] text-[14px] font-medium ${isSelected ? "text-[#FFD23F]" : "text-white/70"}`}>
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      {question.type === "multi" && (
        <div className="flex items-center justify-between pt-8 mt-auto">
          {onBack ? (
            <button onClick={onBack} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 transition-colors py-2 px-3 rounded-lg hover:bg-white/[0.04]">
              <ArrowLeft size={15} strokeWidth={2} />
              Back
            </button>
          ) : <div />}
          <button
            onClick={onNext}
            disabled={!canAdvance}
            className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[14px] font-bold hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {step === totalSteps ? "See My Results" : "Continue"}
            <ArrowRight size={16} strokeWidth={2.5} />
          </button>
        </div>
      )}

      {question.type === "single" && onBack && (
        <div className="pt-8 mt-auto">
          <button onClick={onBack} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 transition-colors py-2 px-3 rounded-lg hover:bg-white/[0.04]">
            <ArrowLeft size={15} strokeWidth={2} />
            Back
          </button>
        </div>
      )}
    </div>
  );
}
