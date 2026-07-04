import { ArrowUpRight } from "lucide-react";
import { BRAND } from "./data";

const LINKS = [
  { label: "All Projects", href: "/portfolio" },
  { label: "Cyberussell", href: "/" },
  { label: "Services", href: "/services" },
];

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
      <span className="font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.15em] text-white/35">
        {BRAND.name} &copy; {new Date().getFullYear()} — a Cyberussell concept build
      </span>
      <nav className="flex items-center gap-6">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            data-cursor="Go"
            className="group flex items-center gap-1 font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.1em] text-white/50 hover:text-[#D4FF3F] transition-colors"
          >
            {link.label}
            <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </nav>
    </footer>
  );
}
