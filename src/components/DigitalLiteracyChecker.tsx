"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  categories,
  getQuestionsByCategory,
  type DLCategory,
  type DLQuestion,
  type Difficulty,
} from "@/lib/digitalLiteracyQuestions";

type Stage = "intro" | "quiz" | "loading" | "results" | "error";

type Answer = { id: string; category: DLCategory; selectedIndex: number; correct: boolean };

type CareerMatch = {
  slug: string;
  title: string;
  description: string;
  matchPercent: number;
  skillsDemonstrated: DLCategory[];
  skillsToImprove: string[];
  estimatedPrep: string;
  learnMoreHref: string;
};

type Report = {
  overallScore: number;
  skillLevel: string;
  categoryScores: Record<string, number>;
  narrative: string;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  careerMatches: CareerMatch[];
};

const DAILY_KEY = "dlc_daily";
const SESSION_KEY = "dlc_session_id";

function getDailyCount(): number {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return 0;
    const { count, date } = JSON.parse(raw);
    if (date !== new Date().toISOString().slice(0, 10)) return 0;
    return count;
  } catch {
    return 0;
  }
}

function incrementDailyCount() {
  const today = new Date().toISOString().slice(0, 10);
  const current = getDailyCount();
  localStorage.setItem(DAILY_KEY, JSON.stringify({ count: current + 1, date: today }));
}

function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return crypto.randomUUID();
  }
}

const tierOrder: Difficulty[] = ["easy", "medium", "hard"];

const levelColors: Record<string, { color: string; bg: string; border: string }> = {
  Beginner: { color: "#E8373A", bg: "rgba(232,55,58,0.08)", border: "rgba(232,55,58,0.25)" },
  Developing: { color: "#FF6B35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.25)" },
  Competent: { color: "#FFD23F", bg: "rgba(255,210,63,0.08)", border: "rgba(255,210,63,0.25)" },
  "Job Ready": { color: "#4F8EF7", bg: "rgba(79,142,247,0.08)", border: "rgba(79,142,247,0.25)" },
  Advanced: { color: "#00C97A", bg: "rgba(0,201,122,0.08)", border: "rgba(0,201,122,0.25)" },
  Expert: { color: "#00C97A", bg: "rgba(0,201,122,0.08)", border: "rgba(0,201,122,0.25)" },
};

export default function DigitalLiteracyChecker() {
  const [stage, setStage] = useState<Stage>("intro");

  const [phaseIndex, setPhaseIndex] = useState(0);
  const [catPos, setCatPos] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [remaining, setRemaining] = useState(10);

  useEffect(() => {
    setRemaining(10 - getDailyCount());
  }, []);

  const currentQuestion: DLQuestion | null = useMemo(() => {
    if (stage !== "quiz" || phaseIndex >= tierOrder.length) return null;
    const cat = categories[catPos];
    const tier = tierOrder[phaseIndex];
    return getQuestionsByCategory(cat).find((q) => q.difficulty === tier) || null;
  }, [stage, phaseIndex, catPos]);

  // Shuffle option display order per question, while keeping `selected`/scoring tied to the canonical index.
  const shuffledOptionOrder = useMemo(() => {
    if (!currentQuestion) return [];
    const order = currentQuestion.options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return order;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?.id]);

  const totalAnswered = answers.length;
  const totalQuestions = categories.length * tierOrder.length;
  const overallProgress = phaseIndex * categories.length + catPos;

  const startQuiz = useCallback(() => {
    if (remaining <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free checks.");
      return;
    }
    setPhaseIndex(0);
    setCatPos(0);
    setAnswers([]);
    setSelected(null);
    setError("");
    setStage("quiz");
  }, [remaining]);

  const submitReport = useCallback(
    async (finalAnswers: Answer[]) => {
      setStage("loading");
      try {
        const res = await fetch("/api/digital-literacy-checker", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: getSessionId(),
            answers: finalAnswers.map((a) => ({ id: a.id, selectedIndex: a.selectedIndex })),
          }),
        });

        if (res.status === 429) {
          setError("Daily limit reached. Come back tomorrow for 10 more free checks.");
          setStage("intro");
          return;
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          setError(data.error || "Something went wrong. Please try again.");
          setStage("error");
          return;
        }

        const data: Report = await res.json();
        setReport(data);
        incrementDailyCount();
        setRemaining((r) => r - 1);
        setStage("results");
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("event", "tool_used", {
            event_category: "tools",
            event_label: "digital-literacy-checker",
            value: 1,
          });
        }
      } catch {
        setError("Network error. Please check your connection and try again.");
        setStage("error");
      }
    },
    []
  );

  const handleContinue = useCallback(() => {
    if (selected === null || !currentQuestion) return;

    const correct = selected === currentQuestion.correctIndex;
    const newAnswers = [
      ...answers,
      { id: currentQuestion.id, category: currentQuestion.category, selectedIndex: selected, correct },
    ];
    setAnswers(newAnswers);
    setSelected(null);

    const isLastCategoryInPhase = catPos >= categories.length - 1;
    const isLastPhase = phaseIndex >= tierOrder.length - 1;

    if (isLastCategoryInPhase && isLastPhase) {
      submitReport(newAnswers);
      return;
    }

    if (isLastCategoryInPhase) {
      setPhaseIndex((p) => p + 1);
      setCatPos(0);
      return;
    }

    setCatPos((c) => c + 1);
  }, [selected, currentQuestion, answers, catPos, phaseIndex, submitReport]);

  const restart = () => {
    setStage("intro");
    setReport(null);
    setAnswers([]);
    setPhaseIndex(0);
    setCatPos(0);
    setSelected(null);
    setError("");
  };

  // ---------- Intro ----------
  if (stage === "intro") {
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8">
          <h3 className="font-sans text-[20px] font-bold text-white mb-2">Check your digital literacy</h3>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] mb-5">
            Answer questions across 9 real-world skill areas — internet, email, cloud files, video calls,
            security, and more. Questions are grouped into Easy, Medium, and Hard sections. Takes 5–10 minutes.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((c) => (
              <span
                key={c}
                className="font-[family-name:var(--font-inter)] text-[12px] text-white/55 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {c}
              </span>
            ))}
          </div>

          {error && (
            <div className="mb-4 bg-[#E8373A]/8 border border-[#E8373A]/20 rounded-[8px] px-4 py-3">
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#ff9b9b]">{error}</p>
            </div>
          )}

          <button
            onClick={startQuiz}
            className="w-full bg-[#4F8EF7] hover:bg-[#4F8EF7]/90 text-white font-sans text-[15px] font-bold py-4 rounded-[10px] transition-all"
          >
            Start Assessment
          </button>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 text-center mt-3">
            {remaining} free checks left today · No account required
          </p>
        </div>
      </div>
    );
  }

  // ---------- Quiz ----------
  if (stage === "quiz" && currentQuestion) {
    const overallPct = Math.round((overallProgress / totalQuestions) * 100);
    const phaseLabel = currentQuestion.difficulty.toUpperCase();
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
              {currentQuestion.category} · Question {catPos + 1} of {categories.length}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1px] text-[#4F8EF7]">
              {phaseLabel} section
            </span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F8EF7] rounded-full transition-all duration-300"
              style={{ width: `${overallPct}%` }}
            />
          </div>
        </div>

        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-7">
          <p className="font-sans text-[17px] font-semibold text-white mb-5 leading-relaxed">
            {currentQuestion.question}
          </p>
          <div className="space-y-2.5">
            {shuffledOptionOrder.map((oi) => {
              const opt = currentQuestion.options[oi];
              const isSelected = selected === oi;
              return (
                <button
                  key={oi}
                  onClick={() => setSelected(oi)}
                  className={`w-full flex items-center gap-3 p-4 rounded-[10px] border text-left transition-all ${
                    isSelected
                      ? "border-[#4F8EF7]/60 bg-[#4F8EF7]/[0.08]"
                      : "border-white/[0.08] hover:border-white/[0.16] hover:bg-white/[0.02]"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      isSelected ? "border-[#4F8EF7] bg-[#4F8EF7]" : "border-white/20"
                    }`}
                  >
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80">{opt}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleContinue}
            disabled={selected === null}
            className="w-full mt-6 bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>

        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/20 text-center mt-4">
          {totalAnswered} question{totalAnswered === 1 ? "" : "s"} answered
        </p>
      </div>
    );
  }

  // ---------- Loading ----------
  if (stage === "loading") {
    return (
      <div className="max-w-[640px] mx-auto flex flex-col items-center justify-center py-20">
        <span className="w-8 h-8 rounded-full border-2 border-white/15 border-t-[#4F8EF7] animate-spin mb-4" />
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
          Analyzing your results with AI...
        </p>
      </div>
    );
  }

  // ---------- Error ----------
  if (stage === "error") {
    return (
      <div className="max-w-[640px] mx-auto text-center py-16">
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 mb-6">
          {error || "Something went wrong."}
        </p>
        <button
          onClick={restart}
          className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  // ---------- Results ----------
  if (stage === "results" && report) {
    const style = levelColors[report.skillLevel] || levelColors["Competent"];
    const circumference = 2 * Math.PI * 82;
    const gaugeOffset = circumference - (report.overallScore / 100) * circumference;

    return (
      <div className="max-w-[760px] mx-auto">
        {/* Score Card */}
        <div className="rounded-[14px] p-6 md:p-8 mb-6 border" style={{ backgroundColor: style.bg, borderColor: style.border }}>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="relative w-[180px] h-[180px] shrink-0 mx-auto md:mx-0">
              <svg width="180" height="180" viewBox="0 0 200 200" className="-rotate-90">
                <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke={style.color}
                  strokeWidth="14"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={gaugeOffset}
                  className="transition-all duration-1000 ease-out"
                  style={{ filter: `drop-shadow(0 0 10px ${style.color}50)` }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-sans text-[38px] font-bold" style={{ color: style.color }}>
                  {report.overallScore}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 uppercase tracking-[0.08em]">
                  / 100
                </span>
              </div>
            </div>
            <div className="flex-1">
              <div className="font-sans text-[12px] font-bold tracking-[2px] uppercase mb-2" style={{ color: style.color }}>
                Digital Literacy Level
              </div>
              <h2 className="font-sans text-[28px] md:text-[32px] font-bold mb-3" style={{ color: style.color }}>
                {report.skillLevel}
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7]">
                {report.narrative}
              </p>
            </div>
          </div>
        </div>

        {/* Category Scores */}
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
          <h3 className="font-sans text-[16px] font-bold text-white mb-4">Skill Breakdown</h3>
          <div className="space-y-3.5">
            {categories.map((cat) => {
              const score = report.categoryScores[cat] ?? 0;
              return (
                <div key={cat}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/70">{cat}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50">{score}%</span>
                  </div>
                  <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${score}%`, backgroundColor: score >= 70 ? "#00C97A" : score >= 40 ? "#FFD23F" : "#E8373A" }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strengths / Weaknesses */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="bg-[#00C97A]/5 border border-[#00C97A]/20 rounded-[10px] p-5">
            <h3 className="font-sans text-[15px] font-bold text-[#00C97A] mb-3">Strengths</h3>
            <ul className="space-y-2">
              {report.strengths.map((s, i) => (
                <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                  <span className="text-[#00C97A] mt-0.5 shrink-0">&#x2714;</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[10px] p-5">
            <h3 className="font-sans text-[15px] font-bold text-[#FFD23F] mb-3">Areas to Improve</h3>
            <ul className="space-y-2">
              {report.weaknesses.map((w, i) => (
                <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                  <span className="text-[#FFD23F] mt-0.5 shrink-0">&#x26A0;</span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-[#222230] border border-white/[0.08] rounded-[10px] p-5 mb-6">
          <h3 className="font-sans text-[16px] font-bold text-white mb-3">Learning Recommendations</h3>
          <ol className="space-y-2">
            {report.recommendations.map((r, i) => (
              <li key={i} className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 flex items-start gap-2.5">
                <span className="text-white/30 font-bold shrink-0">{i + 1}.</span>
                {r}
              </li>
            ))}
          </ol>
        </div>

        {/* Career Matches */}
        <div className="mb-6">
          <h3 className="font-sans text-[16px] font-bold text-white mb-4">Careers That Match Your Skills</h3>
          <div className="space-y-3">
            {report.careerMatches.map((career) => (
              <div key={career.slug} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <h4 className="font-sans text-[16px] font-bold text-white">{career.title}</h4>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-0.5">{career.description}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="font-sans text-[22px] font-bold text-[#4F8EF7]">{career.matchPercent}%</span>
                    <p className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 uppercase tracking-[0.05em]">match</p>
                  </div>
                </div>
                {career.skillsDemonstrated.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {career.skillsDemonstrated.map((s) => (
                      <span key={s} className="font-[family-name:var(--font-inter)] text-[11px] text-[#00C97A] bg-[#00C97A]/10 border border-[#00C97A]/20 px-2.5 py-1 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
                  <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
                    Prep time: <span className="text-white/60 font-semibold">{career.estimatedPrep}</span>
                  </span>
                  <a
                    href={career.learnMoreHref}
                    className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#4F8EF7] hover:underline"
                  >
                    Learn more &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 flex-wrap mb-12">
          <button
            onClick={restart}
            className="bg-[#4F8EF7]/10 border border-[#4F8EF7]/25 text-[#4F8EF7] font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-[#4F8EF7]/20 transition-colors"
          >
            Retake Assessment
          </button>
          <a
            href="/tools"
            className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
          >
            Explore More Tools
          </a>
        </div>
      </div>
    );
  }

  return null;
}
