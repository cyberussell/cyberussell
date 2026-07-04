"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { HIGHLIGHTS, HIGHLIGHT_TAGS } from "./data";
import { fadeUp } from "./motion";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v).toString()),
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

export default function Highlights() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-[#F4F6FF]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center max-w-[600px] mx-auto mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Portfolio Highlights
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight mb-3">
            The scope of this concept, by the numbers.
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#0B1220]/50 leading-[1.7]">
            These are fictional showcase metrics intended to demonstrate design thinking — not usage data from a live product.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {HIGHLIGHTS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="text-center"
            >
              <p className="font-sans text-[32px] md:text-[42px] font-extrabold text-[#3B5BFF] tracking-tight">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/50 font-medium mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {HIGHLIGHT_TAGS.map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-inter)] text-[12.5px] font-semibold text-[#0B1220]/70 bg-white border border-[#0B1220]/[0.07] px-4 py-2 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
