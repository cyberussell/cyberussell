import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gemini Deep Research — Meet Your AI Team | Cyberussell",
  description:
    "Use Gemini Deep Research to get a comprehensive, sourced research report on any topic in minutes.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/gemini-deep-research" },
};

export default function GeminiDeepResearchPage() {
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
            <span className="text-white/60">Gemini Deep Research</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#4F8EF7] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Gemini
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Gemini Guide 4 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Gemini Deep Research
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Google&rsquo;s research tool that actually searches the internet and shows you its sources.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use Gemini Deep Research to get a comprehensive, sourced research report on any topic in minutes.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Gemini Deep Research is Google&rsquo;s answer to the problem of spending hours doing research. It searches the web like you would — but faster, more thorough, and with sources you can actually check.
            </p>
            <p>
              Because it uses Google Search as its foundation, it is especially good at finding current, real-world information — news, local business data, prices, Philippine-specific statistics — that other AI tools might not have access to.
            </p>
            <p>
              For entrepreneurs, students, workers, and anyone making a big decision, this is one of the most powerful research tools available — and it is free.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-3">How Gemini Deep Research Works</p>
            <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-3">
              <p>
                Go to gemini.google.com → click the dropdown or look for the &ldquo;Deep Research&rdquo; option. Type your research question. Gemini shows you a research plan — a list of what it will search. You can edit the plan, then click &ldquo;Start Research.&rdquo;
              </p>
              <p>
                Gemini searches the web for 5–10 minutes, reads dozens of pages, and delivers a full written report with citation links at the end.
              </p>
            </div>
          </div>

          <div className="bg-[#4F8EF7]/5 border border-[#4F8EF7]/15 rounded-[14px] p-6 mb-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-3">
              Best Uses
            </p>
            <div className="space-y-2">
              {[
                "Comparing platforms before selling online (Shopee vs Lazada vs TikTok Shop)",
                "Understanding a new industry or topic before investing time or money",
                "Market research for a business idea — who are the competitors? What are the prices?",
                "Preparing for a job interview — understanding the company and industry",
                "Researching a major purchase decision — best options, risks, costs",
                "Understanding legal or government processes in the Philippines",
              ].map((use) => (
                <div key={use} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] mt-[6px] shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">{use}</p>
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
                Jay is a Filipino entrepreneur who wants to start selling native Filipino snacks — pili nuts, pastillas, and dried mangoes — online. He does not know whether Shopee or Lazada is better for his product, what the fees are, how other sellers price similar products, or what categories sell best on each platform. He has been Googling for a week with no clear answers.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-4">With Gemini Deep Research</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Jay goes to gemini.google.com, selects Deep Research, and types: &ldquo;I want to sell Filipino native snacks (pili nuts, pastillas, dried mangoes) online in the Philippines. Research and compare Shopee vs Lazada — fees, commission rates, customer traffic, best product categories, seller requirements, and what Filipino food sellers are earning on each platform.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                8 minutes later, Jay has a 1,500-word report comparing both platforms with real data, current fee structures, and specific recommendations for food sellers in his situation.
              </p>
              <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#4F8EF7]/80 leading-[1.6]">
                  One week of confused Googling replaced by one 8-minute research session. He launched on Shopee first based on the report.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 15 minutes · gemini.google.com (free)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Go to Gemini</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Open gemini.google.com in your browser → sign in with your Google account → look for the &ldquo;Deep Research&rdquo; option in the toolbar or dropdown at the top.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Use this prompt template</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#4F8EF7] leading-[1.8]">
                    I am a Filipino [YOUR ROLE: student / entrepreneur / freelancer / job seeker]. Research [YOUR QUESTION OR TOPIC]. Include: key facts, pros and cons, what experts recommend, Philippine-specific information if available, and what I should do first.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Review and verify</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  When the report is done, read it. Click 2–3 of the source links to verify the key facts. Note anything surprising or that you need to investigate further.
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
                "Accessed Gemini Deep Research at gemini.google.com",
                "Got a full research report on a topic I actually care about",
                "Read the report and clicked at least 2 source links to verify",
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
              Because Gemini uses Google Search, it finds local, current information that other AI tools miss. <span className="text-white font-bold">What Philippine-specific questions have you been unable to find good answers to? Those are perfect for Gemini Deep Research.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Gemini Deep Research searches the internet, reads dozens of sources, and writes a full report with citations.",
              "Because it uses Google Search, it finds current, real-world information — including Philippine-specific data.",
              "It shows you a research plan before it starts — you can edit what it will look for.",
              "Always click at least 2–3 source links to verify the most important facts before acting on the report.",
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Research your biggest current question.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              What is the one question you most need answered right now — about your career, your business, a financial decision, a major life change? Use Gemini Deep Research to get the most complete answer you have ever had to that question. Then make a decision based on real information.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Gemini Search Integration</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Gemini Guide 5 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/gemini-search-integration"
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
