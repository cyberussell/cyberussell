import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Build a Landing Page | Cyberussell",
  description:
    "Design and publish a real landing page using AI — no coding required. Complete this mission in 2 hours and walk away with a live page.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/build-a-landing-page" },
  openGraph: {
    title: "Mission: Build a Landing Page | Cyberussell",
    description: "Design and publish a real landing page using AI — no coding required.",
    url: "https://www.cyberussell.com/learn/missions/build-a-landing-page",
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
    time: "10 min",
    title: "Define what your page is for",
    desc: "Before you build anything, get clear on one thing: what action do you want visitors to take? Sign up, buy, book a call, download something? One page = one goal.",
    tips: ["Pick ONE call to action (not three)", "Define who the page is for in one sentence", "Write down what makes your offer different from alternatives"],
  },
  {
    number: "02",
    tool: "CHATGPT",
    color: "#10B981",
    time: "15 min",
    title: "Plan your page structure and copy",
    desc: "Tell ChatGPT about your offer and audience. Ask it to give you a complete landing page outline — every section, what goes in it, and why.",
    prompt: "I'm building a landing page for [your offer]. My target audience is [describe them]. The one action I want visitors to take is [your CTA]. Give me a complete landing page structure: every section in order, what copy goes in each one, and the psychology behind why each section is there.",
    tips: ["Ask for 3 headline options for your hero section", "Request a section for social proof even if you don't have it yet", "Ask it to write the CTA button text too"],
  },
  {
    number: "03",
    tool: "CLAUDE",
    color: "#F59E0B",
    time: "20 min",
    title: "Write the full page copy",
    desc: "Hand the structure to Claude and ask it to write all the copy in full. Claude writes cleaner, more persuasive copy than most landing page builders' AI tools.",
    prompt: "Using this structure: [paste structure], write the complete copy for my landing page. Audience: [describe]. Offer: [describe]. Tone should be [conversational / professional / bold]. Write every section in full — headlines, subheadlines, body text, bullet points, and CTA.",
    tips: ["Tell Claude the tone: conversational, bold, friendly, professional", "Ask for 2 versions of the headline if the first doesn't feel right", "Have Claude write objection-handling copy under the CTA"],
  },
  {
    number: "04",
    tool: "YOU",
    color: "#FFD23F",
    time: "45 min",
    title: "Build the page with a no-code tool",
    desc: "Use Carrd, Framer, or Notion + Super to publish your page. These tools are free or low-cost and require zero code. Paste your copy in, choose a clean template, and publish.",
    tips: ["Carrd is the fastest for a simple one-pager (free tier available)", "Framer has better design control if you want something more polished", "Don't spend more than 45 minutes on design — content beats aesthetics"],
  },
  {
    number: "05",
    tool: "YOU",
    color: "#FFD23F",
    time: "10 min",
    title: "Review and publish",
    desc: "Read the page as a visitor. Check every link, test it on mobile, and make sure the CTA is visible without scrolling on both desktop and phone.",
    tips: ["Test on your phone before publishing", "Send to one person you trust for honest feedback", "Copy the live URL and save it — this is your first portfolio piece"],
  },
];

export default function BuildALandingPagePage() {
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
            <span className="text-white/60">Build a Landing Page</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 02
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Build a Landing Page
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            A landing page is one of the most valuable things you can build online. It sells your service,
            grows your list, or promotes your product — 24/7. This mission walks you through planning,
            writing, and publishing one with AI.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/45">
              <Clock size={13} /> 2 hours
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A live, published landing page.
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
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] mb-4">{step.desc}</p>

                  {"prompt" in step && step.prompt && (
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-4">
                      <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/30 mb-2">Prompt to use</p>
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 leading-[1.7] italic">&ldquo;{step.prompt}&rdquo;</p>
                    </div>
                  )}

                  <ul className="flex flex-col gap-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 font-[family-name:var(--font-inter)] text-[13px] text-white/40">
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
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              You now have a live landing page. Save the URL. Share it. This is your first real online asset —
              and the foundation for everything you build next.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/learn/missions/create-your-first-resume" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← Mission 01: Create Your Resume
            </a>
            <a href="/learn/missions" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Back to All Missions →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
