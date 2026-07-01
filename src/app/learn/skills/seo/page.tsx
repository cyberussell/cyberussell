import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Lock, ArrowRight } from "lucide-react";

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
  { title: "What SEO Actually Is (and Why Most People Do It Wrong)", desc: "Forget keyword stuffing. Learn how Google really ranks pages — and where AI fits in.", soon: false, href: "#" },
  { title: "Keyword Research with AI: Find What People Are Searching For", desc: "Use ChatGPT and Gemini to find keywords your competitors are missing.", soon: true },
  { title: "Writing SEO Content That Ranks and Reads Well", desc: "How to use Claude to write blog posts and landing pages that satisfy both Google and humans.", soon: true },
  { title: "On-Page SEO: Titles, Meta Descriptions, and Headers", desc: "The exact elements that affect ranking — and how to optimize them with AI.", soon: true },
  { title: "Building Backlinks Without Spending Money", desc: "Practical link-building strategies using AI to craft outreach and find opportunities.", soon: true },
  { title: "Technical SEO Basics: Speed, Mobile, and Crawlability", desc: "What technical SEO means and the minimum you need to get right.", soon: true },
  { title: "Tracking Your Rankings and Iterating", desc: "How to read your SEO data and use AI to decide what to do next.", soon: true },
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
              <div
                key={lesson.title}
                className={`bg-[#18181F] border rounded-[12px] p-5 flex items-start gap-4 ${
                  lesson.soon
                    ? "border-white/[0.06] opacity-60"
                    : "border-white/[0.08] hover:border-[#E8373A]/30 transition-all"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  {lesson.soon ? (
                    <Lock size={14} className="text-[#E8373A]/40" />
                  ) : (
                    <span className="text-[#E8373A] text-[12px] font-bold font-[family-name:var(--font-inter)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                  {lesson.soon && (
                    <span className="mt-2 inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Coming soon</span>
                  )}
                </div>
                {!lesson.soon && lesson.href && (
                  <a href={lesson.href} className="shrink-0 mt-1">
                    <ArrowRight size={16} className="text-[#E8373A]/60 hover:text-[#E8373A] transition-colors" />
                  </a>
                )}
              </div>
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
