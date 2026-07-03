import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "The AI Brainstorm Method — Think with AI | Cyberussell",
  description:
    "A structured way to use AI to generate, expand, and combine ideas beyond your first instinct.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/the-ai-brainstorm-method" },
  openGraph: {
    title: "The AI Brainstorm Method | Cyberussell",
    description: "A structured way to use AI to generate, expand, and combine ideas beyond your first instinct.",
    url: "https://www.cyberussell.com/learn/think/the-ai-brainstorm-method",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideEightPage() {
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
            <span className="text-white/60">The AI Brainstorm Method</span>
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
              12 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 8 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            The AI Brainstorm Method
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Generate → Expand → Combine. A structured method for ideas that are actually good.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use a structured AI brainstorming method to generate, expand, and combine ideas into something better than your starting point.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              In Guide 7, you learned why your first idea is rarely your best. Now you get the method that consistently produces better ones.
            </p>
            <p>
              Most AI brainstorming stops at Step 1 — "give me a list of ideas." That is useful, but it leaves most of the value untouched. The real leverage comes from what you do with the list: expanding the most interesting ideas, then combining the best elements of multiple ideas into something new.
            </p>
            <p>
              This 5-step method is the difference between a brainstorming session that produces a list and one that produces an idea you actually want to pursue.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept — The 5-Step Method</h2>

          <div className="space-y-3 mb-8">
            {[
              { num: "1", title: "Generate broadly", prompt: "Give me 15-20 ideas for [goal]. Include obvious, unusual, and unexpected options. Do not filter.", note: "The goal is quantity. Do not judge yet." },
              { num: "2", title: "Pick 3 that interest you", prompt: null, note: "You are choosing based on gut reaction — energy, excitement, or curiosity. Not which one seems most 'realistic.'" },
              { num: "3", title: "Push each one further", prompt: "Take idea [X]. Make it bigger, cheaper, faster, or more Filipino. What are 3 variations of this idea?", note: "Each idea has multiple versions. You want to see what it looks like when stretched." },
              { num: "4", title: "Combine the best elements", prompt: "Here are my top 3 ideas after expansion: [A], [B], [C]. Combine the best elements of all three into one hybrid idea.", note: "Hybrid ideas are often where the breakthrough lives. AI is excellent at this step." },
              { num: "5", title: "Gut check", prompt: null, note: "Ask yourself: does this feel like something I would actually do? If yes, you have your idea. If not, go back to Step 2 and pick different ones." },
            ].map((step) => (
              <div key={step.num} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#A78BFA]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-sans text-[14px] font-bold text-[#A78BFA]">{step.num}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[16px] font-bold text-white mb-2">{step.title}</p>
                    {step.prompt && (
                      <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[10px] p-3 mb-3">
                        <p className="font-mono text-[12px] text-[#FFD23F] leading-[1.6]">{step.prompt}</p>
                      </div>
                    )}
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.7]">{step.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 15 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-4">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Use the 20-idea list you generated in Guide 7 as your starting point. If you do not have one, run Step 1 now with a real goal. Then walk through all 5 steps in sequence.
                </p>
              </div>

              <div className="space-y-2">
                {[
                  { label: "Step 1", text: "Generate 15-20 ideas for your goal (or use the list from Guide 7)" },
                  { label: "Step 2", text: "Pick the 3 ideas that give you the most energy or curiosity" },
                  { label: "Step 3", text: "Ask AI to push each one further with 3 variations" },
                  { label: "Step 4", text: "Ask AI to combine the best elements of all three into a hybrid" },
                  { label: "Step 5", text: "Gut check: does the hybrid idea feel like something you would actually pursue?" },
                ].map((s) => (
                  <div key={s.label} className="flex gap-3 items-start">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] bg-[#A78BFA]/10 rounded px-2 py-0.5 shrink-0 mt-0.5">{s.label}</span>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{s.text}</p>
                  </div>
                ))}
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
                "Generated the initial idea list",
                "Picked 3 and had AI expand each one",
                "AI combined the best elements into a hybrid idea",
                "Gut checked the result and have an idea I want to pursue",
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
              Is the hybrid idea something you would have arrived at on your own? <span className="text-white font-bold">What does it feel like to have an idea that combines things you had not thought to combine?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "The AI Brainstorm Method has 5 steps: Generate → Pick 3 → Expand Each → Combine → Gut Check.",
              "Expanding ideas reveals versions you would not have seen. Combining ideas creates hybrids that no single idea could produce alone.",
              "The gut check is the filter. Use it at the end — not at the start. Premature filtering kills good ideas before they have a chance to develop.",
              "This method works for any creative challenge — business ideas, content, solutions, offers, projects. Learn it once and use it everywhere.",
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Run the full method on a business or project idea you have been sitting on.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Most people have one idea they have been thinking about for months without doing anything with it. Run it through the full 5-step method. You may discover the version of the idea that is actually worth pursuing.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Filtering Ideas Like a Pro</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Think with AI · Guide 9 of 12 · Intermediate · 8 min
              </p>
            </div>
            <a
              href="/learn/think/filtering-ideas-like-a-pro"
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
