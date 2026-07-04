import { CalendarCheck2 } from "lucide-react";
import { PRODUCT, TECH_STACK } from "./data";

export default function Footer() {
  return (
    <footer className="bg-[#0B1220] px-6 md:px-10 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#3B5BFF] to-[#14B8A6] flex items-center justify-center">
            <CalendarCheck2 size={18} className="text-white" />
          </span>
          <span className="font-sans text-[18px] font-extrabold text-white">{PRODUCT.name}</span>
        </div>

        <div className="flex flex-wrap gap-2 pb-10 border-b border-white/[0.08]">
          {TECH_STACK.map((tech) => (
            <span key={tech} className="font-[family-name:var(--font-inter)] text-[11px] text-white/45 bg-white/5 px-2.5 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>

        <div className="pt-8 pb-2 max-w-[640px]">
          <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.8]">
            <span className="font-bold text-white/70">This is a fictional concept.</span> Appointment System was designed and
            built exclusively for the Cyberussell portfolio to demonstrate UX, UI, front-end, and full-stack
            engineering capability. It is not a live product, and no signup, payment, or scheduling on this page is
            real.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30">
            &copy; {new Date().getFullYear()} Cyberussell. Concept project, not a real company.
          </p>
          <a href="/portfolio/appointment-system" className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 hover:text-[#5EEAD4] transition-colors">
            View full case study →
          </a>
        </div>
      </div>
    </footer>
  );
}
