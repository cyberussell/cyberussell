import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Claude Artifacts — Meet Your AI Team | Cyberussell",
  description:
    "Use Claude Artifacts to create a live document, code, or interactive tool — and understand when to use it.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/claude-artifacts" },
};

export default function ClaudeArtifactsPage() {
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
            <span className="text-white/60">Claude Artifacts</span>
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
            Meet Your AI Team · Claude Guide 1 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Claude Artifacts
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            When Claude creates something, it shows it separately — so you can see it, use it, and edit it clearly.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use Claude Artifacts to create a live document, code, or interactive tool — and understand when to use it.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              When you chat with most AI tools, everything — your questions and the AI&rsquo;s responses — is mixed together in one long conversation thread. When Claude creates something substantial — a document, a website, a chart — it puts it in a separate panel called an Artifact.
            </p>
            <p>
              This is more useful than it sounds. You can see the created output clearly, copy it with one click, download it, or ask Claude to make changes to it specifically — without touching the rest of the conversation.
            </p>
            <p>
              For beginners, Artifacts make Claude especially easy to use for creating things — because you can always see exactly what was created.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">What Triggers an Artifact</p>
            <div className="space-y-3">
              {[
                { type: "Documents", examples: "Reports, templates, plans, emails, business proposals" },
                { type: "Code", examples: "Websites, scripts, formulas, apps, automations" },
                { type: "Visualizations", examples: "Charts, diagrams, tables, infographics" },
                { type: "Interactive tools", examples: "Calculators, quizzes, forms, trackers" },
              ].map(({ type, examples }) => (
                <div key={type} className="flex gap-4 py-3 border-b border-white/[0.05] last:border-0">
                  <div className="w-2 h-2 rounded-full bg-[#F59E0B] mt-[5px] shrink-0" />
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/80">{type}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-0.5">{examples}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
              What You Can Do With an Artifact
            </p>
            <div className="space-y-2">
              {[
                "Copy the entire output with one click",
                "Download it as a file",
                "Ask Claude to edit just the Artifact — without rewriting the whole conversation",
                "For code: preview it live in the Artifact panel (see it running, not just as text)",
                "Ask follow-up questions about it in the chat while keeping it visible",
              ].map((action) => (
                <div key={action} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[6px] shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.6]">{action}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">The Prompt</p>
              <p className="font-mono text-[15px] text-white/70 leading-[1.8] italic">
                &ldquo;Create a simple weekly schedule template for my small online business. I need to track: tasks for each day, time blocks, priority level (high/medium/low), and whether it is done. Make it clean and easy to fill in.&rdquo;
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">What Happens</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Claude creates a clean, formatted weekly schedule table in an Artifact panel. You can see the full schedule at once — not buried in a chat thread. You can copy it immediately, paste it into Google Docs or Notion, and start using it today.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                If you want changes, you just say: &ldquo;Add a &lsquo;Notes&rsquo; column on the right.&rdquo; Claude updates the Artifact directly.
              </p>
              <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#F59E0B]/80 leading-[1.6]">
                  No formatting required on your part. No copy-pasting from a messy chat thread. The output is already clean and ready.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · Claude (claude.ai — free account)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Open Claude</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Go to claude.ai. Create a free account if you do not have one. Start a new conversation.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Use this prompt</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#F59E0B] leading-[1.8]">
                    Create an Artifact for me: a simple one-page business plan template for a small Filipino online business. Include sections for: What I sell, Who I sell to, How I reach customers, My monthly income goal, and My 3 next steps. Make it clean and easy to fill in.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Edit it</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  When the Artifact appears, ask Claude to make one change: &ldquo;Add a section for my biggest challenge and how I plan to solve it.&rdquo; Notice how only the Artifact updates.
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
                "Created my first Claude Artifact",
                "Asked Claude to edit the Artifact with a specific change",
                "Copied or downloaded the result to use it",
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
              What is one thing you need to create this week — a plan, a template, a document, a tracker? <span className="text-white font-bold">Could Claude make it for you as an Artifact in under 5 minutes?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Artifacts are a separate panel where Claude shows created outputs — documents, code, charts, tools.",
              "Artifacts make it easy to see, copy, edit, and use what Claude created without scrolling through chat.",
              "You can ask Claude to edit an Artifact directly — it updates the panel without changing the conversation.",
              "For beginners, Artifacts are especially useful for creating templates, plans, trackers, and simple tools.",
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Create 3 useful Artifacts for your life.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Think of 3 documents, templates, or tools you need in your work or life that you have been putting off making. Use Claude to create all 3 as Artifacts. Examples: a weekly budget tracker, a client proposal template, a social media content calendar.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Claude Projects &amp; Memory</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Claude Guide 2 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/claude-projects-and-memory"
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
