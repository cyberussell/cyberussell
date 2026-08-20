"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X, Clock, MapPin } from "lucide-react";
import { SHOP, NAV_LINKS, PHOTOS } from "./data";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50">
      <div className="hidden md:flex items-center justify-between bg-[#14181F] text-white/75 px-6 lg:px-10 py-2 text-[12.5px]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1.5">
            <Clock size={13} />
            {SHOP.hours}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={13} />
            {SHOP.shortLocation}
          </span>
        </div>
        <div className="flex items-center gap-3.5">
          <a href="#" aria-label="Facebook" className="text-white/75 hover:text-[#FFC629] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13.5 21v-7.5H16l.5-3h-3V8.2c0-.9.3-1.5 1.6-1.5H16.6V4c-.3 0-1.4-.1-2.6-.1-2.6 0-4.4 1.6-4.4 4.5v2.9H7v3h2.6V21Z" />
            </svg>
          </a>
          <a href="#" aria-label="Instagram" className="text-white/75 hover:text-[#FFC629] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.2c2.7 0 3.1 0 4.1.1 1 0 1.6.2 2 .3.5.2.9.5 1.2.9.4.3.7.7.9 1.2.2.4.3 1 .3 2 .1 1 .1 1.4.1 4.1s0 3.1-.1 4.1c0 1-.2 1.6-.3 2-.2.5-.5.9-.9 1.2-.3.4-.7.7-1.2.9-.4.2-1 .3-2 .3-1 .1-1.4.1-4.1.1s-3.1 0-4.1-.1c-1 0-1.6-.2-2-.3a3.5 3.5 0 0 1-1.2-.9 3.5 3.5 0 0 1-.9-1.2c-.2-.4-.3-1-.3-2-.1-1-.1-1.4-.1-4.1s0-3.1.1-4.1c0-1 .2-1.6.3-2 .2-.5.5-.9.9-1.2.3-.4.7-.7 1.2-.9.4-.2 1-.3 2-.3 1-.1 1.4-.1 4.1-.1Zm0 8.1a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm6-3.5a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0Z" />
            </svg>
          </a>
        </div>
      </div>

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">
          <a href="/demo/laundryflow#top" className="flex items-center">
            <Image src={PHOTOS.logo} alt={SHOP.fullName} width={200} height={80} priority className="h-14 md:h-16 w-auto" />
          </a>

          <nav className="hidden md:flex items-center gap-3 lg:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-[family-name:var(--font-inter)] text-[11.5px] lg:text-[13.5px] font-semibold text-[#14181F]/70 hover:text-[#14181F] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="/demo/laundryflow/book-a-pickup"
            className="hidden md:inline-flex items-center gap-2 bg-[#FFC629] text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[11.5px] lg:text-[13.5px] py-2 px-3.5 lg:py-2.5 lg:px-5 rounded-lg hover:opacity-90 transition-all whitespace-nowrap"
          >
            Book Now
          </a>

          <button className="md:hidden text-[#14181F] p-1" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-[#14181F] border-t border-white/10 px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-[family-name:var(--font-inter)] text-[15px] font-semibold text-white/85 py-3 border-b border-white/10"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/demo/laundryflow/book-a-pickup"
              onClick={() => setOpen(false)}
              className="mt-4 text-center bg-[#FFC629] text-[#14181F] font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 rounded-lg"
            >
              Book Now
            </a>
          </div>
        )}
      </motion.div>
    </header>
  );
}
