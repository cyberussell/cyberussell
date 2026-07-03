import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "What AI Is Good At — AI Foundations | Cyberussell",
  description:
    "Identify five task types where AI consistently delivers useful results — and understand why it works so well for each one.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations/what-ai-is-good-at" },
  openGraph: {
    title: "What AI Is Good At | Cyberussell",
    description: "Five task types where AI consistently delivers useful results — and why it works for each one.",
    url: "https://www.cyberussell.com/learn/foundations/what-ai-is-good-at",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const strengths = [
  {
    number: "01",
    title: "Drafting and Writing",
    desc: "AI produces a first version of almost anything — emails, proposals, summaries, scripts, social posts. The draft may not be perfect. But having a draft to react to is faster than starting from a blank page.",
    example: "\"Write a follow-up email to a client who hasn't responded in two weeks.\"",
  },
  {
    number: "02",
    title: "Summarizing",
    desc: "AI condenses long content into shorter content — articles, reports, transcripts, meeting notes. It identifies the main points and removes the rest. This saves reading time on material you need to understand but not absorb word for word.",
    example: "\"Summarize this 10-page report in five bullet points.\"",
  },
  {
    number: "03",
    title: "Explaining",
    desc: "AI restates complex ideas in simpler terms. It can explain the same concept at different levels — for a beginner, for a professional, for a child. It does not get impatient. It will try a different explanation as many times as you ask.",
    example: "\"Explain compound interest like I'm 15 years old.\"",
  },
  {
    number: "04",
    title: "Brainstorming",
    desc: "AI generates options, ideas, and variations quickly. It does not judge your ideas. It does not run out of suggestions. It is especially useful when you are stuck — it gives you something to react to, even if none of the ideas are exactly right.",
    example: "\"Give me 10 names for a freelance writing business.\"",
  },
  {
    number: "05",
    title: "Organizing and Formatting",
    desc: "AI takes unstructured input and gives it structure. Rough notes become a clean outline. A list of ideas becomes a prioritized plan. A block of text becomes a table. You provide the raw material. AI arranges it.",
    example: "\"Turn these rough notes into a structured project plan.\"",
  },
];

export default function WhatAIIsGoodAtPage() {
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
            <a href="/learn/foundations" className="hover:text-white transition-colors">AI Foundations</a>
            <span>/</span>
            <span className="text-white/60">What AI Is Good At</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#4F8EF7] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Concept Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Foundations · Guide 2 of 7
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            What AI Is Good At
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Now that you know what AI is, the next question is: what should you actually use it for?
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Identify five types of tasks where AI consistently delivers useful results — and explain why it works well for each one.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most people who try AI for the first time pick the wrong task.
            </p>
            <p>
              They ask it to verify a fact. They ask it about something that happened last week. They ask it a question that requires personal knowledge about their situation. And when AI gives a vague, generic, or wrong answer — they conclude AI isn't useful.
            </p>
            <p>
              The problem wasn't the tool. It was the task.
            </p>
            <p>
              AI has a real, specific set of strengths. When you match the right task to those strengths, AI becomes genuinely useful — not occasionally, but consistently.
            </p>
          </div>
        </section>

        {/* Core Concept */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why AI Is Strong at These Tasks</h2>
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6 mb-6">
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.9]">
              Remember from Guide 1: AI was trained on enormous amounts of human-written text. It learned to predict what words and sentences follow other words and sentences.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.9] mt-3">
              That mechanism makes AI strong at tasks where the answer already exists somewhere in human language — and just needs to be found, reorganized, or expressed differently. <span className="text-white font-bold">It does not need to know something new. It needs to rearrange what it already knows.</span>
            </p>
          </div>
        </section>

        {/* The 5 Strengths */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Five Strength Categories</h2>
          <div className="space-y-4">
            {strengths.map((s) => (
              <div key={s.number} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
                <div className="flex items-start gap-4">
                  <span className="font-mono text-[14px] font-bold text-[#4F8EF7]/50 shrink-0 mt-0.5">{s.number}</span>
                  <div>
                    <h3 className="font-sans text-[17px] font-bold text-white mb-2">{s.title}</h3>
                    <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7] mb-3">{s.desc}</p>
                    <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[8px] px-4 py-3">
                      <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/25 uppercase tracking-[1.5px] mb-1">Example prompt</p>
                      <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.6]">{s.example}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Exercise */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 5 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Look at the five strength categories above. Pick the one most relevant to your own work or life goal right now.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Open your AI tool and run this prompt — replacing the brackets with your own details.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt — ChatGPT / Claude / Gemini
                </p>
                <p className="font-mono text-[15px] text-[#FFD23F] leading-[1.8]">
                  I need help with [drafting / summarizing / explaining / brainstorming / organizing] for [describe your specific task]. Give me a useful starting point.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Read the response. Ask yourself: was this genuinely useful — or did it miss what you actually needed? If it missed, what extra context would have helped?
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
                "Picked one strength category relevant to my goal",
                "Ran the prompt with my own task details",
                "Evaluated whether the output was genuinely useful",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              Of the five strength categories, <span className="text-white font-bold">which one would save you the most time if you used it every day?</span> Where in your current work or learning could AI replace the first draft — freeing you to focus on the part only you can do?
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">
              You do not need to write it down. Just think.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "AI is strong at tasks where the answer already exists in human language and needs to be reorganized or expressed differently.",
              "The five strength categories are: drafting, summarizing, explaining, brainstorming, and organizing.",
              "Using AI for the right task consistently produces useful results. Using it for the wrong task consistently produces frustration.",
              "Every AI strength connects back to Guide 1: AI predicts what language fits — it doesn't reason from scratch.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
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
              <p className="font-sans text-[17px] font-bold text-white">Where AI Fails</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Foundations · Guide 3 of 7 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/foundations/where-ai-fails"
              className="inline-flex items-center gap-2 bg-[#FFD23F] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
            >
              Continue <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
