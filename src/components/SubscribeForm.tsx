"use client";

import { useState, useRef } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");
  const lastSubmit = useRef(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (honeypot) return;

    const now = Date.now();
    if (now - lastSubmit.current < 30_000) {
      setValidationError("Please wait a moment before trying again.");
      return;
    }

    if (!EMAIL_REGEX.test(email.trim())) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setValidationError("");
    lastSubmit.current = now;
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "", email, source: "footer" }),
      });
      if (!res.ok) throw new Error("Failed to subscribe.");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-2">
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#00C97A]">
          ✓ You&apos;re in! We&apos;ll send you updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {/* Honeypot */}
      <div style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
        <input
          type="text"
          name="website"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-1 bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-2.5 text-white text-[13px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] font-bold text-[13px] px-5 py-2.5 rounded-lg hover:opacity-90 transition-all disabled:opacity-60 whitespace-nowrap"
        >
          {status === "loading" ? "..." : "Subscribe"}
        </button>
      </div>
      {validationError && (
        <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#E8373A]">
          {validationError}
        </p>
      )}
      {status === "error" && !validationError && (
        <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#E8373A]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
