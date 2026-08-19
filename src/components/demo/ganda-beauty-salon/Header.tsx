"use client";

import { SALON } from "./data";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#stylists", label: "Stylists" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-14 py-[22px] bg-[rgba(20,17,15,0.92)] backdrop-blur-[6px]">
      <a
        href="#top"
        className="font-[family-name:var(--font-cormorant)] font-semibold text-[20px] md:text-[24px] tracking-[4px] text-[#f6f1e9]"
      >
        {SALON.name.toUpperCase()}
      </a>
      <div className="flex items-center gap-5 md:gap-[34px]">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group relative hidden md:inline-block text-[13px] tracking-[1.5px] uppercase text-[#e9e4da] hover:text-[#e0be82] transition-colors"
          >
            {link.label}
            <span className="absolute left-0 -bottom-[6px] h-px w-0 bg-[#c9a15a] group-hover:w-full transition-[width] duration-[250ms]" />
          </a>
        ))}
        <a
          href="#book"
          className="inline-flex items-center gap-2 px-[16px] md:px-[22px] py-[11px] border border-[#c9a15a] text-[#c9a15a] text-[11px] md:text-[12px] tracking-[1.5px] uppercase hover:bg-[#c9a15a] hover:text-[#141110] transition-colors"
        >
          Book Now <span>↗</span>
        </a>
      </div>
    </nav>
  );
}
