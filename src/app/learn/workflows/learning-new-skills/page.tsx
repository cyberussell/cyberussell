import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Learning New Skills Workflow — AI Workflows | Cyberussell",
  description:
    "Learn any new skill faster by using ChatGPT and Claude as your personal tutors — with a structured study plan.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/learning-new-skills" },
  openGraph: {
    title: "Learning New Skills Workflow — AI Workflows | Cyberussell",
    description: "Learn any new skill faster by using ChatGPT and Claude as your personal tutors — with a structured study plan.",
    url: "https://www.cyberussell.com/learn/workflows/learning-new-skills",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const steps = [
  {
    toolLabel: "You",
    dotColor: "#FFD23F",
    step: "Step 1",
    title: "Choose your skill and set your goal",
    time: "5 min",
    description: "What skill? Why do you need it? How much time per day can you commit? What does success look like in 30 days?",
  },
  {
    toolLabel: "ChatGPT",
    dotColor: "#10B981",
    step: "Step 2",
    title: "Build your learning plan",
    time: "15 min",
    description: "ChatGPT creates a personalized 30-day study plan with daily topics and free resources.",
  },
  {
    toolLabel: "Claude",
    dotColor: "#F59E0B",
    step: "Step 3",
    title: "Teach each concept",
    time: "Daily · 20 min",
    description: "Every day, ask Claude to explain the day's topic in simple terms, then quiz you on what you learned.",
  },
  {
    toolLabel: "ChatGPT",
    dotColor: "#10B981",
    step: "Step 4",
    title: "Practice with real projects",
    time: "Weekly",
    description: "Ask ChatGPT for a mini-project that applies what you learned that week.",
  },
];

const examples = [
  "A freelancer learning Canva to offer graphic design services on Upwork",
  "A fresh grad learning Excel for a virtual assistant job application",
  "An OFW learning basic copywriting to start an online business while abroad",
];

const checklist = [
  "Chose my skill and wrote my 30-day goal",
  "Used ChatGPT to build my learning plan",
  "Completed at least one day of Claude tutoring",
  "Tried at least one practice project from ChatGPT",
];

const takeaways = [
  "The 30-day plan from ChatGPT gives you structure. Without structure, most self-learning stops after 3 days.",
  "Claude as a daily tutor is more effective than watching videos because it responds to YOUR questions and level.",
  "Weekly projects force you to use the skill, not just understand it. Using it is how you actually learn.",
  "Adapt the plan as you go. If a topic is too hard, ask Claude to break it into smaller pieces.",
];

export default function LearningNewSkillsPage() {
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
            <a href="/learn/workflows" className="hover:text-white transition-colors">AI Workflows</a>
            <span>/</span>
            <span className="text-white/60">Learning New Skills</span>
          </nav>
        </div>

        {/* Hero */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#F59E0B] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Workflow
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              30 days
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 7 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Learning New Skills Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            Learn any new skill faster with ChatGPT and Claude as your personal tutors.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Learn any new skill faster by using ChatGPT and Claude as your personal tutors — with a structured study plan.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Traditional learning is slow because it is one-size-fits-all. A YouTube tutorial does not know what you already know, what confuses you, or what your real goal is. It moves at one pace, in one direction, for everyone.
            </p>
            <p>
              AI tutors adapt to your pace. They explain things in your context. They let you practice immediately with real examples from your own life. And unlike a course, they never get impatient when you ask the same question five different ways.
            </p>
            <p>
              This workflow turns any skill into a structured 30-day plan — with a daily tutor and weekly practice projects built in.
            </p>
          </div>
        </section>

        {/* Filipino Examples */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Who This Is For</h2>
          <div className="space-y-3">
            {examples.map((ex) => (
              <div key={ex} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{ex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>

          <div className="relative">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-5 mb-0">
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: s.dotColor }}
                  />
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-1" style={{ backgroundColor: s.dotColor, opacity: 0.25, minHeight: "48px" }} />
                  )}
                </div>
                <div className="pb-8 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">{s.step}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: s.dotColor }}>{s.toolLabel}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">· {s.time}</span>
                  </div>
                  <p className="font-sans text-[16px] font-bold text-white mb-1">{s.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">Start today · ChatGPT + Claude · 30-day commitment</p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-3">Step 1 · You</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7] mb-3">
                Write down the answers to these four questions before you open any AI tool:
              </p>
              <ul className="space-y-1.5">
                {[
                  "What skill am I learning?",
                  "Why is this skill important to me right now?",
                  "How many minutes per day can I study?",
                  "What will I be able to DO after 30 days?",
                ].map((q) => (
                  <li key={q} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                    <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 2 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 2 · ChatGPT</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7] mb-4">
                Open ChatGPT. Fill in the brackets with your answers from Step 1.
              </p>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#10B981] uppercase tracking-[1.5px] block mb-3">ChatGPT</span>
                <p className="font-mono text-[13px] text-[#10B981] leading-[1.7]">
                  {`I want to learn [skill] in 30 days. I am a complete beginner. My goal is to be able to [specific outcome]. I can study [X minutes] per day. Create a day-by-day 30-day learning plan. For each day, tell me: the topic for that day, one free resource to use (YouTube video, article, or free tool), and one small thing to practice. Group the days into 4 weekly themes.`}
                </p>
              </div>
            </div>

            {/* Step 3 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 3 · Claude · Use Every Day</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7] mb-4">
                Each day, open Claude and paste this prompt with the day's topic from your plan.
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#F59E0B] uppercase tracking-[1.5px] block mb-3">Claude · Daily Tutor</span>
                <p className="font-mono text-[13px] text-[#F59E0B] leading-[1.7]">
                  {`I am learning [skill]. Today is Day [X] and the topic is [today's topic from the plan]. Explain this topic to me like I have never heard of it before. Use a simple analogy. Then give me 3 questions to test whether I understood. After I answer, tell me what I got right and what needs more explanation.`}
                </p>
              </div>
            </div>

            {/* Step 4 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] block mb-4">Step 4 · ChatGPT · Use Every Week</span>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7] mb-4">
                At the end of each week, ask ChatGPT for a real project that uses what you learned.
              </p>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#10B981] uppercase tracking-[1.5px] block mb-3">ChatGPT · Weekly Project</span>
                <p className="font-mono text-[13px] text-[#10B981] leading-[1.7]">
                  {`I just finished Week [X] of learning [skill]. I now know: [list what you learned]. Give me one small real-world project I can complete in 30-60 minutes that uses everything I learned this week. Make it practical — something I could show to a potential client or employer.`}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mark Complete */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {checklist.map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        {/* Reflect */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              After your first day of Claude tutoring, <span className="text-white font-bold">did the explanation feel more personal than a YouTube video? What did you ask that you would not have been able to ask a video?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 mt-3">
              That gap — the question you could actually ask — is where AI tutoring beats passive learning every time.
            </p>
          </div>
        </section>

        {/* Key Takeaways */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {takeaways.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Programming Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                AI Workflows · Guide 8 of 10
              </p>
            </div>
            <a
              href="/learn/workflows/programming"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
