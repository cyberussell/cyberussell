import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Business Planning Workflow — AI Workflows | Cyberussell",
  description:
    "Create a simple, realistic business plan for your idea using ChatGPT, Gemini, and Claude — in one session.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/business-planning" },
  openGraph: {
    title: "Business Planning Workflow | Cyberussell",
    description: "Create a simple, realistic business plan for your idea using ChatGPT, Gemini, and Claude — in one session.",
    url: "https://www.cyberussell.com/learn/workflows/business-planning",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const workflowSteps = [
  {
    step: "Step 1",
    actor: "YOU",
    actorColor: "text-white",
    dotColor: "bg-white/40",
    lineColor: "bg-white/[0.08]",
    time: "5 min",
    title: "Define your idea",
    description: "Write one sentence: \"I want to sell [product/service] to [customer] for [price].\"",
  },
  {
    step: "Step 2",
    actor: "CHATGPT",
    actorColor: "text-[#10B981]",
    dotColor: "bg-[#10B981]",
    lineColor: "bg-[#10B981]/20",
    time: "15 min",
    title: "Brainstorm and validate",
    description: "Ask ChatGPT to pressure-test your idea: challenges, target market, how to start small.",
  },
  {
    step: "Step 3",
    actor: "GEMINI",
    actorColor: "text-[#4F8EF7]",
    dotColor: "bg-[#4F8EF7]",
    lineColor: "bg-[#4F8EF7]/20",
    time: "15 min",
    title: "Research the market",
    description: "Ask Gemini Deep Research to find: market size, competitors, pricing trends, customer pain points.",
  },
  {
    step: "Step 4",
    actor: "CLAUDE",
    actorColor: "text-[#F59E0B]",
    dotColor: "bg-[#F59E0B]",
    lineColor: "bg-[#F59E0B]/20",
    time: "20 min",
    title: "Write the business plan",
    description: "Claude synthesizes everything into a clean, structured plan you can actually use.",
  },
];

export default function BusinessPlanningPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        {/* Breadcrumb */}
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/workflows" className="hover:text-white transition-colors">AI Workflows</a>
            <span>/</span>
            <span className="text-white/60">Business Planning Workflow</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Workflow Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              55 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 2 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Business Planning Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Three AIs. One session. A business plan you can actually follow.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/[0.08] border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Create a simple, realistic business plan for your idea using ChatGPT, Gemini, and Claude — in one session.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most business plans never get written because they feel overwhelming. This workflow breaks it into 3 AI-assisted steps that each take 10–15 minutes.
            </p>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8">
            <div className="flex flex-col gap-0">
              {workflowSteps.map((s, i) => (
                <div key={s.step} className="flex items-start gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-3 h-3 rounded-full ${s.dotColor} mt-1 shrink-0`} />
                    {i < workflowSteps.length - 1 && <div className={`w-px h-16 ${s.lineColor} mt-1`} />}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">{s.step}</span>
                      <span className={`font-[family-name:var(--font-inter)] text-[12px] font-bold uppercase tracking-[1px] ${s.actorColor}`}>{s.actor}</span>
                      <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">· {s.time}</span>
                    </div>
                    <p className="font-sans text-[15px] font-bold text-white mb-1">{s.title}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
              Filipino Entrepreneur Story
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.9]">
              A Filipina mom wants to sell homemade tocino online. ChatGPT helps her see the real challenges. Gemini researches the online food market in the Philippines. Claude writes a 1-page business plan she can follow.
            </p>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">Follow each step in order. Do not skip ahead.</p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — You</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 leading-[1.7]">
                Write your one-sentence idea. Be specific about what you sell, who buys it, and at what price.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[1.5px]">Step 2 — ChatGPT</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Open ChatGPT and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.8]">
                  I want to [your one-sentence idea]. What are the 3 biggest challenges I will face? Who exactly is my target customer? What is the simplest way to test this idea with ₱0 or very little money?
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[1.5px]">Step 3 — Gemini Deep Research</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Open Gemini with Deep Research enabled and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Gemini Deep Research</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.8]">
                  Research the market for [your product/service] in the Philippines. What is the market size? Who are the main competitors? What do customers pay? What are the most common customer complaints?
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Step 4 — Claude</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Open Claude and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Claude</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.8]">
                  I want to start a small business. Here is my idea: [your idea]. Here is the ChatGPT analysis: [paste it]. Here is the market research: [paste Gemini&apos;s output]. Write me a simple, 1-page business plan I can actually follow. Include: what I&apos;m selling, who I&apos;m selling to, how I&apos;ll get my first customer, and my first 30-day action plan.
                </p>
              </div>
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
              {[
                "Wrote my one-sentence business idea",
                "Used ChatGPT to pressure-test my idea",
                "Used Gemini to research the market",
                "Used Claude to write my business plan",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              What challenge did ChatGPT surface that you had not thought of? <span className="text-white font-bold">How did Gemini&apos;s market data change what you planned to write in your business plan?</span>
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Start with a clear one-sentence idea. Vague ideas produce vague plans.",
              "ChatGPT is honest about challenges — use it to find problems before they find you.",
              "Gemini with Deep Research finds current market data that ChatGPT cannot.",
              "Claude synthesizes everything into a clear, usable document.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Resume Creation Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                AI Workflows · Guide 3 of 10 · Beginner · 45 min
              </p>
            </div>
            <a
              href="/learn/workflows/resume-creation"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
