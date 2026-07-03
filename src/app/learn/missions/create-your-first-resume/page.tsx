import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Create Your First Professional Resume | Cyberussell",
  description:
    "Use ChatGPT and Claude to write a resume that stands out to real employers. Complete this mission in 45 minutes and walk away with a polished, ready-to-send resume.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/create-your-first-resume" },
  openGraph: {
    title: "Mission: Create Your First Professional Resume | Cyberussell",
    description: "Use ChatGPT and Claude to write a resume that stands out to real employers.",
    url: "https://www.cyberussell.com/learn/missions/create-your-first-resume",
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
    title: "Gather your raw information",
    desc: "Before prompting any AI, list out your work experience, education, skills, and any projects or achievements. Bullet points are fine — don't worry about formatting yet.",
    tips: ["Include dates, job titles, company names", "List any freelance, volunteer, or personal projects", "Note specific accomplishments if you remember them (numbers help)"],
  },
  {
    number: "02",
    tool: "CHATGPT",
    color: "#10B981",
    time: "10 min",
    title: "Generate a resume structure",
    desc: "Paste your raw information into ChatGPT and ask it to organize it into a clean resume structure with the right sections for your experience level.",
    prompt: "Here is my background information: [paste your notes]. I'm applying for [job type] roles. Please organize this into a professional resume structure with the right sections. Don't write the full resume yet — just give me the structure and what should go in each section.",
    tips: ["Tell ChatGPT the type of job you're targeting", "Ask it to suggest what to cut if you have too much", "Ask for the structure in order of importance"],
  },
  {
    number: "03",
    tool: "CLAUDE",
    color: "#F59E0B",
    time: "15 min",
    title: "Write and polish the full resume",
    desc: "Take the structure from ChatGPT and bring it to Claude to write the complete, polished resume. Claude is better at writing that sounds natural and human.",
    prompt: "Using this structure: [paste structure], write a complete professional resume for me. My target role is [job type]. Use strong action verbs, keep bullet points concise (1-2 lines each), and make it sound confident but not exaggerated. Format it cleanly.",
    tips: ["Ask Claude to 'rewrite in a more confident tone' if needed", "Request 3 versions of your summary statement", "Have Claude tailor it to a specific job description if you have one"],
  },
  {
    number: "04",
    tool: "YOU",
    color: "#FFD23F",
    time: "10 min",
    title: "Review, fact-check, and personalize",
    desc: "Read every line. AI can fabricate details or use generic language. Make sure everything is accurate, replace anything that doesn't sound like you, and add any missing specifics.",
    tips: ["Check all dates, titles, and company names", "Replace any generic phrases with real details you remember", "Read it aloud — if it sounds weird, rewrite it"],
  },
  {
    number: "05",
    tool: "YOU",
    color: "#FFD23F",
    time: "5 min",
    title: "Format and export",
    desc: "Paste your resume into Google Docs or a Word doc. Use a clean, single-column format. Export as PDF before sending — PDF preserves formatting across devices.",
    tips: ["Stick to one page if you have under 5 years of experience", "Use a readable font — Inter, Lato, or Calibri", "Save as: FirstName_LastName_Resume.pdf"],
  },
];

export default function CreateYourFirstResumePage() {
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
            <span className="text-white/60">Create Your First Resume</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 01
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Create Your First<br />Professional Resume
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            This mission walks you through building a complete, polished resume using ChatGPT and Claude.
            You&rsquo;ll leave with an actual document ready to send — not just notes about how to write one.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
              <Clock size={13} /> 45 minutes
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A complete, polished resume ready to send.
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
              You now have a complete resume built with AI. Save it, export it as a PDF, and start sending it out.
              Come back when you want to tailor it for a specific job — the same workflow applies.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/learn/missions" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">
              ← Back to Missions
            </a>
            <a href="/learn/missions/build-a-landing-page" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next Mission: Build a Landing Page →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
