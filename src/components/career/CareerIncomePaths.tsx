import { Clock, AlertTriangle, Users } from "lucide-react";
import type { IncomePath } from "@/lib/careers/types";

const DIFFICULTY_LABEL = { easy: "Easy to find", moderate: "Takes some effort", hard: "Competitive" };
const DIFFICULTY_COLOR = {
  easy: "text-[#00C97A]",
  moderate: "text-[#FFD23F]",
  hard: "text-[#E8373A]",
};

export default function CareerIncomePaths({ paths }: { paths: IncomePath[] }) {
  return (
    <section className="bg-[#111118] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
          Income Paths
        </span>
        <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-white leading-tight mb-4">
          4 ways to earn from this skill.
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 mb-10">
          Pick one path to start. You can explore the others later.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paths.map((path) => (
            <div
              key={path.title}
              className="bg-[#18181F] border border-white/[0.08] rounded-xl p-6 flex flex-col gap-3 hover:border-white/[0.15] transition-colors"
            >
              <h3 className="font-sans text-[18px] font-bold text-white">{path.title}</h3>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
                {path.detail}
              </p>

              {/* Best for */}
              <div className="flex items-start gap-2 mt-1">
                <Users size={13} className="text-[#FFD23F] shrink-0 mt-[2px]" strokeWidth={2} />
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/45 leading-[1.6]">
                  {path.best_for}
                </span>
              </div>

              {/* Beginner mistake */}
              <div className="flex items-start gap-2">
                <AlertTriangle size={13} className="text-[#E8373A] shrink-0 mt-[2px]" strokeWidth={2} />
                <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 leading-[1.6]">
                  {path.typical_beginner_mistake}
                </span>
              </div>

              {/* Bottom row */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-2">
                <span className="font-sans text-[16px] font-bold text-[#00C97A]">
                  ₱{path.earning_range.min.toLocaleString()}–₱{path.earning_range.max.toLocaleString()}
                  <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 ml-1">/month</span>
                </span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 font-[family-name:var(--font-inter)] text-[11px] text-white/30">
                    <Clock size={11} strokeWidth={2} />
                    {path.time_to_first_income}
                  </span>
                  <span className={`font-[family-name:var(--font-inter)] text-[11px] font-bold ${DIFFICULTY_COLOR[path.first_client_difficulty]}`}>
                    {DIFFICULTY_LABEL[path.first_client_difficulty]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
