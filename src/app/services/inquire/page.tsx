"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function InquireForm() {
  const searchParams = useSearchParams();
  const serviceLabel = searchParams.get("service") || "General Inquiry";

  const defaultMessage = `Hi Russell,\n\nI'm interested in your ${serviceLabel} service and would love to discuss how you can help my business.\n\nPlease let me know your availability.\n\nThank you!`;

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: `Inquiry: ${serviceLabel}`,
    message: defaultMessage,
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    setForm({
      name: "",
      email: "",
      subject: `Inquiry: ${serviceLabel}`,
      message: `Hi Russell,\n\nI'm interested in your ${serviceLabel} service and would love to discuss how you can help my business.\n\nPlease let me know your availability.\n\nThank you!`,
    });
  }, [serviceLabel]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (honeypot) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <div className="inline-block bg-[#FFD23F]/10 border border-[#FFD23F]/20 rounded-full px-4 py-1.5 mb-4">
            <span className="text-[#FFD23F] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Service Inquiry
            </span>
          </div>
          <h1 className="font-sans text-[28px] md:text-[38px] font-bold text-white mb-3 leading-tight">
            {serviceLabel}
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
            Fill in your details below and I&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {/* Success */}
        {status === "success" && (
          <div className="bg-[#00C97A]/10 border border-[#00C97A]/30 rounded-xl p-5 mb-8">
            <p className="font-[family-name:var(--font-inter)] text-[#00C97A] font-bold text-[15px] mb-1">Message sent!</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60">
              I&apos;ll get back to you as soon as possible about your {serviceLabel} inquiry.
            </p>
          </div>
        )}

        {/* Error */}
        {status === "error" && (
          <div className="bg-[#E8373A]/10 border border-[#E8373A]/30 rounded-xl p-5 mb-8">
            <p className="font-[family-name:var(--font-inter)] text-[#E8373A] font-bold text-[15px] mb-1">Something went wrong.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60">
              Please try again or email directly at cyberussellofficial@gmail.com
            </p>
          </div>
        )}

        {status !== "success" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Honeypot */}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="bg-[#18181F] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
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
                  placeholder="juan@email.com"
                  className="bg-[#18181F] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/65 uppercase tracking-[1px]">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="bg-[#18181F] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white/65 uppercase tracking-[1px]">
                Message <span className="text-[#E8373A]">*</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={8}
                className="bg-[#18181F] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-[#FFD23F] text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] py-4 px-8 rounded-xl hover:bg-[#FFD23F]/90 transition-all disabled:opacity-60 min-h-[52px] flex items-center justify-center gap-2"
            >
              {status === "loading" ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#0A0A14]/30 border-t-[#0A0A14] rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Inquiry →"
              )}
            </button>
          </form>
        )}

        <div className="text-center mt-10">
          <a href="/services" className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 hover:text-white transition-colors">
            ← Back to Services
          </a>
        </div>
      </div>
    </main>
  );
}

export default function InquirePage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <InquireForm />
      </Suspense>
      <Footer />
    </>
  );
}
