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

type Tool = { name: string; note: string; free: boolean };

type Result = {
  title: string;
  earning: string;
  why: string;
  firstStep: string;
  tools: Tool[];
  setup: string[];
  payment: string[];
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

  type Entry = {
    id: string; title: string; earning: string; skills: string[];
    blocked: boolean; whyMap: Record<string, string>; defaultWhy: string;
    firstStep: string;
    toolsPhone: Tool[]; toolsLaptop: Tool[];
    setup: string[]; payment: string[];
  };

  const entries: Entry[] = [
    {
      id: "va", title: "Virtual Assistant", earning: "₱15,000–₱65,000/mo",
      skills: ["admin", "writing", "social"], blocked: hasPhone,
      whyMap: { stable: "VAs get stable monthly retainers — exactly what you want.", quick: "VA jobs are the fastest to land — many hire within 1–2 weeks.", high: "Specialized VAs (real estate, ecommerce) earn ₱65,000+/mo." },
      defaultWhy: "Most beginner-friendly online job. Filipinos are top-ranked VAs worldwide.",
      firstStep: "Create your OnlineJobs.ph profile today. Set rate at ₱150/hour. Apply to 5 jobs tonight.",
      toolsLaptop: [
        { name: "Google Workspace (Docs, Sheets, Calendar)", note: "Your main work tools", free: true },
        { name: "Zoom", note: "For client calls", free: true },
        { name: "Trello or Notion", note: "Task management", free: true },
        { name: "Canva", note: "For basic graphics clients may request", free: true },
      ],
      toolsPhone: [],
      setup: ["Create OnlineJobs.ph profile with clear 3-sentence intro", "Set rate at ₱150/hour to land first reviews fast", "Apply to 10–20 VA listings every day", "Accept your first client even if the pay is low — reviews matter", "After 5 reviews, raise your rate and specialize"],
      payment: ["GCash — fastest for local clients", "PayPal — most accepted by international clients", "Wise — best exchange rate for USD to PHP", "Payoneer — standard for Upwork payouts"],
    },
    {
      id: "teaching", title: "Online English Teaching", earning: "₱10,000–₱55,000/mo",
      skills: ["teaching"], blocked: shy || hasPhone,
      whyMap: { stable: "Build 5–10 regular weekly students for predictable monthly income.", passive: "Repeat students book weekly — income becomes semi-automatic.", quick: "Preply approves tutors fast — your first student can come this week." },
      defaultWhy: "Filipinos are globally recognized as excellent English teachers. Flexible schedule.",
      firstStep: "Go to Preply.com now. Create your tutor profile and record a 60-second intro video.",
      toolsLaptop: [
        { name: "Laptop with camera and mic", note: "Built-in is fine to start", free: true },
        { name: "Preply", note: "Best student volume", free: true },
        { name: "iTalki", note: "Lower commission alternative", free: true },
        { name: "Google Meet or Zoom", note: "Backup for classes", free: true },
      ],
      toolsPhone: [],
      setup: ["Create Preply tutor profile with a 1-minute intro video", "Set starting rate at ₱150–₱200/hour", "Accept all trial lessons — they convert to regulars", "Build 5–10 regular weekly students", "After 5+ reviews, raise rate to ₱250–₱350/hour"],
      payment: ["Preply pays via PayPal or Payoneer", "iTalki pays via PayPal or bank transfer", "GCash — link to your PayPal for instant conversion"],
    },
    {
      id: "writing", title: "Freelance Writing", earning: "₱8,000–₱40,000/mo",
      skills: ["writing"], blocked: hasPhone,
      whyMap: { high: "Copywriters earn ₱10/word — the ceiling is high if you specialize.", stable: "Monthly retainer clients give you predictable writing income.", passive: "SEO articles you write keep earning you referrals for years." },
      defaultWhy: "Every business needs content. Strong English = instant advantage.",
      firstStep: "Choose your niche today. Write one 800-word sample article and publish it on Medium.",
      toolsLaptop: [
        { name: "Google Docs", note: "Write and share with clients", free: true },
        { name: "Grammarly", note: "Catch errors before submitting", free: true },
        { name: "Medium", note: "Free portfolio for your samples", free: true },
        { name: "Hemingway Editor", note: "Makes writing clearer", free: true },
      ],
      toolsPhone: [],
      setup: ["Pick a niche — health, tech, finance, or travel pay most", "Write 3 sample articles and publish on Medium", "Create Upwork profile linking to your samples", "Apply to 5–10 writing jobs per day", "Start at ₱2/word — raise to ₱5/word after 5 reviews"],
      payment: ["Upwork pays via Payoneer or direct bank transfer", "PayPal — for direct clients", "Wise — best rate for international payments", "GCash — for local clients"],
    },
    {
      id: "design", title: "Canva Design", earning: "₱5,000–₱30,000/mo",
      skills: ["design"], blocked: false,
      whyMap: { passive: "Sell Canva templates on Gumroad — create once, earn forever.", quick: "Local businesses need logos and social media graphics this week.", stable: "Monthly social media design packages = recurring income." },
      defaultWhy: hasPhone ? "Canva works on mobile too — start designing on your phone today." : "Free tools, low barrier. Local businesses always need design.",
      firstStep: "Create a free Canva account today. Design one sample logo for a fictional Filipino business.",
      toolsLaptop: [
        { name: "Canva", note: "Main design tool — works on phone too", free: true },
        { name: "Canva Pro (optional)", note: "₱599/mo — more templates and features", free: false },
        { name: "ColorHunt", note: "Pick professional color palettes", free: true },
        { name: "Behance or Instagram", note: "Portfolio to show clients", free: true },
      ],
      toolsPhone: [
        { name: "Canva mobile app", note: "Full design capability on phone", free: true },
        { name: "ColorHunt", note: "Color inspiration", free: true },
        { name: "Instagram", note: "Post your work as portfolio", free: true },
      ],
      setup: ["Learn Canva basics from YouTube — 1 week of practice", "Create 10 samples: logos, social posts, flyers", "Offer free designs to 2–3 local businesses for testimonials", "List on Fiverr and post in local business Facebook groups", "Upsell to monthly social media packages ₱3,000–₱10,000"],
      payment: ["GCash — easiest for local clients", "Fiverr pays via PayPal or bank transfer", "Gumroad — for selling templates (pays via PayPal)", "Wise — for international direct clients"],
    },
    {
      id: "tiktok", title: "TikTok Affiliate", earning: "₱3,000–₱50,000/mo",
      skills: ["social", "cooking", "selling", "tech"], blocked: false,
      whyMap: { quick: "Post today, earn commission this week if your video gets traction.", passive: "Older videos keep earning — your content works while you sleep.", high: "Top Filipino affiliates earn ₱50,000+/mo from commission alone." },
      defaultWhy: shy ? "Works without showing your face — product-focused content converts well." : "Zero capital, no inventory. One viral video = thousands in commission.",
      firstStep: "Post one TikTok video about a product you genuinely use today. That is your first affiliate content.",
      toolsLaptop: [
        { name: "Smartphone", note: "Your camera and posting device", free: true },
        { name: "TikTok app", note: "Built-in editor works great", free: true },
        { name: "CapCut mobile", note: "Advanced editing on phone", free: true },
        { name: "Canva", note: "Thumbnails and text overlays", free: true },
      ],
      toolsPhone: [
        { name: "TikTok app", note: "Record, edit, and post all-in-one", free: true },
        { name: "CapCut mobile", note: "Better editing than TikTok's built-in", free: true },
        { name: "Canva mobile", note: "For thumbnails", free: true },
      ],
      setup: ["Pick a niche — beauty, food, tech, home products convert best in PH", "Post 2–3 videos daily until you hit 1,000 followers", "Apply for TikTok Shop Affiliate at 1,000 followers", "Post authentic product reviews — real content converts better", "Track which products get the most commission and double down"],
      payment: ["TikTok Shop pays to your linked bank account", "Ecomobi pays via GCash", "Shopee Affiliate pays via Shopee wallet → bank/GCash"],
    },
    {
      id: "selling", title: "Online Selling", earning: "₱2,000–₱100,000+/mo",
      skills: ["selling", "cooking"], blocked: noCapital,
      whyMap: { quick: "Fastest path to first sale — list products on Shopee and sell this week.", high: "TikTok Live sellers make hundreds of orders in a single session.", stable: "Once you find a winning product, income scales predictably." },
      defaultWhy: "Philippine e-commerce is $20B in 2026. Shopee and TikTok Shop are free to start.",
      firstStep: "Open a free Shopee Seller account. Take 5 product photos. List your first item today.",
      toolsLaptop: [
        { name: "Smartphone", note: "For product photos and TikTok Live", free: true },
        { name: "Shopee Seller Center", note: "Manage your shop", free: true },
        { name: "Canva", note: "Product banners and ads", free: true },
        { name: "J&T or Flash Express app", note: "Shipping logistics", free: true },
      ],
      toolsPhone: [
        { name: "Shopee Seller app", note: "Manage shop from phone", free: true },
        { name: "TikTok app", note: "For live selling", free: true },
        { name: "Canva mobile", note: "Product images", free: true },
      ],
      setup: ["Choose what to sell — your products, resell, or local provincial goods", "Take product photos: white background + natural light", "Open Shopee shop with at least 10 complete listings", "Join Shopee flash sales and voucher programs", "Create TikTok content showing products — live selling drives the most orders"],
      payment: ["Shopee pays to your bank account or GCash", "TikTok Shop pays to linked bank account", "Facebook Marketplace — GCash or cash on delivery", "COD (Cash on Delivery) — common for first-time buyers"],
    },
    {
      id: "video", title: "Video Editing", earning: "₱5,000–₱30,000/mo",
      skills: ["video"], blocked: false,
      whyMap: { stable: "Monthly retainers from creators = stable recurring income.", high: "YouTube editors earn ₱5,000/video. 6 videos/month = ₱30,000.", quick: "TikTok creators need editors NOW. Offer your first edit for free." },
      defaultWhy: slowNet ? "CapCut works offline — download it, edit without internet, upload when you have signal." : hasPhone ? "CapCut mobile is surprisingly powerful — many pro editors started on their phone." : "40% demand growth in 2025. CapCut is free and powerful.",
      firstStep: hasPhone ? "Download CapCut on your phone. Edit one 60-second video using any footage you have. That is your first sample." : "Download CapCut on your laptop. Watch one 30-minute tutorial. Edit a 60-second sample video.",
      toolsLaptop: [
        { name: "CapCut desktop", note: "Free, powerful, beginner-friendly", free: true },
        { name: "DaVinci Resolve", note: "Free professional editor (needs 8GB RAM)", free: true },
        { name: "Pexels", note: "Free stock footage for practice", free: true },
        { name: "Fiverr", note: "Find your first clients", free: true },
      ],
      toolsPhone: [
        { name: "CapCut mobile", note: "Full editing on phone — works offline", free: true },
        { name: "TikTok built-in editor", note: "Quick edits for short content", free: true },
        { name: "InShot", note: "Alternative mobile editor", free: true },
      ],
      setup: hasPhone
        ? ["Download CapCut mobile and learn the basics — 2–3 days", "Edit 5 sample videos using your own footage", "Offer free editing to 2 TikTok creators for testimonials", "Post your edits on TikTok to attract clients", "Start charging ₱300–₱500 per short video"]
        : ["Learn CapCut from YouTube — 1 week of practice", "Edit 5–10 sample videos using free Pexels footage", "Offer free editing to 2 TikTok creators for a testimonial", "Create Fiverr gig starting at ₱500 per video", "Upsell to monthly retainer packages after 5 reviews"],
      payment: ["GCash — fastest for local creator clients", "PayPal — for international clients", "Fiverr pays via PayPal or bank transfer", "Wise — best rate for USD payments"],
    },
    {
      id: "ai", title: "AI-Assisted Services", earning: "₱20,000–₱100,000+/mo",
      skills: ["ai"], blocked: hasPhone,
      whyMap: { high: "Highest earning ceiling of all 8 paths. AI makes you 10x faster.", quick: "Offer one AI service to a local business this week for ₱5,000–₱15,000.", stable: "AI consulting retainers from local businesses = recurring monthly income." },
      defaultWhy: "The fastest-growing income path for Filipinos in 2026. Provincial businesses are completely underserved.",
      firstStep: "Go to claude.ai. Ask: 'I want to offer AI services to Philippine businesses. What should I start with?'",
      toolsLaptop: [
        { name: "Claude AI", note: "Best for writing, code, and analysis", free: true },
        { name: "ChatGPT", note: "Good for brainstorming and content", free: true },
        { name: "Midjourney", note: "AI image generation (paid)", free: false },
        { name: "Google Stitch", note: "AI UI design tool", free: true },
      ],
      toolsPhone: [],
      setup: ["Create free Claude AI account and learn effective prompting", "Choose ONE service: AI content, images, or web building", "Build 3 real examples and document your process", "Approach local businesses — they need AI help most", "Offer AI setup for one business at ₱5,000–₱15,000"],
      payment: ["GCash — standard for local business clients", "Bank transfer — for larger project payments", "PayPal — for international clients", "Wise — best exchange rate for USD"],
    },
    {
      id: "food", title: "Food Content Creator", earning: "₱5,000–₱30,000/mo",
      skills: ["cooking"], blocked: false,
      whyMap: { passive: "Recipe videos keep earning views and affiliate commission for months.", quick: "Food content gets fast engagement — post one cooking video today.", high: "Food sponsorships pay well once you hit 10K followers." },
      defaultWhy: shy ? "Hands-only cooking videos perform great — no need to show your face." : "Food is one of the highest-engagement niches on TikTok Philippines.",
      firstStep: "Film one cooking video today — even just with your phone. Post it on TikTok. That is day one.",
      toolsLaptop: [
        { name: "Smartphone", note: "Your camera — natural light is enough", free: true },
        { name: "TikTok app", note: "Post and grow your food content", free: true },
        { name: "CapCut mobile", note: "Edit cooking videos with text overlays", free: true },
        { name: "TikTok Shop Affiliate", note: "Earn from kitchen product links", free: true },
      ],
      toolsPhone: [
        { name: "TikTok app", note: "Film, edit, and post all on phone", free: true },
        { name: "CapCut mobile", note: "Add text, music, transitions", free: true },
        { name: "Canva mobile", note: "Recipe card graphics", free: true },
      ],
      setup: ["Pick your food niche — recipes, reviews, street food, cooking tips", "Post 1–2 cooking videos daily on TikTok", "Use trending sounds and hashtags (#LutongPinoy #TikTokFood)", "At 1,000 followers, apply for TikTok Shop Affiliate", "Promote kitchen tools and ingredients with affiliate links"],
      payment: ["TikTok Shop Affiliate pays to bank account", "Ecomobi pays via GCash", "Brand sponsorship payments via bank transfer or GCash"],
    },
    {
      id: "tech", title: "Tech Support & Tutorials", earning: "₱5,000–₱25,000/mo",
      skills: ["tech"], blocked: hasPhone,
      whyMap: { passive: "Tutorial videos earn views and affiliate income long after posting.", stable: "Tech support retainers from businesses = monthly income.", quick: "Post one phone repair tip on TikTok today — tech tips get fast views." },
      defaultWhy: "Phone repair tutorials and tech reviews get consistent views. Gadget affiliate links convert well in PH.",
      firstStep: "Record one phone repair tip or gadget review today. Post it on TikTok or YouTube.",
      toolsLaptop: [
        { name: "Smartphone", note: "For recording tutorials", free: true },
        { name: "TikTok or YouTube", note: "Post your tech content", free: true },
        { name: "CapCut", note: "Edit tutorials with annotations", free: true },
        { name: "TikTok Shop Affiliate", note: "Earn from gadget links", free: true },
      ],
      toolsPhone: [],
      setup: ["Choose focus — phone repair, gadget reviews, or tech tips", "Record 1 tutorial or review per day", "Use TikTok Shop affiliate for gadget recommendations", "Build a following then offer paid consultation", "Create a Facebook page for local repair bookings"],
      payment: ["GCash — for local clients and repair fees", "TikTok Shop Affiliate pays to bank", "PayPal — for international tech support clients"],
    },
    {
      id: "data", title: "Data Entry / Microtasks", earning: "₱8,000–₱15,000/mo",
      skills: ["admin"], blocked: false,
      whyMap: { quick: "Lowest barrier — start earning within days, not weeks.", stable: "Consistent daily tasks = predictable income." },
      defaultWhy: hasPhone ? "Can be done on a phone — lowest barrier to start earning online." : "If you can type, you qualify. Get started this week.",
      firstStep: "Create an OnlineJobs.ph profile and apply to data entry jobs today.",
      toolsLaptop: [
        { name: "Google Sheets", note: "Most data entry uses spreadsheets", free: true },
        { name: "OnlineJobs.ph", note: "Best platform for PH data entry", free: true },
        { name: "Typing practice tool", note: "Aim for 40+ WPM", free: true },
      ],
      toolsPhone: [
        { name: "Google Sheets app", note: "Mobile spreadsheet work", free: true },
        { name: "OnlineJobs.ph mobile", note: "Apply to jobs on phone", free: true },
      ],
      setup: ["Create OnlineJobs.ph profile focused on data entry", "Practice typing speed — aim for 40+ WPM", "Apply to 10+ data entry jobs per day", "Deliver accurately and on time — build your reviews", "Use data entry as stepping stone to VA work for higher pay"],
      payment: ["Bank transfer — most common for OnlineJobs.ph", "GCash — for local clients", "PayPal — for international clients"],
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
    if (slowNet && ["data", "writing", "design", "video"].includes(entry.id)) score += 2;
    const tools = hasPhone && entry.toolsPhone.length > 0 ? entry.toolsPhone : entry.toolsLaptop;
    all.push({ title: entry.title, earning: entry.earning, why, firstStep: entry.firstStep, tools, setup: entry.setup, payment: entry.payment, score });
  }

  all.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  const unique = all.filter((r) => { if (seen.has(r.title)) return false; seen.add(r.title); return true; });

  if (unique.length === 0) {
    unique.push({
      title: "Virtual Assistant", earning: "₱15,000–₱65,000/mo", score: 0,
      why: "The best starting point for anyone — no special skill needed, just reliability and English.",
      firstStep: "Create your OnlineJobs.ph profile today and apply to 5 VA jobs.",
      tools: [{ name: "Google Workspace", note: "Free", free: true }, { name: "Zoom", note: "Free", free: true }],
      setup: ["Create OnlineJobs.ph profile", "Apply to 10 jobs per day", "Start at ₱150/hour", "Get 5 reviews then raise rate"],
      payment: ["GCash", "PayPal", "Wise"],
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
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mb-6">Select all that apply — even if you are a beginner.</p>
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
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mb-6">Select all that apply so we can give you realistic recommendations.</p>
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
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mb-6">Pick the one that matters most to you right now.</p>
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
        <div id="worksheet-results">
          <h2 className="font-sans text-[26px] md:text-[32px] font-bold text-white mb-2">Your Personalized Income Plan</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mb-8">
            Based on your skills, situation, and goals — here is your roadmap.
          </p>

          <div className="flex flex-col gap-6">
            {results.map((r, i) => (
              <div key={r.title} className="bg-[#18181F] border border-white/10 rounded-2xl overflow-hidden">
                <div className="h-[3px] bg-gradient-to-r from-[#E8373A] to-[#FFD23F]" />
                <div className="p-6 md:p-8">

                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white bg-[#E8373A] rounded-full w-7 h-7 flex items-center justify-center">
                      {i + 1}
                    </span>
                    <h3 className="font-sans text-[22px] md:text-[26px] font-bold text-white">{r.title}</h3>
                  </div>
                  <span className="inline-block bg-[#00C97A]/10 border border-[#00C97A]/20 text-[#00C97A] font-[family-name:var(--font-inter)] text-[14px] font-bold px-4 py-1.5 rounded-full mb-4">
                    {r.earning}
                  </span>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-6">{r.why}</p>

                  {/* Tools You Need */}
                  <div className="mb-6">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Tools you need</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {r.tools.map((tool) => (
                        <div key={tool.name} className="flex items-start gap-2 bg-[#0F0F1A] rounded-lg p-3">
                          <CheckCircle size={14} className="text-[#00C97A] shrink-0 mt-[2px]" aria-hidden="true" />
                          <div>
                            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white font-bold">{tool.name}</p>
                            <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/55">
                              {tool.note} · {tool.free ? <span className="text-[#00C97A]">Free</span> : <span className="text-[#FFD23F]">Paid</span>}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Setup */}
                  <div className="mb-6">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Step-by-step setup</p>
                    <div className="flex flex-col gap-2">
                      {r.setup.map((step, si) => (
                        <div key={si} className="flex gap-3 items-start">
                          <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] bg-[#E8373A]/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-[1px]">
                            {si + 1}
                          </span>
                          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/70 leading-[1.6]">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* How to Get Paid */}
                  <div className="mb-6">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-3">How to get paid</p>
                    <div className="flex flex-wrap gap-2">
                      {r.payment.map((p) => (
                        <span key={p} className="font-[family-name:var(--font-inter)] text-[12px] text-white/60 bg-[#0F0F1A] border border-white/[0.06] px-3 py-1.5 rounded-lg">
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* First Step Callout */}
                  <div className="bg-[#FFD23F]/8 border border-[#FFD23F]/20 rounded-xl p-5">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-2">Do this today</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/80 leading-[1.7]">{r.firstStep}</p>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-[#18181F] border border-white/[0.06] rounded-xl p-5">
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 leading-[1.7]">
              <strong className="text-white/65">Earnings disclaimer:</strong> The income ranges shown are based on market data and real Filipino freelancer reports. Actual earnings depend on your consistency, effort, skill development, and market conditions. These are not guarantees — they are realistic ranges based on what others have achieved. Your results will vary.
            </p>
          </div>

          {/* Motivational Quote */}
          <div className="mt-6 text-center py-8">
            <p className="font-sans text-[20px] md:text-[24px] font-bold text-white leading-[1.4] mb-3">
              &ldquo;The best time to start was yesterday.<br />The second best time is right now.&rdquo;
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55">
              Your plan is ready. The only thing left is to do step one.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button
              onClick={() => { window.print(); }}
              className="flex-1 bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:opacity-90 transition-all text-center"
            >
              Save as PDF
            </button>
            <button
              onClick={() => { setSection(1); setSelectedSkills([]); setSelectedSituations([]); setSelectedGoals([]); }}
              className="flex-1 bg-[#18181F] border border-white/10 text-white/60 font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:border-white/25 transition-all"
            >
              Start Over
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
