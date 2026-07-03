import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Writing & Copywriting with AI — Build Real Skills | Cyberussell",
  description: "Learn how to write compelling content and copy using AI. From blog posts to sales pages — AI makes you a faster, better writer.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting" },
  openGraph: { title: "Writing & Copywriting with AI | Cyberussell", description: "Write better content and copy faster with AI.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const lessons = [
  { title: "The Difference Between Writing and Copywriting", desc: "Why copywriting pays more — and how AI changes both.", href: "/learn/skills/writing-copywriting/the-difference-between-writing-and-copywriting" },
  { title: "Finding Your Voice: AI That Sounds Like You", desc: "How to train AI to write in your tone so the output doesn't sound robotic.", href: "/learn/skills/writing-copywriting/finding-your-voice" },
  { title: "Blog Writing at Scale: Research, Outline, Draft, Edit", desc: "The full AI-assisted workflow for producing high-quality blog content fast.", href: "/learn/skills/writing-copywriting/blog-writing-at-scale" },
  { title: "Sales Copy That Converts: Headlines, CTAs, and Offers", desc: "Copywriting formulas (AIDA, PAS) applied with AI to write copy that sells.", href: "/learn/skills/writing-copywriting/sales-copy-that-converts" },
  { title: "Email Writing: Newsletters, Cold Outreach, and Sequences", desc: "Use Claude to draft emails that get opened, read, and replied to.", href: "/learn/skills/writing-copywriting/email-writing" },
  { title: "Writing for Social Media: Short-Form That Gets Attention", desc: "The rules of writing for TikTok, LinkedIn, and Facebook — with AI shortcuts.", href: "/learn/skills/writing-copywriting/writing-for-social-media" },
  { title: "Editing AI Output: How to Spot and Fix What's Off", desc: "AI writes fast but it makes mistakes. Learn to edit for accuracy, tone, and flow.", href: "/learn/skills/writing-copywriting/editing-ai-output" },
];

export default function WritingCopywritingSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <span className="text-white/60">Writing & Copywriting</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 · Writing & Copywriting</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">Writing & Copywriting</h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Writing is the skill that makes everything else work — your website, your marketing, your pitches. AI makes you 10x faster. This track teaches you to write content that earns attention and copy that drives action.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50"><span className="text-white/70 font-bold">Outcome:</span> You write persuasive content and copy using AI as your co-writer.</p>
          </div>
          <div className="flex flex-col gap-3">
            {lessons.map((lesson, i) => (
              <a key={lesson.title} href={lesson.href} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5 flex items-start gap-4 hover:border-[#E8373A]/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#E8373A] text-[12px] font-bold font-[family-name:var(--font-inter)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[16px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#E8373A]/60 shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">← Back to Build Real Skills</a>
        </section>
      </main>
      <Footer />
    </>
  );
}
