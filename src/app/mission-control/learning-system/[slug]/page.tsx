"use client";

import {
  ArrowLeft, Sparkles, BookOpen, HelpCircle, FileText, GraduationCap, Star,
  Library, Loader2, AlertCircle, ChevronDown, ChevronUp, CheckSquare, Globe,
  X, Check, Layers,
} from "lucide-react";
import { useState, useEffect, use } from "react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

// ─── Types ───────────────────────────────────────────────────────────────────

type Lesson = { id: string; title: string; summary: string };
type Module = {
  id: string; title: string; description: string;
  lessons: Lesson[]; key_concepts: string[]; practical_exercises: string[];
  ai_activities: string[]; chatgpt_prompts: string[]; claude_prompts: string[];
  reflection_questions: string[]; common_mistakes: string[]; checklist: string[];
};
type Pillar = {
  slug: string; name: string; description: string;
  difficulty: string; estimated_duration: string; target_audience: string;
  learning_outcome: string; _status: string; generated_at: string;
  overview: string; learning_objectives: string[]; skills_gained: string[];
  modules: Module[];
  capstone_project?: { title: string; description: string; deliverables: string[]; success_criteria: string[] };
  quiz?: { title: string; description: string; questions: { id: number; question: string; type: string; options?: string[]; correct_answer: string; explanation: string }[] };
  worksheet?: { title: string; description: string; sections: { title: string; instructions: string; exercises: { prompt: string; space: string }[] }[]; reflection_prompts: string[]; completion_checklist: string[] };
  cheat_sheet?: { title: string; tagline: string; sections: { title: string; items: { term: string; definition: string }[] }[]; quick_tips: string[]; key_prompts: string[]; remember: string };
  certificate?: { title: string; credential_name: string; description: string; requirements: string[]; skills_certified: string[]; validity: string; issuer: string };
  bida_badge?: { name: string; tagline: string; description: string; icon_concept: string; color: string; criteria: string[]; celebration_message: string };
  prompt_library?: { title: string; description: string; categories: { name: string; prompts: { title: string; prompt: string; use_case: string }[] }[] };
  recommended_next_pillar?: string;
  certificate_requirements?: string[];
  quiz_outline?: { total_questions: number; topics: string[] };
};

// ─── Sub-generators ───────────────────────────────────────────────────────────

const SUB_GENERATORS = [
  { id: "module", icon: BookOpen, color: "#60A5FA", label: "Generate Module", key: "modules" },
  { id: "quiz", icon: HelpCircle, color: "#A78BFA", label: "Generate Quiz", key: "quiz" },
  { id: "worksheet", icon: FileText, color: "#F472B6", label: "Generate Worksheet", key: "worksheet" },
  { id: "cheat_sheet", icon: Sparkles, color: "#2DD4BF", label: "Generate Cheat Sheet", key: "cheat_sheet" },
  { id: "certificate", icon: GraduationCap, color: "#818CF8", label: "Generate Certificate", key: "certificate" },
  { id: "bida_badge", icon: Star, color: "#FBBF24", label: "Generate Bida Badge", key: "bida_badge" },
  { id: "prompt_library", icon: Library, color: "#00C97A", label: "Generate Prompt Library", key: "prompt_library" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Tag({ children, color = "white" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="font-[family-name:var(--font-inter)] text-[11px] px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50" style={color !== "white" ? { backgroundColor: `${color}15`, color } : {}}>
      {children}
    </span>
  );
}

function SectionCard({ title, icon: Icon, color, children, defaultOpen = false }: { title: string; icon: React.ElementType; color: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/[0.02] transition-colors text-left">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
          <Icon size={15} style={{ color }} strokeWidth={1.8} />
        </div>
        <span className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-white flex-1">{title}</span>
        {open ? <ChevronUp size={14} className="text-white/25" /> : <ChevronDown size={14} className="text-white/25" />}
      </button>
      {open && <div className="px-5 pb-5 pt-0 border-t border-white/[0.04]">{children}</div>}
    </div>
  );
}

function List({ items, color = "#00C97A" }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-1.5 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ backgroundColor: color }} />
          <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ModuleCard({ mod }: { mod: Module }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-white/[0.02] transition-colors text-left">
        <div className="w-7 h-7 rounded-lg bg-[#60A5FA]/10 flex items-center justify-center shrink-0">
          <BookOpen size={13} className="text-[#60A5FA]" strokeWidth={2} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-white truncate">{mod.title}</p>
          <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30">{mod.lessons?.length ?? 0} lessons</p>
        </div>
        {open ? <ChevronUp size={14} className="text-white/25 shrink-0" /> : <ChevronDown size={14} className="text-white/25 shrink-0" />}
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-white/[0.04] space-y-4">
          {mod.description && <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mt-3 leading-relaxed">{mod.description}</p>}

          {mod.lessons?.length > 0 && (
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-2">Lessons</p>
              <div className="space-y-1.5">
                {mod.lessons.map((l, i) => (
                  <div key={l.id} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white/[0.02]">
                    <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/20 mt-0.5 shrink-0 w-4">{i + 1}</span>
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-[12px] font-medium text-white/80">{l.title}</p>
                      {l.summary && <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/35 mt-0.5">{l.summary}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {[
            { label: "Key Concepts", items: mod.key_concepts, color: "#60A5FA" },
            { label: "Practical Exercises", items: mod.practical_exercises, color: "#34D399" },
            { label: "AI Activities", items: mod.ai_activities, color: "#2DD4BF" },
            { label: "ChatGPT Prompts", items: mod.chatgpt_prompts, color: "#A78BFA" },
            { label: "Claude Prompts", items: mod.claude_prompts, color: "#FB923C" },
            { label: "Reflection Questions", items: mod.reflection_questions, color: "#F472B6" },
            { label: "Common Mistakes", items: mod.common_mistakes, color: "#E8373A" },
            { label: "Completion Checklist", items: mod.checklist, color: "#00C97A" },
          ].filter((s) => s.items?.length > 0).map((s) => (
            <div key={s.label}>
              <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1">{s.label}</p>
              <List items={s.items} color={s.color} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Generate sub-content modal ───────────────────────────────────────────────

function SubGenerateModal({ type, label, pillarSlug, onClose, onDone }: { type: string; label: string; pillarSlug: string; onClose: () => void; onDone: () => void }) {
  const [context, setContext] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const gen = SUB_GENERATORS.find((g) => g.id === type);

  async function generate() {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/mission-control/pillars/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, pillar_slug: pillarSlug, context }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Generation failed"); setLoading(false); return; }
      setDone(true);
      setTimeout(() => { onDone(); onClose(); }, 1000);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-[440px] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {gen && (
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${gen.color}15` }}>
                <gen.icon size={15} style={{ color: gen.color }} strokeWidth={1.8} />
              </div>
            )}
            <h2 className="font-sans text-[17px] font-bold text-white">{label}</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 transition-colors"><X size={16} strokeWidth={2} /></button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#E8373A]/10 border border-[#E8373A]/20">
              <AlertCircle size={13} className="text-[#E8373A] shrink-0" />
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#E8373A]">{error}</p>
            </div>
          )}
          {done && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-[#00C97A]/10 border border-[#00C97A]/20">
              <Check size={13} className="text-[#00C97A] shrink-0" />
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#00C97A]">Generated successfully!</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Optional Context</label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder={type === "module" ? "What topic should this module cover?" : "Any specific focus or context for generation?"}
              rows={3}
              className="w-full bg-[#0e0e18] border border-white/[0.08] rounded-lg py-2.5 px-3.5 text-white text-[13px] placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors font-[family-name:var(--font-inter)] resize-none"
            />
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 border-t border-white/[0.06]">
          <button onClick={onClose} disabled={loading} className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 px-3 py-2 rounded-lg hover:bg-white/[0.04] transition-colors">Cancel</button>
          <button onClick={generate} disabled={loading || done} style={gen ? { backgroundColor: gen.color } : {}} className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? <><Loader2 size={13} className="animate-spin" /> Generating...</> : done ? <><Check size={13} /> Done</> : <><Sparkles size={13} strokeWidth={2.5} /> Generate</>}
          </button>
        </div>

        {loading && (
          <div className="px-6 pb-4">
            <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 text-center">This takes about 10-20 seconds...</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function PillarEditorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [pillar, setPillar] = useState<Pillar | null>(null);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);
  const [activeGen, setActiveGen] = useState<string | null>(null);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const genType = sp.get("generate");
    if (genType) {
      setActiveGen(genType);
      window.history.replaceState({}, "", window.location.pathname);
    }
    loadPillar();
  }, []);

  async function loadPillar() {
    setLoading(true);
    const res = await fetch(`/api/mission-control/pillars/${slug}`);
    if (res.ok) setPillar(await res.json());
    setLoading(false);
  }

  async function togglePublish() {
    if (!pillar) return;
    setPublishing(true);
    const updated = { ...pillar, _status: pillar._status === "published" ? "draft" : "published" };
    await fetch(`/api/mission-control/pillars/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    setPillar(updated);
    setPublishing(false);
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen bg-[#0a0a12]">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 size={24} className="text-white/20 animate-spin" />
          </main>
        </div>
      </AuthGuard>
    );
  }

  if (!pillar) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen bg-[#0a0a12]">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/30 mb-3">Pillar not found.</p>
              <a href="/mission-control/learning-system" className="font-[family-name:var(--font-inter)] text-[13px] text-[#FFD23F]">← Back to Learning System</a>
            </div>
          </main>
        </div>
      </AuthGuard>
    );
  }

  const genLabel = SUB_GENERATORS.find((g) => g.id === activeGen)?.label ?? "";

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-10 overflow-y-auto">
          <div className="max-w-3xl">

            {/* Back + Header */}
            <a href="/mission-control/learning-system" className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/55 transition-colors mb-6">
              <ArrowLeft size={13} strokeWidth={2} /> Learning System
            </a>

            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${pillar._status === "published" ? "text-[#00C97A] bg-[#00C97A]/10" : "text-[#FFD23F] bg-[#FFD23F]/10"}`}>
                    {pillar._status}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 capitalize">{pillar.difficulty}</span>
                  {pillar.estimated_duration && <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">{pillar.estimated_duration}</span>}
                </div>
                <h1 className="font-sans text-[26px] font-bold text-white leading-tight">{pillar.name}</h1>
                {pillar.description && <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mt-1">{pillar.description}</p>}
              </div>
              <button onClick={togglePublish} disabled={publishing} className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-white/[0.10] font-[family-name:var(--font-inter)] text-[12px] text-white/50 hover:text-white/70 hover:bg-white/[0.04] transition-colors shrink-0 disabled:opacity-50">
                <Globe size={13} strokeWidth={2} />
                {publishing ? "Saving..." : pillar._status === "published" ? "Unpublish" : "Publish"}
              </button>
            </div>

            {/* Sub-generators toolbar */}
            <div className="mb-8">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/25 uppercase tracking-[1px] mb-3">Generate for this pillar</p>
              <div className="flex flex-wrap gap-2">
                {SUB_GENERATORS.map((g) => {
                  const Icon = g.icon;
                  const hasContent = g.key === "modules"
                    ? (pillar.modules?.length ?? 0) > 0
                    : !!pillar[g.key as keyof Pillar];
                  return (
                    <button
                      key={g.id}
                      onClick={() => setActiveGen(g.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all font-[family-name:var(--font-inter)] text-[12px]"
                      style={hasContent
                        ? { borderColor: `${g.color}30`, backgroundColor: `${g.color}10`, color: g.color }
                        : { borderColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }
                      }
                    >
                      <Icon size={12} strokeWidth={2} />
                      {g.label.replace("Generate ", "")}
                      {hasContent && <CheckSquare size={11} strokeWidth={2} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pillar info */}
            {(pillar.target_audience || pillar.learning_outcome) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {pillar.target_audience && (
                  <div className="p-4 rounded-xl bg-[#14141e] border border-white/[0.06]">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1.5">Target Audience</p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65">{pillar.target_audience}</p>
                  </div>
                )}
                {pillar.learning_outcome && (
                  <div className="p-4 rounded-xl bg-[#14141e] border border-white/[0.06]">
                    <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1.5">Learning Outcome</p>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65">{pillar.learning_outcome}</p>
                  </div>
                )}
              </div>
            )}

            {/* Overview */}
            {pillar.overview && (
              <div className="mb-4 p-5 rounded-xl bg-[#14141e] border border-white/[0.06]">
                <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-2">Overview</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/65 leading-relaxed">{pillar.overview}</p>
              </div>
            )}

            {/* Objectives + Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {pillar.learning_objectives?.length > 0 && (
                <div className="p-5 rounded-xl bg-[#14141e] border border-white/[0.06]">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-2">Learning Objectives</p>
                  <List items={pillar.learning_objectives} color="#60A5FA" />
                </div>
              )}
              {pillar.skills_gained?.length > 0 && (
                <div className="p-5 rounded-xl bg-[#14141e] border border-white/[0.06]">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-2">Skills Gained</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {pillar.skills_gained.map((s) => <Tag key={s} color="#34D399">{s}</Tag>)}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              {/* Modules */}
              {pillar.modules?.length > 0 && (
                <SectionCard title={`Modules (${pillar.modules.length})`} icon={BookOpen} color="#60A5FA" defaultOpen>
                  <div className="space-y-2 mt-3">
                    {pillar.modules.map((mod) => <ModuleCard key={mod.id} mod={mod} />)}
                  </div>
                </SectionCard>
              )}

              {/* Capstone */}
              {pillar.capstone_project && (
                <SectionCard title="Capstone Project" icon={Layers} color="#34D399">
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white">{pillar.capstone_project.title}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 mt-1">{pillar.capstone_project.description}</p>
                    </div>
                    {pillar.capstone_project.deliverables?.length > 0 && (
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1">Deliverables</p>
                        <List items={pillar.capstone_project.deliverables} color="#34D399" />
                      </div>
                    )}
                    {pillar.capstone_project.success_criteria?.length > 0 && (
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1">Success Criteria</p>
                        <List items={pillar.capstone_project.success_criteria} color="#00C97A" />
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Quiz */}
              {pillar.quiz && (
                <SectionCard title="Quiz" icon={HelpCircle} color="#A78BFA">
                  <div className="mt-3 space-y-3">
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white">{pillar.quiz.title}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mt-1">{pillar.quiz.description}</p>
                    </div>
                    {pillar.quiz.questions?.map((q) => (
                      <div key={q.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                        <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/25 mb-1">Q{q.id}</p>
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/80 font-medium">{q.question}</p>
                        {q.options && (
                          <div className="mt-2 space-y-1">
                            {q.options.map((opt, i) => (
                              <p key={i} className={`font-[family-name:var(--font-inter)] text-[12px] ${opt === q.correct_answer || String.fromCharCode(65 + i) === q.correct_answer ? "text-[#00C97A]" : "text-white/40"}`}>
                                {String.fromCharCode(65 + i)}. {opt}
                              </p>
                            ))}
                          </div>
                        )}
                        {q.explanation && <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-2 italic">{q.explanation}</p>}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Worksheet */}
              {pillar.worksheet && (
                <SectionCard title="Worksheet" icon={FileText} color="#F472B6">
                  <div className="mt-3 space-y-4">
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white">{pillar.worksheet.title}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mt-1">{pillar.worksheet.description}</p>
                    </div>
                    {pillar.worksheet.sections?.map((sec, i) => (
                      <div key={i} className="border border-white/[0.05] rounded-xl p-4">
                        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white mb-1">{sec.title}</p>
                        <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 mb-3">{sec.instructions}</p>
                        {sec.exercises?.map((ex, j) => (
                          <div key={j} className="mb-3">
                            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/70">{j + 1}. {ex.prompt}</p>
                            <div className="mt-1.5 h-[2px] bg-white/[0.06] rounded w-full" />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Cheat Sheet */}
              {pillar.cheat_sheet && (
                <SectionCard title="Cheat Sheet" icon={Sparkles} color="#2DD4BF">
                  <div className="mt-3 space-y-4">
                    <div>
                      <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white">{pillar.cheat_sheet.title}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#2DD4BF] mt-0.5">{pillar.cheat_sheet.tagline}</p>
                    </div>
                    {pillar.cheat_sheet.sections?.map((sec, i) => (
                      <div key={i}>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-2">{sec.title}</p>
                        <div className="space-y-1.5">
                          {sec.items?.map((item, j) => (
                            <div key={j} className="flex gap-2">
                              <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-[#2DD4BF] shrink-0 w-28">{item.term}</span>
                              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{item.definition}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {pillar.cheat_sheet.remember && (
                      <div className="p-3 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/20">
                        <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#2DD4BF]">Remember: {pillar.cheat_sheet.remember}</p>
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Certificate */}
              {pillar.certificate && (
                <SectionCard title="Certificate" icon={GraduationCap} color="#818CF8">
                  <div className="mt-3 space-y-3">
                    <div className="p-4 rounded-xl bg-[#818CF8]/[0.06] border border-[#818CF8]/[0.15] text-center">
                      <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#818CF8]/60 uppercase tracking-[1px] mb-1">{pillar.certificate.issuer}</p>
                      <p className="font-sans text-[18px] font-bold text-white">{pillar.certificate.credential_name}</p>
                      <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 mt-1">{pillar.certificate.validity}</p>
                    </div>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55">{pillar.certificate.description}</p>
                    {pillar.certificate.requirements?.length > 0 && (
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1">Requirements</p>
                        <List items={pillar.certificate.requirements} color="#818CF8" />
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Bida Badge */}
              {pillar.bida_badge && (
                <SectionCard title="Bida Badge" icon={Star} color="#FBBF24">
                  <div className="mt-3 space-y-3">
                    <div className="p-4 rounded-xl bg-[#FBBF24]/[0.06] border border-[#FBBF24]/[0.15]">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#FBBF24]/20 flex items-center justify-center shrink-0">
                          <Star size={22} className="text-[#FBBF24]" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="font-sans text-[16px] font-bold text-white">{pillar.bida_badge.name}</p>
                          <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#FBBF24]/80">{pillar.bida_badge.tagline}</p>
                        </div>
                      </div>
                    </div>
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55">{pillar.bida_badge.description}</p>
                    {pillar.bida_badge.criteria?.length > 0 && (
                      <div>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1">Criteria</p>
                        <List items={pillar.bida_badge.criteria} color="#FBBF24" />
                      </div>
                    )}
                    {pillar.bida_badge.celebration_message && (
                      <div className="p-3 rounded-lg bg-[#FBBF24]/10 border border-[#FBBF24]/20">
                        <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#FBBF24]">🎉 {pillar.bida_badge.celebration_message}</p>
                      </div>
                    )}
                  </div>
                </SectionCard>
              )}

              {/* Prompt Library */}
              {pillar.prompt_library && (
                <SectionCard title="Prompt Library" icon={Library} color="#00C97A">
                  <div className="mt-3 space-y-4">
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50">{pillar.prompt_library.description}</p>
                    {pillar.prompt_library.categories?.map((cat, i) => (
                      <div key={i}>
                        <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-2">{cat.name}</p>
                        <div className="space-y-2">
                          {cat.prompts?.map((p, j) => (
                            <div key={j} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                              <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/70 mb-1">{p.title}</p>
                              <p className="font-mono text-[12px] text-[#00C97A]/80 bg-[#00C97A]/[0.05] px-3 py-2 rounded-lg leading-relaxed">{p.prompt}</p>
                              {p.use_case && <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 mt-1.5">{p.use_case}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              )}

              {/* Recommended Next */}
              {pillar.recommended_next_pillar && (
                <div className="p-5 rounded-xl bg-[#14141e] border border-white/[0.06]">
                  <p className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] mb-1">Recommended Next Pillar</p>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-white">{pillar.recommended_next_pillar}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {activeGen && (
        <SubGenerateModal
          type={activeGen}
          label={genLabel}
          pillarSlug={slug}
          onClose={() => setActiveGen(null)}
          onDone={loadPillar}
        />
      )}
    </AuthGuard>
  );
}
