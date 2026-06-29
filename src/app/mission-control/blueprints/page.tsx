"use client";

import { useEffect, useState } from "react";
import { Plus, Search, ExternalLink, Copy, Trash2, Pencil, X } from "lucide-react";
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
    fetch("/api/mission-control/blueprints").then((r) => r.json()).then(setBlueprints);
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
      {showWizard && <NewBlueprintWizard onClose={() => setShowWizard(false)} />}
    </AuthGuard>
  );
}

function NewBlueprintWizard({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("creative");
  const [difficulty, setDifficulty] = useState("beginner");
  const [creating, setCreating] = useState(false);

  async function handleCreate() {
    if (!name.trim()) return;
    setCreating(true);
    const slug = name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
    const template = {
      slug,
      skill: name.trim(),
      tagline: "",
      category,
      difficulty,
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
      <div className="bg-[#14141e] border border-white/[0.08] rounded-2xl w-full max-w-[440px] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-sans text-[20px] font-bold text-white">New Blueprint</h2>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/[0.06] text-white/30 hover:text-white/60 transition-colors">
            <X size={18} strokeWidth={2} />
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Skill Name</label>
            <input
              type="text"
              placeholder="e.g. Writing, Canva, SEO..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
              className="w-full bg-[#0e0e18] border border-white/[0.08] rounded-lg py-3 px-4 text-white text-[14px] placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors font-[family-name:var(--font-inter)]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-[#0e0e18] border border-white/[0.08] rounded-lg py-3 px-4 text-white text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/20">
                {["creative", "technical", "service", "teaching", "selling", "content", "trades", "admin"].map((c) => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Difficulty</label>
              <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="bg-[#0e0e18] border border-white/[0.08] rounded-lg py-3 px-4 text-white text-[14px] font-[family-name:var(--font-inter)] focus:outline-none focus:border-white/20">
                {["beginner", "intermediate", "advanced"].map((d) => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {name.trim() && (
            <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/25">
              URL: /careers/{name.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}
            </p>
          )}

          <button
            onClick={handleCreate}
            disabled={!name.trim() || creating}
            className="w-full bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 rounded-lg hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
          >
            {creating ? "Creating..." : "Create Blueprint"}
          </button>
        </div>
      </div>
    </div>
  );
}
