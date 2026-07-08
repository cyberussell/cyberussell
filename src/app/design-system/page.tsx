import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System — Cyberussell",
  robots: "noindex, nofollow",
};

const COLORS = [
  { name: "Brand Red", varName: "--color-brandRed", hex: "#E8373A", role: "Primary accent — CTAs, eyebrow labels, urgency, danger" },
  { name: "Brand Yellow", varName: "--color-brandYellow", hex: "#FFD23F", role: "Secondary accent — highlights, wordmark, badges" },
  { name: "Brand Green", varName: "--color-brandGreen", hex: "#00C97A", role: "Success states" },
  { name: "Brand Blue", varName: "--color-brandBlue", hex: "#3B82F6", role: "Tertiary accent, used sparingly" },
];

const NAVY = [
  { name: "Navy", varName: "--color-navy", hex: "#0F0F1A", role: "Primary page/section background" },
  { name: "Navy 2", varName: "--color-navy2", hex: "#111118", role: "Mobile menu / dropdown background" },
  { name: "Navy 3", varName: "--color-navy3", hex: "#18181F", role: "Card / container background" },
  { name: "Navy 4", varName: "--color-navy4", hex: "#222230", role: "Lightest tier — subtle accents, hover" },
];

const RADII = [
  { label: "rounded-lg", className: "rounded-lg", usage: "Small buttons, inputs" },
  { label: "rounded-xl", className: "rounded-xl", usage: "Badges, most cards (most common)" },
  { label: "rounded-2xl", className: "rounded-2xl", usage: "Large cards, hero sections" },
  { label: "rounded-3xl", className: "rounded-3xl", usage: "CTA sections, rare emphasis" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 md:px-10">
      <h2 className="text-[24px] md:text-[32px] font-bold text-white mb-8" style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="bg-[#0F0F1A] min-h-screen pb-24">
      {/* Header */}
      <div className="border-b border-white/10 bg-[#0F0F1A]">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
          <p className="text-[#E8373A] font-bold text-[10px] uppercase tracking-[2.5px] mb-3">Internal reference · noindex</p>
          <h1
            className="text-[34px] md:text-[52px] font-extrabold text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Design <span className="text-[#FFD23F]">System</span>
          </h1>
          <p className="text-[16px] text-white/65 mt-4 max-w-2xl">
            Living reference for colors, type, spacing, and components already in use across cyberussell.com.
            Derived from the actual codebase — not aspirational. See{" "}
            <code className="text-white/80 bg-white/[0.06] px-1.5 py-0.5 rounded">docs/design-system/</code> for the
            written brand guidelines and marketing asset kit.
          </p>
        </div>
      </div>

      {/* Colors */}
      <Section title="Colors">
        <p className="text-white/65 text-[14px] mb-6 -mt-4">Brand accents</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-10">
          {COLORS.map((c) => (
            <div key={c.name} className="rounded-2xl border border-white/[0.08] bg-[#18181F] overflow-hidden">
              <div className="h-24" style={{ backgroundColor: c.hex }} />
              <div className="p-4">
                <p className="text-white font-bold text-[14px]">{c.name}</p>
                <p className="text-white/50 text-[12px] font-mono mt-0.5">{c.hex}</p>
                <p className="text-white/50 text-[12px] font-mono">{c.varName}</p>
                <p className="text-white/65 text-[12px] mt-2">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-white/65 text-[14px] mb-6">Navy scale (backgrounds)</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {NAVY.map((c) => (
            <div key={c.name} className="rounded-2xl border border-white/[0.08] overflow-hidden">
              <div className="h-24 border-b border-white/[0.08]" style={{ backgroundColor: c.hex }} />
              <div className="p-4 bg-[#18181F]">
                <p className="text-white font-bold text-[14px]">{c.name}</p>
                <p className="text-white/50 text-[12px] font-mono mt-0.5">{c.hex}</p>
                <p className="text-white/50 text-[12px] font-mono">{c.varName}</p>
                <p className="text-white/65 text-[12px] mt-2">{c.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Typography */}
      <Section title="Typography">
        <div className="space-y-8">
          <div>
            <p className="text-white/50 text-[12px] font-mono mb-2">Syne 800 — Hero H1 — text-[34px] md:text-[52px] font-extrabold</p>
            <p className="text-[34px] md:text-[52px] font-extrabold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Let&apos;s figure this out.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-[12px] font-mono mb-2">Syne 700 — Section H2 — text-[24px] md:text-[32px] font-bold</p>
            <p className="text-[24px] md:text-[32px] font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
              Your skills. Your income.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-[12px] font-mono mb-2">Inter 400 — Body — text-[16px] text-white/65</p>
            <p className="text-[16px] text-white/65 max-w-xl">
              Data-backed guides for Filipinos who want to earn online. Free. No email. No payment.
            </p>
          </div>
          <div>
            <p className="text-white/50 text-[12px] font-mono mb-2">Inter 700 — Small UI (nav/buttons) — text-[13px] font-bold</p>
            <p className="text-[13px] font-bold text-white">Start Free</p>
          </div>
          <div>
            <p className="text-white/50 text-[12px] font-mono mb-2">Inter 700 — Eyebrow label — text-[10px] uppercase tracking-[2.5px]</p>
            <p className="text-[10px] font-bold uppercase tracking-[2.5px] text-[#E8373A]">Appointments without the back-and-forth</p>
          </div>
        </div>
      </Section>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <button className="bg-[#E8373A] text-white font-bold py-[18px] px-9 rounded-[10px] hover:opacity-90 transition">
            Primary CTA
          </button>
          <button className="bg-[#FFD23F] text-[#0F0F1A] font-extrabold px-6 py-3.5 rounded-[10px] hover:opacity-90 transition">
            Yellow Accent
          </button>
          <button className="border border-white/10 text-white/65 px-4 py-2 rounded-lg hover:text-white hover:border-white/30 transition">
            Secondary / Outline
          </button>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges & Pills">
        <div className="flex flex-wrap items-center gap-4">
          <span className="text-[#E8373A] font-bold text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-md bg-[#E8373A]/10">
            Eyebrow Label
          </span>
          <span className="bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 text-[#FFD23F] text-[13px] font-bold">
            Category Pill
          </span>
          <span className="w-6 h-6 rounded-full bg-[#FFD23F]/10 text-[#FFD23F] text-[12px] font-bold flex items-center justify-center">
            1
          </span>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-6">
            <p className="text-white font-bold text-[14px] mb-1">Standard card</p>
            <p className="text-white/65 text-[13px]">bg-[#18181F] border border-white/[0.08] rounded-2xl p-6</p>
          </div>
          <div className="border-l-2 border-[#FFD23F] pl-6 py-4 rounded-r-xl bg-[#18181F]/40">
            <p className="text-white font-bold text-[14px] mb-1">Accent-border card</p>
            <p className="text-white/65 text-[13px]">border-l-2 border-[#FFD23F] pl-6 py-4 rounded-r-xl</p>
          </div>
          <div className="bg-gradient-to-r from-[#E8373A]/10 to-[#FFD23F]/5 border border-[#E8373A]/20 rounded-xl p-6">
            <p className="text-white font-bold text-[14px] mb-1">Gradient banner card</p>
            <p className="text-white/65 text-[13px]">from-[#E8373A]/10 to-[#FFD23F]/5</p>
          </div>
        </div>
      </Section>

      {/* Radius scale */}
      <Section title="Border Radius Scale">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {RADII.map((r) => (
            <div key={r.label} className="text-center">
              <div className={`h-20 bg-[#18181F] border border-white/[0.08] ${r.className} mb-2`} />
              <p className="text-white font-mono text-[12px]">{r.label}</p>
              <p className="text-white/50 text-[11px] mt-0.5">{r.usage}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Section heading pattern */}
      <Section title="Section Heading Pattern">
        <div className="text-center">
          <p className="text-[#E8373A] font-bold text-[10px] uppercase tracking-[2.5px] mb-2">Eyebrow</p>
          <p className="text-[24px] md:text-[32px] font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
            Section title goes here
          </p>
          <p className="text-white/65 text-[15px] mt-2 max-w-lg mx-auto">
            Optional supporting sentence underneath the title, kept short.
          </p>
        </div>
      </Section>
    </main>
  );
}
