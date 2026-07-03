import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Freelancing Proposal Workflow — AI Workflows | Cyberussell",
  description:
    "Write a proposal that wins clients — using Claude and ChatGPT to create something personal, not generic.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/freelancing-proposal" },
  openGraph: {
    title: "Freelancing Proposal Workflow — AI Workflows | Cyberussell",
    description: "Write a proposal that wins clients — using Claude and ChatGPT to create something personal, not generic.",
    url: "https://www.cyberussell.com/learn/workflows/freelancing-proposal",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const steps = [
  {
    toolLabel: "You",
    dotColor: "#FFD23F",
    step: "Step 1",
    title: "Read the job post carefully",
    time: "5 min",
    description: "Identify: What is the real problem? What result do they want? What are they afraid of or frustrated about?",
  },
  {
    toolLabel: "Claude",
    dotColor: "#F59E0B",
    step: "Step 2",
    title: "Analyze the job post",
    time: "10 min",
    description: "Ask Claude to identify the client's main concern and what would make them choose you.",
  },
  {
    toolLabel: "ChatGPT",
    dotColor: "#10B981",
    step: "Step 3",
    title: "Draft the proposal",
    time: "15 min",
    description: "ChatGPT drafts a proposal addressing the client's specific need.",
  },
  {
    toolLabel: "Claude",
    dotColor: "#F59E0B",
    step: "Step 4",
    title: "Polish and personalize",
    time: "10 min",
    description: "Claude rewrites it to sound like you — confident, specific, human.",
  },
];

const checklist = [
  "Read the job post and identified the client's real problem",
  "Used Claude to analyze what the client really needs",
  "Used ChatGPT to draft the proposal",
  "Used Claude to polish and personalize it",
];

const takeaways = [
  "The best proposals talk about the client, not the freelancer. Lead with their problem.",
  "Claude is strong at analysis and polished writing. ChatGPT is strong at drafting complete documents quickly.",
  "A 150-word targeted proposal beats a 500-word generic one every time.",
  "Your real experiences matter. Add specific numbers or results when you can: \"I managed a 500-email inbox weekly\" beats \"I have experience with email management.\"",
];

export default function FreelancingProposalPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        {/* Breadcrumb */}
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/workflows" className="hover:text-white transition-colors">AI Workflows</a>
            <span>/</span>
            <span className="text-white/60">Freelancing Proposal</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Workflow
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              40 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 5 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Freelancing Proposal Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Write a proposal that wins clients — by making it personal, not generic.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Write a proposal that wins clients — using Claude and ChatGPT to create something personal, not generic.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most freelance proposals lose because they sound like everyone else's. They open with "I am a hardworking professional with X years of experience." The client has read that sentence a hundred times.
            </p>
            <p>
              The best proposals start with the client's problem — not the freelancer's resume. They make the client feel seen. They answer the question the client is actually asking: "Will this person solve my specific problem?"
            </p>
            <p>
              This workflow is for Upwork, OnlineJobs.ph, Fiverr — anywhere you apply for remote work. It takes 40 minutes. It produces a proposal that sounds like you thought deeply about their job, because you did.
            </p>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>

          <div className="relative">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-5 mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: s.dotColor }}
                  />
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ backgroundColor: s.dotColor, opacity: 0.25, minHeight: "48px" }} />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">{s.step}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: s.dotColor }}>{s.toolLabel}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">· {s.time}</span>
                  </div>
                  <p className="font-sans text-[17px] font-bold text-white mb-1">{s.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">
              Filipino Virtual Assistant · Upwork
            </p>
            <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/65 leading-[1.9] space-y-3">
              <p>
                A Filipino virtual assistant applies for a job post asking for someone to "manage email and calendar for a busy US entrepreneur." Instead of writing "I am a hardworking VA with 3 years of experience," she uses this workflow.
              </p>
              <p>
                Claude identifies that the client's real fear is things falling through the cracks. Her proposal opens with:
              </p>
              <p className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4 font-mono text-[14px] text-[#F59E0B] leading-[1.7]">
                "I know how overwhelming it feels when your inbox controls your day instead of the other way around."
              </p>
              <p className="text-white/80 font-bold">
                She gets the interview.
              </p>
            </div>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 40 minutes · Claude + ChatGPT</p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-3">Step 1 · You</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-3">
                Read the job post 3 times. On paper or in a notes app, write:
              </p>
              <ul className="space-y-1.5">
                {[
                  "What is the client's main problem?",
                  "What do they want to feel after it's solved?",
                  "What might they be worried about when hiring a stranger?",
                ].map((q) => (
                  <li key={q} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                    <span className="font-[family-name:var(--font-inter)] text-[15px] text-white/55">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 2 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 2 · Claude</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Open Claude and paste this prompt with the full job post.
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#F59E0B] uppercase tracking-[1.5px] block mb-3">Claude</span>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.7]">
                  {`Here is a job post I want to apply to: [paste the full job post]. Analyze it: What is the client's real main concern? What result do they most want? What fear or frustration is behind this post? What would make a freelancer stand out to this specific client?`}
                </p>
              </div>
            </div>

            {/* Step 3 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 3 · ChatGPT</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Open ChatGPT. Paste Claude's analysis into the second bracket.
              </p>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#10B981] uppercase tracking-[1.5px] block mb-3">ChatGPT</span>
                <p className="font-mono text-[14px] text-[#10B981] leading-[1.7]">
                  {`I am applying for this freelance job: [paste job post]. The client's main concern is: [paste Claude's analysis]. Write a 150-200 word proposal that: opens by acknowledging their specific problem, explains briefly how I would solve it, gives one relevant example or result, and ends with a clear next step. My background: [your relevant experience].`}
                </p>
              </div>
            </div>

            {/* Step 4 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 4 · Claude</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Go back to Claude. Paste the draft ChatGPT wrote.
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#F59E0B] uppercase tracking-[1.5px] block mb-3">Claude</span>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.7]">
                  {`Here is a proposal draft: [paste ChatGPT's draft]. Rewrite it to sound more natural and confident. Remove any sentences that sound generic or like every other freelancer. Make sure it opens with the client's pain, not with me talking about myself. Keep it under 200 words.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mark Complete */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {checklist.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Reflect */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              Read your final proposal out loud. <span className="text-white font-bold">Does the first sentence mention you — or the client's problem?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">
              If it starts with "I," rewrite the opening. The client should feel seen before you introduce yourself.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {takeaways.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Deep Research Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Workflows · Guide 6 of 10
              </p>
            </div>
            <a
              href="/learn/workflows/deep-research"
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
