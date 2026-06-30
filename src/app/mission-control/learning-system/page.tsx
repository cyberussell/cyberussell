"use client";

import {
  GraduationCap, Target, BookOpen, Layers, ClipboardList, Lightbulb, Download, Bot,
  CheckSquare, ChevronDown, ChevronUp, Plus, Sparkles, FileText, HelpCircle,
  Trophy, Star, Library, Pencil, Copy, Trash2, Eye, Globe, RefreshCw, X,
  ArrowRight, Loader2, AlertCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

// ─── Types ───────────────────────────────────────────────────────────────────

type PillarSummary = {
  slug: string;
  name: string;
  difficulty: string;
  status: string;
  module_count: number;
  updated_at: string;
};

// ─── Standards accordion data ────────────────────────────────────────────────

const STANDARDS = [
  {
    id: "purpose", icon: Target, color: "#FFD23F", title: "Purpose",
    items: [
      "You are the official instructional designer for Cyberussell.",
      "Create world-class learning experiences that help Filipinos build practical AI skills, digital skills, freelancing skills, business skills, and online income opportunities.",
      "Cyberussell is a guided learning ecosystem where every lesson moves the learner closer to a measurable outcome.",
    ],
    highlight: "Learning should always produce action.",
    highlightColor: "#FFD23F",
  },
  {
    id: "philosophy", icon: Lightbulb, color: "#A78BFA", title: "Teaching Philosophy",
    items: [
      "Why does this matter?",
      "How is this used in real life?",
      "How can this help someone earn online or improve their career?",
      "What should the learner do immediately after this lesson?",
    ],
    highlight: "Avoid teaching information for the sake of information. Teach transformation.",
    highlightColor: "#A78BFA",
  },
  {
    id: "curriculum", icon: Layers, color: "#34D399", title: "Curriculum Standards",
    items: ["Overview", "Target Audience", "Learning Objectives", "Prerequisites (if any)", "Estimated Completion Time", "Skills Gained", "Module Breakdown"],
    highlight: null, highlightColor: "#34D399",
  },
  {
    id: "module", icon: BookOpen, color: "#60A5FA", title: "Module Standards",
    items: ["Module Title", "Learning Objectives", "Lessons", "Key Concepts", "Practical Exercises", "AI Activities", "ChatGPT Prompts", "Claude Prompts", "Reflection Questions", "Common Mistakes", "Module Completion Checklist"],
    highlight: "Every module should create a visible outcome.",
    highlightColor: "#60A5FA",
  },
  {
    id: "lesson", icon: ClipboardList, color: "#FB923C", title: "Lesson Standards",
    items: ["Introduction", "Why It Matters", "Core Concept", "Real-Life Example", "Guided Walkthrough", "AI Practice Activity", "Independent Exercise", "Reflection", "Key Takeaways", "Next Steps"],
    highlight: "Lessons should be conversational, practical, and beginner-friendly.",
    highlightColor: "#FB923C",
  },
  {
    id: "principles", icon: GraduationCap, color: "#F472B6", title: "Learning Principles",
    items: ["Teach beginners first.", "Use simple English.", "Explain jargon before using it.", "Break complex ideas into small steps.", "Encourage experimentation.", "Promote critical thinking.", "Use AI as a thinking partner rather than a replacement for human judgment.", "Use Filipino contexts whenever appropriate while keeping examples globally relevant."],
    highlight: null, highlightColor: "#F472B6",
  },
  {
    id: "ai", icon: Bot, color: "#2DD4BF", title: "AI Integration",
    items: ["Include activities using ChatGPT, Claude, and Gemini.", "Do not assume learners have paid subscriptions.", "Provide prompts that work for free-tier users whenever possible."],
    highlight: null, highlightColor: "#2DD4BF",
  },
  {
    id: "resources", icon: Download, color: "#818CF8", title: "Downloadable Resources",
    items: ["PDF Guides", "Cheat Sheets", "Worksheets", "Checklists", "Templates", "Prompt Libraries", "Reference Cards", "Action Plans"],
    highlight: "Resources should be printable and immediately useful.",
    highlightColor: "#818CF8",
  },
  {
    id: "quality", icon: CheckSquare, color: "#00C97A", title: "Quality Standards",
    items: ["Beginner-friendly", "Practical", "Action-oriented", "Accurate", "Up-to-date", "Easy to navigate", "Encouraging without unnecessary hype", "Designed to produce measurable progress"],
    highlight: null, highlightColor: "#00C97A",
  },
  {
    id: "completion", icon: Trophy, color: "#FBBF24", title: "Completion Requirements",
    items: ["Final Capstone Project", "Skills Acquired", "Success Criteria", "Recommended Next Pillar"],
    highlight: "Learners should clearly understand what they have accomplished and what they should learn next.",
    highlightColor: "#FBBF24",
  },
];

const GENERATOR_CARDS = [
  { id: "pillar", icon: Layers, color: "#FFD23F", label: "Generate New Pillar", desc: "Full curriculum pillar with modules, lessons, and capstone", action: "generate_pillar" },
  { id: "module", icon: BookOpen, color: "#60A5FA", label: "Generate Module", desc: "Add a new module to an existing pillar", action: "needs_pillar" },
  { id: "lesson", icon: ClipboardList, color: "#FB923C", label: "Generate Lesson", desc: "Create a structured lesson for a module", action: "needs_pillar" },
  { id: "quiz", icon: HelpCircle, color: "#A78BFA", label: "Generate Quiz", desc: "Knowledge check quiz for a pillar", action: "needs_pillar" },
  { id: "capstone", icon: Trophy, color: "#34D399", label: "Generate Capstone", desc: "Final project for a learning pillar", action: "needs_pillar" },
  { id: "worksheet", icon: FileText, color: "#F472B6", label: "Generate Worksheet", desc: "Hands-on practice worksheet", action: "needs_pillar" },
  { id: "cheat_sheet", icon: Sparkles, color: "#2DD4BF", label: "Generate Cheat Sheet", desc: "Quick reference card for key concepts", action: "needs_pillar" },
  { id: "certificate", icon: GraduationCap, color: "#818CF8", label: "Generate Certificate", desc: "Completion certificate for a pillar", action: "needs_pillar" },
  { id: "bida_badge", icon: Star, color: "#FBBF24", label: "Generate Bida Badge", desc: "Achievement badge celebrating completion", action: "needs_pillar" },
  { id: "prompt_library", icon: Library, color: "#00C97A", label: "Generate Prompt Library", desc: "AI prompt collection for a pillar", action: "needs_pillar" },
];

// ─── Accordion ───────────────────────────────────────────────────────────────

function AccordionSection({ s }: { s: typeof STANDARDS[0] }) {
  const [open, setOpen] = useState(false);
  const Icon = s.icon;
  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors text-left">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${s.color}18` }}>
          <Icon size={15} style={{ color: s.color }} strokeWidth={1.8} />
        </div>
        <span className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-white flex-1">{s.title}</span>
        {open ? <ChevronUp size={15} className="text-white/25 shrink-0" /> : <ChevronDown size={15} className="text-white/25 shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-white/[0.04] space-y-1.5">
          {s.items.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: s.color }} />
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60">{item}</p>
            </div>
          ))}
          {s.highlight && (
            <div className="mt-3 p-3 rounded-lg border text-[13px] font-medium" style={{ backgroundColor: `${s.highlightColor}08`, borderColor: `${s.highlightColor}20`, color: s.highlightColor }}>
              {s.highlight}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Generate Pillar Modal ────────────────────────────────────────────────────

type PillarForm = {
  name: string; description: string; difficulty: string;
  estimated_duration: string; target_audience: string; learning_outcome: string;
};

function GeneratePillarModal({ onClose, onCreated }: { onClose: () => void; onCreated: (slug: string) => void }) {
  const [form, setForm] = useState<PillarForm>({ name: "", description: "", difficulty: "beginner", estimated_duration: "", target_audience: "", learning_outcome: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(k: keyof PillarForm, v: string) { setForm((f) => ({ ...f, [k]: v })); }

  async function generate() {
    if (!form.name.trim() || !form.description.trim() || !form.learning_outcome.trim()) {
      setError("Please fill in Name, Description, and Learning Outcome.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/mission-control/pillars/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "pillar", ...form }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Generation failed"); setLoading(false); return; }
      onCreated(data.slug);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-[560px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-7 pt-6 pb-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFD23F]/10 flex items-center justify-center">
              <Layers size={17} className="text-[#FFD23F]" strokeWidth={1.8} />
            </div>
            <div>
              <h2 className="font-sans text-[18px] font-bold text-white">Generate New Pillar</h2>
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">AI will build the full curriculum</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors"><X size={17} strokeWidth={2} /></button>
        </div>

        <div className="px-7 py-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#E8373A]/10 border border-[#E8373A]/20">
              <AlertCircle size={14} className="text-[#E8373A] shrink-0" />
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#E8373A]">{error}</p>
            </div>
          )}

          <Field label="Pillar Name *" placeholder="e.g. AI Fundamentals, Freelancing Basics, Canva for Business">
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. AI Fundamentals, Freelancing Basics, Canva for Business" className={INPUT} />
          </Field>

          <Field label="Short Description *" placeholder="">
            <textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="What is this pillar about? What will learners be doing?" rows={2} className={`${INPUT} resize-none`} />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Difficulty">
              <select value={form.difficulty} onChange={(e) => update("difficulty", e.target.value)} className={INPUT}>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </Field>
            <Field label="Estimated Duration">
              <input value={form.estimated_duration} onChange={(e) => update("estimated_duration", e.target.value)} placeholder="e.g. 4 weeks, 10 hours" className={INPUT} />
            </Field>
          </div>

          <Field label="Target Audience">
            <input value={form.target_audience} onChange={(e) => update("target_audience", e.target.value)} placeholder="e.g. Filipino freelancers who want to use AI tools" className={INPUT} />
          </Field>

          <Field label="Learning Outcome *">
            <textarea value={form.learning_outcome} onChange={(e) => update("learning_outcome", e.target.value)} placeholder="What will the learner be able to DO after completing this pillar?" rows={2} className={`${INPUT} resize-none`} />
          </Field>
        </div>

        <div className="flex items-center justify-between px-7 py-4 border-t border-white/[0.06]">
          <button onClick={onClose} disabled={loading} className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 px-4 py-2 rounded-lg hover:bg-white/[0.04] transition-colors">Cancel</button>
          <button onClick={generate} disabled={loading} className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#FFD23F]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <><Loader2 size={14} className="animate-spin" /> Generating...</> : <><Sparkles size={14} strokeWidth={2.5} /> Generate</>}
          </button>
        </div>

        {loading && (
          <div className="px-7 pb-5">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 text-center">Building your full curriculum — modules, lessons, capstone, quiz, badge... This takes about 20-30 seconds.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const INPUT = "w-full bg-[#0e0e18] border border-white/[0.08] rounded-lg py-2.5 px-3.5 text-white text-[13px] placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors font-[family-name:var(--font-inter)]";

function Field({ label, children }: { label: string; placeholder?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">{label}</label>
      {children}
    </div>
  );
}

// ─── Needs Pillar Modal ───────────────────────────────────────────────────────

function NeedsPillarModal({ label, pillars, onClose, onSelect }: { label: string; pillars: PillarSummary[]; onClose: () => void; onSelect: (slug: string) => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-[440px] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
          <h2 className="font-sans text-[17px] font-bold text-white">{label}</h2>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 transition-colors"><X size={16} strokeWidth={2} /></button>
        </div>
        <div className="px-6 py-4">
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-4">Select a pillar to generate this content for:</p>
          {pillars.length === 0 ? (
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/25 text-center py-6">No pillars yet. Generate a pillar first.</p>
          ) : (
            <div className="space-y-2 max-h-[280px] overflow-y-auto">
              {pillars.map((p) => (
                <button key={p.slug} onClick={() => onSelect(p.slug)}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all text-left">
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white">{p.name}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 capitalize">{p.difficulty} · {p.module_count} modules</p>
                  </div>
                  <ArrowRight size={15} className="text-white/25 shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LearningSystemPage() {
  const [pillars, setPillars] = useState<PillarSummary[]>([]);
  const [showGenPillar, setShowGenPillar] = useState(false);
  const [needsPillarFor, setNeedsPillarFor] = useState<string | null>(null);
  const [standardsOpen, setStandardsOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { loadPillars(); }, []);

  async function loadPillars() {
    const res = await fetch("/api/mission-control/pillars");
    const data = await res.json();
    if (Array.isArray(data)) setPillars(data);
  }

  async function handleDelete(slug: string) {
    await fetch(`/api/mission-control/pillars/${slug}`, { method: "DELETE" });
    setPillars((prev) => prev.filter((p) => p.slug !== slug));
    setDeleteConfirm(null);
  }

  async function handlePublishToggle(p: PillarSummary) {
    const res = await fetch(`/api/mission-control/pillars/${p.slug}`);
    const full = await res.json();
    full._status = full._status === "published" ? "draft" : "published";
    await fetch(`/api/mission-control/pillars/${p.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(full),
    });
    loadPillars();
  }

  async function handleDuplicate(slug: string) {
    const res = await fetch(`/api/mission-control/pillars/${slug}`);
    const data = await res.json();
    const newSlug = `${slug}-copy-${Date.now()}`;
    data.slug = newSlug;
    data.name = `${data.name} (Copy)`;
    data._status = "draft";
    await fetch("/api/mission-control/pillars", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    loadPillars();
  }

  function handleCardClick(card: typeof GENERATOR_CARDS[0]) {
    if (card.action === "generate_pillar") { setShowGenPillar(true); return; }
    if (card.action === "needs_pillar") { setNeedsPillarFor(card.id); }
  }

  function handlePillarSelectedForGen(slug: string) {
    setNeedsPillarFor(null);
    window.location.href = `/mission-control/learning-system/${slug}?generate=${needsPillarFor}`;
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 overflow-y-auto">
          <div className="max-w-4xl">

            {/* Header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-[#FFD23F]/10 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-[#FFD23F]" strokeWidth={1.8} />
                </div>
                <div>
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/25 uppercase tracking-[1px]">Mission Control</p>
                  <h1 className="font-sans text-[26px] font-bold text-white leading-tight">Learning System</h1>
                </div>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 ml-[52px]">
                Generate and manage the entire Cyberussell curriculum from one place.
              </p>
            </div>

            {/* ── SECTION 1: Standards ── */}
            <div className="mb-10">
              <button
                onClick={() => setStandardsOpen(!standardsOpen)}
                className="w-full flex items-center justify-between mb-4 group"
              >
                <div className="flex items-center gap-2">
                  <h2 className="font-sans text-[16px] font-bold text-white">Learning System Standards</h2>
                  <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/20 uppercase tracking-wide bg-white/[0.05] px-2 py-0.5 rounded-full">Reference</span>
                </div>
                <div className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 group-hover:text-white/50 transition-colors">
                  {standardsOpen ? "Collapse" : "Expand"}
                  {standardsOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>

              {standardsOpen && (
                <div className="space-y-2">
                  {STANDARDS.map((s) => <AccordionSection key={s.id} s={s} />)}
                </div>
              )}

              {!standardsOpen && (
                <div className="flex flex-wrap gap-2">
                  {STANDARDS.map((s) => {
                    const Icon = s.icon;
                    return (
                      <div key={s.id} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <Icon size={12} style={{ color: s.color }} strokeWidth={2} />
                        <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/40">{s.title}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* ── SECTION 2: Generator ── */}
            <div className="mb-10">
              <h2 className="font-sans text-[16px] font-bold text-white mb-1">Generate Learning Content</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 mb-5">Use the Cyberussell Learning System standards to generate curriculum instantly.</p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {GENERATOR_CARDS.map((card) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(card)}
                      className="flex flex-col items-start gap-2.5 p-4 rounded-xl border border-white/[0.06] bg-[#14141e] hover:bg-white/[0.04] hover:border-white/[0.12] transition-all text-left group"
                    >
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${card.color}15` }}>
                        <Icon size={17} style={{ color: card.color }} strokeWidth={1.8} />
                      </div>
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-white leading-tight">{card.label}</p>
                        <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-0.5 leading-tight">{card.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── Generated Pillars ── */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-sans text-[16px] font-bold text-white">Generated Pillars</h2>
                  <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mt-0.5">{pillars.length} pillar{pillars.length !== 1 ? "s" : ""}</p>
                </div>
                <button
                  onClick={() => setShowGenPillar(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[12px] font-bold hover:bg-[#FFD23F]/90 transition-colors"
                >
                  <Plus size={13} strokeWidth={2.5} /> New Pillar
                </button>
              </div>

              {pillars.length === 0 ? (
                <div className="bg-[#14141e] border border-white/[0.06] rounded-xl px-6 py-14 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-[#FFD23F]/10 flex items-center justify-center mx-auto mb-3">
                    <Layers size={22} className="text-[#FFD23F]" strokeWidth={1.5} />
                  </div>
                  <p className="font-sans text-[15px] font-bold text-white mb-1">No pillars yet</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/30 mb-5">Generate your first learning pillar to get started.</p>
                  <button onClick={() => setShowGenPillar(true)} className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#FFD23F]/90 transition-colors mx-auto">
                    <Sparkles size={14} strokeWidth={2.5} /> Generate First Pillar
                  </button>
                </div>
              ) : (
                <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="grid grid-cols-[1fr_90px_80px_80px_110px_140px] gap-3 px-5 py-3 border-b border-white/[0.04]">
                    {["Name", "Difficulty", "Modules", "Status", "Updated", "Actions"].map((h, i) => (
                      <span key={h} className={`font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] ${i === 5 ? "text-right" : ""}`}>{h}</span>
                    ))}
                  </div>
                  {pillars.map((p) => (
                    <div key={p.slug} className="grid grid-cols-[1fr_90px_80px_80px_110px_140px] gap-3 px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors items-center last:border-0">
                      <a href={`/mission-control/learning-system/${p.slug}`} className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:text-[#FFD23F] transition-colors truncate">{p.name}</a>
                      <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 capitalize">{p.difficulty}</span>
                      <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30">{p.module_count}</span>
                      <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full w-fit ${p.status === "published" ? "text-[#00C97A] bg-[#00C97A]/10" : "text-[#FFD23F] bg-[#FFD23F]/10"}`}>{p.status}</span>
                      <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">{new Date(p.updated_at).toLocaleDateString()}</span>
                      <div className="flex items-center justify-end gap-1">
                        <a href={`/mission-control/learning-system/${p.slug}`} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors" title="Edit"><Pencil size={13} strokeWidth={2} /></a>
                        <button onClick={() => handlePublishToggle(p)} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors" title={p.status === "published" ? "Unpublish" : "Publish"}><Globe size={13} strokeWidth={2} /></button>
                        <button onClick={() => handleDuplicate(p.slug)} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors" title="Duplicate"><Copy size={13} strokeWidth={2} /></button>
                        <a href={`/mission-control/learning-system/${p.slug}`} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors" title="Preview"><Eye size={13} strokeWidth={2} /></a>
                        <button onClick={() => setDeleteConfirm(p.slug)} className="p-1.5 rounded hover:bg-[#E8373A]/10 text-white/30 hover:text-[#E8373A] transition-colors" title="Delete"><Trash2 size={13} strokeWidth={2} /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {showGenPillar && (
        <GeneratePillarModal
          onClose={() => setShowGenPillar(false)}
          onCreated={(slug) => { window.location.href = `/mission-control/learning-system/${slug}`; }}
        />
      )}

      {needsPillarFor && (
        <NeedsPillarModal
          label={GENERATOR_CARDS.find((c) => c.id === needsPillarFor)?.label ?? "Generate"}
          pillars={pillars}
          onClose={() => setNeedsPillarFor(null)}
          onSelect={handlePillarSelectedForGen}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
          <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-[380px] p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-sans text-[17px] font-bold text-white mb-2">Delete Pillar?</h3>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-5">This will permanently delete <span className="text-white font-medium">{pillars.find((p) => p.slug === deleteConfirm)?.name}</span> and all its generated content. This cannot be undone.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 rounded-lg font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 hover:bg-white/[0.04] transition-colors">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm!)} className="px-4 py-2 rounded-lg bg-[#E8373A]/20 text-[#E8373A] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-[#E8373A]/30 transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}
    </AuthGuard>
  );
}
