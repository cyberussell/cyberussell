import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RecommendedToolCard from "@/components/RecommendedToolCard";
import type { RecommendedTool } from "@/components/RecommendedToolCard";
import {
  BookOpen,
  Brain,
  Users,
  GitBranch,
  Wrench,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI Academy — Learn to Work with AI | Cyberussell",
  description:
    "Master practical AI skills that help you think better, solve problems faster, and prepare for real online opportunities. Every guide is designed to help you apply AI — not just learn about it.",
  alternates: { canonical: "https://www.cyberussell.com/learn" },
  openGraph: {
    title: "AI Academy | Cyberussell",
    description:
      "Learn to work with AI as your research partner, writing assistant, programmer, designer, and business advisor.",
    url: "https://www.cyberussell.com/learn",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
};

const pillars = [
  {
    icon: BookOpen,
    title: "AI Foundations",
    desc: "Understand how modern AI works and build the mindset needed to use it effectively — before you rely on it.",
    outcome: "You understand AI before trusting it.",
    href: "/learn/foundations",
    color: "#4F8EF7",
  },
  {
    icon: Brain,
    title: "Think with AI",
    desc: "Learn to collaborate — not just prompt. Break problems down, iterate, critique, and make better decisions with AI.",
    outcome: "You stop one-shot asking and start co-thinking.",
    href: "/learn/think",
    color: "#A855F7",
  },
  {
    icon: Users,
    title: "Meet Your AI Team",
    desc: "ChatGPT, Claude, Gemini — each has a role. Learn when to use which AI and why it matters for your work.",
    outcome: "You know which AI to pick for any task.",
    href: "/learn/ai-team",
    color: "#22C55E",
  },
  {
    icon: GitBranch,
    title: "AI Workflows",
    desc: "AI tools work best together. Learn multi-tool workflows for real tasks: writing, research, building, business.",
    outcome: "You chain AI tools to get real results faster.",
    href: "/learn/workflows",
    color: "#F59E0B",
  },
  {
    icon: Wrench,
    title: "Build Real Skills",
    desc: "Traditional skills — writing, design, SEO, coding, marketing — taught through the lens of AI. No fluff.",
    outcome: "You develop sellable skills using AI as your partner.",
    href: "/learn/skills",
    color: "#E8373A",
  },
  {
    icon: Target,
    title: "AI Missions",
    desc: "Replace lessons with missions. Complete a resume. Build a landing page. Write a proposal. Deliver real output.",
    outcome: "You build a portfolio of real completed work.",
    href: "/learn/missions",
    color: "#FFD23F",
  },
];

const RECOMMENDED_TOOLS: RecommendedTool[] = [
  {
    title: "Treehouse — Where I Built My Programming Foundation",
    logo: null,
    desktopBanner: "/teamtreehouse-desktop.png",
    badges: ["Personally Used", "Recommended"],
    body: (
      <>
        <p>Sa Cyberussell, ang goal ko ay tulungan kang matuto ng practical digital skills na magagamit mo sa totoong buhay. Kaya ang mga tools na makikita mo rito ay hindi basta affiliate links—mga tools ito na personal kong nagamit at nakatulong sa career ko.</p>
        <p>Bago pa magkaroon ng ChatGPT at Claude, kailangan mo munang maintindihan ang fundamentals ng programming. Isa sa mga platform na talagang nakatulong sa akin ay Treehouse.</p>
        <p>Structured ang lessons nila, may coding exercises, quizzes, at project-based learning kaya hindi ka basta nanonood lang ng videos. Unti-unti mong nabubuo ang foundation mo bilang developer.</p>
        <p>Dito ko mas naintindihan ang mga concepts sa:</p>
        <ul className="list-disc list-inside space-y-1 text-white/55 pl-1">
          {["HTML & CSS", "JavaScript", "PHP", "Databases", "APIs", "Web Development Fundamentals"].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>Hanggang ngayon, dala ko pa rin ang mga natutunan ko habang gumagawa ng mga projects tulad ng Cyberussell.</p>
      </>
    ),
    faq: [
      {
        question: "Libre naman ang YouTube. Bakit Treehouse?",
        answer: "Maraming libre sa YouTube, at marami rin akong natutunan doon. Pero kapag beginner ka, madali kang maligaw dahil iba-iba ang teaching style, walang malinaw na learning path, at minsan hindi mo alam kung ano ang susunod mong aaralin. Sa Treehouse, nakaayos ang curriculum. Hindi mo na kailangan manghula kung ano ang next step.",
      },
    ],
    whoIsItFor: [
      "Complete beginners",
      "Future Web Developers",
      "Career Shifters",
      "Freelancers",
      "Students",
      "Anyone who wants a solid programming foundation",
    ],
    recommendationBody: (
      <p>Kung seryoso kang matuto ng web development, isa ito sa mga platform na irerekomenda ko dahil personal ko itong nagamit at naging malaking bahagi ng journey ko bilang developer. Kung mag-sign up ka gamit ang link sa ibaba, makakatulong ka rin sa Cyberussell—walang dagdag na gastos sa iyo, pero makakatulong ito para makagawa pa ako ng mas maraming libreng guides at AI-powered learning resources para sa ating community.</p>
    ),
    ctaText: "Start Learning with Treehouse",
    ctaUrl: process.env.NEXT_PUBLIC_AFFILIATE_TREEHOUSE || "https://teamtreehouse.com",
    disclaimer: "I only recommend products and services that I personally use or have used and genuinely believe can help others learn and grow.",
  },
];

export default function LearnPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        {/* Hero */}
        <section className="px-6 md:px-10 pt-20 pb-14 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8373A] animate-pulse" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              AI Academy
            </span>
          </div>
          <h1 className="font-sans text-[40px] md:text-[58px] font-bold text-white mb-5 leading-tight">
            Learn to Work{" "}
            <span className="text-[#FFD23F]">with AI</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/55 max-w-xl mx-auto leading-[1.8] mb-10">
            Master practical AI skills that help you think better, solve problems faster, and prepare
            for real online opportunities. Every guide is designed to help you apply AI — not just learn about it.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#pillars"
              className="bg-[#E8373A] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-7 py-3.5 rounded-xl"
            >
              Start Learning
            </a>
            <a
              href="/tools"
              className="bg-white/[0.07] hover:bg-white/[0.12] transition-colors border border-white/[0.1] text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-7 py-3.5 rounded-xl"
            >
              Explore AI Tools
            </a>
          </div>
        </section>

        {/* Philosophy */}
        <section className="px-6 md:px-10 pb-16 max-w-3xl mx-auto text-center">
          <p className="font-[family-name:var(--font-inter)] text-[15px] md:text-[16px] text-white/50 leading-[1.9]">
            Most people try to learn ChatGPT, Claude, or Gemini one feature at a time.
            Cyberussell teaches something different — how to work with AI as your research partner,
            writing assistant, programmer, designer, and business advisor.
            The goal isn't to know everything. The goal is to <span className="text-white/80">accomplish more</span>.
          </p>
        </section>

        {/* Pillars */}
        <section id="pillars" className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-3">
              6 Learning Pillars
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/45">
              A structured path from understanding AI to delivering real results with it.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <a
                  key={pillar.href}
                  href={pillar.href}
                  className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${pillar.color}18` }}
                    >
                      <Icon size={20} style={{ color: pillar.color }} strokeWidth={1.8} />
                    </div>
                    <span
                      className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px]"
                      style={{ color: `${pillar.color}99` }}
                    >
                      Pillar {i + 1}
                    </span>
                  </div>
                  <h3 className="font-sans text-[17px] font-bold text-white mb-2 group-hover:text-[#FFD23F] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.6] flex-1 mb-4">
                    {pillar.desc}
                  </p>
                  <div className="border-t border-white/[0.06] pt-4">
                    <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 mb-3">
                      Outcome
                    </p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 italic leading-[1.5]">
                      "{pillar.outcome}"
                    </p>
                  </div>
                  <span className="mt-4 text-[13px] font-bold font-[family-name:var(--font-inter)] text-[#FFD23F] group-hover:text-white transition-colors">
                    Explore →
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Core belief banner */}
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-[#E8373A]/10 via-[#FFD23F]/5 to-[#E8373A]/10 border border-[#FFD23F]/15 rounded-2xl p-8 md:p-12 text-center">
            <p className="font-sans text-[20px] md:text-[26px] font-bold text-white leading-[1.5] mb-4">
              AI won&rsquo;t replace people.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/60 max-w-2xl mx-auto leading-[1.8]">
              People who know how to work with AI will outperform those who don&rsquo;t.
              Cyberussell exists to teach that way of working.
            </p>
          </div>
        </section>

        {/* Tools I Personally Recommend */}
        <section className="px-6 md:px-10 pb-24 max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
                Personal Picks
              </span>
            </div>
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-3">
              Tools I Personally Recommend
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/45 max-w-lg mx-auto leading-[1.7]">
              Hindi ito advertisement. Mga tools ito na personal kong ginamit at nakatulong sa akin — at sa aming community.
            </p>
          </div>
          <div className="flex flex-col gap-6">
            {RECOMMENDED_TOOLS.map((tool) => (
              <RecommendedToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
