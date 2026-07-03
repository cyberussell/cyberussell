"use client";

import { useEffect, useState, useCallback, use } from "react";
import { Save, Loader2, Printer, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type ChecklistItem = {
  service_id: string;
  service_name: string;
  item: string;
  collected: boolean;
  note: string;
};

type Intake = {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  business_name: string;
  service_ids: string[];
  checklist: ChecklistItem[];
  notes: string;
  status: "draft" | "sent" | "completed";
};

type ServiceOption = { id: string; service_name: string };

const STATUSES = ["draft", "sent", "completed"] as const;

function emptyIntake(id: string): Intake {
  return {
    id,
    client_name: "",
    client_email: "",
    client_phone: "",
    business_name: "",
    service_ids: [],
    checklist: [],
    notes: "",
    status: "draft",
  };
}

const INPUT_CLS = "w-full px-3 py-2.5 bg-[#0a0a12] border border-white/[0.08] rounded-lg font-[family-name:var(--font-inter)] text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20";
const TEXTAREA_CLS = `${INPUT_CLS} resize-none`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/35 uppercase tracking-[1px] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5 mb-4">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/70 uppercase tracking-[1px] mb-1">{title}</p>
      {subtitle && <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-4">{subtitle}</p>}
      {children}
    </div>
  );
}

export default function ClientIntakeEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [intake, setIntake] = useState<Intake>(emptyIntake(id));
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/mission-control/client-intake/${id}`).then((r) => (r.ok ? r.json() : null)),
      fetch("/api/mission-control/services").then((r) => (r.ok ? r.json() : [])),
    ]).then(([data, svcList]) => {
      if (data) setIntake({ ...emptyIntake(id), ...data, checklist: data.checklist ?? [], service_ids: data.service_ids ?? [] });
      setServices(svcList ?? []);
      setLoading(false);
    });
  }, [id]);

  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("print") === "1") {
      setPrintMode(true);
      setTimeout(() => window.print(), 800);
    }
  }, []);

  const save = useCallback(async (data: Intake) => {
    setSaving(true);
    await fetch(`/api/mission-control/client-intake/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [id]);

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => { save(intake); }, 5000);
    return () => clearTimeout(timer);
  }, [intake, loading, save]);

  function update<K extends keyof Intake>(key: K, value: Intake[K]) {
    setIntake((s) => ({ ...s, [key]: value }));
  }

  async function toggleService(svc: ServiceOption, checked: boolean) {
    if (checked) {
      update("service_ids", [...intake.service_ids, svc.id]);
      const res = await fetch(`/api/mission-control/services/${svc.id}`);
      if (res.ok) {
        const full = await res.json();
        const existingItems = new Set(intake.checklist.filter((c) => c.service_id === svc.id).map((c) => c.item));
        const newItems: ChecklistItem[] = (full.client_must_provide ?? [])
          .filter((item: string) => !existingItems.has(item))
          .map((item: string) => ({ service_id: svc.id, service_name: svc.service_name, item, collected: false, note: "" }));
        setIntake((s) => ({ ...s, checklist: [...s.checklist, ...newItems] }));
      }
    } else {
      const removing = intake.checklist.filter((c) => c.service_id === svc.id);
      const hasData = removing.some((c) => c.collected || c.note.trim());
      if (hasData && !confirm(`Remove "${svc.service_name}" and its collected checklist data?`)) return;
      update("service_ids", intake.service_ids.filter((sid) => sid !== svc.id));
      setIntake((s) => ({ ...s, checklist: s.checklist.filter((c) => c.service_id !== svc.id) }));
    }
  }

  function updateChecklistItem(index: number, patch: Partial<ChecklistItem>) {
    setIntake((s) => {
      const next = [...s.checklist];
      next[index] = { ...next[index], ...patch };
      return { ...s, checklist: next };
    });
  }

  function removeChecklistItem(index: number) {
    setIntake((s) => ({ ...s, checklist: s.checklist.filter((_, i) => i !== index) }));
  }

  function addCustomItem() {
    setIntake((s) => ({
      ...s,
      checklist: [...s.checklist, { service_id: "custom", service_name: "Other", item: "", collected: false, note: "" }],
    }));
  }

  if (loading) {
    return (
      <AuthGuard>
        <div className="flex min-h-screen bg-[#0a0a12]">
          <Sidebar />
          <main className="flex-1 flex items-center justify-center">
            <Loader2 size={24} className="text-white/20 animate-spin" />
          </main>
        </div>
      </AuthGuard>
    );
  }

  if (printMode) {
    return <IntakePrint intake={intake} />;
  }

  // Group checklist by service, preserving service_ids order, custom items last
  const groups: { service_id: string; service_name: string; items: { item: ChecklistItem; index: number }[] }[] = [];
  const orderedServiceIds = [...intake.service_ids, "custom"];
  for (const sid of orderedServiceIds) {
    const items = intake.checklist
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.service_id === sid);
    if (items.length) groups.push({ service_id: sid, service_name: items[0].item.service_name, items });
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-3xl">

            <div className="flex items-center justify-between gap-4 mb-6">
              <a href="/mission-control/client-intake" className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 hover:text-white/60 transition-colors">
                ← Client Intake
              </a>
              <div className="flex items-center gap-2">
                <span className={`font-[family-name:var(--font-inter)] text-[12px] transition-opacity ${saved ? "text-[#00C97A] opacity-100" : "opacity-0"}`}>Saved ✓</span>
                {saving && <Loader2 size={13} className="text-white/25 animate-spin" />}
                <button
                  onClick={() => setPrintMode(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                >
                  <Eye size={13} /> Preview
                </button>
                <button
                  onClick={() => { setPrintMode(true); setTimeout(() => window.print(), 600); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                >
                  <Printer size={13} /> Print / PDF
                </button>
                <button
                  onClick={() => save(intake)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  <Save size={13} /> Save
                </button>
              </div>
            </div>

            <h1 className="font-sans text-[24px] font-bold text-white mb-6">{intake.client_name || "Untitled Client"}</h1>

            <Section title="Client Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Client Name">
                  <input value={intake.client_name} onChange={(e) => update("client_name", e.target.value)} placeholder="Juan dela Cruz" className={INPUT_CLS} />
                </Field>
                <Field label="Business Name">
                  <input value={intake.business_name} onChange={(e) => update("business_name", e.target.value)} placeholder="Juan's Cafe" className={INPUT_CLS} />
                </Field>
                <Field label="Email">
                  <input value={intake.client_email} onChange={(e) => update("client_email", e.target.value)} placeholder="juan@email.com" className={INPUT_CLS} />
                </Field>
                <Field label="Phone">
                  <input value={intake.client_phone} onChange={(e) => update("client_phone", e.target.value)} placeholder="+63 912 345 6789" className={INPUT_CLS} />
                </Field>
                <Field label="Status">
                  <select value={intake.status} onChange={(e) => update("status", e.target.value as Intake["status"])} className={INPUT_CLS}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
              </div>
            </Section>

            <Section title="Services Involved" subtitle="Check the services being discussed — each one auto-fills its own checklist below.">
              <div className="flex flex-wrap gap-2">
                {services.map((svc) => {
                  const checked = intake.service_ids.includes(svc.id);
                  return (
                    <button
                      key={svc.id}
                      onClick={() => toggleService(svc, !checked)}
                      className={`px-3 py-1.5 rounded-lg border font-[family-name:var(--font-inter)] text-[12px] transition-colors ${
                        checked ? "border-[#FFD23F]/40 bg-[#FFD23F]/10 text-[#FFD23F]" : "border-white/[0.08] text-white/40 hover:text-white/60"
                      }`}
                    >
                      {svc.service_name}
                    </button>
                  );
                })}
              </div>
            </Section>

            <Section title="What You Need From The Client" subtitle="Pulled from each selected service's requirements. Check items off as the client provides them.">
              {groups.length === 0 ? (
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">Select a service above to see its checklist.</p>
              ) : (
                <div className="flex flex-col gap-5">
                  {groups.map((group) => (
                    <div key={group.service_id}>
                      <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-2">
                        {group.service_name}
                      </p>
                      <div className="flex flex-col gap-2">
                        {group.items.map(({ item, index }) => (
                          <div key={index} className="flex items-start gap-2.5 bg-[#0a0a12] border border-white/[0.06] rounded-lg p-3">
                            <input
                              type="checkbox"
                              checked={item.collected}
                              onChange={(e) => updateChecklistItem(index, { collected: e.target.checked })}
                              className="mt-1 accent-[#00C97A] shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              {item.service_id === "custom" ? (
                                <input
                                  value={item.item}
                                  onChange={(e) => updateChecklistItem(index, { item: e.target.value })}
                                  placeholder="Custom requirement"
                                  className={`${INPUT_CLS} mb-1.5`}
                                />
                              ) : (
                                <p className={`font-[family-name:var(--font-inter)] text-[13px] mb-1.5 ${item.collected ? "text-white/40 line-through" : "text-white/80"}`}>
                                  {item.item}
                                </p>
                              )}
                              <input
                                value={item.note}
                                onChange={(e) => updateChecklistItem(index, { note: e.target.value })}
                                placeholder="Notes (e.g. sent via email, still pending...)"
                                className={INPUT_CLS}
                              />
                            </div>
                            <button onClick={() => removeChecklistItem(index)} className="text-white/20 hover:text-red-400 transition-colors mt-1">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={addCustomItem} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/35 hover:text-white/60 transition-colors mt-4">
                <Plus size={13} /> Add custom requirement
              </button>
            </Section>

            <Section title="Internal Notes">
              <textarea
                value={intake.notes}
                onChange={(e) => update("notes", e.target.value)}
                rows={4}
                placeholder="Anything else worth remembering about this client..."
                className={TEXTAREA_CLS}
              />
            </Section>

          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function IntakePrint({ intake }: { intake: Intake }) {
  const date = new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });

  const groups: { service_name: string; items: ChecklistItem[] }[] = [];
  const bySid = new Map<string, ChecklistItem[]>();
  for (const item of intake.checklist) {
    if (!bySid.has(item.service_id)) bySid.set(item.service_id, []);
    bySid.get(item.service_id)!.push(item);
  }
  for (const [, items] of bySid) {
    groups.push({ service_name: items[0].service_name, items });
  }

  return (
    <>
      <style>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 20mm; }
        }
        body { font-family: 'Inter', Georgia, sans-serif; color: #111; background: #fff; }
        .intake { max-width: 800px; margin: 0 auto; padding: 40px; }
        .cover { text-align: center; padding: 40px 0 32px; border-bottom: 3px solid #111; margin-bottom: 32px; }
        .logo-mark { display: inline-block; background: #111; color: #FFD23F; font-weight: 900; font-size: 20px; padding: 8px 16px; border-radius: 8px; margin-bottom: 16px; }
        h1 { font-size: 28px; font-weight: 900; margin: 0 0 8px; }
        h2 { font-size: 16px; font-weight: 800; border-bottom: 2px solid #eee; padding-bottom: 6px; margin: 24px 0 12px; color: #111; }
        p, li { font-size: 13px; line-height: 1.8; color: #333; }
        .meta { font-size: 12px; color: #666; margin: 4px 0; }
        .item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 8px; padding: 8px 10px; background: #f9f9f9; border-radius: 6px; }
        .box { width: 14px; height: 14px; border: 2px solid #111; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
        .box.checked { background: #111; }
        .item-note { font-size: 12px; color: #777; margin-top: 2px; }
        .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #ddd; display: flex; justify-content: space-between; font-size: 11px; color: #999; }
      `}</style>

      <div className="no-print" style={{ background: "#0a0a12", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => window.history.back()} style={{ color: "#fff6", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}>← Back to Editor</button>
        <button onClick={() => window.print()} style={{ background: "#fff", color: "#0a0a12", border: "none", borderRadius: "8px", padding: "8px 16px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <Printer size={14} /> Print / Save PDF
        </button>
        <button onClick={() => { if (typeof window !== "undefined") { const url = new URL(window.location.href); url.searchParams.delete("print"); window.location.href = url.toString().replace("?print=1", ""); } }} style={{ color: "#ffffff40", background: "none", border: "none", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
          <EyeOff size={13} /> Exit Preview
        </button>
      </div>

      <div className="intake">
        <div className="cover">
          <div className="logo-mark">Cyberussell</div>
          <h1>Client Intake Checklist</h1>
          <p className="meta">{intake.client_name || "Untitled Client"}{intake.business_name ? ` · ${intake.business_name}` : ""}</p>
          <p className="meta">Prepared by Russell Parayno · {date}</p>
        </div>

        {(intake.client_email || intake.client_phone) && (
          <>
            <h2>Contact</h2>
            {intake.client_email && <p>Email: {intake.client_email}</p>}
            {intake.client_phone && <p>Phone: {intake.client_phone}</p>}
          </>
        )}

        {groups.map((group) => (
          <div key={group.service_name}>
            <h2>{group.service_name}</h2>
            {group.items.map((item, i) => (
              <div className="item" key={i}>
                <div className={`box ${item.collected ? "checked" : ""}`} />
                <div>
                  <p style={{ margin: 0 }}>{item.item}</p>
                  {item.note && <p className="item-note">{item.note}</p>}
                </div>
              </div>
            ))}
          </div>
        ))}

        {intake.notes && (
          <>
            <h2>Notes</h2>
            <p>{intake.notes}</p>
          </>
        )}

        <div className="footer">
          <span>Cyberussell · Prepared by Russell Parayno</span>
          <span>Confidential · Generated {date}</span>
        </div>
      </div>
    </>
  );
}
