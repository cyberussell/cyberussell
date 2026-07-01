import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Think with AI — AI Academy | Cyberussell",
  description:
    "Most people use AI like a search engine. This pillar teaches you to think WITH AI as a collaborative partner for solving real problems, making better decisions, and generating ideas you would not find alone.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think" },
};

const topics = [
  { title: "Why One-Shot Prompts Are Not Enough", desc: "Why asking AI one question and accepting the answer leaves most of the value untouched.", href: "/learn/think/why-one-shot-prompts-are-not-enough" },
  { title: "The Thinking Partner Mindset", desc: "How to reframe your relationship with AI from search engine to collaborative thinking partner.", href: "/learn/think/the-thinking-partner-mindset" },
  { title: "Your First Deep Conversation with AI", desc: "Build a multi-turn conversation that explores a real problem you are facing right now.", href: "/learn/think/your-first-deep-conversation-with-ai" },
  { title: "Why Big Problems Feel Impossible", desc: "Why we get stuck and how AI helps you break out of the overwhelm loop.", href: "/learn/think/why-big-problems-feel-impossible" },
  { title: "The Problem Decomposition Method", desc: "A simple framework for breaking any problem into smaller, solvable pieces with AI.", href: "/learn/think/the-problem-decomposition-method" },
  { title: "From Problem to Action Plan", desc: "Turn a decomposed problem into a concrete next step using AI.", href: "/learn/think/from-problem-to-action-plan" },
  { title: "Why Your First Idea Is Rarely Your Best", desc: "The science of ideation and why quantity leads to quality when brainstorming.", href: "/learn/think/why-your-first-idea-is-rarely-your-best" },
  { title: "The AI Brainstorm Method", desc: "A structured way to use AI to generate, expand, and combine ideas beyond your first instinct.", href: "/learn/think/the-ai-brainstorm-method" },
  { title: "Filtering Ideas Like a Pro", desc: "How to evaluate a long list of AI-generated ideas and pick the right one to pursue.", href: "/learn/think/filtering-ideas-like-a-pro" },
  { title: "How We Actually Make Decisions", desc: "Understanding cognitive biases that lead to bad decisions — and how AI helps counter them.", href: "/learn/think/how-we-actually-make-decisions" },
  { title: "The AI Decision Framework", desc: "A repeatable method for using AI to evaluate any decision before you commit.", href: "/learn/think/the-ai-decision-framework" },
  { title: "When to Trust AI and When to Override It", desc: "Knowing the limits of AI advice and when your human judgment wins.", href: "/learn/think/when-to-trust-ai-and-when-to-override-it" },
];

export default function ThinkPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <span className="text-white/60">Think with AI</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-4 py-1.5 mb-6">
            <BookOpen size={12} className="text-[#A78BFA]" />
            <span className="text-[#A78BFA] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 2
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Think with AI
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Most people use AI like a search engine — ask a question, accept the answer. This pillar teaches you
            to think WITH AI as a collaborative partner for solving real problems, making better decisions, and
            generating ideas you would not find alone.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You stop one-shot asking and start co-thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <a
                key={topic.title}
                href={topic.href}
                className="bg-[#18181F] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer rounded-[12px] p-5 flex items-start gap-4"
              >
                <div className="w-8 h-8 rounded-lg bg-[#A78BFA]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen size={14} className="text-[#A78BFA]" />
                </div>
                <div>
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{topic.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{topic.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Final Assessment CTA */}
        <section className="px-6 md:px-10 pb-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#FFD23F]/10 via-[#FFD23F]/5 to-transparent border border-[#FFD23F]/25 rounded-[16px] p-8">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy size={18} className="text-[#FFD23F]" />
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px]">Final Assessment</span>
                </div>
                <h2 className="font-sans text-[22px] font-bold text-white mb-2">Ready to earn your Thinking Bida Badge?</h2>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-relaxed">
                  Finished all 12 guides? Take the final assessment to earn your <strong className="text-white/70">Thinking Bida Badge</strong> and personalized certificate.
                </p>
              </div>
              <a
                href="/learn/think/complete"
                className="inline-flex items-center gap-2 bg-[#FFD23F] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-7 py-3.5 rounded-xl shrink-0"
              >
                Take Final Assessment <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/learn" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← Back to AI Academy
            </a>
            <a href="/learn/prompt" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next: Prompt Like a Pro →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
