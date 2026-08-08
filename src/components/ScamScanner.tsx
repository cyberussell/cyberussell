"use client";

import { useState, useRef, useCallback } from "react";

type ScanResult = {
  riskLevel: "HIGH RISK" | "SUSPICIOUS" | "PROCEED WITH CAUTION" | "LOOKS LEGITIMATE";
  riskScore: number;
  redFlags: string[];
  yellowFlags: string[];
  greenFlags: string[];
  analysis: string;
  scamType: string;
  advice: string;
};

const riskStyles: Record<string, { color: string; bg: string; border: string }> = {
  "HIGH RISK": { color: "#E8373A", bg: "rgba(232,55,58,0.08)", border: "rgba(232,55,58,0.25)" },
  SUSPICIOUS: { color: "#FF6B35", bg: "rgba(255,107,53,0.08)", border: "rgba(255,107,53,0.25)" },
  "PROCEED WITH CAUTION": { color: "#FFD23F", bg: "rgba(255,210,63,0.08)", border: "rgba(255,210,63,0.25)" },
  "LOOKS LEGITIMATE": { color: "#00C97A", bg: "rgba(0,201,122,0.08)", border: "rgba(0,201,122,0.25)" },
};

const DAILY_KEY = "ss_daily";

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

const samplePostings = [
  {
    label: "Suspicious job post",
    text: `HIRING NOW! Work from home using your phone lang! Earn ₱5,000-₱15,000 per day! No experience needed. Just like and subscribe to videos. Pay ₱500 registration fee to start. Limited slots only! Message me NOW to reserve your slot. Payment via GCash.`,
  },
  {
    label: "Legitimate job post",
    text: `We are looking for a Virtual Assistant (Part-time) for a US-based e-commerce company. Requirements: Good English communication, basic Excel skills, reliable internet. Rate: $4-6/hour via Wise. Schedule: Mon-Fri, 4 hours/day. Apply through OnlineJobs.ph with your resume. Company: BrightPath Solutions LLC (established 2019).`,
  },
];

export default function ScamScanner() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState<ScanResult | null>(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [scanCount, setScanCount] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const remainingScans = 10 - getDailyCount();

  const scan = useCallback(async () => {
    const text = inputText.trim();
    if (!text) return;
    if (text.length > 5000) {
      setError("Keep it under 5,000 characters.");
      return;
    }
    if (remainingScans <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free scans.");
      return;
    }

    setScanning(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/scam-scanner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (res.status === 429) {
        setError("Daily limit reached. Come back tomorrow for 10 more free scans.");
        setScanning(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setScanning(false);
        return;
      }

      const data = await res.json();
      setResult(data);
      incrementDailyCount();
      setScanCount((c) => c + 1);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "tool_used", {
          event_category: "tools",
          event_label: "scam-scanner",
          value: 1,
        });
      }
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setScanning(false);
    }
  }, [inputText, remainingScans]);

  const share = async () => {
    if (!result) return;
    const text = `I scanned a job posting on the Cyberussell Scam Scanner. Result: ${result.riskLevel} (${result.riskScore}/100 risk score). Check yours at https://www.cyberussell.com/tools/scam-scanner`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Scam Scanner Result", text });
      } catch {
        /* cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const style = result ? riskStyles[result.riskLevel] || riskStyles["SUSPICIOUS"] : null;

  const circumference = 2 * Math.PI * 82;
  const gaugeOffset = result ? circumference - (result.riskScore / 100) * circumference : circumference;

  return (
    <div className="max-w-[760px] mx-auto">
      {/* Stats */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55">
          {scanCount} scans this session
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">
          {remainingScans} free scans left today
        </span>
      </div>

      {/* Input */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h3 className="font-sans text-[18px] font-bold text-white mb-1">Paste the job posting or opportunity</h3>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
          I-copy paste ang buong text ng job post, message, o ad na nakita mo.
        </p>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder='e.g. "Earn ₱5,000/day just using your phone! No experience needed. Send ₱500 registration fee to start..."'
          className="w-full min-h-[160px] resize-y bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[15px] leading-[1.6] p-4 placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors"
        />

        {/* Sample buttons */}
        <div className="flex flex-wrap gap-2 mt-3 mb-4">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 self-center mr-1">Try:</span>
          {samplePostings.map((sample) => (
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
          onClick={scan}
          disabled={scanning || !inputText.trim()}
          className="w-full bg-[#E8373A] hover:bg-[#E8373A]/90 disabled:opacity-60 disabled:cursor-wait text-white font-sans text-[15px] font-bold py-4 rounded-[10px] transition-all flex items-center justify-center gap-2"
        >
          {scanning ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
              Scanning with AI...
            </>
          ) : (
            "Scan This Posting"
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
              {inputText.length}/5000
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      {result && style && (
        <div ref={resultRef}>
          {/* Risk Level Card */}
          <div
            className="rounded-[12px] p-6 mb-6 border"
            style={{ backgroundColor: style.bg, borderColor: style.border }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Risk Gauge */}
              <div className="relative w-[180px] h-[180px] shrink-0 mx-auto md:mx-0">
                <svg width="180" height="180" viewBox="0 0 200 200" className="-rotate-90">
                  <circle cx="100" cy="100" r="82" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="14" />
                  <circle
                    cx="100" cy="100" r="82"
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
                    {result.riskScore}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/30 uppercase tracking-[0.08em]">
                    risk score
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <div
                  className="font-sans text-[12px] font-bold tracking-[2px] uppercase mb-2"
                  style={{ color: style.color }}
                >
                  VERDICT
                </div>
                <h2 className="font-sans text-[28px] md:text-[32px] font-bold mb-3" style={{ color: style.color }}>
                  {result.riskLevel}
                </h2>
                {result.scamType && result.scamType !== "Not a Scam Pattern" && (
                  <span
                    className="inline-block text-[12px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase px-3 py-1.5 rounded-full mb-3"
                    style={{ backgroundColor: style.bg, border: `1px solid ${style.border}`, color: style.color }}
                  >
                    {result.scamType}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[16px] font-bold text-white mb-3">AI Analysis</h3>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              {result.analysis}
            </p>
          </div>

          {/* Flags */}
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

          {result.yellowFlags.length > 0 && (
            <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[10px] p-5 mb-4">
              <h3 className="font-sans text-[16px] font-bold text-[#FFD23F] mb-3">
                Yellow Flags ({result.yellowFlags.length})
              </h3>
              <ul className="space-y-2">
                {result.yellowFlags.map((flag, i) => (
                  <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                    <span className="text-[#FFD23F] mt-0.5 shrink-0">&#x26A0;</span>
                    {flag}
                  </li>
                ))}
              </ul>
            </div>
          )}

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

          {/* Advice */}
          <div className="bg-[#222230] border border-white/[0.08] rounded-[10px] p-5 mb-6">
            <h3 className="font-sans text-[16px] font-bold text-white mb-2">Ano ang dapat mong gawin</h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
              {result.advice}
            </p>
          </div>

          {/* Ebook CTA */}
          <div className="bg-gradient-to-br from-[#FFD23F]/10 via-[#18181F] to-[#18181F] border border-[#FFD23F]/20 rounded-[14px] p-6 md:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F]/70 uppercase tracking-[0.15em] mb-1 block">Next Step</span>
                <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-white mb-2">
                  {result.riskLevel === "LOOKS LEGITIMATE" ? "This looks legit. Ready to apply?" : "Stay safe — and start earning the right way."}
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
                  {result.riskLevel === "LOOKS LEGITIMATE"
                    ? "Get proposal templates, contracts, and a 30-day action plan to land your first client."
                    : "The Freelancer Starter Kit includes a scam protection checklist, verified platforms, and templates to start safely."}
                </p>
              </div>
              <a
                href="https://academy.cyberussell.com/shop/freelancer-kit"
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
              Scan Another Posting
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
          Ang tool na ito ay gumagamit ng AI para mag-analyze ng text patterns. Hindi ito 100% accurate at hindi
          puwedeng palitan ang sarili mong judgment. Kung may doubt ka, huwag mag-send ng pera o personal
          information. I-report ang suspected scams sa NBI Cybercrime Division o PNP Anti-Cybercrime Group.
        </p>
      </div>
    </div>
  );
}
