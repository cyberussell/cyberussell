import type { IncomePath } from "@/lib/careers/types";

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
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7] flex-grow">
                {path.detail}
              </p>
              <div className="pt-2 border-t border-white/[0.06]">
                <span className="font-sans text-[16px] font-bold text-[#00C97A]">
                  ₱{path.earning_range.min.toLocaleString()}–₱{path.earning_range.max.toLocaleString()}
                </span>
                <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/30 ml-1">/month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
