"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, Eye, ChevronDown, ChevronRight, Plus, Trash2, ArrowLeft } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type AnyData = Record<string, unknown>;

function Section({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
        <h3 className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white">{title}</h3>
        {open ? <ChevronDown size={16} className="text-white/30" /> : <ChevronRight size={16} className="text-white/30" />}
      </button>
      {open && <div className="px-5 pb-5 flex flex-col gap-4 border-t border-white/[0.04] pt-4">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">{label}</label>
      {children}
    </div>
  );
}

const inputClass = "w-full bg-[#0e0e18] border border-white/[0.08] rounded-lg py-2.5 px-3.5 text-white text-[13px] placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors font-[family-name:var(--font-inter)]";
const textareaClass = `${inputClass} min-h-[100px] resize-y`;

export default function BlueprintEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch(`/api/mission-control/blueprints/${slug}`).then((r) => r.json()).then(setData);
  }, [slug]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const set = useCallback((path: string, value: any) => {
    setData((prev: AnyData) => {
      const next = JSON.parse(JSON.stringify(prev));
      const keys = path.split(".");
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return next;
    });
    setSaved(false);
  }, []);

  async function handleSave(publish = false) {
    setSaving(true);
    const payload = { ...data };
    if (publish) delete payload._status;
    else if (!publish && payload._status === undefined) payload._status = "draft";
    await fetch(`/api/mission-control/blueprints/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (!data) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen bg-[#0a0a12]">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          </main>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Top bar */}
          <div className="sticky top-0 z-20 bg-[#0a0a12]/95 backdrop-blur border-b border-white/[0.06] px-8 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => router.push("/mission-control/blueprints")} className="p-1.5 rounded hover:bg-white/[0.06] text-white/40 hover:text-white/60 transition-colors">
                <ArrowLeft size={18} strokeWidth={2} />
              </button>
              <h1 className="font-sans text-[18px] font-bold text-white">{data.skill || "Untitled"}</h1>
              <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full ${data._status === "draft" ? "text-[#FFD23F] bg-[#FFD23F]/10" : "text-[#00C97A] bg-[#00C97A]/10"}`}>
                {data._status === "draft" ? "Draft" : "Published"}
              </span>
              {saved && <span className="font-[family-name:var(--font-inter)] text-[12px] text-[#00C97A]">Saved</span>}
            </div>
            <div className="flex items-center gap-2">
              <a href={`/careers/${slug}`} target="_blank" className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/60 font-[family-name:var(--font-inter)] text-[12px] font-medium hover:bg-white/[0.10] transition-colors">
                <Eye size={14} strokeWidth={2} />
                Preview
              </a>
              <button onClick={() => handleSave(false)} disabled={saving} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/60 font-[family-name:var(--font-inter)] text-[12px] font-medium hover:bg-white/[0.10] transition-colors disabled:opacity-50">
                <Save size={14} strokeWidth={2} />
                Save Draft
              </button>
              <button onClick={() => handleSave(true)} disabled={saving} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[12px] font-bold hover:bg-white/90 transition-colors disabled:opacity-50">
                <Save size={14} strokeWidth={2} />
                Publish
              </button>
            </div>
          </div>

          {/* Editor sections */}
          <div className="p-8 md:p-12 max-w-4xl flex flex-col gap-4">
            {/* Basic Info */}
            <Section title="Basic Information" defaultOpen={true}>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Skill Name">
                  <input className={inputClass} value={data.skill} onChange={(e) => set("skill", e.target.value)} />
                </Field>
                <Field label="Slug">
                  <input className={inputClass} value={data.slug} disabled />
                </Field>
              </div>
              <Field label="Tagline">
                <input className={inputClass} value={data.tagline} onChange={(e) => set("tagline", e.target.value)} placeholder="One-line description..." />
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Category">
                  <select className={inputClass} value={data.category} onChange={(e) => set("category", e.target.value)}>
                    {["creative", "technical", "service", "teaching", "selling", "content", "trades", "admin"].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Difficulty">
                  <select className={inputClass} value={data.difficulty} onChange={(e) => set("difficulty", e.target.value)}>
                    {["beginner", "intermediate", "advanced"].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Time to First Income">
                  <input className={inputClass} value={data.time_to_first_income} onChange={(e) => set("time_to_first_income", e.target.value)} />
                </Field>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Min Earning (₱/month)">
                  <input type="number" className={inputClass} value={data.earning_range.min} onChange={(e) => set("earning_range.min", Number(e.target.value))} />
                </Field>
                <Field label="Max Earning (₱/month)">
                  <input type="number" className={inputClass} value={data.earning_range.max} onChange={(e) => set("earning_range.max", Number(e.target.value))} />
                </Field>
              </div>
              <Field label="Prerequisites (one per line)">
                <textarea className={textareaClass} value={(data.prerequisites ?? []).join("\n")} onChange={(e) => set("prerequisites", e.target.value.split("\n").filter(Boolean))} />
              </Field>
            </Section>

            {/* Today's Mission */}
            <Section title="Today's Mission">
              <Field label="Tasks (one per line)">
                <textarea className={textareaClass} value={(data.todays_mission?.tasks ?? []).join("\n")} onChange={(e) => set("todays_mission.tasks", e.target.value.split("\n").filter(Boolean))} />
              </Field>
              <Field label="Estimated Time">
                <input className={inputClass} value={data.todays_mission?.estimated_time ?? ""} onChange={(e) => set("todays_mission.estimated_time", e.target.value)} />
              </Field>
            </Section>

            {/* Summary */}
            <Section title="Summary">
              <Field label="Description">
                <textarea className={textareaClass} value={data.summary?.description ?? ""} onChange={(e) => set("summary.description", e.target.value)} />
              </Field>
              <Field label="Who Is This For (one per line)">
                <textarea className={textareaClass} value={(data.summary?.who_is_this_for ?? []).join("\n")} onChange={(e) => set("summary.who_is_this_for", e.target.value.split("\n").filter(Boolean))} />
              </Field>
            </Section>

            {/* Reality Check */}
            <Section title="Reality Check">
              <Field label="Honest Assessment">
                <textarea className={textareaClass} value={data.summary?.reality_check?.honest_assessment ?? ""} onChange={(e) => set("summary.reality_check.honest_assessment", e.target.value)} />
              </Field>
              <Field label="What Beginners Underestimate">
                <textarea className={textareaClass} value={data.summary?.reality_check?.what_beginners_underestimate ?? ""} onChange={(e) => set("summary.reality_check.what_beginners_underestimate", e.target.value)} />
              </Field>
              <Field label="Why People Fail">
                <textarea className={textareaClass} value={data.summary?.reality_check?.why_people_fail ?? ""} onChange={(e) => set("summary.reality_check.why_people_fail", e.target.value)} />
              </Field>
              <Field label="How to Avoid Failure">
                <textarea className={textareaClass} value={data.summary?.reality_check?.how_to_avoid_failure ?? ""} onChange={(e) => set("summary.reality_check.how_to_avoid_failure", e.target.value)} />
              </Field>
            </Section>

            {/* Roadmap */}
            <Section title="Roadmap">
              {(data.roadmap ?? []).map((phase: AnyData, pi: number) => (
                <div key={pi} className="bg-[#0e0e18] border border-white/[0.06] rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50">Phase {pi + 1}</span>
                    <button onClick={() => { const r = [...data.roadmap]; r.splice(pi, 1); set("roadmap", r); }} className="text-white/20 hover:text-[#E8373A] transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Title"><input className={inputClass} value={phase.title as string} onChange={(e) => set(`roadmap.${pi}.title`, e.target.value)} /></Field>
                    <Field label="Duration"><input className={inputClass} value={phase.duration as string} onChange={(e) => set(`roadmap.${pi}.duration`, e.target.value)} /></Field>
                  </div>
                  <Field label="Why"><textarea className={`${inputClass} min-h-[60px] resize-y`} value={phase.why as string ?? ""} onChange={(e) => set(`roadmap.${pi}.why`, e.target.value)} /></Field>
                  <Field label="Milestone"><input className={inputClass} value={phase.milestone as string} onChange={(e) => set(`roadmap.${pi}.milestone`, e.target.value)} /></Field>

                  {((phase.steps as AnyData[]) ?? []).map((step: AnyData, si: number) => (
                    <div key={si} className="bg-[#0a0a12] border border-white/[0.04] rounded-lg p-3 flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25">Step {si + 1}</span>
                        <button onClick={() => { const s = [...(phase.steps as AnyData[])]; s.splice(si, 1); set(`roadmap.${pi}.steps`, s); }} className="text-white/15 hover:text-[#E8373A]"><Trash2 size={12} /></button>
                      </div>
                      <Field label="Action"><input className={inputClass} value={step.action as string} onChange={(e) => set(`roadmap.${pi}.steps.${si}.action`, e.target.value)} /></Field>
                      <Field label="Detail"><textarea className={`${inputClass} min-h-[60px] resize-y`} value={step.detail as string} onChange={(e) => set(`roadmap.${pi}.steps.${si}.detail`, e.target.value)} /></Field>
                      <div className="grid grid-cols-3 gap-2">
                        <Field label="Est. Time"><input className={inputClass} value={step.estimated_time as string ?? ""} onChange={(e) => set(`roadmap.${pi}.steps.${si}.estimated_time`, e.target.value)} /></Field>
                        <Field label="Difficulty">
                          <select className={inputClass} value={step.difficulty as string ?? "easy"} onChange={(e) => set(`roadmap.${pi}.steps.${si}.difficulty`, e.target.value)}>
                            <option value="easy">Easy</option><option value="moderate">Moderate</option><option value="challenging">Challenging</option>
                          </select>
                        </Field>
                        <Field label="Action URL"><input className={inputClass} value={step.action_url as string ?? ""} onChange={(e) => set(`roadmap.${pi}.steps.${si}.action_url`, e.target.value)} /></Field>
                      </div>
                      <Field label="Outcome"><input className={inputClass} value={step.outcome as string ?? ""} onChange={(e) => set(`roadmap.${pi}.steps.${si}.outcome`, e.target.value)} /></Field>
                    </div>
                  ))}
                  <button onClick={() => { const s = [...((phase.steps as AnyData[]) ?? []), { action: "", detail: "", estimated_time: "", difficulty: "easy", outcome: "" }]; set(`roadmap.${pi}.steps`, s); }} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50 transition-colors">
                    <Plus size={14} /> Add Step
                  </button>
                </div>
              ))}
              <button onClick={() => set("roadmap", [...(data.roadmap ?? []), { phase: (data.roadmap?.length ?? 0) + 1, title: "", why: "", duration: "", steps: [], milestone: "" }])} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50 transition-colors">
                <Plus size={14} /> Add Phase
              </button>
            </Section>

            {/* Income Paths */}
            <Section title="Income Paths">
              {(data.income_paths ?? []).map((path: AnyData, i: number) => (
                <div key={i} className="bg-[#0e0e18] border border-white/[0.06] rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50">Path {i + 1}</span>
                    <button onClick={() => { const p = [...data.income_paths]; p.splice(i, 1); set("income_paths", p); }} className="text-white/20 hover:text-[#E8373A]"><Trash2 size={14} /></button>
                  </div>
                  <Field label="Title"><input className={inputClass} value={path.title as string} onChange={(e) => set(`income_paths.${i}.title`, e.target.value)} /></Field>
                  <Field label="Detail"><textarea className={`${inputClass} min-h-[60px] resize-y`} value={path.detail as string} onChange={(e) => set(`income_paths.${i}.detail`, e.target.value)} /></Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Min ₱/month"><input type="number" className={inputClass} value={(path.earning_range as AnyData)?.min as number ?? 0} onChange={(e) => set(`income_paths.${i}.earning_range.min`, Number(e.target.value))} /></Field>
                    <Field label="Max ₱/month"><input type="number" className={inputClass} value={(path.earning_range as AnyData)?.max as number ?? 0} onChange={(e) => set(`income_paths.${i}.earning_range.max`, Number(e.target.value))} /></Field>
                  </div>
                  <Field label="Best For"><input className={inputClass} value={path.best_for as string ?? ""} onChange={(e) => set(`income_paths.${i}.best_for`, e.target.value)} /></Field>
                  <Field label="Typical Beginner Mistake"><input className={inputClass} value={path.typical_beginner_mistake as string ?? ""} onChange={(e) => set(`income_paths.${i}.typical_beginner_mistake`, e.target.value)} /></Field>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Time to First Income"><input className={inputClass} value={path.time_to_first_income as string ?? ""} onChange={(e) => set(`income_paths.${i}.time_to_first_income`, e.target.value)} /></Field>
                    <Field label="First Client Difficulty">
                      <select className={inputClass} value={path.first_client_difficulty as string ?? "easy"} onChange={(e) => set(`income_paths.${i}.first_client_difficulty`, e.target.value)}>
                        <option value="easy">Easy</option><option value="moderate">Moderate</option><option value="hard">Hard</option>
                      </select>
                    </Field>
                  </div>
                </div>
              ))}
              <button onClick={() => set("income_paths", [...(data.income_paths ?? []), { title: "", detail: "", earning_range: { min: 0, max: 0 }, best_for: "", first_client_difficulty: "easy", typical_beginner_mistake: "", time_to_first_income: "" }])} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50">
                <Plus size={14} /> Add Income Path
              </button>
            </Section>

            {/* Platforms */}
            <Section title="Platforms">
              {(data.platforms ?? []).map((p: AnyData, i: number) => (
                <div key={i} className="bg-[#0e0e18] border border-white/[0.06] rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50">Platform {i + 1}</span>
                    <button onClick={() => { const pl = [...data.platforms]; pl.splice(i, 1); set("platforms", pl); }} className="text-white/20 hover:text-[#E8373A]"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Name"><input className={inputClass} value={p.name as string} onChange={(e) => set(`platforms.${i}.name`, e.target.value)} /></Field>
                    <Field label="URL"><input className={inputClass} value={p.url as string} onChange={(e) => set(`platforms.${i}.url`, e.target.value)} /></Field>
                  </div>
                  <Field label="Why"><textarea className={`${inputClass} min-h-[60px] resize-y`} value={p.why as string} onChange={(e) => set(`platforms.${i}.why`, e.target.value)} /></Field>
                  <Field label="Best For"><input className={inputClass} value={p.best_for as string ?? ""} onChange={(e) => set(`platforms.${i}.best_for`, e.target.value)} /></Field>
                </div>
              ))}
              <button onClick={() => set("platforms", [...(data.platforms ?? []), { name: "", url: "", why: "", best_for: "" }])} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50">
                <Plus size={14} /> Add Platform
              </button>
            </Section>

            {/* Tools */}
            <Section title="Tools">
              {(data.tools ?? []).map((t: AnyData, i: number) => (
                <div key={i} className="bg-[#0e0e18] border border-white/[0.06] rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50">Tool {i + 1}</span>
                    <button onClick={() => { const tl = [...data.tools]; tl.splice(i, 1); set("tools", tl); }} className="text-white/20 hover:text-[#E8373A]"><Trash2 size={14} /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Name"><input className={inputClass} value={t.name as string} onChange={(e) => set(`tools.${i}.name`, e.target.value)} /></Field>
                    <Field label="URL"><input className={inputClass} value={t.url as string} onChange={(e) => set(`tools.${i}.url`, e.target.value)} /></Field>
                  </div>
                  <Field label="Purpose"><input className={inputClass} value={t.purpose as string} onChange={(e) => set(`tools.${i}.purpose`, e.target.value)} /></Field>
                  <Field label="Why It Matters"><textarea className={`${inputClass} min-h-[60px] resize-y`} value={t.why_it_matters as string ?? ""} onChange={(e) => set(`tools.${i}.why_it_matters`, e.target.value)} /></Field>
                  <div className="grid grid-cols-3 gap-3">
                    <Field label="Free?">
                      <select className={inputClass} value={t.is_free ? "true" : "false"} onChange={(e) => set(`tools.${i}.is_free`, e.target.value === "true")}>
                        <option value="true">Yes</option><option value="false">No</option>
                      </select>
                    </Field>
                    <Field label="Required?">
                      <select className={inputClass} value={t.required ? "true" : "false"} onChange={(e) => set(`tools.${i}.required`, e.target.value === "true")}>
                        <option value="true">Yes</option><option value="false">No</option>
                      </select>
                    </Field>
                    <Field label="When to Start"><input className={inputClass} value={t.when_to_start as string ?? ""} onChange={(e) => set(`tools.${i}.when_to_start`, e.target.value)} /></Field>
                  </div>
                </div>
              ))}
              <button onClick={() => set("tools", [...(data.tools ?? []), { name: "", url: "", is_free: true, purpose: "", why_it_matters: "", required: false, when_to_start: "" }])} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50">
                <Plus size={14} /> Add Tool
              </button>
            </Section>

            {/* FAQ */}
            <Section title="FAQ">
              {(data.faq ?? []).map((f: AnyData, i: number) => (
                <div key={i} className="bg-[#0e0e18] border border-white/[0.06] rounded-lg p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/50">Q{i + 1}</span>
                    <button onClick={() => { const fq = [...data.faq]; fq.splice(i, 1); set("faq", fq); }} className="text-white/20 hover:text-[#E8373A]"><Trash2 size={14} /></button>
                  </div>
                  <Field label="Question"><input className={inputClass} value={f.question as string} onChange={(e) => set(`faq.${i}.question`, e.target.value)} /></Field>
                  <Field label="Answer"><textarea className={textareaClass} value={f.answer as string} onChange={(e) => set(`faq.${i}.answer`, e.target.value)} /></Field>
                </div>
              ))}
              <button onClick={() => set("faq", [...(data.faq ?? []), { question: "", answer: "" }])} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/30 hover:text-white/50">
                <Plus size={14} /> Add FAQ
              </button>
            </Section>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
