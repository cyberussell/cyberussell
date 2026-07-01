import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "SEO with AI — Build Real Skills | Cyberussell",
  description:
    "Learn how to rank on Google using AI-powered research, writing, and optimization. Practical SEO for Filipino freelancers and business owners.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo" },
  openGraph: {
    title: "SEO with AI | Cyberussell",
    description: "Rank on Google using AI-powered research and writing.",
    url: "https://www.cyberussell.com/learn/skills/seo",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const lessons = [
  { title: "What SEO Actually Is (and Why Most People Do It Wrong)", desc: "Forget keyword stuffing. Learn how Google really ranks pages — and where AI fits in.", href: "/learn/skills/seo/what-seo-actually-is" },
  { title: "Keyword Research with AI: Find What People Are Searching For", desc: "Use ChatGPT and Gemini to find keywords your competitors are missing.", href: "/learn/skills/seo/keyword-research-with-ai" },
  { title: "Writing SEO Content That Ranks and Reads Well", desc: "How to use Claude to write blog posts and landing pages that satisfy both Google and humans.", href: "/learn/skills/seo/writing-seo-content-that-ranks" },
  { title: "On-Page SEO: Titles, Meta Descriptions, and Headers", desc: "The exact elements that affect ranking — and how to optimize them with AI.", href: "/learn/skills/seo/on-page-seo" },
  { title: "Building Backlinks Without Spending Money", desc: "Practical link-building strategies using AI to craft outreach and find opportunities.", href: "/learn/skills/seo/building-backlinks-without-spending-money" },
  { title: "Technical SEO Basics: Speed, Mobile, and Crawlability", desc: "What technical SEO means and the minimum you need to get right.", href: "/learn/skills/seo/technical-seo-basics" },
  { title: "Tracking Your Rankings and Iterating", desc: "How to read your SEO data and use AI to decide what to do next.", href: "/learn/skills/seo/tracking-your-rankings-and-iterating" },
];

export default function SEOSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a>
            <span>/</span>
            <span className="text-white/60">SEO</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 5 · SEO
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            SEO
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            SEO is one of the highest-leverage skills you can learn — it brings in clients and customers
            while you sleep. AI makes it faster to research, write, and optimize. This track teaches you
            how to rank on Google without guessing.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You rank on Google and drive consistent organic traffic using AI.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {lessons.map((lesson, i) => (
              <a
                key={lesson.title}
                href={lesson.href}
                className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5 flex items-start gap-4 hover:border-[#E8373A]/30 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#E8373A] text-[12px] font-bold font-[family-name:var(--font-inter)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#E8373A]/60 shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
            ← Back to Build Real Skills
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
