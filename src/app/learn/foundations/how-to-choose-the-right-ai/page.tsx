import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "How to Choose the Right AI — AI Foundations | Cyberussell",
  description:
    "ChatGPT, Claude, Gemini — a simple framework for picking the right AI tool for any task without testing all three every time.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations/how-to-choose-the-right-ai" },
  openGraph: {
    title: "How to Choose the Right AI | Cyberussell",
    description: "A simple framework for picking between ChatGPT, Claude, and Gemini for any task.",
    url: "https://www.cyberussell.com/learn/foundations/how-to-choose-the-right-ai",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const tools = [
  {
    name: "ChatGPT",
    color: "#10B981",
    profile: "General-purpose thinking, planning, and creative work",
    bestFor: [
      "Brainstorming and generating options",
      "Planning projects and breaking down tasks",
      "Creative writing and content drafts",
      "General questions and explanations",
      "Everyday productivity tasks",
    ],
    reach: "When you need a capable, all-around starting point and you're not sure which tool fits best.",
  },
  {
    name: "Claude",
    color: "#F59E0B",
    profile: "Writing quality, long documents, and careful reasoning",
    bestFor: [
      "Editing and improving written content",
      "Working with long documents or dense text",
      "Careful reasoning through complex problems",
      "Nuanced writing that needs a specific tone",
      "Tasks where you want a thoughtful, detailed response",
    ],
    reach: "When the quality of writing matters, or when you're working with a long piece of content.",
  },
  {
    name: "Gemini",
    color: "#4F8EF7",
    profile: "Current information, research, and Google Workspace tasks",
    bestFor: [
      "Questions about recent events or current data",
      "Research tasks that benefit from up-to-date information",
      "Tasks connected to Google Docs, Sheets, or Gmail",
      "Fact-checking with real-time web access",
      "Summarizing recent articles or news",
    ],
    reach: "When you need current information or you're working inside the Google ecosystem.",
  },
];

const tasks = [
  { task: "Write a first draft of a client proposal", tool: "ChatGPT or Claude", reason: "Both handle drafting well. Claude if tone and quality matter most." },
  { task: "Find out what happened in the news this week", tool: "Gemini", reason: "Requires current information — Gemini has real-time web access." },
  { task: "Polish a long report I've already written", tool: "Claude", reason: "Long document editing is a Claude strength." },
  { task: "Brainstorm 20 business name ideas", tool: "ChatGPT", reason: "Creative brainstorming across many options — ChatGPT's home ground." },
  { task: "Summarize a Google Doc I'm working on", tool: "Gemini", reason: "Google Workspace integration makes this faster." },
];

export default function HowToChooseTheRightAIPage() {
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
            <a href="/learn/foundations" className="hover:text-white transition-colors">AI Foundations</a>
            <span>/</span>
            <span className="text-white/60">How to Choose the Right AI</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#4F8EF7] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Concept Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Foundations · Guide 5 of 7
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            How to Choose the Right AI
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Most people open whichever AI tab is already on their screen. This Guide gives you a reason to choose intentionally instead.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Choose between ChatGPT, Claude, and Gemini for a general task — using a simple decision framework — without needing to test all three every time.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why Tool Choice Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Different AI tools were trained differently and optimized for different strengths. Using the wrong tool for a task is not dangerous — but it is inefficient. You might get a weaker result and conclude AI isn't helpful for that task, when a different tool would have performed much better.
            </p>
            <p>
              This Guide teaches general profiles — not features. Features change with every update. Profiles are more stable. The goal is to give you a starting framework you can refine with experience.
            </p>
            <p className="text-white/80">
              This is a starting point — not a permanent rule. As you use AI more, you will develop your own sense of which tool fits which task for your specific work.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Three General Profiles</h2>
          <div className="space-y-4">
            {tools.map((t) => (
              <div key={t.name} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: t.color }} />
                  <h3 className="font-sans text-[18px] font-bold text-white">{t.name}</h3>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[13px] mb-4" style={{ color: `${t.color}99` }}>{t.profile}</p>

                <div className="mb-4">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-2">Best for</p>
                  <div className="space-y-1.5">
                    {t.bestFor.map((item) => (
                      <div key={item} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-[6px] shrink-0" style={{ backgroundColor: t.color }} />
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6]">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[8px] px-4 py-3">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-1">Reach for this when</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6]">{t.reach}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Quick Reference — 5 Tasks</h2>
          <div className="space-y-3">
            {tasks.map((t) => (
              <div key={t.task} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-start gap-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/70 leading-[1.6] flex-1">{t.task}</p>
                <div className="shrink-0 sm:text-right">
                  <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#FFD23F]">{t.tool}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-0.5 leading-[1.5]">{t.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 8 minutes · Any two AI tools</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Think of a real task you need to do this week — something work-related or for your learning goals.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Using the three profiles above, decide which AI you would use for that task. Write one sentence explaining why.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Run the task in your chosen AI. Then run the same prompt in a second AI. Compare both responses — which one was more useful for your specific task?
                </p>
              </div>

              <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[10px] px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#FFD23F]/70 leading-[1.6]">
                  There are no wrong answers here. The judgment is the exercise. You are building your own sense of which tool works for your work.
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
                "Picked a real task and chose a tool based on the profiles",
                "Ran the task in my chosen AI",
                "Compared the result to a second AI tool",
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
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              Before this Guide, which AI were you defaulting to — and why? <span className="text-white font-bold">Is there one type of task in your regular work that you now plan to route to a specific tool?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 mt-3">You do not need to write it down. Just think.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Different AI tools have different general strengths — tool choice is a judgment skill, not a rule to memorize.",
              "ChatGPT: general-purpose thinking and creativity. Claude: writing quality and long documents. Gemini: current information and Google Workspace.",
              "These profiles are starting points. Your own experience with your specific tasks is what matters most over time.",
              "No tool is objectively better. The right tool depends on the task and the person using it.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Your First Real Prompt</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                AI Foundations · Guide 6 of 7 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/foundations/your-first-real-prompt"
              className="inline-flex items-center gap-2 bg-[#FFD23F] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
