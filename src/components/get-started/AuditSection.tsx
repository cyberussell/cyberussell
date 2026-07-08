"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

const INCLUDES = [
  "Website review",
  "AI opportunities specific to your business",
  "Automation recommendations",
  "SEO insights",
  "A step-by-step improvement plan",
];

export default function AuditSection() {
  const [form, setForm] = useState({ name: "", email: "", business: "", details: "" });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: "Free AI Business Audit Request",
          message: `Business / website: ${form.business || "—"}\n\nWhat the business does:\n${form.details}`,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="audit" className="relative bg-[#0F0F1A] px-6 md:px-10 py-16 md:py-24 overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px]"
        style={{ background: "radial-gradient(circle at center, rgba(255,210,63,0.10) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 max-w-5xl mx-auto bg-[#18181F] border border-white/[0.10] rounded-[24px] p-8 md:p-14 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <span className="block text-[#FFD23F] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-4">
            Free For A Limited Time
          </span>
          <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-white leading-tight mb-4">
            Get a Free AI Business Audit
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-8">
            Tell us about your business and we&apos;ll send you a clear, actionable plan — no
            obligation, no sales pressure.
          </p>
          <ul className="flex flex-col gap-3">
            {INCLUDES.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle size={17} className="text-[#00C97A] shrink-0 mt-0.5" strokeWidth={2.5} />
                <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/70">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {status === "success" ? (
            <div className="bg-[#00C97A]/10 border border-[#00C97A]/30 rounded-xl p-6">
              <p className="font-[family-name:var(--font-inter)] text-[#00C97A] font-bold text-[15px] mb-1">
                Request received!
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60">
                We&apos;ll review your business and get back to you with your free audit shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/65 uppercase tracking-[1px]">
                  Name <span className="text-[#E8373A]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan dela Cruz"
                  className="bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/65 uppercase tracking-[1px]">
                  Email <span className="text-[#E8373A]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="juan@business.com"
                  className="bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/65 uppercase tracking-[1px]">
                  Business name or website
                </label>
                <input
                  type="text"
                  name="business"
                  value={form.business}
                  onChange={handleChange}
                  placeholder="e.g. Bright Bright Dental Clinic"
                  className="bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/65 uppercase tracking-[1px]">
                  What does your business do? <span className="text-[#E8373A]">*</span>
                </label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us a bit about your business and what you're hoping to improve."
                  className="bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)] resize-none"
                />
              </div>

              {status === "error" && (
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#E8373A]">
                  Something went wrong. Please try again or email cyberussellofficial@gmail.com directly.
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-[#FFD23F] hover:bg-[#FFD23F]/90 text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] py-4 px-8 rounded-xl transition-all disabled:opacity-60 min-h-[52px] flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-4 h-4 border-2 border-[#0A0A14]/30 border-t-[#0A0A14] rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Get My Free Audit →"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
