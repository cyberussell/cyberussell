"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROCESS } from "./data";
import { EASE } from "./motion";

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="relative px-6 md:px-12 py-24 md:py-32 border-t border-white/10">
      <h2 className="font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.15em] text-white/45 mb-14 md:mb-20">
        Process
      </h2>

      <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-24">
        <div className="hidden md:flex sticky top-32 h-fit items-start gap-6">
          <svg width="2" height="300" viewBox="0 0 2 300" className="overflow-visible shrink-0">
            <line x1="1" y1="0" x2="1" y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <motion.line x1="1" y1="0" x2="1" y2="300" stroke="#D4FF3F" strokeWidth="2" style={{ pathLength }} />
          </svg>
          <motion.span
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="font-[family-name:var(--font-glyph-serif)] italic text-[100px] leading-none text-white/15"
          >
            {PROCESS[active].index}
          </motion.span>
        </div>

        <div className="flex flex-col gap-20 md:gap-32">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.index}
              onViewportEnter={() => setActive(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ amount: 0.5, once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <span className="md:hidden font-[family-name:var(--font-glyph-mono)] text-[12px] text-[#D4FF3F] block mb-2">
                {step.index}
              </span>
              <h3 className="font-[family-name:var(--font-glyph-sans)] font-extrabold text-[32px] md:text-[44px] text-white leading-tight mb-4">
                {step.title}
              </h3>
              <p className="font-[family-name:var(--font-glyph-sans)] text-[15px] md:text-[16px] text-white/50 leading-[1.75] max-w-[520px]">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
