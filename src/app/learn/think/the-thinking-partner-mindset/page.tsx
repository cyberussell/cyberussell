import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb, Trophy } from "lucide-react";

export const metadata: Metadata = {
  title: "The Thinking Partner Mindset — Think with AI | Cyberussell",
  description:
    "How to reframe your relationship with AI from search engine to collaborative thinking partner.",
  alternates: { canonical: "https://www.cyberussell.com/learn/think/the-thinking-partner-mindset" },
  openGraph: {
    title: "The Thinking Partner Mindset | Cyberussell",
    description: "How to reframe your relationship with AI from search engine to collaborative thinking partner.",
    url: "https://www.cyberussell.com/learn/think/the-thinking-partner-mindset",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

export default function GuideTwoPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/think" className="hover:text-white transition-colors">Think with AI</a>
            <span>/</span>
            <span className="text-white/60">The Thinking Partner Mindset</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#A78BFA] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Mindset Guide
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              7 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Think with AI · Guide 2 of 12
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            The Thinking Partner Mindset
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            The small mindset shift that changes everything about how you use AI.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/8 border border-[#A78BFA]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Describe the difference between using AI as a tool and using it as a thinking partner — and use it the right way in a real conversation.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              There is a version of AI use that gets you 10% of the value. And there is a version that gets you everything. The difference is not which AI you use or how long your prompts are.
            </p>
            <p>
              The difference is your relationship to the tool. Do you see it as a machine that produces answers — or as a collaborator that thinks with you?
            </p>
            <p>
              This sounds like a small distinction. It is not. It changes how you prompt, how you respond, and what you walk away with.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-[#E8373A]/5 border border-[#E8373A]/15 rounded-[14px] p-5">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#E8373A]/80 uppercase tracking-[1.5px] mb-3">Tool Mode</p>
              <ul className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] space-y-2">
                <li>You ask. AI answers. Done.</li>
                <li>You treat the output as a final product.</li>
                <li>You leave when the answer arrives.</li>
                <li>AI serves a request.</li>
              </ul>
            </div>
            <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E]/80 uppercase tracking-[1.5px] mb-3">Partner Mode</p>
              <ul className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] space-y-2">
                <li>You think out loud. AI responds.</li>
                <li>You react, push back, redirect.</li>
                <li>The conversation finds the insight.</li>
                <li>AI challenges you to think better.</li>
              </ul>
            </div>
          </div>

          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4 mb-6">
            <p>
              The shift is small. The results are not. A thinking partner does not just answer your questions — it asks better ones back.
            </p>
            <p>
              When you are in partner mode, you stop waiting for AI to give you the answer. You start using AI to help you find the answer yourself. That is a fundamentally different experience — and it produces fundamentally different outputs.
            </p>
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px] mb-3">
              The Brilliant Friend Analogy
            </p>
            <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.9] space-y-3">
              <p>
                Imagine you have a brilliant friend who has read everything — medicine, law, business, psychology, design. You can call them any time.
              </p>
              <p>
                If you treat them like a librarian — "just find me the page I need" — they give you a page. If you treat them like a thinking partner — "I am working through a problem and I need a smart person to think with me" — they help you actually solve it.
              </p>
              <p className="text-white/80">
                The friend is the same either way. Your relationship to them determines what you get.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Tool Mode</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-2">
                <span className="text-white/80 italic">"Write me a caption for my food business post."</span>
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 leading-[1.7]">
                AI writes a generic caption. You post it. Nothing happens.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[2px] mb-4">Partner Mode</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-2">
                <span className="text-white/80 italic">"I run a small sari-sari store in Cavite and want to grow on Facebook. My customers are mostly moms aged 25-45. Help me think through what kind of content would actually make them want to follow my page."</span>
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 leading-[1.7]">
                AI asks clarifying questions. You go back and forth. You land on a content angle that is specific to your store, your community, and your customers. You write a caption that gets actual comments.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 10 minutes · ChatGPT, Claude, or Gemini</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Your Task</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Think of something real you are working on — a project, a goal, a problem. Replace [your real situation] in the prompt below with one or two sentences about it.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Prompt — use this exactly
                </p>
                <p className="font-mono text-[14px] text-[#FFD23F] leading-[1.7]">
                  I want to use you as a thinking partner, not just an answering machine. Here is something I am working on: [your real situation]. Do not give me answers yet. Ask me 3 questions that will help you understand my situation better.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">What to notice</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  When AI asks YOU questions instead of giving you answers, that is partner mode. Notice how answering those questions helps you clarify your own thinking — before AI says anything useful at all.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {[
                "Sent the partner-mode prompt with a real situation",
                "AI asked me questions instead of giving instant answers",
                "I answered the questions and noticed my thinking get clearer",
                "I continued the conversation at least 2 more turns",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A78BFA]/5 border border-[#A78BFA]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A78BFA]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A78BFA] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              When AI asked you questions, did you learn something about your own situation just by answering them? <span className="text-white font-bold">What does that tell you about what a thinking partner actually does?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Tool mode gets you outputs. Partner mode gets you thinking. Both are useful — but only one transforms how you work.",
              "A thinking partner does not just answer questions — it asks better ones back. That is what you want from AI.",
              "Partner mode starts with you thinking out loud, not asking a clean question. Give AI your mess — it can handle it.",
              "The quality of AI help scales with the quality of your relationship to the tool. Change your mindset and everything else changes too.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#F59E0B]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge — Optional</span>
            </div>
            <p className="font-sans text-[15px] font-bold text-white mb-2">Catch yourself in tool mode — and switch.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Over the next 24 hours, every time you open an AI tool and type a one-line question, stop. Rewrite it in partner mode — add context, your situation, what you are actually trying to figure out. Track how different the answers feel.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&apos;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Your First Deep Conversation with AI</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Think with AI · Guide 3 of 12 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/think/your-first-deep-conversation-with-ai"
              className="inline-flex items-center gap-2 bg-[#A78BFA] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
            >
              Next Guide <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
