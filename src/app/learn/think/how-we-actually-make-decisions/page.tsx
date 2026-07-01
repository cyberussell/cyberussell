import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "How We Actually Make Decisions — Think with AI | Cyberussell",
  description:
    "Understanding cognitive biases that lead to bad decisions — and how AI helps you catch them before they cost you.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/how-we-actually-make-decisions" },
  openGraph: {
    title: "How We Actually Make Decisions | Cyberussell",
    description: "Understanding cognitive biases that lead to bad decisions — and how AI helps counter them.",
    url: "https://www.cyberussell.com/learn/think/how-we-actually-make-decisions",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideTenPage() {
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
            <span className="text-white/60">How We Actually Make Decisions</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#A78BFA] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Intermediate
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Concept Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 10 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            How We Actually Make Decisions
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            We think we decide rationally. We do not. Here is what is actually happening.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Name at least 2 cognitive biases that affect your decisions and explain how AI helps you catch them.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most of the bad decisions you have made in your life felt good at the time. That is the problem. Bad decisions do not feel bad when you make them — they feel justified, obvious, even inevitable.
            </p>
            <p>
              This is because our brains use mental shortcuts — cognitive biases — that evolved for a world very different from the one we live in. These shortcuts save mental energy. They also consistently lead us astray in predictable, repeatable ways.
            </p>
            <p>
              AI does not have these biases. It can see your situation more clearly than you can — if you know how to ask.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept — 3 Biases That Hurt Most</h2>

          <div className="space-y-4 mb-8">
            {[
              {
                name: "Confirmation Bias",
                plain: "We look for information that confirms what we already believe",
                detail: "When you have already decided something — even unconsciously — you naturally notice evidence that supports it and dismiss evidence that contradicts it. You think you are evaluating fairly. You are not.",
                example: "You decide to launch a food business. You find 3 success stories and feel confident. You do not spend equal time looking for failure rates.",
              },
              {
                name: "Availability Bias",
                plain: "We overweight what is recent or memorable",
                detail: "Events that are recent, emotional, or vivid feel more common and more likely than they actually are. If your friend's business just failed, you feel like businesses fail more than they do. If you just heard about someone making it big online, you overestimate your own chances.",
                example: "A friend loses money on crypto last month. You now feel more certain than you should that crypto is always a bad idea — even for situations completely different from theirs.",
              },
              {
                name: "Sunk Cost Fallacy",
                plain: "We keep going because of what we already invested — not because of future value",
                detail: "Past investment — money, time, energy, emotion — should have no bearing on whether to continue something. But we feel it does. The more we have invested, the harder it is to walk away, even when the logical decision is to stop.",
                example: "You have been running the same Facebook ad campaign for 3 months with no results. You keep running it because you have already spent ₱8,000 on it. The past spend is gone either way — it should not determine whether you continue.",
              },
            ].map((bias) => (
              <div key={bias.name} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <p className="font-sans text-[16px] font-bold text-white mb-1">{bias.name}</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] font-medium text-[#A78BFA] mb-3">{bias.plain}</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7] mb-3">{bias.detail}</p>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg px-4 py-3">
                  <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 leading-[1.6]"><span className="text-white/50 font-medium">Example: </span>{bias.example}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-3">
              AI as Your Bias Checker
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.9]">
              When you ask AI to evaluate a situation <span className="text-white italic">before</span> you tell it what you are leaning toward, it gives you an unbiased read. It cannot favor your preferred outcome because it does not know what it is. Use that. Ask AI to evaluate first — then reveal your lean and ask it to push back.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Sunk Cost in Action</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Someone has been running the same Facebook ad for 3 months with no meaningful results. Sunk cost keeps them running it — they have already spent ₱8,000, so stopping feels like admitting the money was wasted.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
                They ask AI to evaluate the ad objectively — without mentioning how long they have been running it. AI immediately flags 4 specific problems: targeting too broad, hook too generic, CTA unclear, landing page mismatched.
              </p>
              <div className="bg-[#22C55E]/8 border border-[#22C55E]/15 rounded-lg px-4 py-3 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#22C55E]/80 leading-[1.6]">
                  AI evaluated on current merit, not past investment. That is the value. The ad failed on its own terms — the ₱8,000 already spent is irrelevant to whether they should continue.
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
                  Think of a real decision you are currently facing — or one you made recently that you are second-guessing. Use the prompt below. Critically: do NOT tell AI what you are leaning toward yet.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt
                </p>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  I need to make this decision: [decision]. Before I tell you what I am leaning toward, analyze the situation objectively. What are the key factors I should consider? What cognitive biases might be affecting my thinking here?
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">After AI responds</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Now tell AI what you were leaning toward. Ask: "Does knowing that change anything about your analysis? Where might I be fooling myself?"
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
                "Asked AI to analyze my decision before revealing my lean",
                "AI named at least one bias that might be affecting my thinking",
                "I told AI what I was leaning toward and asked for pushback",
                "I now see this decision differently than I did before",
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
              Which of the three biases — confirmation, availability, sunk cost — do you think affects you most? <span className="text-white font-bold">Can you think of a decision in the last year where you can see one of these biases at work?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Three biases hurt decisions most: confirmation bias (seeking confirming evidence), availability bias (overweighting recent events), and sunk cost fallacy (being influenced by past investment).",
              "AI does not have these biases. It evaluates situations on their current merits — which is exactly what you need from a decision partner.",
              "Always ask AI to evaluate a decision before you reveal what you are leaning toward. Unbiased analysis first, then specific feedback on your lean.",
              "Naming the bias that might be affecting you does not make you immune to it. But it gives you a moment to pause — and that moment is where better decisions are made.",
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Find one place in your life where sunk cost is running the show.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Is there something you are continuing — a project, a habit, a relationship, a subscription, a strategy — primarily because of what you have already put into it? Ask AI to evaluate it on future merit only, as if the past investment did not exist. Then decide.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">The AI Decision Framework</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Think with AI · Guide 11 of 12 · Intermediate · 10 min
              </p>
            </div>
            <a
              href="/learn/think/the-ai-decision-framework"
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
