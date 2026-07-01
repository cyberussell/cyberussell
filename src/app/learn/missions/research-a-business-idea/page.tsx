import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Research a Business Idea | Cyberussell",
  description:
    "Use Gemini and ChatGPT to validate a business idea with real market data. Complete this mission in 1 hour.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/research-a-business-idea" },
};

const steps = [
  { title: "Define your idea in one clear sentence", desc: "Who are you helping, what problem are you solving, and how are you different?" },
  { title: "Research the market with Gemini", desc: "How big is the market? Who are the main competitors? What are people already paying for?" },
  { title: "Identify your target customer with ChatGPT", desc: "Build a specific customer profile — demographics, pain points, where they spend time online." },
  { title: "Validate demand with real signals", desc: "Find evidence that people are already searching for or spending money on this problem." },
  { title: "Write a 1-page business summary", desc: "Summarize your findings: market size, competition, customer, and your unique angle." },
];

export default function ResearchABusinessIdeaPage() {
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
            <span className="text-white/60">Research a Business Idea</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 04
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Research a Business Idea
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            Most business ideas die from lack of research, not lack of effort. This mission teaches you how to
            use Gemini and ChatGPT to validate a business idea with real market data — in under an hour.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/45">
              <Clock size={13} /> 1 hour
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#F59E0B]">
              <BarChart2 size={13} /> Intermediate
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-8">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A 1-page business research summary.
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
