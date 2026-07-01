import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Your First Deep Conversation with AI — Think with AI | Cyberussell",
  description:
    "Build a multi-turn conversation that explores a real problem you are facing right now — and produce an insight you did not have before.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/your-first-deep-conversation-with-ai" },
  openGraph: {
    title: "Your First Deep Conversation with AI | Cyberussell",
    description: "Build a multi-turn conversation that explores a real problem and produces an insight you did not have before.",
    url: "https://www.cyberussell.com/learn/think/your-first-deep-conversation-with-ai",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideThreePage() {
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
            <a href="/learn/think" className="hover:text-white transition-colors">Think with AI</a>
            <span>/</span>
            <span className="text-white/60">Your First Deep Conversation with AI</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#A78BFA] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Practice Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              10 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 3 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Your First Deep Conversation with AI
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            A structured approach to multi-turn conversations that actually go somewhere.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Have a multi-turn AI conversation about a real problem that produces an insight you did not have before you started.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              You have heard that AI is powerful. You have probably used it a few times. But "deep conversation" is different from just asking questions.
            </p>
            <p>
              A deep conversation has momentum. It builds. Each turn adds something that the previous turn could not. You end up somewhere you could not have predicted at the start.
            </p>
            <p>
              Most AI conversations never get there because people do not know what structure actually works. This guide gives you that structure.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] mb-6">
            <p>A deep conversation has five stages. Each one does a specific job:</p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              { num: "1", title: "Set the context", desc: "Tell AI who you are and what you are working on. Do not assume it knows. Give it enough to be genuinely useful — not a one-liner, but a short paragraph." },
              { num: "2", title: "Ask the opening question", desc: "Your first question does not need to be perfect. It just needs to open the door. Ask something real — not what you think AI wants to hear." },
              { num: "3", title: "React to the answer", desc: "This is where most people drop out. Read the response. Then do something with it — agree, push back, ask for more on one part, or redirect. Every reaction teaches AI more about what you actually need." },
              { num: "4", title: "Go sideways", desc: "Follow a thread that surprised you. The unexpected branch is often where the real insight lives. If AI says something you did not expect, that is worth exploring." },
              { num: "5", title: "Ask for a summary", desc: "At the end, ask AI to summarize what you have figured out together. This consolidates the conversation and often reveals what the real insight was." },
            ].map((step) => (
              <div key={step.num} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5 flex gap-4">
                <div className="w-8 h-8 rounded-full bg-[#A78BFA]/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-sans text-[13px] font-bold text-[#A78BFA]">{step.num}</span>
                </div>
                <div>
                  <p className="font-sans text-[15px] font-bold text-white mb-1">{step.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 15 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Pick a real challenge in your life or work — something you have been stuck on, confused about, or avoiding. Use the opening prompt below to start a 6-turn conversation about it.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Opening Prompt
                </p>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  {"Let's think through something together. I'm [brief description of who you are]. I'm dealing with [real challenge]. I don't want a solution yet — I want to explore the problem. What would you want to understand about my situation first?"}
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">How to use the 5-stage structure</span>
                <div className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 leading-[1.8] space-y-2">
                  <p><span className="text-white/80 font-medium">Turns 1-2:</span> Set context and open the conversation (done in the prompt above).</p>
                  <p><span className="text-white/80 font-medium">Turns 3-4:</span> React to what AI says. Agree, push back, or dig into one thing that stood out.</p>
                  <p><span className="text-white/80 font-medium">Turn 5:</span> Follow an unexpected branch — something AI said that you want to explore more.</p>
                  <p><span className="text-white/80 font-medium">Turn 6:</span> Ask AI: "Summarize what we have figured out together in this conversation."</p>
                </div>
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
                "Used the opening prompt with a real challenge",
                "Completed all 6 turns without abandoning the conversation",
                "Asked AI to summarize what we figured out together",
                "Walked away with at least one insight I did not have at the start",
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
          <div className="bg-[#A78BFA]/5 border border-[#A78BFA]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A78BFA]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              What was the one thing you learned from this conversation that you did not know going in? <span className="text-white font-bold">Was it something AI told you — or something you discovered by trying to answer AI&apos;s questions?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "A deep AI conversation has a structure: context setting, opening question, reaction, sideways exploration, summary.",
              "The most valuable part is often turn 4 or 5 — after you have gone sideways. That is where the unexpected insight lives.",
              "Asking AI to summarize what you figured out together at the end is one of the most underused techniques in AI conversation.",
              "You do not need a perfect question to start a deep conversation. You need a real problem and the willingness to stay in it.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Have a deep conversation about something you have been avoiding.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Everyone has a topic they keep putting off thinking about — a conversation they need to have, a decision they are delaying, a fear they have not examined. Use the 5-stage structure to explore it. You might be surprised what you find.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Why Big Problems Feel Impossible</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Think with AI · Guide 4 of 12 · Beginner · 8 min
              </p>
            </div>
            <a
              href="/learn/think/why-big-problems-feel-impossible"
              className="inline-flex items-center gap-2 bg-[#A78BFA] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
