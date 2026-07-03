"use client";

import { useEffect, useState } from "react";
import { Users, Trash2, Loader2, Search, Download } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type Subscriber = {
  id: string;
  name: string;
  email: string;
  source: string;
  created_at: string;
};

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/mission-control/subscribers");
    if (res.ok) setSubscribers(await res.json());
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this subscriber?")) return;
    setActionLoading(id);
    await fetch(`/api/mission-control/subscribers/${id}`, { method: "DELETE" });
    await load();
    setActionLoading(null);
  }

  function handleExportCSV() {
    const rows = [
      ["Name", "Email", "Source", "Subscribed At"],
      ...filtered.map((s) => [s.name, s.email, s.source, s.created_at]),
    ];
    const csv = rows.map((r) => r.map((v) => `"${(v ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = subscribers.filter((s) => {
    const q = search.toLowerCase();
    return (s.name ?? "").toLowerCase().includes(q) || (s.email ?? "").toLowerCase().includes(q);
  });

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-6xl">

            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h1 className="font-sans text-[28px] font-bold text-white mb-1">Subscribers</h1>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">
                  Everyone who signed up for updates across the site.
                </p>
              </div>
              <button
                onClick={handleExportCSV}
                disabled={filtered.length === 0}
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors shrink-0 disabled:opacity-40"
              >
                <Download size={15} strokeWidth={2.5} />
                Export CSV
              </button>
            </div>

            <div className="relative mb-6 max-w-sm">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="text"
                placeholder="Search by name or email..."
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
                <Users size={40} className="text-white/10 mb-4" strokeWidth={1.5} />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/25">
                  {search ? "No subscribers match your search." : "No subscribers yet."}
                </p>
              </div>
            ) : (
              <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden">
                {filtered.map((s, i) => (
                  <div
                    key={s.id}
                    className={`flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors ${i < filtered.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                        <Users size={14} className="text-white/30" strokeWidth={1.8} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white truncate">
                            {s.name || s.email}
                          </span>
                          <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/20 uppercase tracking-wide bg-white/[0.04] px-2 py-0.5 rounded shrink-0">
                            {s.source}
                          </span>
                        </div>
                        {s.name && (
                          <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35">{s.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">
                        {new Date(s.created_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => handleDelete(s.id)}
                        disabled={actionLoading === s.id}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/35 hover:text-red-400 hover:bg-white/[0.10] transition-colors disabled:opacity-40"
                        title="Remove"
                      >
                        {actionLoading === s.id ? <Loader2 size={12} className="animate-spin" /> : <Trash2 size={12} />}
                      </button>
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
