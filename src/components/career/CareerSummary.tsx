import { AlertTriangle, Users } from "lucide-react";
import type { Career } from "@/lib/careers/types";

export default function CareerSummary({ summary }: { summary: Career["summary"] }) {
  return (
    <section className="bg-[#111118] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[17px] text-white/70 leading-[1.8] mb-10">
          {summary.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users size={18} className="text-[#FFD23F]" strokeWidth={2} />
              <h3 className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50 uppercase tracking-[1px]">
                Who is this for
              </h3>
            </div>
            <ul className="flex flex-col gap-2.5">
              {summary.who_is_this_for.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] mt-[7px] shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.6]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#18181F] border border-[#E8373A]/15 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle size={18} className="text-[#E8373A]" strokeWidth={2} />
              <h3 className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/50 uppercase tracking-[1px]">
                Reality check
              </h3>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 leading-[1.8]">
              {summary.reality_check}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
