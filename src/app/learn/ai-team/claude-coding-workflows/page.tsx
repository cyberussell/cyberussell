import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Claude Coding Workflows — Meet Your AI Team | Cyberussell",
  description:
    "Build a simple personal workflow using Claude that automates something you do manually every week.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/claude-coding-workflows" },
};

export default function ClaudeCodingWorkflowsPage() {
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
            <span className="text-white/60">Claude Coding Workflows</span>
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
            Meet Your AI Team · Claude Guide 5 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Claude Coding Workflows
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            A workflow is just steps you repeat. Build one with Claude, and the task goes from 30 minutes to 2 minutes.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Build a simple personal workflow using Claude that automates something you do manually every week.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most of us have tasks we do repeatedly — every day, every week, every month. Write a report. Send a client update. Format an invoice. Create a social media post. Draft a follow-up email.
            </p>
            <p>
              These tasks are not hard. They are just slow and repetitive. A workflow is simply a structured way to do them faster — where you provide the raw information and Claude handles the formatting, writing, and structuring.
            </p>
            <p>
              The best part: once you build a workflow with Claude, you can reuse it forever. The same input → the same quality output → in a fraction of the time.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">4 Simple Workflows Any Beginner Can Build</p>
            <div className="space-y-5">
              {[
                {
                  name: "Weekly report generator",
                  how: "Paste your week&rsquo;s notes or bullet points. Claude formats them into a clean, professional weekly summary.",
                  time: "30 min of writing → 3 min of pasting + reviewing",
                },
                {
                  name: "Social media calendar",
                  how: "Paste a list of your products, services, or topics. Claude creates a month of post ideas with captions and hashtags.",
                  time: "Hours of content planning → 5 min prompt + review",
                },
                {
                  name: "Email template system",
                  how: "Describe your most common email types (follow-ups, proposals, thank-yous). Claude creates reusable templates you can personalize in 30 seconds.",
                  time: "20 min per email → 2 min to fill in a template",
                },
                {
                  name: "Invoice generator",
                  how: "Describe the work you did. Claude formats a professional invoice with your details, scope, and payment terms.",
                  time: "15 min of formatting → 2 min of describing",
                },
              ].map(({ name, how, time }) => (
                <div key={name} className="border-b border-white/[0.05] pb-5 last:border-0 last:pb-0">
                  <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white mb-1.5">{name}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6] mb-2" dangerouslySetInnerHTML={{ __html: how }} />
                  <div className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-[#F59E0B]">{time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Before the Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
                Dino is a Filipino freelance developer. Every Friday, he writes a client update email summarizing what he did that week. He stares at a blank email for 20–30 minutes, trying to sound professional and organized. He often sends it late because he keeps putting it off.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">After Building a Workflow With Claude</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Dino creates a workflow: every Friday, he opens his Claude Project (with client details already loaded), pastes his rough notes from the week, and says &ldquo;Turn these into my weekly client update email.&rdquo;
              </p>
              <p className="font-mono text-[13px] text-white/65 leading-[1.8] italic mb-3">
                His notes: &ldquo;Fixed login bug. Added search filter. Started the dashboard. Client asked about mobile — told them next sprint. Had one call Wednesday.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Claude returns a polished, professional 3-paragraph email. Dino reads it, makes one small edit, and sends it. Total time: 2 minutes.
              </p>
              <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#F59E0B]/80 leading-[1.6]">
                  He has sent a professional client update every Friday for 3 months straight without missing one. His client commented: &ldquo;I love how consistent and clear your updates are.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 15 minutes · Claude (claude.ai)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Pick your task</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Think of one thing you do manually and repeatedly — every week or every day. It can be anything: writing an update, formatting data, drafting messages, creating summaries, planning content.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Build the workflow with Claude</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.8]">
                    I want to build a simple workflow with you. I do this task manually every week: [DESCRIBE YOUR TASK — be specific]. I want a system where I give you [DESCRIBE YOUR INPUT — e.g., rough notes, a list of items, raw data] and you give me [DESCRIBE YOUR OUTPUT — e.g., a professional email, a formatted report, a social media post]. Let&rsquo;s test it now with a real example. Here is my input for this week: [PASTE REAL CONTENT].
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Save and reuse</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  If the output is good, save the prompt template to a note (your phone notes, a Google Doc, anywhere). Next week, open Claude, paste the template, swap out the input, and run it again. That is your workflow.
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
                "Identified a repetitive task in my work or life",
                "Built a Claude workflow by describing my input and desired output",
                "Tested the workflow with real content and got a usable result",
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
              How many hours per week do you spend on repetitive tasks that follow the same pattern? <span className="text-white font-bold">Each one of those could be a workflow. The first one you build gives you back that time forever.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "A workflow is just a repeatable process: you provide the input, Claude provides the polished output.",
              "The best workflows solve tasks you do manually every week — updates, reports, emails, content, invoices.",
              "You do not need to know how to code. You just need to clearly describe your input and your expected output.",
              "Save your workflow prompt somewhere. Reuse it every week with different input — that is the whole system.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Build 3 workflows in one week.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Pick 3 repetitive tasks in your work or personal life. Build a Claude workflow for each one this week. At the end of the week, calculate how many total hours you saved. Then keep using them.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Gemini in Gmail</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Meet Your AI Team · Gemini Guide 1 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/gemini-in-gmail"
              className="inline-flex items-center gap-2 bg-[#4F8EF7] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
