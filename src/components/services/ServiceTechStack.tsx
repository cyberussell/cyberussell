import type { Service } from "@/lib/services/types";

export default function ServiceTechStack({ service }: { service: Service }) {
  return (
    <section className="bg-[#0A0A14] py-10 md:py-12 px-6 md:px-10 border-y border-white/[0.06]">
      <div className="max-w-4xl mx-auto">
        <span className="block font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] text-white/30 mb-4">
          Technologies Used
        </span>
        <div className="flex flex-wrap gap-2">
          {service.techStack.map((t) => (
            <span
              key={t}
              className="font-[family-name:var(--font-inter)] text-[12px] font-medium text-white/55 bg-white/[0.04] border border-white/[0.08] px-3 py-1.5 rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
