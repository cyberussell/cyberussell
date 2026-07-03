import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, ArrowRight, CheckSquare, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "Content Creation Workflow — AI Workflows | Cyberussell",
  description:
    "Create a week of social media content in one hour using ChatGPT and Claude — for any business or personal brand.",
  alternates: { canonical: "https://www.cyberussell.com/learn/workflows/content-creation" },
  openGraph: {
    title: "Content Creation Workflow — AI Workflows | Cyberussell",
    description: "Create a week of social media content in one hour using ChatGPT and Claude — for any business or personal brand.",
    url: "https://www.cyberussell.com/learn/workflows/content-creation",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const TOOL_COLORS = {
  YOU: { dot: "#FFD23F", label: "text-[#FFD23F]", border: "border-[#FFD23F]/30" },
  CHATGPT: { dot: "#10B981", label: "text-[#10B981]", border: "border-[#10B981]/30" },
  CLAUDE: { dot: "#F59E0B", label: "text-[#F59E0B]", border: "border-[#F59E0B]/30" },
  HUMAN: { dot: "#FFD23F", label: "text-[#FFD23F]", border: "border-[#FFD23F]/30" },
};

const steps = [
  {
    tool: "YOU",
    toolLabel: "You",
    color: TOOL_COLORS.YOU,
    step: "Step 1",
    title: "Define your content goal",
    time: "5 min",
    description: "What platform? Who is your audience? What do you want them to feel or do after seeing your post?",
  },
  {
    tool: "CHATGPT",
    toolLabel: "ChatGPT",
    color: TOOL_COLORS.CHATGPT,
    step: "Step 2",
    title: "Generate content ideas",
    time: "15 min",
    description: "Ask ChatGPT for 14 post ideas (2 per day, 7 days) based on your business and audience.",
  },
  {
    tool: "CLAUDE",
    toolLabel: "Claude",
    color: TOOL_COLORS.CLAUDE,
    step: "Step 3",
    title: "Write the actual posts",
    time: "30 min",
    description: "Claude writes complete captions for each idea: hook, body, call to action, hashtags.",
  },
  {
    tool: "HUMAN",
    toolLabel: "Human Review",
    color: TOOL_COLORS.HUMAN,
    step: "Step 4",
    title: "Pick, edit, schedule",
    time: "10 min",
    description: "Choose your 7 best, edit for your voice, schedule using Meta Business Suite or Buffer.",
  },
];

const checklist = [
  "Defined my platform, audience, and goal",
  "Used ChatGPT to generate 14 post ideas",
  "Used Claude to write complete captions",
  "Picked 7 posts and scheduled them",
];

const takeaways = [
  "Consistency beats perfection. 7 scheduled posts beat 1 perfect post.",
  "ChatGPT is strong at generating variety and ideas. Claude is strong at writing captions that sound natural.",
  "Your editing step (Step 4) is what makes the content sound like you, not a robot.",
  "Start with one week. Once this workflow feels natural, scale to two weeks at a time.",
];

export default function ContentCreationWorkflowPage() {
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
            <span className="text-white/60">Content Creation</span>
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
              60 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            AI Workflows · Guide 4 of 10
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Content Creation Workflow
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Create a week of social media content in one focused hour.
          </p>
        </section>

        {/* Outcome */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/8 border border-[#F59E0B]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Create a week of social media content in one hour using ChatGPT and Claude — for any business or personal brand.
            </p>
          </div>
        </section>

        {/* Why This Matters */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Most small business owners post randomly or not at all because content feels hard. Coming up with ideas is hard. Writing captions is hard. Doing it every day is impossible when you are also running a business.
            </p>
            <p>
              This workflow solves the hardest parts — idea generation and writing — using AI. You bring the knowledge of your business. AI handles the heavy lifting. You end the session with a week of ready-to-post content.
            </p>
            <p>
              One hour on Sunday. Seven posts ready to go. That is the workflow.
            </p>
          </div>
        </section>

        {/* The Workflow */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">The Workflow</h2>

          <div className="relative">
            {steps.map((s, i) => (
              <div key={s.step} className="flex gap-5 mb-0">
                {/* Left: dot + line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-3 h-3 rounded-full shrink-0 mt-1"
                    style={{ backgroundColor: s.color.dot }}
                  />
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 mt-1 mb-0" style={{ backgroundColor: s.color.dot, opacity: 0.25, minHeight: "48px" }} />
                  )}
                </div>

                {/* Right: content */}
                <div className="pb-8 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">{s.step}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px]" style={{ color: s.color.dot }}>{s.toolLabel}</span>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">· {s.time}</span>
                  </div>
                  <p className="font-sans text-[17px] font-bold text-white mb-1">{s.title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Real Example */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[2px] mb-4">
              Sari-Sari Store Owner · Cebu
            </p>
            <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/65 leading-[1.9] space-y-3">
              <p>
                A sari-sari store owner in Cebu creates a week of Facebook content in one Sunday afternoon. She tells ChatGPT she runs a small convenience store for her neighborhood.
              </p>
              <p>
                ChatGPT gives her 14 ideas including "share your best-selling product of the week" and "post a customer thank-you story." Claude writes all the captions in Filipino-friendly English.
              </p>
              <p className="text-white/80 font-bold">
                She schedules 7 posts and gets her highest-ever engagement that week.
              </p>
            </div>
          </div>
        </section>

        {/* Try It Yourself */}
        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Try It Yourself</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 60 minutes · ChatGPT + Claude</p>

          <div className="space-y-4">
            {/* Step 1 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 · You</span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7]">
                Write answers to these three questions before opening any AI tool:
              </p>
              <ul className="mt-3 space-y-1.5">
                {["What platform am I posting on?", "Who is my audience (be specific — age, location, what they care about)?", "What do I want them to do after seeing my post?"].map((q) => (
                  <li key={q} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                    <span className="font-[family-name:var(--font-inter)] text-[15px] text-white/55">{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Step 2 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 · ChatGPT</span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Open ChatGPT and paste this prompt. Fill in the brackets with your answers from Step 1.
              </p>
              <div className="bg-[#0F0F1A] border border-[#10B981]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#10B981] uppercase tracking-[1.5px] block mb-3">ChatGPT</span>
                <p className="font-mono text-[14px] text-[#10B981] leading-[1.7]">
                  {`I run [describe your business]. My audience is [describe them specifically — age, location, what they care about]. I post on [platform]. Give me 14 social media post ideas for the next 7 days (2 per day). Each idea should be simple, relevant to my audience, and encourage engagement. Label them Day 1 through Day 7.`}
                </p>
              </div>
            </div>

            {/* Step 3 prompt */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 · Claude</span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7] mb-4">
                Open Claude and paste this prompt. Paste ChatGPT's list of 14 ideas into the bracket.
              </p>
              <div className="bg-[#0F0F1A] border border-[#F59E0B]/20 rounded-[10px] p-4">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-[#F59E0B] uppercase tracking-[1.5px] block mb-3">Claude</span>
                <p className="font-mono text-[14px] text-[#F59E0B] leading-[1.7]">
                  {`Write complete social media captions for these 14 post ideas: [paste ChatGPT's output]. For each post, write: a strong opening hook (first line that stops scrolling), 2-3 sentences of body, a clear call to action, and 5 relevant hashtags. The tone should be [warm and friendly / professional / fun]. My brand is [your business name].`}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 4 · Human Review</span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 leading-[1.7]">
                Read all 14 captions. Pick your 7 favorites. Edit any that don't sound like you. Schedule them using Meta Business Suite (free) or Buffer (free plan available).
              </p>
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
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              Look at the 7 posts you scheduled. <span className="text-white font-bold">Which ones sound most like you — and what did you change to make them feel that way?</span>
            </p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mt-3">
              That editing instinct is your voice. The more you use this workflow, the faster you'll recognize it.
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
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What's Next */}
        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What's Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Freelancing Proposal Workflow</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                AI Workflows · Guide 5 of 10
              </p>
            </div>
            <a
              href="/learn/workflows/freelancing-proposal"
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
