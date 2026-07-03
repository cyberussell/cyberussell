import type { Service } from "@/lib/services/types";

export default function ServiceProcess({ service }: { service: Service }) {
  return (
    <section className="bg-[#0F0F1A] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="block font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4" style={{ color: service.color }}>
          How It Works
        </span>
        <h2 className="font-sans text-[24px] md:text-[32px] font-bold text-white leading-tight mb-10">
          The Process
        </h2>

        <div className="flex flex-col gap-0">
          {service.process.map((p, i) => (
            <div key={p.step} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div
                  className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-sans text-[13px] font-bold"
                  style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}30`, color: service.color }}
                >
                  {i + 1}
                </div>
                {i < service.process.length - 1 && <div className="w-px flex-1 my-1" style={{ backgroundColor: `${service.color}20` }} />}
              </div>
              <div className="pb-8">
                <h3 className="font-sans text-[15px] font-bold text-white mb-1.5">{p.step}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
