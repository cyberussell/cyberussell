"use client";

import { useEffect, useState } from "react";
import { BookOpen, GraduationCap, Briefcase, CheckCircle2, FileEdit } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type Stats = {
  blueprints: { total: number; published: number; draft: number };
  learning: { total: number; published: number; draft: number };
  services: { total: number; published: number; draft: number };
};

function StatCard({
  icon: Icon,
  color,
  label,
  total,
  published,
  draft,
}: {
  icon: React.ElementType;
  color: string;
  label: string;
  total: number;
  published: number;
  draft: number;
}) {
  return (
    <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className={color} strokeWidth={2} />
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/35 uppercase tracking-[1px]">{label}</span>
      </div>
      <div className="flex items-end gap-4">
        <div>
          <div className="font-sans text-[36px] font-bold text-white leading-none">{total}</div>
          <div className="font-[family-name:var(--font-inter)] text-[11px] text-white/25 mt-1">total</div>
        </div>
        <div className="mb-1 flex flex-col gap-0.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 size={11} className="text-[#00C97A]" />
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{published} published</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileEdit size={11} className="text-[#FFD23F]" />
            <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">{draft} draft</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/mission-control/analytics")
      .then((r) => r.json())
      .then((data) => {
        if (!data.error) setStats(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-4xl">
            <h1 className="font-sans text-[28px] font-bold text-white mb-1">Analytics</h1>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-8">Content inventory — what lives in Supabase and your filesystem.</p>

            {loading ? (
              <div className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">Loading…</div>
            ) : !stats ? (
              <div className="font-[family-name:var(--font-inter)] text-[13px] text-red-400">Failed to load stats.</div>
            ) : (
              <>
                <h2 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-3">Content Inventory</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <StatCard
                    icon={BookOpen}
                    color="text-[#00C97A]"
                    label="Career Blueprints"
                    total={stats.blueprints.total}
                    published={stats.blueprints.published}
                    draft={stats.blueprints.draft}
                  />
                  <StatCard
                    icon={GraduationCap}
                    color="text-[#3B82F6]"
                    label="Learning Pillars"
                    total={stats.learning.total}
                    published={stats.learning.published}
                    draft={stats.learning.draft}
                  />
                  <StatCard
                    icon={Briefcase}
                    color="text-[#A855F7]"
                    label="Services"
                    total={stats.services.total}
                    published={stats.services.published}
                    draft={stats.services.draft}
                  />
                </div>

                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/20 mt-8">
                  Website traffic, sessions, and SEO metrics are in Google Analytics and Vercel — no duplication here.
                </p>
              </>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
