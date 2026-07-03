import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Marketing Strategy Workflow — AI Workflows | Cyberussell",
  description:
    "Create a complete marketing strategy for your business or freelance service — using ChatGPT, Gemini, and Claude.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/marketing-strategy" },
  openGraph: {
    title: "Marketing Strategy Workflow | Cyberussell",
    description: "Create a complete marketing strategy for your business or freelance service — using ChatGPT, Gemini, and Claude.",
    url: "https://www.cyberussell.com/learn/workflows/marketing-strategy",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const STEPS = [
  {
    number: "01",
    tool: "YOU",
    color: "#FFD23F",
    title: "Define your marketing goal",
    time: "5 min",
    description: "What do you want in 30 days? More followers? Your first 10 customers? A specific revenue target like ₱10,000 in sales?",
  },
  {
    number: "02",
    tool: "GEMINI",
    color: "#4F8EF7",
    title: "Research your competitors",
    time: "15 min",
    description: "Ask Gemini to research 3 competitors: what they post, how often, what content gets the most engagement.",
  },
  {
    number: "03",
    tool: "CHATGPT",
    color: "#10B981",
    title: "Identify your unique angle",
    time: "10 min",
    description: "Based on the competitor research, ask ChatGPT what gap you can fill that they are not filling.",
  },
  {
    number: "04",
    tool: "CLAUDE",
    color: "#F59E0B",
    title: "Write your strategy",
    time: "20 min",
    description: "Claude writes a complete strategy: positioning, content pillars, posting schedule, and your first campaign.",
  },
  {
    number: "05",
    tool: "CHATGPT",
    color: "#10B981",
    title: "Create your first 10 posts",
    time: "15 min",
    description: "Get ready-to-use captions for your first week based on the strategy.",
  },
];

const CHECKLIST = [
  "Set a specific 30-day marketing goal",
  "Used Gemini to research competitors",
  "Used ChatGPT to identify my unique angle",
  "Used Claude to write my strategy",
  "Got 10 ready-to-post captions from ChatGPT",
];

const TAKEAWAYS = [
  "Strategy before content. Know who you are talking to and why before you create anything.",
  "Competitor research reveals gaps. Most businesses post the same things — the gap is your opportunity.",
  "Claude is strong at synthesizing information into a structured strategy document.",
  "Your first 10 posts are the hardest. After that, you have a process and a template.",
];

export default function MarketingStrategyWorkflowPage() {
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
            <span className="text-white/60">Marketing Strategy</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Workflow Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              65 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 9 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Marketing Strategy Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            A complete marketing plan for your business — built in under an hour.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Create a complete marketing strategy for your business or freelance service — using ChatGPT, Gemini, and Claude.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most small businesses market randomly — they post when they feel like it and boost posts when they are desperate.
            </p>
            <p>
              A strategy changes that. It gives you a clear plan: who you are talking to, what you are saying, and how often. This workflow creates one in under an hour.
            </p>
            <p>
              Filipino context: Facebook and TikTok marketing for small businesses and freelancers.
            </p>
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
              Filipino Food Seller on Facebook
            </p>
            <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.9] space-y-3">
              <p>
                A Filipino food seller uses this workflow. Gemini finds that her 3 main competitors post product photos every day but never post behind-the-scenes content or customer stories.
              </p>
              <p>
                ChatGPT identifies the gap: authenticity and community. Claude writes a strategy focused on &ldquo;the real story of a Filipino home cook.&rdquo;
              </p>
              <p className="text-white/80 font-medium">
                Her first month using the strategy triples her page engagement.
              </p>
            </div>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>
          <div className="relative">
            <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/[0.06]" />
            <div className="space-y-6">
              {STEPS.map((step) => (
                <div key={step.number} className="flex gap-5">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-[11px] font-bold font-[family-name:var(--font-inter)] z-10" style={{ borderColor: step.color, color: step.color, backgroundColor: "#0F0F1A" }}>
                      {step.number}
                    </div>
                  </div>
                  <div className="bg-[#14141e] border border-white/[0.06] rounded-2xl p-5 flex-1 mb-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[1.5px] px-2 py-0.5 rounded-full" style={{ color: step.color, backgroundColor: `${step.color}15` }}>
                        {step.tool}
                      </span>
                      <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 uppercase tracking-[1px]">{step.time}</span>
                    </div>
                    <p className="font-sans text-[16px] font-bold text-white mb-2">{step.title}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">Follow these steps with your real business</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 space-y-6">
            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                Write: What is my 30-day marketing goal? Be specific with numbers.
              </p>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Gemini</span>
              <div className="bg-[#0F0F1A] border border-[#4F8EF7]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Gemini</p>
                <p className="font-mono text-[14px] text-[#4F8EF7] leading-[1.7]">
                  Research the social media marketing of these 3 businesses: [name 3 competitors or similar businesses]. For each one: What platforms do they use? How often do they post? What types of content do they post? Which posts seem to get the most engagement? What do they never post about?
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — ChatGPT</span>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[14px] text-[#10B981] leading-[1.7]">
                  I run [your business]. My competitors do this: [paste Gemini&apos;s findings]. What content gap exists that my competitors are not filling? What unique angle can I take that would make my audience choose me over them? Be specific.
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 4 — Claude</span>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Claude</p>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.7]">
                  I need a 30-day social media marketing strategy. My business: [describe it]. My goal: [your 30-day goal]. My unique angle: [paste ChatGPT&apos;s output]. Write a complete strategy including: (1) My brand positioning in 1-2 sentences, (2) 3 content pillars I will focus on, (3) Posting schedule (how many times per week, on which days), (4) My first campaign for Week 1 with a specific theme.
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 5 — ChatGPT</span>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[14px] text-[#10B981] leading-[1.7]">
                  Based on this marketing strategy: [paste Claude&apos;s output]. Write 10 ready-to-post social media captions for Week 1. Each caption should follow the content pillars in the strategy. Include a hook, body, call to action, and 5 hashtags.
                </p>
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5 mt-4">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {CHECKLIST.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              What is the one content gap your competitors are all missing? <span className="text-white font-bold">That gap is where your audience is waiting for someone like you to show up.</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">
              You do not need to write it down. Just think.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {TAKEAWAYS.map((point) => (
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
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Decision Making</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Workflows · Guide 10 of 10 · Beginner · 40 min
              </p>
            </div>
            <a
              href="/learn/workflows/decision-making"
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
