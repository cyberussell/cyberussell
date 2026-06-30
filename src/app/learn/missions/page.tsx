import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Target, Lock, Clock, BarChart2 } from "lucide-react";

export const metadata: Metadata = {
  title: "AI Missions — Complete Real Projects with AI | Cyberussell",
  description:
    "Replace lessons with missions. Create a resume. Build a landing page. Write a proposal. Each mission has a real deliverable.",
  alternates: { canonical: "https://www.cyberussell.com/learn/missions" },
};

const missions = [
  {
    title: "Create Your First Professional Resume",
    desc: "Use ChatGPT and Claude to write a resume that stands out to real employers.",
    time: "45 min",
    difficulty: "Beginner",
    deliverable: "A complete, polished resume",
    soon: false,
  },
  {
    title: "Build a Landing Page",
    desc: "Design and publish a real landing page using AI — no coding required.",
    time: "2 hours",
    difficulty: "Beginner",
    deliverable: "A live, published landing page",
    soon: false,
  },
  {
    title: "Write a Freelance Proposal",
    desc: "Craft a compelling proposal for a real freelance opportunity using Claude.",
    time: "30 min",
    difficulty: "Beginner",
    deliverable: "A ready-to-send proposal",
    soon: true,
  },
  {
    title: "Research a Business Idea",
    desc: "Use Gemini + ChatGPT to validate a business idea with real market data.",
    time: "1 hour",
    difficulty: "Intermediate",
    deliverable: "A 1-page business research summary",
    soon: true,
  },
  {
    title: "Create a Social Media Calendar",
    desc: "Build a full month of content ideas with AI for any niche.",
    time: "1 hour",
    difficulty: "Beginner",
    deliverable: "A 30-day content calendar",
    soon: true,
  },
  {
    title: "Design a Logo",
    desc: "Use AI image tools to create a professional logo for a brand.",
    time: "45 min",
    difficulty: "Beginner",
    deliverable: "3 logo variations",
    soon: true,
  },
  {
    title: "Write a Blog Article",
    desc: "Research, outline, write, and SEO-optimize a full article with AI.",
    time: "1.5 hours",
    difficulty: "Beginner",
    deliverable: "A 1,000-word published article",
    soon: true,
  },
];

const difficultyColor: Record<string, string> = {
  Beginner: "#22C55E",
  Intermediate: "#F59E0B",
  Advanced: "#E8373A",
};

export default function MissionsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-16 pb-10 max-w-5xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <span className="text-white/60">AI Missions</span>
          </nav>

          <div className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-6">
            <Target size={12} className="text-[#FFD23F]" />
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Pillar 6
            </span>
          </div>

          <h1 className="font-sans text-[32px] md:text-[48px] font-bold text-white mb-4 leading-tight">
            AI Missions
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/55 leading-[1.8] mb-4 max-w-2xl">
            Forget lessons. Missions are real tasks with real deliverables. You follow a checklist,
            use actual AI tools, and end with something tangible — a resume, a page, a proposal.
            You learn by doing.
          </p>
          <div className="inline-block bg-white/[0.05] border border-white/[0.08] rounded-lg px-4 py-2 mb-12">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">
              <span className="text-white/70 font-bold">Outcome:</span> You build a portfolio of real completed work.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            {missions.map((mission) => (
              <div
                key={mission.title}
                className={`bg-[#18181F] border rounded-[14px] p-5 md:p-6 ${
                  mission.soon
                    ? "border-white/[0.06] opacity-60"
                    : "border-white/[0.08] hover:border-white/20 transition-all cursor-pointer"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-9 h-9 rounded-lg bg-[#FFD23F]/10 flex items-center justify-center shrink-0 mt-0.5">
                      {mission.soon ? (
                        <Lock size={14} className="text-[#FFD23F]/40" />
                      ) : (
                        <Target size={14} className="text-[#FFD23F]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-sans text-[16px] font-bold text-white mb-1.5">{mission.title}</h3>
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.5] mb-3">{mission.desc}</p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/35">
                          <Clock size={11} />
                          {mission.time}
                        </span>
                        <span
                          className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] font-bold"
                          style={{ color: difficultyColor[mission.difficulty] }}
                        >
                          <BarChart2 size={11} />
                          {mission.difficulty}
                        </span>
                        <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">
                          Deliverable: <span className="text-white/50">{mission.deliverable}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  {!mission.soon && (
                    <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#FFD23F] shrink-0 hidden sm:block">
                      Start →
                    </span>
                  )}
                  {mission.soon && (
                    <span className="text-[10px] font-bold font-[family-name:var(--font-inter)] text-white/25 uppercase tracking-[1px] shrink-0">
                      Soon
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <a href="/learn/skills" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/40 hover:text-white transition-colors">
              ← Build Real Skills
            </a>
            <a href="/careers" className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F] hover:text-white transition-colors">
              Career Blueprints →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
