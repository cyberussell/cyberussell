import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Claude Long Context — Meet Your AI Team | Cyberussell",
  description:
    "Upload a long document to Claude and extract exactly the information you need from it.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/claude-long-context" },
};

export default function ClaudeLongContextPage() {
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
            <span className="text-white/60">Claude Long Context</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Claude
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Claude Guide 4 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Claude Long Context
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Claude can read an entire book. Hand it a long document and ask it exactly what you need to know.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Upload a long document to Claude and extract exactly the information you need from it.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Some of the most important documents in our lives are also the hardest to read. Employment contracts full of legal language. Government forms. Long business reports. Academic papers. Insurance policies.
            </p>
            <p>
              Most people do one of two things with these documents: they skip reading them (and agree to things they do not understand), or they spend hours struggling through dense text — exhausted and still unsure about the important parts.
            </p>
            <p>
              Claude&rsquo;s context window — the amount of text it can read and hold in memory at once — is one of the largest of any AI. It can handle hundreds of pages at once. You upload the document, ask your question, and Claude gives you exactly the answer you need.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-3">What &ldquo;Long Context&rdquo; Means</p>
            <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-3">
              <p>
                Every AI has a limit to how much text it can process in one conversation. This limit is called its &ldquo;context window.&rdquo; A small context window means the AI can only read a few pages at a time. Claude&rsquo;s context window can handle hundreds of pages — entire books, long contracts, full reports.
              </p>
              <p>
                In practice, this means you can upload a PDF or paste a long document into Claude and it can answer questions about the entire document — not just the first few pages.
              </p>
            </div>
          </div>

          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
              Practical Uses for Beginners
            </p>
            <div className="space-y-2">
              {[
                "Upload a job contract → ask \"Are there any red flags I should know about before signing?\"",
                "Upload a business report → ask for a 5-bullet summary of the most important findings",
                "Upload a long email thread → ask \"What is this person actually asking me to do?\"",
                "Upload a terms of service → ask \"What are the important things I am agreeing to?\"",
                "Upload an academic paper → ask \"Explain this to me like I am a high school student\"",
                "Upload a product manual → ask \"How do I do [specific thing]?\"",
              ].map((use) => (
                <div key={use} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[6px] shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{use}</p>
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
                Nena is a Filipino worker who received a 25-page employment contract for a new job opportunity. It is written in formal English with legal terms she does not fully understand. She is excited about the job but nervous about what she might be agreeing to. She cannot afford a lawyer.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">With Claude Long Context</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Nena uploads the contract PDF to Claude and asks:
              </p>
              <p className="font-mono text-[14px] text-white/70 leading-[1.8] italic mb-3">
                &ldquo;Explain this contract to me like I am 18 years old. Tell me what I am agreeing to in plain language. Flag anything I should ask my employer about before signing. Also, are there any clauses that might limit what I can do after I leave this job?&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Claude reads all 25 pages and gives her a plain-language summary — what the job is, what she is agreeing to, what benefits are included, and 3 specific clauses she should ask her employer to clarify (a non-compete clause, an IP ownership clause, and an unclear overtime policy).
              </p>
              <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#F59E0B]/80 leading-[1.6]">
                  She signed with full understanding — and negotiated one clause before signing. Something she could not have done without Claude.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · Claude (claude.ai) + any long document</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Find a long document</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Find any long document you have — an employment contract, a lease agreement, a business report, a terms of service, a long article, or even a PDF book chapter. Anything you find hard to read or have been putting off reading.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Upload and ask</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Open claude.ai → click the paperclip icon to attach the file → ask:
                </p>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#F59E0B] leading-[1.8]">
                    Summarize this in 5 bullet points. Then tell me the 3 most important things I need to know from this document. Use simple, plain language — no jargon.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Go deeper</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  After reading Claude&rsquo;s summary, ask a follow-up question about something specific. &ldquo;Tell me more about [specific section/clause/point].&rdquo; Or: &ldquo;Are there any parts I should be concerned about?&rdquo;
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
                "Uploaded a long document to Claude",
                "Got a plain-language summary of the key points",
                "Asked at least one follow-up question to go deeper",
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
              Is there an important document you have been avoiding because it is too long or too confusing to read? <span className="text-white font-bold">Claude can read it for you in seconds — and tell you exactly what you need to know.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Claude can read and understand very long documents — entire books, contracts, and reports — in one conversation.",
              "Upload a PDF or paste text and ask Claude to summarize, explain, or answer questions about the content.",
              "This is especially useful for legal documents, contracts, and technical reports that are hard to read.",
              "Always verify important information (like legal or medical details) from the original source or a professional — Claude is a starting point, not a final authority.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Read a document you have been avoiding.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Everyone has at least one important document they have been putting off reading — a contract, a policy, a long report, a government form. Find yours, upload it to Claude, and finally understand what it says. Then decide what to do with that information.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Claude Coding Workflows</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Claude Guide 5 of 5 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/ai-team/claude-coding-workflows"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
