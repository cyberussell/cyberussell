"use client";

import { useState, useRef, useCallback } from "react";

type PersonalityTrait = {
  trait: string;
  confidence: number;
  evidence: string;
};

type StrategyItem = {
  answer: boolean;
  reason: string;
};

type AnalysisResult = {
  clientProfile: {
    professionalismScore: number;
    trustScore: number;
    budgetLevel: "Low Budget" | "Fair Budget" | "Premium Client";
    decisionSpeed: "Very Slow" | "Moderate" | "Fast";
    communicationStyle: string;
  };
  personalityTraits: PersonalityTrait[];
  redFlags: string[];
  greenFlags: string[];
  psychologicalRead: string;
  responseStrategy: {
    shouldNegotiate: StrategyItem;
    shouldRequestMilestone: StrategyItem;
    shouldAvoid: StrategyItem;
    shouldIncreaseRate: StrategyItem;
    shouldDecline: StrategyItem;
  };
  suggestedReply: string;
};

const DAILY_KEY = "ca_daily";

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

function scoreColor(score: number): string {
  if (score >= 80) return "#00C97A";
  if (score >= 60) return "#FFD23F";
  if (score >= 40) return "#FF6B35";
  return "#E8373A";
}

function traitBarColor(confidence: number): string {
  if (confidence >= 70) return "#E8373A";
  if (confidence >= 40) return "#FFD23F";
  return "#00C97A";
}

const sampleConversations = [
  {
    label: "Red flag client",
    text: `Client: Hi, I need a website. Can you do it for $50? It's very simple, just like Facebook but for dogs. Should take 2-3 hours max. Also I need it by tomorrow. Can you send me a free sample first so I know you're good? My last developer was terrible and I had to fire him. I'll pay after I see the final result and if I'm satisfied. Don't worry, this will lead to a LOT of work in the future. I have 10 more projects lined up.`,
  },
  {
    label: "Good client",
    text: `Client: Hi! I found your profile and I'm impressed with your portfolio. We're a small e-commerce company looking for a freelance web developer to redesign our product pages. Budget is $2,000-3,000 for about 8-10 pages. Timeline is flexible — ideally within 3-4 weeks. We have a detailed brief and brand guidelines ready to share. Happy to do milestone payments — 30% upfront, 40% at midpoint, 30% on delivery. Would you be available for a quick call this week to discuss?`,
  },
];

const strategyLabels: Record<string, string> = {
  shouldNegotiate: "Negotiate rates",
  shouldRequestMilestone: "Request milestone payment",
  shouldAvoid: "Avoid this client",
  shouldIncreaseRate: "Increase your rate",
  shouldDecline: "Politely decline",
};

export default function ClientAnalyzer() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const [scanCount, setScanCount] = useState(0);
  const [copiedReply, setCopiedReply] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const remainingScans = 10 - getDailyCount();

  const analyze = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;
    if (text.length > 8000) {
      setError("Keep it under 8,000 characters.");
      return;
    }
    if (remainingScans <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free analyses.");
      return;
    }

    setAnalyzing(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/client-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 429) {
        setError("Daily limit reached. Come back tomorrow for 10 more free analyses.");
        setAnalyzing(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setAnalyzing(false);
        return;
      }

      const data = await res.json();
      setResult(data);
      incrementDailyCount();
      setScanCount((c) => c + 1);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "tool_used", {
          event_category: "tools",
          event_label: "client-analyzer",
          value: 1,
        });
      }
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setAnalyzing(false);
    }
  }, [inputText, remainingScans]);

  const copyReply = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.suggestedReply);
    setCopiedReply(true);
    setTimeout(() => setCopiedReply(false), 2000);
  };

  const share = async () => {
    if (!result) return;
    const text = `I analyzed a client conversation on the Cyberussell Client Analyzer. Professionalism: ${result.clientProfile.professionalismScore}/100 | Trust: ${result.clientProfile.trustScore}/100. Try it free at https://www.cyberussell.com/tools/client-analyzer`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Client Analyzer Result", text });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="max-w-[760px] mx-auto">
      {/* Stats */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55">
          {scanCount} analyses this session
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">
          {remainingScans} free analyses left today
        </span>
      </div>

      {/* Input */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h3 className="font-sans text-[18px] font-bold text-white mb-1">Paste the client conversation</h3>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
          I-paste ang chat mula sa Upwork, Messenger, email, WhatsApp, Telegram, Fiverr, o kahit anong platform.
        </p>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={"e.g. \"Client: Hi, I need a website. Can you do it for $50? It's very simple, should take 2-3 hours...\""}
          className="w-full min-h-[200px] resize-y bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[15px] leading-[1.6] p-4 placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors"
        />

        {/* Sample buttons */}
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 self-center mr-1">Try:</span>
          {sampleConversations.map((sample) => (
            <button
              key={sample.label}
              onClick={() => setInputText(sample.text)}
              className="font-[family-name:var(--font-inter)] text-[12px] text-white/55 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors"
            >
              {sample.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-4 bg-[#E8373A]/8 border border-[#E8373A]/20 rounded-[8px] px-4 py-3">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#ff9b9b]">{error}</p>
          </div>
        )}

        <button
          onClick={analyze}
          disabled={analyzing || !inputText.trim()}
          className="w-full bg-[#E8373A] hover:bg-[#E8373A]/90 disabled:opacity-60 disabled:cursor-wait text-white font-sans text-[15px] font-bold py-4 rounded-[10px] transition-all flex items-center justify-center gap-2"
        >
          {analyzing ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            "Analyze This Client"
          )}
        </button>

        <div className="flex justify-between items-center mt-3">
          <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20 flex items-center gap-1.5">
            Powered by Claude AI
          </span>
          <div className="flex items-center gap-3">
            {(inputText || result) && (
              <button
                onClick={() => { setInputText(""); setResult(null); setError(""); }}
                className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 hover:text-white/65 transition-colors"
              >
                Clear
              </button>
            )}
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/20">
              {inputText.length}/8000
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && (
        <div ref={resultRef}>
          {/* Client Profile */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[12px] font-bold tracking-[2px] uppercase text-[#E8373A] mb-5">Client Profile</h3>

            {/* Score Gauges */}
            <div className="flex flex-wrap gap-6 justify-center mb-6">
              {[
                { label: "Professionalism", score: result.clientProfile.professionalismScore },
                { label: "Trust", score: result.clientProfile.trustScore },
              ].map(({ label, score }) => {
                const color = scoreColor(score);
                const offset = circumference - (score / 100) * circumference;
                return (
                  <div key={label} className="flex flex-col items-center">
                    <div className="relative w-[120px] h-[120px]">
                      <svg width="120" height="120" viewBox="0 0 120 120" className="-rotate-90">
                        <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                        <circle
                          cx="60" cy="60" r="54"
                          fill="none"
                          stroke={color}
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          className="transition-all duration-1000 ease-out"
                          style={{ filter: `drop-shadow(0 0 8px ${color}50)` }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-sans text-[28px] font-bold" style={{ color }}>{score}</span>
                      </div>
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/40 uppercase tracking-[0.08em] mt-1">{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Profile Tags */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="bg-white/5 border border-white/10 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
                {result.clientProfile.budgetLevel}
              </span>
              <span className="bg-white/5 border border-white/10 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
                {result.clientProfile.decisionSpeed} decision speed
              </span>
              <span className="bg-white/5 border border-white/10 text-white/70 font-[family-name:var(--font-inter)] text-[12px] px-3 py-1.5 rounded-full">
                {result.clientProfile.communicationStyle}
              </span>
            </div>
          </div>

          {/* Personality Traits */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[12px] font-bold tracking-[2px] uppercase text-[#E8373A] mb-4">Likely Personality Traits</h3>
            <div className="space-y-4">
              {result.personalityTraits.map((t, i) => {
                const barColor = t.trait === "Long-Term Client Potential" || t.trait === "Values Quality"
                  ? (t.confidence >= 60 ? "#00C97A" : t.confidence >= 30 ? "#FFD23F" : "#E8373A")
                  : traitBarColor(t.confidence);
                return (
                  <div key={i}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/80">{t.trait}</span>
                      <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold" style={{ color: barColor }}>{t.confidence}%</span>
                    </div>
                    <div className="w-full h-[6px] bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${t.confidence}%`, backgroundColor: barColor }}
                      />
                    </div>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-1 italic">{t.evidence}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Red Flags */}
          {result.redFlags.length > 0 && (
            <div className="bg-[#E8373A]/5 border border-[#E8373A]/20 rounded-[10px] p-5 mb-4">
              <h3 className="font-sans text-[16px] font-bold text-[#E8373A] mb-3">
                Red Flags ({result.redFlags.length})
              </h3>
              <ul className="space-y-2">
                {result.redFlags.map((flag, i) => (
                  <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                    <span className="text-[#E8373A] mt-0.5 shrink-0">&#x2716;</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Green Flags */}
          {result.greenFlags.length > 0 && (
            <div className="bg-[#00C97A]/5 border border-[#00C97A]/20 rounded-[10px] p-5 mb-4">
              <h3 className="font-sans text-[16px] font-bold text-[#00C97A] mb-3">
                Green Flags ({result.greenFlags.length})
              </h3>
              <ul className="space-y-2">
                {result.greenFlags.map((flag, i) => (
                  <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                    <span className="text-[#00C97A] mt-0.5 shrink-0">&#x2714;</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Psychological Read */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[16px] font-bold text-white mb-3">What This Client Is Probably Thinking</h3>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              {result.psychologicalRead}
            </p>
          </div>

          {/* Response Strategy */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[16px] font-bold text-white mb-4">How You Should Respond</h3>
            <div className="space-y-3">
              {Object.entries(result.responseStrategy).map(([key, item]) => (
                <div key={key} className="flex items-start gap-3">
                  <span className={`mt-0.5 shrink-0 font-bold text-[14px] ${item.answer ? "text-[#00C97A]" : "text-white/20"}`}>
                    {item.answer ? "✓" : "✕"}
                  </span>
                  <div>
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/80 font-bold">
                      {strategyLabels[key]}
                    </span>
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 mt-0.5">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Reply */}
          <div className="bg-[#222230] border border-white/[0.08] rounded-[10px] p-5 mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-sans text-[16px] font-bold text-white">Best Reply Strategy</h3>
              <button
                onClick={copyReply}
                className="font-[family-name:var(--font-inter)] text-[12px] text-[#FFD23F]/70 hover:text-[#FFD23F] transition-colors"
              >
                {copiedReply ? "Copied!" : "Copy reply"}
              </button>
            </div>
            <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[8px] p-4">
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] whitespace-pre-wrap">
                {result.suggestedReply}
              </p>
            </div>
          </div>

          {/* Ebook CTA */}
          <div className="bg-gradient-to-br from-[#FFD23F]/10 via-[#18181F] to-[#18181F] border border-[#FFD23F]/20 rounded-[14px] p-6 md:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F]/70 uppercase tracking-[0.15em] mb-1 block">Next Step</span>
                <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-white mb-2">
                  Ready to land better clients?
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
                  Get proposal templates, rate negotiation scripts, and a red flag checklist in the Freelancer Starter Kit.
                </p>
              </div>
              <a
                href="/shop/freelancer-kit"
                className="shrink-0 bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] text-[14px] font-extrabold px-6 py-3.5 rounded-[10px] hover:opacity-90 transition-all shadow-lg shadow-[#FFD23F]/20"
              >
                Get the Kit — ₱199
              </a>
            </div>
          </div>

          {/* Share & Reset */}
          <div className="flex gap-3 flex-wrap mb-12">
            <button
              onClick={share}
              className="bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F] font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-[#FFD23F]/20 transition-colors"
            >
              Share Result
            </button>
            <button
              onClick={() => { setInputText(""); setResult(null); setError(""); }}
              className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
            >
              Analyze Another Client
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[12px] p-6">
        <h3 className="font-sans text-[18px] font-bold text-[#FFD23F] mb-2">
          Disclaimer
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.8]">
          This tool uses AI to analyze communication patterns. It does not determine absolute truth and should not replace your own judgment. Results are estimates based on available evidence — never claim certainty about a client&apos;s character based solely on this analysis. Use it as one data point alongside your experience.
        </p>
      </div>
    </div>
  );
}
