import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Filtering Ideas Like a Pro — Think with AI | Cyberussell",
  description:
    "How to evaluate a long list of AI-generated ideas and pick the right one to pursue using a simple 3-dimension framework.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/filtering-ideas-like-a-pro" },
  openGraph: {
    title: "Filtering Ideas Like a Pro | Cyberussell",
    description: "How to evaluate a long list of AI-generated ideas and pick the right one to pursue.",
    url: "https://www.cyberussell.com/learn/think/filtering-ideas-like-a-pro",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideNinePage() {
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
            <span className="text-white/60">Filtering Ideas Like a Pro</span>
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
              8 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 9 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Filtering Ideas Like a Pro
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Having 20 ideas is useless unless you can pick the right one.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Evaluate a list of AI-generated ideas using a simple framework and select one to move forward with.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              You now know how to generate 20 ideas fast. The new problem: too many options leads to the same paralysis as too few. You end up equally stuck, just with more tabs open.
            </p>
            <p>
              The difference between people who generate ideas and people who execute them is not energy or motivation. It is having a clear, fast method for evaluation. Without a framework, you default to picking the most familiar or least scary idea — which is not the same as the best one.
            </p>
            <p>
              This guide gives you a 3-dimension framework that makes the right choice obvious.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept — The 3-Dimension Filter</h2>

          <div className="space-y-4 mb-8">
            {[
              {
                label: "Ease",
                score: "1 = Hard to start with what I have right now · 3 = Easy to start",
                desc: "How much time, money, skill, and setup does this require? An idea that requires ₱50,000 to start is very different from one you can test with ₱500 this week.",
              },
              {
                label: "Impact",
                score: "1 = Small impact on my goal · 3 = Big impact",
                desc: "How much does this idea move you toward what you actually want? A high-effort idea that barely moves the needle is worse than a simpler idea with real upside.",
              },
              {
                label: "Fit",
                score: "1 = Poor fit for my skills and situation · 3 = Perfect fit",
                desc: "Does this match who you are — your skills, your personality, your available time, your existing relationships? You can do anything. You will only sustain something that fits.",
              },
            ].map((dim) => (
              <div key={dim.label} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#A78BFA]/15 flex items-center justify-center shrink-0">
                    <span className="font-sans text-[14px] font-bold text-[#A78BFA]">{dim.label[0]}</span>
                  </div>
                  <div>
                    <p className="font-sans text-[15px] font-bold text-white mb-1">{dim.label}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#A78BFA]/70 mb-2 font-medium">{dim.score}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{dim.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-2">How to Use the Scores</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.8]">
              Rate each idea 1-3 on each dimension. Add the three scores. The idea with the highest total (max 9) gets your first experiment — not your permanent commitment. An experiment. One test, with a defined endpoint.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 8 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Take your top 5 ideas from Guide 8 (or generate a list now if you have not). List them below the prompt and ask AI to score them.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt
                </p>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  Here are my top 5 ideas: [list]. Score each one from 1-3 on: Ease (1=hard, 3=easy to start), Impact (1=small, 3=big), and Fit (1=poor fit, 3=perfect fit for my skills and situation). Then tell me which one I should try first and why.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Provide context</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  For AI to score Fit accurately, tell it about yourself — your skills, available time, current situation. The more context it has, the more accurate the scoring.
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
                "Listed my top 5 ideas for AI to score",
                "AI scored each idea on Ease, Impact, and Fit",
                "AI recommended which idea to try first",
                "I agree with the recommendation (or I understand why I disagree)",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              Did the framework confirm your gut feeling — or did it surprise you? <span className="text-white font-bold">If you disagreed with the top-scoring idea, what does that tell you about what you are actually optimizing for?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "The 3-dimension filter — Ease, Impact, Fit — makes idea selection fast and defensible instead of gut-driven and random.",
              "The highest-scoring idea gets your first experiment, not your permanent commitment. Test before you invest.",
              "If you disagree with the top scorer, that disagreement is useful data. It tells you which dimension matters most to you right now.",
              "Giving AI context about yourself is what makes the Fit dimension accurate. The more it knows about your situation, the better it filters.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Run your top-scoring idea as a 7-day experiment.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Commit to testing your highest-scoring idea for exactly 7 days. Not forever — just 7 days. At the end, ask AI to help you evaluate what you learned. Then decide: continue, pivot, or stop.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">How We Actually Make Decisions</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Think with AI · Guide 10 of 12 · Intermediate · 10 min
              </p>
            </div>
            <a
              href="/learn/think/how-we-actually-make-decisions"
              className="inline-flex items-center gap-2 bg-[#A78BFA] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
