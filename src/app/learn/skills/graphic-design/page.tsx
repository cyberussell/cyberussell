import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Graphic Design with AI — Build Real Skills | Cyberussell",
  description:
    "Create professional visuals using AI design tools. No design degree required — just the right tools and prompts.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/graphic-design" },
  openGraph: {
    title: "Graphic Design with AI | Cyberussell",
    description: "Create professional visuals with AI design tools.",
    url: "https://www.cyberussell.com/learn/skills/graphic-design",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const lessons = [
  { title: "AI Design Tools Overview: Canva AI, Adobe Firefly, Midjourney", desc: "What each tool does best and when to use which one.", soon: true },
  { title: "Creating Social Media Graphics That Stop the Scroll", desc: "Design principles + AI tools for making visuals people actually engage with.", soon: true },
  { title: "Logo and Brand Identity with AI", desc: "Build a consistent visual brand from scratch using AI-powered design tools.", soon: true },
  { title: "Presentation Design: From Bland to Boardroom-Ready", desc: "Use AI to turn a wall of text into a professional deck in minutes.", soon: true },
  { title: "Thumbnail and Cover Design for Content Creators", desc: "The formulas behind high-click thumbnails — and how to generate them with AI.", soon: true },
  { title: "Print-Ready Designs: Flyers, Posters, and Merch", desc: "How to produce print-quality work using AI tools without Photoshop.", soon: true },
];

export default function GraphicDesignSkillPage() {
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
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a>
            <span>/</span>
            <span className="text-white/60">Graphic Design</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 5 · Graphic Design
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Graphic Design
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            AI has democratized design. You no longer need years of training to create professional visuals —
            you need the right tools, the right prompts, and an eye for what looks good. This track teaches
            you both.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-6">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You produce professional-quality visuals using AI design tools.
            </p>
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-xl px-5 py-4 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7]">
              Lessons coming soon. Check back shortly — this track is in active development.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {lessons.map((lesson) => (
              <div
                key={lesson.title}
                className="bg-[#18181F] border border-white/[0.06] rounded-[12px] p-5 flex items-start gap-4 opacity-60"
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Lock size={14} className="text-[#E8373A]/40" />
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                  <span className="mt-2 inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Coming soon</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
            ← Back to Build Real Skills
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
