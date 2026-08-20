import { MapPin, Phone, Mail, Clock, Smile } from "lucide-react";
import { CLINIC } from "./data";

// lucide-react (this version) has no brand icons — small hand-drawn inline
// SVGs instead of pulling in a new icon dependency for two mockup links.
function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M15.5 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2h3.5l-.5 3H12v7.5h-3V15H7v-3h2v-2.3C9 7.4 10.4 6 13 6h2.5v2.5Z" />
    </svg>
  );
}

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
            <div className="flex gap-3 mt-4">
              <a
                href="#"
                aria-label="Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] text-white/50 hover:border-[#5EEAD4] hover:text-[#5EEAD4] transition-colors"
              >
                <InstagramIcon />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/[0.12] text-white/50 hover:border-[#5EEAD4] hover:text-[#5EEAD4] transition-colors"
              >
                <FacebookIcon />
              </a>
            </div>
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
          <div className="flex items-center gap-5">
            <a href="/appointments/login" className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 hover:text-[#5EEAD4] transition-colors">
              Admin Login
            </a>
            <a href="/appointments/login" className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 hover:text-[#5EEAD4] transition-colors">
              Staff Login
            </a>
            <a href="/portfolio" className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 hover:text-[#5EEAD4] transition-colors">
              Concept &amp; design by Cyberussell →
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
