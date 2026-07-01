"use client";

import { useEffect, useState, useCallback, use } from "react";
import { Save, Loader2, FileText, Printer, ChevronDown, ChevronUp, Plus, Trash2, Star, Eye, EyeOff } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type FAQ = { question: string; answer: string };
type Addon = { service: string; description: string; price: string };

type Service = {
  id: string;
  name: string;
  short_description: string;
  category: string;
  starting_price: string;
  timeline: string;
  status: "draft" | "active" | "archived";
  featured: boolean;
  icon: string;
  product_brief: string;
  best_for: string[];
  whats_included: string[];
  tech_stack: Record<string, string[]>;
  client_must_provide: string[];
  not_included: string[];
  deliverables: string[];
  addons: Addon[];
  faqs: FAQ[];
  notes: string;
};

const DEFAULT_STACK: Record<string, string[]> = {
  Frontend: [],
  Backend: [],
  Hosting: [],
  AI: [],
  Automation: [],
  Analytics: [],
};

const STACK_SUGGESTIONS: Record<string, string[]> = {
  Frontend: ["Next.js", "React", "Tailwind", "TypeScript", "Bubble.io"],
  Backend: ["Supabase", "PostgreSQL", "Firebase"],
  Hosting: ["Vercel", "Cloudflare"],
  AI: ["ChatGPT", "Claude", "Gemini", "OpenAI API", "Anthropic API", "GitHub Copilot"],
  Automation: ["n8n", "Google Apps Script", "Zapier", "Make"],
  Analytics: ["Google Analytics", "Search Console"],
};

const CATEGORIES = ["Website Design", "Web App", "AI Automation", "SEO", "Social Media", "Branding", "Consultation", "Content", "Other"];
const STATUSES = ["draft", "active", "archived"] as const;

function emptyService(id: string): Service {
  return {
    id,
    name: "",
    short_description: "",
    category: "",
    starting_price: "",
    timeline: "",
    status: "draft",
    featured: false,
    icon: "",
    product_brief: "",
    best_for: [],
    whats_included: [],
    tech_stack: { ...DEFAULT_STACK },
    client_must_provide: [],
    not_included: [],
    deliverables: [],
    addons: [],
    faqs: [],
    notes: "",
  };
}

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/70 uppercase tracking-[1px]">{title}</span>
        {open ? <ChevronUp size={15} className="text-white/25" /> : <ChevronDown size={15} className="text-white/25" />}
      </button>
      {open && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/35 uppercase tracking-[1px] mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const INPUT_CLS = "w-full px-3 py-2.5 bg-[#0a0a12] border border-white/[0.08] rounded-lg font-[family-name:var(--font-inter)] text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20";
const TEXTAREA_CLS = `${INPUT_CLS} resize-none`;

function ListEditor({ items, setItems, placeholder }: { items: string[]; setItems: (v: string[]) => void; placeholder: string }) {
  function add() { setItems([...items, ""]); }
  function update(i: number, v: string) { const n = [...items]; n[i] = v; setItems(n); }
  function remove(i: number) { setItems(items.filter((_, idx) => idx !== i)); }
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <input value={item} onChange={(e) => update(i, e.target.value)} placeholder={placeholder} className={`${INPUT_CLS} flex-1`} />
          <button onClick={() => remove(i)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
        </div>
      ))}
      <button onClick={add} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/35 hover:text-white/60 transition-colors mt-1">
        <Plus size={13} /> Add item
      </button>
    </div>
  );
}

export default function ServiceEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [service, setService] = useState<Service>(emptyService(id));
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [printMode, setPrintMode] = useState(false);

  useEffect(() => {
    fetch(`/api/mission-control/services/${id}`).then(async (r) => {
      if (r.ok) {
        const data = await r.json();
        setService({ ...emptyService(id), ...data, tech_stack: { ...DEFAULT_STACK, ...(data.tech_stack ?? {}) } });
      }
      setLoading(false);
    });
  }, [id]);

  // Check ?print=1
  useEffect(() => {
    if (typeof window !== "undefined" && new URLSearchParams(window.location.search).get("print") === "1") {
      setPrintMode(true);
      setTimeout(() => window.print(), 800);
    }
  }, []);

  const save = useCallback(async (data: Service) => {
    setSaving(true);
    await fetch(`/api/mission-control/services/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }, [id]);

  // Autosave every 5s
  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => { save(service); }, 5000);
    return () => clearTimeout(timer);
  }, [service, loading, save]);

  function update<K extends keyof Service>(key: K, value: Service[K]) {
    setService((s) => ({ ...s, [key]: value }));
  }

  function updateStack(category: string, items: string[]) {
    setService((s) => ({ ...s, tech_stack: { ...s.tech_stack, [category]: items } }));
  }

  function addFAQ() { update("faqs", [...service.faqs, { question: "", answer: "" }]); }
  function updateFAQ(i: number, key: keyof FAQ, val: string) {
    const n = [...service.faqs]; n[i] = { ...n[i], [key]: val };
    update("faqs", n);
  }
  function removeFAQ(i: number) { update("faqs", service.faqs.filter((_, idx) => idx !== i)); }

  function addAddon() { update("addons", [...service.addons, { service: "", description: "", price: "" }]); }
  function updateAddon(i: number, key: keyof Addon, val: string) {
    const n = [...service.addons]; n[i] = { ...n[i], [key]: val };
    update("addons", n);
  }
  function removeAddon(i: number) { update("addons", service.addons.filter((_, idx) => idx !== i)); }

  function toggleBestFor(item: string) {
    const list = service.best_for.includes(item) ? service.best_for.filter((x) => x !== item) : [...service.best_for, item];
    update("best_for", list);
  }

  function toggleStackItem(cat: string, item: string) {
    const current = service.tech_stack[cat] ?? [];
    const updated = current.includes(item) ? current.filter((x) => x !== item) : [...current, item];
    updateStack(cat, updated);
  }

  const BEST_FOR_OPTIONS = ["Small Businesses", "Restaurants", "Professionals", "Freelancers", "Schools", "Startups", "Clinics", "Real Estate", "E-commerce", "Content Creators", "NGOs"];

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

  // Print / Proposal View
  if (printMode) {
    return <ProposalPrint service={service} />;
  }

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div className="max-w-3xl">

            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <a href="/mission-control/service-catalog" className="font-[family-name:var(--font-inter)] text-[13px] text-white/35 hover:text-white/60 transition-colors">
                ← Service Catalog
              </a>
              <div className="flex items-center gap-2">
                <span className={`font-[family-name:var(--font-inter)] text-[12px] transition-opacity ${saved ? "text-[#00C97A] opacity-100" : "opacity-0"}`}>Saved ✓</span>
                {saving && <Loader2 size={13} className="text-white/25 animate-spin" />}
                <button
                  onClick={() => setPrintMode(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                >
                  <Eye size={13} /> Preview Proposal
                </button>
                <button
                  onClick={() => { setPrintMode(true); setTimeout(() => window.print(), 600); }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.06] border border-white/[0.08] font-[family-name:var(--font-inter)] text-[12px] text-white/60 hover:text-white hover:bg-white/[0.10] transition-colors"
                >
                  <Printer size={13} /> Print / PDF
                </button>
                <button
                  onClick={() => save(service)}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  <Save size={13} /> Save
                </button>
              </div>
            </div>

            <h1 className="font-sans text-[24px] font-bold text-white mb-6">{service.name || "Untitled Service"}</h1>

            {/* Basic Info */}
            <Section title="Basic Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Service Name">
                  <input value={service.name} onChange={(e) => update("name", e.target.value)} placeholder="Website Design Package" className={INPUT_CLS} />
                </Field>
                <Field label="Category">
                  <select value={service.category} onChange={(e) => update("category", e.target.value)} className={INPUT_CLS}>
                    <option value="">Select category</option>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Starting Price">
                  <input value={service.starting_price} onChange={(e) => update("starting_price", e.target.value)} placeholder="₱15,000" className={INPUT_CLS} />
                </Field>
                <Field label="Estimated Timeline">
                  <input value={service.timeline} onChange={(e) => update("timeline", e.target.value)} placeholder="2–3 weeks" className={INPUT_CLS} />
                </Field>
                <Field label="Status">
                  <select value={service.status} onChange={(e) => update("status", e.target.value as typeof STATUSES[number])} className={INPUT_CLS}>
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Icon / Emoji">
                  <input value={service.icon} onChange={(e) => update("icon", e.target.value)} placeholder="🌐" className={INPUT_CLS} />
                </Field>
              </div>
              <Field label="Short Description">
                <textarea value={service.short_description} onChange={(e) => update("short_description", e.target.value)} rows={2} placeholder="One or two sentences about this service." className={TEXTAREA_CLS} />
              </Field>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => update("featured", !service.featured)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border font-[family-name:var(--font-inter)] text-[12px] font-medium transition-colors ${
                    service.featured ? "border-[#FFD23F]/40 bg-[#FFD23F]/10 text-[#FFD23F]" : "border-white/[0.08] text-white/35 hover:text-white/60"
                  }`}
                >
                  <Star size={13} fill={service.featured ? "currentColor" : "none"} /> {service.featured ? "Featured" : "Mark as Featured"}
                </button>
              </div>
            </Section>

            {/* Product Brief */}
            <Section title="Product Brief">
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 mb-3">Explain what this service is, why a client would need it, and what business problem it solves.</p>
              <textarea value={service.product_brief} onChange={(e) => update("product_brief", e.target.value)} rows={6} placeholder="This service..." className={TEXTAREA_CLS} />
            </Section>

            {/* Best For */}
            <Section title="Best For">
              <div className="flex flex-wrap gap-2 mb-3">
                {BEST_FOR_OPTIONS.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleBestFor(opt)}
                    className={`px-3 py-1.5 rounded-lg border font-[family-name:var(--font-inter)] text-[12px] transition-colors ${
                      service.best_for.includes(opt) ? "border-[#00C97A]/40 bg-[#00C97A]/10 text-[#00C97A]" : "border-white/[0.08] text-white/40 hover:text-white/60"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] text-white/20">Or add custom:</p>
              <ListEditor items={service.best_for.filter((x) => !BEST_FOR_OPTIONS.includes(x))} setItems={(custom) => update("best_for", [...service.best_for.filter((x) => BEST_FOR_OPTIONS.includes(x)), ...custom])} placeholder="Custom audience" />
            </Section>

            {/* What's Included */}
            <Section title="What's Included">
              <ListEditor items={service.whats_included} setItems={(v) => update("whats_included", v)} placeholder="e.g. Consultation" />
            </Section>

            {/* Tech Stack */}
            <Section title="Technology Stack" defaultOpen={false}>
              {Object.entries(STACK_SUGGESTIONS).map(([cat, suggestions]) => (
                <div key={cat} className="mb-5">
                  <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-2">{cat}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {suggestions.map((tech) => (
                      <button
                        key={tech}
                        onClick={() => toggleStackItem(cat, tech)}
                        className={`px-2.5 py-1 rounded-md border font-[family-name:var(--font-inter)] text-[12px] transition-colors ${
                          (service.tech_stack[cat] ?? []).includes(tech) ? "border-[#3B82F6]/40 bg-[#3B82F6]/10 text-[#3B82F6]" : "border-white/[0.06] text-white/30 hover:text-white/50"
                        }`}
                      >
                        {tech}
                      </button>
                    ))}
                  </div>
                  <ListEditor
                    items={(service.tech_stack[cat] ?? []).filter((x) => !suggestions.includes(x))}
                    setItems={(custom) => updateStack(cat, [...(service.tech_stack[cat] ?? []).filter((x) => suggestions.includes(x)), ...custom])}
                    placeholder={`Custom ${cat} tech`}
                  />
                </div>
              ))}
            </Section>

            {/* Client Must Provide */}
            <Section title="Client Must Provide" defaultOpen={false}>
              <ListEditor items={service.client_must_provide} setItems={(v) => update("client_must_provide", v)} placeholder="e.g. Logo files" />
            </Section>

            {/* Not Included */}
            <Section title="What's NOT Included" defaultOpen={false}>
              <ListEditor items={service.not_included} setItems={(v) => update("not_included", v)} placeholder="e.g. Hosting" />
            </Section>

            {/* Deliverables */}
            <Section title="Deliverables" defaultOpen={false}>
              <ListEditor items={service.deliverables} setItems={(v) => update("deliverables", v)} placeholder="e.g. Website (live)" />
            </Section>

            {/* Add-ons */}
            <Section title="Optional Add-ons" defaultOpen={false}>
              <div className="space-y-3">
                {service.addons.map((addon, i) => (
                  <div key={i} className="grid grid-cols-3 gap-2 items-start">
                    <input value={addon.service} onChange={(e) => updateAddon(i, "service", e.target.value)} placeholder="Service" className={INPUT_CLS} />
                    <input value={addon.description} onChange={(e) => updateAddon(i, "description", e.target.value)} placeholder="Description" className={INPUT_CLS} />
                    <div className="flex gap-2">
                      <input value={addon.price} onChange={(e) => updateAddon(i, "price", e.target.value)} placeholder="Price" className={`${INPUT_CLS} flex-1`} />
                      <button onClick={() => removeAddon(i)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-2 text-[10px] text-white/20 font-[family-name:var(--font-inter)] px-1">
                  <span>SERVICE</span><span>DESCRIPTION</span><span>PRICE</span>
                </div>
                <button onClick={addAddon} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/35 hover:text-white/60 transition-colors">
                  <Plus size={13} /> Add add-on
                </button>
              </div>
            </Section>

            {/* FAQs */}
            <Section title="Frequently Asked Questions" defaultOpen={false}>
              <div className="space-y-4">
                {service.faqs.map((faq, i) => (
                  <div key={i} className="bg-[#0a0a12] rounded-lg p-4 space-y-2">
                    <div className="flex gap-2">
                      <input value={faq.question} onChange={(e) => updateFAQ(i, "question", e.target.value)} placeholder="Question" className={`${INPUT_CLS} flex-1`} />
                      <button onClick={() => removeFAQ(i)} className="text-white/20 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                    <textarea value={faq.answer} onChange={(e) => updateFAQ(i, "answer", e.target.value)} rows={2} placeholder="Answer" className={TEXTAREA_CLS} />
                  </div>
                ))}
                <button onClick={addFAQ} className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[12px] text-white/35 hover:text-white/60 transition-colors">
                  <Plus size={13} /> Add FAQ
                </button>
              </div>
            </Section>

            {/* Notes */}
            <Section title="Internal Notes (Not in Proposal)" defaultOpen={false}>
              <textarea value={service.notes} onChange={(e) => update("notes", e.target.value)} rows={4} placeholder="Private notes — never shown to clients." className={TEXTAREA_CLS} />
            </Section>

            {/* Proposal Actions */}
            <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-5 mt-4">
              <p className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/40 uppercase tracking-[1px] mb-3">Proposal Generator</p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPrintMode(true)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.08] border border-white/[0.10] font-[family-name:var(--font-inter)] text-[13px] text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors"
                >
                  <Eye size={14} /> Preview
                </button>
                <button
                  onClick={() => { save(service); setTimeout(() => { setPrintMode(true); setTimeout(() => window.print(), 600); }, 300); }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors"
                >
                  <Printer size={14} /> Print / Download PDF
                </button>
                <button
                  onClick={() => {
                    const md = generateMarkdown(service);
                    navigator.clipboard.writeText(md).then(() => alert("Copied to clipboard!"));
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/[0.08] border border-white/[0.10] font-[family-name:var(--font-inter)] text-[13px] text-white/70 hover:text-white hover:bg-white/[0.12] transition-colors"
                >
                  <FileText size={14} /> Export Markdown
                </button>
              </div>
            </div>

          </div>
        </main>
      </div>
    </AuthGuard>
  );
}

function generateMarkdown(s: Service): string {
  const lines: string[] = [];
  lines.push(`# ${s.name}`);
  if (s.short_description) lines.push(`\n${s.short_description}`);
  lines.push(`\n**Category:** ${s.category || "—"}`);
  lines.push(`**Starting Price:** ${s.starting_price || "—"}`);
  lines.push(`**Timeline:** ${s.timeline || "—"}`);
  if (s.product_brief) { lines.push(`\n## Product Brief\n\n${s.product_brief}`); }
  if (s.best_for.length) { lines.push(`\n## Best For\n\n${s.best_for.map((x) => `- ${x}`).join("\n")}`); }
  if (s.whats_included.length) { lines.push(`\n## What's Included\n\n${s.whats_included.map((x) => `- ✓ ${x}`).join("\n")}`); }
  if (s.deliverables.length) { lines.push(`\n## Deliverables\n\n${s.deliverables.map((x) => `- ${x}`).join("\n")}`); }
  if (s.not_included.length) { lines.push(`\n## What's NOT Included\n\n${s.not_included.map((x) => `- ${x}`).join("\n")}`); }
  if (s.client_must_provide.length) { lines.push(`\n## Client Must Provide\n\n${s.client_must_provide.map((x) => `- ${x}`).join("\n")}`); }
  if (s.faqs.length) {
    lines.push(`\n## FAQ`);
    s.faqs.forEach((f) => { lines.push(`\n**${f.question}**\n\n${f.answer}`); });
  }
  return lines.join("\n");
}

function ProposalPrint({ service }: { service: Service }) {
  const date = new Date().toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" });
  const allStack = Object.entries(service.tech_stack ?? {}).flatMap(([cat, items]) => items.map((i) => `${i} (${cat})`));

  return (
    <>
      <style>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 20mm; }
        }
        body { font-family: 'Inter', Georgia, sans-serif; color: #111; background: #fff; }
        .proposal { max-width: 800px; margin: 0 auto; padding: 40px; }
        .cover { text-align: center; padding: 60px 0 40px; border-bottom: 3px solid #111; margin-bottom: 40px; }
        .logo-mark { display: inline-block; background: #111; color: #FFD23F; font-weight: 900; font-size: 20px; padding: 8px 16px; border-radius: 8px; margin-bottom: 16px; }
        h1 { font-size: 32px; font-weight: 900; margin: 0 0 8px; }
        h2 { font-size: 18px; font-weight: 800; border-bottom: 2px solid #eee; padding-bottom: 6px; margin: 32px 0 12px; color: #111; }
        h3 { font-size: 14px; font-weight: 700; margin: 16px 0 6px; color: #444; }
        p, li { font-size: 13px; line-height: 1.8; color: #333; }
        ul { padding-left: 20px; margin: 0; }
        li { margin-bottom: 4px; }
        .meta { font-size: 12px; color: #666; margin: 4px 0; }
        .badge { display: inline-block; background: #f5f5f5; border-radius: 6px; padding: 4px 10px; font-size: 11px; font-weight: 700; margin: 2px; }
        .price-box { background: #f9f9f9; border: 2px solid #111; border-radius: 12px; padding: 20px 24px; margin: 16px 0; }
        .price-box .amount { font-size: 28px; font-weight: 900; }
        table { width: 100%; border-collapse: collapse; font-size: 12px; }
        th { background: #111; color: #fff; padding: 8px 12px; text-align: left; font-weight: 700; }
        td { padding: 8px 12px; border-bottom: 1px solid #eee; }
        .footer { margin-top: 60px; padding-top: 16px; border-top: 1px solid #ddd; display: flex; justify-content: space-between; font-size: 11px; color: #999; }
        .signature { margin-top: 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        .sig-line { border-top: 1px solid #aaa; padding-top: 8px; font-size: 12px; color: #555; }
        .terms { font-size: 11px; color: #666; background: #f9f9f9; padding: 16px; border-radius: 8px; line-height: 1.7; }
        .section-divider { border: none; border-top: 1px solid #eee; margin: 24px 0; }
      `}</style>

      <div className="no-print" style={{ background: "#0a0a12", padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
        <button onClick={() => window.history.back()} style={{ color: "#fff6", fontSize: "13px", background: "none", border: "none", cursor: "pointer" }}>← Back to Editor</button>
        <button onClick={() => window.print()} style={{ background: "#fff", color: "#0a0a12", border: "none", borderRadius: "8px", padding: "8px 16px", fontWeight: 700, fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
          <Printer size={14} /> Print / Save PDF
        </button>
        <button onClick={() => { const md = generateMarkdown(service); navigator.clipboard.writeText(md).then(() => alert("Copied!")); }} style={{ color: "#fff6", background: "none", border: "1px solid #ffffff20", borderRadius: "8px", padding: "8px 14px", fontSize: "13px", cursor: "pointer" }}>
          Copy Markdown
        </button>
        <button onClick={() => { if (typeof window !== "undefined") { const url = new URL(window.location.href); url.searchParams.delete("print"); window.location.href = url.toString().replace("?print=1", ""); } }} style={{ color: "#ffffff40", background: "none", border: "none", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}>
          <EyeOff size={13} /> Exit Preview
        </button>
      </div>

      <div className="proposal">
        {/* Cover */}
        <div className="cover">
          <div className="logo-mark">Cyberussell</div>
          <h1>{service.name || "Service Proposal"}</h1>
          <p className="meta">Service Proposal · Prepared by Russell Parayno</p>
          <p className="meta">Date: {date}</p>
          <p className="meta">cyberussell.com · russell.a.parayno@gmail.com</p>
        </div>

        {/* About */}
        <h2>About Cyberussell</h2>
        <p>Cyberussell is a Filipino digital agency specializing in AI-powered web design, automation, and digital skill training. We help businesses and professionals grow online using modern tools and AI-assisted workflows.</p>

        {/* Service Overview */}
        <h2>Service Overview</h2>
        <p>{service.short_description || "Please add a short description."}</p>
        <div className="price-box">
          <p style={{ margin: 0, fontSize: "12px", color: "#666", marginBottom: "4px" }}>Starting Price</p>
          <div className="amount">{service.starting_price || "Contact for pricing"}</div>
          {service.timeline && <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#666" }}>Estimated Timeline: <strong>{service.timeline}</strong></p>}
        </div>

        {/* Product Brief */}
        {service.product_brief && (
          <>
            <h2>Product Brief</h2>
            <p>{service.product_brief}</p>
          </>
        )}

        {/* Best For */}
        {service.best_for.length > 0 && (
          <>
            <h2>This Service is Best For</h2>
            <div>{service.best_for.map((b) => <span key={b} className="badge">{b}</span>)}</div>
          </>
        )}

        {/* What's Included */}
        {service.whats_included.length > 0 && (
          <>
            <h2>What&apos;s Included</h2>
            <ul>{service.whats_included.map((x, i) => <li key={i}>✓ {x}</li>)}</ul>
          </>
        )}

        {/* Not Included */}
        {service.not_included.length > 0 && (
          <>
            <h2>What&apos;s NOT Included</h2>
            <ul>{service.not_included.map((x, i) => <li key={i}>✕ {x}</li>)}</ul>
          </>
        )}

        {/* Tech Stack */}
        {allStack.length > 0 && (
          <>
            <h2>Technology Stack</h2>
            {Object.entries(service.tech_stack ?? {}).filter(([, items]) => items.length > 0).map(([cat, items]) => (
              <div key={cat}>
                <h3>{cat}</h3>
                <div>{items.map((t) => <span key={t} className="badge">{t}</span>)}</div>
              </div>
            ))}
          </>
        )}

        {/* Client Must Provide */}
        {service.client_must_provide.length > 0 && (
          <>
            <h2>Client Responsibilities</h2>
            <ul>{service.client_must_provide.map((x, i) => <li key={i}>{x}</li>)}</ul>
          </>
        )}

        {/* Deliverables */}
        {service.deliverables.length > 0 && (
          <>
            <h2>Deliverables</h2>
            <ul>{service.deliverables.map((x, i) => <li key={i}>📦 {x}</li>)}</ul>
          </>
        )}

        {/* Add-ons */}
        {service.addons.length > 0 && (
          <>
            <h2>Optional Add-ons</h2>
            <table>
              <thead><tr><th>Service</th><th>Description</th><th>Price</th></tr></thead>
              <tbody>{service.addons.map((a, i) => <tr key={i}><td>{a.service}</td><td>{a.description}</td><td>{a.price}</td></tr>)}</tbody>
            </table>
          </>
        )}

        {/* FAQs */}
        {service.faqs.length > 0 && (
          <>
            <h2>Frequently Asked Questions</h2>
            {service.faqs.map((f, i) => (
              <div key={i} style={{ marginBottom: "16px" }}>
                <p style={{ fontWeight: 700, margin: "0 0 4px" }}>{f.question}</p>
                <p style={{ margin: 0 }}>{f.answer}</p>
              </div>
            ))}
          </>
        )}

        <hr className="section-divider" />

        {/* Terms */}
        <h2>Terms &amp; Conditions</h2>
        <div className="terms">
          <p>1. A 50% downpayment is required before work begins. The remaining 50% is due upon project completion.</p>
          <p>2. The client agrees to provide all required materials within 3 business days of project start.</p>
          <p>3. Revisions are limited to those covered in the scope. Additional revisions are billed separately.</p>
          <p>4. Timeline begins upon receipt of downpayment and all required client materials.</p>
          <p>5. Cyberussell retains the right to showcase the completed work in its portfolio unless otherwise agreed.</p>
        </div>

        {/* Acceptance / Signature */}
        <h2>Acceptance</h2>
        <p style={{ fontSize: "13px" }}>By signing below, the client agrees to the scope, pricing, and terms outlined in this proposal.</p>
        <div className="signature">
          <div>
            <div className="sig-line">Client Signature</div>
            <p className="meta">Name: ___________________________</p>
            <p className="meta">Date: ___________________________</p>
          </div>
          <div>
            <div className="sig-line">Prepared By: Russell Parayno</div>
            <p className="meta">Cyberussell</p>
            <p className="meta">Date: {date}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <span>Cyberussell · cyberussell.com · russell.a.parayno@gmail.com</span>
          <span>Confidential · Generated {date}</span>
        </div>
      </div>
    </>
  );
}
