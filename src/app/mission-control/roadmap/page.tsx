"use client";

import { useEffect, useState } from "react";
import { GripVertical } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

const COLUMNS = ["Ideas", "Research", "Writing", "Review", "Published"] as const;
type Column = (typeof COLUMNS)[number];

type Card = {
  slug: string;
  skill: string;
  category: string;
  column: Column;
  updated_at: string;
};

export default function RoadmapPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/mission-control/blueprints")
      .then((r) => r.json())
      .then((blueprints: { slug: string; skill: string; category: string; status: string; updated_at: string }[]) => {
        setCards(
          blueprints.map((b) => ({
            slug: b.slug,
            skill: b.skill,
            category: b.category,
            column: b.status === "published" ? "Published" : "Writing",
            updated_at: b.updated_at,
          }))
        );
      });
  }, []);

  function handleDragStart(slug: string) {
    setDragging(slug);
  }

  function handleDrop(column: Column) {
    if (!dragging) return;
    setCards((prev) => prev.map((c) => (c.slug === dragging ? { ...c, column } : c)));
    setDragging(null);
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-x-auto">
          <div className="mb-8">
            <h1 className="font-sans text-[28px] font-bold text-white mb-1">Roadmap</h1>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40">Drag blueprints between columns to track progress.</p>
          </div>

          <div className="flex gap-4 min-w-[900px]">
            {COLUMNS.map((col) => {
              const colCards = cards.filter((c) => c.column === col);
              return (
                <div
                  key={col}
                  className="flex-1 min-w-[180px]"
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(col)}
                >
                  <div className="flex items-center justify-between mb-3 px-1">
                    <h3 className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/40 uppercase tracking-[1px]">{col}</h3>
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">{colCards.length}</span>
                  </div>

                  <div className="bg-[#0e0e18] border border-white/[0.04] rounded-xl p-2 min-h-[400px] flex flex-col gap-2">
                    {colCards.map((card) => (
                      <div
                        key={card.slug}
                        draggable
                        onDragStart={() => handleDragStart(card.slug)}
                        className={`bg-[#14141e] border border-white/[0.06] rounded-lg p-3 cursor-grab active:cursor-grabbing hover:border-white/[0.12] transition-colors ${dragging === card.slug ? "opacity-40" : ""}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <a href={`/mission-control/blueprints/${card.slug}`} className="font-[family-name:var(--font-inter)] text-[13px] font-medium text-white hover:text-[#FFD23F] transition-colors">
                              {card.skill}
                            </a>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/20 bg-white/[0.04] px-1.5 py-0.5 rounded">{card.category}</span>
                              <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/15">{new Date(card.updated_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <GripVertical size={14} className="text-white/15 shrink-0 mt-0.5" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
