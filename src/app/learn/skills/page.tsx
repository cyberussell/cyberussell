import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Build Real Skills with AI — Writing, Design, SEO & More | Cyberussell",
  description:
    "Traditional skills taught through AI. Writing, design, SEO, coding, marketing — learn them faster with AI as your partner.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills" },
};

const skills = [
  { title: "Website Creation", desc: "Build real websites with AI — no code required to start.", soon: false, href: "/learn/skills/website-creation" },
  { title: "SEO", desc: "Rank on Google using AI-powered research and writing.", soon: false, href: "/learn/skills/seo" },
  { title: "Graphic Design", desc: "Create professional visuals with AI design tools.", soon: false, href: "/learn/skills/graphic-design" },
  { title: "Writing & Copywriting", desc: "Write faster and better with AI as your co-author.", soon: false, href: "/learn/skills/writing-copywriting" },
  { title: "Content Creation", desc: "Build a content engine using AI workflows.", soon: false, href: "/learn/skills/content-creation" },
  { title: "Video Editing", desc: "Use AI to speed up your video production process.", soon: false, href: "/learn/skills/video-editing" },
  { title: "Marketing", desc: "Plan, write, and launch campaigns with AI assistance.", soon: false, href: "/learn/skills/marketing" },
  { title: "Programming", desc: "Build software with Claude and ChatGPT as your dev team.", soon: false, href: "/learn/skills/programming" },
  { title: "Automation", desc: "Automate repetitive work using AI + no-code tools.", soon: false, href: "/learn/skills/automation" },
  { title: "Excel & Spreadsheets", desc: "Use AI to write formulas, clean data, and build reports.", soon: false, href: "/learn/skills/excel-spreadsheets" },
  { title: "Business", desc: "Plan, pitch, and run a business with AI-powered strategy.", soon: false, href: "/learn/skills/business" },
];

export default function SkillsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <span className="text-white/60">Build Real Skills</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 5
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Build Real Skills
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Every skill guide here starts with why it matters, then shows you how AI changes the way you
            learn and practice it. You&rsquo;re not here to memorize — you&rsquo;re here to build something sellable.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-4">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You develop sellable skills using AI as your partner.
            </p>
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-xl px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
              Every skill guide covers: <span className="text-white/70">Why it matters → How AI changes it → Best AI tools → Example prompts → Common mistakes → Practical exercises</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {skills.map((skill) => (
              <a
                key={skill.title}
                href={skill.href}
                className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5 flex items-start gap-4 hover:border-[#E8373A]/30 transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Wrench size={14} className="text-[#E8373A]" />
                </div>
                <div>
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{skill.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{skill.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="bg-[#FB923C]/[0.06] border border-[#FB923C]/20 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FB923C] uppercase tracking-[2px] mb-1">Ready to prove it?</p>
              <h3 className="font-sans text-[18px] font-bold text-white mb-1">Take the Final Assessment</h3>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45">10 questions · Pass 75% · Earn your Digital Skills Bida Badge</p>
            </div>
            <a
              href="/learn/skills/assessment"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FB923C] text-white font-[family-name:var(--font-inter)] text-[14px] font-bold hover:bg-[#FB923C]/90 transition-colors"
            >
              Start Assessment →
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/learn/workflows" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← AI Workflows
            </a>
            <a href="/learn/missions" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next: AI Missions →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
