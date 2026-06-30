import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GitBranch } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Workflows — Chain AI Tools to Get Real Results | Cyberussell",
  description:
    "Learn multi-tool AI workflows for writing, research, business, and more. See how ChatGPT, Claude, and Gemini work together.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows" },
};

const workflows = [
  { title: "Website Creation", tools: ["ChatGPT", "Claude", "Human review"], soon: false },
  { title: "Business Planning", tools: ["ChatGPT", "Gemini", "Claude", "Human review"], soon: true },
  { title: "Resume Creation", tools: ["ChatGPT", "Claude", "Human review"], soon: false },
  { title: "Content Creation", tools: ["ChatGPT", "Claude", "Human review"], soon: true },
  { title: "Freelancing Proposal", tools: ["Claude", "ChatGPT", "Human review"], soon: true },
  { title: "Deep Research", tools: ["Gemini", "ChatGPT", "Claude", "Human review"], soon: true },
  { title: "Learning New Skills", tools: ["ChatGPT", "Claude", "Human review"], soon: true },
  { title: "Programming", tools: ["Claude", "ChatGPT", "Human review"], soon: true },
  { title: "Marketing Strategy", tools: ["ChatGPT", "Gemini", "Claude", "Human review"], soon: true },
  { title: "Decision Making", tools: ["ChatGPT", "Claude", "Human review"], soon: true },
];

export default function WorkflowsPage() {
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
            <span className="text-white/60">AI Workflows</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-4 py-1.5 mb-6">
            <GitBranch size={12} className="text-[#F59E0B]" />
            <span className="text-[#F59E0B] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 4
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            AI Workflows
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            No single AI does everything. The best results come from combining tools — each one used at
            the right step, for the right reason. This pillar teaches you how AI tools work together on
            real tasks.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You chain AI tools to get real results faster.
            </p>
          </div>

          {/* How a workflow looks */}
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8 mb-8">
            <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold uppercase tracking-[1.5px] text-white/35 mb-4">
              Example: Resume Creation Workflow
            </p>
            <div className="flex flex-col gap-0">
              {[
                { label: "Problem", val: "I need a resume that stands out", color: "text-white/50" },
                { label: "ChatGPT", val: "Brainstorm structure, tone, and key sections", color: "text-[#10B981]" },
                { label: "Claude", val: "Write and polish the full draft", color: "text-[#F59E0B]" },
                { label: "Human Review", val: "You verify accuracy and personal voice", color: "text-[#FFD23F]" },
                { label: "Final Result", val: "A resume you actually understand and own", color: "text-white" },
              ].map((step, i, arr) => (
                <div key={step.label} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-2 rounded-full bg-white/20 mt-1.5 shrink-0" />
                    {i < arr.length - 1 && <div className="w-px h-8 bg-white/[0.08]" />}
                  </div>
                  <div className="pb-1">
                    <span className={`font-[family-name:var(--font-inter)] text-[12px] font-bold uppercase tracking-[1px] ${step.color}`}>
                      {step.label}
                    </span>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45">{step.val}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {workflows.map((wf) => (
              <div
                key={wf.title}
                className={`bg-[#18181F] border rounded-[12px] p-5 ${
                  wf.soon ? "border-white/[0.06] opacity-60" : "border-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-sans text-[15px] font-bold text-white">{wf.title}</h3>
                  {wf.soon && (
                    <span className="text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Soon</span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {wf.tools.map((tool, i) => (
                    <span key={tool} className="flex items-center gap-1.5">
                      <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 bg-white/[0.05] px-2 py-0.5 rounded-md">
                        {tool}
                      </span>
                      {i < wf.tools.length - 1 && <span className="text-white/20 text-[11px]">→</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/learn/ai-team" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← Meet Your AI Team
            </a>
            <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next: Build Real Skills →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
