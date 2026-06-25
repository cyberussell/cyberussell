"use client";

import { useState, useRef, useCallback } from "react";

const sources = [
  "Facebook post",
  "Facebook group",
  "Messenger DM",
  "TikTok video",
  "YouTube comment",
  "Friend or family referral",
  "Job posting site",
  "Other",
];

const redFlags = [
  "Requires payment to start working",
  "Promises ₱3,000+ per day with no skill",
  "Asks for GCash PIN or password",
  "No real company name or website",
  "Must recruit others to earn more",
  "Payment only via personal GCash",
  '"Limited slots" or urgent pressure',
  "Cannot find any reviews online",
  "Contract sounds too good to be true",
  "Cannot verify who runs it",
];

const yellowFlags = [
  "No written contract or agreement",
  "Payment only after 30+ days",
  "Communication via personal Messenger only",
  "Very few or no reviews found",
  "Asks for ID before any work",
  "Promises passive income with zero effort",
  "Income depends on recruiting others",
  "No clear job description or tasks",
];

const greenFlags = [
  "Has a real website and social media",
  "Pays through PayPal, Wise, or Payoneer",
  "Has many verifiable Filipino reviews",
  "Clear specific tasks and job description",
  "Contract or terms of service available",
  "Listed on known platforms (Upwork, OJP)",
  "Can verify company registration",
  "Has been operating for 2+ years",
];

type Verdict = {
  level: "HIGH RISK" | "PROCEED WITH CAUTION" | "LOOKS LEGITIMATE" | "NOT ENOUGH INFORMATION";
  color: string;
  bg: string;
  border: string;
  explanation: string;
  action: string;
};

const knownScams = [
  {
    name: "Blessing Loom / Paluwagan Scam",
    desc: "Nagbibigay ka ng ₱500–₱1,000, tapos hihintayin mo ang 'blessing' na ₱8,000. Pyramid scheme ito — ang pera ng bagong members ang pinambabayad sa lumang members.",
  },
  {
    name: "Crypto / Forex Investment Scam",
    desc: 'Pangako ng 10–30% monthly returns. Karamihan sa mga ito ay Ponzi scheme — walang totoong trading, pera ng bagong investors ang gamit para bayaran ang luma.',
  },
  {
    name: "Online Job na May Bayad Bago Magsimula",
    desc: 'Mag-apply ka tapos sasabihin "mag-deposit ka muna ng ₱500 for training materials." Walang legitimate na employer ang humihingi ng pera sa applicant.',
  },
  {
    name: "GCash / Maya PIN Phishing",
    desc: "Magpapanggap na customer support at hihingiin ang PIN, MPIN, o OTP mo. Walang legitimate na company ang hihingi ng password o PIN sa chat.",
  },
  {
    name: "Fake Online Selling Supplier",
    desc: 'Magbabayad ka ng "membership fee" para maging reseller. Pagkabayad, mawawala ang supplier o ang products ay ibang-iba sa photos.',
  },
  {
    name: "Task-Based Scam (Like & Subscribe Jobs)",
    desc: 'Mag-like ka ng videos at kumita ng ₱50–₱100 per task. Pagkatapos ng ilang araw, hihingan ka ng "upgrade fee" para sa higher-paying tasks. Mawawala sila pagkabayad mo.',
  },
  {
    name: "Romance / Sugar Daddy Scam",
    desc: 'May foreigner o "rich person" na nagaalok ng pera kapalit ng companionship. Eventually hihingan ka ng bank details, GCash PIN, o "processing fee" para matanggap ang pera.',
  },
];

export default function ScamChecker() {
  const [oppName, setOppName] = useState("");
  const [oppPromise, setOppPromise] = useState("");
  const [checkedSources, setCheckedSources] = useState<number[]>([]);
  const [redChecked, setRedChecked] = useState<number[]>([]);
  const [yellowChecked, setYellowChecked] = useState<number[]>([]);
  const [greenChecked, setGreenChecked] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const toggle = (arr: number[], setArr: React.Dispatch<React.SetStateAction<number[]>>, idx: number) => {
    setArr(arr.includes(idx) ? arr.filter((i) => i !== idx) : [...arr, idx]);
  };

  const runCheck = useCallback(() => {
    const r = redChecked.length;
    const y = yellowChecked.length;
    const g = greenChecked.length;
    const total = r + y + g;

    let v: Verdict;

    if (total < 3) {
      v = {
        level: "NOT ENOUGH INFORMATION",
        color: "#FFD23F",
        bg: "rgba(255,210,63,0.08)",
        border: "rgba(255,210,63,0.25)",
        explanation:
          "Hindi pa sapat ang information para mag-decide. I-check ang mas maraming items sa itaas para sa mas accurate na result.",
        action:
          "Huwag mag-commit ng kahit ano hanggang hindi ka sigurado. Mag-research pa. Tanungin ang kakilala mo na may experience sa online earning.",
      };
    } else if (r >= 3) {
      v = {
        level: "HIGH RISK",
        color: "#E8373A",
        bg: "rgba(232,55,58,0.08)",
        border: "rgba(232,55,58,0.25)",
        explanation: `${r} red flags ang na-detect. Malaki ang chance na scam ito. Karamihan ng legitimate na opportunity ay walang ganitong pattern.`,
        action:
          "HUWAG mag-send ng pera. HUWAG mag-share ng personal information. I-report sa NBI Cybercrime Division o i-block agad.",
      };
    } else if (r >= 1 || y >= 4) {
      v = {
        level: "PROCEED WITH CAUTION",
        color: "#FFD23F",
        bg: "rgba(255,210,63,0.08)",
        border: "rgba(255,210,63,0.25)",
        explanation: `May ${r} red flag${r !== 1 ? "s" : ""} at ${y} yellow flag${y !== 1 ? "s" : ""}. Hindi automatic na scam, pero may risk.`,
        action:
          "Mag-research pa bago mag-commit. Hanapin ang reviews ng ibang tao. Huwag magbigay ng pera o personal information hanggang hindi ka 100% sigurado.",
      };
    } else {
      v = {
        level: "LOOKS LEGITIMATE",
        color: "#00C97A",
        bg: "rgba(0,201,122,0.08)",
        border: "rgba(0,201,122,0.25)",
        explanation: `${g} green flags at minimal red/yellow flags. Mukhang legitimate ang opportunity na ito — pero palaging mag-ingat.`,
        action:
          "Pwede kang mag-proceed, pero always keep records ng lahat ng transactions. Huwag mag-share ng passwords o PIN kahit kanino.",
      };
    }

    setVerdict(v);
    setShowResult(true);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }, [redChecked, yellowChecked, greenChecked]);

  const reset = () => {
    setOppName("");
    setOppPromise("");
    setCheckedSources([]);
    setRedChecked([]);
    setYellowChecked([]);
    setGreenChecked([]);
    setShowResult(false);
    setVerdict(null);
  };

  const share = async () => {
    const text = `I checked "${oppName || "an opportunity"}" on the Cyberussell Scam Checker. Result: ${verdict?.level}. Check yours at https://www.cyberussell.com/guides/scam-checker`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Scam Checker Result", text });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard!");
    }
  };

  const Checkbox = ({
    items,
    checked,
    setChecked,
    color,
    bg,
  }: {
    items: string[];
    checked: number[];
    setChecked: React.Dispatch<React.SetStateAction<number[]>>;
    color: string;
    bg: string;
  }) => (
    <div className="space-y-2">
      {items.map((item, i) => {
        const active = checked.includes(i);
        return (
          <button
            key={i}
            onClick={() => toggle(checked, setChecked, i)}
            className="w-full text-left flex items-start gap-3 p-3 rounded-[8px] border transition-all duration-200"
            style={{
              backgroundColor: active ? bg : "transparent",
              borderColor: active ? color + "40" : "rgba(255,255,255,0.08)",
            }}
          >
            <span
              className="mt-0.5 w-5 h-5 rounded-[4px] border-2 flex items-center justify-center shrink-0 transition-colors"
              style={{
                borderColor: active ? color : "rgba(255,255,255,0.2)",
                backgroundColor: active ? color : "transparent",
              }}
            >
              {active && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/80 leading-[1.6]">
              {item}
            </span>
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="max-w-[760px] mx-auto">
      {/* Input section */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h2 className="font-sans text-[20px] font-bold text-white mb-4">
          Ano ang opportunity?
        </h2>
        <div className="space-y-4">
          <div>
            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 block mb-1.5">
              Name ng opportunity o company
            </label>
            <input
              type="text"
              value={oppName}
              onChange={(e) => setOppName(e.target.value)}
              placeholder='e.g. "EarnFromHome PH"'
              className="w-full bg-[#222230] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#FFD23F]/40"
            />
          </div>
          <div>
            <label className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 block mb-1.5">
              Ano ang promise nila?
            </label>
            <input
              type="text"
              value={oppPromise}
              onChange={(e) => setOppPromise(e.target.value)}
              placeholder='e.g. "₱5,000 per day just using your phone"'
              className="w-full bg-[#222230] border border-white/[0.08] rounded-[8px] px-4 py-3 text-white font-[family-name:var(--font-inter)] text-[14px] placeholder:text-white/25 focus:outline-none focus:border-[#FFD23F]/40"
            />
          </div>
        </div>
      </div>

      {/* Sources */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h2 className="font-sans text-[20px] font-bold text-white mb-4">
          Saan mo nakita?
        </h2>
        <div className="flex flex-wrap gap-2">
          {sources.map((s, i) => {
            const active = checkedSources.includes(i);
            return (
              <button
                key={i}
                onClick={() => toggle(checkedSources, setCheckedSources, i)}
                className="px-3.5 py-2 rounded-full border text-[13px] font-[family-name:var(--font-inter)] transition-all"
                style={{
                  backgroundColor: active ? "rgba(255,210,63,0.1)" : "transparent",
                  borderColor: active ? "rgba(255,210,63,0.3)" : "rgba(255,255,255,0.1)",
                  color: active ? "#FFD23F" : "rgba(255,255,255,0.5)",
                }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* Red Flags */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h2 className="font-sans text-[20px] font-bold text-white mb-1">
          <span className="text-[#E8373A]">Red Flags</span> — Danger Signs
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-4">
          I-check lahat ng applicable
        </p>
        <Checkbox items={redFlags} checked={redChecked} setChecked={setRedChecked} color="#E8373A" bg="rgba(232,55,58,0.08)" />
      </div>

      {/* Yellow Flags */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h2 className="font-sans text-[20px] font-bold text-white mb-1">
          <span className="text-[#FFD23F]">Yellow Flags</span> — Proceed with Caution
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-4">
          Hindi automatic na scam, pero mag-ingat
        </p>
        <Checkbox items={yellowFlags} checked={yellowChecked} setChecked={setYellowChecked} color="#FFD23F" bg="rgba(255,210,63,0.08)" />
      </div>

      {/* Green Flags */}
      <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-6 mb-6">
        <h2 className="font-sans text-[20px] font-bold text-white mb-1">
          <span className="text-[#00C97A]">Green Flags</span> — Good Signs
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-4">
          Mga signs na mukhang legitimate
        </p>
        <Checkbox items={greenFlags} checked={greenChecked} setChecked={setGreenChecked} color="#00C97A" bg="rgba(0,201,122,0.08)" />
      </div>

      {/* Check Button */}
      <button
        onClick={runCheck}
        className="w-full bg-[#E8373A] hover:bg-[#E8373A]/90 text-white font-sans text-[16px] font-bold py-4 rounded-[10px] transition-colors mb-8"
      >
        Check This Opportunity
      </button>

      {/* Results */}
      {showResult && verdict && (
        <div ref={resultRef} className="mb-12">
          {/* Verdict Card */}
          <div
            className="rounded-[12px] p-6 mb-6 border"
            style={{ backgroundColor: verdict.bg, borderColor: verdict.border }}
          >
            <div
              className="font-sans text-[12px] font-bold tracking-[2px] uppercase mb-2"
              style={{ color: verdict.color }}
            >
              RESULT
            </div>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold mb-3" style={{ color: verdict.color }}>
              {verdict.level}
            </h2>
            {oppName && (
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-3">
                Opportunity checked: <strong className="text-white/80">{oppName}</strong>
              </p>
            )}
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              {verdict.explanation}
            </p>
          </div>

          {/* Flagged Items */}
          {redChecked.length > 0 && (
            <div className="bg-[#E8373A]/5 border border-[#E8373A]/20 rounded-[10px] p-5 mb-4">
              <h3 className="font-sans text-[16px] font-bold text-[#E8373A] mb-3">
                Red Flags Found ({redChecked.length})
              </h3>
              <ul className="space-y-1.5">
                {redChecked.map((i) => (
                  <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                    <span className="text-[#E8373A] mt-0.5">&#x2716;</span>
                    {redFlags[i]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {yellowChecked.length > 0 && (
            <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[10px] p-5 mb-4">
              <h3 className="font-sans text-[16px] font-bold text-[#FFD23F] mb-3">
                Yellow Flags Found ({yellowChecked.length})
              </h3>
              <ul className="space-y-1.5">
                {yellowChecked.map((i) => (
                  <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                    <span className="text-[#FFD23F] mt-0.5">&#x26A0;</span>
                    {yellowFlags[i]}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {greenChecked.length > 0 && (
            <div className="bg-[#00C97A]/5 border border-[#00C97A]/20 rounded-[10px] p-5 mb-4">
              <h3 className="font-sans text-[16px] font-bold text-[#00C97A] mb-3">
                Green Flags Found ({greenChecked.length})
              </h3>
              <ul className="space-y-1.5">
                {greenChecked.map((i) => (
                  <li key={i} className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 flex items-start gap-2">
                    <span className="text-[#00C97A] mt-0.5">&#x2714;</span>
                    {greenFlags[i]}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Box */}
          <div className="bg-[#222230] border border-white/[0.08] rounded-[10px] p-5 mb-6">
            <h3 className="font-sans text-[16px] font-bold text-white mb-2">
              Ano ang dapat mong gawin
            </h3>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
              {verdict.action}
            </p>
          </div>

          {/* Share & Reset */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={share}
              className="bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F] font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-[#FFD23F]/20 transition-colors"
            >
              Share Result
            </button>
            <button
              onClick={reset}
              className="bg-white/5 border border-white/10 text-white/50 font-[family-name:var(--font-inter)] text-[13px] font-bold px-5 py-3 rounded-[8px] hover:bg-white/10 transition-colors"
            >
              Check Another Opportunity
            </button>
          </div>
        </div>
      )}

      {/* Known Scams Section */}
      <div className="mt-16">
        <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-white mb-2">
          Known Philippine Online Scams
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-8">
          Kung nakita mo ang isa sa mga ito — iwasan agad.
        </p>
        <div className="space-y-4">
          {knownScams.map((scam, i) => (
            <div key={i} className="bg-[#18181F] border border-white/[0.08] rounded-[10px] p-5">
              <h3 className="font-sans text-[16px] font-bold text-[#E8373A] mb-2">
                {scam.name}
              </h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.8]">
                {scam.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Golden Rule */}
        <div className="mt-8 bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-[12px] p-6">
          <h3 className="font-sans text-[18px] font-bold text-[#FFD23F] mb-2">
            The Golden Rule
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
            Kung kailangan mong magbayad bago kumita — malaki ang chance na scam
            yan. Walang legitimate na employer ang hihingi ng pera sa applicant.
            Walang legitimate na investment ang magpropromise ng guaranteed
            returns.
          </p>
        </div>
      </div>
    </div>
  );
}
