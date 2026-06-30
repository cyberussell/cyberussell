import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Your AI Team — ChatGPT, Claude & Gemini | Cyberussell",
  description:
    "Learn which AI to use for every task. ChatGPT, Claude, and Gemini each have a role. Know when to use which.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team" },
};

const aiTools = [
  {
    name: "ChatGPT",
    role: "The All-Rounder",
    bestFor: ["Brainstorming", "Learning", "Planning", "Writing", "Daily productivity"],
    guides: ["Prompting", "Memory & Projects", "Voice Mode", "Image Generation", "Deep Research", "Canvas"],
    color: "#10B981",
    soon: false,
  },
  {
    name: "Claude",
    role: "The Deep Thinker",
    bestFor: ["Programming", "Long documents", "Writing & editing", "Reasoning", "Claude Code"],
    guides: ["Artifacts", "Projects & Memory", "Claude Code", "Long context use", "Coding workflows"],
    color: "#F59E0B",
    soon: true,
  },
  {
    name: "Gemini",
    role: "The Google Expert",
    bestFor: ["Google Workspace", "Research", "Gmail & Docs", "Drive & Sheets", "Deep Research"],
    guides: ["Gemini in Gmail", "Gemini in Docs", "Gemini in Sheets", "Deep Research", "Search integration"],
    color: "#4F8EF7",
    soon: true,
  },
];

export default function AITeamPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <span className="text-white/60">Meet Your AI Team</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 rounded-full px-4 py-1.5 mb-6">
            <Users size={12} className="text-[#22C55E]" />
            <span className="text-[#22C55E] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 3
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Meet Your AI Team
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            ChatGPT, Claude, and Gemini are not interchangeable. Each has a personality, a strength, and
            a role. This pillar introduces each AI by what it&rsquo;s actually good at — not by its feature list.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You know which AI to pick for any task.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {aiTools.map((ai) => (
              <div
                key={ai.name}
                className={`bg-[#18181F] border rounded-[14px] p-6 flex flex-col ${
                  ai.soon ? "border-white/[0.06] opacity-60" : "border-white/[0.08]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-sans text-[20px] font-bold text-white">{ai.name}</h2>
                    <p className="font-[family-name:var(--font-inter)] text-[12px]" style={{ color: ai.color }}>
                      {ai.role}
                    </p>
                  </div>
                  {ai.soon && (
                    <Lock size={14} className="text-white/25" />
                  )}
                </div>

                <div className="mb-4">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/30 mb-2">
                    Best For
                  </p>
                  <ul className="flex flex-col gap-1">
                    {ai.bestFor.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/55">
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: ai.color }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/30 mb-2">
                    Guides
                  </p>
                  <ul className="flex flex-col gap-1">
                    {ai.guides.map((guide) => (
                      <li key={guide} className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/35">
                        <span className="text-[10px]">→</span>
                        {guide}
                        {ai.soon && <span className="text-[9px] text-white/20 ml-auto">soon</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/learn/think" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← Think with AI
            </a>
            <a href="/learn/workflows" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next: AI Workflows →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
