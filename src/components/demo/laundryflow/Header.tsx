"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, Shirt } from "lucide-react";
import { SHOP, NAV_LINKS } from "./data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 right-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-10 h-[76px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center">
            <Shirt size={18} className="text-[#2563EB]" />
          </span>
          <span className="font-sans font-black text-[16px] md:text-[18px] text-[#0F172A] tracking-tight uppercase">{SHOP.name}</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 bg-white/70 backdrop-blur-md rounded-full px-6 py-2.5 border border-black/5">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="font-[family-name:var(--font-inter)] text-[14px] font-semibold text-[#0F172A]/70 hover:text-[#0F172A] transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#pricing"
          className="hidden md:inline-flex items-center gap-2 bg-[#2563EB] text-white font-[family-name:var(--font-inter)] font-bold text-[13px] py-2.5 px-5 rounded-full hover:opacity-90 transition-all"
        >
          Book Pickup
        </a>

        <button className="md:hidden text-[#0F172A] p-1" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-[#2563EB] border-t border-white/10 px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-inter)] text-[15px] font-semibold text-white/85 py-3 border-b border-white/10"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#pricing"
            onClick={() => setOpen(false)}
            className="mt-4 text-center bg-white text-[#2563EB] font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 rounded-full"
          >
            Book Pickup
          </a>
        </div>
      )}
    </motion.header>
  );
}
