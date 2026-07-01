import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Picking Your Stack: No-Code vs AI-Code vs Traditional — Website Creation | Cyberussell",
  description: "Compare your website-building options before you commit to any platform. The right choice depends on your goal, timeline, and skill level.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation/picking-your-stack" },
  openGraph: {
    title: "Picking Your Stack: No-Code vs AI-Code vs Traditional | Cyberussell",
    description: "Compare your website-building options before you commit to any platform.",
    url: "https://www.cyberussell.com/learn/skills/website-creation/picking-your-stack",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const COLOR = "#E8373A";

export default function LessonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a>
            <span>/</span>
            <a href="/learn/skills/website-creation" className="hover:text-white transition-colors">Website Creation</a>
            <span>/</span>
            <span className="text-white/60">Picking Your Stack</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]" style={{ backgroundColor: `${COLOR}15`, color: COLOR }}>
              <Wrench size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">Tool Guide</span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">10 min</span>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">Website Creation · Lesson 2 of 7</p>
          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">Picking Your Stack</h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">No-Code vs AI-Code vs Traditional — compare before you commit.</p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="rounded-[14px] p-5" style={{ backgroundColor: `${COLOR}10`, border: `1px solid ${COLOR}30` }}>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px] mb-2" style={{ color: COLOR }}>After This Lesson, You Will Be Able To</p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">Choose the right website-building approach for your specific goal, budget, and skill level — and explain why.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">The Three Approaches</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>One of the biggest mistakes new builders make is choosing a tool before knowing what they need to build. The tool should follow the goal — not the other way around.</p>
            <p>There are three main approaches to building websites today, and each has a different sweet spot. Understanding them prevents you from spending weeks learning the wrong one.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="space-y-4">
            {[
              {
                label: "No-Code", color: "#22C55E",
                tools: "Carrd, Framer, Webflow, Wix",
                bestFor: "Portfolios, landing pages, small business sites, fast launches",
                pros: ["Fastest to start — live in hours, not weeks", "No technical knowledge needed", "Good templates and drag-and-drop editors", "Free tiers available on most platforms"],
                cons: ["Limited customization at higher complexity", "Monthly fees can add up", "You're dependent on the platform's rules"],
                verdict: "Best for 90% of first websites. Start here."
              },
              {
                label: "AI-Code", color: "#F59E0B",
                tools: "Claude + Cursor, ChatGPT + Replit, v0.dev",
                bestFor: "Custom apps, unique features, freelance projects that need code",
                pros: ["Full control over design and functionality", "You own everything — no platform lock-in", "Can build anything if you know how to direct AI well", "Great for learning real development skills"],
                cons: ["Steeper learning curve", "You need to understand the code enough to debug", "Takes longer to get to a live product"],
                verdict: "Best when no-code can't do what you need."
              },
              {
                label: "Traditional (WordPress / PHP)", color: "#E8373A",
                tools: "WordPress, Elementor, WooCommerce",
                bestFor: "Blogs, e-commerce, large content sites, client projects",
                pros: ["Massive ecosystem of plugins and themes", "Very SEO-friendly out of the box", "Huge community and resources", "Good for complex, content-heavy sites"],
                cons: ["More maintenance required (updates, security)", "Slower to launch from scratch", "Can be overkill for a simple portfolio"],
                verdict: "Best for long-term content and e-commerce projects."
              },
            ].map((approach) => (
              <div key={approach.label} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-sans text-[14px] font-bold px-3 py-1 rounded-full" style={{ backgroundColor: `${approach.color}15`, color: approach.color }}>{approach.label}</span>
                  <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">{approach.tools}</span>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 uppercase tracking-[1px] mb-1">Best for</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 mb-4">{approach.bestFor}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#22C55E] font-bold uppercase tracking-[1px] mb-2">Pros</p>
                    {approach.pros.map(p => <p key={p} className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.6] mb-1">+ {p}</p>)}
                  </div>
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-[#E8373A] font-bold uppercase tracking-[1px] mb-2">Cons</p>
                    {approach.cons.map(c => <p key={c} className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.6] mb-1">− {c}</p>)}
                  </div>
                </div>
                <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-lg px-4 py-2">
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#FFD23F] font-bold">{approach.verdict}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">10 minutes · ChatGPT or Claude</p>
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4">
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">Prompt to use</p>
              <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                I want to build a website for [describe your goal]. My budget is [free / low budget / flexible]. I [do / don't] know how to code. I want to launch within [your timeline]. Based on this, which approach should I use — no-code, AI-code, or traditional? Give me a specific recommendation with a reason.
              </p>
            </div>
            <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare size={14} className="text-[#22C55E]" />
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
              </div>
              <div className="space-y-2">
                {["I know which approach fits my goal", "I've picked one specific tool to start with", "I understand why the other approaches aren't right for me yet"].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                    <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/5 border border-[#A78BFA]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3"><Lightbulb size={14} className="text-[#A78BFA]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[1.5px]">Reflect</span></div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">Most people spend more time choosing a tool than building with it. <span className="text-white font-bold">What's the real cost of not deciding and just starting?</span></p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "No-code (Carrd, Framer) is the right starting point for 90% of first websites. Fast, affordable, no coding needed.",
              "AI-code (Claude + Cursor) is powerful when you need something custom — but has a steeper learning curve.",
              "Traditional (WordPress) is best for content-heavy or e-commerce projects with long-term growth plans.",
              "Choose based on your goal and timeline — not on what looks most impressive. Ship, then upgrade.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0" style={{ backgroundColor: COLOR }} />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3"><Trophy size={14} className="text-[#F59E0B]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge</span></div>
            <p className="font-sans text-[15px] font-bold text-white mb-2">Create a free account on Carrd or Framer — right now.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">Don't overthink it. Just sign up and click around for 10 minutes. Familiarity with the tool before you need to use it reduces friction when it's time to build.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">Next Lesson</p>
              <p className="font-sans text-[16px] font-bold text-white">Planning Your Site with AI Before You Build</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">Website Creation · Lesson 3 of 7 · 10 min</p>
            </div>
            <a href="/learn/skills/website-creation/planning-your-site-with-ai" className="inline-flex items-center gap-2 text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: COLOR }}>
              Next <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
