import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Automation with AI — Build Real Skills | Cyberussell",
  description: "Automate the repetitive parts of your business using no-code tools and AI. Zapier, Make, n8n, and AI agents explained.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/automation" },
  openGraph: { title: "Automation with AI | Cyberussell", description: "Automate your business with no-code tools and AI agents.", url: "https://www.cyberussell.com/learn/skills/automation", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const lessons = [
  { title: "What's Worth Automating (and What Isn't)", desc: "How to identify the repetitive tasks in your day that are prime automation targets.", href: "/learn/skills/automation/whats-worth-automating" },
  { title: "No-Code Automation: Zapier, Make, and n8n", desc: "The top automation platforms — what they do, how they differ, and which to start with.", href: "/learn/skills/automation/no-code-automation-tools" },
  { title: "Connecting AI to Your Workflows with Make", desc: "How to trigger AI actions automatically — summarize emails, generate reports, respond to leads.", href: "/learn/skills/automation/connecting-ai-to-your-workflows" },
  { title: "Automating Content Workflows", desc: "Auto-post, auto-schedule, and auto-repurpose content using no-code + AI pipelines.", href: "/learn/skills/automation/automating-content-workflows" },
  { title: "Client and Business Automation for Freelancers", desc: "Automate onboarding, invoicing, follow-ups, and reporting for your freelance business.", href: "/learn/skills/automation/client-and-business-automation" },
  { title: "Building an AI Agent for Repetitive Research", desc: "Use AI to automatically gather, summarize, and deliver information on a schedule.", href: "/learn/skills/automation/building-an-ai-research-agent" },
];

export default function AutomationSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <span className="text-white/60">Automation</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 · Automation</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">Automation</h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            The most successful people don&rsquo;t just work harder — they eliminate the manual work that doesn&rsquo;t require them. This track teaches you to automate your most repetitive tasks using no-code tools and AI.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50"><span className="text-white/70 font-bold">Outcome:</span> You automate your most time-consuming tasks and run more of your business on autopilot.</p>
          </div>
          <div className="flex flex-col gap-3">
            {lessons.map((lesson, i) => (
              <a key={lesson.title} href={lesson.href} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5 flex items-start gap-4 hover:border-[#E8373A]/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#E8373A] text-[12px] font-bold font-[family-name:var(--font-inter)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#E8373A]/60 shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">← Back to Build Real Skills</a>
        </section>
      </main>
      <Footer />
    </>
  );
}
