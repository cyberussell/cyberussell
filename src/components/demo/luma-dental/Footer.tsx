import { MapPin, Phone, Mail, Clock, Smile } from "lucide-react";
import { CLINIC } from "./data";

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] px-6 md:px-10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-9 h-9 rounded-full bg-[#0D9488] flex items-center justify-center">
                <Smile size={18} className="text-white" />
              </span>
              <span className="font-sans text-[18px] font-extrabold text-white">{CLINIC.name}</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/45 leading-[1.7] max-w-[300px]">
              Modern, gentle dental care in the heart of BGC. New patients always welcome.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-1">Visit Us</p>
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-[#5EEAD4] shrink-0 mt-0.5" />
              <span className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/55">{CLINIC.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock size={16} className="text-[#5EEAD4] shrink-0" />
              <span className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/55">{CLINIC.hours}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-1">Contact</p>
            <div className="flex items-center gap-2.5">
              <Phone size={16} className="text-[#5EEAD4] shrink-0" />
              <span className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/55">{CLINIC.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={16} className="text-[#5EEAD4] shrink-0" />
              <span className="font-[family-name:var(--font-inter)] text-[13.5px] text-white/55">{CLINIC.email}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">
            &copy; {new Date().getFullYear()} {CLINIC.name}. Fictional clinic for demo purposes.
          </p>
          <a href="/portfolio" className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 hover:text-[#5EEAD4] transition-colors">
            Concept &amp; design by Cyberussell →
          </a>
        </div>
      </div>
    </footer>
  );
}
