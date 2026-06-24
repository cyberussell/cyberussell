"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

type Way = {
  num: number;
  title: string;
  earn: string;
  time: string;
  capital: string;
  platform: string;
  intro: string;
  levels: { label: string; amount: string; color: string }[];
  tools: { name: string; note: string; link?: string }[];
  platforms: { name: string; desc: string; link: string }[];
  steps: string[];
  firststep: string;
  good: string;
  bad: string;
  bestfor: string;
  source: string;
};

const WAYS: Way[] = [
  {
    num: 1,
    title: "Virtual Assistant",
    earn: "₱15,000–₱65,000/mo",
    time: "2–4 weeks",
    capital: "None",
    platform: "OnlineJobs.ph · Upwork",
    intro: "A VA helps business owners with scheduling, emails, data entry, social media, research, and customer service. Filipinos are globally recognized as excellent VAs because of strong English skills and work ethic. This is the most popular entry point for Filipino online earners.",
    levels: [
      { label: "Beginner (0–3 months)", amount: "₱15,000–₱25,000", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "Growing (3–12 months)", amount: "₱25,000–₱45,000", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "Experienced (1+ year)", amount: "₱45,000–₱65,000", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Laptop or desktop computer", note: "Required" },
      { name: "Stable internet — 10 Mbps min", note: "Required" },
      { name: "Google Workspace", note: "Free", link: "https://workspace.google.com" },
      { name: "Zoom for client calls", note: "Free", link: "https://zoom.us" },
      { name: "Trello for task management", note: "Free", link: "https://trello.com" },
    ],
    platforms: [
      { name: "OnlineJobs.ph", desc: "Built specifically for Filipino VAs.", link: "https://www.onlinejobs.ph" },
      { name: "Upwork", desc: "Global platform, higher rates.", link: "https://www.upwork.com" },
      { name: "Freelancer.com", desc: "Good for beginners.", link: "https://www.freelancer.com" },
    ],
    steps: [
      "List every skill you have — scheduling, email, research, social media, data entry",
      "Create free profile on OnlineJobs.ph with your skills and availability",
      "Apply to 10–20 VA listings every day — consistency over perfection",
      "Start at ₱150–₱200/hour to land first reviews faster",
      "After 5 reviews — raise rate and specialize in one area",
    ],
    firststep: "Create your OnlineJobs.ph profile today. Fill in your skills, set your rate at ₱150/hour, write a clear 3-sentence intro. Apply to 5 jobs before you sleep tonight.",
    good: "High demand globally, stable income, Filipinos are top-ranked as VAs worldwide.",
    bad: "Takes 2–4 weeks to land first client. Client timezones may require early morning or late night work.",
    bestfor: "Organized, reliable, comfortable with English",
    source: "Wise.com Philippines Freelancer Guide 2026 · OKGames 2026",
  },
  {
    num: 2,
    title: "Online English Teaching",
    earn: "₱10,000–₱55,000/mo",
    time: "1–3 weeks",
    capital: "None",
    platform: "Preply · iTalki · 51Talk",
    intro: "Filipinos are recognized worldwide as some of the best English teachers. Students from Japan, South Korea, China, and Europe actively seek Filipino tutors for our clear accent, patience, and teaching style. No degree required on most platforms.",
    levels: [
      { label: "Beginner (part-time)", amount: "₱10,000–₱20,000", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "Growing (regular students)", amount: "₱20,000–₱40,000", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "Full time (6hrs/day)", amount: "₱40,000–₱55,000", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Laptop with camera and mic", note: "Required" },
      { name: "Stable internet 10+ Mbps", note: "Required" },
      { name: "Preply account", note: "Free", link: "https://www.preply.com" },
      { name: "iTalki account", note: "Free", link: "https://www.italki.com" },
      { name: "TEFL certificate (optional)", note: "+30–50% rate increase", link: "https://www.tefl.org" },
    ],
    platforms: [
      { name: "Preply", desc: "Most popular, good student volume.", link: "https://www.preply.com" },
      { name: "iTalki", desc: "Lower commission, flexible.", link: "https://www.italki.com" },
      { name: "51Talk", desc: "Focused on Chinese students.", link: "https://www.51talk.com" },
    ],
    steps: [
      "Create Preply or iTalki profile with 1-minute intro video",
      "Set starting rate at ₱150–₱200/hour for fast first reviews",
      "Accept all trial lessons — these convert to regulars",
      "Build 5–10 regular weekly students for stable income",
      "After 5+ reviews — raise rate to ₱250–₱350/hour",
    ],
    firststep: "Go to Preply.com now. Create your tutor profile, record a 60-second intro video, set rate at ₱150/hour. Apply as a tutor and wait for your first trial lesson request.",
    good: "Flexible schedule, high demand, Filipinos have natural advantage. Jenny from Davao earns ₱55,000/mo teaching 6 hours a day.",
    bad: "Building first 5 reviews takes patience. Most students book at Asian timezones — early mornings common.",
    bestfor: "Patient, enjoys teaching, confident English speaker",
    source: "OKGames Philippine Online Income Report 2026",
  },
  {
    num: 3,
    title: "Freelance Writing",
    earn: "₱8,000–₱40,000/mo",
    time: "2–6 weeks",
    capital: "None",
    platform: "Upwork · ProBlogger",
    intro: "Every business needs content — blog posts, product descriptions, email campaigns, and ad copy. Filipino writers are in high demand globally. You don't need a journalism degree — you need good writing and 3 sample articles.",
    levels: [
      { label: "Beginner (₱2/word)", amount: "₱8,000–₱15,000", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "Intermediate (₱5/word)", amount: "₱15,000–₱28,000", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "Copywriter (₱10/word)", amount: "₱28,000–₱40,000", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Laptop and stable internet", note: "Required" },
      { name: "Google Docs", note: "Free", link: "https://docs.google.com" },
      { name: "Grammarly", note: "Free tier", link: "https://www.grammarly.com" },
      { name: "Medium for portfolio", note: "Free", link: "https://medium.com" },
      { name: "Upwork account", note: "Free", link: "https://www.upwork.com" },
    ],
    platforms: [
      { name: "Upwork", desc: "Best for long-term clients and higher rates.", link: "https://www.upwork.com" },
      { name: "ProBlogger Job Board", desc: "Content writing jobs worldwide.", link: "https://problogger.com/jobs" },
      { name: "Medium", desc: "Publish samples here as your portfolio.", link: "https://medium.com" },
    ],
    steps: [
      "Pick a niche — health, tech, finance, or travel pay most",
      "Write 3–5 samples on your niche and publish on Medium",
      "Create Upwork profile linking to your Medium samples",
      "Apply to 5–10 writing jobs per day for 2–3 weeks",
      "Start ₱2/word — raise to ₱5/word after 5 reviews",
    ],
    firststep: "Choose your niche today. Write one 800-word sample article and publish it on Medium. That is your first portfolio piece. Everything else follows from there.",
    good: "Work anywhere, high international demand. Top Filipino writers earn ₱10/word for copywriting.",
    bad: "AI tools create competition at lower price points. Clients want samples before hiring.",
    bestfor: "Enjoys writing, meets deadlines, passionate about a specific topic",
    source: "Wise.com Philippines Freelancer Guide 2026",
  },
  {
    num: 4,
    title: "Canva Design",
    earn: "₱5,000–₱30,000/mo",
    time: "1–3 weeks",
    capital: "None",
    platform: "Fiverr · Facebook · Direct",
    intro: "Every business needs visual content — logos, social media graphics, flyers, and presentations. Canva made design accessible without expensive software or a design degree. No degree needed — just an eye for layout and color.",
    levels: [
      { label: "Logo design", amount: "₱500–₱1,500/project", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "Social media packages", amount: "₱3,000–₱10,000", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "Monthly retainer", amount: "₱15,000–₱30,000/mo", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Canva free account", note: "Free", link: "https://www.canva.com" },
      { name: "Canva Pro (optional)", note: "₱599/mo", link: "https://www.canva.com/pro" },
      { name: "Behance for portfolio", note: "Free", link: "https://www.behance.net" },
      { name: "Fiverr for clients", note: "Free", link: "https://www.fiverr.com" },
      { name: "ColorHunt for color ideas", note: "Free", link: "https://colorhunt.co" },
    ],
    platforms: [
      { name: "Fiverr", desc: "International clients, good for logo and social design.", link: "https://www.fiverr.com" },
      { name: "Facebook Groups", desc: "Local businesses needing affordable design.", link: "https://www.facebook.com" },
      { name: "Canva Creators", desc: "Sell templates on Canva.", link: "https://www.canva.com/creators" },
    ],
    steps: [
      "Learn Canva basics from YouTube — 1 week of practice",
      "Create 10 samples: logos, social posts, flyers",
      "Offer free designs to 2–3 local businesses for testimonials",
      "List on Fiverr and post in local business Facebook groups",
      "Upsell to monthly social media packages",
    ],
    firststep: "Create a free Canva account today. Watch one beginner tutorial. Design one fake logo for a fictional Filipino business. Save it. That is day one.",
    good: "Low barrier, free tools, local businesses always need design. Monthly retainers = stable income.",
    bad: "Canva is widely used — differentiate through style and service. Client revisions can be time-consuming.",
    bestfor: "Creative, eye for color and layout, enjoys visual work",
    source: "Wise.com 2026 · Jobbers.io Filipino Freelancer Guide 2025",
  },
  {
    num: 5,
    title: "TikTok Affiliate",
    earn: "₱3,000–₱50,000/mo",
    time: "2–4 weeks",
    capital: "None",
    platform: "TikTok Shop · Ecomobi",
    intro: "Earn commission every time someone buys through your link after watching your content. No inventory. No shipping. No capital. Philippines has 43 million TikTok users. 80% of Filipino consumers have already bought through affiliate links.",
    levels: [
      { label: "Month 1 (building)", amount: "₱3,000–₱8,000", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "3–6 months (growing)", amount: "₱8,000–₱20,000", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "6+ months (scaling)", amount: "₱20,000–₱50,000", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Smartphone with decent camera", note: "Required" },
      { name: "TikTok account", note: "Free", link: "https://www.tiktok.com" },
      { name: "TikTok Shop Affiliate", note: "Needs 1,000 followers", link: "https://affiliate.tiktokshop.com" },
      { name: "Ecomobi for PH affiliates", note: "Free", link: "https://ecomobi.com" },
      { name: "Canva for thumbnails", note: "Free", link: "https://www.canva.com" },
    ],
    platforms: [
      { name: "TikTok Shop Affiliate", desc: "3–15% commission on products.", link: "https://affiliate.tiktokshop.com" },
      { name: "Ecomobi", desc: "Manages TikTok campaigns for PH creators.", link: "https://ecomobi.com" },
      { name: "Shopee Affiliate", desc: "Earn from Shopee product links.", link: "https://affiliate.shopee.ph" },
    ],
    steps: [
      "Pick niche — beauty, food, tech, home products convert best in PH",
      "Post 2–3 TikTok videos daily until 1,000 followers",
      "Apply for TikTok Shop Affiliate at 1,000 followers",
      "Post authentic product reviews — real content converts better",
      "Track which products convert and post more of those",
    ],
    firststep: "Download TikTok today. Create your account. Post one video about a product you genuinely use and like — even if it gets 10 views. That is your first affiliate content.",
    good: "Zero capital, no inventory. One viral video can generate thousands in commission. Works without showing your face.",
    bad: "IMPORTANT — TikTok Creator Fund (payment per views) is NOT available in Philippines. Income from commissions only, not views.",
    bestfor: "Comfortable creating short videos, willing to post consistently",
    source: "Ecomobi Philippines 2026 · Cube Asia FY 2025",
  },
  {
    num: 6,
    title: "Online Selling",
    earn: "₱2,000–₱100,000+/mo",
    time: "1–2 weeks",
    capital: "Low–Medium",
    platform: "Shopee · TikTok Shop",
    intro: "Philippine e-commerce reaches $20 billion in 2026. Shopee has 55% market share and TikTok Shop grew 53% year-on-year. Sell your own products, resell items, or sell unique local provincial goods that aren't available in Metro Manila.",
    levels: [
      { label: "First month (testing)", amount: "₱2,000–₱8,000", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "Growing (3 months)", amount: "₱8,000–₱25,000", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "Scaling (6+ months)", amount: "₱25,000–₱100,000+", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Smartphone for product photos", note: "Required" },
      { name: "Shopee Seller account", note: "Free", link: "https://seller.shopee.ph" },
      { name: "TikTok Shop Seller", note: "Free", link: "https://seller.tiktokshop.com/ph" },
      { name: "GCash for payments", note: "Free", link: "https://www.gcash.com" },
      { name: "Canva for product banners", note: "Free", link: "https://www.canva.com" },
    ],
    platforms: [
      { name: "Shopee Philippines", desc: "55% of PH e-commerce market.", link: "https://shopee.ph" },
      { name: "TikTok Shop", desc: "53% growth in 2025, live selling drives massive orders.", link: "https://www.tiktokshop.com" },
      { name: "Facebook Marketplace", desc: "Local sales, zero platform fees.", link: "https://www.facebook.com/marketplace" },
    ],
    steps: [
      "Choose what to sell — your products, resell, or local provincial goods",
      "Take product photos: white background + natural light",
      "Open Shopee shop with at least 10 complete listings",
      "Join Shopee flash sales and voucher programs",
      "Create TikTok content showing products — live selling drives the most orders",
    ],
    firststep: "Decide what you will sell today. Take 5 photos of your product. Open a free Shopee Seller account. List your first product. Done.",
    good: "Free platforms, flexible products. TikTok Live can generate hundreds of orders in one session. Local provincial goods are untapped.",
    bad: "Requires upfront capital for inventory. Shipping issues and returns are common. High competition on popular categories.",
    bestfor: "Has a product to sell, access to unique local goods, or willing to invest in inventory",
    source: "Cube Asia FY 2025 · Mordor Intelligence 2026",
  },
  {
    num: 7,
    title: "Video Editing",
    earn: "₱5,000–₱30,000/mo",
    time: "2–4 weeks",
    capital: "Medium (laptop)",
    platform: "Upwork · Fiverr · Direct",
    intro: "Demand for video editors in Philippines grew 40% in 2025 because of TikTok and YouTube. Every creator and business needs edited videos and most can't do it themselves. Learn from YouTube in 2 weeks and start earning.",
    levels: [
      { label: "Short videos (TikTok/Reels)", amount: "₱500–₱1,500/video", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "YouTube long-form", amount: "₱2,000–₱5,000/video", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "Monthly retainer", amount: "₱15,000–₱30,000/mo", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Laptop with 8GB RAM minimum", note: "Required" },
      { name: "CapCut", note: "Free desktop version", link: "https://www.capcut.com" },
      { name: "DaVinci Resolve", note: "Free, professional quality", link: "https://www.blackmagicdesign.com/products/davinciresolve" },
      { name: "Pexels for free footage", note: "Free", link: "https://www.pexels.com" },
      { name: "Fiverr for clients", note: "Free", link: "https://www.fiverr.com" },
    ],
    platforms: [
      { name: "Fiverr", desc: "Best for short-form TikTok and Reels editing.", link: "https://www.fiverr.com" },
      { name: "Upwork", desc: "Better for YouTube and monthly retainers.", link: "https://www.upwork.com" },
      { name: "Facebook Groups", desc: "Local creators and businesses looking for editors.", link: "https://www.facebook.com" },
    ],
    steps: [
      "Learn CapCut from YouTube — search CapCut tutorial Philippines",
      "Edit 5–10 sample videos using free Pexels footage",
      "Offer free editing to 2 TikTok creators for a testimonial",
      "Create Fiverr gig starting at ₱500 per video",
      "Upsell to monthly retainer packages after 5 reviews",
    ],
    firststep: "Download CapCut on your laptop today. Watch one 30-minute beginner tutorial. Edit a 60-second video using any footage you have. Save it. That is your first sample.",
    good: "High demand for short-form content. Monthly retainers = stable income. CapCut is free and powerful.",
    bad: "Requires decent laptop — low RAM computers will struggle. Client revision rounds without clear limits eat your time.",
    bestfor: "Detail-oriented, tech-comfortable, enjoys visual storytelling",
    source: "OKGames Philippine Online Income Report 2026",
  },
  {
    num: 8,
    title: "AI-Assisted Services",
    earn: "₱20,000–₱100,000+/mo",
    time: "1–3 weeks",
    capital: "None",
    platform: "Upwork · Direct clients",
    intro: "The fastest-growing and highest-paying income path for Filipinos in 2026. Using AI tools like Claude, ChatGPT, and Midjourney to deliver services 10x faster than traditional freelancers. You don't need to code — you need to know how to direct AI tools to get results.",
    levels: [
      { label: "AI content and writing", amount: "₱20,000–₱40,000/mo", color: "bg-[#3B82F6]/10 border-[#3B82F6]/20 text-[#3B82F6]" },
      { label: "AI web building", amount: "₱40,000–₱80,000/mo", color: "bg-[#00C97A]/10 border-[#00C97A]/20 text-[#00C97A]" },
      { label: "AI consulting & automation", amount: "₱80,000–₱100,000+/mo", color: "bg-[#FFD23F]/10 border-[#FFD23F]/20 text-[#FFD23F]" },
    ],
    tools: [
      { name: "Claude AI", note: "Free tier available", link: "https://claude.ai" },
      { name: "ChatGPT", note: "Free tier available", link: "https://chat.openai.com" },
      { name: "Midjourney for AI images", note: "Paid", link: "https://www.midjourney.com" },
      { name: "Claude Code", note: "Inside Claude app", link: "https://claude.ai" },
      { name: "Google Stitch for UI design", note: "Free", link: "https://stitch.withgoogle.com" },
    ],
    platforms: [
      { name: "Upwork", desc: "Position as AI specialist — premium rates.", link: "https://www.upwork.com" },
      { name: "Contra", desc: "Good for AI freelancers, lower fees.", link: "https://contra.com" },
      { name: "Direct outreach", desc: "Approach local businesses — they need AI help most.", link: "#" },
    ],
    steps: [
      "Create free Claude AI account and learn effective prompting",
      "Choose ONE service to offer: AI content, images, or web building",
      "Build 3 real examples and document your process",
      "Position as AI consultant for local businesses",
      "Offer AI setup for one business at ₱5,000–₱15,000",
    ],
    firststep: "Go to claude.ai right now. Create a free account. Ask Claude: 'I want to offer AI services to Philippine businesses. What should I start with?' That conversation gives you your first service offering.",
    good: "Highest earning potential of all 8 paths. AI makes you 10x faster. Provincial businesses are completely underserved.",
    bad: "Fast-evolving — requires continuous learning. Show results first, not explanations about which AI tool you used.",
    bestfor: "Tech-comfortable fast learner, enjoys solving problems creatively",
    source: "Wise.com Philippines Freelancer Guide 2026 · OKGames 2026",
  },
];

export default function EightWaysGuide() {
  const [activeWay, setActiveWay] = useState(0);
  const way = WAYS[activeWay];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
        {WAYS.map((w, i) => (
          <button
            key={w.num}
            onClick={() => setActiveWay(i)}
            className={`bg-[#18181F] border rounded-xl p-3 text-left transition-all ${
              i === activeWay
                ? "border-[#E8373A]/60 bg-[#E8373A]/5"
                : "border-white/10 hover:border-white/25"
            }`}
          >
            <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1px] ${i === activeWay ? "text-[#E8373A]" : "text-white/30"}`}>
              Way {w.num}
            </span>
            <p className="font-sans text-[13px] font-bold text-white mt-1 leading-tight">{w.title}</p>
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#00C97A] mt-1">{w.earn}</p>
          </button>
        ))}
      </div>

      {/* Active Way Content */}
      <div className="flex flex-col gap-8">

        {/* Header Card */}
        <div className="bg-[#18181F] border border-white/10 rounded-2xl overflow-hidden">
          <div className="h-[3px] bg-gradient-to-r from-[#E8373A] to-[#FFD23F]" />
          <div className="p-6 md:p-8">
            <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#E8373A] uppercase tracking-[2px]">
              Way {way.num} of 8
            </span>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white mt-2 mb-3">{way.title}</h2>
            <span className="inline-block bg-[#00C97A]/10 border border-[#00C97A]/20 text-[#00C97A] font-[family-name:var(--font-inter)] text-[13px] font-bold px-3 py-1 rounded-full mb-5">
              {way.earn}
            </span>
            <div className="flex flex-wrap gap-4 font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span>Time to first income: <strong className="text-white">{way.time}</strong></span>
              <span>Capital needed: <strong className="text-white">{way.capital}</strong></span>
              <span>Best platform: <strong className="text-white">{way.platform}</strong></span>
            </div>
          </div>
        </div>

        {/* Intro */}
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
          {way.intro}
        </p>

        {/* Income Progression */}
        <div>
          <h3 className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-4">
            Income progression
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {way.levels.map((level) => (
              <div key={level.label} className={`${level.color.split(" ")[0]} border ${level.color.split(" ")[1]} rounded-xl p-4`}>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/50 mb-1">{level.label}</p>
                <p className={`font-sans text-[18px] font-bold ${level.color.split(" ")[2]}`}>{level.amount}</p>
              </div>
            ))}
          </div>
        </div>

        {/* First Step Callout */}
        <div className="bg-[#FFD23F]/8 border border-[#FFD23F]/20 rounded-xl p-5">
          <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-2">
            Your first step — do this today
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/80 leading-[1.7]">
            {way.firststep}
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What you need */}
          <div className="bg-[#18181F] border border-white/10 rounded-xl p-6">
            <h3 className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-4">
              What you need to start
            </h3>
            <div className="flex flex-col gap-3">
              {way.tools.map((tool) => (
                <div key={tool.name} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-[#00C97A] shrink-0 mt-[2px]" strokeWidth={2.5} aria-hidden="true" />
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white font-bold">{tool.name}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">{tool.note}</p>
                    {tool.link && (
                      <a href={tool.link} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[11px] text-[#E8373A] hover:underline">
                        Go to site &rarr;
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* How to get started */}
          <div className="bg-[#18181F] border border-white/10 rounded-xl p-6">
            <h3 className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-4">
              How to get started
            </h3>
            <div className="flex flex-col gap-4">
              {way.steps.map((step, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] bg-[#E8373A]/10 rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-[1px]">
                    {i + 1}
                  </span>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6]">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platforms */}
        <div>
          <h3 className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-4">
            Platforms
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {way.platforms.map((p) => (
              <div key={p.name} className="bg-[#18181F] border border-white/10 rounded-xl p-4 flex flex-col">
                <p className="font-sans text-[15px] font-bold text-white mb-1">{p.name}</p>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 mb-3 flex-grow">{p.desc}</p>
                {p.link !== "#" && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#E8373A] hover:underline">
                    Sign up free &rarr;
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Reality Check */}
        <div className="bg-[#18181F] border border-white/10 rounded-xl overflow-hidden">
          <div className="border-b border-white/[0.06] px-5 py-3 flex gap-3 items-start">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#00C97A] uppercase tracking-[1px] shrink-0 mt-[2px] min-w-[80px]">The good</span>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-[1.6]">{way.good}</p>
          </div>
          <div className="border-b border-white/[0.06] px-5 py-3 flex gap-3 items-start">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[1px] shrink-0 mt-[2px] min-w-[80px]">The reality</span>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-[1.6]">{way.bad}</p>
          </div>
          <div className="px-5 py-3 flex gap-3 items-start">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] shrink-0 mt-[2px] min-w-[80px]">Best for</span>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-[1.6]">{way.bestfor}</p>
          </div>
        </div>

        {/* Source */}
        <p className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 italic">
          Source: {way.source}
        </p>
      </div>
    </div>
  );
}
