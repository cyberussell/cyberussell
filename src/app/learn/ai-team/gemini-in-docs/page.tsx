import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gemini in Docs — Meet Your AI Team | Cyberussell",
  description:
    "Use Gemini inside Google Docs to draft, rewrite, and improve a real document.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/gemini-in-docs" },
};

export default function GeminiInDocsPage() {
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
            <a href="/learn/ai-team" className="hover:text-white transition-colors">Meet Your AI Team</a>
            <span>/</span>
            <span className="text-white/60">Gemini in Docs</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#4F8EF7] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Gemini · Google Docs
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Gemini Guide 2 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Gemini in Docs
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Your writing assistant lives inside Google Docs now — draft, rewrite, and improve without switching tabs.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use Gemini inside Google Docs to draft, rewrite, and improve a real document.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Google Docs is where most people write — reports, letters, proposals, business plans, school requirements, client deliverables. It is the standard writing tool for work and school in the Philippines.
            </p>
            <p>
              Gemini is now built into it. You do not need to open a new tab, copy-paste your text into an AI, copy-paste back, and reformat everything. The AI is already there, inside the document you are working on.
            </p>
            <p>
              This means you can go from a blank page to a working draft in minutes — and improve it section by section without ever leaving the document.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">What Gemini Can Do in Docs</p>
            <div className="space-y-4">
              {[
                {
                  title: "Generate a first draft",
                  how: "Click the Gemini icon (stars/sparkle) at the top or side of the document → describe what you need → Gemini writes a full section or document.",
                },
                {
                  title: "Rewrite a selected section",
                  how: "Highlight a paragraph → click the Gemini icon that appears → ask it to make it more professional, shorter, clearer, or in a different tone.",
                },
                {
                  title: "Summarize the document",
                  how: "Ask Gemini to summarize what you have written so far — useful when reviewing or sharing a long document.",
                },
                {
                  title: "Ask questions about your document",
                  how: "\"Is this argument clear?\" / \"What is missing from this section?\" / \"Does this sound professional?\"",
                },
              ].map(({ title, how }) => (
                <div key={title} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                  <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white mb-1.5">{title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.6]">{how}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">The Situation</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
                Cris is a 3rd year business student who has to write a business plan for a school project. She knows what she wants to write about — a small online ukay-ukay shop — but staring at a blank Google Doc is overwhelming. She does not know how to start.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-4">With Gemini in Docs</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Cris opens Google Docs and clicks the Gemini icon. She types: &ldquo;Help me write a business plan for a school project. My business idea is an online ukay-ukay shop targeting college students in Manila. Include sections for: executive summary, market analysis, target customers, products, marketing strategy, and financial projections.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Gemini writes a complete first draft. Cris reads each section, edits the parts that need her personal input, highlights the market analysis section, and asks Gemini to make it more specific to Philippine conditions.
              </p>
              <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#4F8EF7]/80 leading-[1.6]">
                  A blank page → a complete business plan draft in 20 minutes. She spent the rest of the time personalizing and improving it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 15 minutes · Google Docs</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Open Google Docs</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Go to docs.google.com → create a new document → look for the Gemini icon (stars/sparkle) on the right side panel or at the top of the document.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Generate a first draft</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#4F8EF7] leading-[1.8]">
                    Help me write a [TYPE OF DOCUMENT: business plan / cover letter / report / proposal / letter] for [YOUR SPECIFIC PURPOSE — be detailed]. Include sections for [LIST THE MAIN SECTIONS YOU WANT].
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Improve one section</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Highlight any paragraph in the generated draft → click the Gemini icon that appears → ask it to &ldquo;make this paragraph shorter and clearer.&rdquo; Notice how only that section changes.
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
                "Found the Gemini button inside Google Docs",
                "Generated a first draft of a real document",
                "Highlighted a section and asked Gemini to improve it",
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
              What document have you been procrastinating on because the blank page felt overwhelming? <span className="text-white font-bold">With Gemini in Docs, the hardest part — starting — takes 30 seconds.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Gemini is built into Google Docs — click the stars/sparkle icon to start using it without switching tabs.",
              "You can generate a full document draft, rewrite specific sections, or ask questions about what you wrote.",
              "Highlight any text → click the Gemini icon → ask for changes. Only that section updates.",
              "Gemini gives you a starting point. You always need to review, edit, and personalize the output.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] mt-[7px] shrink-0" />
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Write a real document from scratch using Gemini.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Pick the most important document you need to write right now — a business proposal, a school paper, a cover letter, a client deliverable. Use Gemini in Docs to build the first draft, then spend time personalizing and improving it. Do not submit the first draft — make it truly yours.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Gemini in Sheets</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Gemini Guide 3 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/gemini-in-sheets"
              className="inline-flex items-center gap-2 bg-[#4F8EF7] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
