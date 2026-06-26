"use client";

import { useState, useRef, useCallback } from "react";

type BioResult = {
  bio: string;
  headline: string;
  tips: string[];
  keywords: string[];
  strength: string;
};

const platforms = [
  { value: "upwork", label: "Upwork" },
  { value: "onlinejobsph", label: "OnlineJobs.ph" },
  { value: "fiverr", label: "Fiverr" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "general", label: "General" },
];

const tones = [
  { value: "professional", label: "Professional", desc: "Polished and confident" },
  { value: "friendly", label: "Friendly", desc: "Warm and approachable" },
  { value: "bold", label: "Bold", desc: "Stand out from the crowd" },
];

const DAILY_KEY = "bg_daily";

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

export default function BioGenerator() {
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [platform, setPlatform] = useState("upwork");
  const [tone, setTone] = useState("professional");
  const [result, setResult] = useState<BioResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [genCount, setGenCount] = useState(0);
  const [copied, setCopied] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const remainingGens = 10 - getDailyCount();

  const generate = useCallback(async () => {
    const text = skills.trim();
    if (!text) return;
    if (text.length > 3000) {
      setError("Keep it under 3,000 characters.");
      return;
    }
    if (remainingGens <= 0) {
      setError("Daily limit reached. Come back tomorrow for 10 more free bios.");
      return;
    }

    setGenerating(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/bio-generator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills: text, experience: experience.trim(), platform, tone }),
      });

      if (res.status === 429) {
        setError("Daily limit reached. Come back tomorrow for 10 more free bios.");
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
          event_label: "bio-generator",
          value: 1,
        });
      }
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setGenerating(false);
    }
  }, [skills, experience, platform, tone, remainingGens]);

  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="max-w-[760px] mx-auto">
      {/* Stats */}
      <div className="flex items-center gap-4 mb-6 flex-wrap">
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/40">
          {genCount} bios generated this session
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">
          {remainingGens} free generations left today
        </span>
      </div>

      {/* Skills Input */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h3 className="font-sans text-[18px] font-bold text-white mb-1">Your skills and experience</h3>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
          List your skills, tools you know, past work, anything relevant. Hindi kailangang maganda ang grammar — AI ang bahala.
        </p>
        <textarea
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder={"e.g. \"I know Canva, basic video editing with CapCut, I managed my tita's Facebook page for her bakery for 1 year, I can type fast and I'm good at English\""}
          className="w-full min-h-[120px] resize-y bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] text-white font-[family-name:var(--font-inter)] text-[15px] leading-[1.6] p-4 placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors"
        />
        <div className="flex justify-end mt-1">
          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/20">
            {skills.length}/3000
          </span>
        </div>

        <div className="mt-4">
          <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 block mb-1.5">
            Anything else? (optional — achievements, years of experience, certifications)
          </label>
          <input
            type="text"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder='e.g. "2 years experience, TESOL certified, managed 3 clients"'
            className="w-full bg-[#0F0F1A] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/20 focus:outline-none focus:border-[#E8373A]/40 transition-colors"
          />
        </div>
      </div>

      {/* Platform Selection */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h3 className="font-sans text-[18px] font-bold text-white mb-1">Platform</h3>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
          Saan mo gagamitin ang bio? Iba-iba ang format per platform.
        </p>
        <div className="flex flex-wrap gap-2">
          {platforms.map((p) => (
            <button
              key={p.value}
              onClick={() => setPlatform(p.value)}
              className="px-4 py-2.5 rounded-[8px] border text-[13px] font-[family-name:var(--font-inter)] font-medium transition-all"
              style={{
                backgroundColor: platform === p.value ? "rgba(232,55,58,0.1)" : "transparent",
                borderColor: platform === p.value ? "rgba(232,55,58,0.3)" : "rgba(255,255,255,0.1)",
                color: platform === p.value ? "#E8373A" : "rgba(255,255,255,0.5)",
              }}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h3 className="font-sans text-[18px] font-bold text-white mb-1">Tone</h3>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-4">
          Paano mo gustong pakinggan ang bio mo?
        </p>
        <div className="flex flex-wrap gap-2">
          {tones.map((t) => (
            <button
              key={t.value}
              onClick={() => setTone(t.value)}
              className="px-4 py-2.5 rounded-[8px] border text-[13px] font-[family-name:var(--font-inter)] transition-all flex items-center gap-2"
              style={{
                backgroundColor: tone === t.value ? "rgba(255,210,63,0.1)" : "transparent",
                borderColor: tone === t.value ? "rgba(255,210,63,0.3)" : "rgba(255,255,255,0.1)",
                color: tone === t.value ? "#FFD23F" : "rgba(255,255,255,0.5)",
              }}
            >
              <span className="font-medium">{t.label}</span>
              <span className="text-[11px] opacity-60">{t.desc}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 bg-[#E8373A]/8 border border-[#E8373A]/20 rounded-[8px] px-4 py-3">
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#ff9b9b]">{error}</p>
        </div>
      )}

      {/* Generate Button */}
      <button
        onClick={generate}
        disabled={generating || !skills.trim()}
        className="w-full bg-[#E8373A] hover:bg-[#E8373A]/90 disabled:opacity-60 disabled:cursor-wait text-white font-sans text-[15px] font-bold py-4 rounded-[10px] transition-all flex items-center justify-center gap-2 mb-2"
      >
        {generating ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/25 border-t-white animate-spin" />
            Generating with AI...
          </>
        ) : (
          "Generate My Bio"
        )}
      </button>
      <div className="flex justify-between items-center mb-8">
        <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">
          Powered by Claude AI
        </span>
        {(skills || result) && (
          <button
            onClick={() => { setSkills(""); setExperience(""); setResult(null); setError(""); }}
            className="font-[family-name:var(--font-inter)] text-[12px] text-white/25 hover:text-white/50 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      {/* Results */}
      {result && (
        <div ref={resultRef}>
          {/* Headline */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-sans text-[16px] font-bold text-white">Profile Headline</h3>
              <button
                onClick={() => copyText(result.headline, "headline")}
                className="font-[family-name:var(--font-inter)] text-[12px] text-[#FFD23F] hover:text-[#FFD23F]/80 transition-colors shrink-0"
              >
                {copied === "headline" ? "Copied!" : "Copy"}
              </button>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[18px] text-white/80 font-medium">
              {result.headline}
            </p>
          </div>

          {/* Bio */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-sans text-[16px] font-bold text-white mb-0.5">Your Bio</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">
                  Optimized for {platforms.find((p) => p.value === platform)?.label}
                </p>
              </div>
              <button
                onClick={() => copyText(result.bio, "bio")}
                className="bg-[#E8373A]/10 border border-[#E8373A]/25 text-[#E8373A] font-[family-name:var(--font-inter)] text-[12px] font-bold px-4 py-2 rounded-[6px] hover:bg-[#E8373A]/20 transition-colors shrink-0"
              >
                {copied === "bio" ? "Copied!" : "Copy Bio"}
              </button>
            </div>
            <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[10px] p-5">
              {result.bio.split("\n\n").map((paragraph, i) => (
                <p
                  key={i}
                  className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8] mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Keywords */}
          {result.keywords && result.keywords.length > 0 && (
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
              <h3 className="font-sans text-[16px] font-bold text-white mb-1">Suggested Keywords</h3>
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-3">
                Add these to your profile skills/tags
              </p>
              <div className="flex flex-wrap gap-2">
                {result.keywords.map((kw, i) => (
                  <button
                    key={i}
                    onClick={() => copyText(kw, `kw-${i}`)}
                    className="bg-[#00C97A]/10 border border-[#00C97A]/20 text-[#00C97A] font-[family-name:var(--font-inter)] text-[13px] px-3 py-1.5 rounded-full hover:bg-[#00C97A]/20 transition-colors"
                  >
                    {copied === `kw-${i}` ? "Copied!" : kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Strength */}
          {result.strength && (
            <div className="bg-[#00C97A]/5 border border-[#00C97A]/20 rounded-[10px] p-5 mb-6">
              <h3 className="font-sans text-[14px] font-bold text-[#00C97A] mb-1">Your Strongest Selling Point</h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                {result.strength}
              </p>
            </div>
          )}

          {/* Tips */}
          {result.tips && result.tips.length > 0 && (
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
              <h3 className="font-sans text-[16px] font-bold text-white mb-1">Tips to Make It Even Better</h3>
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-4">
                Based on what you shared
              </p>
              <div className="space-y-3">
                {result.tips.map((tip, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className="w-6 h-6 rounded-full bg-[#FFD23F]/10 text-[#FFD23F] text-[12px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                      {i + 1}
                    </span>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                      {tip}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 flex-wrap mb-12">
            <button
              onClick={() => { setResult(null); setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50); }}
              className="bg-[#E8373A]/10 border border-[#E8373A]/25 text-[#E8373A] font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-[#E8373A]/20 transition-colors"
            >
              Generate Another Bio
            </button>
            <button
              onClick={() => {
                const text = `I just generated my freelancer bio using the Cyberussell Bio Generator! Try it free: https://www.cyberussell.com/tools/bio-generator`;
                if (navigator.share) { navigator.share({ title: "Bio Generator", text }).catch(() => {}); }
                else { navigator.clipboard.writeText(text); setCopied("share"); setTimeout(() => setCopied(null), 2000); }
              }}
              className="bg-white/5 border border-white/10 text-white/50 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
            >
              {copied === "share" ? "Copied!" : "Share This Tool"}
            </button>
          </div>
        </div>
      )}

      {/* Disclaimer */}
      <div className="mt-8 bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[12px] p-6">
        <h3 className="font-sans text-[16px] font-bold text-[#FFD23F] mb-2">
          Pro Tip
        </h3>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.8]">
          Ang AI-generated bio ay isang starting point — hindi final draft. I-edit mo pa rin para ma-reflect
          ang totoong personality mo. Palitan ang mga generic phrases ng specific na details from your real experience.
          Mas specific, mas maraming clients ang mag-rerespond.
        </p>
      </div>
    </div>
  );
}
