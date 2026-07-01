"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Copy, Download, Archive, Loader2, Briefcase, Search, Filter } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type ServiceSummary = {
  id: string;
  name: string;
  category: string;
  starting_price: string;
  status: "draft" | "active" | "archived";
  featured: boolean;
  updated_at: string;
};

const STATUS_COLORS: Record<string, string> = {
  active: "#00C97A",
  draft: "#FFD23F",
  archived: "#ffffff40",
};

export default function ServiceCatalogPage() {
  const [services, setServices] = useState<ServiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  useEffect(() => {
    loadServices();
  }, []);

  async function loadServices() {
    setLoading(true);
    const res = await fetch("/api/mission-control/services");
    if (res.ok) {
      const data = await res.json();
      setServices(data);
    }
    setLoading(false);
  }

  async function handleDuplicate(service: ServiceSummary) {
    setActionLoading(`dup-${service.id}`);
    const res = await fetch(`/api/mission-control/services/${service.id}`);
    if (res.ok) {
      const full = await res.json();
      const newId = `service-${Date.now()}`;
      await fetch("/api/mission-control/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...full, id: newId, name: `${full.name} (Copy)`, status: "draft" }),
      });
      await loadServices();
    }
    setActionLoading(null);
  }

  async function handleArchive(id: string) {
    if (!confirm("Archive this service?")) return;
    setActionLoading(`arch-${id}`);
    await fetch(`/api/mission-control/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "archived" }),
    });
    await loadServices();
    setActionLoading(null);
  }

  function handleDownloadPDF(service: ServiceSummary) {
    window.open(`/mission-control/service-catalog/${service.id}?print=1`, "_blank");
  }

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    all: services.length,
    active: services.filter((s) => s.status === "active").length,
    draft: services.filter((s) => s.status === "draft").length,
    archived: services.filter((s) => s.status === "archived").length,
  };

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-6xl">

            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-8">
              <div>
                <h1 className="font-sans text-[28px] font-bold text-white mb-1">Service Catalog</h1>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">Your master database of Cyberussell services.</p>
              </div>
              <a
                href="/mission-control/service-catalog/new"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors shrink-0"
              >
                <Plus size={15} strokeWidth={2.5} />
                New Service
              </a>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#14141e] border border-white/[0.08] rounded-lg font-[family-name:var(--font-inter)] text-[13px] text-white placeholder:text-white/25 focus:outline-none focus:border-white/20"
                />
              </div>
              <div className="flex items-center gap-1.5 bg-[#14141e] border border-white/[0.08] rounded-lg p-1">
                <Filter size={13} className="text-white/25 ml-2" />
                {(["all", "active", "draft", "archived"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1.5 rounded-md font-[family-name:var(--font-inter)] text-[12px] font-medium capitalize transition-colors ${
                      statusFilter === s ? "bg-white/[0.10] text-white" : "text-white/35 hover:text-white/60"
                    }`}
                  >
                    {s} <span className="text-white/25">({counts[s]})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cards */}
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={24} className="text-white/20 animate-spin" />
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Briefcase size={40} className="text-white/10 mb-4" strokeWidth={1.5} />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/25 mb-2">
                  {search || statusFilter !== "all" ? "No services match your filters." : "No services yet."}
                </p>
                {!search && statusFilter === "all" && (
                  <a href="/mission-control/service-catalog/new" className="font-[family-name:var(--font-inter)] text-[13px] text-white/40 hover:text-white/60 transition-colors mt-1">
                    + Create your first service
                  </a>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {filtered.map((service) => (
                  <div
                    key={service.id}
                    className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.10] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center shrink-0">
                          <Briefcase size={16} className="text-white/30" strokeWidth={1.8} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="font-sans text-[15px] font-bold text-white truncate">{service.name}</h3>
                            {service.featured && (
                              <span className="font-[family-name:var(--font-inter)] text-[9px] font-bold text-[#FFD23F] bg-[#FFD23F]/10 border border-[#FFD23F]/20 px-2 py-0.5 rounded uppercase tracking-wide">Featured</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/35 bg-white/[0.04] px-2 py-0.5 rounded">{service.category || "Uncategorized"}</span>
                            <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/60">{service.starting_price || "—"}</span>
                            <span className="font-[family-name:var(--font-inter)] text-[11px]" style={{ color: STATUS_COLORS[service.status] || "#fff4" }}>
                              ● {service.status}
                            </span>
                            <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">
                              Updated {new Date(service.updated_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <a
                          href={`/mission-control/service-catalog/${service.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                        >
                          <Edit2 size={12} /> Edit
                        </a>
                        <button
                          onClick={() => handleDuplicate(service)}
                          disabled={actionLoading === `dup-${service.id}`}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors disabled:opacity-40"
                          title="Duplicate"
                        >
                          {actionLoading === `dup-${service.id}` ? <Loader2 size={12} className="animate-spin" /> : <Copy size={12} />}
                        </button>
                        <button
                          onClick={() => handleDownloadPDF(service)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                          title="Download PDF / Print Proposal"
                        >
                          <Download size={12} />
                        </button>
                        {service.status !== "archived" && (
                          <button
                            onClick={() => handleArchive(service.id)}
                            disabled={actionLoading === `arch-${service.id}`}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/35 hover:text-white/60 hover:bg-white/[0.10] transition-colors disabled:opacity-40"
                            title="Archive"
                          >
                            {actionLoading === `arch-${service.id}` ? <Loader2 size={12} className="animate-spin" /> : <Archive size={12} />}
                          </button>
                        )}
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
