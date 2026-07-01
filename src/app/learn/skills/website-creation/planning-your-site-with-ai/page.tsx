import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Planning Your Site with AI Before You Build — Website Creation | Cyberussell",
  description: "Use ChatGPT to map out your site's structure, content, and goals before touching any tool. Planning with AI saves hours of rework.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation/planning-your-site-with-ai" },
  openGraph: { title: "Planning Your Site with AI | Cyberussell", description: "Map out your site structure and content before you build.", url: "https://www.cyberussell.com/learn/skills/website-creation/planning-your-site-with-ai", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const COLOR = "#E8373A";

export default function LessonPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <a href="/learn/skills/website-creation" className="hover:text-white transition-colors">Website Creation</a><span>/</span>
            <span className="text-white/60">Planning Your Site with AI</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]" style={{ backgroundColor: `${COLOR}15`, color: COLOR }}><Wrench size={10} /> Beginner</span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">Planning Guide</span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">10 min</span>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">Website Creation · Lesson 3 of 7</p>
          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">Planning Your Site with AI Before You Build</h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">The fastest way to build is to think first. AI is your planning partner.</p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="rounded-[14px] p-5" style={{ backgroundColor: `${COLOR}10`, border: `1px solid ${COLOR}30` }}>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px] mb-2" style={{ color: COLOR }}>After This Lesson, You Will Be Able To</p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">Use AI to define your site's pages, content, and structure — before opening any builder tool.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why You Should Plan Before You Build</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>Most people open a website builder, pick a template, and start dragging things around — then realize two hours in that they don't know what to say, how many pages they need, or what the site is actually supposed to do.</p>
            <p>Planning with AI first takes 30 minutes and saves hours. You walk into the builder knowing exactly what pages you need, what goes on each one, and what the site's job is.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Planning Framework: 4 Questions AI Helps You Answer</h2>
          <div className="space-y-3">
            {[
              { q: "What is the site's one job?", a: "Not 'show my portfolio AND sell my services AND build my email list.' Pick the single most important action. Everything else is secondary." },
              { q: "Who is visiting this site?", a: "Describe your ideal visitor. What do they want? What are they worried about? What would make them trust you immediately?" },
              { q: "What pages do you actually need?", a: "Most first sites need 3-5 pages max: Home, About, Services/Portfolio, Contact — and maybe a Blog. Don't build what you won't fill." },
              { q: "What content goes on each page?", a: "For each page: what's the headline, what does the body say, what does the visitor do next? Answer this before you open any builder." },
            ].map((item, i) => (
              <div key={i} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-5">
                <p className="font-sans text-[14px] font-bold text-white mb-2">{item.q}</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">15 minutes · ChatGPT or Claude</p>
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4">
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">Prompt to use</p>
              <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">I want to plan a website before I start building it. My goal is [your goal]. My target visitor is [describe them]. Help me: 1) Define the site's one main job, 2) List the pages I need (no more than 5), 3) For each page, tell me what should go on it in plain bullet points. Keep it simple — this is a first website.</p>
            </div>
            <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
              <div className="flex items-center gap-2 mb-3"><CheckSquare size={14} className="text-[#22C55E]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span></div>
              <div className="space-y-2">
                {["I have a clear site map (list of pages)", "Each page has a purpose I can explain in one sentence", "I know what content I need to write before I start building"].map((item) => (
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
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">If someone landed on your site for the first time and had 10 seconds, <span className="text-white font-bold">would they immediately know what you do and who it's for?</span> If not, your planning isn't done yet.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {["Planning with AI first takes 30 minutes and prevents hours of rework inside the builder.", "Most first sites need 3–5 pages. More pages = more content to write = longer to launch.", "For every page, define: what it says, who it's for, and what the visitor does next.", "A clear site map is your blueprint. Don't open the builder until you have one."].map((point) => (
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Draw your site map by hand.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">Take a piece of paper and sketch your site structure. Boxes for pages, arrows for navigation. Doing it by hand forces clarity that a typed list doesn't.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">Next Lesson</p>
              <p className="font-sans text-[16px] font-bold text-white">Writing Website Copy That Actually Converts</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">Website Creation · Lesson 4 of 7 · 12 min</p>
            </div>
            <a href="/learn/skills/website-creation/writing-website-copy-that-converts" className="inline-flex items-center gap-2 text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: COLOR }}>
              Next <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
