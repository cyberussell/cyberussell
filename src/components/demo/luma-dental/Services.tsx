"use client";

import { motion } from "framer-motion";
import { Stethoscope, Sparkles, Smile, Anchor, Syringe, Baby, ArrowUpRight } from "lucide-react";
import { SERVICES } from "./data";
import { fadeUp } from "./motion";

const ICONS = { Stethoscope, Sparkles, Smile, Anchor, Syringe, Baby };

export default function Services() {
  return (
    <section id="services" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#0D9488] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            What We Offer
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            Complete dental care, under one roof.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => {
            const Icon = ICONS[service.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i % 3}
                whileHover={{ y: -4 }}
                className="group bg-white border border-[#0B1220]/[0.07] rounded-2xl p-6 flex flex-col gap-4 hover:border-[#0D9488]/30 hover:shadow-[0_12px_30px_rgba(13,148,136,0.1)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0D9488]/10 flex items-center justify-center group-hover:bg-[#0D9488] transition-colors duration-300">
                  <Icon size={22} className="text-[#0D9488] group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-[17px] font-bold text-[#0B1220]">{service.title}</h3>
                  <ArrowUpRight size={16} className="text-[#0B1220]/20 group-hover:text-[#0D9488] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-[#0B1220]/55 leading-[1.65]">
                  {service.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
