import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Decision Making Workflow — AI Workflows | Cyberussell",
  description:
    "Use ChatGPT and Claude to make an important decision clearly — by seeing all sides before you choose.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/decision-making" },
  openGraph: {
    title: "Decision Making Workflow | Cyberussell",
    description: "Use ChatGPT and Claude to make an important decision clearly — by seeing all sides before you choose.",
    url: "https://www.cyberussell.com/learn/workflows/decision-making",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const STEPS = [
  {
    number: "01",
    tool: "YOU",
    color: "#FFD23F",
    title: "Write out the decision",
    time: "5 min",
    description: "Describe the choice in one sentence. What are your options? What are you afraid of getting wrong?",
  },
  {
    number: "02",
    tool: "CHATGPT",
    color: "#10B981",
    title: "Map the options",
    time: "10 min",
    description: "Ask ChatGPT to list all the pros, cons, and risks for each option in a structured format.",
  },
  {
    number: "03",
    tool: "CLAUDE",
    color: "#F59E0B",
    title: "Steelman each side",
    time: "10 min",
    description: "Ask Claude to make the strongest possible argument for EACH option, including the one you are not leaning toward.",
  },
  {
    number: "04",
    tool: "GEMINI",
    color: "#4F8EF7",
    title: "Find relevant facts",
    time: "10 min",
    description: "If your decision depends on data (market rates, legal rules, statistics, comparisons), ask Gemini to find current information.",
  },
  {
    number: "05",
    tool: "YOU",
    color: "#FFD23F",
    title: "Decide and commit",
    time: "5 min",
    description: "With all information in front of you, make your decision. Write down your reasons so you remember your thinking later.",
  },
];

const FILIPINO_EXAMPLES = [
  "Should I quit my BPO job to freelance? (Big life decision with real financial risk)",
  "Should I invest in a food cart or start selling online? (Business model decision)",
  "Should I take this client at a lower rate to build my portfolio? (Freelance pricing decision)",
  "Should I study abroad or take a local scholarship? (Education decision)",
];

const CHECKLIST = [
  "Wrote out my decision and options clearly",
  "Used ChatGPT to map pros, cons, and risks",
  "Used Claude to steelman each option",
  "Used Gemini to find relevant facts",
  "Made my decision and wrote down my reasoning",
];

const TAKEAWAYS = [
  "AI does not make decisions. You do. AI removes the fog so you can see clearly.",
  "Steelmanning (making the strongest argument for the other side) protects you from deciding too quickly based on emotion.",
  "Gemini finds current facts that can change a decision completely — for example, finding out the average rate for a service before agreeing to a lower price.",
  "Writing down your reasoning is one of the most underrated habits. It builds wisdom from every decision you make.",
];

export default function DecisionMakingWorkflowPage() {
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
            <a href="/learn/workflows" className="hover:text-white transition-colors">AI Workflows</a>
            <span>/</span>
            <span className="text-white/60">Decision Making</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Workflow Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              40 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 10 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Decision Making Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            See every side clearly before you choose — so you make decisions you will not regret.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use ChatGPT and Claude to make an important decision clearly — by seeing all sides before you choose.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              We make bad decisions when we are emotional, rushed, or missing information.
            </p>
            <p>
              AI does not make the decision for you. It helps you see clearly before you choose. This workflow slows you down in the right way — so you make choices you will not regret.
            </p>
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[12px] px-5 py-4">
              <p className="font-sans text-[16px] font-bold text-white">
                Key principle: AI informs the decision. YOU make it.
              </p>
            </div>
          </div>
        </section>

        {/* Filipino Examples */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
              Filipino Examples
            </p>
            <div className="space-y-2">
              {FILIPINO_EXAMPLES.map((ex) => (
                <div key={ex} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7]">{ex}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>
          <div className="relative">
            <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/[0.06]" />
            <div className="space-y-6">
              {STEPS.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-[11px] font-bold font-[family-name:var(--font-inter)] z-10" style={{ borderColor: step.color, color: step.color, backgroundColor: "#0F0F1A" }}>
                      {step.number}
                    </div>
                  </div>
                  <div className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-5 flex-1 mb-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-full" style={{ color: step.color, backgroundColor: `${step.color}15` }}>
                        {step.tool}
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 uppercase tracking-[1px]">{step.time}</span>
                    </div>
                    <p className="font-sans text-[16px] font-bold text-white mb-2">{step.title}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">Use a real decision you are facing right now</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 space-y-6">
            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                Write the decision you need to make. Then write your options (usually 2-3). Then write: What am I most afraid of getting wrong here?
              </p>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — ChatGPT</span>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[14px] text-[#10B981] leading-[1.7]">
                  I need to make a decision: [describe your decision and options]. For each option, give me: the strongest reasons to choose it, the main risks or downsides, and what I would need to be true for this to work out well. Be honest and balanced — do not just tell me what I want to hear.
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Claude</span>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Claude</p>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.7]">
                  I am deciding between [your options]. I am currently leaning toward [option]. Make the strongest possible argument for [the OTHER option] — steelman it completely. Assume that option is the right choice and give me the best case for it. Then do the same for [your preferred option]. Do not tell me which to choose.
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 4 — Gemini</span>
              <div className="bg-[#0F0F1A] border border-[#4F8EF7]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Gemini</p>
                <p className="font-mono text-[14px] text-[#4F8EF7] leading-[1.7]">
                  I am making a decision about [your topic]. Find current, factual information about: [the specific data you need, e.g., &quot;average freelance rates for VAs in the Philippines in 2025&quot; or &quot;startup costs for a food cart business in the Philippines&quot;].
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 5 — You</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                Lay out all the information in front of you. Make your decision. Write one paragraph explaining why you chose what you chose. Keep it — it will help you stay committed and learn from the outcome.
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {CHECKLIST.map((item) => (
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
              Think of a decision you made in the past that you regret. <span className="text-white font-bold">Would having all the information — without the emotional urgency — have changed what you chose?</span>
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
            {TAKEAWAYS.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next — Final guide */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">You&rsquo;ve completed all 10 guides!</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Take the assessment to earn your Workflow Bida Badge.
              </p>
            </div>
            <a
              href="/learn/workflows/complete"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
            >
              Take the Final Assessment <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
