"use client";

import { motion } from "framer-motion";
import { Stethoscope, User, ShieldCheck } from "lucide-react";
import { USER_TYPES } from "./data";
import { fadeUp } from "./motion";

const ICONS = { Stethoscope, User, ShieldCheck };

export default function UserTypes() {
  return (
    <section id="user-types" className="px-6 md:px-10 py-20 md:py-28 bg-[#F4F6FF]">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Who It&apos;s For
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            Three roles, one platform.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USER_TYPES.map((user, i) => {
            const Icon = ICONS[user.icon as keyof typeof ICONS];
            return (
              <motion.div
                key={user.role}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="bg-white border border-[#0B1220]/[0.07] rounded-3xl p-8 shadow-[0_12px_40px_rgba(11,18,32,0.05)]"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#3B5BFF] to-[#14B8A6] flex items-center justify-center mb-6">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-sans text-[19px] font-bold text-[#0B1220] mb-2">{user.role}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#0B1220]/55 leading-[1.7] mb-5">
                  {user.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {user.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-[family-name:var(--font-inter)] text-[11px] font-medium text-[#0B1220]/55 bg-[#0B1220]/[0.04] px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
