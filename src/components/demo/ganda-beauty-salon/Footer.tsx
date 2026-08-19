import { SALON } from "./data";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#stylists", label: "Stylists" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#141110] px-[8%] pt-14 pb-8 flex flex-col gap-9">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center flex-wrap gap-6">
        <div className="font-[family-name:var(--font-cormorant)] font-semibold text-[20px] md:text-[24px] tracking-[3px] md:tracking-[4px] text-[#f6f1e9]">
          {SALON.name.toUpperCase()}
          <span className="text-[#c9a15a]">.</span>
        </div>
        <div className="flex flex-wrap gap-5 md:gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[12.5px] tracking-[1px] uppercase text-[#b9b2a4] hover:text-[#c9a15a] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex gap-[18px]">
          <a href="#" className="text-[13px] text-[#b9b2a4] hover:text-[#c9a15a] transition-colors">
            Instagram
          </a>
          <a href="#" className="text-[13px] text-[#b9b2a4] hover:text-[#c9a15a] transition-colors">
            Facebook
          </a>
        </div>
      </div>
      <div className="border-t border-white/[0.08] pt-[22px] flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-[11.5px] text-[#6f6a60]">
          &copy; {new Date().getFullYear()} {SALON.name}, Makati City. Fictional salon for demo purposes.
        </p>
        <a href="/portfolio" className="text-[11.5px] text-[#6f6a60] hover:text-[#c9a15a] transition-colors">
          Concept &amp; design by Cyberussell →
        </a>
      </div>
    </footer>
  );
}
