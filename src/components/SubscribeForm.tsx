"use client";

import { useState, useRef } from "react";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

export default function SubscribeForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [validationError, setValidationError] = useState("");
  const lastSubmit = useRef(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Honeypot — silent reject
    if (honeypot) return;

    // Rate limit: 30 seconds between submissions
    const now = Date.now();
    if (now - lastSubmit.current < 30_000) {
      setValidationError("Please wait a moment before trying again.");
      return;
    }

    // Email format validation
    if (!EMAIL_REGEX.test(email.trim())) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    setValidationError("");
    lastSubmit.current = now;
    setStatus("loading");
    try {
      const params = new URLSearchParams({ name, email });
      await fetch(
        `https://script.google.com/macros/s/AKfycbwsbD7W3ZYIte7UHvzvkWfNQ4pZ1QwVB5alvt3ok3u7lYVz1pyUtDiTTIcKI9Ebfp05/exec?${params.toString()}`,
        { method: "GET", mode: "no-cors" }
      );
      setStatus("success");
      setName("");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-[#18181F] border border-[#00C97A]/30 rounded-2xl p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <p className="font-sans text-[18px] font-bold text-white mb-2">You&apos;re in!</p>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55">
          We&apos;ll send you updates on new guides, income tips, and tools for Filipinos who want to earn online.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#18181F] border border-white/[0.08] rounded-2xl p-8">
      <div className="mb-6">
        <p className="font-sans text-[20px] font-bold text-white mb-2">
          Get new guides when they drop.
        </p>
        <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/50 leading-[1.7]">
          Free. No spam. Unsubscribe anytime. Just real updates for Filipinos who want to earn online.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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

        <input
          type="text"
          placeholder="Your name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
        />
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-[#0F0F1A] border border-white/10 rounded-lg px-4 py-3 text-white text-[14px] placeholder-white/25 focus:outline-none focus:border-[#FFD23F] transition-colors font-[family-name:var(--font-inter)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="bg-[#FFD23F] text-[#0F0F1A] font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-60"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe — It's Free"}
        </button>
        {validationError && (
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#E8373A] text-center">
            {validationError}
          </p>
        )}
        {status === "error" && !validationError && (
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#E8373A] text-center">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
}
