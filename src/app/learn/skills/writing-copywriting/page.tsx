import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing & Copywriting with AI — Build Real Skills | Cyberussell",
  description:
    "Write faster and better with AI as your co-author. From blog posts to sales copy — this track covers the writing skills that pay.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting" },
  openGraph: {
    title: "Writing & Copywriting with AI | Cyberussell",
    description: "Write faster and better with AI as your co-author.",
    url: "https://www.cyberussell.com/learn/skills/writing-copywriting",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const lessons = [
  { title: "The Difference Between Writing and Copywriting", desc: "Why copywriting pays more — and how AI changes both.", soon: true },
  { title: "Finding Your Voice: AI That Sounds Like You", desc: "How to train AI to write in your tone so the output doesn't sound robotic.", soon: true },
  { title: "Blog Writing at Scale: Research, Outline, Draft, Edit", desc: "The full AI-assisted workflow for producing high-quality blog content fast.", soon: true },
  { title: "Sales Copy That Converts: Headlines, CTAs, and Offers", desc: "Copywriting formulas (AIDA, PAS) applied with AI to write copy that sells.", soon: true },
  { title: "Email Writing: Newsletters, Cold Outreach, and Sequences", desc: "Use Claude to draft emails that get opened, read, and replied to.", soon: true },
  { title: "Writing for Social Media: Short-Form That Gets Attention", desc: "The rules of writing for TikTok, LinkedIn, and Facebook — with AI shortcuts.", soon: true },
  { title: "Editing AI Output: How to Spot and Fix What's Off", desc: "AI writes fast but it makes mistakes. Learn to edit for accuracy, tone, and flow.", soon: true },
];

export default function WritingCopywritingSkillPage() {
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
            <span className="text-white/60">Writing & Copywriting</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 5 · Writing & Copywriting
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Writing & Copywriting
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Writing is still one of the most in-demand freelance skills — and AI makes you 10x faster at it.
            This track teaches you how to write content that actually works: blog posts, sales pages, emails,
            and social copy that gets results.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-6">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You write content that earns — faster than anyone doing it manually.
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
