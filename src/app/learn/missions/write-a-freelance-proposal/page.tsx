import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Write a Freelance Proposal | Cyberussell",
  description:
    "Craft a compelling proposal for a real freelance opportunity using Claude. Complete this mission in 30 minutes.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/write-a-freelance-proposal" },
  openGraph: {
    title: "Mission: Write a Freelance Proposal | Cyberussell",
    description: "Craft a compelling proposal for a real freelance opportunity using Claude.",
    url: "https://www.cyberussell.com/learn/missions/write-a-freelance-proposal",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const steps = [
  {
    number: "01",
    tool: "YOU",
    color: "#FFD23F",
    time: "5 min",
    title: "Read the job post and extract key pain points",
    desc: "Identify exactly what the client needs — not what they said, but what they actually want solved. Most job posts bury the real problem in the second or third paragraph.",
    tips: ["Highlight or copy the 2-3 sentences that describe their real problem", "Note any specific requirements they mention (deadline, budget, tools)", "Ignore generic filler in the post — focus on what they actually need solved"],
  },
  {
    number: "02",
    tool: "GEMINI",
    color: "#4F8EF7",
    time: "5 min",
    title: "Research the client with Gemini",
    desc: "Spend 5 minutes learning about their business so your proposal feels tailored, not templated. Gemini can search the web in real time, so use it to find something specific to reference.",
    prompt: "I'm applying for a freelance job with [client/company name, or paste the job post]. Search for information about this business — what they do, who their audience is, and anything recent (launches, posts, reviews). Summarize the 3 most useful details I could reference in a proposal.",
    tips: ["If there's no company name, search the platform profile or portfolio link instead", "Look for one specific detail you can mention in your opening line", "Skip this step only if the post is fully anonymous"],
  },
  {
    number: "03",
    tool: "CLAUDE",
    color: "#F59E0B",
    time: "10 min",
    title: "Draft your proposal with Claude",
    desc: "Use Claude to write a proposal that leads with the client's problem, not your credentials. Feed it both the job post and your research so it can write something specific.",
    prompt: "Here's the job post: [paste job post]. Here's what I found about the client: [paste research from the previous step]. Write a freelance proposal that opens by naming their specific problem, briefly shows I understand it, and explains how I'd approach solving it — not a list of my credentials. Keep it under 200 words.",
    tips: ["Ask Claude to cut the opening if it still sounds generic", "Request a version that opens with a question instead of a statement", "Keep your first sentence about them, not you"],
  },
  {
    number: "04",
    tool: "YOU",
    color: "#FFD23F",
    time: "5 min",
    title: "Add a specific offer and clear next step",
    desc: "End with exactly what you'll deliver, your rate, and one clear call to action. Vague proposals get vague responses — or none at all.",
    tips: ["State your rate or a price range, even if it's an estimate", "Name exactly what you'll deliver and by when", "End with one clear next step — a call, a question, or “ready to start Monday”"],
  },
  {
    number: "05",
    tool: "YOU",
    color: "#FFD23F",
    time: "5 min",
    title: "Review, personalize, and send",
    desc: "Read it as the client. Remove anything that sounds like everyone else's proposal — clients scanning 30 applications can spot a template instantly.",
    tips: ["Read it as if you were the client receiving 20 of these", "Delete any sentence that could apply to literally any other freelancer", "Double check the client's name and platform-specific formatting before sending"],
  },
];

export default function WriteAFreelanceProposalPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/missions" className="hover:text-white transition-colors">AI Missions</a>
            <span>/</span>
            <span className="text-white/60">Write a Freelance Proposal</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 03
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Write a Freelance Proposal
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            Most freelance proposals lose the job before the client finishes reading. This mission teaches you
            how to write proposals that get responses — using Gemini to research and Claude to write copy that
            feels personal, not generic.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
              <Clock size={13} /> 30 minutes
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A ready-to-send freelance proposal.
            </p>
          </div>

          <div className="flex flex-col gap-0 mb-16">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-start gap-4 md:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold font-[family-name:var(--font-inter)]"
                    style={{ backgroundColor: `${step.color}18`, color: step.color }}
                  >
                    {step.number}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 my-2" style={{ backgroundColor: `${step.color}30`, minHeight: "32px" }} />}
                </div>
                <div className="pb-10 flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px] px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${step.color}18`, color: step.color }}
                    >
                      {step.tool}
                    </span>
                    <span className="flex items-center gap-1 font-[family-name:var(--font-inter)] text-[12px] text-white/30">
                      <Clock size={10} /> {step.time}
                    </span>
                  </div>
                  <h3 className="font-sans text-[18px] font-bold text-white mb-2">{step.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7] mb-4">{step.desc}</p>

                  {"prompt" in step && step.prompt && (
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-4">
                      <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/30 mb-2">Prompt to use</p>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7] italic">&ldquo;{step.prompt}&rdquo;</p>
                    </div>
                  )}

                  <ul className="flex flex-col gap-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/40">
                        <CheckSquare size={13} className="mt-0.5 shrink-0 text-white/20" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="font-sans text-[20px] font-bold text-white mb-2">Mission Complete?</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              You now have a proposal built to get a response, not get ignored. Send it, then reuse this same
              workflow — research with Gemini, draft with Claude — for the next opportunity.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/learn/missions/build-a-landing-page" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">
              ← Mission 02: Build a Landing Page
            </a>
            <a href="/learn/missions/research-a-business-idea" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next Mission: Research a Business Idea →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
