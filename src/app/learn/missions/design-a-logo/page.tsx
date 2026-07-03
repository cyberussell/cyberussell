import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Design a Logo | Cyberussell",
  description:
    "Use AI image tools to create a professional logo for a brand. Complete this mission in 45 minutes and walk away with 3 logo variations.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/design-a-logo" },
  openGraph: {
    title: "Mission: Design a Logo | Cyberussell",
    description: "Use AI image tools to create a professional logo for a brand.",
    url: "https://www.cyberussell.com/learn/missions/design-a-logo",
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
    title: "Define the brand: name, vibe, and audience",
    desc: "What does this brand stand for? Playful or serious? Local or global? Cheap or premium? Get clear before generating anything.",
    tips: ["Write down 3 adjectives that describe the brand's personality", "Note 1-2 competitor or inspiration logos, for reference only — never copy", "Decide if it needs to work in color AND black-and-white"],
  },
  {
    number: "02",
    tool: "CHATGPT",
    color: "#10B981",
    time: "10 min",
    title: "Generate logo concepts with ChatGPT",
    desc: "Ask ChatGPT to write detailed visual descriptions for 5 different logo directions. You're generating written concepts here, not images yet.",
    prompt: "I'm designing a logo for a brand called [brand name]. It's [describe vibe — e.g. playful, minimal, premium] and targets [audience]. Write 5 distinct visual concepts for this logo — describe the icon or symbol, the style (e.g. geometric, hand-drawn, line art), and a suggested color palette for each.",
    tips: ["Ask for concepts in different directions — don't let them all look the same", "Note which concept you're drawn to and why", "Keep the color palette suggestions — you'll need them for the image prompt"],
  },
  {
    number: "03",
    tool: "GEMINI",
    color: "#4F8EF7",
    time: "20 min",
    title: "Create logo variations with AI image tools",
    desc: "Use Canva AI, Adobe Firefly, or Gemini's image tools to turn your favorite written concepts into actual visuals. Generate multiple versions — image AI is inconsistent, so volume matters here too.",
    prompt: "Create a minimalist logo icon for a brand called [brand name]. Style: [paste style from your concept]. Colors: [paste palette]. The logo should work as a small icon (app icon size) and be simple enough to recognize at a glance. No text, just the symbol, on a plain white background.",
    tips: ["Generate the same prompt 3-4 times — image AI gives different results each run", "Try 2-3 of your favorite concepts, not just one", "If nothing looks right, simplify the prompt — complex logos rarely generate well"],
  },
  {
    number: "04",
    tool: "YOU",
    color: "#FFD23F",
    time: "5 min",
    title: "Refine your favorite and remove backgrounds",
    desc: "Pick the strongest concept and clean it up using background-removal tools so it's usable anywhere.",
    tips: ["Use remove.bg or Canva's background remover for a transparent PNG", "Crop tightly around the logo with a little breathing room", "Check that it's still readable when shrunk to a small size"],
  },
  {
    number: "05",
    tool: "YOU",
    color: "#FFD23F",
    time: "5 min",
    title: "Export in the right formats",
    desc: "Save as PNG (transparent), SVG if possible, and a dark/light version for different backgrounds — cover all the places this logo will actually get used.",
    tips: ["Save a transparent PNG for digital use", "Save a version with a white background for documents", "Keep the original high-res file — you'll need it later for print or merch"],
  },
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

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> 3 logo variations ready to use.
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
              You now have real logo files ready to use — on a website, social profile, or invoice. Keep the
              source files organized so you can regenerate variations later without starting over.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/learn/missions/create-a-social-media-calendar" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">
              ← Mission 05: Create a Social Media Calendar
            </a>
            <a href="/learn/missions/write-a-blog-article" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next Mission: Write a Blog Article →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
