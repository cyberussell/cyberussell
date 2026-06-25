// ─── Hero ────────────────────────────────────────────────────────────────────

export const HERO_BADGE = "🇵🇭 Data from PSA · DOLE · 2026";

export const HERO_SOURCE =
  "PSA Labor Force Survey, April 2026 · Philippine Freelance Economy Report, 2025";

export const HERO_SUBTEXT =
  "This is not a motivational speech. This is real data from PSA — and there is a solution. 2.5 million Filipinos are already earning online. Find out how they started.";

export const HERO_CTA_BELOW =
  "No sign-up · No payment · PDF instantly · Free forever";

export const HERO_STATS = [
  { value: "2.41M", label: "unemployed right now",    color: "text-[#E8373A]", bg: "bg-[#E8373A]/10", border: "border-[#E8373A]/20" },
  { value: "6.03M", label: "want more income",        color: "text-[#E8373A]", bg: "bg-[#E8373A]/10", border: "border-[#E8373A]/20" },
  { value: "2.5M",  label: "already earning online",  color: "text-[#00C97A]", bg: "bg-[#00C97A]/10", border: "border-[#00C97A]/20" },
] as const;

export const HERO_WIDGET_CHIPS = ["cooking", "Canva", "phone repair", "video editing", "writing"] as const;

export const HERO_WIDGET_STATS = [
  { value: "4hrs",  label: "Filipinos spend on social media daily — the opportunity is already there", color: "text-white" },
  { value: "57%",   label: "of PH payments are digital — GCash works, online selling works",          color: "text-[#FFD23F]" },
  { value: "99.5%", label: "of businesses have no online presence — that's the gap you can fill",     color: "text-white" },
  { value: "2.5M",  label: "Filipinos already earning online — proof it's possible",                  color: "text-[#00C97A]" },
] as const;

export const TRUST_BAR_ITEMS = [
  "Built for Filipinos who are ready to start.",
] as const;

// ─── Pain Section ─────────────────────────────────────────────────────────────

export const PAIN_STAT_CARDS = [
  {
    stat: "12.3%",
    title: "Underemployment Rate · March 2026",
    desc: "6.03 million Filipinos have jobs but their income is still not enough. They want to earn more — but they don't know how.",
    source: "Philippine Statistics Authority, LFS March 2026",
  },
  {
    stat: "11.2%",
    title: "Unemployment — Isabela Province, Region II · Cagayan Valley · 2025",
    desc: "The problem is worse outside Metro Manila. In Isabela province and across Cagayan Valley, job opportunities are limited — but the opportunity for online income remains largely untapped by most residents.",
    source: "PSA Regional Labor Statistics, Region II · 2025",
  },
] as const;

export const PAIN_ITEMS = [
  {
    icon: "MapPin" as const,
    title: "Not enough jobs, especially in the province",
    detail: "Most jobs are in Metro Manila. People in the province have to move away or accept low-paying local work.",
    data: "Region II unemployment: above national average · PSA 2025",
  },
  {
    icon: "TrendingDown" as const,
    title: "Low wages even when employed",
    detail: "The minimum wage in Region II is one of the lowest in the country. Many people work full-time but still cannot cover their family's needs.",
    data: "DOLE Regional Wage Boards, 2025",
  },
  {
    icon: "GraduationCap" as const,
    title: "College degree but no job in your field",
    detail: "Millions of Filipinos graduated from college — but jobs in their field are limited. A degree is no longer a guarantee of good income.",
    data: "12.2% of youth are NEET · PSA April 2026",
  },
  {
    icon: "Lightbulb" as const,
    title: "You have a skill but don't know how to earn from it",
    detail: "Many Filipinos have real skills — but no one taught them how to sell those skills online. Most guides are in English and built for Metro Manila.",
    data: "PH Freelance Economy: 35% growth but most still don't know where to start · 2025",
  },
] as const;

// ─── Infographic ─────────────────────────────────────────────────────────────

export const INCOME_TIERS = [
  {
    title: "Advanced Freelancers / Consultants",
    subtitle: "Web developers, AI specialists, digital marketing experts",
    range: "₱50,000–₱100,000+/month",
    bg: "bg-[#E8373A]/10",
    border: "border-[#E8373A]/20",
    textColor: "text-[#E8373A]",
  },
  {
    title: "Experienced Freelancers / VAs",
    subtitle: "Virtual assistants, writers, designers, social media managers",
    range: "₱20,000–₱65,000/month",
    bg: "bg-[#FFD23F]/10",
    border: "border-[#FFD23F]/20",
    textColor: "text-[#FFD23F]",
  },
  {
    title: "Growing Freelancers (6–18 months)",
    subtitle: "Online tutors, data entry, Canva designers, customer service",
    range: "₱10,000–₱20,000/month",
    bg: "bg-[#00C97A]/10",
    border: "border-[#00C97A]/20",
    textColor: "text-[#00C97A]",
  },
  {
    title: "Beginners (first 1–3 months)",
    subtitle: "Microtasks, basic VA work, affiliate marketing, online selling",
    range: "₱1,800–₱5,000/month",
    bg: "bg-[#3B82F6]/10",
    border: "border-[#3B82F6]/20",
    textColor: "text-[#3B82F6]",
  },
] as const;

export const INCOME_STAT_CARDS = [
  { value: "₱300/page",     label: "What Filipino writers earn for copy and content",                         source: "Wise.com, 2026",   color: "text-[#FFD23F]" },
  { value: "₱28,915",       label: "Average monthly income of Filipino virtual assistants",                   source: "Wise.com, 2026",   color: "text-[#00C97A]" },
  { value: "₱55,000",       label: "Monthly income of a Filipino online English teacher (6hrs/day)",          source: "OKGames, 2026",    color: "text-[#E8373A]" },
  { value: "₱25K–₱45K",    label: "Monthly rate for social media management for international companies",    source: "OKGames, 2026",    color: "text-[#FFD23F]" },
  { value: "3–15%",         label: "TikTok affiliate marketing commission rate",                              source: "Ecomobi, 2026",    color: "text-[#00C97A]" },
  { value: "2–4 weeks",     label: "Average time before a new freelancer gets their first payment",           source: "OKGames, 2026",    color: "text-[#E8373A]" },
] as const;

// ─── Skill Finder ─────────────────────────────────────────────────────────────

export type SkillResult = {
  description: string;
  earning: string;
  paths: readonly string[];
  button: string;
};

export type SkillCategory = {
  icon: "ChefHat" | "Palette" | "PenLine" | "Share2" | "Wrench" | "Video" | "GraduationCap" | "ShoppingBag" | "HelpCircle";
  label: string;
  result: SkillResult;
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: "ChefHat",
    label: "Cooking / Food",
    result: {
      description:
        "Food is one of the most accessible ways to earn online in the Philippines. From TikTok food affiliate to homemade food orders on Messenger — this skill converts directly to income.",
      earning: "₱5,000–₱30,000/month",
      paths: [
        "TikTok Shop Food Affiliate — 8–15% commission",
        "Homemade food orders via Facebook",
        "Recipe content creator — sponsorships",
        "Online cooking class — ₱200–₱500 per session",
      ],
      button: "Get the Food Business Guide",
    },
  },
  {
    icon: "Palette",
    label: "Design / Canva",
    result: {
      description:
        "No Adobe needed. Canva is free and Filipinos who know how to use it earn ₱500 to ₱3,000 per project. From logos to social media graphics — there is always someone looking for this.",
      earning: "₱500–₱3,000/project",
      paths: [
        "Freelance graphic designer — per project",
        "Canva template seller — passive income",
        "Social media graphic creator",
        "Logo designer for local businesses",
      ],
      button: "Get the Design Guide",
    },
  },
  {
    icon: "PenLine",
    label: "Writing / Content",
    result: {
      description:
        "Filipino writers are recognized worldwide. Content writers earn ₱2 to ₱10 per word — and demand keeps growing because AI content still needs a human touch.",
      earning: "₱2–₱10/word",
      paths: [
        "Freelance content writer — international clients",
        "SEO writer — ₱15,000–₱40,000/month",
        "Email copywriter — ₱300–₱2,000 per email",
        "Social media content manager",
      ],
      button: "Get the Writing Guide",
    },
  },
  {
    icon: "Share2",
    label: "Social Media",
    result: {
      description:
        "If you know how to use Facebook and TikTok — you have a skill worth ₱15,000 to ₱40,000 per month. Businesses need someone to manage their social media pages.",
      earning: "₱15,000–₱40,000/month",
      paths: [
        "Social media manager — per client",
        "TikTok content creator + affiliate",
        "Facebook page manager",
        "Content scheduler + analytics reporter",
      ],
      button: "Get the Social Media Guide",
    },
  },
  {
    icon: "Wrench",
    label: "Tech / Repair",
    result: {
      description:
        "Phone technicians, computer repair shops, and tech-savvy Filipinos have a big advantage online. Tools affiliate and service booking content are the two fastest ways to earn from this skill.",
      earning: "₱5,000–₱25,000/month",
      paths: [
        "Tech tools affiliate — TikTok Shop",
        "Online repair consultation",
        "Tech tutorial content creator",
        "Service booking via Facebook content",
      ],
      button: "Get the Tech Guide",
    },
  },
  {
    icon: "Video",
    label: "Video Editing",
    result: {
      description:
        "Demand for video editors in the Philippines grew 40% in 2025 because of TikTok and YouTube. From ₱500 per short video to ₱5,000 per long-form edit — this skill pays well.",
      earning: "₱500–₱5,000/video",
      paths: [
        "Freelance video editor — per project",
        "TikTok video editor for businesses",
        "YouTube editor — monthly retainer",
        "Reels and Shorts specialist",
      ],
      button: "Get the Video Editing Guide",
    },
  },
  {
    icon: "GraduationCap",
    label: "Teaching",
    result: {
      description:
        "Filipinos are recognized as some of the best English teachers in the world. Jenny from Davao earns ₱55,000 per month from online English tutoring — just 6 hours a day on 3 platforms.",
      earning: "₱100–₱300/hour",
      paths: [
        "Online English tutor — Preply, iTalki",
        "Academic tutor — Math, Science",
        "Skills coach or mentor",
        "Online course creator — passive income",
      ],
      button: "Get the Teaching Guide",
    },
  },
  {
    icon: "ShoppingBag",
    label: "Online Selling",
    result: {
      description:
        "The Philippine e-commerce market will reach $20 billion in 2026. Shopee and TikTok Shop give anyone a free platform to sell — even with zero capital to start.",
      earning: "Variable — depends on volume",
      paths: [
        "TikTok Shop affiliate — 3–15% commission",
        "Shopee seller — free to start",
        "Facebook Marketplace seller",
        "Reseller — local to online",
      ],
      button: "Get the Selling Guide",
    },
  },
  {
    icon: "HelpCircle",
    label: "Not Sure Yet",
    result: {
      description:
        "No problem. Most people who earn online today started without knowing what their skill was worth. We will help you find it.",
      earning: "₱1,800–₱5,000/month to start",
      paths: [
        "Data entry / microtasks — easiest starting point",
        "Affiliate marketing — zero skill needed at first",
        "Social media content — if you use Facebook daily",
        "Download our free Skill Finder worksheet",
      ],
      button: "Find My Skill — Free",
    },
  },
];

// ─── Downloads ───────────────────────────────────────────────────────────────

export type GuideIcon = "BarChart2" | "BookOpen" | "ClipboardList" | "Bot" | "TrendingUp" | "MapPin";

export type Guide = {
  icon: GuideIcon;
  iconColor: string;
  previewBg: string;
  title: string;
  desc: string;
  meta: string;
  active: boolean;
  file?: string;
};

export const GUIDES: Guide[] = [
  {
    icon: "BarChart2",
    iconColor: "#E8373A",
    previewBg: "rgba(232,55,58,0.08)",
    title: "The Truth About the Philippine Labor Market 2026",
    desc: "All the data on unemployment, skills gaps, and the industries with real demand for freelancers.",
    meta: "PDF · 8 pages · Data-backed",
    active: true,
    file: "/downloads/ph-labor-market-2026.pdf",
  },
  {
    icon: "BookOpen",
    iconColor: "#00C97A",
    previewBg: "rgba(0,201,122,0.08)",
    title: "8 Ways to Earn Online — Interactive Guide",
    desc: "Every income path includes actual earning data, tools needed, and a reality check on who it's best suited for.",
    meta: "Interactive · Free",
    active: true,
    file: "/guides/8-ways",
  },
  {
    icon: "ClipboardList",
    iconColor: "#FFD23F",
    previewBg: "rgba(255,210,63,0.08)",
    title: "Skill-to-Income Worksheet",
    desc: "A printable worksheet to identify your marketable skills and learn how to package them as a service.",
    meta: "Interactive · Free · No email",
    active: true,
    file: "/guides/worksheet",
  },
  {
    icon: "Bot",
    iconColor: "#3B82F6",
    previewBg: "rgba(59,130,246,0.08)",
    title: "How to Use Claude AI to Start Earning",
    desc: "The exact process used to leverage AI as an assistant — not a replacement.",
    meta: "Interactive · 7 Steps · 10 Copy-Ready Prompts",
    active: true,
    file: "/guides/claude-ai",
  },
  {
    icon: "TrendingUp",
    iconColor: "#E8373A",
    previewBg: "rgba(232,55,58,0.08)",
    title: "Online Scam Checker",
    desc: "Is that earn-online opportunity real or fake? Check it against known Philippine scam patterns before you click, pay, or share your personal info.",
    meta: "Interactive · Free · Instant",
    active: true,
    file: "/guides/scam-checker",
  },
  {
    icon: "MapPin",
    iconColor: "#FFD23F",
    previewBg: "rgba(255,210,63,0.08)",
    title: "5 Reasons Filipinos Fail at Earning Online",
    desc: "The honest mistakes that kill most online income attempts before they start — and exactly how to avoid each one.",
    meta: "Interactive · 5 minutes · Free",
    active: true,
    file: "/guides/mistakes",
  },
];
