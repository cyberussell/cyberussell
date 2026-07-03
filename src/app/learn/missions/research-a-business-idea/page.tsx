import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Research a Business Idea | Cyberussell",
  description:
    "Use Gemini and ChatGPT to validate a business idea with real market data. Complete this mission in 1 hour.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/research-a-business-idea" },
  openGraph: {
    title: "Mission: Research a Business Idea | Cyberussell",
    description: "Use Gemini and ChatGPT to validate a business idea with real market data.",
    url: "https://www.cyberussell.com/learn/missions/research-a-business-idea",
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
    title: "Define your idea in one clear sentence",
    desc: "Who are you helping, what problem are you solving, and how are you different? If you can't fit it in one sentence, the idea is still too vague to research.",
    tips: ["Use the format: I help [who] do [what] by [how]", "Write down 2-3 versions and pick the clearest one", "If you're stuck, describe the problem before the solution"],
  },
  {
    number: "02",
    tool: "GEMINI",
    color: "#4F8EF7",
    time: "15 min",
    title: "Research the market with Gemini",
    desc: "How big is the market? Who are the main competitors? What are people already paying for? Gemini can search live, so use it to pull real, current information.",
    prompt: "I'm considering this business idea: [paste your one-sentence idea]. Search for the current market size, main competitors, and pricing in this space. Tell me if this market is growing, shrinking, or crowded, and name 3 real competitors with what they charge.",
    tips: ["Ask follow-up questions on any competitor that looks similar to your idea", "Note pricing — it tells you what customers already pay", "If Gemini can't find competitors, that's a signal worth investigating further"],
  },
  {
    number: "03",
    tool: "CHATGPT",
    color: "#10B981",
    time: "10 min",
    title: "Identify your target customer with ChatGPT",
    desc: "Build a specific customer profile — demographics, pain points, where they spend time online. A vague customer means vague marketing later.",
    prompt: "My business idea is: [paste idea]. Based on this, build a specific customer profile: age range, situation, biggest frustration related to this problem, and where they spend time online (which platforms, communities, or search terms they'd use).",
    tips: ["Push back if the profile feels too broad — ask ChatGPT to narrow it further", "Write down the exact words this customer might search for", "Compare this profile to people you actually know, if possible"],
  },
  {
    number: "04",
    tool: "YOU",
    color: "#FFD23F",
    time: "15 min",
    title: "Validate demand with real signals",
    desc: "Find evidence that people are already searching for or spending money on this problem. Opinions don't validate an idea — behavior does.",
    tips: ["Search your target customer's exact phrases on Google, Reddit, or Facebook groups", "Check if competitors have reviews complaining about a gap you could fill", "Look for existing paid products or services solving a similar problem — that's proof people pay"],
  },
  {
    number: "05",
    tool: "YOU",
    color: "#FFD23F",
    time: "10 min",
    title: "Write a 1-page business summary",
    desc: "Summarize your findings: market size, competition, customer, and your unique angle. This becomes your working document — not a pitch deck, just clarity.",
    tips: ["Include: the problem, your customer, market size, competitors, and your unique angle", "Keep it to one page — this is a working document, not a pitch deck", "End with one clear next step you'll take this week"],
  },
];

export default function ResearchABusinessIdeaPage() {
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
            <span className="text-white/60">Research a Business Idea</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 04
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Research a Business Idea
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            Most business ideas die from lack of research, not lack of effort. This mission teaches you how to
            use Gemini and ChatGPT to validate a business idea with real market data — in under an hour.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
              <Clock size={13} /> 1 hour
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#F59E0B]">
              <BarChart2 size={13} /> Intermediate
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A 1-page business research summary.
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
              You now have real evidence to decide whether this idea is worth pursuing — not just a gut feeling.
              Keep this summary and revisit it whenever the idea evolves.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/learn/missions/write-a-freelance-proposal" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">
              ← Mission 03: Write a Freelance Proposal
            </a>
            <a href="/learn/missions/create-a-social-media-calendar" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next Mission: Create a Social Media Calendar →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
