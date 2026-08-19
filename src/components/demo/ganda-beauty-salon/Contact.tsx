"use client";

import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { SALON } from "./data";
import { fadeUp } from "./motion";

export default function Contact() {
  return (
    <section id="contact" className="grid grid-cols-1 md:grid-cols-2 bg-[#f6f1e9]">
      <div
        className="relative min-h-[260px] md:min-h-[420px] flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at center, #241f1a 0%, #141110 75%)",
        }}
      >
        <div className="flex flex-col items-center gap-3 text-center px-8">
          <MapPin size={34} className="text-[#c9a15a]" />
          <span className="font-mono text-[11.5px] tracking-[0.5px] text-[#8a8378] max-w-[220px]">
            Map pin — Jupiter Street, Bel-Air, Makati City
          </span>
        </div>
      </div>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-col justify-center px-[8%] md:px-[10%] py-16 md:py-[100px]"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-3">
          Visit us
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[28px] md:text-[36px] text-[#241f1a] mb-[26px]">
          Find {SALON.name}
        </h2>
        <div className="flex flex-col gap-4 text-[14.5px] text-[#5c5650] font-light">
          <div>
            <strong className="text-[#241f1a] font-medium">Address —</strong> {SALON.address}
          </div>
          <div>
            <strong className="text-[#241f1a] font-medium">Phone —</strong> {SALON.phone}
          </div>
          <div>
            <strong className="text-[#241f1a] font-medium">Email —</strong> {SALON.email}
          </div>
          <div>
            <strong className="text-[#241f1a] font-medium">Hours —</strong> {SALON.hours}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
