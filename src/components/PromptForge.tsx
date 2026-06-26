"use client";

import { useState, useRef, useCallback } from "react";

type Analysis = {
  clarity: number;
  specificity: number;
  context: number;
  constraints: number;
  structure: number;
  creativity: number;
  overall: number;
  assessment: string;
  tips: string[];
};

const catMeta: { key: keyof Pick<Analysis, "clarity" | "specificity" | "context" | "constraints" | "structure" | "creativity">; name: string }[] = [
  { key: "clarity", name: "Clarity" },
  { key: "specificity", name: "Specificity" },
  { key: "context", name: "Context" },
  { key: "constraints", name: "Constraints" },
  { key: "structure", name: "Output Structure" },
  { key: "creativity", name: "Creativity Potential" },
];

function iqFromScore(score: number, wc: number) {
  return Math.max(62, Math.min(180, 70 + Math.round(score * 0.95) + Math.min(10, Math.floor(wc / 12))));
}

function rankFromScore(score: number) {
  if (score >= 90) return "Architect";
  if (score >= 75) return "Whisperer";
  if (score >= 55) return "Apprentice+";
  if (score >= 35) return "Apprentice";
  return "Novice";
}

function scoreColor(v: number) {
  if (v >= 70) return "#00C97A";
  if (v >= 40) return "#FFD23F";
  return "#E8373A";
}

const DAILY_KEY = "pf_daily";

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

export default function PromptForge() {
  const [promptText, setPromptText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [forging, setForging] = useState(false);
  const [forgedCount, setForgedCount] = useState(0);
  const [bestIQ, setBestIQ] = useState(0);
  const [expandedCat, setExpandedCat] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const analysisRef = useRef<HTMLDivElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wordCount = promptText.trim().split(/\s+/).filter(Boolean).length;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2600);
  }, []);

  const remainingForges = 10 - getDailyCount();

  const forge = async () => {
    const text = promptText.trim();
    if (!text) {
      showToast("Paste a prompt first");
      return;
    }
    if (text.length > 2000) {
      showToast("Keep it under 2,000 characters");
      return;
    }
    if (remainingForges <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free forges.");
      return;
    }

    setForging(true);
    setError("");

    try {
      const res = await fetch("/api/prompt-forge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (res.status === 429) {
        setError("Daily limit reached. Come back tomorrow for 10 more free forges.");
        setForging(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setForging(false);
        return;
      }

      const data = await res.json();
      setAnalysis(data);
      incrementDailyCount();
      setForgedCount((c) => c + 1);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "tool_used", {
          event_category: "tools",
          event_label: "prompt-forge",
          value: 1,
        });
      }
      const iq = iqFromScore(data.overall, wordCount);
      setBestIQ((prev) => Math.max(prev, iq));
      showToast("Prompt analyzed — results ready below");
      setTimeout(() => analysisRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setForging(false);
    }
  };

  const shareResult = async () => {
    if (!analysis) return;
    const iq = iqFromScore(analysis.overall, wordCount);
    const text = `I scored ${analysis.overall}/100 on the Cyberussell Prompt Trainer!\nPrompt IQ: ${iq}\nTry it: https://www.cyberussell.com/tools/prompt-forge`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Prompt Trainer Result", text });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard");
    }
  };

  const circumference = 2 * Math.PI * 82;
  const gaugeOffset = analysis ? circumference - (analysis.overall / 100) * circumference : circumference;

  return (
    <div className="max-w-[1080px] mx-auto">
      {/* Stats bar */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55">
          {forgedCount} prompts analyzed
        </span>
        {bestIQ > 0 && (
          <span className="bg-white/5 border border-white/10 rounded-full px-3 py-1 font-[family-name:var(--font-inter)] text-[13px] text-white/65">
            Best IQ <span className="font-bold text-[#FFD23F]">{bestIQ}</span>
          </span>
        )}
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">
          {remainingForges} free forges left today
        </span>
      </div>

      {/* INPUT CARD */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6">
        <h3 className="font-sans text-[18px] font-bold text-white mb-1">Your prompt</h3>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
          Paste your draft. Don&apos;t worry how bad it is — that&apos;s the point.
        </p>
        <textarea
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder="e.g. write me something about marketing"
          className="w-full min-h-[140px] resize-y bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[15px] leading-[1.6] p-4 placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors"
        />

        {error && (
          <div className="mt-3 bg-[#E8373A]/8 border border-[#E8373A]/20 rounded-[8px] px-4 py-3">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#ff9b9b]">{error}</p>
          </div>
        )}

        <button
          onClick={forge}
          disabled={forging}
          className="mt-5 w-full bg-[#E8373A] hover:bg-[#E8373A]/90 disabled:opacity-60 disabled:cursor-wait text-white font-sans text-[15px] font-bold py-4 rounded-[10px] transition-all flex items-center justify-center gap-2"
        >
          {forging ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            "Analyze This Prompt"
          )}
        </button>

        <div className="flex justify-between items-center mt-3">
          <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20 flex items-center gap-1.5">
            Powered by Claude AI
          </span>
          <div className="flex items-center gap-3">
            {(promptText || analysis) && (
              <button
                onClick={() => { setPromptText(""); setAnalysis(null); setError(""); setExpandedCat(null); }}
                className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 hover:text-white/65 transition-colors"
              >
                Clear
              </button>
            )}
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/20">
              {promptText.length}/2000
            </span>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {analysis && (
        <>
          {/* SCORE + ANALYSIS side by side */}
          <div ref={analysisRef} className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-7">
            {/* SCORE CARD */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 flex flex-col items-center text-center">
              <h3 className="font-sans text-[15px] font-bold text-white self-start mb-0.5">Prompt Power Score</h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 self-start mb-4">AI-powered analysis, 0–100</p>

              <div className="relative w-[200px] h-[200px]">
                <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
                  <defs>
                    <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#E8373A" />
                      <stop offset="100%" stopColor="#FFD23F" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                  <circle
                    cx="100"
                    cy="100"
                    r="82"
                    fill="none"
                    stroke="url(#gaugeGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={gaugeOffset}
                    className="transition-all duration-1000 ease-out"
                    style={{ filter: "drop-shadow(0 0 10px rgba(232,55,58,0.5))" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-sans text-[44px] font-bold tracking-tight">{analysis.overall}</span>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 uppercase tracking-[0.08em] mt-0.5">
                    out of 100
                  </span>
                </div>
              </div>

              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 mt-3 max-w-[280px]">
                {analysis.overall >= 85
                  ? "Exceptional. This prompt is doing real work for you."
                  : analysis.overall >= 65
                    ? "Solid foundation — a few upgrades will make it excellent."
                    : analysis.overall >= 40
                      ? "Workable, but the AI is filling in a lot of blanks."
                      : "High potential, low instruction. Let's forge this."}
              </p>

              <div className="flex gap-3 mt-5 w-full">
                <div className="flex-1 bg-[#0F0F1A] border border-white/[0.06] rounded-[10px] p-3 text-center">
                  <div className="font-mono text-[22px] font-semibold text-[#3B82F6]">
                    {iqFromScore(analysis.overall, wordCount)}
                  </div>
                  <div className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 uppercase tracking-[0.05em] mt-1">
                    Prompt IQ
                  </div>
                </div>
                <div className="flex-1 bg-[#0F0F1A] border border-white/[0.06] rounded-[10px] p-3 text-center">
                  <div className="font-mono text-[22px] font-semibold text-[#3B82F6]">
                    {rankFromScore(analysis.overall)}
                  </div>
                  <div className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 uppercase tracking-[0.05em] mt-1">
                    Rank
                  </div>
                </div>
              </div>

              <button
                onClick={shareResult}
                className="mt-4 bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-4 py-2.5 rounded-[8px] hover:bg-white/10 transition-colors"
              >
                Share result
              </button>
            </div>

            {/* DETAILED ANALYSIS */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6">
              <h3 className="font-sans text-[15px] font-bold text-white mb-0.5">Detailed Breakdown</h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 mb-5">
                Six dimensions of prompt quality
              </p>
              <div className="space-y-4">
                {catMeta.map(({ key, name }) => {
                  const val = analysis[key];
                  const color = scoreColor(val);
                  return (
                    <div key={key}>
                      <div className="flex justify-between items-center text-[14px] mb-1.5">
                        <span className="font-[family-name:var(--font-inter)] text-white/80 font-medium">{name}</span>
                        <span className="font-mono font-semibold" style={{ color }}>
                          {val}
                        </span>
                      </div>
                      <div className="h-[8px] rounded-full bg-[#0F0F1A] border border-white/[0.06] overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${val}%`, backgroundColor: color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* AI ASSESSMENT */}
          <div className="mt-7">
            <h2 className="font-sans text-[20px] font-bold text-white mb-1">AI Assessment</h2>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
              What Claude thinks about your prompt
            </p>
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
                {analysis.assessment}
              </p>
            </div>
          </div>

          {/* TIPS */}
          {analysis.tips && analysis.tips.length > 0 && (
            <div className="mt-7">
              <h2 className="font-sans text-[20px] font-bold text-white mb-1">How to Improve</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
                Specific tips based on your prompt
              </p>
              <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6">
                <div className="space-y-4">
                  {analysis.tips.map((tip, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span
                        className="w-6 h-6 rounded-full bg-[#FFD23F]/10 text-[#FFD23F] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono"
                      >
                        {i + 1}
                      </span>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                        {tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* BUILDER STORY */}
      <div className="mt-16 mb-4">
        <div className="bg-gradient-to-br from-[#FFD23F]/[0.06] to-transparent border border-[#FFD23F]/15 rounded-[12px] p-6 md:p-8">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-[36px] leading-none shrink-0">⚡</span>
            <div>
              <h2 className="font-sans text-[20px] md:text-[24px] font-bold text-white leading-tight">
                This tool was built by a <span className="text-[#FFD23F]">16-year-old</span> student.
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-1">
                Yes, you read that right.
              </p>
            </div>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-4">
            <strong className="text-white">Allo</strong>, one of our Cyberussell students, built the original
            version of this Prompt Trainer in just <strong className="text-[#FFD23F]">2 hours</strong> — from
            research to working product. No computer science degree. No bootcamp.
            Just curiosity, AI tools, and the willingness to start.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-6">
            If a 16-year-old from the Philippines can ship a real tool in one afternoon,
            what&apos;s stopping you? The skills are learnable. The tools are free.
            The only thing missing is your first try.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/#paraan"
              className="bg-[#FFD23F] text-[#0F0F1A] font-sans text-[13px] font-bold px-5 py-2.5 rounded-[8px] hover:opacity-90 transition-all"
            >
              Start Learning to Earn
            </a>
            <a
              href="/#skill-finder"
              className="bg-white/5 border border-white/10 text-white/60 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-2.5 rounded-[8px] hover:bg-white/10 transition-colors"
            >
              Find Your Skill
            </a>
          </div>
        </div>
      </div>

      {/* TOAST */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#18181F] border border-white/10 text-white px-5 py-3 rounded-[10px] text-[13.5px] font-[family-name:var(--font-inter)] shadow-lg transition-all duration-300 z-[999]"
        style={{
          opacity: toast ? 1 : 0,
          transform: `translateX(-50%) translateY(${toast ? 0 : 20}px)`,
          pointerEvents: toast ? "auto" : "none",
        }}
      >
        {toast}
      </div>
    </div>
  );
}
