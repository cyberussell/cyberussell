import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "The AI Decision Framework — Think with AI | Cyberussell",
  description:
    "A repeatable 6-step method for using AI to evaluate any decision before you commit.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/the-ai-decision-framework" },
  openGraph: {
    title: "The AI Decision Framework | Cyberussell",
    description: "A repeatable method for using AI to evaluate any decision before you commit.",
    url: "https://www.cyberussell.com/learn/think/the-ai-decision-framework",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideElevenPage() {
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
            <span className="text-white/60">The AI Decision Framework</span>
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
            Think with AI · Guide 11 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            The AI Decision Framework
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            A repeatable 6-step method for making any important decision better.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Apply a repeatable AI-assisted decision framework to a real choice you are facing.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              In Guide 10, you learned what goes wrong with decisions when we make them alone. Now you get the antidote — a structured method that works every time because it takes the same steps in the same order regardless of the decision size.
            </p>
            <p>
              Good decision-making is not about having more information. It is about asking the right questions in the right order. This framework does that — and it ends with you making the call yourself, not delegating it to AI.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept — The 6-Step Framework</h2>

          <div className="space-y-3 mb-8">
            {[
              { num: "1", title: "State the decision clearly", desc: "What exactly am I choosing between? Not 'what should I do with my career' but 'should I take the job offer at Company X or stay in my current role.' Precision here matters — a vague decision produces vague analysis." },
              { num: "2", title: "List your options", desc: "Name every real option you have — including 'do nothing' or 'wait.' Most decision analyses miss the 'do nothing' option, which is often the most important one to evaluate." },
              { num: "3", title: "Ask AI for pros, cons, and risks", desc: "For each option, ask AI: what are the genuine upsides, the genuine downsides, and the risks that could make this much worse than expected? Ask for honesty, not reassurance." },
              { num: "4", title: "Ask AI to steelman the option you are NOT leaning toward", desc: "Steelmanning means making the strongest possible case for an argument. Ask AI to steelman the option you are not naturally drawn to. This is the most powerful step. It is where you find out if your lean is based on good reasons or bias." },
              { num: "5", title: "Ask what you might be missing", desc: "Ask: 'What am I not considering? What might I be missing or underweighting here?' This is where AI catches what you could not catch yourself — because you do not know what you do not know." },
              { num: "6", title: "Make the decision yourself", desc: "You have the analysis. Now you decide. AI gave you the clearest possible picture — but the decision belongs to you. Your values, your risk tolerance, your life context are factors only you can weigh." },
            ].map((step) => (
              <div key={step.num} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#A78BFA]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-sans text-[13px] font-bold text-[#A78BFA]">{step.num}</span>
                </div>
                <div>
                  <p className="font-sans text-[15px] font-bold text-white mb-2">{step.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 12 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Pick a real decision you are currently weighing — something with two or more real options where you are not yet fully committed. Use the prompt below and run through all 6 steps in one conversation.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt
                </p>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  I need to decide between [Option A] and [Option B]. Here is my situation: [context]. Walk me through the pros, cons, and risks of each option. Then steelman Option [the one I&apos;m NOT leaning toward]. Finally, tell me what I might be missing or not considering.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">After AI responds</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Read the steelman carefully. Ask yourself: does this change anything? Is there something in the case for the other option that you had not genuinely weighed? Then make your decision.
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
                "Stated the decision clearly and listed both options",
                "AI gave pros, cons, and risks for each option",
                "AI steelmanned the option I was NOT leaning toward",
                "AI told me what I might be missing",
                "I made the decision myself with more clarity than I had before",
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
              Did the steelman of the other option change anything? <span className="text-white font-bold">Is there a real argument for the path you were not taking — one you had not genuinely considered before?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "The 6-step framework works for any decision: state clearly → list options → pros/cons/risks → steelman the other side → find what you're missing → decide yourself.",
              "Steelmanning is the most powerful step. If the strongest case for the other option does not move you at all, you probably have good reasons for your lean.",
              "'What am I missing?' is an underused question. AI catches blind spots you cannot catch yourself — use it every time.",
              "The framework ends with you deciding. AI improves your decision process — it does not replace your judgment. The call is always yours.",
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Apply the framework to a decision you have been avoiding.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Everyone has a decision they keep putting off. Often we avoid decisions because we are afraid of what a clear analysis might reveal. Run this framework on your avoided decision. The clarity might feel uncomfortable — but it is better than the ongoing weight of not deciding.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">When to Trust AI and When to Override It</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Think with AI · Guide 12 of 12 · Intermediate · 8 min
              </p>
            </div>
            <a
              href="/learn/think/when-to-trust-ai-and-when-to-override-it"
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
