import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet Your AI Team — ChatGPT, Claude & Gemini | Cyberussell",
  description:
    "Learn which AI to use for every task. ChatGPT, Claude, and Gemini each have a role. Know when to use which.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team" },
};

const chatgptGuides = [
  { name: "Prompting", href: "/learn/ai-team/chatgpt-prompting" },
  { name: "Memory & Projects", href: "/learn/ai-team/chatgpt-memory-and-projects" },
  { name: "Voice Mode", href: "/learn/ai-team/chatgpt-voice-mode" },
  { name: "Image Generation", href: "/learn/ai-team/chatgpt-image-generation" },
  { name: "Deep Research", href: "/learn/ai-team/chatgpt-deep-research" },
  { name: "Canvas", href: "/learn/ai-team/chatgpt-canvas" },
];

const claudeGuides = [
  { name: "Artifacts", href: "/learn/ai-team/claude-artifacts" },
  { name: "Projects & Memory", href: "/learn/ai-team/claude-projects-and-memory" },
  { name: "Claude Code", href: "/learn/ai-team/claude-code" },
  { name: "Long Context", href: "/learn/ai-team/claude-long-context" },
  { name: "Coding Workflows", href: "/learn/ai-team/claude-coding-workflows" },
];

const geminiGuides = [
  { name: "Gemini in Gmail", href: "/learn/ai-team/gemini-in-gmail" },
  { name: "Gemini in Docs", href: "/learn/ai-team/gemini-in-docs" },
  { name: "Gemini in Sheets", href: "/learn/ai-team/gemini-in-sheets" },
  { name: "Deep Research", href: "/learn/ai-team/gemini-deep-research" },
  { name: "Search Integration", href: "/learn/ai-team/gemini-search-integration" },
];

const aiTools = [
  {
    name: "ChatGPT",
    role: "The All-Rounder",
    bestFor: ["Brainstorming", "Learning", "Planning", "Writing", "Daily productivity"],
    guides: chatgptGuides,
    color: "#10B981",
  },
  {
    name: "Claude",
    role: "The Deep Thinker",
    bestFor: ["Programming", "Long documents", "Writing & editing", "Reasoning", "Claude Code"],
    guides: claudeGuides,
    color: "#F59E0B",
  },
  {
    name: "Gemini",
    role: "The Google Expert",
    bestFor: ["Google Workspace", "Research", "Gmail & Docs", "Drive & Sheets", "Deep Research"],
    guides: geminiGuides,
    color: "#4F8EF7",
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
                className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="font-sans text-[20px] font-bold text-white">{ai.name}</h2>
                    <p className="font-[family-name:var(--font-inter)] text-[12px]" style={{ color: ai.color }}>
                      {ai.role}
                    </p>
                  </div>
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
                      <li key={guide.name}>
                        <a
                          href={guide.href}
                          className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/55 hover:text-white transition-colors group"
                        >
                          <span className="text-[10px]" style={{ color: ai.color }}>→</span>
                          <span className="group-hover:underline">{guide.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final Assessment CTA */}
        <section className="px-6 md:px-10 pb-12 max-w-5xl mx-auto">
          <div className="bg-[#22C55E]/8 border border-[#22C55E]/20 rounded-[18px] p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[2px] mb-2">
                Complete Pillar 3
              </p>
              <h2 className="font-sans text-[22px] font-bold text-white mb-1">
                Ready to earn your AI Team Bida Badge?
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45">
                Finish all 16 guides, then take the final assessment to earn your badge and certificate.
              </p>
            </div>
            <a
              href="/learn/ai-team/complete"
              className="inline-flex items-center gap-2 bg-[#22C55E] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-6 py-3.5 rounded-xl shrink-0"
            >
              Take the Assessment <ArrowRight size={15} />
            </a>
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
