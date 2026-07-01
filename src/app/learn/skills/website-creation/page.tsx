import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Wrench, Lock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Website Creation with AI — Build Real Skills | Cyberussell",
  description:
    "Learn how to build real websites using AI tools. No code required to start — just the right prompts and the right tools.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation" },
  openGraph: {
    title: "Website Creation with AI | Cyberussell",
    description: "Build real websites with AI — no code required to start.",
    url: "https://www.cyberussell.com/learn/skills/website-creation",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const lessons = [
  { title: "Why Every Business Needs a Website in 2025", desc: "The case for building your own web presence — and why AI makes it finally accessible.", soon: false, href: "#" },
  { title: "Picking Your Stack: No-Code vs AI-Code vs Traditional", desc: "Compare your options before you commit to any platform.", soon: true },
  { title: "Planning Your Site with AI Before You Build", desc: "Use ChatGPT to map out structure, content, and goals before touching any tool.", soon: true },
  { title: "Writing Website Copy That Actually Converts", desc: "AI-assisted copywriting for your homepage, about page, and services.", soon: true },
  { title: "Building a Portfolio Site with Claude", desc: "Step-by-step: prompt Claude to generate a complete portfolio in one session.", soon: true },
  { title: "SEO Basics Built Into Your Site from Day One", desc: "The minimum SEO setup every website should have — and how AI helps you do it fast.", soon: true },
  { title: "Launching, Testing, and Getting Feedback", desc: "How to ship your first version and use AI to iterate based on real feedback.", soon: true },
];

export default function WebsiteCreationSkillPage() {
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
            <span className="text-white/60">Website Creation</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-6">
            <Wrench size={12} className="text-[#E8373A]" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 5 · Website Creation
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Website Creation
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            You don&rsquo;t need to be a developer to build a real website anymore. AI has changed what&rsquo;s possible —
            and this skill track teaches you how to plan, build, and launch a site using AI as your co-builder.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You ship a real website — not just a template — using AI.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {lessons.map((lesson, i) => (
              <div
                key={lesson.title}
                className={`bg-[#18181F] border rounded-[12px] p-5 flex items-start gap-4 ${
                  lesson.soon
                    ? "border-white/[0.06] opacity-60"
                    : "border-white/[0.08] hover:border-[#E8373A]/30 transition-all"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#E8373A]/10 flex items-center justify-center shrink-0 mt-0.5">
                  {lesson.soon ? (
                    <Lock size={14} className="text-[#E8373A]/40" />
                  ) : (
                    <span className="text-[#E8373A] text-[12px] font-bold font-[family-name:var(--font-inter)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{lesson.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{lesson.desc}</p>
                  {lesson.soon && (
                    <span className="mt-2 inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Coming soon</span>
                  )}
                </div>
                {!lesson.soon && lesson.href && (
                  <a href={lesson.href} className="shrink-0 mt-1">
                    <ArrowRight size={16} className="text-[#E8373A]/60 hover:text-[#E8373A] transition-colors" />
                  </a>
                )}
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
