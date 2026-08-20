"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SERVICES, SERVICES_INTRO, PHOTOS } from "./data";
import { fadeUp } from "./motion";

export default function Services() {
  return (
    <section id="services" className="px-6 py-16 md:py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-12 items-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative h-[280px] md:h-[340px] rounded-3xl overflow-hidden"
        >
          <Image
            src={PHOTOS.attendantSorting}
            alt="Attendant sorting clean laundry"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-cover"
          />
        </motion.div>

        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="font-[family-name:var(--font-inter)] text-[11px] font-black tracking-[2px] text-[#B98900] mb-2.5"
          >
            {SERVICES_INTRO.eyebrow}
          </motion.p>
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={1}
            className="font-sans font-black text-[28px] md:text-[32px] text-[#14181F] leading-[1.1] mb-3.5"
          >
            {SERVICES_INTRO.heading}
          </motion.h2>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={2}
            className="font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] text-[#14181F]/60 max-w-[480px] mb-7"
          >
            {SERVICES_INTRO.body}
          </motion.p>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            {SERVICES.map((svc, i) => (
              <motion.div
                key={svc.label}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i + 3}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFC629] flex items-center justify-center mx-auto mb-2.5">
                  <svc.icon size={20} className="text-[#14181F]" />
                </div>
                <div className="font-[family-name:var(--font-inter)] font-semibold text-[12px] text-[#14181F] leading-tight">{svc.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
