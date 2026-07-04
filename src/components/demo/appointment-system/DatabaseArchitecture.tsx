"use client";

import { motion } from "framer-motion";
import { Database } from "lucide-react";
import { DB_ENTITIES } from "./data";
import { fadeUp } from "./motion";

export default function DatabaseArchitecture() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#3B5BFF] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Database Architecture
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            A relational schema built for multi-office scheduling.
          </h2>
        </motion.div>

        <div className="relative bg-[#FAFBFF] border border-[#0B1220]/[0.06] rounded-3xl p-6 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {DB_ENTITIES.map((entity, i) => (
              <motion.div
                key={entity.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i}
                className="bg-white border border-[#0B1220]/[0.08] rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="flex items-center gap-2 bg-[#0B1220] px-4 py-2.5">
                  <Database size={13} className="text-[#14B8A6]" />
                  <span className="font-[family-name:var(--font-inter)] text-[12px] font-bold text-white">{entity.name}</span>
                </div>
                <div className="p-3 flex flex-col gap-1.5">
                  {entity.fields.map((field) => (
                    <span key={field} className="font-mono text-[11px] text-[#0B1220]/50">
                      {field}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          <p className="font-[family-name:var(--font-inter)] text-[12px] text-[#0B1220]/35 text-center mt-8">
            Professionals → Offices → Office Hours / Availability → Appointments ← Clients
          </p>
        </div>
      </div>
    </section>
  );
}
