import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Write a Blog Article | Cyberussell",
  description:
    "Research, outline, write, and SEO-optimize a full blog article with AI. Complete this mission in 1.5 hours and walk away with a published 1,000-word article.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/write-a-blog-article" },
};

const steps = [
  { title: "Pick your topic and target keyword", desc: "Choose a topic your audience is searching for. Use ChatGPT to find the right angle." },
  { title: "Research and outline with Gemini", desc: "Ask Gemini to research top-ranking articles on your topic and identify what they cover." },
  { title: "Write the full draft with Claude", desc: "Hand Claude your outline and ask it to write a complete 1,000-word article in your voice." },
  { title: "SEO-optimize the article", desc: "Add your keyword naturally to the title, first paragraph, headers, and meta description." },
  { title: "Edit, publish, and share", desc: "Read it once for accuracy. Publish to your blog or Medium. Share it on one platform." },
];

export default function WriteABlogArticlePage() {
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
            <a href="/learn/missions" className="hover:text-white transition-colors">AI Missions</a>
            <span>/</span>
            <span className="text-white/60">Write a Blog Article</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 07
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Write a Blog Article
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            A single well-written blog article can drive traffic for years. This mission walks you through
            the entire process — from picking a topic to hitting publish — using Gemini, Claude, and
            basic SEO principles.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/45">
              <Clock size={13} /> 1.5 hours
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-8">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A 1,000-word published article.
            </p>
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-xl px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
              Full step-by-step guide with prompts coming soon. Here&rsquo;s the mission overview:
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-16">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-[#18181F] border border-white/[0.06] rounded-[12px] p-5 flex items-start gap-4 opacity-70">
                <div className="w-8 h-8 rounded-lg bg-[#FFD23F]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#FFD23F]/60 text-[12px] font-bold font-[family-name:var(--font-inter)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{step.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/missions" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
            ← Back to All Missions
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
