import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ChatGPT Deep Research — Meet Your AI Team | Cyberussell",
  description:
    "Use ChatGPT Deep Research to get a comprehensive report on any topic — in minutes instead of hours.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/chatgpt-deep-research" },
};

export default function ChatGPTDeepResearchPage() {
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
            <span className="text-white/60">ChatGPT Deep Research</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#10B981] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              ChatGPT Plus / Pro
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · ChatGPT Guide 5 of 6
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            ChatGPT Deep Research
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Stop opening 20 browser tabs. Get a full research report delivered to you in minutes.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#10B981]/8 border border-[#10B981]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Use ChatGPT Deep Research to get a comprehensive report on any topic — in minutes instead of hours.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Normally, researching a topic properly means opening 20 browser tabs, reading for hours, taking notes, comparing sources, and still feeling like you might have missed something important.
            </p>
            <p>
              Most people skip this step — which means they make decisions without enough information.
            </p>
            <p>
              ChatGPT Deep Research does all of that for you. It actually browses the internet, reads multiple sources, and compiles a detailed, organized report — with citations so you can verify the key points yourself.
            </p>
            <p>
              What would take you a full day of research takes Deep Research 5–15 minutes.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-3">What Deep Research Does</p>
            <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-3">
              <p>
                Deep Research is a special mode in ChatGPT (available for Plus and Pro subscribers). Instead of answering from its training data, it actively searches the web, reads dozens of sources, and writes a structured report.
              </p>
              <p>
                The process takes 5–15 minutes. ChatGPT shows you what it is searching while it works. When it finishes, you get a full written report with source links.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {[
              { title: "Best for", items: ["Market research before starting a business", "Comparing products, platforms, or services", "Understanding a new topic or industry", "Preparing for a meeting, interview, or decision", "Checking facts or verifying claims"] },
              { title: "How to access", items: ["Click the model selector at the top of a new chat", "Look for \"Deep Research\" in the dropdown", "Or click the '+' icon before typing your message", "Available on ChatGPT Plus and Pro plans", "Takes 5–15 minutes to complete"] },
            ].map(({ title, items }) => (
              <div key={title} className="bg-[#18181F] border border-white/[0.06] rounded-[12px] p-5">
                <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-3">{title}</p>
                <div className="space-y-1.5">
                  {items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#10B981] mt-[7px] shrink-0" />
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">The Situation</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
                Marco is thinking about starting an online business selling Filipino food products — bagoong, achara, and dried mangoes — to OFW families in the US. He does not know if there is a market for it, how to price things, or which platforms to use. He spends a week Googling and still feels confused.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-4">With Deep Research</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Marco uses ChatGPT Deep Research and asks: &ldquo;Research the market for selling Filipino food products to Filipino communities in the United States. I want to understand: market size, competition, best platforms to sell on, typical pricing, shipping considerations, and what successful Filipino food brands are doing.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                10 minutes later, he has a 2,000-word report with sections on each topic — and links to the sources so he can verify the key claims.
              </p>
              <div className="bg-[#10B981]/8 border border-[#10B981]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#10B981]/80 leading-[1.6]">
                  One week of confused Googling → replaced by one 10-minute research session.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 15 minutes · ChatGPT Plus or Pro</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Access Deep Research</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Open ChatGPT → start a new chat → click the model dropdown at the top (where it says GPT-4 or similar) → select &ldquo;Deep Research.&rdquo; Or look for the tools icon / &ldquo;+&rdquo; button before typing.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Use this prompt template</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[14px] text-[#10B981] leading-[1.8]">
                    I want to [YOUR GOAL OR BUSINESS IDEA — e.g., start selling handmade soap online / become a freelance VA / understand the market for X]. Research the market, competition, opportunities, and risks for someone based in the Philippines starting with a small budget. Include practical next steps I can take right now.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Wait and read</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Deep Research takes 5–15 minutes. You will see it searching in real time. When it finishes, read the full report. Check 2–3 of the source links to verify the most important claims.
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
                "Accessed Deep Research mode in ChatGPT",
                "Ran a Deep Research query on something I actually care about",
                "Read the full report and checked at least one source",
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
              What decision have you been putting off because you did not have enough information? <span className="text-white font-bold">Deep Research is not just for business — it works for any question where you need more than a quick answer.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Deep Research is a special ChatGPT mode that searches the internet and compiles a real, sourced report — not just an AI guess.",
              "It takes 5–15 minutes but replaces hours or days of manual research.",
              "It is available on ChatGPT Plus and Pro — look for it in the model selector.",
              "Always check 2–3 sources from the report to verify the most important facts before making big decisions.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Research your next big move.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Is there a career change, business idea, investment, or big life decision you have been thinking about? Use Deep Research to get a full picture of what it involves — risks, opportunities, costs, timeline — before making a move. Come back and tell us what you found.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">ChatGPT Canvas</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Meet Your AI Team · ChatGPT Guide 6 of 6 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/chatgpt-canvas"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
