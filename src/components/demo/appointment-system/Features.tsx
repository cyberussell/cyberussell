"use client";

import { motion } from "framer-motion";
import {
  CalendarCheck,
  Building2,
  MapPin,
  ListOrdered,
  Bell,
  Mail,
  RefreshCw,
  CalendarDays,
  LayoutDashboard,
  History,
} from "lucide-react";
import { FEATURES } from "./data";
import { fadeUp } from "./motion";

const ICONS = {
  CalendarCheck,
  Building2,
  MapPin,
  ListOrdered,
  Bell,
  Mail,
  RefreshCw,
  CalendarDays,
  LayoutDashboard,
  History,
};

export default function Features() {
  return (
    <section id="features" className="px-6 md:px-10 py-20 md:py-28 bg-[#0B1220]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#5EEAD4] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Features
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-white leading-tight tracking-tight">
            Built for how scheduling actually works.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#3B5BFF]/20 flex items-center justify-center">
                  <Icon size={20} className="text-[#5EEAD4]" />
                </div>
                <h3 className="font-sans text-[15px] font-bold text-white leading-snug">{feature.title}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12.5px] text-white/50 leading-[1.6]">
                  {feature.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
