import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Foundations — Learn to Work with AI | Cyberussell",
  description:
    "Understand how modern AI works, its strengths and weaknesses, and build the mindset to use it effectively before you rely on it.",
  alternates: { canonical: "https://www.cyberussell.com/learn/foundations" },
};

const topics = [
  { title: "What AI Actually Is", desc: "AI doesn't think — it predicts. The one idea that changes how you use it.", soon: false, href: "/learn/foundations/what-ai-actually-is" },
  { title: "What AI Is Good At", desc: "Five task types where AI consistently delivers useful results — and why.", soon: false, href: "/learn/foundations/what-ai-is-good-at" },
  { title: "Where AI Fails", desc: "AI fails predictably, not randomly. Know the three failure categories before you prompt.", soon: false, href: "/learn/foundations/where-ai-fails" },
  { title: "Why AI Makes Things Up", desc: "Hallucination explained — and the one rule for catching it before it causes problems.", soon: false, href: "/learn/foundations/why-ai-makes-things-up" },
  { title: "How to Choose the Right AI", desc: "ChatGPT, Claude, Gemini — a simple framework for picking the right tool for any task.", soon: false, href: "/learn/foundations/how-to-choose-the-right-ai" },
  { title: "Your First Real Prompt", desc: "Four elements that make a prompt work. Write one for a task you actually need.", soon: false, href: "/learn/foundations/your-first-real-prompt" },
  { title: "What Not to Share with AI", desc: "One practical rule for protecting your personal and professional information.", soon: false, href: "/learn/foundations/what-not-to-share-with-ai" },
];

export default function FoundationsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <span className="text-white/60">AI Foundations</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-4 py-1.5 mb-6">
            <BookOpen size={12} className="text-[#4F8EF7]" />
            <span className="text-[#4F8EF7] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 1
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            AI Foundations
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Before you rely on AI, you need to understand it. This pillar teaches you how modern AI
            actually works, where it excels, and where it fails — so you use it with confidence, not blind trust.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You understand AI before trusting it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map((topic) => {
              const CardTag = topic.href ? "a" : "div";
              return (
              <CardTag
                key={topic.title}
                {...(topic.href ? { href: topic.href } : {})}
                className={`bg-[#18181F] border rounded-[12px] p-5 flex items-start gap-4 ${
                  topic.soon ? "border-white/[0.06] opacity-60" : "border-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#4F8EF7]/10 flex items-center justify-center shrink-0 mt-0.5">
                  {topic.soon ? (
                    <Lock size={14} className="text-[#4F8EF7]/50" />
                  ) : (
                    <BookOpen size={14} className="text-[#4F8EF7]" />
                  )}
                </div>
                <div>
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{topic.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{topic.desc}</p>
                  {topic.soon && (
                    <span className="mt-2 inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Coming soon</span>
                  )}
                </div>
              </CardTag>
              );
            })}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/learn" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← Back to AI Academy
            </a>
            <a href="/learn/think" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next: Think with AI →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
