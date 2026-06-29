import { ExternalLink } from "lucide-react";
import type { Tool } from "@/lib/careers/types";

export default function CareerTools({ tools }: { tools: Tool[] }) {
  return (
    <section className="bg-[#111118] py-12 md:py-16 px-6 md:px-10">
      <div className="max-w-4xl mx-auto">
        <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
          Tools You Need
        </span>
        <h2 className="font-sans text-[26px] md:text-[36px] font-bold text-white leading-tight mb-4">
          Set these up before you start.
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/50 mb-10">
          All free or have free plans. No investment needed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {tools.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-[#18181F] border border-white/[0.08] rounded-xl p-5 flex flex-col gap-2 hover:border-white/[0.15] transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h3 className="font-sans text-[15px] font-bold text-white group-hover:text-[#FFD23F] transition-colors">
                    {tool.name}
                  </h3>
                  <ExternalLink size={12} className="text-white/20 group-hover:text-[#FFD23F]/60 transition-colors" strokeWidth={2} />
                </div>
                <span className={`font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full ${tool.is_free ? "text-[#00C97A] bg-[#00C97A]/10 border border-[#00C97A]/20" : "text-[#FFD23F] bg-[#FFD23F]/10 border border-[#FFD23F]/20"}`}>
                  {tool.is_free ? "Free" : "Paid"}
                </span>
              </div>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.6]">
                {tool.purpose}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
