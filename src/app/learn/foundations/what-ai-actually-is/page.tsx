import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "What AI Actually Is — AI Foundations | Cyberussell",
  description:
    "Learn what AI actually does in plain language. No jargon. No hype. Just the one idea that changes how you work with AI — in 5 minutes.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations/what-ai-actually-is" },
  openGraph: {
    title: "What AI Actually Is | Cyberussell",
    description: "Learn what AI actually does in plain language. No jargon. No hype. Just the one idea that changes how you work with AI.",
    url: "https://www.cyberussell.com/learn/foundations/what-ai-actually-is",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function WhatAIActuallyIsPage() {
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
            <span className="text-white/60">What AI Actually Is</span>
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
            AI Foundations · Guide 1 of 7
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            What AI Actually Is
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            The most useful thing you can know about AI — before anything else.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Explain in plain language what AI is and what it actually does — without using the words "smart," "thinks," or "knows."
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most people who use AI are working with a wrong picture of what it is.
            </p>
            <p>
              They think AI understands them. They think it knows things. They think it is thinking through a problem the way a person would.
            </p>
            <p>
              That picture leads to real mistakes — trusting an answer that sounds confident but is wrong, being surprised when AI fails at something that seems simple, or being afraid of a tool that is much less mysterious than it appears.
            </p>
            <p>
              Getting the right picture costs you five minutes. It will change how you work with AI for the rest of your life.
            </p>
          </div>
        </section>

        {/* Core Concept */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[22px] font-bold text-white mb-2">AI does not think.</p>
            <p className="font-sans text-[22px] font-bold text-[#FFD23F]">It predicts.</p>
          </div>

          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4 mb-8">
            <p>
              When you type a question into an AI tool, the system does not reason through your problem and arrive at an answer. It looks at your words and produces the most likely sequence of words to follow them — based on patterns it learned from an enormous amount of human-written text.
            </p>
            <p>
              That text included books, articles, websites, code, conversations, and more. The AI read all of it and learned one thing very well: what kinds of words tend to follow other kinds of words.
            </p>
            <p>
              That is it. That is the whole mechanism.
            </p>
          </div>

          {/* Analogy */}
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-3">
              The Cooking Show Analogy
            </p>
            <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.9] space-y-3">
              <p>
                Imagine someone who has watched ten thousand cooking shows. They have seen every technique, heard every explanation, and read every recipe. They can describe how to make a dish in accurate, confident detail.
              </p>
              <p>
                But they have never actually cooked.
              </p>
              <p>
                They do not know what it feels like when the onions are ready. They cannot smell when the oil is too hot. Their description might be perfect. Their understanding is different from a chef's.
              </p>
              <p className="text-white/80">
                AI is that person. Its descriptions can be excellent. Its understanding — in the way a human understands — does not exist.
              </p>
              <p>
                This is not a criticism. It is a description. A cooking show enthusiast who can describe ten thousand dishes is genuinely useful in a kitchen. The key is knowing what you are working with.
              </p>
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Before</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-4">
                A learner asks AI: <span className="text-white/80 italic">"Is it safe to take ibuprofen every day?"</span>
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-4">
                The AI responds with a confident, well-organized paragraph. The learner reads it and thinks: <span className="text-white/80 italic">"AI knows about medicine. I can trust this."</span>
              </p>
              <div className="bg-[#E8373A]/8 border border-[#E8373A]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#E8373A]/80 leading-[1.6]">
                  What actually happened: AI produced what sounded right based on medical content in its training data. The AI did not verify it. It did not examine the learner's health history.
                </p>
              </div>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[2px] mb-4">After</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-4">
                The same learner reads the same confident response and thinks: <span className="text-white/80 italic">"This sounds like the right kind of answer. But this is a medical question. I'll check this with a doctor or a verified health source before acting on it."</span>
              </p>
              <div className="bg-[#22C55E]/8 border border-[#22C55E]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#22C55E]/80 leading-[1.6]">
                  The response did not change. The learner's relationship to it did. That shift is the entire point of this Guide.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Exercise */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 3 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Open your AI tool. Copy and run this prompt exactly as written.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px]">
                    Prompt — ChatGPT / Claude / Gemini
                  </span>
                </div>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  Explain how rainbows are formed. Keep it short — three sentences maximum.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Read the full response.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Pick one sentence from the response. Ask yourself: <span className="text-white/80 italic">If I were going to use this in a school report, a presentation, or a message to someone else — would I verify it first, or would I use it as-is?</span>
                </p>
              </div>
            </div>
          </div>

          {/* Mark Complete */}
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {["Run the prompt", "Read the full response", "Pick one sentence and asked the verification question"].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              The AI's response probably sounded accurate and confident. <span className="text-white font-bold">What made it sound that way — and does that confidence tell you anything about whether the information is actually correct?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 mt-3">
              You do not need to write it down. Just think.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "AI produces outputs by predicting what words tend to follow other words — not by reasoning through problems the way a person does.",
              "Confidence in an AI response tells you nothing about whether the response is accurate.",
              "The most useful thing you can do with any AI output is decide whether it needs verification before you use it.",
              "Understanding what AI actually is does not make it less useful — it makes you a better user of it.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge (optional) */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#F59E0B]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge — Optional</span>
            </div>
            <p className="font-sans text-[15px] font-bold text-white mb-2">Explain AI to someone else.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Pick someone in your life who is curious or skeptical about AI. Explain what AI is — using your own words, not the cooking show analogy. See if your explanation makes sense to them.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-3 italic">
              Expected outcome: A one-minute explanation that uses an analogy you came up with yourself.
            </p>
          </div>
        </section>

        {/* Mission unlock */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-[#E8373A]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] uppercase tracking-[1.5px]">This Unlocks</span>
            </div>
            <p className="font-sans text-[15px] font-bold text-white mb-1">Mission: Know Your AI</p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mb-3">
              A one-page personal AI profile — what AI is and is not, in your own words, for your own work. · 45 minutes
            </p>
            <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/25 cursor-not-allowed">
              Complete all 7 guides to unlock →
            </span>
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[16px] font-bold text-white">What AI Is Good At</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                AI Foundations · Guide 2 of 7 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/foundations"
              className="inline-flex items-center gap-2 bg-[#FFD23F] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
            >
              Back to Pillar <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
