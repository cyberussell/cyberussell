"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Compass, PenTool, Sparkles, Code2, LayoutGrid, Gauge } from "lucide-react";
import { CAPABILITIES } from "./data";

const ICONS = [Compass, PenTool, Sparkles, Code2, LayoutGrid, Gauge];

export default function Capabilities() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="px-6 md:px-12 py-24 md:py-32 border-t border-white/10">
      <h2 className="font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.15em] text-white/45 mb-10">
        Capabilities
      </h2>

      <div onMouseLeave={() => setHovered(null)}>
        {CAPABILITIES.map((cap, i) => {
          const Icon = ICONS[i % ICONS.length];
          const isHovered = hovered === i;
          return (
            <div
              key={cap.index}
              onMouseEnter={() => setHovered(i)}
              className="relative grid grid-cols-[48px_1fr_44px] md:grid-cols-[80px_1fr_1fr_56px] items-center gap-4 md:gap-8 py-7 md:py-9 border-t border-white/10 last:border-b"
            >
              {isHovered && (
                <motion.div
                  layoutId="capability-highlight"
                  className="absolute inset-0 bg-white/[0.035] -mx-6 md:-mx-12 px-6 md:px-12"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                />
              )}

              <span className="relative font-[family-name:var(--font-glyph-mono)] text-[13px] text-white/35">
                {cap.index}
              </span>

              <h3
                className={`relative font-[family-name:var(--font-glyph-sans)] font-bold text-[22px] md:text-[30px] transition-colors duration-300 ${
                  isHovered ? "text-[#D4FF3F]" : "text-white"
                }`}
              >
                {cap.title}
              </h3>

              <p className="relative hidden md:block font-[family-name:var(--font-glyph-sans)] text-[14px] text-white/50 leading-[1.7] max-w-[420px]">
                {cap.description}
              </p>

              <motion.div
                animate={{ rotate: isHovered ? -12 : 0, scale: isHovered ? 1.15 : 1 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-11 h-11 rounded-full border border-white/15 flex items-center justify-center justify-self-end shrink-0"
              >
                <Icon size={17} className="text-white/70" />
              </motion.div>

              <p className="relative md:hidden col-span-3 font-[family-name:var(--font-glyph-sans)] text-[13px] text-white/50 leading-[1.7] pt-2">
                {cap.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
