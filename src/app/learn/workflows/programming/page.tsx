import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Programming Workflow — AI Workflows | Cyberussell",
  description:
    "Build a simple working program or automation — even with zero coding experience — using Claude and ChatGPT together.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/programming" },
  openGraph: {
    title: "Programming Workflow | Cyberussell",
    description: "Build a simple working program or automation — even with zero coding experience — using Claude and ChatGPT together.",
    url: "https://www.cyberussell.com/learn/workflows/programming",
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
    title: "Define what you want to build",
    time: "5 min",
    description: 'Be specific: "I want a Google Sheet formula that automatically calculates my freelance income minus taxes" or "I want a simple webpage that shows my services and contact info."',
  },
  {
    number: "02",
    tool: "CLAUDE",
    color: "#F59E0B",
    title: "Write the code",
    time: "15 min",
    description: "Claude is the best AI for code. Describe what you want in plain language. No technical vocabulary needed.",
  },
  {
    number: "03",
    tool: "YOU",
    color: "#FFD23F",
    title: "Run the code",
    time: "10 min",
    description: "Paste it into the right place: a Google Sheet formula bar, a code editor, or a webpage file.",
  },
  {
    number: "04",
    tool: "CHATGPT",
    color: "#10B981",
    title: "Fix errors",
    time: "As needed",
    description: "If something breaks, copy the error message and describe it to ChatGPT. It explains what went wrong in simple language and gives you the fix.",
  },
  {
    number: "05",
    tool: "CLAUDE",
    color: "#F59E0B",
    title: "Improve the code",
    time: "As needed",
    description: "Once it works, ask Claude to add features, make it cleaner, or handle edge cases.",
  },
];

const PASTE_LOCATIONS = [
  {
    name: "Google Sheets formula",
    instruction: "Click a cell, type =, paste the formula.",
  },
  {
    name: "HTML webpage",
    instruction: "Create a file called index.html, paste the code, open it in your browser.",
  },
  {
    name: "Google Apps Script",
    instruction: "In Google Sheets, go to Extensions → Apps Script, paste the code, click Run.",
  },
  {
    name: "Glitch.com",
    instruction: "Sign up free, create a new project, paste the code. No install needed.",
  },
];

const CHECKLIST = [
  "Defined specifically what I want to build",
  "Used Claude to write the code",
  "Successfully ran the code",
  "Fixed any errors using ChatGPT",
];

const TAKEAWAYS = [
  "You do not need to understand code to use it. You need to describe what you want clearly.",
  "Claude is consistently the strongest AI for writing accurate, clean code.",
  "Error messages look scary but they are just the computer telling you exactly what went wrong. ChatGPT can translate them.",
  "Start with something small and useful. A formula that saves you 10 minutes per week is a real win.",
];

export default function ProgrammingWorkflowPage() {
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
            <span className="text-white/60">Programming Workflow</span>
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
              30 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 8 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Programming Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Build real, useful things with code — without knowing how to code.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Build a simple working program or automation — even with zero coding experience — using Claude and ChatGPT together.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              You do not need to know how to code to benefit from code.
            </p>
            <p>
              This workflow lets beginners build real, useful things: a spreadsheet automation, a simple webpage, a form, a calculator. Claude writes the code. You run it. ChatGPT explains any errors. You end up with something that actually works.
            </p>
          </div>
        </section>

        {/* Filipino Examples */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
              Filipino Beginner Examples
            </p>
            <div className="space-y-2">
              {[
                "A VA automates her weekly timesheet calculation in Google Sheets",
                "A student builds a simple quiz website for their thesis presentation",
                "A small business owner tracks inventory automatically instead of using a notebook",
              ].map((ex) => (
                <div key={ex} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7]">{ex}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>
          <div className="relative">
            {/* Timeline line */}
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
                    <p className="font-sans text-[15px] font-bold text-white mb-2">{step.title}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Where to Paste Your Code */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Where to Paste Your Code</h2>
          <div className="space-y-3">
            {PASTE_LOCATIONS.map((loc) => (
              <div key={loc.name} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <p className="font-sans text-[14px] font-bold text-white mb-1">{loc.name}</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.6]">{loc.instruction}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">Follow these steps exactly</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 space-y-6">
            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                Write down exactly what you want to build. Be specific about what it should do, what information goes in, and what result comes out.
              </p>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Claude</span>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Claude</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.7]">
                  I want to build [describe what you want in plain language]. I am a complete beginner with no coding experience. Write the complete code I need. Tell me exactly where to paste it and how to run it. Explain each major part in one sentence.
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                Follow Claude&rsquo;s instructions exactly. If it says paste into Google Sheets, do that. If it says create an HTML file, do that.
              </p>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 4 — ChatGPT (if needed)</span>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[13px] text-[#10B981] leading-[1.7]">
                  I tried to run this code: [paste the code]. I got this error: [copy the exact error message]. I am a beginner. What does this error mean in plain language, and what exactly do I need to change to fix it?
                </p>
              </div>
            </div>

            <div>
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 5 — Claude (once it works)</span>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4 mt-3">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Claude</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.7]">
                  This code works: [paste the working code]. Now I want to add [new feature]. Update the code and explain what changed.
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
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              What is one small, useful thing you could build this week that would save you time? <span className="text-white font-bold">Even a formula that takes 30 seconds off a task you do daily adds up to hours every year.</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 mt-3">
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
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Marketing Strategy</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                AI Workflows · Guide 9 of 10 · Beginner · 50 min
              </p>
            </div>
            <a
              href="/learn/workflows/marketing-strategy"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
