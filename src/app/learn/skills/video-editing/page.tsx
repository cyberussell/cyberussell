import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Video Editing with AI — Build Real Skills | Cyberussell",
  description: "Edit videos faster with AI tools. Auto-captions, smart cuts, audio cleanup, and batch processing for content creators.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/video-editing" },
  openGraph: { title: "Video Editing with AI | Cyberussell", description: "Edit videos faster with AI — auto-captions, smart cuts, and batch processing.", url: "https://www.cyberussell.com/learn/skills/video-editing", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const lessons = [
  { title: "AI Video Editing Tools: What's Actually Worth Using", desc: "A real breakdown of CapCut AI, Descript, Runway, and others — what they do and when.", href: "/learn/skills/video-editing/ai-video-editing-tools-overview" },
  { title: "Auto-Captions and Subtitles: Reach More Viewers", desc: "How to add accurate captions in minutes using AI transcription tools.", href: "/learn/skills/video-editing/auto-captions-and-subtitles" },
  { title: "Cutting and Trimming with AI Assistance", desc: "Tools that detect silence, highlight key moments, and cut your edit time in half.", href: "/learn/skills/video-editing/cutting-and-trimming-with-ai" },
  { title: "Voiceover and Audio Cleanup with AI", desc: "Remove background noise, fix audio, and generate voiceovers without a studio.", href: "/learn/skills/video-editing/voiceover-and-audio-cleanup" },
  { title: "Short-Form Video: Reels and TikTok Editing Flow", desc: "The editing rhythm that works for short-form content — with AI doing the heavy lifting.", href: "/learn/skills/video-editing/short-form-video-editing-flow" },
  { title: "Batch Processing: Edit Multiple Videos at Once", desc: "How to use AI tools to produce content at volume without sacrificing quality.", href: "/learn/skills/video-editing/batch-processing" },
];

export default function VideoEditingSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <span className="text-white/60">Video Editing</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 · Video Editing</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">Video Editing</h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Video is the highest-engagement content format — and AI has made it accessible to anyone with a phone. This track teaches you to edit professional-quality videos in a fraction of the time using AI-powered tools.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50"><span className="text-white/70 font-bold">Outcome:</span> You edit and publish professional videos in under 30 minutes using AI tools.</p>
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
