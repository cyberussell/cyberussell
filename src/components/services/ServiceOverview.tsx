import { AlertCircle } from "lucide-react";
import type { Service } from "@/lib/services/types";

export default function ServiceOverview({ service }: { service: Service }) {
  return (
    <section className="bg-[#0F0F1A] py-10 md:py-14 px-6 md:px-10">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <span className="block font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4" style={{ color: service.color }}>
            What This Is
          </span>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/65 leading-[1.85]">
            {service.description}
          </p>
        </div>

        <div className="md:col-span-2">
          <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] text-white/30 mb-4">
            <AlertCircle size={13} /> Problems It Solves
          </span>
          <ul className="flex flex-col gap-3">
            {service.problems.map((p) => (
              <li key={p} className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.7] pl-4 border-l-2" style={{ borderColor: `${service.color}40` }}>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
