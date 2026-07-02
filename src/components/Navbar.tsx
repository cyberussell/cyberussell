"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import StartHereDropdown from "@/components/StartHereDropdown";

interface DropdownItem {
  label: string;
  href: string;
  badge?: string;
  divider?: boolean;
}

interface NavItem {
  label: string;
  href?: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  {
    label: "START HERE",
    href: "/start-here",
    dropdown: [
      { label: "Discover Your Best Online Skill", href: "/skill-finder" },
      { label: "8 Ways to Earn Online", href: "/guides/8-ways" },
      { label: "Philippine Labor Market Guide", href: "/downloads/ph-labor-market-2026.pdf" },
    ],
  },
  {
    label: "AI TOOLS",
    href: "/tools",
    dropdown: [
      { label: "View All AI Tools", href: "/tools" },
      { label: "──────────────", href: "#", divider: true },
      { label: "Scam Checker", href: "/tools/scam-scanner" },
      { label: "Prompt Trainer", href: "/tools/prompt-forge" },
      { label: "Bio Generator", href: "/tools/bio-generator" },
      { label: "Digital Literacy Checker", href: "/ai-tools/digital-literacy-checker" },
      { label: "Computer Skills Analyzer", href: "/ai-tools/computer-skills-analyzer" },
      { label: "AI Confidence Analyzer", href: "/ai-tools/ai-confidence-analyzer" },
      { label: "──────────────", href: "#", divider: true },
      { label: "Where to Apply & Earn", href: "/earn/freelance-platforms" },
    ],
  },
  {
    label: "LEARN",
    href: "/learn",
    dropdown: [
      { label: "AI Foundations", href: "/learn/foundations" },
      { label: "Think with AI", href: "/learn/think" },
      { label: "Meet Your AI Team", href: "/learn/ai-team" },
      { label: "AI Workflows", href: "/learn/workflows" },
      { label: "Build Real Skills", href: "/learn/skills" },
      { label: "AI Missions", href: "/learn/missions" },
      { label: "──────────────", href: "#", divider: true },
      { label: "Career Blueprints", href: "/careers" },
    ],
  },
  {
    label: "EARN",
    href: "/earn",
    dropdown: [
      { label: "Ways to Earn", href: "/earn" },
      { label: "Remote Jobs", href: "/earn/remote-jobs" },
      { label: "Affiliate Marketing", href: "/earn/affiliate-marketing" },
      { label: "Digital Products", href: "/earn/digital-products" },
      { label: "Website Business", href: "/earn/website-business" },
    ],
  },
  {
    label: "SERVICES",
    href: "/services",
  },
  {
    label: "SHOP",
    href: "/shop",
  },
];

function DropdownMenu({ items }: { items: DropdownItem[] }) {
  return (
    <div className="absolute top-full left-0 mt-1 w-60 bg-[#18181F] border border-white/[0.1] rounded-xl shadow-xl py-1 z-50">
      {items.map((item, i) => {
        if (item.divider) {
          return <div key={i} className="border-t border-white/[0.08] my-1" />;
        }
        return (
          <a
            key={i}
            href={item.href}
            target={item.href.endsWith(".pdf") ? "_blank" : undefined}
            rel={item.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
            className="flex items-center justify-between px-4 py-2.5 text-[13px] font-[family-name:var(--font-inter)] text-white/70 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-bold text-[#FFD23F] bg-[#FFD23F]/10 border border-[#FFD23F]/20 px-1.5 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}

function NavItemDesktop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const label = (
    <span className="text-[16px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase text-white/70 hover:text-white transition-colors flex items-center gap-1">
      {item.label}
      {item.dropdown && <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />}
    </span>
  );

  if (!item.dropdown) {
    return (
      <a href={item.href} className="flex items-center h-full">
        {label}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative flex items-center h-full">
      <a
        href={item.href}
        className="flex items-center h-full text-[16px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] uppercase text-white/70 hover:text-white transition-colors"
      >
        {item.label}
      </a>
      <button
        onClick={() => setOpen((o) => !o)}
        className="ml-1 p-1 text-white/70 hover:text-white transition-colors flex items-center"
        aria-label={`Toggle ${item.label} menu`}
      >
        <ChevronDown size={12} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        item.label === "START HERE" ? (
          <StartHereDropdown />
        ) : (
          <DropdownMenu items={item.dropdown} />
        )
      )}
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const handleNavClick = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0F0F1A] border-b border-white/10">
      <div className="flex justify-between items-center w-full h-[80px] px-6 md:px-10 max-w-7xl mx-auto">
        {/* Logo */}
        <a href="/" className="flex items-center" onClick={handleNavClick}>
          <Image
            src="/logo-icon.png"
            alt="Cyberussell"
            width={64}
            height={64}
            className="h-16 w-16 object-contain"
          />
          <span className="font-sans text-[28px] font-bold tracking-tight ml-3">
            <span className="text-white">Cyber</span>
            <span className="text-[#FFD23F]">ussell</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 items-center h-full">
          {navItems.map((item) => (
            <NavItemDesktop key={item.label} item={item} />
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111118] border-t border-white/10 w-full max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col px-6 py-4 gap-0">
            {navItems.map((item) => (
              <div key={item.label} className="border-b border-white/[0.06]">
                {item.href && !item.dropdown ? (
                  <a
                    href={item.href}
                    onClick={handleNavClick}
                    className="flex items-center gap-2 text-[16px] font-bold font-[family-name:var(--font-inter)] tracking-[0.04em] uppercase py-3.5 text-white/70"
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <div className="flex items-center justify-between py-3.5">
                      <a
                        href={item.href}
                        onClick={handleNavClick}
                        className="text-[16px] font-bold font-[family-name:var(--font-inter)] tracking-[0.04em] uppercase text-white/70 flex-1"
                      >
                        {item.label}
                      </a>
                      <button
                        onClick={() =>
                          setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                        }
                        className="p-1 text-white/50 hover:text-white transition-colors"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                    {mobileExpanded === item.label && item.dropdown && (
                      <div className="pb-2 flex flex-col gap-0">
                        {item.dropdown.map((sub, i) => {
                          if (sub.divider) return <div key={i} className="border-t border-white/[0.06] my-1" />;
                          return (
                            <a
                              key={i}
                              href={sub.href}
                              onClick={handleNavClick}
                              target={sub.href.endsWith(".pdf") ? "_blank" : undefined}
                              rel={sub.href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
                              className="flex items-center justify-between pl-6 py-2.5 text-[15px] font-[family-name:var(--font-inter)] text-white/55 hover:text-white transition-colors"
                            >
                              <span>{sub.label}</span>
                              {sub.badge && (
                                <span className="text-[10px] font-bold text-[#FFD23F] bg-[#FFD23F]/10 border border-[#FFD23F]/20 px-1.5 py-0.5 rounded-full">
                                  {sub.badge}
                                </span>
                              )}
                            </a>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
