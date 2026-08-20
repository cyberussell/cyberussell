import Image from "next/image";
import { MapPin, Phone } from "lucide-react";
import { SHOP, BRANCHES, PHOTOS } from "./data";

export default function Footer() {
  return (
    <footer className="bg-[#14181F] px-6 md:px-10 pt-14 pb-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10 border-b border-white/10">
          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl px-3 py-2 w-fit">
              <Image src={PHOTOS.logo} alt={SHOP.fullName} width={200} height={80} className="h-10 w-auto" />
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-relaxed max-w-xs">
              Fast, friendly, and affordable laundry care for your home or business.
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <MapPin size={16} className="text-[#FFC629]" />
              </span>
              <div>
                <p className="font-sans font-bold text-[13px] text-white">Main Branch</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-relaxed">{SHOP.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Phone size={16} className="text-[#FFC629]" />
              </span>
              <div>
                <p className="font-sans font-bold text-[13px] text-white">Contact Numbers</p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/60 leading-relaxed">
                  {SHOP.phone}
                  <br />
                  {SHOP.phone2}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/40 uppercase tracking-wide mb-3.5">Our Service Areas</p>
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((branch) => (
                <span
                  key={branch}
                  className="font-[family-name:var(--font-inter)] text-[12px] font-semibold text-white/80 bg-white/10 rounded-full px-3 py-1.5"
                >
                  {branch}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-[family-name:var(--font-inter)] text-[11.5px] text-white/40">
            &copy; {new Date().getFullYear()} {SHOP.fullName}
          </p>
          <div className="flex items-center gap-5">
            <a href="/lms/login" className="font-[family-name:var(--font-inter)] text-[11.5px] text-white/40 hover:text-[#FFC629] transition-colors">
              Admin Login
            </a>
            <a href="/lms/login" className="font-[family-name:var(--font-inter)] text-[11.5px] text-white/40 hover:text-[#FFC629] transition-colors">
              Staff Login
            </a>
            <a href="/portfolio" className="font-[family-name:var(--font-inter)] text-[11.5px] text-white/40 hover:text-[#FFC629] transition-colors">
              Concept &amp; design by Cyberussell →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
