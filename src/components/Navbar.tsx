"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const sectionLinks = [
  { label: "Skill Finder", href: "/#skill-finder" },
  { label: "Free Resources", href: "/#downloads" },
  { label: "Career Blueprints", href: "/careers" },
  { label: "Discover Your Skill", href: "/discover" },
];

const pageLinks = [
  { label: "Tools", href: "/tools" },
  { label: "Find Work", href: "/platforms" },
  { label: "Shop", href: "/shop" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

const sectionIds = ["hero", "skill-finder", "downloads"];

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
        </nav>

        <button
          className="md:hidden text-white/70 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
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
          </nav>
        </div>
      )}
    </header>
  );
}
