import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Programming with AI — Build Real Skills | Cyberussell",
  description: "Build real apps using AI as your coding partner. No computer science degree required — just the right approach and tools.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/programming" },
  openGraph: { title: "Programming with AI | Cyberussell", description: "Build real apps using AI as your coding partner.", url: "https://www.cyberussell.com/learn/skills/programming", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

const lessons = [
  { title: "How AI Changes Programming (and Who It's For Now)", desc: "Why you don't need to memorize syntax — and what you DO need to understand.", href: "/learn/skills/programming/how-ai-changes-programming" },
  { title: "Your First App with Claude: Idea to Working Code", desc: "Build a real app from scratch by prompting Claude — step by step.", href: "/learn/skills/programming/your-first-app-with-claude" },
  { title: "Reading and Understanding AI-Generated Code", desc: "How to make sense of the code AI writes so you can debug it and own it.", href: "/learn/skills/programming/reading-and-understanding-ai-generated-code" },
  { title: "HTML, CSS, and JavaScript: The Web Fundamentals", desc: "The minimum you need to understand to build and modify websites with AI.", href: "/learn/skills/programming/html-css-and-javascript" },
  { title: "Working with APIs: Connect Your App to the World", desc: "How to use external services and data in your app — with AI handling the hard parts.", href: "/learn/skills/programming/working-with-apis" },
  { title: "Debugging with AI: How to Fix Code When It Breaks", desc: "The prompting strategies that turn AI into your personal debugger.", href: "/learn/skills/programming/debugging-with-ai" },
  { title: "Deploying Your App: From Local to Live", desc: "How to get your app on the internet — and keep it running.", href: "/learn/skills/programming/deploying-your-app" },
];

export default function ProgrammingSkillPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8 flex-wrap">
            <a href="/" className="hover:text-white transition-colors">Home</a><span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a><span>/</span>
            <a href="/learn/skills" className="hover:text-white transition-colors">Build Real Skills</a><span>/</span>
            <span className="text-white/60">Programming</span>
          </nav>
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">Pillar 5 · Programming</span>
          </div>
          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">Programming</h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            AI has made programming accessible to non-technical people for the first time. You don&rsquo;t need a CS degree — you need to know how to describe what you want. This track takes you from zero to deploying a real app.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50"><span className="text-white/70 font-bold">Outcome:</span> You build and deploy a working web application using AI as your coding partner.</p>
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
