"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PHILOSOPHY_QUOTE } from "./data";

export default function Quote() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-32 md:py-44 border-t border-white/10 overflow-hidden flex items-center justify-center">
      <div aria-hidden className="absolute inset-0 flex items-center overflow-hidden opacity-[0.05] select-none">
        <motion.div
          animate={prefersReducedMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap font-[family-name:var(--font-glyph-sans)] font-extrabold text-[18vw] leading-none"
        >
          <span className="pr-12">GLYPH · GLYPH · GLYPH · GLYPH ·</span>
          <span className="pr-12">GLYPH · GLYPH · GLYPH · GLYPH ·</span>
        </motion.div>
      </div>

      <motion.blockquote
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative px-6 max-w-[900px] mx-auto text-center"
      >
        <p className="font-[family-name:var(--font-glyph-serif)] italic font-normal text-[9vw] sm:text-[6vw] md:text-[52px] text-white leading-[1.15]">
          &ldquo;{PHILOSOPHY_QUOTE}&rdquo;
        </p>
        <cite className="block mt-8 font-[family-name:var(--font-glyph-mono)] not-italic text-[11px] uppercase tracking-[0.15em] text-white/40">
          — A working principle, not a slogan
        </cite>
      </motion.blockquote>
    </section>
  );
}
