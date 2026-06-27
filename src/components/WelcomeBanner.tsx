"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function WelcomeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("welcome-banner-dismissed");
    if (!dismissed) setVisible(true);
  }, []);

  function dismiss() {
    localStorage.setItem("welcome-banner-dismissed", "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-[#FFD23F] text-[#0F0F1A] px-4 py-2.5 flex items-center justify-center gap-3 relative">
      <p className="font-[family-name:var(--font-inter)] text-[13px] font-semibold text-center leading-[1.5]">
        👋 Welcome! Free tools, guides, and affordable digital products para sa Filipino freelancers.
      </p>
      <button
        onClick={dismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-black/10 transition-colors shrink-0"
        aria-label="Dismiss"
      >
        <X size={16} strokeWidth={2.5} color="#0F0F1A" />
      </button>
    </div>
  );
}
