"use client";

import { motion } from "framer-motion";
import { Video, QrCode, Sparkles, MessageSquare, CreditCard, Users, BarChart3, ListOrdered, RefreshCw } from "lucide-react";
import { ROADMAP } from "./data";
import { fadeUp } from "./motion";

const ICONS = { Video, QrCode, Sparkles, MessageSquare, CreditCard, Users, BarChart3, ListOrdered, RefreshCw };

export default function Roadmap() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Future Enhancements
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            Where the concept could go next.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {ROADMAP.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={item.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="border border-[#0B1220]/[0.08] rounded-2xl p-5 flex flex-col items-center text-center gap-3 hover:border-[#3B5BFF]/30 hover:-translate-y-[2px] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-[#F4F6FF] flex items-center justify-center">
                  <Icon size={17} className="text-[#3B5BFF]" />
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[12.5px] font-semibold text-[#0B1220]/70 leading-snug">
                  {item.title}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
