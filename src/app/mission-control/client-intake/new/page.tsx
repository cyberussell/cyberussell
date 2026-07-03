"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

export default function NewClientIntakePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!name.trim()) { setError("Client name is required."); return; }
    setSaving(true);
    const id = `intake-${Date.now()}`;
    const res = await fetch("/api/mission-control/client-intake", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, client_name: name.trim(), status: "draft" }),
    });
    if (res.ok) {
      const data = await res.json();
      router.push(`/mission-control/client-intake/${data.id}`);
    } else {
      setError("Failed to create intake.");
      setSaving(false);
    }
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 flex items-start">
          <div className="max-w-lg w-full">
            <a href="/mission-control/client-intake" className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 hover:text-white/60 transition-colors mb-6 inline-block">
              ← Client Intake
            </a>
            <h1 className="font-sans text-[24px] font-bold text-white mb-2">New Client Intake</h1>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-8">Give the intake a client name to get started. You&apos;ll pick services and fill in details next.</p>

            <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-6">
              <label className="block font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/40 uppercase tracking-[1px] mb-2">
                Client Name
              </label>
              <input
                type="text"
                autoFocus
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                onKeyDown={(e) => { if (e.key === "Enter") handleCreate(); }}
                placeholder="e.g. Juan dela Cruz"
                className="w-full px-4 py-3 bg-[#0a0a12] border border-white/[0.08] rounded-lg font-[family-name:var(--font-inter)] text-[15px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 mb-4"
              />
              {error && <p className="font-[family-name:var(--font-inter)] text-[13px] text-red-400 mb-4">{error}</p>}
              <button
                onClick={handleCreate}
                disabled={saving || !name.trim()}
                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[14px] font-bold hover:bg-white/90 transition-colors disabled:opacity-40"
              >
                {saving ? <><Loader2 size={15} className="animate-spin" /> Creating...</> : <><Save size={15} /> Create & Edit</>}
              </button>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
