import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "The Problem Decomposition Method — Think with AI | Cyberussell",
  description:
    "A simple framework for breaking any problem into smaller, solvable pieces with AI in under 10 minutes.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/the-problem-decomposition-method" },
  openGraph: {
    title: "The Problem Decomposition Method | Cyberussell",
    description: "A simple framework for breaking any problem into smaller, solvable pieces with AI.",
    url: "https://www.cyberussell.com/learn/think/the-problem-decomposition-method",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideFivePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/think" className="hover:text-white transition-colors">Think with AI</a>
            <span>/</span>
            <span className="text-white/60">The Problem Decomposition Method</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#A78BFA] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Intermediate
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Method Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 5 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            The Problem Decomposition Method
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            10 minutes with AI replaces hours of circular thinking.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Break down a real problem into root causes and sub-problems using a repeatable AI-assisted method.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Circular thinking is when you think about the same problem over and over without getting anywhere. You have probably experienced it — going over the same options, the same fears, the same questions, arriving nowhere.
            </p>
            <p>
              Circular thinking happens when you try to solve a problem without first understanding its structure. You are trying to answer "what should I do?" before you have answered "what is actually going on?"
            </p>
            <p>
              This method stops the loop. It takes 10 minutes and replaces hours of going in circles.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept — The 4-Step Method</h2>

          <div className="space-y-3 mb-8">
            {[
              { num: "1", title: "State the problem in one sentence", desc: "Forcing yourself to write it in one sentence is the first act of decomposition. If you cannot state it in one sentence, you do not understand the problem yet — and that is useful information." },
              { num: "2", title: "Ask AI to identify root causes", desc: "Root causes are what is actually driving the problem — not the symptoms. Ask AI: 'What are the 3 most likely root causes of this problem?' Root causes are where leverage lives." },
              { num: "3", title: "Ask AI to break it into sub-problems", desc: "Sub-problems are the individual solvable components. Ask AI: 'Break this into 5 sub-problems I could work on separately.' Each sub-problem should be narrow enough to take action on." },
              { num: "4", title: "Ask which sub-problem to solve first", desc: "Not all sub-problems are equal. Some are blockers. Some unlock everything else. Ask AI: 'Which of these should I tackle first and why?' Let AI do the prioritization thinking for you." },
            ].map((step) => (
              <div key={step.num} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#A78BFA]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-sans text-[14px] font-bold text-[#A78BFA]">{step.num}</span>
                </div>
                <div>
                  <p className="font-sans text-[16px] font-bold text-white mb-2">{step.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.7]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Think of a real problem you are currently stuck on. It should be something that matters — not a trivial task. Replace [problem] in the prompt below.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt — run all at once
                </p>
                <p className="font-mono text-[15px] text-[#FFD23F] leading-[1.7]">
                  Here is my problem: [problem]. Step 1: What are the 3 most likely root causes? Step 2: Break this into 5 sub-problems I could work on separately. Step 3: Which one should I tackle first and why?
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">After you read the response</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Notice whether the root causes surprise you. Notice whether any of the sub-problems feel immediately actionable. Save the sub-problem you are going to work on first — you will need it in the next guide.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {[
                "Stated the problem in one sentence",
                "AI identified 3 root causes",
                "AI broke it into 5 sub-problems",
                "I know which sub-problem to tackle first",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/5 border border-[#A78BFA]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A78BFA]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              Did any of the root causes surprise you? <span className="text-white font-bold">Were you thinking about the problem at the right level — or were you trying to solve symptoms instead of causes?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "The 4-step method — one-sentence problem, root causes, sub-problems, first priority — takes 10 minutes and ends circular thinking.",
              "Root causes are where leverage lives. Solving symptoms feels productive but changes nothing.",
              "Sub-problems give you a menu of solvable tasks. You cannot act on 'fix everything' — you can act on 'solve sub-problem 3.'",
              "Asking AI to prioritize is not laziness. It is using the tool correctly to do the analysis you do not need to do manually.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#F59E0B]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge — Optional</span>
            </div>
            <p className="font-sans text-[16px] font-bold text-white mb-2">Use this method on a problem someone else is stuck on.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Think of a friend, family member, or colleague who is stuck on something. Run their problem through the 4-step method (with their permission). Walk them through what AI surfaces. Notice whether it helps them see their situation differently.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">From Problem to Action Plan</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Think with AI · Guide 6 of 12 · Intermediate · 8 min
              </p>
            </div>
            <a
              href="/learn/think/from-problem-to-action-plan"
              className="inline-flex items-center gap-2 bg-[#A78BFA] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
