"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, ExternalLink } from "lucide-react";
import { SHOP, BRANCHES, LOCATION } from "./data";
import { fadeUp } from "./motion";

export default function Location() {
  return (
    <section id="contact" className="bg-white px-6 py-16 md:py-20">
      <div className="max-w-md md:max-w-4xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-8">
          <div>
            <h2 className="font-sans font-black text-[28px] md:text-[32px] text-[#0F172A] leading-[0.95] tracking-tight mb-3">{LOCATION.heading}</h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#64748B]">{LOCATION.body}</p>
          </div>

          <div className="space-y-5">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#2563EB]">
                <MapPin size={20} />
              </span>
              <div>
                <p className="font-sans font-black text-[15px] text-[#0F172A]">Main Branch</p>
                <address className="not-italic font-[family-name:var(--font-inter)] text-[13.5px] text-[#64748B]">{SHOP.address}</address>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#2563EB]">
                <Phone size={20} />
              </span>
              <div>
                <p className="font-sans font-black text-[15px] text-[#0F172A]">Contact Numbers</p>
                <p className="font-[family-name:var(--font-inter)] text-[13.5px] text-[#64748B]">
                  {SHOP.phone}
                  <br />
                  {SHOP.phone2}
                </p>
              </div>
            </div>
          </div>

          <div>
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0F172A] uppercase tracking-wide mb-3">Our Service Areas</p>
            <div className="flex flex-wrap gap-2">
              {BRANCHES.map((branch) => (
                <span key={branch} className="bg-[#F1F5F9] text-[#64748B] text-[13px] font-[family-name:var(--font-inter)] px-4 py-1.5 rounded-full">
                  {branch}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={0.15}
          className="relative rounded-3xl overflow-hidden h-[320px] md:h-[380px] bg-gradient-to-br from-blue-50 to-[#EFF6FF] flex items-center justify-center shadow-[0_2px_10px_rgba(15,23,42,0.06)]"
        >
          <MapPin size={40} className="text-[#2563EB]" />
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-2xl flex items-center justify-between border border-[#2563EB]/10">
            <span className="font-[family-name:var(--font-inter)] text-[13px] font-bold text-[#0F172A]">Open in Google Maps</span>
            <ExternalLink size={16} className="text-[#64748B]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
