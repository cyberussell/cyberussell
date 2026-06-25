"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const SKILLS = [
  { id: "writing", label: "Writing / Content", paths: ["Freelance Writing", "SEO Writer", "Email Copywriter", "Social Media Content"] },
  { id: "design", label: "Design / Canva", paths: ["Logo Designer", "Social Media Graphics", "Canva Template Seller", "Brand Kit Creator"] },
  { id: "teaching", label: "Teaching / English", paths: ["Online English Tutor", "Academic Tutor", "Skills Coach", "Course Creator"] },
  { id: "social", label: "Social Media", paths: ["Social Media Manager", "TikTok Creator", "Facebook Page Manager", "Content Scheduler"] },
  { id: "video", label: "Video Editing", paths: ["TikTok/Reels Editor", "YouTube Editor", "Ad Video Creator", "Podcast Editor"] },
  { id: "selling", label: "Online Selling", paths: ["Shopee Seller", "TikTok Shop", "Facebook Marketplace", "Reseller"] },
  { id: "tech", label: "Tech / Repair", paths: ["Tech Support", "Tutorial Creator", "Gadget Reviewer", "Repair Booking Service"] },
  { id: "cooking", label: "Cooking / Food", paths: ["Food Affiliate", "Recipe Creator", "Online Cooking Class", "Homemade Orders"] },
  { id: "admin", label: "Admin / Organization", paths: ["Virtual Assistant", "Data Entry", "Customer Support", "Bookkeeping"] },
  { id: "ai", label: "AI Tools / Tech-Savvy", paths: ["AI Content Services", "AI Web Building", "AI Consulting", "Automation Setup"] },
];

const SITUATIONS = [
  { id: "fulltime", label: "I can work on this full-time (6–8 hours/day)" },
  { id: "parttime", label: "I can only do this part-time (2–4 hours/day)" },
  { id: "phone", label: "I only have a smartphone (no laptop)" },
  { id: "slownet", label: "My internet is slow or unstable" },
  { id: "nocapital", label: "I have zero capital to invest" },
  { id: "shy", label: "I don't want to show my face online" },
];

const GOALS = [
  { id: "quick", label: "I want to earn something within 2 weeks" },
  { id: "stable", label: "I want stable monthly income" },
  { id: "high", label: "I want the highest possible income (willing to invest time)" },
  { id: "passive", label: "I want passive or semi-passive income" },
];

type Result = {
  title: string;
  earning: string;
  why: string;
  firstStep: string;
  link: string;
};

function getResults(skills: string[], situations: string[], goals: string[]): Result[] {
  const results: Result[] = [];

  const hasPhone = situations.includes("phone");
  const slowNet = situations.includes("slownet");
  const noCapital = situations.includes("nocapital");
  const shy = situations.includes("shy");
  const wantsQuick = goals.includes("quick");
  const wantsStable = goals.includes("stable");
  const wantsHigh = goals.includes("high");
  const wantsPassive = goals.includes("passive");

  if (skills.includes("admin") && !hasPhone) {
    results.push({
      title: "Virtual Assistant",
      earning: "₱15,000–₱65,000/mo",
      why: wantsStable ? "VAs get stable monthly retainers — exactly what you want." : "Most beginner-friendly online job with highest demand for Filipinos.",
      firstStep: "Create your OnlineJobs.ph profile today and apply to 5 VA jobs.",
      link: "/guides/8-ways",
    });
  }

  if (skills.includes("teaching") && !shy) {
    results.push({
      title: "Online English Teaching",
      earning: "₱10,000–₱55,000/mo",
      why: "Filipinos are globally recognized as excellent English teachers. Fast to start.",
      firstStep: "Create a Preply tutor profile with a 60-second intro video.",
      link: "/guides/8-ways",
    });
  }

  if (skills.includes("writing") && !hasPhone) {
    results.push({
      title: "Freelance Writing",
      earning: "₱8,000–₱40,000/mo",
      why: wantsHigh ? "Copywriters earn ₱10/word — the ceiling is high if you specialize." : "Every business needs content. Strong English = instant advantage.",
      firstStep: "Write one 800-word sample article on Medium today.",
      link: "/guides/8-ways",
    });
  }

  if (skills.includes("design")) {
    results.push({
      title: "Canva Design",
      earning: "₱5,000–₱30,000/mo",
      why: wantsPassive ? "Sell Canva templates for passive income on Gumroad." : "Free tools, low barrier. Local businesses always need design.",
      firstStep: "Create a free Canva account and design one sample logo today.",
      link: "/guides/8-ways",
    });
  }

  if (skills.includes("social") || skills.includes("selling")) {
    results.push({
      title: "TikTok Affiliate",
      earning: "₱3,000–₱50,000/mo",
      why: shy ? "Works without showing your face — product-focused content." : "Zero capital, no inventory. One viral video = thousands in commission.",
      firstStep: "Post one TikTok video about a product you genuinely use today.",
      link: "/guides/8-ways",
    });
  }

  if (skills.includes("selling") && !noCapital) {
    results.push({
      title: "Online Selling",
      earning: "₱2,000–₱100,000+/mo",
      why: wantsQuick ? "Fastest path to first income — list products and sell this week." : "Philippine e-commerce is $20B in 2026. Shopee and TikTok Shop are free to start.",
      firstStep: "Open a free Shopee Seller account and list your first product.",
      link: "/guides/8-ways",
    });
  }

  if (skills.includes("video") && !hasPhone) {
    results.push({
      title: "Video Editing",
      earning: "₱5,000–₱30,000/mo",
      why: "40% demand growth in 2025. Monthly retainers = stable income.",
      firstStep: "Download CapCut and edit one 60-second sample video today.",
      link: "/guides/8-ways",
    });
  }

  if (skills.includes("ai") && !hasPhone) {
    results.push({
      title: "AI-Assisted Services",
      earning: "₱20,000–₱100,000+/mo",
      why: "Highest earning potential. AI makes you 10x faster than traditional freelancers.",
      firstStep: "Go to claude.ai — ask it what AI service you should offer to PH businesses.",
      link: "/guides/8-ways",
    });
  }

  if (wantsQuick && noCapital && results.length === 0) {
    results.push({
      title: "Data Entry / Microtasks",
      earning: "₱8,000–₱15,000/mo",
      why: "Lowest barrier — if you can type, you qualify. Get started this week.",
      firstStep: "Create an OnlineJobs.ph profile and apply to data entry jobs today.",
      link: "/guides/8-ways",
    });
  }

  if (results.length === 0) {
    results.push({
      title: "Virtual Assistant",
      earning: "₱15,000–₱65,000/mo",
      why: "The best starting point for anyone — no special skill needed, just reliability and English.",
      firstStep: "Create your OnlineJobs.ph profile today and apply to 5 VA jobs.",
      link: "/guides/8-ways",
    });
  }

  return results.slice(0, 3);
}

export default function SkillWorksheet() {
  const [section, setSection] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSituations, setSelectedSituations] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  function toggleItem(list: string[], setList: (v: string[]) => void, id: string) {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  }

  const results = getResults(selectedSkills, selectedSituations, selectedGoals);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex-1 flex flex-col items-center gap-1">
            <div className={`h-1 w-full rounded-full ${section >= s ? "bg-[#E8373A]" : "bg-white/10"}`} />
            <span className={`font-[family-name:var(--font-inter)] text-[10px] ${section >= s ? "text-white/60" : "text-white/25"}`}>
              {s === 1 ? "Skills" : s === 2 ? "Situation" : s === 3 ? "Goals" : "Results"}
            </span>
          </div>
        ))}
      </div>

      {/* Section 1: Skills */}
      {section === 1 && (
        <div>
          <h2 className="font-sans text-[22px] font-bold text-white mb-2">What can you do?</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-6">Select all that apply — even if you are a beginner.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SKILLS.map((skill) => (
              <button
                key={skill.id}
                onClick={() => toggleItem(selectedSkills, setSelectedSkills, skill.id)}
                className={`text-left bg-[#18181F] border rounded-xl p-4 transition-all ${
                  selectedSkills.includes(skill.id)
                    ? "border-[#E8373A]/60 bg-[#E8373A]/5"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <p className="font-sans text-[15px] font-bold text-white">{skill.label}</p>
                <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/35 mt-1">
                  {skill.paths.join(" · ")}
                </p>
              </button>
            ))}
          </div>
          <button
            onClick={() => setSection(2)}
            disabled={selectedSkills.length === 0}
            className="mt-6 w-full bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-30"
          >
            Next — Your Situation →
          </button>
        </div>
      )}

      {/* Section 2: Situation */}
      {section === 2 && (
        <div>
          <h2 className="font-sans text-[22px] font-bold text-white mb-2">What is your situation?</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-6">Select all that apply so we can give you realistic recommendations.</p>
          <div className="flex flex-col gap-3">
            {SITUATIONS.map((sit) => (
              <button
                key={sit.id}
                onClick={() => toggleItem(selectedSituations, setSelectedSituations, sit.id)}
                className={`text-left bg-[#18181F] border rounded-xl p-4 transition-all ${
                  selectedSituations.includes(sit.id)
                    ? "border-[#FFD23F]/60 bg-[#FFD23F]/5"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{sit.label}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setSection(1)} className="flex-1 bg-[#18181F] border border-white/10 text-white/60 font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:border-white/25 transition-all">
              ← Back
            </button>
            <button onClick={() => setSection(3)} className="flex-1 bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:opacity-90 transition-all">
              Next — Your Goals →
            </button>
          </div>
        </div>
      )}

      {/* Section 3: Goals */}
      {section === 3 && (
        <div>
          <h2 className="font-sans text-[22px] font-bold text-white mb-2">What is your goal?</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-6">Pick the one that matters most to you right now.</p>
          <div className="flex flex-col gap-3">
            {GOALS.map((goal) => (
              <button
                key={goal.id}
                onClick={() => toggleItem(selectedGoals, setSelectedGoals, goal.id)}
                className={`text-left bg-[#18181F] border rounded-xl p-4 transition-all ${
                  selectedGoals.includes(goal.id)
                    ? "border-[#00C97A]/60 bg-[#00C97A]/5"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{goal.label}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button onClick={() => setSection(2)} className="flex-1 bg-[#18181F] border border-white/10 text-white/60 font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:border-white/25 transition-all">
              ← Back
            </button>
            <button
              onClick={() => setSection(4)}
              disabled={selectedGoals.length === 0}
              className="flex-1 bg-[#00C97A] text-[#0F0F1A] font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-30"
            >
              See My Results →
            </button>
          </div>
        </div>
      )}

      {/* Section 4: Results */}
      {section === 4 && (
        <div>
          <h2 className="font-sans text-[22px] font-bold text-white mb-2">Your recommended income paths</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 mb-6">
            Based on your skills, situation, and goals — here are your best options.
          </p>
          <div className="flex flex-col gap-4">
            {results.map((r, i) => (
              <div key={r.title} className="bg-[#18181F] border border-white/10 rounded-2xl overflow-hidden">
                <div className="h-[3px] bg-gradient-to-r from-[#E8373A] to-[#FFD23F]" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#E8373A] bg-[#E8373A]/10 rounded-full w-6 h-6 flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h3 className="font-sans text-[20px] font-bold text-white">{r.title}</h3>
                    <span className="ml-auto bg-[#00C97A]/10 border border-[#00C97A]/20 text-[#00C97A] font-[family-name:var(--font-inter)] text-[12px] font-bold px-3 py-1 rounded-full">
                      {r.earning}
                    </span>
                  </div>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] mb-4">{r.why}</p>
                  <div className="bg-[#FFD23F]/8 border border-[#FFD23F]/20 rounded-lg p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <CheckCircle size={16} className="text-[#FFD23F] shrink-0 mt-[2px]" aria-hidden="true" />
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F] uppercase tracking-[1px] mb-1">First step</p>
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/70">{r.firstStep}</p>
                      </div>
                    </div>
                  </div>
                  <a href={r.link} className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#E8373A] hover:underline">
                    See full guide for {r.title} →
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => { setSection(1); setSelectedSkills([]); setSelectedSituations([]); setSelectedGoals([]); }}
            className="mt-6 w-full bg-[#18181F] border border-white/10 text-white/60 font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:border-white/25 transition-all"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
}
