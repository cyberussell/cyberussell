import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Design a Logo | Cyberussell",
  description:
    "Use AI image tools to create a professional logo for a brand. Complete this mission in 45 minutes and walk away with 3 logo variations.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/design-a-logo" },
};

const steps = [
  { title: "Define the brand: name, vibe, and audience", desc: "What does this brand stand for? Playful or serious? Local or global? Cheap or premium?" },
  { title: "Generate logo concepts with ChatGPT", desc: "Ask ChatGPT to write detailed visual descriptions for 5 different logo directions." },
  { title: "Create logo variations with AI image tools", desc: "Use Canva AI, Adobe Firefly, or Midjourney to generate visual options from your descriptions." },
  { title: "Refine your favorite and remove backgrounds", desc: "Pick the strongest concept and clean it up using background-removal tools." },
  { title: "Export in the right formats", desc: "Save as PNG (transparent), SVG if possible, and a dark/light version for different backgrounds." },
];

export default function DesignALogoPage() {
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
            <span className="text-white/60">Design a Logo</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 06
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Design a Logo
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            Logos used to cost thousands of pesos and weeks of back-and-forth. AI tools now let you generate
            professional-quality options in minutes. This mission walks you through the whole process.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
              <Clock size={13} /> 45 minutes
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-8">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> 3 logo variations ready to use.
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
