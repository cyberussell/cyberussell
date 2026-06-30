import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Shield, Target } from "lucide-react";

export const metadata: Metadata = {
  title: "What Not to Share with AI — AI Foundations | Cyberussell",
  description:
    "One practical rule for protecting your personal and professional information every time you use an AI tool.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations/what-not-to-share-with-ai" },
  openGraph: {
    title: "What Not to Share with AI | Cyberussell",
    description: "One practical rule for protecting your personal and professional information when using AI.",
    url: "https://www.cyberussell.com/learn/foundations/what-not-to-share-with-ai",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const protectCategories = [
  {
    title: "Personal Identification",
    examples: ["Full name combined with address, phone number, or ID numbers", "Passport or government ID details", "Date of birth combined with other identifiers"],
  },
  {
    title: "Financial Information",
    examples: ["Bank account or credit card numbers", "Exact salary or income figures you haven't shared publicly", "Client payment details or invoice amounts"],
  },
  {
    title: "Client or Employer Information",
    examples: ["Client names in combination with sensitive project details", "Internal company documents or confidential strategies", "Colleague names combined with private performance or HR information"],
  },
  {
    title: "Health Information",
    examples: ["Medical history, diagnoses, or medications", "Mental health details", "Health information about people you know"],
  },
];

export default function WhatNotToShareWithAIPage() {
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
            <span className="text-white/60">What Not to Share with AI</span>
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
            AI Foundations · Guide 7 of 7
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            What Not to Share with AI
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            You just wrote your first real prompt. Before you finish this Pillar, there's one thing every AI user needs to understand — and almost nobody teaches it clearly.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Apply one practical rule for protecting your personal and professional information every time you use an AI tool.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">What Happens When You Type Into AI</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              When you type something into an AI tool, that input may be used to improve the model. It may be stored. In some cases, it may be reviewed by humans at the company.
            </p>
            <p>
              This is not a secret. Most AI tools disclose it in their terms of service — which almost nobody reads.
            </p>
            <p>
              It is not a reason to be afraid of AI. It is a reason to use the same judgment you would with any digital tool. <span className="text-white/80">You would not send sensitive information in a public Facebook post. Apply the same instinct here.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/5 border border-[#4F8EF7]/20 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield size={16} className="text-[#4F8EF7]" />
              <span className="font-sans text-[17px] font-bold text-white">The One Rule</span>
            </div>
            <p className="font-sans text-[20px] font-bold text-white leading-[1.4] mb-4">
              Before sharing any information with an AI tool, ask:<br />
              <span className="text-[#FFD23F]">"Would I be comfortable if this were public?"</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[10px] px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px] mb-1">If yes</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">Proceed. Type it in.</p>
              </div>
              <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[10px] px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A] uppercase tracking-[1.5px] mb-1">If no</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">Remove or generalize it before typing.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Four Categories to Protect</h2>
          <div className="space-y-3">
            {protectCategories.map((cat, i) => (
              <div key={cat.title} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-[12px] font-bold text-white/20">0{i + 1}</span>
                  <h3 className="font-sans text-[15px] font-bold text-white">{cat.title}</h3>
                </div>
                <div className="space-y-1.5">
                  {cat.examples.map((ex) => (
                    <div key={ex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-[7px] shrink-0" />
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{ex}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">How to Work Around It</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4 mb-6">
            <p>
              You do not need to avoid AI for sensitive tasks. You need to use placeholder language instead of real details.
            </p>
          </div>
          <div className="space-y-3">
            {[
              { real: "My client Jollibee needs a proposal for a ₱500,000 campaign.", safe: "My client (a large fast food brand) needs a proposal for a mid-range marketing campaign." },
              { real: "I earn ₱35,000 a month. Should I invest?", safe: "Someone earning around ₱30–40k a month is considering investing. What are the options?" },
              { real: "Help me write a message to my boss Maria about my raise.", safe: "Help me write a message to my manager requesting a salary review." },
            ].map((ex, i) => (
              <div key={i} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-4 space-y-3">
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#E8373A]/60 uppercase tracking-[1.5px] mb-1">Avoid</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 italic leading-[1.5]">{ex.real}</p>
                </div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#22C55E]/60 uppercase tracking-[1.5px] mb-1">Use instead</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 italic leading-[1.5]">{ex.safe}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 5 minutes · No AI tool needed</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Look back at the prompt you wrote in Guide 6. Read it again.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Apply the one rule: <span className="text-white/80 italic">"Would I be comfortable if this were public?"</span>
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  If there is anything in the prompt you would not want public — rewrite that part using placeholder language. See if the rewritten version still gets AI a useful result.
                </p>
              </div>

              <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[10px] px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#FFD23F]/70 leading-[1.6]">
                  This exercise closes the loop on the entire Pillar. You review your own first prompt through the lens of responsible use.
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
                "Re-read my prompt from Guide 6",
                "Applied the one rule to it",
                "Identified anything I would change — or confirmed it was already safe",
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
              Think about the kind of work you want to do with AI — freelancing, job hunting, content creation, business. <span className="text-white font-bold">What types of information will you regularly need to share with AI to get useful help — and how will you protect the sensitive parts?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 mt-3">You do not need to write it down. Just think.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "AI conversations are not private — inputs may be stored or used for model training.",
              "The one rule: before sharing information with AI, ask \"Would I be comfortable if this were public?\"",
              "You do not need to avoid sensitive topics — use placeholder language instead of real identifying details.",
              "This rule applies permanently, to every AI tool, for every task. It is a habit, not a checklist.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pillar Complete */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#FFD23F]/10 via-[#FFD23F]/5 to-transparent border border-[#FFD23F]/20 rounded-[14px] p-8 text-center">
            <div className="flex justify-center mb-4">
              <Target size={32} className="text-[#FFD23F]" />
            </div>
            <p className="font-sans text-[22px] font-bold text-white mb-2">AI Foundations — Complete</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.7] max-w-md mx-auto mb-6">
              You've finished all 7 guides. You understand what AI is, where it helps, where it fails, why it makes things up, how to choose a tool, how to write a real prompt, and how to protect your information.
            </p>
            <a
              href="/learn/foundations/complete"
              className="inline-flex items-center gap-2 bg-[#FFD23F] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-6 py-3 rounded-xl"
            >
              Take Final Assessment 🏅 <ArrowRight size={14} />
            </a>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">Next Pillar</p>
              <p className="font-sans text-[16px] font-bold text-white">Think with AI</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Learn to collaborate — not just prompt. Pillar 2 of 6.
              </p>
            </div>
            <a
              href="/learn/think"
              className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] transition-colors border border-white/[0.1] text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
            >
              Explore Pillar 2 <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
