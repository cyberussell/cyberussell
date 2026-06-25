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
  const all: (Result & { score: number })[] = [];

  const hasPhone = situations.includes("phone");
  const noCapital = situations.includes("nocapital");
  const shy = situations.includes("shy");
  const partTime = situations.includes("parttime");
  const fullTime = situations.includes("fulltime");
  const slowNet = situations.includes("slownet");
  const wantsQuick = goals.includes("quick");
  const wantsStable = goals.includes("stable");
  const wantsHigh = goals.includes("high");
  const wantsPassive = goals.includes("passive");

  const entries: {
    id: string;
    title: string;
    earning: string;
    skills: string[];
    blocked: boolean;
    whyMap: Record<string, string>;
    defaultWhy: string;
    firstStep: string;
  }[] = [
    {
      id: "va", title: "Virtual Assistant", earning: "₱15,000–₱65,000/mo",
      skills: ["admin", "writing", "social"],
      blocked: hasPhone,
      whyMap: { stable: "VAs get stable monthly retainers — exactly what you want.", quick: "VA jobs are the fastest to land — many hire within 1–2 weeks.", high: "Specialized VAs (real estate, ecommerce) earn ₱65,000+/mo." },
      defaultWhy: "Most beginner-friendly online job. Filipinos are top-ranked VAs worldwide.",
      firstStep: "Create your OnlineJobs.ph profile today. Set rate at ₱150/hour. Apply to 5 jobs tonight.",
    },
    {
      id: "teaching", title: "Online English Teaching", earning: "₱10,000–₱55,000/mo",
      skills: ["teaching"],
      blocked: shy || hasPhone,
      whyMap: { stable: "Build 5–10 regular weekly students for predictable monthly income.", passive: "Repeat students book weekly — income becomes semi-automatic.", quick: "Preply approves tutors fast — you can get your first student this week." },
      defaultWhy: "Filipinos are globally recognized as excellent English teachers. Flexible schedule.",
      firstStep: "Go to Preply.com now. Create your tutor profile, record a 60-second intro video.",
    },
    {
      id: "writing", title: "Freelance Writing", earning: "₱8,000–₱40,000/mo",
      skills: ["writing"],
      blocked: hasPhone,
      whyMap: { high: "Copywriters earn ₱10/word — the ceiling is high if you specialize.", stable: "Monthly retainer clients give you predictable writing income.", passive: "SEO articles you write keep earning you referrals for years." },
      defaultWhy: "Every business needs content. Strong English = instant advantage.",
      firstStep: "Choose your niche today. Write one 800-word sample article on Medium.",
    },
    {
      id: "design", title: "Canva Design", earning: "₱5,000–₱30,000/mo",
      skills: ["design"],
      blocked: false,
      whyMap: { passive: "Sell Canva templates on Gumroad — create once, earn forever.", quick: "Local businesses need logos and social media graphics this week. Offer yours.", stable: "Monthly social media design packages = recurring income." },
      defaultWhy: hasPhone ? "Canva works on mobile too — start designing on your phone today." : "Free tools, low barrier. Local businesses always need design.",
      firstStep: "Create a free Canva account today. Design one sample logo for a fictional Filipino business.",
    },
    {
      id: "tiktok", title: "TikTok Affiliate", earning: "₱3,000–₱50,000/mo",
      skills: ["social", "cooking", "selling", "tech"],
      blocked: false,
      whyMap: { quick: "Post today, earn commission this week if your video gets traction.", passive: "Older videos keep earning — your content works while you sleep.", high: "Top Filipino affiliates earn ₱50,000+/mo from commission alone." },
      defaultWhy: shy ? "Works without showing your face — product-focused content converts well." : "Zero capital, no inventory. One viral video = thousands in commission.",
      firstStep: "Post one TikTok video about a product you genuinely use today. That is your first affiliate content.",
    },
    {
      id: "selling", title: "Online Selling", earning: "₱2,000–₱100,000+/mo",
      skills: ["selling", "cooking"],
      blocked: noCapital,
      whyMap: { quick: "Fastest path to first sale — list products on Shopee and sell this week.", high: "TikTok Live sellers make hundreds of orders in a single session.", stable: "Once you find a winning product, income scales predictably." },
      defaultWhy: "Philippine e-commerce is $20B in 2026. Shopee and TikTok Shop are free to start.",
      firstStep: "Open a free Shopee Seller account. Take 5 product photos. List your first item today.",
    },
    {
      id: "video", title: "Video Editing", earning: "₱5,000–₱30,000/mo",
      skills: ["video"],
      blocked: hasPhone,
      whyMap: { stable: "Monthly retainers from creators = stable recurring income.", high: "YouTube editors earn ₱5,000/video. 6 videos/month = ₱30,000.", quick: "TikTok creators need editors NOW. Offer your first edit for free to get started." },
      defaultWhy: "40% demand growth in 2025. CapCut is free and powerful.",
      firstStep: "Download CapCut today. Watch one 30-minute tutorial. Edit a 60-second sample video.",
    },
    {
      id: "ai", title: "AI-Assisted Services", earning: "₱20,000–₱100,000+/mo",
      skills: ["ai"],
      blocked: hasPhone,
      whyMap: { high: "Highest earning ceiling of all 8 paths. AI makes you 10x faster than competitors.", quick: "Offer one AI service to a local business this week at ₱5,000–₱15,000.", stable: "AI consulting retainers from local businesses = recurring monthly income." },
      defaultWhy: "The fastest-growing income path for Filipinos in 2026. Provincial businesses are completely underserved.",
      firstStep: "Go to claude.ai. Ask: 'I want to offer AI services to Philippine businesses. What should I start with?'",
    },
    {
      id: "food", title: "Food Content Creator", earning: "₱5,000–₱30,000/mo",
      skills: ["cooking"],
      blocked: false,
      whyMap: { passive: "Recipe videos keep earning views and affiliate commission for months.", quick: "Food content gets fast engagement — post one cooking video today.", high: "Food sponsorships pay well once you hit 10K followers." },
      defaultWhy: shy ? "Hands-only cooking videos perform great — no need to show your face." : "Food is one of the highest-engagement niches on TikTok Philippines.",
      firstStep: "Film one cooking video today with your phone. Post it on TikTok. That is day one.",
    },
    {
      id: "tech", title: "Tech Support & Tutorials", earning: "₱5,000–₱25,000/mo",
      skills: ["tech"],
      blocked: hasPhone,
      whyMap: { passive: "Tutorial videos earn views and affiliate income long after posting.", stable: "Tech support retainers from businesses = monthly income.", quick: "Post one phone repair tip on TikTok today — tech tips get fast views." },
      defaultWhy: "Phone repair tutorials and tech reviews get consistent views. Gadget affiliate links convert well in PH.",
      firstStep: "Record one phone repair tip or gadget review today. Post it on TikTok.",
    },
    {
      id: "data", title: "Data Entry / Microtasks", earning: "₱8,000–₱15,000/mo",
      skills: ["admin"],
      blocked: false,
      whyMap: { quick: "Lowest barrier — start earning within days, not weeks.", stable: "Consistent daily tasks = predictable income." },
      defaultWhy: hasPhone ? "Can be done on a phone — lowest barrier to start earning online." : "If you can type, you qualify. Get started this week.",
      firstStep: "Create an OnlineJobs.ph profile and apply to data entry jobs today.",
    },
  ];

  for (const entry of entries) {
    if (entry.blocked) continue;

    let score = 0;

    const skillMatch = entry.skills.some((s) => skills.includes(s));
    score += skillMatch ? 5 : 0;

    const goalKey = wantsQuick ? "quick" : wantsStable ? "stable" : wantsHigh ? "high" : wantsPassive ? "passive" : "";
    const why = entry.whyMap[goalKey] || entry.defaultWhy;

    if (goalKey && entry.whyMap[goalKey]) score += 8;

    if (noCapital && !["selling"].includes(entry.id)) score += 2;
    if (hasPhone && ["tiktok", "food", "design", "data"].includes(entry.id)) score += 3;
    if (partTime && ["teaching", "tiktok", "food", "design"].includes(entry.id)) score += 3;
    if (fullTime && ["va", "writing", "ai", "video"].includes(entry.id)) score += 3;
    if (shy && ["data", "writing", "design", "va"].includes(entry.id)) score += 3;
    if (slowNet && ["data", "writing", "design"].includes(entry.id)) score += 2;

    all.push({ title: entry.title, earning: entry.earning, why, firstStep: entry.firstStep, link: "/guides/8-ways", score });
  }

  all.sort((a, b) => b.score - a.score);

  const seen = new Set<string>();
  const unique = all.filter((r) => {
    if (seen.has(r.title)) return false;
    seen.add(r.title);
    return true;
  });

  if (unique.length === 0) {
    unique.push({
      title: "Virtual Assistant", earning: "₱15,000–₱65,000/mo", score: 0,
      why: "The best starting point for anyone — no special skill needed, just reliability and English.",
      firstStep: "Create your OnlineJobs.ph profile today and apply to 5 VA jobs.",
      link: "/guides/8-ways",
    });
  }

  return unique.slice(0, 3).map(({ score: _s, ...rest }) => rest);
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
