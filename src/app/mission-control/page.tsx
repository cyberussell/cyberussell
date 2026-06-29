"use client";

import { useEffect, useState } from "react";
import { BookOpen, FileEdit, Clock, Plus, Library, ExternalLink } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type BlueprintSummary = {
  slug: string;
  skill: string;
  category: string;
  status: string;
  updated_at: string;
};

export default function DashboardPage() {
  const [blueprints, setBlueprints] = useState<BlueprintSummary[]>([]);

  useEffect(() => {
    fetch("/api/mission-control/blueprints").then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setBlueprints(data);
    });
  }, []);

  const published = blueprints.filter((b) => b.status === "published");
  const drafts = blueprints.filter((b) => b.status === "draft");
  const recent = [...blueprints].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-5xl">
            <h1 className="font-sans text-[28px] font-bold text-white mb-1">Dashboard</h1>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-8">Welcome back, Russell.</p>

            {/* Summary cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen size={16} className="text-[#00C97A]" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/35 uppercase tracking-[1px]">Published</span>
                </div>
                <span className="font-sans text-[32px] font-bold text-white">{published.length}</span>
              </div>
              <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileEdit size={16} className="text-[#FFD23F]" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/35 uppercase tracking-[1px]">Drafts</span>
                </div>
                <span className="font-sans text-[32px] font-bold text-white">{drafts.length}</span>
              </div>
              <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={16} className="text-[#3B82F6]" strokeWidth={2} />
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/35 uppercase tracking-[1px]">Total</span>
                </div>
                <span className="font-sans text-[32px] font-bold text-white">{blueprints.length}</span>
              </div>
            </div>

            {/* Quick actions */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-3">Quick Actions</h2>
              <div className="flex flex-wrap gap-2">
                <a href="/mission-control/blueprints" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors">
                  <Plus size={15} strokeWidth={2.5} />
                  New Blueprint
                </a>
                <a href="/mission-control/blueprints" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/70 font-[family-name:var(--font-inter)] text-[13px] font-medium hover:bg-white/[0.10] transition-colors">
                  <Library size={15} strokeWidth={2} />
                  Open Blueprint Library
                </a>
                <a href="/" target="_blank" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.06] border border-white/[0.08] text-white/70 font-[family-name:var(--font-inter)] text-[13px] font-medium hover:bg-white/[0.10] transition-colors">
                  <ExternalLink size={15} strokeWidth={2} />
                  Preview Website
                </a>
              </div>
            </div>

            {/* Recently updated */}
            <div>
              <h2 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-3">Recently Updated</h2>
              <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden">
                {recent.map((b, i) => (
                  <a
                    key={b.slug}
                    href={`/mission-control/blueprints/${b.slug}`}
                    className={`flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.03] transition-colors ${i < recent.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-white">{b.skill}</span>
                      <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/20 uppercase tracking-wide bg-white/[0.04] px-2 py-0.5 rounded">{b.category}</span>
                    </div>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/25">
                      {new Date(b.updated_at).toLocaleDateString()}
                    </span>
                  </a>
                ))}
                {recent.length === 0 && (
                  <div className="px-5 py-8 text-center">
                    <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">No blueprints yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
