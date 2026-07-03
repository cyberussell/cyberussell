import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ChatGPT Memory & Projects — Meet Your AI Team | Cyberussell",
  description:
    "Set up ChatGPT Memory so it remembers who you are — and create a Project for something you work on regularly.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/chatgpt-memory-and-projects" },
};

export default function ChatGPTMemoryPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        {/* Breadcrumb */}
        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/ai-team" className="hover:text-white transition-colors">Meet Your AI Team</a>
            <span>/</span>
            <span className="text-white/60">ChatGPT Memory &amp; Projects</span>
          </nav>
        </div>

        {/* Hero */}
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
            Meet Your AI Team · ChatGPT Guide 2 of 6
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            ChatGPT Memory &amp; Projects
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Stop explaining yourself every single conversation. Let ChatGPT remember who you are.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#10B981]/8 border border-[#10B981]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Set up ChatGPT Memory so it remembers who you are — and create a Project for something you work on regularly.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Every time you start a new ChatGPT conversation, it starts completely blank. It does not know your name, your job, your goals, or your business. You have to explain everything from scratch — every single time.
            </p>
            <p>
              That is exhausting and slow. Especially if you use ChatGPT for the same kinds of tasks every week.
            </p>
            <p>
              ChatGPT has two features that fix this: <strong className="text-white">Memory</strong> and <strong className="text-white">Projects</strong>. Together, they turn ChatGPT from a stranger you meet every day into a colleague who already knows your work.
            </p>
          </div>
        </section>

        {/* Core Concept */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="space-y-4 mb-8">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-sans text-[18px] font-bold text-white mb-3">Feature 1: Memory</p>
              <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-3">
                <p>
                  ChatGPT can automatically remember things it learns about you across conversations. Over time, it builds up a picture of who you are — your name, your work, your preferences, your goals.
                </p>
                <p>
                  You can also tell it things directly. Just say in chat: <span className="text-white italic">&ldquo;Remember that I run a small online shop selling Filipino snacks. My customers are mostly OFW families in the US and Canada.&rdquo;</span>
                </p>
                <p>
                  ChatGPT will store this and use it in future conversations automatically.
                </p>
              </div>
              <div className="mt-4 bg-[#10B981]/5 border border-[#10B981]/15 rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#10B981]/80 leading-[1.6]">
                  To manage your memories: Settings → Personalization → Memory → View or delete saved memories anytime.
                </p>
              </div>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-sans text-[18px] font-bold text-white mb-3">Feature 2: Projects</p>
              <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-3">
                <p>
                  A Project is like a folder for related conversations. Instead of mixing your business chats, your personal learning, and your side hustle brainstorming in one messy list — you organize them into separate Projects.
                </p>
                <p>
                  Each Project can have its own custom instructions. For example, your &ldquo;Social Media&rdquo; project might always know: <span className="text-white italic">&ldquo;I run a food business. My audience is Filipino families. Always write in a warm, friendly tone.&rdquo;</span>
                </p>
                <p>
                  Every conversation in that project starts with that context already loaded.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Without Memory</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Maria opens ChatGPT every day to get help with her small food business. Every single conversation starts the same way:
              </p>
              <p className="font-mono text-[14px] text-white/50 leading-[1.8] mb-3 italic">
                &ldquo;Hi, I run a small business selling homemade longganisa. My customers are Filipino families in Bulacan...&rdquo;
              </p>
              <div className="bg-[#E8373A]/8 border border-[#E8373A]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#E8373A]/80 leading-[1.6]">
                  She spends 2 minutes explaining herself before every conversation. That is wasted time — and she sometimes forgets to mention important details.
                </p>
              </div>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-4">With Memory + Projects</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Maria sets up Memory and a &ldquo;My Business&rdquo; Project. Now when she opens ChatGPT:
              </p>
              <p className="font-mono text-[14px] text-white/80 leading-[1.8] mb-3 italic">
                &ldquo;Give me 3 ideas for a Facebook post about the upcoming holidays.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                ChatGPT already knows she sells longganisa, her audience is local families, and her tone is warm and community-oriented. The suggestions are immediately relevant and ready to use.
              </p>
              <div className="bg-[#10B981]/8 border border-[#10B981]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#10B981]/80 leading-[1.6]">
                  Every conversation gets better over time because ChatGPT keeps learning and remembering more about her business.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Exercise */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · ChatGPT (free or paid)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Turn on Memory</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Open ChatGPT → click your profile icon (top right) → Settings → Personalization → turn on Memory.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Tell ChatGPT who you are</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Start a new conversation and type:
                </p>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#10B981] leading-[1.8]">
                    Remember that I am [your name]. I [describe what you do — e.g., run a small online shop / work as a freelance VA / study at [school] / work as a nurse]. My goal with ChatGPT is to [your goal — e.g., write better social media content / get help with my business / learn new skills]. Please remember this and use it to give me more relevant answers.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Create a Project</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Click &ldquo;Projects&rdquo; in the left sidebar → New Project. Name it something you work on regularly — &ldquo;My Business,&rdquo; &ldquo;My Freelance Work,&rdquo; or &ldquo;Content Creation.&rdquo; Add a brief instruction like the one above so every chat in this project starts knowing your context.
                </p>
              </div>
            </div>
          </div>

          {/* Mark Complete */}
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {[
                "Turned on ChatGPT Memory in Settings",
                "Told ChatGPT who I am and what I do",
                "Created at least one Project with custom instructions",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Reflection */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              What are the 3 most important things about you that ChatGPT should always know? <span className="text-white font-bold">The more specific and accurate your memory setup, the more useful every future conversation becomes.</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">
              You do not need to write it down. Just think.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Without Memory, you start from scratch every conversation — ChatGPT knows nothing about you.",
              "With Memory enabled, ChatGPT learns about you over time and gives more relevant answers automatically.",
              "You can also tell ChatGPT things directly in chat — it will remember them for future conversations.",
              "Projects organize your conversations by topic and let you set custom instructions so every chat starts already knowing your context.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#F59E0B]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge — Optional</span>
            </div>
            <p className="font-sans text-[16px] font-bold text-white mb-2">Create 3 Projects for your real life.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Think of 3 areas where you use ChatGPT regularly — or want to start using it. Create a Project for each one with specific instructions. Good examples: Work / Client Projects, Learning &amp; Study, Side Business, Personal Life.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/35 mt-3 italic">
              After one week, notice how much less time you spend explaining yourself to ChatGPT.
            </p>
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">ChatGPT Voice Mode</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · ChatGPT Guide 3 of 6 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/chatgpt-voice-mode"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
