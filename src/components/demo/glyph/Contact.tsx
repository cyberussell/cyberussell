"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { CONTACT } from "./data";
import { useScramble } from "./useScramble";

function MagneticButton() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { damping: 15, stiffness: 200 });
  const springY = useSpring(y, { damping: 15, stiffness: 200 });

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={CONTACT.href}
      data-cursor="Go"
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="group relative inline-flex items-center gap-3 bg-[#D4FF3F] text-[#0B0B0E] font-[family-name:var(--font-glyph-sans)] font-bold text-[16px] md:text-[18px] py-5 px-9 md:py-6 md:px-11 rounded-full"
    >
      Start a project
      <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </motion.a>
  );
}

export default function Contact() {
  const { display, start, stop } = useScramble(CONTACT.email);

  return (
    <section className="px-6 md:px-12 py-28 md:py-40 border-t border-white/10 flex flex-col items-center text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-[family-name:var(--font-glyph-sans)] font-extrabold text-[10vw] sm:text-[7vw] md:text-[4.2vw] leading-[1.05] tracking-[-0.02em] text-white max-w-[1100px] mb-10"
      >
        {CONTACT.headline}
      </motion.h2>

      <MagneticButton />

      <button
        onMouseEnter={start}
        onMouseLeave={stop}
        onClick={() => navigator.clipboard?.writeText(CONTACT.email)}
        data-cursor="Copy"
        className="mt-10 font-[family-name:var(--font-glyph-mono)] text-[13px] md:text-[14px] text-white/40 hover:text-white/70 transition-colors tracking-[0.02em]"
      >
        {display}
      </button>
    </section>
  );
}
