import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Create a Social Media Calendar | Cyberussell",
  description:
    "Build a full month of content ideas with AI for any niche. Complete this mission in 1 hour and walk away with a 30-day content calendar.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/create-a-social-media-calendar" },
};

const steps = [
  { title: "Define your niche, audience, and platform", desc: "What topic do you post about, who reads it, and which platform are you focusing on?" },
  { title: "Generate 60 content ideas with ChatGPT", desc: "Use AI to brainstorm more ideas than you need so you can pick the best ones." },
  { title: "Sort and select 30 winners", desc: "Filter for ideas that educate, entertain, or inspire your specific audience." },
  { title: "Assign topics to dates with a content theme system", desc: "Group ideas into weekly themes so your feed feels cohesive, not random." },
  { title: "Write 5 captions with Claude as a test", desc: "Draft your first week's captions to confirm the calendar is realistic to execute." },
];

export default function CreateASocialMediaCalendarPage() {
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
            <span className="text-white/60">Create a Social Media Calendar</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 05
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Create a Social Media Calendar
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            Consistency beats creativity on social media. This mission uses AI to plan 30 days of content
            in one session — so you stop scrambling for ideas and start building momentum.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
              <Clock size={13} /> 1 hour
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-8">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A 30-day content calendar.
            </p>
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-xl px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Full step-by-step guide with prompts coming soon. Here&rsquo;s the mission overview:
            </p>
          </div>

          <div className="flex flex-col gap-3 mb-16">
            {steps.map((step, i) => (
              <div key={step.title} className="bg-[#18181F] border border-white/[0.06] rounded-[12px] p-5 flex items-start gap-4 opacity-70">
                <div className="w-8 h-8 rounded-lg bg-[#FFD23F]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#FFD23F]/60 text-[12px] font-bold font-[family-name:var(--font-inter)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div>
                  <h3 className="font-sans text-[16px] font-bold text-white mb-1">{step.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.5]">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/missions" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">
            ← Back to All Missions
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
