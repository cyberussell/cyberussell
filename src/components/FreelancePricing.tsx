"use client";

import { useState, useRef, useCallback } from "react";

type MarketRange = { low: number; mid: number; high: number };

type PricingResult = {
  marketAnalysis: {
    philippines: MarketRange;
    global: MarketRange;
    premiumAgencies: MarketRange;
  };
  recommendedRate: {
    hourly: { minimum: number; recommended: number; premium: number };
    projectPrice: { minimum: number; recommended: number; premium: number };
    rushPrice: number;
  };
  negotiation: {
    strategy: string;
    tooExpensive: string;
    lowerRate: string;
    smallBudget: string;
  };
  profitability: { score: string; explanation: string };
  clientRisk: { riskLevel: string; warnings: string[] };
  priceJustification: string;
  upsellIdeas: { service: string; reason: string }[];
};

const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
];

const clientTypes = [
  { value: "startup", label: "Startup" },
  { value: "small-business", label: "Small Business" },
  { value: "agency", label: "Agency" },
  { value: "enterprise", label: "Enterprise" },
  { value: "individual", label: "Individual" },
];

const complexities = [
  { value: "simple", label: "Simple" },
  { value: "medium", label: "Medium" },
  { value: "complex", label: "Complex" },
];

const DAILY_KEY = "fp_daily";

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

export default function FreelancePricing() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [experience, setExperience] = useState("");
  const [level, setLevel] = useState("intermediate");
  const [hasPortfolio, setHasPortfolio] = useState(true);
  const [clientCountry, setClientCountry] = useState("");
  const [clientType, setClientType] = useState("small-business");
  const [complexity, setComplexity] = useState("medium");
  const [hours, setHours] = useState("");
  const [deadline, setDeadline] = useState("");
  const [revisionsIncluded, setRevisionsIncluded] = useState("2 revisions");
  const [niche, setNiche] = useState("");
  const [similarProjects, setSimilarProjects] = useState(true);

  const [result, setResult] = useState<PricingResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [genCount, setGenCount] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const remainingGens = 10 - getDailyCount();

  const totalSteps = 6;

  const canProceed = (): boolean => {
    if (step === 0) return service.trim().length > 0;
    if (step === 1) return experience.trim().length > 0;
    if (step === 2) return clientCountry.trim().length > 0;
    if (step === 3) return hours.trim().length > 0 && deadline.trim().length > 0;
    return true;
  };

  const generate = useCallback(async () => {
    if (remainingGens <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free analyses.");
      return;
    }

    setGenerating(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/freelance-pricing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service, experience, level, hasPortfolio, clientCountry,
          clientType, complexity, hours, deadline, revisionsIncluded,
          niche, similarProjects,
        }),
      });

      if (res.status === 429) {
        setError("Daily limit reached. Come back tomorrow for 10 more free analyses.");
        setGenerating(false);
        return;
      }

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setGenerating(false);
        return;
      }

      const data = await res.json();
      setResult(data);
      incrementDailyCount();
      setGenCount((c) => c + 1);
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "tool_used", {
          event_category: "tools",
          event_label: "freelance-pricing",
          value: 1,
        });
      }
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  }, [service, experience, level, hasPortfolio, clientCountry, clientType, complexity, hours, deadline, revisionsIncluded, niche, similarProjects, remainingGens]);

  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const profitColor = (score: string) => {
    if (score.toLowerCase().includes("high")) return "#00C97A";
    if (score.toLowerCase().includes("medium")) return "#FFD23F";
    return "#E8373A";
  };

  const riskColor = (level: string) => {
    if (level.toLowerCase() === "high") return "#E8373A";
    if (level.toLowerCase() === "medium") return "#FFD23F";
    return "#00C97A";
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-1">What service do you offer?</h3>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
              Be specific — &quot;WordPress website development&quot; is better than &quot;web dev.&quot;
            </p>
            <input
              type="text"
              value={service}
              onChange={(e) => setService(e.target.value)}
              placeholder='e.g. "WordPress website development", "Social media management", "Logo design"'
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors mb-4"
            />
            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-1.5">
              Years of experience
            </label>
            <input
              type="text"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder='e.g. "3 years", "6 months", "10+ years"'
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors"
            />
          </div>
        );

      case 1:
        return (
          <>
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
              <h3 className="font-sans text-[18px] font-bold text-white mb-1">Skill Level</h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
                Be honest — this affects your recommended rate.
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {levels.map((l) => (
                  <button
                    key={l.value}
                    onClick={() => setLevel(l.value)}
                    className="px-4 py-2.5 rounded-[8px] border text-[13px] font-[family-name:var(--font-inter)] font-medium transition-all"
                    style={{
                      backgroundColor: level === l.value ? "rgba(232,55,58,0.1)" : "transparent",
                      borderColor: level === l.value ? "rgba(232,55,58,0.3)" : "rgba(255,255,255,0.1)",
                      color: level === l.value ? "#E8373A" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              <h3 className="font-sans text-[18px] font-bold text-white mb-1">Do you have a portfolio?</h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
                Having samples of past work justifies higher rates.
              </p>
              <div className="flex gap-2">
                {[true, false].map((val) => (
                  <button
                    key={String(val)}
                    onClick={() => setHasPortfolio(val)}
                    className="px-4 py-2.5 rounded-[8px] border text-[13px] font-[family-name:var(--font-inter)] font-medium transition-all"
                    style={{
                      backgroundColor: hasPortfolio === val ? "rgba(255,210,63,0.1)" : "transparent",
                      borderColor: hasPortfolio === val ? "rgba(255,210,63,0.3)" : "rgba(255,255,255,0.1)",
                      color: hasPortfolio === val ? "#FFD23F" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {val ? "Yes" : "No"}
                  </button>
                ))}
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-1">About the Client</h3>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
              Client location and type affect what rates are reasonable.
            </p>

            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-1.5">
              Client&apos;s country
            </label>
            <input
              type="text"
              value={clientCountry}
              onChange={(e) => setClientCountry(e.target.value)}
              placeholder='e.g. "USA", "Australia", "Philippines", "UK"'
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors mb-5"
            />

            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-2">
              Client type
            </label>
            <div className="flex flex-wrap gap-2">
              {clientTypes.map((ct) => (
                <button
                  key={ct.value}
                  onClick={() => setClientType(ct.value)}
                  className="px-4 py-2.5 rounded-[8px] border text-[13px] font-[family-name:var(--font-inter)] font-medium transition-all"
                  style={{
                    backgroundColor: clientType === ct.value ? "rgba(232,55,58,0.1)" : "transparent",
                    borderColor: clientType === ct.value ? "rgba(232,55,58,0.3)" : "rgba(255,255,255,0.1)",
                    color: clientType === ct.value ? "#E8373A" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {ct.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-1">Project Details</h3>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
              Complexity, timeline, and scope affect your pricing.
            </p>

            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-2">
              Project complexity
            </label>
            <div className="flex flex-wrap gap-2 mb-5">
              {complexities.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setComplexity(c.value)}
                  className="px-4 py-2.5 rounded-[8px] border text-[13px] font-[family-name:var(--font-inter)] font-medium transition-all"
                  style={{
                    backgroundColor: complexity === c.value ? "rgba(255,210,63,0.1)" : "transparent",
                    borderColor: complexity === c.value ? "rgba(255,210,63,0.3)" : "rgba(255,255,255,0.1)",
                    color: complexity === c.value ? "#FFD23F" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-1.5">
              Estimated hours
            </label>
            <input
              type="text"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder='e.g. "20 hours", "40 hours", "100+ hours"'
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors mb-4"
            />

            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-1.5">
              Deadline
            </label>
            <input
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder='e.g. "2 weeks", "1 month", "ASAP", "flexible"'
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors"
            />
          </div>
        );

      case 4:
        return (
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-1">Revisions & Extras</h3>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
              These details help calculate fair pricing.
            </p>

            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-1.5">
              How many revisions are included?
            </label>
            <input
              type="text"
              value={revisionsIncluded}
              onChange={(e) => setRevisionsIncluded(e.target.value)}
              placeholder='e.g. "2 revisions", "unlimited", "none"'
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors mb-5"
            />

            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 block mb-1.5">
              Do you specialize in a niche? (optional)
            </label>
            <input
              type="text"
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
              placeholder='e.g. "E-commerce stores", "Real estate", "SaaS startups"'
              className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors mb-5"
            />

            <h3 className="font-sans text-[16px] font-bold text-white mb-2">Have you completed similar projects before?</h3>
            <div className="flex gap-2">
              {[true, false].map((val) => (
                <button
                  key={String(val)}
                  onClick={() => setSimilarProjects(val)}
                  className="px-4 py-2.5 rounded-[8px] border text-[13px] font-[family-name:var(--font-inter)] font-medium transition-all"
                  style={{
                    backgroundColor: similarProjects === val ? "rgba(0,201,122,0.1)" : "transparent",
                    borderColor: similarProjects === val ? "rgba(0,201,122,0.3)" : "rgba(255,255,255,0.1)",
                    color: similarProjects === val ? "#00C97A" : "rgba(255,255,255,0.5)",
                  }}
                >
                  {val ? "Yes" : "No"}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-4">Review Your Details</h3>
            <div className="space-y-3">
              {[
                ["Service", service],
                ["Experience", experience],
                ["Level", level],
                ["Portfolio", hasPortfolio ? "Yes" : "No"],
                ["Client Country", clientCountry],
                ["Client Type", clientType],
                ["Complexity", complexity],
                ["Hours", hours],
                ["Deadline", deadline],
                ["Revisions", revisionsIncluded],
                ["Niche", niche || "None"],
                ["Similar Projects", similarProjects ? "Yes" : "No"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-white/[0.05]">
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">{label}</span>
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80 capitalize">{value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-[760px] mx-auto">
      {/* Stats */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55">
          {genCount} analyses this session
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">
          {remainingGens} free analyses left today
        </span>
      </div>

      {!result && (
        <>
          {/* Progress */}
          <div className="flex items-center gap-2 mb-6">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className="h-1 flex-1 rounded-full transition-all"
                style={{
                  backgroundColor: i <= step ? "#E8373A" : "rgba(255,255,255,0.08)",
                }}
              />
            ))}
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 ml-2">
              {step + 1}/{totalSteps}
            </span>
          </div>

          {renderStep()}

          {error && (
            <div className="mb-6 bg-[#E8373A]/8 border border-[#E8373A]/20 rounded-[8px] px-4 py-3">
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#ff9b9b]">{error}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mb-8">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3.5 rounded-[10px] hover:bg-white/10 transition-colors"
              >
                Back
              </button>
            )}
            {step < totalSteps - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="flex-1 bg-[#E8373A] hover:bg-[#E8373A]/90 disabled:opacity-40 text-white font-sans text-[15px] font-bold py-3.5 rounded-[10px] transition-all"
              >
                Next
              </button>
            ) : (
              <button
                onClick={generate}
                disabled={generating}
                className="flex-1 bg-[#E8373A] hover:bg-[#E8373A]/90 disabled:opacity-60 disabled:cursor-wait text-white font-sans text-[15px] font-bold py-3.5 rounded-[10px] transition-all flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
                    Analyzing market rates...
                  </>
                ) : (
                  "Get My Pricing Analysis"
                )}
              </button>
            )}
          </div>
        </>
      )}

      {/* Results */}
      {result && (
        <div ref={resultRef}>
          {/* Market Analysis */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-1">Market Analysis</h3>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-4">Typical hourly rates (USD) for {service}</p>
            <div className="space-y-4">
              {[
                { label: "Philippines", data: result.marketAnalysis.philippines, color: "#E8373A" },
                { label: "Global", data: result.marketAnalysis.global, color: "#FFD23F" },
                { label: "Premium Agencies", data: result.marketAnalysis.premiumAgencies, color: "#00C97A" },
              ].map((row) => (
                <div key={row.label}>
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 block mb-1.5">{row.label}</span>
                  <div className="flex gap-3">
                    {[
                      { label: "Low", val: row.data.low },
                      { label: "Mid", val: row.data.mid },
                      { label: "High", val: row.data.high },
                    ].map((cell) => (
                      <div key={cell.label} className="flex-1 bg-[#0F0F1A] border border-white/[0.06] rounded-[8px] p-3 text-center">
                        <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 block">{cell.label}</span>
                        <span className="font-mono text-[16px] font-bold" style={{ color: row.color }}>${cell.val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Rate */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-4">Your Recommended Rate</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 block mb-2">Hourly Rate</span>
                {[
                  { label: "Minimum", val: result.recommendedRate.hourly.minimum, color: "#E8373A" },
                  { label: "Recommended", val: result.recommendedRate.hourly.recommended, color: "#00C97A" },
                  { label: "Premium", val: result.recommendedRate.hourly.premium, color: "#FFD23F" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center py-2 border-b border-white/[0.05]">
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">{r.label}</span>
                    <span className="font-mono text-[15px] font-bold" style={{ color: r.color }}>${r.val}/hr</span>
                  </div>
                ))}
              </div>
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 block mb-2">Project Price</span>
                {[
                  { label: "Minimum", val: result.recommendedRate.projectPrice.minimum, color: "#E8373A" },
                  { label: "Recommended", val: result.recommendedRate.projectPrice.recommended, color: "#00C97A" },
                  { label: "Premium", val: result.recommendedRate.projectPrice.premium, color: "#FFD23F" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center py-2 border-b border-white/[0.05]">
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">{r.label}</span>
                    <span className="font-mono text-[15px] font-bold" style={{ color: r.color }}>${r.val}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#E8373A]/8 border border-[#E8373A]/20 rounded-[8px] p-4">
              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 block">Emergency Rush Price</span>
              <span className="font-mono text-[20px] font-bold text-[#E8373A]">${result.recommendedRate.rushPrice}</span>
            </div>
          </div>

          {/* Profitability */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-sans text-[18px] font-bold text-white">Profitability</h3>
              <span
                className="font-[family-name:var(--font-inter)] text-[12px] font-bold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: profitColor(result.profitability.score) + "15",
                  border: `1px solid ${profitColor(result.profitability.score)}30`,
                  color: profitColor(result.profitability.score),
                }}
              >
                {result.profitability.score}
              </span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">
              {result.profitability.explanation}
            </p>
          </div>

          {/* Client Risk */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-sans text-[18px] font-bold text-white">Client Risk</h3>
              <span
                className="font-[family-name:var(--font-inter)] text-[12px] font-bold px-3 py-1 rounded-full"
                style={{
                  backgroundColor: riskColor(result.clientRisk.riskLevel) + "15",
                  border: `1px solid ${riskColor(result.clientRisk.riskLevel)}30`,
                  color: riskColor(result.clientRisk.riskLevel),
                }}
              >
                {result.clientRisk.riskLevel} Risk
              </span>
            </div>
            <div className="space-y-2">
              {result.clientRisk.warnings.map((w, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ backgroundColor: riskColor(result.clientRisk.riskLevel) }} />
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">{w}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Negotiation Strategy */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-3">Negotiation Strategy</h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7] mb-5">
              {result.negotiation.strategy}
            </p>
            <div className="space-y-4">
              {[
                { q: '"Too expensive."', a: result.negotiation.tooExpensive },
                { q: '"Can you lower your rate?"', a: result.negotiation.lowerRate },
                { q: '"We have a small budget."', a: result.negotiation.smallBudget },
              ].map((item, i) => (
                <div key={i} className="bg-[#0F0F1A] border border-white/[0.06] rounded-[10px] p-4">
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-[#FFD23F] font-medium block mb-2">
                    If the client says: {item.q}
                  </span>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{item.a}</p>
                  <button
                    onClick={() => copyText(item.a, `neg-${i}`)}
                    className="font-[family-name:var(--font-inter)] text-[12px] text-[#E8373A] hover:text-[#E8373A]/80 mt-2 transition-colors"
                  >
                    {copied === `neg-${i}` ? "Copied!" : "Copy response"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Price Justification */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-sans text-[18px] font-bold text-white mb-0.5">Price Justification</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">
                  Send this to your client to justify your rate
                </p>
              </div>
              <button
                onClick={() => copyText(result.priceJustification, "justify")}
                className="bg-[#E8373A]/10 border border-[#E8373A]/25 text-[#E8373A] font-[family-name:var(--font-inter)] text-[12px] font-bold px-4 py-2 rounded-[6px] hover:bg-[#E8373A]/20 transition-colors shrink-0"
              >
                {copied === "justify" ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[10px] p-5">
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
                {result.priceJustification}
              </p>
            </div>
          </div>

          {/* Upsell Ideas */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <h3 className="font-sans text-[18px] font-bold text-white mb-1">Upsell Ideas</h3>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-4">
              Offer these to increase your project value
            </p>
            <div className="space-y-3">
              {result.upsellIdeas.map((idea, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#00C97A]/10 text-[#00C97A] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                    {i + 1}
                  </span>
                  <div>
                    <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80 font-medium">{idea.service}</span>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.6]">{idea.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ebook CTA */}
          <div className="bg-gradient-to-br from-[#FFD23F]/10 via-[#18181F] to-[#18181F] border border-[#FFD23F]/20 rounded-[14px] p-6 md:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="flex-1">
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F]/70 uppercase tracking-[0.15em] mb-1 block">Next Step</span>
                <h3 className="font-sans text-[18px] md:text-[20px] font-bold text-white mb-2">
                  You know your rate. Now land the client.
                </h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
                  Get 5 proposal templates, invoice and contract templates, and a 30-day action plan to go from pricing to first paying client.
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

          {/* Actions */}
          <div className="flex gap-3 flex-wrap mb-12">
            <button
              onClick={() => {
                setResult(null);
                setStep(0);
                setService("");
                setExperience("");
                setClientCountry("");
                setHours("");
                setDeadline("");
                setNiche("");
                setError("");
                setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
              }}
              className="bg-[#E8373A]/10 border border-[#E8373A]/25 text-[#E8373A] font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-[#E8373A]/20 transition-colors"
            >
              Start New Analysis
            </button>
            <button
              onClick={() => {
                const text = `I just got my freelance pricing analysis using the Cyberussell Pricing Calculator! Try it free: https://www.cyberussell.com/tools/freelance-pricing`;
                if (navigator.share) { navigator.share({ title: "Freelance Pricing Calculator", text }).catch(() => {}); }
                else { navigator.clipboard.writeText(text); setCopied("share"); setTimeout(() => setCopied(null), 2000); }
              }}
              className="bg-white/5 border border-white/10 text-white/65 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
            >
              {copied === "share" ? "Copied!" : "Share This Tool"}
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[12px] p-6">
        <h3 className="font-sans text-[16px] font-bold text-[#FFD23F] mb-2">Pro Tip</h3>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.8]">
          These rates are market-based recommendations — not guarantees. Your actual rate depends on your negotiation skills, client relationship,
          and the value you deliver. Always price based on the value you bring, not just the hours you work. Mag-adjust ka based sa actual experience mo sa client.
        </p>
      </div>
    </div>
  );
}
