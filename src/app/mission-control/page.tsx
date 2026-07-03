"use client";

import { useEffect, useState } from "react";
import { BookOpen, FileEdit, Clock, Plus, Library, ExternalLink, GraduationCap, Briefcase, CheckCircle2, Users } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type BlueprintSummary = {
  slug: string;
  skill: string;
  category: string;
  status: string;
  updated_at: string;
};

type Stats = {
  blueprints: { total: number; published: number; draft: number };
  learning: { total: number; published: number; draft: number };
  services: { total: number; published: number; draft: number };
};

export default function DashboardPage() {
  const [blueprints, setBlueprints] = useState<BlueprintSummary[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [subscriberCount, setSubscriberCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/mission-control/blueprints").then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setBlueprints(data);
    });
    fetch("/api/mission-control/analytics").then((r) => r.json()).then((data) => {
      if (!data.error) setStats(data);
    });
    fetch("/api/mission-control/subscribers").then((r) => r.json()).then((data) => {
      if (Array.isArray(data)) setSubscriberCount(data.length);
    });
  }, []);

  const recent = [...blueprints].sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, 5);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-5xl">
            <h1 className="font-sans text-[28px] font-bold text-white mb-1">Dashboard</h1>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-8">Welcome back, Russell.</p>

            {/* Content inventory */}
            <h2 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-3">Content Inventory</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              {[
                { icon: BookOpen, color: "text-[#00C97A]", label: "Career Blueprints", data: stats?.blueprints },
                { icon: GraduationCap, color: "text-[#3B82F6]", label: "Learning Pillars", data: stats?.learning },
                { icon: Briefcase, color: "text-[#A855F7]", label: "Services", data: stats?.services },
              ].map(({ icon: Icon, color, label, data }) => (
                <div key={label} className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon size={16} className={color} strokeWidth={2} />
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/35 uppercase tracking-[1px]">{label}</span>
                  </div>
                  <div className="flex items-end gap-4">
                    <div>
                      <div className="font-sans text-[32px] font-bold text-white leading-none">{data?.total ?? "—"}</div>
                      <div className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 mt-1">total</div>
                    </div>
                    <div className="mb-0.5 flex flex-col gap-0.5">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={11} className="text-[#00C97A]" />
                        <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/40">{data?.published ?? "—"} published</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileEdit size={11} className="text-[#FFD23F]" />
                        <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/40">{data?.draft ?? "—"} draft</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribers */}
            <div className="mb-10">
              <h2 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-3">Subscribers</h2>
              <a href="/mission-control/subscribers" className="flex items-center justify-between bg-[#14141e] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.10] transition-colors max-w-xs">
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-[#FFD23F]" strokeWidth={2} />
                  <div>
                    <div className="font-sans text-[32px] font-bold text-white leading-none">{subscriberCount ?? "—"}</div>
                    <div className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 mt-1">total subscribers</div>
                  </div>
                </div>
              </a>
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
