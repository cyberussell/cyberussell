import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, Sparkles, UserCircle, Keyboard, type LucideIcon } from "lucide-react";
import { tools, toolCategories } from "@/lib/tools-data";
import RecommendedToolCard from "@/components/RecommendedToolCard";
import type { RecommendedTool } from "@/components/RecommendedToolCard";

const ICON_MAP: Record<string, LucideIcon> = { ShieldCheck, Sparkles, UserCircle, Keyboard };

const RECOMMENDED_TOOLS: RecommendedTool[] = [
  {
    title: "Treehouse — Where I Built My Programming Foundation",
    logo: null,
    desktopBanner: "/teamtreehouse-desktop.png",
    mobileBanner: "/teamtreehouse-mobile.png",
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

export const metadata: Metadata = {
  title: "AI Tools for Filipinos — Free Tools to Learn, Work & Earn Online | Cyberussell",
  description:
    "Free AI tools built for Filipinos. Detect scams, improve your prompts, generate freelancer bios, and more. No sign-up required.",
  alternates: { canonical: "https://www.cyberussell.com/tools" },
  openGraph: {
    title: "AI Tools for Filipinos — Cyberussell",
    description:
      "Free AI tools built to help Filipinos learn skills, find work, build websites, and earn online.",
    url: "https://www.cyberussell.com/tools",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tools for Filipinos — Cyberussell",
    description:
      "Free AI tools built to help Filipinos learn skills, find work, build websites, and earn online.",
    images: ["/og-image.jpg?v=2"],
  },
};

const STATUS_STYLES: Record<string, string> = {
  Free: "text-[#00C97A] bg-[#00C97A]/10 border-[#00C97A]/20",
  Beta: "text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20",
  Premium: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/20",
};

export default function ToolsPage() {
  const featuredTools = tools.filter((t) => t.featured);


  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cyberussell AI Tools",
    description: "Free AI tools built to help Filipinos learn, work, build websites, and earn online.",
    url: "https://www.cyberussell.com/tools",
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      description: tool.shortDescription,
      url: `https://www.cyberussell.com/tools/${tool.slug}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.cyberussell.com" },
      { "@type": "ListItem", position: 2, name: "AI Tools", item: "https://www.cyberussell.com/tools" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        {/* Hero */}
        <section className="px-6 md:px-10 pt-20 pb-12 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8373A] animate-pulse" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              AI Tools
            </span>
          </div>
          <h1 className="font-sans text-[40px] md:text-[58px] font-bold text-white mb-5 leading-tight">
            Free AI Tools Built for{" "}
            <span className="text-[#FFD23F]">Filipinos</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/55 max-w-xl mx-auto leading-[1.8]">
            Use AI to detect scams, improve your prompts, build your freelancer profile, and more.
            No sign-up. No payment. Just tools that work.
          </p>
        </section>

        {/* Featured Tools */}
        <section className="px-6 md:px-10 pb-16 max-w-7xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Featured Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map((tool) => {
              const Icon = ICON_MAP[tool.icon];
              return (
              <a
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 hover:border-white/20 hover:bg-[#1e1e2a] transition-all group flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-white/[0.06] flex items-center justify-center">
                    {Icon && <Icon size={20} className="text-white/70" strokeWidth={1.8} />}
                  </div>
                  <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold border px-2 py-0.5 rounded-full ${STATUS_STYLES[tool.status]}`}>
                    {tool.status}
                  </span>
                </div>
                <span className="inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.08em] uppercase text-[#E8373A] bg-[#E8373A]/8 border border-[#E8373A]/20 px-2.5 py-1 rounded-full mb-3 w-fit">
                  {tool.category}
                </span>
                <h3 className="text-white text-[18px] font-bold mb-2 group-hover:text-[#FFD23F] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-white/55 text-[14px] leading-[1.6] font-[family-name:var(--font-inter)] flex-1">
                  {tool.shortDescription}
                </p>
                <span className="mt-4 text-[13px] font-bold font-[family-name:var(--font-inter)] text-[#FFD23F] group-hover:text-white transition-colors">
                  {tool.ctaLabel} →
                </span>
              </a>
              );
            })}
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
