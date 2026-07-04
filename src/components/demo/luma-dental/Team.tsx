"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TEAM } from "./data";
import { fadeUp } from "./motion";

export default function Team() {
  return (
    <section id="team" className="px-6 md:px-10 py-20 md:py-28">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="max-w-[560px] mb-14">
          <span className="block text-[#0D9488] font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] mb-3">
            Meet the Team
          </span>
          <h2 className="font-sans text-[28px] md:text-[38px] font-extrabold text-[#0B1220] leading-tight tracking-tight">
            Licensed dentists you can actually trust.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map((member, i) => (
            <motion.div
              key={member.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -4 }}
              className="bg-white border border-[#0B1220]/[0.07] rounded-2xl overflow-hidden hover:shadow-[0_12px_30px_rgba(13,148,136,0.1)] transition-all duration-300"
            >
              <div className="relative aspect-square">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans text-[16px] font-bold text-[#0B1220]">{member.name}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[12.5px] font-semibold text-[#0D9488] mt-1 mb-3">
                  {member.role}
                </p>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1220]/55 leading-[1.6]">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
