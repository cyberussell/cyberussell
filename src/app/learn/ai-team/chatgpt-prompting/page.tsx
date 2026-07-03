import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ChatGPT Prompting — Meet Your AI Team | Cyberussell",
  description:
    "Write a prompt that gets a useful, specific response from ChatGPT on your first try. Learn the 4-part prompt formula: Role, Task, Context, Format.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/chatgpt-prompting" },
};

export default function ChatGPTPromptingPage() {
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
            <span className="text-white/60">ChatGPT Prompting</span>
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
            Meet Your AI Team · ChatGPT Guide 1 of 6
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            ChatGPT Prompting
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            The skill that makes everything else work — how to ask ChatGPT in a way that actually gets useful results.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#10B981]/8 border border-[#10B981]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Write a prompt that gets a useful, specific response from ChatGPT on your first try.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most people type one sentence into ChatGPT and wonder why the answer is vague, too long, or completely off.
            </p>
            <p>
              The problem is not ChatGPT. The problem is the question.
            </p>
            <p>
              ChatGPT gives back what you put in. A weak prompt gets a weak answer. A strong prompt — one that gives ChatGPT enough context and direction — gets something you can actually use right away.
            </p>
            <p>
              The good news is that strong prompts follow a simple pattern. You just need to know the formula.
            </p>
          </div>
        </section>

        {/* Core Concept */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[22px] font-bold text-white mb-2">The 4-Part Prompt Formula</p>
            <p className="font-sans text-[18px] font-bold text-[#10B981]">Role + Task + Context + Format</p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              { label: "Role", color: "#10B981", desc: "Tell ChatGPT who to be. \"You are a social media expert.\" This sets the tone and expertise level of the answer." },
              { label: "Task", color: "#FFD23F", desc: "Tell ChatGPT exactly what to do. \"Write 5 Facebook post ideas.\" Be specific — not \"help me with social media.\"" },
              { label: "Context", color: "#818CF8", desc: "Give background information. \"For a small sari-sari store in Cavite that sells snacks and drinks.\" The more specific, the better." },
              { label: "Format", color: "#F472B6", desc: "Tell ChatGPT how to structure the output. \"Format each idea as: Hook + Body + Call to action.\" This saves you time editing." },
            ].map(({ label, color, desc }) => (
              <div key={label} className="bg-[#18181F] border border-white/[0.06] rounded-[12px] p-5 flex gap-4">
                <div className="w-2 shrink-0 rounded-full mt-1" style={{ backgroundColor: color, height: "auto", minHeight: "1.5rem" }} />
                <div>
                  <p className="font-sans text-[16px] font-bold text-white mb-1">{label}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#10B981]/5 border border-[#10B981]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-3">
              Full Example Prompt
            </p>
            <p className="font-mono text-[15px] text-white/80 leading-[1.8]">
              You are a social media expert. [Role]<br /><br />
              Write 5 Facebook post ideas. [Task]<br /><br />
              For a small sari-sari store in Cavite that sells snacks and drinks to neighborhood families. [Context]<br /><br />
              Format each idea as: Hook (first line to stop the scroll) + Body (2–3 sentences) + Call to action (what I want them to do). [Format]
            </p>
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Before — Weak Prompt</p>
              <p className="font-mono text-[15px] text-white/60 leading-[1.8] mb-4 italic">
                &ldquo;Give me ideas for my business.&rdquo;
              </p>
              <div className="bg-[#E8373A]/8 border border-[#E8373A]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#E8373A]/80 leading-[1.6]">
                  ChatGPT has no idea what kind of business you have, what you need, or how to format the answer. You will get a generic list of ideas that do not fit your actual situation.
                </p>
              </div>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-4">After — 4-Part Formula</p>
              <p className="font-mono text-[15px] text-white/75 leading-[1.8] mb-4">
                &ldquo;You are a digital marketing expert for small Filipino businesses. Write 3 Facebook post ideas for my online kakanin shop based in Bulacan that delivers within Metro Manila. My customers are Filipino moms aged 25–45. Format each as: Caption + Hashtags + Best time to post.&rdquo;
              </p>
              <div className="bg-[#10B981]/8 border border-[#10B981]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#10B981]/80 leading-[1.6]">
                  Now ChatGPT knows who you are, what you need, and how to format it. The answer will be specific, usable, and relevant to your actual customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Exercise */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 5 minutes · ChatGPT (free or paid)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Fill in the blanks</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Think of something you actually need help with this week. Then build a 4-part prompt using the template below.
                </p>
              </div>

              <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1.5px] mb-3">
                  Your Prompt Template
                </p>
                <p className="font-mono text-[15px] text-[#10B981] leading-[2]">
                  You are a [ROLE — e.g., writing coach, business advisor, career expert].<br /><br />
                  [TASK — e.g., Write 3 ideas / Create a plan / Help me draft]<br /><br />
                  [CONTEXT — your situation, your business, your goal, your audience]<br /><br />
                  Format the output as: [FORMAT — list, table, paragraphs, steps, etc.]
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Run it in ChatGPT</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Open ChatGPT (chatgpt.com or the app), paste your prompt, and send it. Read the full response.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Notice the difference</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Compare this to the last time you asked ChatGPT something vague. Can you see how the extra context changed the quality of the answer?
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
                "Built a 4-part prompt using Role, Task, Context, and Format",
                "Ran the prompt in ChatGPT",
                "Got a response that was specific and actually useful",
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
              Which part of the 4-part formula was hardest for you to fill in — and why? <span className="text-white font-bold">The part you struggled with most is probably the part ChatGPT needs most to give you a great answer.</span>
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
              "ChatGPT answers based on what you give it — a vague prompt always gets a vague answer.",
              "The 4-part formula is: Role (who ChatGPT should be), Task (what to do), Context (your situation), Format (how to present the output).",
              "The more specific you are about your real situation, the more useful the response will be.",
              "You do not need to be a tech expert to prompt well — you just need to think like you are briefing a helpful assistant.",
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Teach the formula to someone else.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Find a friend, family member, or co-worker who uses ChatGPT (or wants to start). Show them the 4-part formula and help them write their first structured prompt. Watch their reaction when the answer is actually useful.
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/35 mt-3 italic">
              Teaching is the fastest way to truly learn something yourself.
            </p>
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">ChatGPT Memory &amp; Projects</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · ChatGPT Guide 2 of 6 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/chatgpt-memory-and-projects"
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
