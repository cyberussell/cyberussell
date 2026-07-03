import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Your First Real Prompt — AI Foundations | Cyberussell",
  description:
    "Write a prompt that includes enough context for AI to respond usefully the first time. Four elements, one real task, one result you can actually use.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations/your-first-real-prompt" },
  openGraph: {
    title: "Your First Real Prompt | Cyberussell",
    description: "Four elements that make a prompt work. Write one for a task you actually need.",
    url: "https://www.cyberussell.com/learn/foundations/your-first-real-prompt",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const elements = [
  {
    number: "01",
    label: "Task",
    question: "What do you want AI to do?",
    weak: "Write something about freelancing.",
    strong: "Write a short introduction paragraph for my freelance services page.",
    why: "A clear task tells AI what type of output to produce. Without it, AI guesses — and usually guesses too broadly.",
  },
  {
    number: "02",
    label: "Context",
    question: "What does AI need to know about your situation?",
    weak: "(nothing added)",
    strong: "I offer social media management services to small Filipino businesses. My clients are mostly restaurant and retail owners who are not very active online yet.",
    why: "Context is the most important element. AI has no knowledge of your situation unless you provide it. More context = more relevant output.",
  },
  {
    number: "03",
    label: "Format",
    question: "How do you want the response structured?",
    weak: "(nothing specified)",
    strong: "Write it as 3 short sentences. Professional but conversational — not formal.",
    why: "Without a format, AI defaults to whatever feels natural to it. That default may not match what you actually need.",
  },
  {
    number: "04",
    label: "Constraints",
    question: "What should AI avoid or limit?",
    weak: "(nothing specified)",
    strong: "Do not use the words 'passionate' or 'dedicated.' Avoid clichés.",
    why: "Constraints prevent AI from producing output that technically answers the question but misses what you wanted.",
  },
];

export default function YourFirstRealPromptPage() {
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
            <span className="text-white/60">Your First Real Prompt</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#4F8EF7] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#E8373A] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Skill Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Foundations · Guide 6 of 7
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Your First Real Prompt
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Most AI interactions are disappointing because most prompts are vague. This Guide fixes that — with four elements you can apply to any task, starting now.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Write a prompt that includes enough context for AI to respond usefully the first time — for any task connected to your own life or work.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why Prompts Matter</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>A prompt is the instruction you give AI. The quality of the prompt determines the quality of the response.</p>
            <p>AI cannot read your mind. It does not know your situation, your audience, your goal, your tone preference, or your constraints. When you give AI more context, it produces more relevant output.</p>
            <p className="text-white/80 font-bold">A vague prompt produces a vague response. A specific prompt produces a specific response.</p>
            <p>This is the only Skill Guide in AI Foundations — it applies everything you've learned in Guides 1–5 into a single practical act: writing a prompt that actually works.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">The Four Elements</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">Use these as a checklist until writing good prompts becomes intuitive.</p>

          <div className="space-y-4">
            {elements.map((e) => (
              <div key={e.number} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-mono text-[12px] font-bold text-[#FFD23F]/40">{e.number}</span>
                  <h3 className="font-sans text-[17px] font-bold text-[#FFD23F]">{e.label}</h3>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 italic mb-4">{e.question}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[8px] px-3 py-3">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#E8373A]/60 uppercase tracking-[1.5px] mb-1">Weak</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.5] italic">{e.weak}</p>
                  </div>
                  <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[8px] px-3 py-3">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#22C55E]/60 uppercase tracking-[1.5px] mb-1">Strong</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-[1.5] italic">{e.strong}</p>
                  </div>
                </div>

                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 leading-[1.6]">{e.why}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Putting It Together</h2>
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[1.5px] mb-3">Example — All 4 Elements Combined</p>
            <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
              <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.9]">
                Write a short introduction paragraph for my freelance services page. [Task]
                <br /><br />
                I offer social media management to small Filipino businesses — mostly restaurants and retail shops that aren't very active online yet. [Context]
                <br /><br />
                Write it as 3 short sentences. Professional but conversational — not stiff or formal. [Format]
                <br /><br />
                Do not use the words "passionate" or "dedicated." Avoid clichés. [Constraints]
              </p>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 mt-3">
              Compare this to: "Write something about my freelance business." — same request, completely different result.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 8 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Think of a real task you need done — something for your work, job search, freelance goals, or learning. It must be yours, not a practice scenario.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Write your prompt using all four elements: Task, Context, Format, and Constraints. Take your time — this is the most important part of the exercise.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Run it. Read the response. Then ask: was this more useful than what a one-sentence version of this prompt would have produced?
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 4 — Optional</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Remove one element and run the prompt again. Notice what changes. Which element made the biggest difference?
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
                "Chose a real task — not a practice scenario",
                "Wrote a prompt using all four elements",
                "Ran the prompt and read the response",
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
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              Think about a time you were frustrated with an AI output. <span className="text-white font-bold">Was the problem the AI — or was the problem the prompt?</span> What would you add to that prompt using the four-element framework?
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">You do not need to write it down. Just think.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "AI cannot read your mind. The quality of your prompt determines the quality of the response.",
              "The four elements are: Task (what to do), Context (your situation), Format (how to structure it), Constraints (what to avoid).",
              "These four elements are a checklist — not a formula. Use them until writing good prompts becomes instinct.",
              "The prompt you wrote in this exercise is real. It produced something you can actually use. That matters more than any example.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={14} className="text-[#E8373A]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] uppercase tracking-[1.5px]">One More Guide</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">
              You just wrote your first real prompt. Before you finish the Pillar, there's one thing to check — what you should never type into that prompt box.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[17px] font-bold text-white">What Not to Share with AI</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Foundations · Guide 7 of 7 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/foundations/what-not-to-share-with-ai"
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
