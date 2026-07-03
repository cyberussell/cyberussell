import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Claude Code — Meet Your AI Team | Cyberussell",
  description:
    "Use Claude to create or fix a simple piece of code — even if you have never coded before.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/claude-code" },
};

export default function ClaudeCodePage() {
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
            <span className="text-white/60">Claude Code</span>
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
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Claude Guide 3 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Claude Code
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            You do not need to be a programmer. Claude can write code for you — and explain exactly what it does in plain language.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use Claude to create or fix a simple piece of code — even if you have never coded before.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Up until recently, code was only accessible to people who spent years learning how to write it. That excluded most people from tools that could save them hours every week.
            </p>
            <p>
              Claude changes this. You describe what you need in plain language. Claude writes the code, explains what it does in simple terms, and fixes it if something goes wrong. You do not need to understand every line — you just need to know what you want it to do.
            </p>
            <p>
              The result: spreadsheet formulas you could never figure out, automations that run without you, simple websites that would have cost ₱20,000 to hire someone to build — all available to you now.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">What a Beginner Can Do With Claude Code</p>
            <div className="space-y-4">
              {[
                {
                  title: "Spreadsheet formulas",
                  desc: "Tell Claude what you want to calculate in plain language. It writes the Google Sheets or Excel formula for you.",
                  example: "\"Write a formula that adds up column B only if column A says Paid.\""
                },
                {
                  title: "Google Apps Scripts",
                  desc: "Simple automations that run inside Google Workspace — Gmail, Sheets, Calendar, Drive.",
                  example: "\"Write a Google Apps Script that sends me an email every Monday morning with a reminder to update my weekly tracker.\""
                },
                {
                  title: "Simple HTML websites",
                  desc: "A one-page website you can put online using GitHub Pages or Netlify — for free.",
                  example: "\"Create a one-page HTML website for my small business. Include: name, what I sell, contact info, and a simple design.\""
                },
                {
                  title: "Data cleaning",
                  desc: "Clean up messy spreadsheet data — fix formatting, remove duplicates, organize columns.",
                  example: "\"Here is my spreadsheet data. Help me clean it up and organize it properly.\""
                },
              ].map(({ title, desc, example }) => (
                <div key={title} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                  <p className="font-[family-name:var(--font-inter)] text-[16px] font-bold text-white mb-1">{title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.6] mb-2">{desc}</p>
                  <p className="font-mono text-[12px] text-[#F59E0B]/80 italic leading-[1.6]">{example}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#F59E0B]/80 leading-[1.7]">
              <span className="font-bold text-[#F59E0B]">Important:</span> Always tell Claude you are a beginner and ask it to explain what the code does in simple language. This way you understand what you are using — and you can describe what to fix if something goes wrong.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Before</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
                Grace is a Filipino virtual assistant managing 3 clients. Every month end, she manually adds up client hours from her tracker spreadsheet — checking each row, using a calculator, copying totals. It takes 30–45 minutes and she sometimes makes mistakes.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">After Using Claude Code</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Grace asks Claude: &ldquo;I do not know how to code. I have a Google Sheets tracker with client names in column A, hours worked in column B, and my hourly rate in column C. Help me create a formula that calculates total billing for each client. Explain what the formula does in simple words.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Claude writes the formula, explains it in plain language (&ldquo;This multiplies column B by column C to get your total billing&rdquo;), and tells her exactly which cell to paste it in. She does it in 5 minutes. The calculation is now automatic.
              </p>
              <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#F59E0B]/80 leading-[1.6]">
                  30–45 minutes of manual calculation every month — eliminated in 5 minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · Claude (claude.ai) + Google Sheets</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Pick your spreadsheet problem</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Think of one calculation or task in Google Sheets or Excel that you do manually right now. It could be simple — totaling a column, filtering rows, or calculating a percentage.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Ask Claude using this template</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#F59E0B] leading-[1.8]">
                    I do not know how to code. Help me create a Google Sheets formula that: [DESCRIBE YOUR SPECIFIC PROBLEM — e.g., adds up column B only if column A says &ldquo;Paid&rdquo; / calculates my profit by subtracting column C from column B / counts how many rows have &ldquo;Done&rdquo; in column D].<br /><br />
                    Explain what the formula does in simple words so I understand it.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Paste it in Sheets</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Copy the formula Claude gives you. Open Google Sheets, click on the cell where you want the result, and paste it. If it does not work, go back to Claude and describe the error — it will fix it.
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
                "Asked Claude to write code for a real task I do regularly",
                "Understood what the code does (in plain language)",
                "Successfully used the code in Google Sheets or another tool",
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
              What other manual, repetitive tasks do you do in spreadsheets or online tools that could be automated? <span className="text-white font-bold">Most people have at least 3–5 of these hiding in their daily work.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "You do not need to be a programmer to use Claude Code — you just need to describe what you want in plain language.",
              "Claude writes the code, explains it in simple terms, and fixes it if something goes wrong.",
              "The most useful starting points for beginners: spreadsheet formulas, simple automations, basic websites.",
              "Always ask Claude to explain the code in plain language so you understand what you are using.",
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Build a simple one-page website.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Ask Claude: &ldquo;I do not know how to code. Help me create a simple one-page HTML website for my [business/portfolio/project]. Include: my name, what I do, a few highlights, and a way to contact me. Make it look clean and professional.&rdquo; Then ask Claude how to put it online for free.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Claude Long Context</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Claude Guide 4 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/claude-long-context"
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
