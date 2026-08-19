"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "./data";
import { fadeUp } from "./motion";

export default function Testimonials() {
  return (
    <section className="bg-[#141110] px-[8%] py-16 md:py-[100px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-14"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-2.5">
          Kind words
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[28px] md:text-[38px] text-[#f8f4ec]">
          What Clients Say
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 md:gap-9 max-w-[1200px] mx-auto">
        {TESTIMONIALS.map((t, i) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
            className="p-8 border border-[rgba(201,161,90,0.2)]"
          >
            <div className="font-[family-name:var(--font-playfair)] text-[20px] text-[#c9a15a] mb-4">&ldquo;</div>
            <p className="text-[14.5px] leading-[1.75] text-[#d9d3c6] font-light mb-5">{t.quote}</p>
            <div className="text-[13px] text-[#c9a15a] font-medium">{t.name}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
