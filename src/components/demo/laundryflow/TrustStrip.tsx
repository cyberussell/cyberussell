"use client";

import { motion } from "framer-motion";
import { TRUST_ITEMS } from "./data";
import { fadeUp } from "./motion";

export default function TrustStrip() {
  return (
    <section className="bg-white px-6 py-14 md:py-16">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {TRUST_ITEMS.map((item, i) => (
          <motion.div
            key={item.label}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
            className="text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3CC] flex items-center justify-center mx-auto mb-3">
              <item.icon size={20} className="text-[#14181F]" />
            </div>
            <div className="font-sans font-bold text-[14px] text-[#14181F]">{item.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
