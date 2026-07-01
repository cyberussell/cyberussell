import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Why Big Problems Feel Impossible — Think with AI | Cyberussell",
  description:
    "Why we get stuck and how AI helps you break out of the overwhelm loop by separating what is real from what is anxiety.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/why-big-problems-feel-impossible" },
  openGraph: {
    title: "Why Big Problems Feel Impossible | Cyberussell",
    description: "Why we get stuck and how AI helps you break out of the overwhelm loop.",
    url: "https://www.cyberussell.com/learn/think/why-big-problems-feel-impossible",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideFourPage() {
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
            <span className="text-white/60">Why Big Problems Feel Impossible</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#A78BFA] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Concept Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              8 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 4 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Why Big Problems Feel Impossible
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Overwhelm is not a sign the problem is too big. It is a sign it is unsorted.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Identify why a problem feels overwhelming and use AI to separate what is real from what is anxiety.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              You have probably had the experience of staring at a problem and feeling like you cannot even start. It is not that you do not care. It is not that you are lazy. The problem just feels too big to touch.
            </p>
            <p>
              That feeling is information. But it is not accurate information about the size of the problem. It is information about how you are currently relating to it.
            </p>
            <p>
              Big problems feel impossible for three consistent reasons. Once you know what they are, you can use AI to break out of the loop every time.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="space-y-4 mb-8">
            {[
              {
                num: "1",
                title: "They are actually many problems disguised as one",
                desc: "\"I need to make more money\" is not one problem. It contains: current income gap, available skills, available time, low-barrier income options, and what to try first. Each of those is a separate, solvable thing. Lumped together they feel impossible. Separated, they become workable.",
              },
              {
                num: "2",
                title: "We mix facts with fears",
                desc: "When we think about a big problem, we mix what is actually true with what we are afraid might be true. The problem becomes half-real, half-anxiety — and the anxiety part makes it feel twice as hard. AI can help you sort which parts are facts and which are fears.",
              },
              {
                num: "3",
                title: "We try to solve the whole thing at once",
                desc: "The brain wants to solve the whole problem before taking any action. That is backwards. You cannot solve a complex problem all at once — you can only take the next right step. AI helps you find that step.",
              },
            ].map((item) => (
              <div key={item.num} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#A78BFA]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-sans text-[13px] font-bold text-[#A78BFA]">{item.num}</span>
                </div>
                <div>
                  <p className="font-sans text-[15px] font-bold text-white mb-2">{item.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-3">
              What AI Does Well Here
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.9]">
              AI does not feel overwhelm. It does not catastrophize. When you tell AI about a big scary problem, it calmly asks: "Okay, what are the actual components here?" That calm, systematic approach is exactly what you need when you are too close to the problem to see it clearly.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">The Problem That Feels Impossible</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] italic">
                "I need to make more money."
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mt-2">
                This feels enormous because it is vague. It contains everything and points to nothing.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-4">What AI Breaks It Into</p>
              <div className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] space-y-2">
                <p>→ How much more money do you actually need, and by when?</p>
                <p>→ What skills do you have that other people would pay for?</p>
                <p>→ How many hours a week could you realistically dedicate to this?</p>
                <p>→ What is the lowest-barrier income option given those constraints?</p>
                <p>→ What is one thing you could try in the next 7 days?</p>
              </div>
              <div className="bg-[#22C55E]/8 border border-[#22C55E]/15 rounded-lg px-4 py-3 mt-4">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#22C55E]/80 leading-[1.6]">
                  Each of those questions is answerable. None of them is impossible. That is what decomposition does.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 10 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Think of a problem that currently feels too big or overwhelming to approach. Replace [their problem] in the prompt below with a brief description of it.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt
                </p>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  I have this problem that feels overwhelming: [your problem]. Help me separate what is actually true about this situation from what might be fear or assumption. Then help me list every sub-problem that&apos;s hiding inside it.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">After AI responds</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Read the list of sub-problems. Pick the one that feels most actionable. Ask AI: "If I could only work on one of these this week, which one should it be and why?"
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
                "Used the prompt with a real overwhelming problem",
                "AI separated facts from fears/assumptions",
                "AI listed sub-problems inside the big problem",
                "I identified which sub-problem to work on first",
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
              After AI broke it down, did the problem still feel impossible? <span className="text-white font-bold">Which parts were real problems — and which parts were fears you had mixed in?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Big problems feel impossible because they are actually many smaller problems in disguise — not because they are actually unsolvable.",
              "We mix facts with fears when thinking about problems. AI helps you sort which is which.",
              "The goal is never to solve the whole problem at once. The goal is to find the next right step.",
              "AI does not feel overwhelm. Use that calm, systematic perspective when you are too close to the problem to see it clearly.",
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Do this with every problem that stops you this week.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Every time this week that you feel stuck on something, use the prompt from this guide. Practice noticing the difference between facts and fears. By the end of the week, you will have a new default response to feeling overwhelmed.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">The Problem Decomposition Method</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Think with AI · Guide 5 of 12 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/think/the-problem-decomposition-method"
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
