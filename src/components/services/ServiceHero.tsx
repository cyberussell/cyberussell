import type { Service } from "@/lib/services/types";
import { getServiceIcon } from "./icons";

export default function ServiceHero({ service }: { service: Service }) {
  const Icon = getServiceIcon(service.icon);

  return (
    <section className="bg-[#0F0F1A] pt-8 md:pt-14 pb-10 md:pb-14 px-6 md:px-10 relative overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 right-0 w-[600px] h-[600px]"
        style={{ background: `radial-gradient(circle at top right, ${service.color}1F, transparent 50%)` }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[12px] text-white/35">
            <li><a href="/services" className="hover:text-white/60 transition-colors">Services</a></li>
            <li aria-hidden="true">/</li>
            <li className="text-white/55" aria-current="page">{service.name}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}28` }}
          >
            <Icon size={22} style={{ color: service.color }} strokeWidth={1.6} />
          </div>
          <span
            className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2px] px-3 py-1 rounded-full border"
            style={{ color: service.color, borderColor: `${service.color}30`, backgroundColor: `${service.color}0C` }}
          >
            Cyberussell Service
          </span>
        </div>

        <h1 className="font-sans text-[30px] md:text-[46px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
          {service.hero.headline}
        </h1>

        <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[19px] text-white/60 leading-[1.7] max-w-[640px]">
          {service.hero.subhead}
        </p>
      </div>
    </section>
  );
}
