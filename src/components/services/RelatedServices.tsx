import type { Service } from "@/lib/services/types";
import { getServiceIcon } from "./icons";

export default function RelatedServices({ current, all }: { current: Service; all: Service[] }) {
  const others = all.filter((s) => s.slug !== current.slug);

  return (
    <section className="bg-[#0F0F1A] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="block font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] text-white/30 mb-6">
          Other Services
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {others.map((s) => {
            const Icon = getServiceIcon(s.icon);
            return (
              <a
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group flex flex-col items-center text-center gap-2 bg-[#18181F] border border-white/[0.08] rounded-xl p-4 hover:border-white/20 hover:-translate-y-[2px] transition-all duration-200"
              >
                <Icon size={18} style={{ color: s.color }} strokeWidth={1.6} />
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-medium text-white/55 group-hover:text-white/80 transition-colors leading-tight">
                  {s.shortLabel}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
