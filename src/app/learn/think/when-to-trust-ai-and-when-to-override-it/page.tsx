import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "When to Trust AI and When to Override It — Think with AI | Cyberussell",
  description:
    "Knowing the limits of AI advice — and when your lived experience and human judgment win.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/when-to-trust-ai-and-when-to-override-it" },
  openGraph: {
    title: "When to Trust AI and When to Override It | Cyberussell",
    description: "Knowing the limits of AI advice and when your human judgment wins.",
    url: "https://www.cyberussell.com/learn/think/when-to-trust-ai-and-when-to-override-it",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideTwelvePage() {
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
            <span className="text-white/60">When to Trust AI and When to Override It</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#A78BFA] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Intermediate
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Judgment Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              8 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 12 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            When to Trust AI and When to Override It
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            AI is a thinking partner — not the decision maker. Here is the line.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Identify situations where AI advice should be trusted, questioned, or overridden — and apply that judgment in a real scenario.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              The biggest failure mode with AI is not using it too little. It is trusting it too completely.
            </p>
            <p>
              AI is extraordinary at certain things. It is blind to others. The people who get the most value from AI know exactly which is which — and they never confuse one for the other.
            </p>
            <p>
              This is the final guide in the Think with AI pillar because everything else you have learned only works if you have sound judgment about when AI is right. Without this, you are a powerful tool without a brake.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E]/80 uppercase tracking-[1.5px] mb-3">Trust AI when</p>
              <ul className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] space-y-2">
                <li>→ The stakes are low and you can check the output easily</li>
                <li>→ The task is well-defined with clear right and wrong answers</li>
                <li>→ You are working with general knowledge that does not depend on your specific context</li>
                <li>→ You need speed and a rough answer is better than a slow perfect one</li>
              </ul>
            </div>

            <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-5">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B]/80 uppercase tracking-[1.5px] mb-3">Question AI when</p>
              <ul className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] space-y-2">
                <li>→ The advice depends heavily on your personal context, relationships, or emotions</li>
                <li>→ The situation requires specific local knowledge AI may not have</li>
                <li>→ The stakes are high and the cost of being wrong is significant</li>
                <li>→ You notice AI seems confident but you cannot verify the basis of that confidence</li>
              </ul>
            </div>

            <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[14px] p-5">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A]/80 uppercase tracking-[1.5px] mb-3">Override AI when</p>
              <ul className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] space-y-2">
                <li>→ Your lived experience directly contradicts generic advice for your specific situation</li>
                <li>→ AI is giving you what worked somewhere else for someone else — not what fits you</li>
                <li>→ The decision requires moral judgment about your own values</li>
                <li>→ Your gut says something important that the analysis does not capture</li>
              </ul>
            </div>
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-3">
              The Core Principle
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/65 leading-[1.9]">
              AI knows a lot about how things work in general. You know something AI will never know: what it is like to be you, in your community, with your history, your relationships, and your constraints. When those two bodies of knowledge conflict, neither one automatically wins. Your job is to know which source to weight more — and why.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-3">The Situation</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
                AI tells someone to price their freelance service at ₱500/hour based on market data and their skill level. The recommendation is grounded in real data — that is what people with similar skills earn in the market.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] uppercase tracking-[2px] mb-3">Why They Override</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                They know their clients. They are based in a smaller city in the province. Their network is made up of small local businesses with tight budgets. The market data comes from Metro Manila and international clients — not their actual customer base.
              </p>
              <div className="bg-[#22C55E]/8 border border-[#22C55E]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#22C55E]/80 leading-[1.6]">
                  They price at ₱250/hour — lower than the market rate, but right for their actual market. They get clients. They build a portfolio. They raise rates later. Their local knowledge overrides the generic recommendation — and they are right to let it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Get AI advice on something real</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Ask AI for advice on something relevant to your life or work — pricing, a strategy, a life decision, a creative direction. Get a real recommendation.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Evaluate the advice</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Using the Trust / Question / Override framework, categorize this advice. Ask yourself:
                </p>
                <div className="mt-2 space-y-1">
                  {[
                    "Is this generic advice or is it specific to my situation?",
                    "Does AI have the local knowledge it would need to be right here?",
                    "Do I have lived experience that contradicts this?",
                    "Is this a low-stakes or high-stakes situation?",
                  ].map((q) => (
                    <p key={q} className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.6] flex gap-2">
                      <span className="text-[#A78BFA]">→</span> {q}
                    </p>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Decide: Trust, Question, or Override</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Make the call. If you question or override, write one sentence explaining why. That sentence is your judgment — own it.
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
                "Got real AI advice on something relevant to my life",
                "Evaluated it using the Trust / Question / Override framework",
                "Made a deliberate call on how much to trust this particular advice",
                "If I questioned or overrode it, I know exactly why",
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
              When was the last time you followed advice — from anyone — that was technically correct but wrong for your specific situation? <span className="text-white font-bold">What did that experience teach you about the difference between general truth and personal truth?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Trust AI for well-defined, low-stakes, general-knowledge tasks where the output is checkable. Question it for anything personal, local, or high-stakes. Override it when your lived experience directly contradicts the generic advice.",
              "AI knows about the world in general. You know about your world specifically. Both matter — know which to weight more in each situation.",
              "The inability to override AI when it is wrong is as dangerous as the inability to use it at all. Both skills matter.",
              "Your judgment is the final layer. AI improves the quality of your decision inputs — but you are always the decision maker.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#A78BFA]/15 via-[#A78BFA]/5 to-transparent border border-[#A78BFA]/30 rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA]/70 uppercase tracking-[1.5px] mb-1">You Are Ready</p>
              <p className="font-sans text-[18px] font-bold text-white">Take the Final Assessment</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Earn your Thinking Bida Badge and personalized certificate
              </p>
            </div>
            <a
              href="/learn/think/complete"
              className="inline-flex items-center gap-2 bg-[#A78BFA] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
            >
              Complete Pillar 2 <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
