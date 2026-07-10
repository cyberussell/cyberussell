"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, PRODUCT } from "./data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(11,18,32,0.06)]" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-[76px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src="/appointment-logo.png" alt="" className="w-9 h-9 rounded-xl object-cover" />
          <span className="font-sans text-[19px] font-extrabold text-[#0B1220] tracking-tight">{PRODUCT.name}</span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-[family-name:var(--font-inter)] text-[14px] font-medium text-[#0B1220]/65 hover:text-[#3B5BFF] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="/portfolio/appointment-system"
          className="hidden md:inline-flex items-center gap-2 bg-[#0B1220] text-white font-[family-name:var(--font-inter)] font-bold text-[13px] py-2.5 px-5 rounded-full hover:opacity-90 transition-all"
        >
          View Case Study
        </a>

        <button className="md:hidden text-[#0B1220] p-1" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#0B1220]/[0.06] px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-inter)] text-[15px] font-medium text-[#0B1220]/70 py-3 border-b border-[#0B1220]/[0.05]"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/portfolio/appointment-system"
            onClick={() => setOpen(false)}
            className="mt-4 text-center bg-[#0B1220] text-white font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 rounded-full"
          >
            View Case Study
          </a>
        </div>
      )}
    </motion.header>
  );
}
