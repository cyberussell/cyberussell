import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Brain, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Think with AI — Learn to Collaborate, Not Just Prompt | Cyberussell",
  description:
    "Learn how to collaborate with AI — break problems down, ask better questions, iterate, critique outputs, and make smarter decisions.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think" },
};

const topics = [
  { title: "Breaking Problems Into Smaller Tasks", desc: "Why smaller questions get better answers.", soon: false },
  { title: "Asking Better Questions", desc: "The difference between a prompt and a good prompt.", soon: false },
  { title: "Providing Context", desc: "How context changes everything AI gives you.", soon: true },
  { title: "Giving Examples", desc: "Show AI what 'good' looks like before you ask.", soon: true },
  { title: "Iterating with AI", desc: "One shot rarely works. Learn to refine.", soon: true },
  { title: "Critiquing AI Answers", desc: "How to evaluate and push back on AI output.", soon: true },
  { title: "Comparing Outputs", desc: "Run the same prompt across AIs. See the difference.", soon: true },
  { title: "Thinking Critically", desc: "Your judgment is still the most important input.", soon: true },
  { title: "AI-Assisted Decision Making", desc: "Use AI to explore options, not decide for you.", soon: true },
];

export default function ThinkPage() {
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
            <span className="text-white/60">Think with AI</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#A855F7]/10 border border-[#A855F7]/20 rounded-full px-4 py-1.5 mb-6">
            <Brain size={12} className="text-[#A855F7]" />
            <span className="text-[#A855F7] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 2
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Think with AI
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            This is Cyberussell&rsquo;s biggest differentiator. Most people treat AI like a search engine —
            one question, one answer. This pillar teaches you to genuinely collaborate: breaking
            problems apart, iterating, critiquing, and making smarter decisions together with AI.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You stop one-shot asking and start co-thinking.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {topics.map((topic) => (
              <div
                key={topic.title}
                className={`bg-[#18181F] border rounded-[12px] p-5 flex items-start gap-4 ${
                  topic.soon ? "border-white/[0.06] opacity-60" : "border-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                }`}
              >
                <div className="w-8 h-8 rounded-lg bg-[#A855F7]/10 flex items-center justify-center shrink-0 mt-0.5">
                  {topic.soon ? (
                    <Lock size={14} className="text-[#A855F7]/50" />
                  ) : (
                    <Brain size={14} className="text-[#A855F7]" />
                  )}
                </div>
                <div>
                  <h3 className="font-sans text-[15px] font-bold text-white mb-1">{topic.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5]">{topic.desc}</p>
                  {topic.soon && (
                    <span className="mt-2 inline-block text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px]">Coming soon</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/learn/foundations" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← AI Foundations
            </a>
            <a href="/learn/ai-team" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next: Meet Your AI Team →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
