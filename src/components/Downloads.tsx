"use client";

import {
  BarChart2,
  BookOpen,
  ClipboardList,
  Bot,
  TrendingUp,
  MapPin,
  Download,
  Bell,
  type LucideIcon,
} from "lucide-react";
import { track } from "@vercel/analytics";
import { GUIDES } from "@/data/content";

const ICON_MAP: Record<string, LucideIcon> = {
  BarChart2,
  BookOpen,
  ClipboardList,
  Bot,
  TrendingUp,
  MapPin,
};

export default function Downloads() {
  return (
    <section id="downloads" className="bg-[#0F0F1A] py-12 md:py-[72px] px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-11">
          <div className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold tracking-[2.5px] uppercase mb-4">
            FREE RESOURCES
          </div>
          <h2 className="font-[family-name:var(--font-syne)] text-[26px] md:text-[38px] font-bold text-white leading-tight mb-4">
            Download. All Free. No Email Required.
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 max-w-[560px] leading-[1.8]">
            Genuinely useful guides — not lead magnets that sell you something
            at the end. Use them. Share them with people who need them.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GUIDES.map(({ icon, iconColor, previewBg, title, desc, meta, active, file }) => {
            const Icon = ICON_MAP[icon];
            return (
              <div
                key={title}
                className={`bg-[#18181F] border border-white/[0.12] rounded-[12px] overflow-hidden flex flex-col h-full transition-all duration-300
                  ${active ? "hover:border-[#FFD23F]/35 hover:-translate-y-[3px]" : "opacity-60 cursor-not-allowed"}`}
              >
                {/* Preview area */}
                <div
                  className={`relative flex items-center justify-center border-b border-white/[0.07] ${!active ? "grayscale" : ""}`}
                  style={{ height: 120, backgroundColor: previewBg }}
                >
                  <Icon size={48} color={iconColor} strokeWidth={1.4} />
                  <span className="absolute top-2 right-3 text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold tracking-[1px]">
                    PDF
                  </span>
                </div>

                {/* Card body */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-[family-name:var(--font-syne)] text-[18px] font-bold text-white mb-2 leading-tight">
                    {title}
                  </h3>
                  <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.8] mb-4 flex-grow">
                    {desc}
                  </p>
                  <div className="flex items-center justify-between mt-auto gap-3 flex-wrap">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] text-white/35">
                      {meta}
                    </span>
                    {active ? (
                      <a
                        href={file ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        download={!!file}
                        onClick={() => file && track("download", { file: title })}
                        className="bg-[#FFD23F]/10 border border-[#FFD23F]/25 text-[#FFD23F] font-[family-name:var(--font-inter)] text-[12px] font-bold px-[14px] py-[7px] rounded-[6px] hover:bg-[#FFD23F]/20 transition-colors flex items-center gap-1.5 min-h-[36px]"
                      >
                        <Download size={14} strokeWidth={2.5} />
                        {file ? "Download" : "Coming Soon"}
                      </a>
                    ) : (
                      <button
                        disabled
                        className="bg-white/5 border border-white/10 text-white/50 font-[family-name:var(--font-inter)] text-[12px] font-bold px-[14px] py-[7px] rounded-[6px] flex items-center gap-1.5 min-h-[36px] cursor-not-allowed"
                      >
                        <Bell size={14} strokeWidth={2.5} />
                        Notify Me
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
