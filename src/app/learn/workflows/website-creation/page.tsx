import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Creation Workflow — AI Workflows | Cyberussell",
  description:
    "Build a complete website for your business or portfolio using ChatGPT and Claude together — even if you have never built a website before.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/website-creation" },
  openGraph: {
    title: "Website Creation Workflow | Cyberussell",
    description: "Build a complete website using ChatGPT and Claude together — even if you have never built a website before.",
    url: "https://www.cyberussell.com/learn/workflows/website-creation",
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
    time: "5 min",
    title: "Define your goal",
    description: "Decide: what is the website for? Who will visit it? What do you want them to do?",
  },
  {
    step: "Step 2",
    actor: "CHATGPT",
    actorColor: "text-[#10B981]",
    dotColor: "bg-[#10B981]",
    lineColor: "bg-[#10B981]/20",
    time: "10 min",
    title: "Plan the structure",
    description: "Ask ChatGPT to plan your site: pages, sections, content hierarchy.",
  },
  {
    step: "Step 3",
    actor: "CLAUDE",
    actorColor: "text-[#F59E0B]",
    dotColor: "bg-[#F59E0B]",
    lineColor: "bg-[#F59E0B]/20",
    time: "30 min",
    title: "Write all the copy",
    description: "Claude writes every word: hero, about, services, contact, FAQs.",
  },
  {
    step: "Step 4",
    actor: "HUMAN REVIEW",
    actorColor: "text-[#FFD23F]",
    dotColor: "bg-[#FFD23F]",
    lineColor: "bg-[#FFD23F]/20",
    time: "20 min",
    title: "Personalize and publish",
    description: "You verify facts, add your photos, publish on Carrd, Notion, or WordPress.",
  },
];

export default function WebsiteCreationPage() {
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
            <span className="text-white/60">Website Creation Workflow</span>
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
            AI Workflows · Guide 1 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Website Creation Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Two AIs. One afternoon. A website that is actually yours.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/[0.08] border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Build a complete website for your business or portfolio using ChatGPT and Claude together — even if you have never built a website before.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Building a website used to require a web developer. Now you can create a professional site in one afternoon using AI — for free or near-free. This workflow shows you exactly how.
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
                    <p className="font-sans text-[16px] font-bold text-white mb-1">{s.title}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.7]">{s.description}</p>
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
              Filipino Freelancer Story
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.9]">
              A Filipino freelance graphic designer builds a portfolio website in one afternoon. ChatGPT plans 5 pages, Claude writes all the copy, she publishes on Carrd for free.
            </p>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">Follow each step in order. Do not skip ahead.</p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — You</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-2 leading-[1.7]">
                Write down: What is this website for? Who will visit it? What do you want them to do?
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[1.5px]">Step 2 — ChatGPT</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Open ChatGPT and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — ChatGPT</p>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.8]">
                  I want to build a simple website for [your purpose]. My target visitor is [describe them]. I want them to [desired action]. Plan my website structure: list the pages and what each section should include.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Step 3 — Claude</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-2 mb-3 leading-[1.7]">
                Open Claude and run this prompt:
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-2">Prompt — Claude</p>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.8]">
                  Here is my website structure: [paste ChatGPT&apos;s output]. Write complete copy for every section. I am [name], I do [what you do], for [who]. Make it sound personal and professional.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[1.5px]">Step 4 — Human Review</span>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-2 leading-[1.7]">
                Sign up for Carrd.co (free), choose a template, paste Claude's copy into each section, add your own photos.
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
                "Used ChatGPT to plan my site structure",
                "Used Claude to write the copy",
                "Published or set up my site",
              ].map((item) => (
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
              What surprised you about how fast this came together? <span className="text-white font-bold">What would you change about the copy Claude wrote?</span>
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Two AIs working together produce better results than one AI doing everything.",
              "ChatGPT is strong at planning and structure. Claude is strong at writing and polish.",
              "You do not need technical skills to publish a website today. Carrd, Notion, and WordPress handle the technical side.",
              "The human step (Step 4) is the most important: your photos, your facts, your voice make it real.",
            ].map((point) => (
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
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Business Planning Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Workflows · Guide 2 of 10 · Beginner · 55 min
              </p>
            </div>
            <a
              href="/learn/workflows/business-planning"
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
