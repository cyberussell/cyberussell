import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gemini Search Integration — Meet Your AI Team | Cyberussell",
  description:
    "Use Gemini's Google Search integration to get real-time, sourced answers — not just AI guesses.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/gemini-search-integration" },
};

export default function GeminiSearchIntegrationPage() {
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
            <span className="text-white/60">Gemini Search Integration</span>
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
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Gemini Guide 5 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Gemini Search Integration
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            When you need today&rsquo;s answer — not an AI guess from months ago — this is the feature to use.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Use Gemini&rsquo;s Google Search integration to get real-time, sourced answers — not just AI guesses.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most AI tools are trained on data up to a certain date. After that, they do not know what happened in the world. If you ask them about current prices, recent news, or events from the last few months — they might give you outdated information and sound confident doing it.
            </p>
            <p>
              Gemini is different. When Search is enabled, it connects to Google and pulls live information from the internet. This means it can tell you today&rsquo;s exchange rate, yesterday&rsquo;s news, this month&rsquo;s government regulations, or current prices on Shopee.
            </p>
            <p>
              For Filipinos dealing with real-world, time-sensitive questions — this is one of the most practically useful AI features available.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">What Gemini with Search Does</p>
            <div className="space-y-4">
              {[
                {
                  point: "Shows you the sources",
                  detail: "When Gemini uses Search, it shows links to the pages it got the information from. You can click and verify.",
                },
                {
                  point: "Gives you current information",
                  detail: "Today&rsquo;s prices. Recent news. Current exchange rates. Recent policy changes. Information that is actually up to date.",
                },
                {
                  point: "Finds local information",
                  detail: "Philippine-specific regulations, local business news, regional information — the kind of thing non-Google AI tools often miss.",
                },
                {
                  point: "Combines AI + Search",
                  detail: "It does not just give you a Google search result. It reads the search results and synthesizes them into a clear, organized answer.",
                },
              ].map(({ point, detail }) => (
                <div key={point} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                  <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white mb-1">{point}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6]" dangerouslySetInnerHTML={{ __html: detail }} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#4F8EF7]/5 border border-[#4F8EF7]/15 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-3">How to Enable Search in Gemini</p>
            <div className="space-y-2">
              {[
                "Go to gemini.google.com",
                "Start a new conversation",
                "Look for the Google Search icon or a \"Search\" toggle in the toolbar",
                "Make sure it is enabled (highlighted or switched on)",
                "Ask your question — look for source links in the response to confirm Search was used",
              ].map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] w-5 shrink-0 mt-[2px]">{i + 1}.</span>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-[1.6]">{step}</p>
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
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
                Ana is a Filipino virtual assistant who gets paid in US dollars from her international client. She needs to know: (1) the current USD to PHP exchange rate, (2) the best way to receive international payments with the lowest fees in the Philippines, and (3) whether GCash, Maya, or Wise is the best option right now.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mt-3">
                This is exactly the kind of question where old AI training data is useless — rates and platform fees change constantly.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-4">With Gemini Search</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Ana opens Gemini with Search enabled and asks: &ldquo;What is the current USD to PHP exchange rate? And what is the best way for a Filipino freelancer to receive international payments right now — compare GCash, Maya, Wise, and PayPal in terms of fees and speed.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Gemini searches the web, finds current exchange rates and recent comparisons of all four platforms, and gives her a clear, sourced answer with today&rsquo;s actual data — including a link to each source so she can verify.
              </p>
              <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#4F8EF7]/80 leading-[1.6]">
                  She makes her payment setup decision based on current, verified information — not outdated AI training data.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 5 minutes · gemini.google.com (free)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Enable Search</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Open gemini.google.com → make sure the Google Search option is enabled in the toolbar (look for the globe/search icon).
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Ask something time-sensitive</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[14px] text-[#4F8EF7] leading-[1.8]">
                    What is the current [CHOOSE ONE: USD to PHP exchange rate / price of gasoline in the Philippines / latest news about [topic you follow] / current Shopee seller fees / recent changes to [a regulation or policy that affects you]]?
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Check the sources</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Look for the source links in Gemini&rsquo;s response. Click at least one. Confirm that the information matches what Gemini told you.
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
                "Confirmed Search is enabled in Gemini",
                "Asked a time-sensitive question and got a current, sourced answer",
                "Clicked at least one source link to verify the information",
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
              What questions do you regularly ask Google that an AI could now answer faster and more clearly — with the same sources? <span className="text-white font-bold">Gemini with Search is not a replacement for Google. It is Google + AI synthesis — faster answers from the same information.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Regular AI tools use training data that can be months or years old. Gemini with Search uses live Google results.",
              "Gemini shows you the sources it used — you can verify the information directly.",
              "Best for: exchange rates, current prices, recent news, local regulations, time-sensitive decisions.",
              "Always check the source links for anything important — Gemini can still make mistakes even with Search.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] mt-[7px] shrink-0" />
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Replace your next Google search with Gemini.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              The next time you are about to open Google and type a question, open Gemini with Search instead and ask it the same question. Compare the experience — which gave you a more useful, actionable answer? Which was faster to understand?
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#22C55E]/8 border border-[#22C55E]/20 rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px] mb-1">You finished all 16 guides!</p>
              <p className="font-sans text-[16px] font-bold text-white">Take the Final Assessment</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Earn your AI Team Bida Badge and personalized certificate
              </p>
            </div>
            <a
              href="/learn/ai-team/complete"
              className="inline-flex items-center gap-2 bg-[#22C55E] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
            >
              Get My Badge <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
