import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ChatGPT Voice Mode — Meet Your AI Team | Cyberussell",
  description:
    "Have your first real voice conversation with ChatGPT — and use it for a task you normally do by typing.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/chatgpt-voice-mode" },
};

export default function ChatGPTVoiceModePage() {
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
            <a href="/learn/ai-team" className="hover:text-white transition-colors">Meet Your AI Team</a>
            <span>/</span>
            <span className="text-white/60">ChatGPT Voice Mode</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#10B981] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              ChatGPT
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · ChatGPT Guide 3 of 6
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            ChatGPT Voice Mode
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Talk to ChatGPT like a person. No typing needed — just speak naturally and it responds.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#10B981]/8 border border-[#10B981]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Have your first real voice conversation with ChatGPT — and use it for a task you normally do by typing.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Typing is slow. Especially when you are commuting, doing chores, or when your hands are busy. And sometimes the ideas in your head are easier to speak than to type.
            </p>
            <p>
              Voice Mode lets you talk to ChatGPT like you are talking to a real person. It listens, responds out loud, and you can interrupt it — just like a real conversation. No clicking, no typing, no waiting.
            </p>
            <p>
              For Filipino learners and workers, this opens up a use case that is genuinely life-changing: practicing English conversation in a safe, judgment-free environment — anytime, anywhere.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-3">Advanced Voice Mode</p>
            <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-3">
              <p>
                Advanced Voice Mode is available in the ChatGPT mobile app (iOS and Android). ChatGPT Plus users get priority access, but free users can access it in limited amounts.
              </p>
              <p>
                You speak naturally. ChatGPT listens, understands, and responds out loud in a natural voice. You can interrupt it mid-sentence. It can pick up on your tone and adjust how it responds.
              </p>
            </div>
          </div>

          <div className="bg-[#10B981]/5 border border-[#10B981]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-3">
              Best Uses for Filipino Beginners
            </p>
            <div className="space-y-2">
              {[
                "Practice English conversation — job interviews, client calls, presentations",
                "Think through a problem out loud while commuting or walking",
                "Get coaching or advice on a decision you are facing",
                "Practice giving a speech or presentation",
                "Ask questions while your hands are busy (cooking, cleaning, commuting)",
              ].map((use) => (
                <div key={use} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-[6px] shrink-0" />
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7]">{use}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">The Situation</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
                Carlo is a Filipino freelancer applying for virtual assistant jobs with international clients. His biggest fear is the video interview — his English is good enough to write, but he gets nervous speaking it out loud with a foreign client listening.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-4">How Voice Mode Helps</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Every morning on his commute from Cainta to Makati, Carlo opens ChatGPT Voice Mode and says: <span className="text-white italic">&ldquo;Let&rsquo;s practice. You are interviewing me for a virtual assistant position. Ask me questions one at a time, give me feedback after each answer, and correct my grammar gently.&rdquo;</span>
              </p>
              <div className="bg-[#10B981]/8 border border-[#10B981]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#10B981]/80 leading-[1.6]">
                  After two weeks of daily practice, Carlo&rsquo;s confidence in spoken English improved dramatically — and he landed his first international client.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 10 minutes · ChatGPT mobile app</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Open the ChatGPT mobile app on your phone. (Download it free from the App Store or Google Play if you do not have it.)
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Tap the headphones icon or the sound wave icon at the bottom of the chat screen to enter Voice Mode.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Say this to start</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[14px] text-[#10B981] leading-[1.8]">
                    &ldquo;Let&rsquo;s practice. Ask me a job interview question for a virtual assistant position. After I answer, give me feedback — what I did well and what I can improve. Then ask me the next question.&rdquo;
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 4</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Have a 5-turn voice conversation. Answer 5 questions and receive feedback on each one.
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
                "Opened ChatGPT Voice Mode on my phone",
                "Had a 5-turn voice conversation with ChatGPT",
                "Got feedback on my speaking",
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
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              How did it feel to speak to an AI out loud? <span className="text-white font-bold">Was it strange at first? What would you use Voice Mode for in your real life — commuting, practicing, thinking out loud?</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Voice Mode lets you talk to ChatGPT naturally — no typing, just speaking. It listens and responds out loud.",
              "You can interrupt ChatGPT mid-sentence, just like a real conversation.",
              "For Filipino learners, Voice Mode is one of the best tools for practicing English in a safe, judgment-free environment.",
              "Voice Mode is in the ChatGPT mobile app — look for the headphones or sound wave icon.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-[7px] shrink-0" />
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Use Voice Mode every day for one week.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              Pick one activity you do daily — commuting, a morning walk, washing dishes — and use that time for a voice conversation with ChatGPT. It can be practice, brainstorming, or just thinking out loud about a problem you are working on.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">ChatGPT Image Generation</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Meet Your AI Team · ChatGPT Guide 4 of 6 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/chatgpt-image-generation"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
