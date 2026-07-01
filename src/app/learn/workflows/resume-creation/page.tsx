import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume Creation Workflow — AI Workflows | Cyberussell",
  description:
    "Write a professional, personalized resume that passes ATS filters and sounds like you — using ChatGPT and Claude together.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/resume-creation" },
  openGraph: {
    title: "Resume Creation Workflow | Cyberussell",
    description: "Write a professional, personalized resume that passes ATS filters and sounds like you — using ChatGPT and Claude together.",
    url: "https://www.cyberussell.com/learn/workflows/resume-creation",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const workflowSteps = [
  {
    step: "Step 1",
    actor: "YOU",
    actorColor: "text-white",
    dotColor: "bg-white/40",
    lineColor: "bg-white/[0.08]",
    time: "10 min",
    title: "Gather your materials",
    description: "List all past jobs/experience, skills, education, and the job you are applying for.",
  },
  {
    step: "Step 2",
    actor: "CHATGPT",
    actorColor: "text-[#10B981]",
    dotColor: "bg-[#10B981]",
    lineColor: "bg-[#10B981]/20",
    time: "10 min",
    title: "Brainstorm your value",
    description: "Ask ChatGPT what makes you stand out for this specific role.",
  },
  {
    step: "Step 3",
    actor: "CLAUDE",
    actorColor: "text-[#F59E0B]",
    dotColor: "bg-[#F59E0B]",
    lineColor: "bg-[#F59E0B]/20",
    time: "15 min",
    title: "Write the full resume",
    description: "Claude writes a polished, ATS-friendly resume using your info.",
  },
  {
    step: "Step 4",
    actor: "CHATGPT",
    actorColor: "text-[#10B981]",
    dotColor: "bg-[#10B981]",
    lineColor: "bg-[#10B981]/20",
    time: "10 min",
    title: "Tailor for the job post",
    description: "Paste the job description, ask ChatGPT what to add or change.",
  },
  {
    step: "Step 5",
    actor: "HUMAN REVIEW",
    actorColor: "text-[#FFD23F]",
    dotColor: "bg-[#FFD23F]",
    lineColor: "bg-[#FFD23F]/20",
    time: "10 min",
    title: "Verify and finalize",
    description: "Check all facts, add your contact info, export as PDF.",
  },
];

export default function ResumeCreationPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        {/* Breadcrumb */}
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/workflows" className="hover:text-white transition-colors">AI Workflows</a>
            <span>/</span>
            <span className="text-white/60">Resume Creation Workflow</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Workflow Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              45 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 3 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Resume Creation Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            A resume that passes ATS filters and actually sounds like you.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/[0.08] border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Write a professional, personalized resume that passes ATS filters and sounds like you — using ChatGPT and Claude together.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most AI-written resumes sound generic. This workflow uses two AIs for different strengths: ChatGPT to brainstorm and structure, Claude to write and polish. The result sounds human but is professionally formatted.
            </p>
            <p>
              Filipino context: this workflow is built for applying to remote jobs on OnlineJobs.ph, Upwork, or local BPO roles.
            </p>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 md:p-8">
            <div className="flex flex-col gap-0">
              {workflowSteps.map((s, i) => (
                <div key={s.step} className="flex items-start gap-5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className={`w-3 h-3 rounded-full ${s.dotColor} mt-1 shrink-0`} />
                    {i < workflowSteps.length - 1 && <div className={`w-px h-16 ${s.lineColor} mt-1`} />}
                  </div>
                  <div className="pb-2">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">{s.step}</span>
                      <span className={`font-[family-name:var(--font-inter)] text-[12px] font-bold uppercase tracking-[1px] ${s.actorColor}`}>{s.actor}</span>
                      <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">· {s.time}</span>
                    </div>
                    <p className="font-sans text-[15px] font-bold text-white mb-1">{s.title}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
              Filipino Job Seeker Story
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.9]">
              A fresh grad applies for a virtual assistant role on OnlineJobs.ph. She has no formal VA experience but has organized events at school and managed her family&apos;s sari-sari store inventory. ChatGPT identifies those as relevant skills. Claude writes a resume that frames them professionally. She gets 3 interview invites in her first week.
            </p>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">Follow each step in order. Do not skip ahead.</p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — You</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 leading-[1.7]">
                Write down all your experience — jobs, school projects, freelance work, volunteer work, anything you have done that required a skill.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[1.5px]">Step 2 — ChatGPT</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Open ChatGPT and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.8]">
                  I am applying for a [job title] role. Here is my background: [your experience list]. What are my 5 strongest selling points for this specific role? What skills from my background are most relevant? What should I highlight?
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Step 3 — Claude</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Open Claude and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Claude</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.8]">
                  Write a professional resume for me. Here is my background: [your experience]. Here are my key selling points: [ChatGPT&apos;s output]. The role I am applying for is: [job title and description]. Format it cleanly with sections for Summary, Skills, Experience, and Education. Make it ATS-friendly and keep it to one page.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[1.5px]">Step 4 — ChatGPT</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Go back to ChatGPT and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.8]">
                  Here is my current resume: [paste Claude&apos;s output]. Here is the job description I am applying for: [paste the job post]. What specific words, skills, or phrases from the job description should I add to my resume? What should I change or remove?
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[1.5px]">Step 5 — Human Review</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-2 leading-[1.7]">
                Make the edits, double-check every fact, add your actual contact info, and export as PDF using Google Docs or Canva.
              </p>
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
              {[
                "Listed all my experience and skills",
                "Used ChatGPT to identify my strongest selling points",
                "Used Claude to write my resume",
                "Used ChatGPT to tailor it to the job description",
                "Verified all facts and exported as PDF",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              What experience did you have that you almost did not include — but ChatGPT told you was relevant? <span className="text-white font-bold">How did Claude&apos;s version of your resume differ from what you would have written on your own?</span>
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Your AI-written resume is a starting point, not a final product. Always verify and personalize.",
              "ChatGPT is strong at identifying what makes you stand out. Claude is strong at writing it clearly.",
              "ATS (Applicant Tracking System) means your resume is scanned by software before a human sees it. Use the exact words from the job description.",
              "Even informal experience counts. AI can help you frame it professionally.",
            ].map((point) => (
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
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Content Creation Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                AI Workflows · Guide 4 of 10 · Beginner · 40 min
              </p>
            </div>
            <a
              href="/learn/workflows/content-creation"
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
