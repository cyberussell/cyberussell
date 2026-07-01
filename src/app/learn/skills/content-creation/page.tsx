import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Content Creation with AI — Build Real Skills | Cyberussell",
  description: "Learn to create content consistently with AI — from scripting and ideation to scheduling and growing an audience.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/content-creation" },
  openGraph: { title: "Content Creation with AI | Cyberussell", description: "Create consistent content with AI tools.", url: "https://www.cyberussell.com/learn/skills/content-creation", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const lessons = [
  { title: "The Content Creator's AI Stack", desc: "Which AI tools to use for ideation, scripting, editing, and distribution.", href: "/learn/skills/content-creation/the-content-creators-ai-stack" },
  { title: "Idea Generation at Scale: Never Run Out of Content", desc: "Use ChatGPT to generate 30 days of content ideas in under 10 minutes.", href: "/learn/skills/content-creation/idea-generation-at-scale" },
  { title: "Scripting Short-Form Video with AI", desc: "Write TikTok and Reels scripts that hook viewers in the first 3 seconds.", href: "/learn/skills/content-creation/scripting-short-form-video-with-ai" },
  { title: "Repurposing Content: One Idea, Many Formats", desc: "Turn one blog post into tweets, a video script, a carousel, and a newsletter with AI.", href: "/learn/skills/content-creation/repurposing-content" },
  { title: "Building a Content Calendar You'll Actually Stick To", desc: "How to plan a month of content in one AI session and stay consistent.", href: "/learn/skills/content-creation/building-a-content-calendar" },
  { title: "Growing an Audience with AI-Assisted Strategy", desc: "How to study what works, double down, and grow — using AI as your analytics partner.", href: "/learn/skills/content-creation/growing-an-audience" },
];

export default function ContentCreationSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <span className="text-white/60">Content Creation</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 · Content Creation</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">Content Creation</h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Content is how you build an audience, attract clients, and establish expertise online. AI removes the biggest barrier to consistent content: time. This track teaches you to create more, faster, without burning out.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50"><span className="text-white/70 font-bold">Outcome:</span> You post consistently and grow an audience using AI-assisted workflows.</p>
          </div>
          <div className="flex flex-col gap-3">
            {lessons.map((lesson, i) => (
              <a key={lesson.title} href={lesson.href} className="bg-[#18181F] border border-white/[0.08] rounded-[12px] p-5 flex items-start gap-4 hover:border-[#E8373A]/30 transition-all">
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-[#E8373A] text-[12px] font-bold font-[family-name:var(--font-inter)]">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                </div>
                <ArrowRight size={16} className="text-[#E8373A]/60 shrink-0 mt-1" />
              </a>
            ))}
          </div>
        </section>
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">← Back to Build Real Skills</a>
        </section>
      </main>
      <Footer />
    </>
  );
}
