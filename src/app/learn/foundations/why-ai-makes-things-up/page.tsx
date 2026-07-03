import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Why AI Makes Things Up — AI Foundations | Cyberussell",
  description:
    "Hallucination explained — what it is, why it happens, and the one rule for catching it before it causes real problems.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations/why-ai-makes-things-up" },
  openGraph: {
    title: "Why AI Makes Things Up | Cyberussell",
    description: "Hallucination explained — and the one rule for catching it before it causes problems.",
    url: "https://www.cyberussell.com/learn/foundations/why-ai-makes-things-up",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const patterns = [
  {
    title: "Fake Citations",
    desc: "AI invents books, studies, authors, and URLs that sound real. The titles are plausible. The authors seem credible. The links go nowhere — or worse, somewhere unrelated.",
    example: "\"According to a 2022 study published in the Journal of Digital Marketing by Dr. Maria Santos...\" — the study, the author, and sometimes even the journal may not exist.",
  },
  {
    title: "Confident Wrong Numbers",
    desc: "Statistics, dates, prices, and figures that are plausible but incorrect. AI fills in numbers the way it fills in words — by predicting what fits. A number that looks reasonable is not the same as a number that is accurate.",
    example: "\"The Philippines has 87 million active social media users as of 2024\" — sounds specific and credible, but may be fabricated or outdated.",
  },
  {
    title: "Invented Details",
    desc: "When AI is asked to describe a person, event, product, or place it does not have reliable information about, it fills in the gaps with details that sound plausible. The overall shape is often correct. The specific details may be completely made up.",
    example: "\"[Person's name] founded the company in 2015 after leaving [university] where they studied...\" — the specific details may be invented even if the person is real.",
  },
];

export default function WhyAIMakesThingsUpPage() {
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
            <span className="text-white/60">Why AI Makes Things Up</span>
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
            AI Foundations · Guide 4 of 7
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Why AI Makes Things Up
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            AI sometimes states things confidently that are completely false. This is not a glitch. It is a predictable result of how AI works — and once you understand it, you'll never be blindsided by it again.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Identify when an AI response may be hallucinated — and know what to do next.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">What Is Hallucination?</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Hallucination is when AI produces output that sounds accurate but is factually wrong.
            </p>
            <p>
              It is not a bug. It is not a malfunction. It is a natural result of how AI works.
            </p>
            <p>
              Remember from Guide 1: AI was trained to predict what language fits — not to verify what is true. When AI encounters a question it does not have reliable data for, it does not say "I don't know." It produces the most plausible-sounding response it can.
            </p>
            <p>
              <span className="text-white/80 font-bold">It fills the gap with what sounds right.</span> It does not know it is wrong. It has no mechanism for knowing it is wrong.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#E8373A]/5 border border-[#E8373A]/20 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-[#E8373A]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] uppercase tracking-[1.5px]">The Most Important Point</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/75 leading-[1.8]">
              A hallucinated response does not sound like a guess. It sounds like a fact. It is delivered with the same confident tone as everything else AI says. <span className="text-white font-bold">There is no warning. No disclaimer. No signal that something is wrong.</span> That is what makes hallucination dangerous for people who do not know to look for it.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Three Hallucination Patterns</h2>
          <div className="space-y-4">
            {patterns.map((p, i) => (
              <div key={p.title} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[14px] font-bold text-[#E8373A]/50">0{i + 1}</span>
                  <h3 className="font-sans text-[17px] font-bold text-white">{p.title}</h3>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7] mb-4">{p.desc}</p>
                <div className="bg-[#0F0F1A] border border-[#E8373A]/15 rounded-[8px] px-4 py-3">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#E8373A]/50 uppercase tracking-[1.5px] mb-1">Example of what hallucination looks like</p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.6] italic">{p.example}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">The One Detection Rule</h2>
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/20 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#22C55E] uppercase tracking-[1.5px] mb-3">Apply This Every Time</p>
            <p className="font-sans text-[20px] font-bold text-white leading-[1.4] mb-4">
              If an AI output contains a specific claim you would quote, cite, or act on — verify it from a non-AI source before using it.
            </p>
            <div className="space-y-2 mt-4">
              {[
                "A statistic you plan to include in a report",
                "A citation or reference you plan to share",
                "A fact you plan to tell a client, employer, or colleague",
                "A number that affects a decision",
                "A name, date, or specific detail in a professional context",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] mt-[7px] shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">{item}</p>
                </div>
              ))}
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/35 mt-4">
              Non-AI sources: official government sites, news organizations, published research, the organization's own website, a qualified professional.
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
                  Run this prompt in your AI tool. It is designed to trigger hallucination.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt — ChatGPT / Claude / Gemini
                </p>
                <p className="font-mono text-[15px] text-[#FFD23F] leading-[1.8]">
                  Give me three recent statistics about social media usage in the Philippines. Include the source and year for each one.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Pick one specific statistic from the response. Search for the original source AI mentioned. Try to find the actual report or article.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Compare what you find to what AI said. Did the source exist? Did the number match? Did the year match?
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
                "Ran the prompt and read the response",
                "Tried to verify at least one specific claim",
                "Compared what AI said to what I actually found",
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
              Before this Guide, how would you have responded if AI gave you a confident statistic with a source? <span className="text-white font-bold">What would you do differently now — and what specific types of claims will you always verify going forward?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">
              You do not need to write it down. Just think.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Hallucination is not a bug — it is a predictable result of how AI produces output.",
              "AI does not know when it is wrong. It cannot warn you. The confident tone tells you nothing about accuracy.",
              "The three patterns are: fake citations, confident wrong numbers, and invented details.",
              "The one rule: if you would quote, cite, or act on a specific claim — verify it from a non-AI source first.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[17px] font-bold text-white">How to Choose the Right AI</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Foundations · Guide 5 of 7 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/foundations/how-to-choose-the-right-ai"
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
