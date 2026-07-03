import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Claude Projects & Memory — Meet Your AI Team | Cyberussell",
  description:
    "Create a Claude Project with custom instructions so every conversation starts already knowing your context.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/claude-projects-and-memory" },
};

export default function ClaudeProjectsPage() {
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
            <span className="text-white/60">Claude Projects &amp; Memory</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Claude
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Claude Guide 2 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Claude Projects &amp; Memory
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Set it up once. Every conversation in that Project starts already knowing your business, your goals, and your preferred style.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Create a Claude Project with custom instructions so every conversation starts already knowing your context.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Without Projects, every Claude conversation starts completely blank. Claude does not know who you are, what you do, what tone you prefer, or what you are working on. You have to re-explain everything every time.
            </p>
            <p>
              With Projects, you write your instructions once. From that point on, every new conversation in that Project loads your context automatically. Claude already knows what it needs to know before you type a single word.
            </p>
            <p>
              For anyone who uses Claude regularly — for work, for a business, for a creative project — Projects are the feature that makes the biggest difference.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="space-y-4 mb-6">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-sans text-[17px] font-bold text-white mb-3">What You Can Add to a Project</p>
              <div className="space-y-3">
                {[
                  { label: "Custom instructions", detail: "Who you are, what you do, your audience, your preferred tone. Claude applies this to every conversation." },
                  { label: "Files", detail: "Upload documents Claude can reference — your portfolio, your product list, your rate card, your style guide." },
                  { label: "Organized conversations", detail: "All chats in the Project are grouped together. Easy to find, easy to continue." },
                ].map(({ label, detail }) => (
                  <div key={label} className="flex gap-3 py-3 border-b border-white/[0.05] last:border-0">
                    <div className="w-2 h-2 rounded-full bg-[#F59E0B] mt-[5px] shrink-0" />
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/80">{label}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-0.5 leading-[1.6]">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-3">
                Example Project Instructions
              </p>
              <p className="font-mono text-[14px] text-white/75 leading-[1.9]">
                I run a small Filipino food business called Lola&rsquo;s Kitchen. I sell homemade kakanin and native sweets online. My customers are Filipino moms aged 25–45 living in Metro Manila. I deliver within the NCR area only.<br /><br />
                My social media tone is warm, friendly, and community-focused — like talking to a neighbor. Do not use corporate language.<br /><br />
                When I ask for content, always write in Filipino or Taglish unless I specifically ask for English.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Without Projects</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
                Every time Miguel asks Claude to help with his freelance writing business, he starts with: &ldquo;Hi Claude, I am a freelance content writer. My clients are small Philippine businesses. My specialties are blogs and social media captions. I charge ₱2,500 per article...&rdquo; before he can ask his actual question. It is repetitive and exhausting.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">With Projects</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Miguel creates a &ldquo;Freelance Work&rdquo; Project with all his details and uploads his portfolio and rate card. He also creates a &ldquo;Client Work&rdquo; Project for each active client with their brief.
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Now when he opens his Freelance Work Project, he just says: &ldquo;Write a proposal for a new client who runs a travel agency.&rdquo; Claude already knows Miguel&rsquo;s rates, his style, and his expertise — and writes a proposal that fits his actual business.
              </p>
              <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#F59E0B]/80 leading-[1.6]">
                  Every conversation is already contextualized. No more re-explaining from scratch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · Claude (claude.ai)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Create a Project</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Open claude.ai → click &ldquo;Projects&rdquo; in the left sidebar → click &ldquo;New Project.&rdquo; Give it a name that reflects what you use it for: &ldquo;My Business,&rdquo; &ldquo;My Freelance Work,&rdquo; &ldquo;Content Creation,&rdquo; or &ldquo;My Studies.&rdquo;
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Write your instructions</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  In the Project instructions field, write a short paragraph about yourself. Include:
                </p>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#F59E0B] leading-[1.8]">
                    I am [name]. I [describe your work, business, or goal]. My audience / customers / clients are [describe them]. My preferred tone is [warm and friendly / professional / casual]. When helping me, always [any specific instructions — e.g., write in Filipino / keep responses short / give me 3 options to choose from].
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Test it</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Start a new conversation inside your Project. Ask Claude something you normally ask but without explaining your background first. Notice how it already knows your context.
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
                "Created at least one Claude Project",
                "Added custom instructions with my name, work, and tone preferences",
                "Started a conversation in the Project and noticed how Claude already knew my context",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              How different did the conversation feel when Claude already knew your context? <span className="text-white font-bold">This is what every conversation will feel like once your Projects are set up properly.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Without Projects, every Claude conversation starts blank and you repeat yourself every time.",
              "Projects let you write your context once — name, work, tone, goals — and Claude loads it automatically in every chat.",
              "You can also upload files to a Project: your portfolio, your rate card, your product list, your brief.",
              "The best Projects are specific — one Project per area of life or work, each with focused instructions.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Upload a file to your Project.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Find a document that is relevant to your work — your resume, your product list, your portfolio, your rate card — and upload it to your Claude Project. Then test it: ask Claude a question that requires knowing what is in that file and see how it uses the information.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Claude Code</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Claude Guide 3 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/claude-code"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
