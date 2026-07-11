import { MapPin, Phone, Shirt } from "lucide-react";
import { SHOP, BRANCHES } from "./data";

export default function Footer() {
  return (
    <footer className="bg-[#0F0F1A] px-6 md:px-16 pt-14 pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pb-8 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <Shirt size={18} className="text-white" />
            </span>
            <div>
              <p className="font-sans font-black text-[16px] text-white tracking-tight uppercase">{SHOP.name}</p>
              <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/50">Doorstep laundry that cares.</p>
            </div>
          </div>

          <a
            href="#pricing"
            className="inline-flex items-center justify-center bg-[#2563EB] text-white font-[family-name:var(--font-inter)] font-bold text-[13.5px] py-2.5 px-6 rounded-full hover:opacity-90 transition-all shrink-0"
          >
            Schedule a Pickup
          </a>
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

        <div className="py-8 border-b border-white/10">
          <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/40 uppercase tracking-wide mb-3">Branches</p>
          <div className="flex flex-wrap gap-2">
            {BRANCHES.map((branch) => (
              <span key={branch} className="font-[family-name:var(--font-inter)] text-[12.5px] text-white/70 bg-white/5 px-3 py-1.5 rounded-full">
                {branch}
              </span>
            ))}
          </div>
        </div>

        <p className="pt-6 text-center font-[family-name:var(--font-inter)] text-[11.5px] text-white/30">
          &copy; {new Date().getFullYear()} {SHOP.fullName}. Demo concept by Cyberussell.
        </p>
      </div>
    </footer>
  );
}
