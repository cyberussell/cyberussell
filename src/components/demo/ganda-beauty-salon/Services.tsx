"use client";

import { motion } from "framer-motion";
import { SERVICE_CATEGORIES } from "./data";
import { fadeUp } from "./motion";

export default function Services() {
  return (
    <section id="services" className="bg-[#141110] px-[8%] py-16 md:py-[110px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-2.5">
          What we offer
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] text-[#f8f4ec]">
          Services &amp; Pricing
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-9 max-w-[1280px] mx-auto">
        {SERVICE_CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.name}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
            className="border-t border-[rgba(201,161,90,0.35)] pt-[22px]"
          >
            <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[20px] md:text-[22px] text-[#c9a15a] mb-4">
              {cat.name}
            </h3>
            {cat.items.map((item) => (
              <div
                key={item.name}
                className="flex justify-between gap-2.5 mb-3.5 pb-3 border-b border-white/[0.08]"
              >
                <span className="text-[13.5px] md:text-[14.5px] text-[#e6e1d6] font-light">{item.name}</span>
                <span className="text-[13.5px] md:text-[14.5px] text-[#c9a15a] font-medium whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
