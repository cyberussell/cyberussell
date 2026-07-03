import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Where AI Fails — AI Foundations | Cyberussell",
  description:
    "AI fails predictably, not randomly. Learn the three failure categories so you know where not to rely on it before you even run the prompt.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations/where-ai-fails" },
  openGraph: {
    title: "Where AI Fails | Cyberussell",
    description: "AI fails predictably, not randomly. Know the three failure categories before you prompt.",
    url: "https://www.cyberussell.com/learn/foundations/where-ai-fails",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const failures = [
  {
    number: "01",
    title: "Current Facts",
    color: "#E8373A",
    why: "AI was trained on data up to a certain date. It does not know what happened after that. If you ask about recent news, current prices, today's exchange rates, or anything that changes — AI will either say it doesn't know, or worse, give you a confident but outdated answer.",
    signal: "Any question containing words like \"now,\" \"currently,\" \"today,\" \"this week,\" or a recent year.",
    example: "\"What is the current peso to dollar exchange rate?\"",
    risk: "High — outdated information presented as current.",
  },
  {
    number: "02",
    title: "Personal or Private Information",
    color: "#F59E0B",
    why: "AI has no knowledge of your specific situation unless you tell it. It does not know your employer, your income, your health history, your clients, or your local context. When you ask something that requires personal knowledge it doesn't have, it fills the gap with generic answers that may not apply to you at all.",
    signal: "Any question that starts with \"Should I...\" or \"What should I do about my...\" without providing full context.",
    example: "\"Should I take this job offer?\" (without sharing any details about the offer, your situation, or your goals)",
    risk: "Medium — generic advice mistaken for personalized guidance.",
  },
  {
    number: "03",
    title: "Precise Technical Accuracy",
    color: "#A855F7",
    why: "In specialized domains — medicine, law, finance, engineering — AI can produce responses that sound authoritative but contain subtle errors that only an expert would catch. The response will be structured correctly and use the right vocabulary. The specific claims may be wrong in ways that matter.",
    signal: "Any question where being wrong has real consequences for your health, money, legal standing, or safety.",
    example: "\"What medication dosage is safe for my child?\" or \"Is this contract clause enforceable?\"",
    risk: "High — confident output with consequential errors.",
  },
];

export default function WhereAIFailsPage() {
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
            <span className="text-white/60">Where AI Fails</span>
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
            AI Foundations · Guide 3 of 7
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Where AI Fails
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            AI fails predictably. Once you know the pattern, you'll see it coming before you even run the prompt.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Identify three situations where AI is likely to produce a poor result — before you run the prompt.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              AI's failures are not random. They are the direct consequence of how AI works.
            </p>
            <p>
              In Guide 1, you learned that AI predicts what language fits — it does not reason or verify. In Guide 2, you saw where that makes AI genuinely strong. In this Guide, you'll see the other side: where that same mechanism produces confident, convincing, and wrong answers.
            </p>
            <p>
              Knowing where AI fails is not about fear. It is about judgment. <span className="text-white/80">Every tool has its limits. Knowing the limits makes you a better user.</span>
            </p>
          </div>
        </section>

        {/* Core Concept */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why the Same Mechanism That Helps Can Hurt</h2>
          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.9]">
              AI was trained to produce plausible-sounding output. That is its strength when it comes to drafting, summarizing, and explaining.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.9] mt-3">
              But "plausible-sounding" is not the same as "accurate." When the task requires real-time data, personal context, or deep domain expertise — AI still produces plausible-sounding output. <span className="text-white font-bold">It just isn't accurate.</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.9] mt-3">
              And because it sounds right, you might not notice.
            </p>
          </div>
        </section>

        {/* The 3 Failure Categories */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Three Failure Categories</h2>
          <div className="space-y-4">
            {failures.map((f) => (
              <div key={f.number} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[14px] font-bold shrink-0" style={{ color: `${f.color}60` }}>{f.number}</span>
                  <h3 className="font-sans text-[17px] font-bold text-white">{f.title}</h3>
                  <span className="ml-auto text-[10px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1px] px-2 py-0.5 rounded-full border" style={{ color: f.color, borderColor: `${f.color}30`, backgroundColor: `${f.color}10` }}>
                    Risk: {f.risk.split(" — ")[0]}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7] mb-4">{f.why}</p>

                <div className="space-y-3">
                  <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[8px] px-4 py-3">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-1">Warning signal</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">{f.signal}</p>
                  </div>
                  <div className="bg-[#0F0F1A] border border-white/[0.06] rounded-[8px] px-4 py-3">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-1">Example prompt to avoid</p>
                    <p className="font-mono text-[14px] text-[#FFD23F]/70 leading-[1.6]">{f.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Exercise */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 5 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Run all three prompts below in your AI tool — one for each failure category.
                </p>
              </div>

              {[
                { label: "Prompt A — Current Facts", prompt: "What is the current minimum wage in the Philippines?" },
                { label: "Prompt B — Personal Information", prompt: "Should I accept a job offer that pays ₱25,000 a month?" },
                { label: "Prompt C — Technical Accuracy", prompt: "What is the exact legal requirement for a freelancer to register as a business in the Philippines?" },
              ].map((p) => (
                <div key={p.label} className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">{p.label}</p>
                  <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">{p.prompt}</p>
                </div>
              ))}

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Read each response. For each one, decide: <span className="text-white/80 italic">Would I act on this without verifying it first?</span>
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Notice how confident each response sounds — regardless of whether it should be trusted. That gap between confidence and trustworthiness is what this Guide is about.
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
                "Ran all three prompts",
                "Read each response",
                "Decided which I would verify before acting on",
              ].map((item) => (
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
              Think about the last time you used AI — or a time you've seen someone else use it. <span className="text-white font-bold">Did the task fall into one of these three failure categories?</span> What would a responsible professional do before submitting AI output to a client, employer, or colleague?
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
            {[
              "AI fails predictably — the same mechanism that makes it strong at drafting makes it weak at real-time facts, personal context, and precise technical accuracy.",
              "The three failure categories are: current facts, personal or private information, and precise technical accuracy.",
              "AI's confident delivery does not tell you whether it is right. Confidence and accuracy are not the same thing.",
              "Knowing the limits is not about fear — it is about using AI correctly. Match the right task to AI's actual strengths.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Why AI Makes Things Up</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Foundations · Guide 4 of 7 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/foundations"
              className="inline-flex items-center gap-2 bg-[#FFD23F] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
