"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY } from "./data";
import { fadeUp } from "./motion";

export default function Gallery() {
  return (
    <section id="gallery" className="bg-[#f6f1e9] pt-16 md:pt-[100px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center px-[8%] pb-10 md:pb-[50px]"
      >
        <div className="text-[12px] tracking-[1.5px] uppercase text-[#241f1a] mb-3.5">Follow Us</div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[26px] md:text-[34px] text-[#241f1a] mb-1.5">
          @gandabeautysalon
        </h2>
        <p className="text-[13px] md:text-[14px] text-[#8a8378]">Inspiration, transformation and beautiful hair.</p>
      </motion.div>

      <div className="grid grid-cols-3 md:grid-cols-6">
        {GALLERY.map((img) => (
          <div key={img.src} className="relative w-full h-[130px] md:h-[230px]">
            <Image src={img.src} alt={img.alt} fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
