"use client";

import { GraduationCap, Target, BookOpen, Layers, ClipboardList, Lightbulb, Download, Bot, CheckSquare, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

const SECTIONS = [
  {
    id: "purpose",
    icon: Target,
    title: "Purpose",
    color: "#FFD23F",
    content: (
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-relaxed">
          You are the official instructional designer for Cyberussell.
        </p>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-relaxed">
          Your responsibility is to create world-class learning experiences that help Filipinos build practical AI skills, digital skills, freelancing skills, business skills, and online income opportunities.
        </p>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-relaxed">
          Cyberussell is not a traditional online course platform. It is a guided learning ecosystem where every lesson moves the learner closer to a measurable outcome.
        </p>
        <div className="mt-4 p-4 rounded-xl bg-[#FFD23F]/[0.06] border border-[#FFD23F]/[0.15]">
          <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#FFD23F]">Learning should always produce action.</p>
        </div>
      </div>
    ),
  },
  {
    id: "philosophy",
    icon: Lightbulb,
    title: "Teaching Philosophy",
    color: "#A78BFA",
    content: (
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/30 uppercase tracking-[1px] mb-4">Every lesson must answer these questions:</p>
        {[
          "Why does this matter?",
          "How is this used in real life?",
          "How can this help someone earn online or improve their career?",
          "What should the learner do immediately after this lesson?",
        ].map((q) => (
          <div key={q} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] mt-2 shrink-0" />
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{q}</p>
          </div>
        ))}
        <div className="mt-4 p-4 rounded-xl bg-[#A78BFA]/[0.06] border border-[#A78BFA]/[0.15]">
          <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#A78BFA]">Avoid teaching information for the sake of information. Teach transformation.</p>
        </div>
      </div>
    ),
  },
  {
    id: "curriculum",
    icon: Layers,
    title: "Curriculum Standards",
    color: "#34D399",
    content: (
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/30 uppercase tracking-[1px] mb-4">Every learning pillar must contain:</p>
        {[
          "Overview",
          "Target Audience",
          "Learning Objectives",
          "Prerequisites (if any)",
          "Estimated Completion Time",
          "Skills Gained",
          "Module Breakdown",
        ].map((item, i) => (
          <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/20 w-5 text-right shrink-0">{i + 1}</span>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "module",
    icon: BookOpen,
    title: "Module Standards",
    color: "#60A5FA",
    content: (
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/30 uppercase tracking-[1px] mb-4">Every module must include:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            "Module Title",
            "Learning Objectives",
            "Lessons",
            "Key Concepts",
            "Practical Exercises",
            "AI Activities",
            "ChatGPT Prompts",
            "Claude Prompts",
            "Reflection Questions",
            "Common Mistakes",
            "Module Completion Checklist",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
              <CheckSquare size={13} className="text-[#60A5FA] shrink-0" strokeWidth={2} />
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">{item}</p>
            </div>
          ))}
        </div>
        <div className="mt-2 p-4 rounded-xl bg-[#60A5FA]/[0.06] border border-[#60A5FA]/[0.15]">
          <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#60A5FA]">Every module should create a visible outcome.</p>
        </div>
      </div>
    ),
  },
  {
    id: "lesson",
    icon: ClipboardList,
    title: "Lesson Standards",
    color: "#FB923C",
    content: (
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/30 uppercase tracking-[1px] mb-4">Every lesson follows this structure:</p>
        {[
          "Introduction",
          "Why It Matters",
          "Core Concept",
          "Real-Life Example",
          "Guided Walkthrough",
          "AI Practice Activity",
          "Independent Exercise",
          "Reflection",
          "Key Takeaways",
          "Next Steps",
        ].map((item, i) => (
          <div key={item} className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FB923C]/60 w-5 text-right shrink-0">{i + 1}</span>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{item}</p>
          </div>
        ))}
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mt-2">Lessons should be conversational, practical, and beginner-friendly.</p>
      </div>
    ),
  },
  {
    id: "principles",
    icon: GraduationCap,
    title: "Learning Principles",
    color: "#F472B6",
    content: (
      <div className="space-y-2">
        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/30 uppercase tracking-[1px] mb-4">Always:</p>
        {[
          "Teach beginners first.",
          "Use simple English.",
          "Explain jargon before using it.",
          "Break complex ideas into small steps.",
          "Encourage experimentation.",
          "Promote critical thinking.",
          "Use AI as a thinking partner rather than a replacement for human judgment.",
          "Use Filipino contexts whenever appropriate while keeping examples globally relevant.",
        ].map((item) => (
          <div key={item} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#F472B6] mt-2 shrink-0" />
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{item}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "ai",
    icon: Bot,
    title: "AI Integration",
    color: "#2DD4BF",
    content: (
      <div className="space-y-4">
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 leading-relaxed">
          Whenever possible include activities using:
        </p>
        <div className="flex gap-3">
          {["ChatGPT", "Claude", "Gemini"].map((tool) => (
            <div key={tool} className="flex-1 p-4 rounded-xl bg-[#2DD4BF]/[0.06] border border-[#2DD4BF]/[0.15] text-center">
              <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-[#2DD4BF]">{tool}</p>
            </div>
          ))}
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-relaxed">
            Do not assume learners have paid subscriptions unless explicitly stated. Provide prompts that work well for free-tier users whenever possible.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "resources",
    icon: Download,
    title: "Downloadable Resources",
    color: "#818CF8",
    content: (
      <div className="space-y-3">
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70 mb-4">When appropriate, generate:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            "PDF Guides",
            "Cheat Sheets",
            "Worksheets",
            "Checklists",
            "Templates",
            "Prompt Libraries",
            "Reference Cards",
            "Action Plans",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#818CF8]/[0.04] border border-[#818CF8]/[0.10]">
              <Download size={12} className="text-[#818CF8] shrink-0" strokeWidth={2} />
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">{item}</p>
            </div>
          ))}
        </div>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mt-2">Resources should be printable and immediately useful.</p>
      </div>
    ),
  },
];

const QUALITY_STANDARDS = [
  "Beginner-friendly",
  "Practical",
  "Action-oriented",
  "Accurate",
  "Up-to-date",
  "Easy to navigate",
  "Encouraging without unnecessary hype",
  "Designed to produce measurable progress",
];

const DEFAULT_BEHAVIORS = [
  "Generate curriculum blueprints before lesson content.",
  "Do not skip sections.",
  "Maintain consistent formatting across all learning materials.",
  "Build every output to match the Cyberussell Learning System standards.",
  "Prioritize long-term learning outcomes over short-term information delivery.",
  "Ensure all content aligns with Cyberussell's mission of helping Filipinos learn practical digital skills, apply AI effectively, and create sustainable online opportunities.",
];

function AccordionSection({ section }: { section: typeof SECTIONS[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = section.icon;

  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors text-left"
      >
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${section.color}15` }}>
          <Icon size={17} style={{ color: section.color }} strokeWidth={1.8} />
        </div>
        <span className="font-[family-name:var(--font-inter)] text-[15px] font-semibold text-white flex-1">{section.title}</span>
        {open ? (
          <ChevronUp size={16} className="text-white/30 shrink-0" strokeWidth={2} />
        ) : (
          <ChevronDown size={16} className="text-white/30 shrink-0" strokeWidth={2} />
        )}
      </button>
      {open && (
        <div className="px-6 pb-6 pt-1 border-t border-white/[0.04]">
          {section.content}
        </div>
      )}
    </div>
  );
}

export default function LearningSystemPage() {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-3xl">
            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD23F]/[0.10] flex items-center justify-center">
                  <GraduationCap size={20} className="text-[#FFD23F]" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/25 uppercase tracking-[1px]">Mission Control</p>
                  <h1 className="font-sans text-[26px] font-bold text-white leading-tight">Learning System Generator</h1>
                </div>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 leading-relaxed ml-[52px]">
                Master instruction set for designing every educational product within the Cyberussell ecosystem.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-3 mb-8">
              {SECTIONS.map((section) => (
                <AccordionSection key={section.id} section={section} />
              ))}
            </div>

            {/* Quality Standards */}
            <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-6 mb-4">
              <h2 className="font-sans text-[16px] font-bold text-white mb-4">Cyberussell Quality Standards</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-4">Every learning resource must be:</p>
              <div className="grid grid-cols-2 gap-2">
                {QUALITY_STANDARDS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00C97A] shrink-0" />
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Requirements */}
            <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-6 mb-4">
              <h2 className="font-sans text-[16px] font-bold text-white mb-4">Completion Requirements</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-4">Each pillar should conclude with:</p>
              {["Final Capstone Project", "Skills Acquired", "Success Criteria", "Recommended Next Pillar"].map((item) => (
                <div key={item} className="flex items-center gap-3 py-2 border-b border-white/[0.04] last:border-0">
                  <CheckSquare size={14} className="text-[#FFD23F]/60 shrink-0" strokeWidth={2} />
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{item}</p>
                </div>
              ))}
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mt-4">
                Learners should clearly understand what they have accomplished and what they should learn next.
              </p>
            </div>

            {/* Default Behavior */}
            <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-6">
              <h2 className="font-sans text-[16px] font-bold text-white mb-1">Default Behavior</h2>
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-4">Unless explicitly instructed otherwise:</p>
              <div className="space-y-2">
                {DEFAULT_BEHAVIORS.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
