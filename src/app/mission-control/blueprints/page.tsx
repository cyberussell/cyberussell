"use client";

import { useEffect, useState } from "react";
import { Plus, Search, ExternalLink, Copy, Trash2, Pencil, X, BookOpen, ArrowRight, ArrowLeft, FileText, Sparkles, Check } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type BlueprintSummary = {
  slug: string;
  skill: string;
  category: string;
  difficulty: string;
  status: string;
  updated_at: string;
};

const CATEGORIES = ["all", "creative", "technical", "service", "teaching", "selling", "content", "trades", "admin"];

export default function BlueprintLibraryPage() {
  const [blueprints, setBlueprints] = useState<BlueprintSummary[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState<"name" | "updated">("updated");
  const [showWizard, setShowWizard] = useState(false);

  useEffect(() => {
    fetch("/api/mission-control/blueprints").then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setBlueprints(data);
    });
  }, []);

  async function handleDelete(slug: string, skill: string) {
    if (!confirm(`Delete "${skill}"?\n\nThis will permanently remove the blueprint. This cannot be undone.`)) return;
    await fetch(`/api/mission-control/blueprints/${slug}`, { method: "DELETE" });
    setBlueprints((prev) => prev.filter((b) => b.slug !== slug));
  }

  async function handleDuplicate(slug: string) {
    const res = await fetch(`/api/mission-control/blueprints/${slug}`);
    const data = await res.json();
    const newSlug = `${slug}-copy`;
    data.slug = newSlug;
    data.skill = `${data.skill} (Copy)`;
    data._status = "draft";
    const createRes = await fetch("/api/mission-control/blueprints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (createRes.ok) {
      window.location.href = `/mission-control/blueprints/${newSlug}`;
    }
  }

  const filtered = blueprints
    .filter((b) => statusFilter === "all" || b.status === statusFilter)
    .filter((b) => categoryFilter === "all" || b.category === categoryFilter)
    .filter((b) => b.skill.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "name") return a.skill.localeCompare(b.skill);
      return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
    });

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-5xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-sans text-[28px] font-bold text-white mb-1">Career Blueprints</h1>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">{blueprints.length} blueprints</p>
              </div>
              <button
                onClick={() => setShowWizard(true)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors"
              >
                <Plus size={15} strokeWidth={2.5} />
                New Blueprint
              </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" strokeWidth={2} />
                <input
                  type="text"
                  placeholder="Search blueprints..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#14141e] border border-white/[0.06] rounded-lg py-2.5 pl-10 pr-4 text-white text-[13px] placeholder-white/20 focus:outline-none focus:border-white/15 transition-colors font-[family-name:var(--font-inter)]"
                />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-[#14141e] border border-white/[0.06] rounded-lg px-4 py-2.5 text-white/60 text-[13px] font-[family-name:var(--font-inter)] focus:outline-none">
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
              </select>
              <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="bg-[#14141e] border border-white/[0.06] rounded-lg px-4 py-2.5 text-white/60 text-[13px] font-[family-name:var(--font-inter)] focus:outline-none">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c === "all" ? "All Categories" : c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "name" | "updated")} className="bg-[#14141e] border border-white/[0.06] rounded-lg px-4 py-2.5 text-white/60 text-[13px] font-[family-name:var(--font-inter)] focus:outline-none">
                <option value="updated">Sort: Last Updated</option>
                <option value="name">Sort: Name</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_90px_80px_80px_90px_120px] gap-3 px-5 py-3 border-b border-white/[0.04]">
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">Name</span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">Category</span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">Difficulty</span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">Status</span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px]">Updated</span>
                <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/25 uppercase tracking-[1px] text-right">Actions</span>
              </div>

              {filtered.map((b) => (
                <div key={b.slug} className="grid grid-cols-[1fr_90px_80px_80px_90px_120px] gap-3 px-5 py-3.5 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors items-center">
                  <a href={`/mission-control/blueprints/${b.slug}`} className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white hover:text-[#FFD23F] transition-colors truncate">
                    {b.skill}
                  </a>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 capitalize">{b.category}</span>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 capitalize">{b.difficulty}</span>
                  <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full w-fit ${b.status === "published" ? "text-[#00C97A] bg-[#00C97A]/10" : "text-[#FFD23F] bg-[#FFD23F]/10"}`}>
                    {b.status}
                  </span>
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">{new Date(b.updated_at).toLocaleDateString()}</span>
                  <div className="flex items-center justify-end gap-1">
                    <a href={`/mission-control/blueprints/${b.slug}`} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors" title="Edit">
                      <Pencil size={14} strokeWidth={2} />
                    </a>
                    <a href={`/careers/${b.slug}`} target="_blank" className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors" title="Preview">
                      <ExternalLink size={14} strokeWidth={2} />
                    </a>
                    <button onClick={() => handleDuplicate(b.slug)} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors" title="Duplicate">
                      <Copy size={14} strokeWidth={2} />
                    </button>
                    <button onClick={() => handleDelete(b.slug, b.skill)} className="p-1.5 rounded hover:bg-[#E8373A]/10 text-white/30 hover:text-[#E8373A] transition-colors" title="Delete">
                      <Trash2 size={14} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="px-5 py-12 text-center">
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">No blueprints found</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* New Blueprint Wizard */}
      {showWizard && <NewBlueprintWizard onClose={() => setShowWizard(false)} blueprints={blueprints} />}
    </AuthGuard>
  );
}

const CONTENT_TYPES = [
  { id: "career", label: "Career Blueprint", desc: "Step-by-step earning roadmap for a specific skill", icon: BookOpen, active: true },
  { id: "guide", label: "Guide", desc: "Educational content on a specific topic", icon: FileText, active: false },
];

const CATEGORIES_WITH_META = [
  { id: "creative", label: "Creative", desc: "Design, writing, video, photography" },
  { id: "technical", label: "Technical", desc: "Programming, data, IT support" },
  { id: "service", label: "Service", desc: "Customer support, consulting" },
  { id: "admin", label: "Admin", desc: "Virtual assistant, data entry" },
  { id: "teaching", label: "Teaching", desc: "Tutoring, coaching, courses" },
  { id: "selling", label: "Selling", desc: "E-commerce, reselling, dropship" },
  { id: "content", label: "Content", desc: "Social media, blogging, streaming" },
  { id: "trades", label: "Trades", desc: "Repair, crafts, food business" },
];

const AUDIENCES = [
  { id: "beginner", label: "Complete Beginners", desc: "No experience needed — anyone can start" },
  { id: "intermediate", label: "Some Experience", desc: "Has basic skills, needs direction" },
  { id: "advanced", label: "Experienced", desc: "Knows the skill, wants to monetize" },
];

const CREATE_METHODS = [
  { id: "blank", label: "Start Blank", desc: "Empty blueprint — write everything from scratch", icon: FileText, active: true },
  { id: "duplicate", label: "Duplicate Existing", desc: "Copy an existing blueprint as a starting point", icon: Copy, active: true },
  { id: "ai", label: "AI Draft", desc: "Generate a first draft using AI", icon: Sparkles, active: false },
];

function NewBlueprintWizard({ onClose, blueprints }: { onClose: () => void; blueprints: BlueprintSummary[] }) {
  const [step, setStep] = useState(1);
  const [contentType, setContentType] = useState("career");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [audience, setAudience] = useState("");
  const [method, setMethod] = useState("");
  const [duplicateFrom, setDuplicateFrom] = useState("");
  const [creating, setCreating] = useState(false);

  const slug = name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
  const totalSteps = 4;

  function canAdvance(): boolean {
    if (step === 1) return !!contentType;
    if (step === 2) return !!name.trim() && !!category;
    if (step === 3) return !!audience;
    if (step === 4) return !!method && (method !== "duplicate" || !!duplicateFrom);
    return false;
  }

  function next() {
    if (canAdvance() && step < totalSteps) setStep(step + 1);
    else if (step === totalSteps && canAdvance()) handleCreate();
  }

  function back() {
    if (step > 1) setStep(step - 1);
  }

  async function handleCreate() {
    if (creating) return;
    setCreating(true);

    if (method === "duplicate" && duplicateFrom) {
      const res = await fetch(`/api/mission-control/blueprints/${duplicateFrom}`);
      const data = await res.json();
      data.slug = slug;
      data.skill = name.trim();
      data.category = category;
      data.difficulty = audience;
      data._status = "draft";
      const createRes = await fetch("/api/mission-control/blueprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (createRes.ok) {
        window.location.href = `/mission-control/blueprints/${slug}`;
      } else {
        const err = await createRes.json();
        alert(err.error ?? "Failed to create");
        setCreating(false);
      }
      return;
    }

    const template = {
      slug,
      skill: name.trim(),
      tagline: "",
      category,
      difficulty: audience,
      earning_range: { min: 0, max: 0 },
      time_to_first_income: "",
      prerequisites: [],
      todays_mission: { tasks: [], estimated_time: "" },
      _status: "draft",
      summary: {
        description: "",
        who_is_this_for: [],
        reality_check: { honest_assessment: "", what_beginners_underestimate: "", why_people_fail: "", how_to_avoid_failure: "" },
      },
      roadmap: [],
      income_paths: [],
      platforms: [],
      tools: [],
      faq: [],
    };
    const res = await fetch("/api/mission-control/blueprints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(template),
    });
    if (res.ok) {
      window.location.href = `/mission-control/blueprints/${slug}`;
    } else {
      const err = await res.json();
      alert(err.error ?? "Failed to create");
      setCreating(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-[520px] shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-7 pb-0">
          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/25 uppercase tracking-[1px]">
              Step {step} of {totalSteps}
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-8 pt-3 pb-6">
          <div className="h-[3px] bg-white/[0.06] rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${(step / totalSteps) * 100}%` }} />
          </div>
        </div>

        {/* Step content */}
        <div className="px-8 pb-2 min-h-[280px]">
          {/* Step 1: Content Type */}
          {step === 1 && (
            <div>
              <h2 className="font-sans text-[22px] font-bold text-white mb-2">What are you creating?</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Choose the type of content.</p>
              <div className="flex flex-col gap-2.5">
                {CONTENT_TYPES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => { if (t.active) { setContentType(t.id); setStep(2); } }}
                      disabled={!t.active}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                        contentType === t.id
                          ? "bg-white/[0.06] border-white/[0.15]"
                          : t.active
                            ? "border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.10]"
                            : "border-white/[0.04] opacity-30 cursor-not-allowed"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${contentType === t.id ? "bg-white/[0.10]" : "bg-white/[0.04]"}`}>
                        <Icon size={18} className={contentType === t.id ? "text-white" : "text-white/40"} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1">
                        <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white block">{t.label}</span>
                        <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">{t.desc}</span>
                      </div>
                      {contentType === t.id && <Check size={18} className="text-[#00C97A] shrink-0" strokeWidth={2.5} />}
                      {!t.active && <span className="font-[family-name:var(--font-inter)] text-[9px] font-bold text-white/20 uppercase tracking-wide shrink-0">Soon</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Skill Name + Category */}
          {step === 2 && (
            <div>
              <h2 className="font-sans text-[22px] font-bold text-white mb-2">What skill is this for?</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Name the skill and choose a category.</p>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Skill Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Writing, Canva, SEO, Bookkeeping..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    onKeyDown={(e) => { if (e.key === "Enter" && canAdvance()) next(); }}
                    className="w-full bg-[#0e0e18] border border-white/[0.08] rounded-lg py-3.5 px-4 text-white text-[15px] placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors font-[family-name:var(--font-inter)]"
                  />
                  {name.trim() && (
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20 mt-0.5">
                      /careers/{slug}
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    {CATEGORIES_WITH_META.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => setCategory(c.id)}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          category === c.id
                            ? "bg-white/[0.06] border-white/[0.15]"
                            : "border-white/[0.06] hover:bg-white/[0.03]"
                        }`}
                      >
                        <span className="font-[family-name:var(--font-inter)] text-[13px] font-medium text-white block">{c.label}</span>
                        <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">{c.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Target Audience */}
          {step === 3 && (
            <div>
              <h2 className="font-sans text-[22px] font-bold text-white mb-2">Who is this for?</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Choose the target audience for this blueprint.</p>
              <div className="flex flex-col gap-2.5">
                {AUDIENCES.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { setAudience(a.id); setStep(4); }}
                    className={`flex items-center gap-4 p-5 rounded-xl border text-left transition-all ${
                      audience === a.id
                        ? "bg-white/[0.06] border-white/[0.15]"
                        : "border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.10]"
                    }`}
                  >
                    <div className="flex-1">
                      <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white block">{a.label}</span>
                      <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">{a.desc}</span>
                    </div>
                    {audience === a.id && <Check size={18} className="text-[#00C97A] shrink-0" strokeWidth={2.5} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Creation Method */}
          {step === 4 && (
            <div>
              <h2 className="font-sans text-[22px] font-bold text-white mb-2">How do you want to start?</h2>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 mb-6">Choose how to create &ldquo;{name}&rdquo;.</p>
              <div className="flex flex-col gap-2.5">
                {CREATE_METHODS.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => { if (m.active) setMethod(m.id); }}
                      disabled={!m.active}
                      className={`flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                        method === m.id
                          ? "bg-white/[0.06] border-white/[0.15]"
                          : m.active
                            ? "border-white/[0.06] hover:bg-white/[0.03] hover:border-white/[0.10]"
                            : "border-white/[0.04] opacity-30 cursor-not-allowed"
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${method === m.id ? "bg-white/[0.10]" : "bg-white/[0.04]"}`}>
                        <Icon size={18} className={method === m.id ? "text-white" : "text-white/40"} strokeWidth={1.8} />
                      </div>
                      <div className="flex-1">
                        <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white block">{m.label}</span>
                        <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">{m.desc}</span>
                      </div>
                      {method === m.id && <Check size={18} className="text-[#00C97A] shrink-0" strokeWidth={2.5} />}
                      {!m.active && <span className="font-[family-name:var(--font-inter)] text-[9px] font-bold text-white/20 uppercase tracking-wide shrink-0">Soon</span>}
                    </button>
                  );
                })}
              </div>

              {/* Duplicate picker */}
              {method === "duplicate" && (
                <div className="mt-4 flex flex-col gap-1.5">
                  <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Duplicate from</label>
                  <select
                    value={duplicateFrom}
                    onChange={(e) => setDuplicateFrom(e.target.value)}
                    className="bg-[#0e0e18] border border-white/[0.08] rounded-lg py-3 px-4 text-white text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/20"
                  >
                    <option value="">Select a blueprint...</option>
                    {blueprints.map((b) => (
                      <option key={b.slug} value={b.slug}>{b.skill}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-5 border-t border-white/[0.06]">
          <button
            onClick={step === 1 ? onClose : back}
            className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 transition-colors py-2 px-3 rounded-lg hover:bg-white/[0.04]"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            {step === 1 ? "Cancel" : "Back"}
          </button>
          <button
            onClick={next}
            disabled={!canAdvance() || creating}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {creating ? "Creating..." : step === totalSteps ? "Create Blueprint" : "Continue"}
            {!creating && step < totalSteps && <ArrowRight size={15} strokeWidth={2.5} />}
          </button>
        </div>
      </div>
    </div>
  );
}
