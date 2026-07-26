"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { GALLERY } from "./data";
import { fadeUp } from "./motion";

export default function Gallery() {
  return (
    <section className="bg-[#FDF9F3] px-6 pb-16 md:pb-20">
      <div className="max-w-md md:max-w-4xl mx-auto grid grid-cols-4 gap-3 md:gap-4">
        {GALLERY.map((photo, i) => (
          <motion.div
            key={photo.src}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={i * 0.15}
            className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${photo.wide ? "col-span-2" : "col-span-1"}`}
          >
            <Image src={photo.src} alt={photo.alt} fill unoptimized sizes="(min-width: 768px) 400px, 50vw" className="object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
