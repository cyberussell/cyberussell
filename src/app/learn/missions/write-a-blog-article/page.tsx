import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Write a Blog Article | Cyberussell",
  description:
    "Research, outline, write, and SEO-optimize a full blog article with AI. Complete this mission in 1.5 hours and walk away with a published 1,000-word article.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/write-a-blog-article" },
  openGraph: {
    title: "Mission: Write a Blog Article | Cyberussell",
    description: "Research, outline, write, and SEO-optimize a full blog article with AI.",
    url: "https://www.cyberussell.com/learn/missions/write-a-blog-article",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const steps = [
  {
    number: "01",
    tool: "CHATGPT",
    color: "#10B981",
    time: "10 min",
    title: "Pick your topic and target keyword",
    desc: "Choose a topic your audience is searching for. Use ChatGPT to find the right angle instead of guessing.",
    prompt: "I write about [your niche/topic area] for [your audience]. Suggest 10 blog article topics my audience would search for, along with the likely search keyword for each. Prioritize topics that are specific, not generic.",
    tips: ["Pick a topic you can speak on from real experience or research", "Avoid keywords that are too broad — specific topics rank easier", "Write your final topic and keyword down before moving on"],
  },
  {
    number: "02",
    tool: "GEMINI",
    color: "#4F8EF7",
    time: "20 min",
    title: "Research and outline with Gemini",
    desc: "Ask Gemini to research top-ranking articles on your topic and identify what they cover, then build an outline that goes further.",
    prompt: "I'm writing an article about [your topic], targeting the keyword '[your keyword]'. Search for the top-ranking articles on this topic and tell me what headers/sections they all cover. Then suggest an outline for my article that covers those points plus one unique angle they're missing.",
    tips: ["Note any specific facts, stats, or examples worth including, and verify them", "Look for a gap — something competitors don't cover that you can add", "Keep the outline to 5-7 main sections"],
  },
  {
    number: "03",
    tool: "CLAUDE",
    color: "#F59E0B",
    time: "30 min",
    title: "Write the full draft with Claude",
    desc: "Hand Claude your outline and ask it to write a complete 1,000-word article in your voice.",
    prompt: "Here's my outline: [paste outline]. Write a complete 1,000-word blog article following this structure, targeting the keyword '[your keyword]' naturally throughout. Write in a [describe your voice] tone, use short paragraphs, and include a clear intro and conclusion.",
    tips: ["Feed Claude one section at a time if the full draft feels generic", "Ask for a stronger opening line if the intro doesn't hook you", "Paste a sample of your own past writing first if you want it to match your voice"],
  },
  {
    number: "04",
    tool: "YOU",
    color: "#FFD23F",
    time: "15 min",
    title: "SEO-optimize the article",
    desc: "Add your keyword naturally to the title, first paragraph, headers, and meta description — without forcing it.",
    tips: ["Include your keyword in the title, first paragraph, one header, and meta description", "Don't force the keyword unnaturally — readability comes first", "Add 1-2 internal links to other pages on your site if relevant"],
  },
  {
    number: "05",
    tool: "YOU",
    color: "#FFD23F",
    time: "15 min",
    title: "Edit, publish, and share",
    desc: "Read it once for accuracy. Publish to your blog or Medium. Share it on one platform.",
    tips: ["Read it once out loud — awkward phrasing is easier to catch by ear", "Fact-check any claim, statistic, or example the AI included", "Publish and share it on the one platform your target reader actually uses"],
  },
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
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            A single well-written blog article can drive traffic for years. This mission walks you through
            the entire process — from picking a topic to hitting publish — using Gemini, Claude, and
            basic SEO principles.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
              <Clock size={13} /> 1.5 hours
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A 1,000-word published article.
            </p>
          </div>

          <div className="flex flex-col gap-0 mb-16">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-start gap-4 md:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold font-[family-name:var(--font-inter)]"
                    style={{ backgroundColor: `${step.color}18`, color: step.color }}
                  >
                    {step.number}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 my-2" style={{ backgroundColor: `${step.color}30`, minHeight: "32px" }} />}
                </div>
                <div className="pb-10 flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px] px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${step.color}18`, color: step.color }}
                    >
                      {step.tool}
                    </span>
                    <span className="flex items-center gap-1 font-[family-name:var(--font-inter)] text-[12px] text-white/30">
                      <Clock size={10} /> {step.time}
                    </span>
                  </div>
                  <h3 className="font-sans text-[18px] font-bold text-white mb-2">{step.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7] mb-4">{step.desc}</p>

                  {"prompt" in step && step.prompt && (
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-4">
                      <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/30 mb-2">Prompt to use</p>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7] italic">&ldquo;{step.prompt}&rdquo;</p>
                    </div>
                  )}

                  <ul className="flex flex-col gap-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/40">
                        <CheckSquare size={13} className="mt-0.5 shrink-0 text-white/20" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="font-sans text-[20px] font-bold text-white mb-2">Mission Complete?</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              You now have a published article working for you 24/7. That's all 7 missions done — head to the
              final assessment to lock in your Mission Complete badge.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/learn/missions/design-a-logo" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">
              ← Mission 06: Design a Logo
            </a>
            <a href="/learn/missions/assessment" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Take the Final Assessment →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
