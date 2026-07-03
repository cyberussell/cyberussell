import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Deep Research Workflow — AI Workflows | Cyberussell",
  description:
    "Research any topic thoroughly in under 30 minutes — using Gemini, ChatGPT, and Claude for different parts of the research.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/deep-research" },
  openGraph: {
    title: "Deep Research Workflow — AI Workflows | Cyberussell",
    description: "Research any topic thoroughly in under 30 minutes — using Gemini, ChatGPT, and Claude for different parts of the research.",
    url: "https://www.cyberussell.com/learn/workflows/deep-research",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const steps = [
  {
    toolLabel: "You",
    dotColor: "#FFD23F",
    step: "Step 1",
    title: "Define your research question",
    time: "5 min",
    description: "Be specific. Not \"I want to know about freelancing\" but \"What are the best-paying freelance skills for Filipinos in 2025 and how do I start with zero experience?\"",
  },
  {
    toolLabel: "Gemini Deep Research",
    dotColor: "#4F8EF7",
    step: "Step 2",
    title: "Find current facts",
    time: "15 min",
    description: "Gemini searches the internet and compiles a report with real sources and up-to-date information.",
  },
  {
    toolLabel: "ChatGPT",
    dotColor: "#10B981",
    step: "Step 3",
    title: "Fill in the gaps",
    time: "10 min",
    description: "Ask ChatGPT follow-up questions about anything Gemini missed or that needs more explanation.",
  },
  {
    toolLabel: "Claude",
    dotColor: "#F59E0B",
    step: "Step 4",
    title: "Synthesize and summarize",
    time: "10 min",
    description: "Claude reads everything and writes a clear, organized summary of what you actually need to know.",
  },
  {
    toolLabel: "Human Review",
    dotColor: "#FFD23F",
    step: "Step 5",
    title: "Verify key facts",
    time: "5 min",
    description: "Check 2-3 important claims against the original sources Gemini cited.",
  },
];

const checklist = [
  "Defined a specific research question",
  "Used Gemini Deep Research for current facts",
  "Used ChatGPT to fill in gaps",
  "Used Claude to synthesize everything",
  "Verified 2-3 key facts from original sources",
];

const takeaways = [
  "Specific questions get specific answers. Vague questions get vague results.",
  "Gemini Deep Research is the only AI that actively searches the internet for current data. Use it for anything time-sensitive.",
  "ChatGPT is better at explaining concepts. Claude is better at organizing and summarizing.",
  "Always verify important facts from original sources — AI research is a starting point, not a final answer.",
];

export default function DeepResearchWorkflowPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        {/* Breadcrumb */}
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/workflows" className="hover:text-white transition-colors">AI Workflows</a>
            <span>/</span>
            <span className="text-white/60">Deep Research</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Intermediate
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Workflow
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              45 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 6 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Deep Research Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Research any topic thoroughly in under 30 minutes — using each AI for what it does best.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Research any topic thoroughly in under 30 minutes — using Gemini, ChatGPT, and Claude for different parts of the research.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Bad research leads to bad decisions. You pick the wrong skill to learn, apply for the wrong kind of jobs, or waste months on something the market doesn't need.
            </p>
            <p>
              Good research done manually takes too long — hours of reading, comparing, and trying to understand what's relevant. Most people skip it and rely on guesses.
            </p>
            <p>
              This workflow gets you accurate, current, and well-organized information by using each AI for what it does best. Gemini finds current facts from the internet. ChatGPT fills in gaps and explains concepts. Claude organizes everything into something you can actually use.
            </p>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>

          <div className="relative">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-5 mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: s.dotColor }}
                  />
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ backgroundColor: s.dotColor, opacity: 0.25, minHeight: "48px" }} />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">{s.step}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: s.dotColor }}>{s.toolLabel}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">· {s.time}</span>
                  </div>
                  <p className="font-sans text-[17px] font-bold text-white mb-1">{s.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">
              Fresh Graduate · Choosing a Freelance Skill
            </p>
            <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/65 leading-[1.9] space-y-3">
              <p>
                A fresh graduate wants to know which freelance skill to learn first. She asks Gemini Deep Research: "What are the highest-paying remote freelance skills for Filipino beginners in 2025?"
              </p>
              <p>
                Gemini gives her a detailed report with salary ranges, demand levels, and platform data. She asks ChatGPT to explain each skill in plain language.
              </p>
              <p className="text-white/80 font-bold">
                Claude writes a clear 1-page comparison with a final recommendation based on her specific situation. She starts learning the right skill the next day.
              </p>
            </div>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 45 minutes · Gemini + ChatGPT + Claude</p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-3">Step 1 · You</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7]">
                Write your research question. Make it specific. Include your situation: who you are, why you need this information, and what decision you will make with it.
              </p>
            </div>

            {/* Step 2 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 2 · Gemini Deep Research</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Enable Deep Research mode in Gemini (look for the lightbulb or "Deep Research" button), then paste this prompt.
              </p>
              <div className="bg-[#0F0F1A] border border-[#4F8EF7]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#4F8EF7] uppercase tracking-[1.5px] block mb-3">Gemini Deep Research</span>
                <p className="font-mono text-[14px] text-[#4F8EF7] leading-[1.7]">
                  {`Research: [your specific question]. I need current data, real examples, and credible sources. Focus on the Philippines context where relevant.`}
                </p>
              </div>
            </div>

            {/* Step 3 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 3 · ChatGPT</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Paste the key points from Gemini's report and ask ChatGPT for what's missing.
              </p>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#10B981] uppercase tracking-[1.5px] block mb-3">ChatGPT</span>
                <p className="font-mono text-[14px] text-[#10B981] leading-[1.7]">
                  {`I am researching [your topic]. Here is what I found from Gemini: [paste the key points]. What important information is missing? Explain [specific concept you did not understand] in simple terms.`}
                </p>
              </div>
            </div>

            {/* Step 4 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 4 · Claude</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Paste everything you collected into Claude for a final organized summary.
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#F59E0B] uppercase tracking-[1.5px] block mb-3">Claude</span>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.7]">
                  {`I am trying to answer this question: [your original question]. Here is the research I have gathered: [paste everything from Gemini and ChatGPT]. Summarize this into a clear, organized document with: the main answer to my question, 3-5 key facts I need to know, and a recommended next action.`}
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-3">Step 5 · Human Review</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7]">
                Click through to 2-3 sources that Gemini cited. Verify the most important facts before making any decision based on this research.
              </p>
            </div>
          </div>
        </section>

        {/* Mark Complete */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {checklist.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Reflect */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              When you verified Gemini's sources, <span className="text-white font-bold">did any of the AI's claims turn out to be wrong, outdated, or missing important context?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">
              This is why Step 5 exists. AI gives you a head start — not a final answer.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {takeaways.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Learning New Skills Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Workflows · Guide 7 of 10
              </p>
            </div>
            <a
              href="/learn/workflows/learning-new-skills"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
            >
              Next Guide <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
