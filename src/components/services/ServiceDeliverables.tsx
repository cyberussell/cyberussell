import { Package, Sparkles } from "lucide-react";
import type { Service } from "@/lib/services/types";

export default function ServiceDeliverables({ service }: { service: Service }) {
  return (
    <section className="bg-[#0A0A14] py-12 md:py-16 px-6 md:px-10 border-y border-white/[0.06]">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-5" style={{ color: service.color }}>
            <Package size={13} /> Deliverables
          </span>
          <ul className="flex flex-col gap-3">
            {service.deliverables.map((d) => (
              <li key={d} className="flex items-start gap-2.5 font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: service.color }} />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] text-white/30 mb-5">
            <Sparkles size={13} /> Features
          </span>
          <ul className="flex flex-col gap-3">
            {service.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.6]">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/25 shrink-0" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
