import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Build Real Skills with AI — Writing, Design, SEO & More | Cyberussell",
  description:
    "Traditional skills taught through AI. Writing, design, SEO, coding, marketing — learn them faster with AI as your partner.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills" },
};

const skills = [
  { title: "Website Creation", desc: "Build real websites with AI — no code required to start.", soon: false },
  { title: "SEO", desc: "Rank on Google using AI-powered research and writing.", soon: false },
  { title: "Graphic Design", desc: "Create professional visuals with AI design tools.", soon: true },
  { title: "Writing & Copywriting", desc: "Write faster and better with AI as your co-author.", soon: true },
  { title: "Content Creation", desc: "Build a content engine using AI workflows.", soon: true },
  { title: "Video Editing", desc: "Use AI to speed up your video production process.", soon: true },
  { title: "Marketing", desc: "Plan, write, and launch campaigns with AI assistance.", soon: true },
  { title: "Programming", desc: "Build software with Claude and ChatGPT as your dev team.", soon: true },
  { title: "Automation", desc: "Automate repetitive work using AI + no-code tools.", soon: true },
  { title: "Excel & Spreadsheets", desc: "Use AI to write formulas, clean data, and build reports.", soon: true },
  { title: "Business", desc: "Plan, pitch, and run a business with AI-powered strategy.", soon: true },
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
              <div
                key={skill.title}
                className={`bg-[#18181F] border rounded-[12px] p-5 flex items-start gap-4 ${
                  skill.soon ? "border-white/[0.06] opacity-60" : "border-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  {skill.soon ? (
                    <Lock size={14} className="text-[#E8373A]/40" />
                  ) : (
                    <Wrench size={14} className="text-[#E8373A]" />
                  )}
                </div>
                <div>
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{skill.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{skill.desc}</p>
                  {skill.soon && (
                    <span className="mt-2 inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Coming soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
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
