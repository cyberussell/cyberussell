import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing Website Copy That Actually Converts — Website Creation | Cyberussell",
  description: "AI-assisted copywriting for your homepage, about page, and services. Write words that make visitors take action.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation/writing-website-copy-that-converts" },
  openGraph: { title: "Writing Website Copy That Converts | Cyberussell", description: "Write website copy that makes visitors take action.", url: "https://www.cyberussell.com/learn/skills/website-creation/writing-website-copy-that-converts", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
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
            <span className="text-white/60">Writing Website Copy</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]" style={{ backgroundColor: `${COLOR}15`, color: COLOR }}><Wrench size={10} /> Beginner</span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">Copywriting</span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">12 min</span>
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">Website Creation · Lesson 4 of 7</p>
          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">Writing Website Copy That Actually Converts</h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">Most websites have design but no copy. That's why they don't convert.</p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="rounded-[14px] p-5" style={{ backgroundColor: `${COLOR}10`, border: `1px solid ${COLOR}30` }}>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2px] mb-2" style={{ color: COLOR }}>After This Lesson, You Will Be Able To</p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">Write a homepage headline, about page, and services section using AI — in your voice, for your audience.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why Copy Matters More Than Design</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>A beautiful website with bad copy will not convert. A simple website with clear, compelling copy will. The words are the website — the design just frames them.</p>
            <p>Copy is what tells your visitor: "This is for you. This is what you get. Here's what to do next." Without it, visitors land, get confused, and leave.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The 3 Pages That Matter Most — and What to Put on Each</h2>
          <div className="space-y-4">
            {[
              {
                page: "Homepage", color: "#4F8EF7",
                sections: [
                  { label: "Hero Headline", desc: "One sentence. What you do + who it's for + the outcome. Example: 'I help Filipino SMEs rank on Google and get clients without ads.'" },
                  { label: "Sub-headline", desc: "Expand the headline in 1-2 sentences. Add specifics about how or why you're different." },
                  { label: "Social Proof", desc: "A testimonial, a client logo, a number. Even one line from a happy client changes everything." },
                  { label: "CTA", desc: "One button. 'Book a free call', 'See my work', 'Send me a message'. Not three options." },
                ]
              },
              {
                page: "About Page", color: "#A855F7",
                sections: [
                  { label: "Start with them, not you", desc: "Lead with the problem your visitor has. Then introduce yourself as the person who solves it." },
                  { label: "Your relevant story", desc: "Not your whole life — just the part that's relevant. Why you do this work. What you've learned." },
                  { label: "Your credentials", desc: "Skills, experience, results — kept short. This isn't a resume." },
                  { label: "CTA", desc: "Even your About page needs one. 'Work with me', 'See my services', 'Get in touch'." },
                ]
              },
              {
                page: "Services Page", color: "#22C55E",
                sections: [
                  { label: "Service name + one-line description", desc: "Name it what your clients would call it, not what you call it internally." },
                  { label: "Who it's for", desc: "Be specific. 'This is for small business owners who want X and don't want Y.'" },
                  { label: "What's included", desc: "Clear bullet list. Manage expectations before they even contact you." },
                  { label: "Outcome", desc: "End with what they walk away with. The transformation, not just the deliverable." },
                ]
              },
            ].map((section) => (
              <div key={section.page} className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
                <p className="font-sans text-[17px] font-bold mb-4" style={{ color: section.color }}>{section.page}</p>
                <div className="space-y-3">
                  {section.sections.map((s) => (
                    <div key={s.label}>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/70 mb-1">{s.label}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.6]">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">20 minutes · Claude (recommended for copy)</p>
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mb-4">
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">Prompt to use</p>
              <p className="font-mono text-[15px] text-[#FFD23F] leading-[1.7]">Write the homepage copy for my website. I [what you do]. My target client is [describe them]. My main offer is [your service/product]. The tone should be [conversational / professional / bold]. Write: 1) A hero headline (one punchy sentence), 2) A sub-headline (1-2 sentences), 3) Three bullet points of what I offer, 4) One CTA button label. Give me 2 variations of the headline.</p>
            </div>
            <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
              <div className="flex items-center gap-2 mb-3"><CheckSquare size={14} className="text-[#22C55E]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span></div>
              <div className="space-y-2">
                {["I have a homepage headline I'm happy with", "I have a services description that clearly states what I offer and who it's for", "My copy has a single CTA — not multiple competing ones"].map((item) => (
                  <label key={item} className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded cursor-pointer" />
                    <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/5 border border-[#A78BFA]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3"><Lightbulb size={14} className="text-[#A78BFA]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[1.5px]">Reflect</span></div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">Read your homepage headline out loud. <span className="text-white font-bold">Would a stranger know in 5 seconds what you do and if they need it?</span> If not, simplify.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {["Copy drives conversions. A ₱0 site with great copy will outperform a ₱50,000 site with weak copy.", "Your homepage has one job: get the visitor to take the next step. Write every word with that in mind.", "Lead with what's in it for them — not your credentials, your company history, or your tools.", "Use Claude to draft. Then edit heavily. AI copy needs your voice, your specifics, your truth."].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-[7px] shrink-0" style={{ backgroundColor: COLOR }} />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3"><Trophy size={14} className="text-[#F59E0B]" /><span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge</span></div>
            <p className="font-sans text-[16px] font-bold text-white mb-2">Show your copy to someone who doesn't know what you do.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">Send your homepage headline and services section to a friend or family member who has no context. Ask: "What do you think I do? Who do you think I help?" Their answer reveals how clear (or unclear) your copy actually is.</p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">Next Lesson</p>
              <p className="font-sans text-[17px] font-bold text-white">Building a Portfolio Site with Claude</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">Website Creation · Lesson 5 of 7 · 15 min</p>
            </div>
            <a href="/learn/skills/website-creation/building-a-portfolio-site-with-claude" className="inline-flex items-center gap-2 text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0 hover:opacity-90 transition-opacity" style={{ backgroundColor: COLOR }}>
              Next <ArrowRight size={14} />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
