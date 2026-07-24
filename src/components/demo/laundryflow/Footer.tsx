import { MapPin, Phone, Shirt } from "lucide-react";
import { SHOP } from "./data";

const EXPLORE_LINKS = [
  { label: "Pricing", href: "/demo/laundryflow#pricing" },
  { label: "Contact", href: "/demo/laundryflow#contact" },
  { label: "Branches", href: "/demo/laundryflow#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F0F1A] px-6 md:px-16 pt-14 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          <div className="sm:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Shirt size={18} className="text-white" />
              </span>
              <div>
                <p className="font-sans font-black text-[16px] text-white tracking-tight uppercase">{SHOP.name}</p>
                <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">Doorstep laundry that cares.</p>
              </div>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-relaxed max-w-xs">
              We treat your clothes like our own with premium care, since 2024.
            </p>
            <a
              href="/demo/laundryflow/book-a-pickup"
              className="inline-flex items-center justify-center bg-[#2563EB] text-white font-[family-name:var(--font-inter)] font-bold text-[13.5px] py-2.5 px-6 rounded-full hover:opacity-90 transition-all w-fit"
            >
              Schedule a Pickup
            </a>
          </div>

          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/40 uppercase tracking-wide mb-4">Explore</p>
            <ul className="space-y-3">
              {EXPLORE_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-[family-name:var(--font-inter)] text-[13px] text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/40 uppercase tracking-wide mb-4">Legal</p>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="font-[family-name:var(--font-inter)] text-[13px] text-white/70 hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-8 border-b border-white/10">
          <div className="flex items-start gap-3">
            <Phone size={16} className="text-white/40 mt-0.5 shrink-0" />
            <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/70 leading-relaxed">
              {SHOP.phone}
              <br />
              {SHOP.phone2}
            </p>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-white/40 mt-0.5 shrink-0" />
            <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/70 leading-relaxed">{SHOP.address}</p>
          </div>
        </div>

        <p className="pt-6 text-center font-[family-name:var(--font-inter)] text-[11.5px] text-white/30">
          &copy; {new Date().getFullYear()} {SHOP.fullName}. Demo concept by Cyberussell.
        </p>
      </div>
    </footer>
  );
}
