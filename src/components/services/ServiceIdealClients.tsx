import { Users } from "lucide-react";
import type { Service } from "@/lib/services/types";

export default function ServiceIdealClients({ service }: { service: Service }) {
  return (
    <section className="bg-[#0F0F1A] py-10 md:py-12 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4" style={{ color: service.color }}>
          <Users size={13} /> This Service Is Best For
        </span>
        <div className="flex flex-wrap gap-2">
          {service.idealClients.map((c) => (
            <span
              key={c}
              className="font-[family-name:var(--font-inter)] text-[12px] font-medium px-3 py-1.5 rounded-full border"
              style={{ color: service.color, borderColor: `${service.color}30`, backgroundColor: `${service.color}0A` }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
