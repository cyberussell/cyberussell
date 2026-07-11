"use client";

import { useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export default function LandingNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#050816]/90 backdrop-blur-md border-b border-white/[0.08]">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 md:px-10 py-4" aria-label="Main">
        <Link href="/laundry-management-system" className="font-sans text-[17px] font-bold text-white tracking-tight">
          Laundry Management <span className="text-[#38BDF8]">System</span>
        </Link>

        <div className="hidden md:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/60 hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/laundry-management-system/login"
            className="font-[family-name:var(--font-inter)] text-[13.5px] font-medium text-white/60 hover:text-white transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/laundry-management-system/signup"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:brightness-110 hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(56,189,248,0.35)] transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[13.5px] px-5 py-2.5 rounded-lg"
          >
            Start Now
          </Link>
        </div>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-white/70 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]"
          aria-expanded={open}
          aria-controls="lms-mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="lms-mobile-menu" className="md:hidden border-t border-white/[0.08] px-6 pb-5 pt-2">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 font-[family-name:var(--font-inter)] text-[14px] text-white/70 hover:bg-white/[0.06]"
              >
                {l.label}
              </a>
            ))}
            <Link
              href="/laundry-management-system/login"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 font-[family-name:var(--font-inter)] text-[14px] text-white/70 hover:bg-white/[0.06]"
            >
              Sign In
            </Link>
            <Link
              href="/laundry-management-system/signup"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-gradient-to-r from-[#2563EB] to-[#38BDF8] px-3 py-2.5 text-center font-[family-name:var(--font-inter)] font-bold text-[14px] text-white"
            >
              Start Now
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
