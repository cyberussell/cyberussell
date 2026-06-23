"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "The Problem", href: "#problema" },
  { label: "Ways to Earn", href: "#paraan" },
  { label: "Skill Finder", href: "#skill-finder" },
  { label: "Free Downloads", href: "#downloads" },
  { label: "Find Work", href: "/platforms" },
];

const sectionIds = ["hero", "problema", "paraan", "skill-finder", "downloads"];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F1A] border-b border-white/10">
      <div className="flex justify-between items-center w-full h-[58px] px-6 md:px-10 max-w-7xl mx-auto">
        <a
          href="#hero"
          className="font-sans text-[20px] font-bold tracking-tight flex items-center"
          onClick={handleNavClick}
        >
          <span className="text-white">Cyber</span>
          <span className="text-[#FFD23F]">ussell</span>
        </a>

        <nav className="hidden md:flex gap-6 items-center h-full">
          {navLinks.map(({ label, href }) => {
            const sectionId = href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                className={`text-[12px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase transition-colors
                  ${isActive ? "text-[#E8373A]" : "text-white/70 hover:text-white"}`}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#downloads"
            className="bg-[#E8373A] text-white text-[13px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] px-[18px] py-[9px] rounded-[6px] min-h-[36px] hover:opacity-90 transition-all"
          >
            Download Free
          </a>
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors p-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#111118] border-t border-white/10 w-full">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map(({ label, href }) => {
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={handleNavClick}
                  className={`text-[15px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase py-3 border-b border-white/[0.06] transition-colors
                    ${isActive ? "text-[#E8373A]" : "text-white/70"}`}
                >
                  {label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
