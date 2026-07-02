"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { aiTasks, aiCategories, promptScenarios, type AICategory } from "@/lib/aiConfidenceTasks";

type Stage = "intro" | "quiz" | "loading" | "results" | "error";

type MCQResult = { taskId: string; category: AICategory; score: number; timeMs: number };
type PromptSubmission = { taskId: string; category: AICategory; prompt: string; timeMs: number };
type PromptFeedback = { taskId: string; score: number; feedback: string };

type CareerMatch = {
  slug: string;
  title: string;
  description: string;
  matchPercent: number;
  skillsDemonstrated: AICategory[];
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
  promptFeedback: PromptFeedback[];
};

const DAILY_KEY = "aica_daily";
const SESSION_KEY = "aica_session_id";

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

const levelColors: Record<string, { color: string; bg: string; border: string }> = {
  Beginner: { color: "#E8373A", bg: "rgba(232,55,58,0.08)", border: "rgba(232,55,58,0.25)" },
  Developing: { color: "#FF6B35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.25)" },
  Competent: { color: "#FFD23F", bg: "rgba(255,210,63,0.08)", border: "rgba(255,210,63,0.25)" },
  "Job Ready": { color: "#4F8EF7", bg: "rgba(79,142,247,0.08)", border: "rgba(79,142,247,0.25)" },
  Advanced: { color: "#00C97A", bg: "rgba(0,201,122,0.08)", border: "rgba(0,201,122,0.25)" },
  Expert: { color: "#00C97A", bg: "rgba(0,201,122,0.08)", border: "rgba(0,201,122,0.25)" },
};

// ---------- Task components ----------

function ScenarioTask({
  question,
  options,
  correctIndex,
  onComplete,
}: {
  question: string;
  options: string[];
  correctIndex: number;
  onComplete: (score: number, timeMs: number) => void;
}) {
  const [selected, setSelected] = useState<number | null>(null);
  const startRef = useRef<number>(Date.now());

  const submit = () => {
    if (selected === null) return;
    const timeMs = Date.now() - startRef.current;
    onComplete(selected === correctIndex ? 100 : 0, timeMs);
  };

  return (
    <div>
      <p className="font-sans text-[16px] font-semibold text-white mb-5 leading-relaxed whitespace-pre-line">{question}</p>
      <div className="space-y-2.5 mb-6">
        {options.map((opt, oi) => {
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
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
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
        onClick={submit}
        disabled={selected === null}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}

function PromptTask({
  taskId,
  onComplete,
}: {
  taskId: string;
  onComplete: (prompt: string, timeMs: number) => void;
}) {
  const scenario = promptScenarios[taskId];
  const [value, setValue] = useState("");
  const startRef = useRef<number | null>(null);

  const submit = () => {
    if (!value.trim()) return;
    const timeMs = startRef.current ? Date.now() - startRef.current : 0;
    onComplete(value.trim(), timeMs);
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1px] text-[#4F8EF7] bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 px-2.5 py-1 rounded-full">
          Write a real prompt
        </span>
      </div>
      <p className="font-sans text-[16px] font-semibold text-white mb-5 leading-relaxed">{scenario?.instruction}</p>
      <textarea
        value={value}
        onChange={(e) => {
          if (startRef.current === null) startRef.current = Date.now();
          setValue(e.target.value);
        }}
        placeholder="Type the exact prompt you'd send to an AI assistant..."
        maxLength={2000}
        className="w-full min-h-[130px] resize-y bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[14px] leading-[1.6] p-4 placeholder:text-white/20 focus:outline-none focus:border-[#4F8EF7]/40 transition-colors mb-4"
      />
      <button
        onClick={submit}
        disabled={!value.trim()}
        className="w-full bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[15px] font-bold py-4 rounded-[10px] hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Submit Prompt
      </button>
      <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 text-center mt-3">
        Graded by AI right after you finish the assessment.
      </p>
    </div>
  );
}

// ---------- Main component ----------

export default function AIConfidenceAnalyzer() {
  const [stage, setStage] = useState<Stage>("intro");

  const [taskIndex, setTaskIndex] = useState(0);
  const [mcqResults, setMcqResults] = useState<MCQResult[]>([]);
  const [promptSubmissions, setPromptSubmissions] = useState<PromptSubmission[]>([]);
  const [error, setError] = useState("");
  const [report, setReport] = useState<Report | null>(null);
  const [remaining, setRemaining] = useState(10);

  useEffect(() => {
    setRemaining(10 - getDailyCount());
  }, []);

  const currentTask = stage === "quiz" ? aiTasks[taskIndex] : null;
  const totalTasks = aiTasks.length;
  const totalCompleted = mcqResults.length + promptSubmissions.length;

  const startQuiz = useCallback(() => {
    if (remaining <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free checks.");
      return;
    }
    setTaskIndex(0);
    setMcqResults([]);
    setPromptSubmissions([]);
    setError("");
    setStage("quiz");
  }, [remaining]);

  const submitReport = useCallback(
    async (finalMcq: MCQResult[], finalPrompts: PromptSubmission[]) => {
      setStage("loading");
      try {
        const res = await fetch("/api/ai-confidence-analyzer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId: getSessionId(),
            mcqResults: finalMcq,
            promptSubmissions: finalPrompts,
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
            event_label: "ai-confidence-analyzer",
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

  const advanceOrSubmit = useCallback(
    (finalMcq: MCQResult[], finalPrompts: PromptSubmission[]) => {
      if (taskIndex >= totalTasks - 1) {
        submitReport(finalMcq, finalPrompts);
      } else {
        setTaskIndex((i) => i + 1);
      }
    },
    [taskIndex, totalTasks, submitReport]
  );

  const handleMCQComplete = useCallback(
    (score: number, timeMs: number) => {
      if (!currentTask) return;
      const newResults = [...mcqResults, { taskId: currentTask.id, category: currentTask.category, score, timeMs }];
      setMcqResults(newResults);
      advanceOrSubmit(newResults, promptSubmissions);
    },
    [currentTask, mcqResults, promptSubmissions, advanceOrSubmit]
  );

  const handlePromptComplete = useCallback(
    (prompt: string, timeMs: number) => {
      if (!currentTask) return;
      const newSubmissions = [...promptSubmissions, { taskId: currentTask.id, category: currentTask.category, prompt, timeMs }];
      setPromptSubmissions(newSubmissions);
      advanceOrSubmit(mcqResults, newSubmissions);
    },
    [currentTask, mcqResults, promptSubmissions, advanceOrSubmit]
  );

  const restart = () => {
    setStage("intro");
    setReport(null);
    setMcqResults([]);
    setPromptSubmissions([]);
    setTaskIndex(0);
    setError("");
  };

  // ---------- Intro ----------
  if (stage === "intro") {
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8">
          <h3 className="font-sans text-[20px] font-bold text-white mb-2">Test your real AI competency</h3>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] mb-5">
            11 real tasks across 5 skill areas — write actual prompts (graded by AI), spot a hallucination, compare AI
            responses, and more. Not trivia. Takes 8–12 minutes.
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {aiCategories.map((c) => (
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
  if (stage === "quiz" && currentTask) {
    const progressPct = Math.round((taskIndex / totalTasks) * 100);
    return (
      <div className="max-w-[640px] mx-auto">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
              {currentTask.category} · Task {taskIndex + 1} of {totalTasks}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1px] text-white/30">
              {currentTask.title}
            </span>
          </div>
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#4F8EF7] rounded-full transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-7">
          {currentTask.kind === "prompt" && (
            <PromptTask key={currentTask.id} taskId={currentTask.id} onComplete={handlePromptComplete} />
          )}

          {currentTask.id === "spot-hallucination" && (
            <ScenarioTask
              key={currentTask.id}
              question={`An AI assistant answered "Tell me about Jose Rizal." Which sentence from its answer is a hallucination (a fabricated fact)?`}
              options={[
                "Jose Rizal was a Filipino nationalist and the national hero of the Philippines.",
                "He wrote two influential novels: Noli Me Tangere and El Filibusterismo.",
                "Rizal served as the first President of the Philippine Republic before his execution in 1896.",
                "He was executed by the Spanish colonial government on December 30, 1896.",
              ]}
              correctIndex={2}
              onComplete={handleMCQComplete}
            />
          )}
          {currentTask.id === "compare-responses" && (
            <ScenarioTask
              key={currentTask.id}
              question={`You asked an AI: "What's the minimum wage in Metro Manila?"\n\nResponse A: "The minimum wage in Metro Manila is exactly ₱610 per day, and this has been unchanged since 2015."\n\nResponse B: "As of my knowledge, it's roughly ₱610-645 per day depending on the sector, but wage orders change periodically — check the DOLE website or the latest Wage Order for the current exact figure."\n\nWhich is more trustworthy?`}
              options={[
                "Response A — it gives an exact, confident number",
                "Response B — it acknowledges its limits and tells you how to verify",
                "They're equally reliable",
                "Neither can be trusted at all",
              ]}
              correctIndex={1}
              onComplete={handleMCQComplete}
            />
          )}
          {currentTask.id === "summarize-approach" && (
            <ScenarioTask
              key={currentTask.id}
              question="You need AI to summarize a 10-page report for a busy executive. Which prompt would get you the BEST result?"
              options={[
                "\"Summarize this report.\"",
                "\"Summarize this report in 5 bullet points, focused on financial risks and recommended actions, written for someone with 2 minutes to read.\"",
                "\"Make this report shorter.\"",
                "\"Tell me what this report is about.\"",
              ]}
              correctIndex={1}
              onComplete={handleMCQComplete}
            />
          )}
          {currentTask.id === "research-verify" && (
            <ScenarioTask
              key={currentTask.id}
              question={`You ask AI to research "the best CRM software in 2026" and it gives a confident, detailed answer with no sources or citations. What should you do?`}
              options={[
                "Trust it completely — AI is usually right about this kind of thing",
                "Cross-check the key claims against a couple of independent sources before acting on it",
                "Ask the AI the exact same question again to double-check",
                "Ignore AI research entirely and only trust human opinions",
              ]}
              correctIndex={1}
              onComplete={handleMCQComplete}
            />
          )}
          {currentTask.id === "spreadsheet-cleanup" && (
            <ScenarioTask
              key={currentTask.id}
              question={`You have a messy spreadsheet with inconsistent date formats (some "Jan 5, 2026", some "01/05/26", some "2026-01-05") and want AI to help standardize them. What's the most effective approach?`}
              options={[
                "Paste the whole sheet and just say \"fix this\"",
                "Paste a sample of the data, tell AI the exact target format (e.g. YYYY-MM-DD), and ask it to write a formula or script you can apply to the rest",
                "Manually retype every date yourself — AI can't help with spreadsheets",
                "Delete the inconsistent rows",
              ]}
              correctIndex={1}
              onComplete={handleMCQComplete}
            />
          )}
          {currentTask.id === "coding-error" && (
            <ScenarioTask
              key={currentTask.id}
              question="AI gave you code that doesn't run — you get an error message. What's the best next step?"
              options={[
                "Give up and write the code from scratch yourself",
                "Paste the exact error message back to the AI and ask it to fix that specific issue",
                "Ask a completely different AI the same original question",
                "Randomly change parts of the code until it works",
              ]}
              correctIndex={1}
              onComplete={handleMCQComplete}
            />
          )}
          {currentTask.id === "workplace-disclosure" && (
            <ScenarioTask
              key={currentTask.id}
              question="You used AI to help write a report for your boss. Should you disclose that you used AI?"
              options={[
                "Never mention it — pretend you wrote everything yourself",
                "Follow your workplace's AI policy, and when in doubt, be transparent that AI assisted — especially for important or client-facing work",
                "Only mention it if your boss directly asks",
                "It doesn't matter either way",
              ]}
              correctIndex={1}
              onComplete={handleMCQComplete}
            />
          )}
          {currentTask.id === "sensitive-data" && (
            <ScenarioTask
              key={currentTask.id}
              question="Which of these is NOT safe to paste into a public AI chatbot?"
              options={[
                "A general question about how to write a cover letter",
                "A client's full name, account number, and password for troubleshooting",
                "A paragraph of text you want translated",
                "A code snippet with a generic bug, no real credentials",
              ]}
              correctIndex={1}
              onComplete={handleMCQComplete}
            />
          )}
        </div>

        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/20 text-center mt-4">
          {totalCompleted} of {totalTasks} tasks completed
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
          AI is grading your prompts...
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
                AI Confidence Level
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
            {aiCategories.map((cat) => {
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

        {/* Prompts, reviewed */}
        {report.promptFeedback.length > 0 && (
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <h3 className="font-sans text-[16px] font-bold text-white mb-4">Your Prompts, Reviewed by AI</h3>
            <div className="space-y-4">
              {report.promptFeedback.map((pf) => {
                const original = promptSubmissions.find((p) => p.taskId === pf.taskId);
                const meta = aiTasks.find((t) => t.id === pf.taskId);
                return (
                  <div key={pf.taskId} className="bg-[#0F0F1A] border border-white/[0.06] rounded-[10px] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/60">{meta?.title}</span>
                      <span className="font-sans text-[14px] font-bold text-[#4F8EF7]">{pf.score}/100</span>
                    </div>
                    {original && (
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 italic mb-2 leading-[1.6]">
                        &quot;{original.prompt}&quot;
                      </p>
                    )}
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 leading-[1.6]">{pf.feedback}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

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
          <h3 className="font-sans text-[16px] font-bold text-white mb-4">Careers That Match Your AI Skills</h3>
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
