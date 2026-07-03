import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services/types";

export default function ServiceCTA({ service }: { service: Service }) {
  return (
    <section className="px-6 md:px-10 py-16 md:py-20">
      <div
        className="max-w-4xl mx-auto rounded-[24px] px-8 md:px-14 py-12 md:py-16 border"
        style={{ background: `linear-gradient(135deg, ${service.color}14 0%, #0F0F1A 70%)`, borderColor: `${service.color}25` }}
      >
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[3px] mb-4 block" style={{ color: service.color }}>
          Ready to Start?
        </span>
        <h2 className="font-sans text-[26px] md:text-[38px] font-bold text-white mb-4 leading-tight max-w-xl">
          {service.cta.label}
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 max-w-lg leading-[1.8] mb-8">
          Tell me about your project and I&apos;ll get back to you with next steps.
        </p>
        <a
          href={`/services/inquire?service=${encodeURIComponent(service.cta.inquireLabel)}`}
          className="inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 transition-all text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
        >
          {service.cta.label} <ArrowRight size={16} />
        </a>
      </div>
    </section>
  );
}
