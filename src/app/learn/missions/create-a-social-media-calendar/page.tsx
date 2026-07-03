import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Clock, BarChart2, CheckSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Mission: Create a Social Media Calendar | Cyberussell",
  description:
    "Build a full month of content ideas with AI for any niche. Complete this mission in 1 hour and walk away with a 30-day content calendar.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions/create-a-social-media-calendar" },
  openGraph: {
    title: "Mission: Create a Social Media Calendar | Cyberussell",
    description: "Build a full month of content ideas with AI for any niche.",
    url: "https://www.cyberussell.com/learn/missions/create-a-social-media-calendar",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
    type: "article",
  },
};

const steps = [
  {
    number: "01",
    tool: "YOU",
    color: "#FFD23F",
    time: "5 min",
    title: "Define your niche, audience, and platform",
    desc: "What topic do you post about, who reads it, and which platform are you focusing on? Pick one primary platform to start — don't split focus across five.",
    tips: ["Pick ONE primary platform to start — don't split focus across five", "Write one sentence describing who follows you and why", "Note 2-3 accounts in your niche you admire, for reference only"],
  },
  {
    number: "02",
    tool: "CHATGPT",
    color: "#10B981",
    time: "15 min",
    title: "Generate 60 content ideas with ChatGPT",
    desc: "Use AI to brainstorm more ideas than you need so you can pick the best ones. Volume first, filtering later.",
    prompt: "I post content about [your niche] for [your audience] on [platform]. Generate 60 content ideas, organized into these categories: educational, behind-the-scenes, entertainment, and promotional. Keep each idea to one line.",
    tips: ["Ask for more ideas in whichever category feels thin", "Save the list somewhere you can reorder it (spreadsheet or doc)", "Don't judge ideas yet — just get volume first"],
  },
  {
    number: "03",
    tool: "YOU",
    color: "#FFD23F",
    time: "10 min",
    title: "Sort and select 30 winners",
    desc: "Filter for ideas that educate, entertain, or inspire your specific audience — and that you could actually make.",
    tips: ["Pick ideas that make you go “oh, I could actually make that today”", "Aim for a mix — don't pick 30 ideas from the same category", "Cut anything that requires resources or skills you don't have yet"],
  },
  {
    number: "04",
    tool: "YOU",
    color: "#FFD23F",
    time: "15 min",
    title: "Assign topics to dates with a content theme system",
    desc: "Group ideas into weekly themes so your feed feels cohesive, not random. This is what turns a list of ideas into an actual calendar.",
    tips: ["Give each day of the week a theme (e.g. Monday = tips, Friday = behind-the-scenes)", "Group your 30 ideas under themes, then slot them into a calendar", "Leave a few open slots for timely or trending content"],
  },
  {
    number: "05",
    tool: "CLAUDE",
    color: "#F59E0B",
    time: "15 min",
    title: "Write 5 captions with Claude as a test",
    desc: "Draft your first week's captions to confirm the calendar is realistic to execute — not just realistic to plan.",
    prompt: "Here are 5 content ideas from my calendar: [paste 5 ideas]. Write a caption for each, in a [describe your tone — e.g. casual and funny, professional, motivational] voice, ending with a call to action or question to boost engagement. Keep each caption under 150 words.",
    tips: ["If the tone feels off, give Claude 2-3 examples of captions you like", "Test whether writing 5 at once feels realistic for your actual posting pace", "Adjust your calendar's pacing if 5 captions took longer than expected"],
  },
];

export default function CreateASocialMediaCalendarPage() {
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
            <a href="/learn/missions" className="hover:text-white transition-colors">AI Missions</a>
            <span>/</span>
            <span className="text-white/60">Create a Social Media Calendar</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6 · Mission 05
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            Create a Social Media Calendar
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 leading-[1.8] mb-6 max-w-2xl">
            Consistency beats creativity on social media. This mission uses AI to plan 30 days of content
            in one session — so you stop scrambling for ideas and start building momentum.
          </p>

          <div className="flex items-center gap-6 mb-4 flex-wrap">
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/45">
              <Clock size={13} /> 1 hour
            </span>
            <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#22C55E]">
              <BarChart2 size={13} /> Beginner
            </span>
          </div>

          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
              <span className="text-white/70 font-bold">Deliverable:</span> A 30-day content calendar.
            </p>
          </div>

          <div className="flex flex-col gap-0 mb-16">
            {steps.map((step, i) => (
              <div key={step.number} className="flex items-start gap-4 md:gap-6">
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold font-[family-name:var(--font-inter)]"
                    style={{ backgroundColor: `${step.color}18`, color: step.color }}
                  >
                    {step.number}
                  </div>
                  {i < steps.length - 1 && <div className="w-px flex-1 my-2" style={{ backgroundColor: `${step.color}30`, minHeight: "32px" }} />}
                </div>
                <div className="pb-10 flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <span
                      className="text-[10px] font-bold font-[family-name:var(--font-inter)] uppercase tracking-[1.5px] px-2 py-0.5 rounded"
                      style={{ backgroundColor: `${step.color}18`, color: step.color }}
                    >
                      {step.tool}
                    </span>
                    <span className="flex items-center gap-1 font-[family-name:var(--font-inter)] text-[12px] text-white/30">
                      <Clock size={10} /> {step.time}
                    </span>
                  </div>
                  <h3 className="font-sans text-[18px] font-bold text-white mb-2">{step.title}</h3>
                  <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7] mb-4">{step.desc}</p>

                  {"prompt" in step && step.prompt && (
                    <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 mb-4">
                      <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] text-white/30 mb-2">Prompt to use</p>
                      <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.7] italic">&ldquo;{step.prompt}&rdquo;</p>
                    </div>
                  )}

                  <ul className="flex flex-col gap-1.5">
                    {step.tips.map((tip) => (
                      <li key={tip} className="flex items-start gap-2 font-[family-name:var(--font-inter)] text-[14px] text-white/40">
                        <CheckSquare size={13} className="mt-0.5 shrink-0 text-white/20" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#FFD23F]/5 border border-[#FFD23F]/20 rounded-2xl p-6 md:p-8 mb-12">
            <h2 className="font-sans text-[20px] font-bold text-white mb-2">Mission Complete?</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              You now have 30 days of content mapped out and 5 captions already written. Schedule what you can,
              and reuse this same batching workflow every month.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/learn/missions/research-a-business-idea" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/40 hover:text-white transition-colors">
              ← Mission 04: Research a Business Idea
            </a>
            <a href="/learn/missions/design-a-logo" className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Next Mission: Design a Logo →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
