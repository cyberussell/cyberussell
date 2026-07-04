"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { BRAND } from "./data";
import { revealLine, fadeIn } from "./motion";

const LINES = [
  { text: "INTERFACES", accent: false },
  { text: "WORTH", accent: false },
  { text: "REMEMBERING.", accent: true },
];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { damping: 40, stiffness: 60 });
  const springY = useSpring(my, { damping: 40, stiffness: 60 });
  const blobX = useTransform(springX, [-0.5, 0.5], [-40, 40]);
  const blobY = useTransform(springY, [-0.5, 0.5], [-40, 40]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const handle = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [prefersReducedMotion, mx, my]);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden px-6 md:px-12 pt-28 pb-10">
      <motion.div
        aria-hidden
        style={prefersReducedMotion ? undefined : { x: blobX, y: blobY }}
        className="absolute -top-1/4 right-[-10%] w-[60vw] h-[60vw] max-w-[720px] max-h-[720px] rounded-full bg-[radial-gradient(circle,_rgba(212,255,63,0.16)_0%,_transparent_70%)] blur-2xl pointer-events-none"
      />

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="relative flex items-center justify-between font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.15em] text-white/45"
      >
        <span>{BRAND.eyebrow}</span>
        <span className="hidden sm:inline">Based in the Philippines</span>
      </motion.div>

      <div className="relative">
        <h1 className="font-[family-name:var(--font-glyph-sans)] font-extrabold text-[16vw] sm:text-[13vw] md:text-[9.5vw] leading-[0.88] tracking-[-0.03em] text-[#F5F4F0]">
          {LINES.map((line, i) => (
            <span key={line.text} className="block overflow-hidden">
              <motion.span
                variants={revealLine}
                initial="hidden"
                animate="show"
                custom={i}
                className={`block ${line.accent ? "font-[family-name:var(--font-glyph-serif)] italic font-normal text-[#D4FF3F]" : ""}`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>
      </div>

      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        custom={4}
        className="relative flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10 border-t border-white/10"
      >
        <p className="font-[family-name:var(--font-glyph-sans)] text-[15px] md:text-[17px] text-white/55 leading-[1.7] max-w-[440px]">
          I&apos;m Glyph — a creative director and frontend architect who designs, animates,
          and ships production-grade web experiences from first pixel to deployed code.
        </p>

        <div className="flex items-center gap-3">
          <motion.div
            animate={prefersReducedMotion ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center shrink-0"
          >
            <ArrowDown size={14} className="text-white/60" />
          </motion.div>
          <span className="font-[family-name:var(--font-glyph-mono)] text-[10px] uppercase tracking-[0.15em] text-white/40 max-w-[180px]">
            {BRAND.role}
          </span>
        </div>
      </motion.div>
    </section>
  );
}
