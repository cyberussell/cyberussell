"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const sectionLinks = [
  { label: "The Problem", href: "/#problema" },
  { label: "Ways to Earn", href: "/#paraan" },
  { label: "Skill Finder", href: "/#skill-finder" },
  { label: "Free Downloads", href: "/#downloads" },
];

const pageLinks = [
  { label: "Tools", href: "/tools" },
  { label: "Find Work", href: "/platforms" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
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
      {/* Top row: logo + page links */}
      <div className="flex justify-between items-center w-full h-[48px] px-6 md:px-10 max-w-7xl mx-auto">
        <a
          href="/"
          className="font-sans text-[20px] font-bold tracking-tight flex items-center"
          onClick={handleNavClick}
        >
          <span className="text-white">Cyber</span>
          <span className="text-[#FFD23F]">ussell</span>
        </a>

        <nav className="hidden md:flex gap-6 items-center h-full">
          {pageLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-[13px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase text-white/70 hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/#downloads"
            className="bg-[#E8373A] text-white text-[13px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] px-[18px] py-[9px] rounded-[6px] min-h-[36px] hover:opacity-90 transition-all"
          >
            Download Free
          </a>
        </nav>

        <button
          className="md:hidden text-white/70 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </div>

      {/* Bottom row: section links (desktop only) */}
      <div className="hidden md:flex justify-center items-center w-full h-[32px] px-6 md:px-10 max-w-7xl mx-auto border-t border-white/5">
        <nav className="flex gap-6 items-center">
          {sectionLinks.map(({ label, href }) => {
            const sectionId = href.replace("/#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={href}
                href={href}
                className={`text-[10px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase transition-colors
                  ${isActive ? "text-[#E8373A]" : "text-white/55 hover:text-white/70"}`}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#111118] border-t border-white/10 w-full">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {pageLinks.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={handleNavClick}
                className="text-[16px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase py-3 border-b border-white/[0.06] text-white/70 transition-colors"
              >
                {label}
              </a>
            ))}
            <span className="h-px w-full bg-white/10 my-2" />
            {sectionLinks.map(({ label, href }) => {
              const sectionId = href.replace("/#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={handleNavClick}
                  className={`text-[13px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase py-3 border-b border-white/[0.06] transition-colors
                    ${isActive ? "text-[#E8373A]" : "text-white/65"}`}
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
