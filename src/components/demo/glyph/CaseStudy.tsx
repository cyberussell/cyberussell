"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "./motion";

const STATS = [
  { value: 10, suffix: "", label: "Custom-built sections" },
  { value: 100, suffix: "%", label: "Hand-animated, no template" },
  { value: 1, suffix: "", label: "Working booking flow" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function CaseStudy() {
  return (
    <section className="px-6 md:px-12 py-24 md:py-32 border-t border-white/10">
      <div className="flex items-center justify-between mb-12 md:mb-16">
        <h2 className="font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.15em] text-white/45">
          Flagship Build
        </h2>
        <a
          href="/demo/luma-dental"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="View"
          className="hidden sm:flex items-center gap-1.5 font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.1em] text-white/60 hover:text-[#D4FF3F] transition-colors"
        >
          View live build <ArrowUpRight size={14} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <motion.div
          initial={{ clipPath: "inset(14% round 24px)", opacity: 0.4 }}
          whileInView={{ clipPath: "inset(0% round 24px)", opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1, ease: EASE }}
          className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10"
        >
          <Image
            src="/portfolio/luma-dental/hero-clinic.jpg"
            alt="Bright Smiles Dental Studio interior, from the Glyph flagship concept build"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute -bottom-6 -right-4 flex -space-x-3">
            {["team-maya.jpg", "team-carlo.jpg", "team-anna.jpg"].map((img, i) => (
              <motion.div
                key={img}
                animate={{ y: [0, i % 2 === 0 ? -8 : 8, 0] }}
                transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden ring-4 ring-[#0B0B0E]"
              >
                <Image src={`/portfolio/luma-dental/${img}`} alt="" fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div>
          <h3 className="font-[family-name:var(--font-glyph-sans)] font-extrabold text-[32px] md:text-[44px] text-white leading-[1.05] mb-5">
            Bright Smiles <span className="font-[family-name:var(--font-glyph-serif)] italic text-[#D4FF3F] font-normal">Dental Studio.</span>
          </h3>
          <p className="font-[family-name:var(--font-glyph-sans)] text-[15px] md:text-[16px] text-white/55 leading-[1.8] max-w-[480px] mb-10">
            A fully animated healthcare concept — booking flow, team profiles, service
            breakdown, and patient testimonials — built to show what a modern clinic site
            can feel like when motion design and frontend engineering come from the same hand.
          </p>

          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-glyph-mono)] text-[28px] md:text-[36px] font-semibold text-[#D4FF3F] leading-none mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="font-[family-name:var(--font-glyph-sans)] text-[12px] text-white/45 leading-[1.5]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <a
            href="/demo/luma-dental"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="View"
            className="sm:hidden mt-8 inline-flex items-center gap-1.5 font-[family-name:var(--font-glyph-mono)] text-[11px] uppercase tracking-[0.1em] text-white/60"
          >
            View live build <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
