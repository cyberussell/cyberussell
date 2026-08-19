"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { STYLISTS } from "./data";
import { fadeUp } from "./motion";

export default function Stylists() {
  return (
    <section id="stylists" className="bg-[#f6f1e9] px-[8%] py-16 md:py-[110px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-[60px]"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-2.5">
          The people
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] text-[#241f1a]">
          Our Stylists
        </h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-7 max-w-[1280px] mx-auto">
        {STYLISTS.map((person, i) => (
          <motion.div
            key={person.id}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i}
            className="flex flex-col gap-4"
          >
            <div className="relative w-full h-[200px] md:h-[320px]">
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
            <div>
              <div className="font-[family-name:var(--font-cormorant)] font-semibold text-[18px] md:text-[20px] text-[#241f1a]">
                {person.name}
              </div>
              <div className="text-[11px] md:text-[12.5px] tracking-[0.5px] uppercase text-[#8a8378] mt-1">
                {person.role}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
