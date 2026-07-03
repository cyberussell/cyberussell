"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Download, Trash2, Loader2, ClipboardList, Search } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type IntakeSummary = {
  id: string;
  client_name: string;
  business_name: string;
  service_ids: string[];
  status: "draft" | "sent" | "completed";
  updated_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  draft: "#FFD23F",
  sent: "#3B82F6",
  completed: "#00C97A",
};

export default function ClientIntakeListPage() {
  const [intakes, setIntakes] = useState<IntakeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/mission-control/client-intake");
    if (res.ok) setIntakes(await res.json());
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this client intake?")) return;
    setActionLoading(id);
    await fetch(`/api/mission-control/client-intake/${id}`, { method: "DELETE" });
    await load();
    setActionLoading(null);
  }

  function handleDownloadPDF(id: string) {
    window.open(`/mission-control/client-intake/${id}?print=1`, "_blank");
  }

  const filtered = intakes.filter((i) => {
    const q = search.toLowerCase();
    return (i.client_name ?? "").toLowerCase().includes(q) || (i.business_name ?? "").toLowerCase().includes(q);
  });

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-6xl">

            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h1 className="font-sans text-[28px] font-bold text-white mb-1">Client Intake</h1>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">
                  What you need from each potential client — pulled straight from the service catalog.
                </p>
              </div>
              <a
                href="/mission-control/client-intake/new"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors shrink-0"
              >
                <Plus size={15} strokeWidth={2.5} />
                New Intake
              </a>
            </div>

            <div className="relative mb-6 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                placeholder="Search by client or business name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-[#14141e] border border-white/[0.08] rounded-lg font-[family-name:var(--font-inter)] text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/20"
              />
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="text-white/20 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <ClipboardList size={40} className="text-white/10 mb-4" strokeWidth={1.5} />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/25 mb-6">
                  {search ? "No intakes match your search." : "No client intakes yet."}
                </p>
                {!search && (
                  <a
                    href="/mission-control/client-intake/new"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FFD23F] text-[#0a0a12] font-[family-name:var(--font-inter)] text-[14px] font-bold hover:bg-[#FFD23F]/90 transition-colors"
                  >
                    <Plus size={15} /> New Intake
                  </a>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filtered.map((intake) => (
                  <div
                    key={intake.id}
                    className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.10] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                          <ClipboardList size={16} className="text-white/30" strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-sans text-[15px] font-bold text-white truncate mb-1">
                            {intake.client_name || "Untitled Client"}
                          </h3>
                          <div className="flex items-center gap-3 flex-wrap">
                            {intake.business_name && (
                              <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 bg-white/[0.04] px-2 py-0.5 rounded">
                                {intake.business_name}
                              </span>
                            )}
                            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40">
                              {(intake.service_ids ?? []).length} service{(intake.service_ids ?? []).length === 1 ? "" : "s"} selected
                            </span>
                            <span className="font-[family-name:var(--font-inter)] text-[11px] capitalize" style={{ color: STATUS_COLORS[intake.status] || "#fff4" }}>
                              ● {intake.status}
                            </span>
                            <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">
                              Updated {new Date(intake.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`/mission-control/client-intake/${intake.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                        >
                          <Edit2 size={12} /> Edit
                        </a>
                        <button
                          onClick={() => handleDownloadPDF(intake.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                          title="Download PDF"
                        >
                          <Download size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(intake.id)}
                          disabled={actionLoading === intake.id}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/35 hover:text-red-400 hover:bg-white/[0.10] transition-colors disabled:opacity-40"
                          title="Delete"
                        >
                          {actionLoading === intake.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
