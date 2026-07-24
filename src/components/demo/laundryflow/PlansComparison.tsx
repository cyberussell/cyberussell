"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Star } from "lucide-react";
import { PLANS } from "./data";
import { fadeUp } from "./motion";

type Plan = (typeof PLANS)[number];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
      className={`relative rounded-2xl p-6 flex flex-col h-full bg-white shadow-[0_2px_10px_rgba(15,23,42,0.06)] ${
        plan.highlight ? "border-2 border-[#2563EB]" : "border border-black/5"
      }`}
    >
      {plan.highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-[#2563EB] text-white font-[family-name:var(--font-inter)] text-[10.5px] font-bold uppercase tracking-wide px-3 py-1 rounded-full">
          <Star size={10} className="fill-white" /> Most Popular
        </span>
      )}

      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
        <plan.icon size={18} className="text-[#2563EB]" />
      </div>

      <h3 className="font-sans font-black text-[19px] text-[#0F172A] tracking-tight mb-1">{plan.name}</h3>
      <p className="font-[family-name:var(--font-inter)] text-[12.5px] text-[#64748B] mb-4">{plan.tagline}</p>

      <div className="mb-1">
        <span className="font-sans font-black text-[28px] text-[#0F172A]">{plan.price}</span>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[12.5px] text-[#64748B] mb-5">{plan.setup}</p>

      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {plan.features.map((feature) => {
          const isHeader = feature.endsWith(":");
          return (
            <li
              key={feature}
              className={`flex items-start gap-2 font-[family-name:var(--font-inter)] text-[13px] leading-[1.5] ${
                isHeader ? "text-[#64748B] font-bold uppercase tracking-wide text-[10.5px] mt-1" : "text-[#334155]"
              }`}
            >
              {!isHeader && <Check size={14} className="text-[#2563EB] shrink-0 mt-[2px]" />}
              {feature}
            </li>
          );
        })}
      </ul>

      <a
        href={`/services/inquire?service=${encodeURIComponent(`Laundry Management System - ${plan.name}`)}`}
        className={`inline-flex items-center justify-center gap-2 font-[family-name:var(--font-inter)] font-bold text-[14px] py-3 rounded-full transition-all hover:-translate-y-[1px] ${
          plan.highlight ? "bg-[#2563EB] hover:opacity-90 text-white" : "bg-blue-50 hover:bg-blue-100 text-[#2563EB]"
        }`}
      >
        Start Now <ArrowRight size={15} />
      </a>
    </motion.div>
  );
}

export default function PlansComparison() {
  return (
    <section id="whats-included" className="bg-[#FDF9F3] px-6 py-16 md:py-20">
      <div className="max-w-md md:max-w-5xl mx-auto">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-10">
          <p className="font-[family-name:var(--font-inter)] text-[13px] font-black text-[#2563EB] uppercase tracking-wide mb-2">What&apos;s Included</p>
          <h2 className="font-sans font-black text-[32px] md:text-[38px] text-[#0F172A] leading-[0.95] tracking-tight mb-3">
            Everything Behind This Site
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-[#64748B] max-w-lg mx-auto">
            The site you just scrolled through is only part of the picture. Here&apos;s what Cyberussell actually delivers, whether or not a
            client needs a new website built.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {PLANS.map((plan, i) => (
            <PlanCard key={plan.key} plan={plan} index={i} />
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="bg-[#0F0F1A] rounded-3xl p-6 md:p-8 max-w-2xl mx-auto"
        >
          <span className="inline-block text-[11px] font-bold px-2.5 py-1 rounded-full border font-[family-name:var(--font-inter)] text-[#FFD23F] bg-[#FFD23F]/10 border-[#FFD23F]/20 mb-4">
            A CYBERUSSELL CONCEPT
          </span>

          <h3 className="font-sans font-black text-[26px] md:text-[30px] text-white leading-[0.95] tracking-tight mb-4">
            This Is Just a Sample Website.
          </h3>
          <p className="font-[family-name:var(--font-inter)] text-[14.5px] text-white/60 leading-[1.8] mb-3">
            Aling Maria Laundry Shop isn&apos;t a real business — this entire site is a concept built by Cyberussell to show what&apos;s
            possible for local businesses.
          </p>
          <p className="font-[family-name:var(--font-inter)] text-[14.5px] text-white/60 leading-[1.8] mb-8">
            We design and build custom websites and laundry management systems that help businesses like this accept orders online,
            manage day-to-day operations, and grow their customer base — with or without a new website.
          </p>

          <div className="flex flex-col items-center gap-3">
            <a
              href="/services/inquire?service=Laundry%20Management%20System"
              className="inline-flex items-center gap-2 bg-[#E8373A] text-white font-[family-name:var(--font-inter)] font-bold text-[15px] py-3 px-8 rounded-lg hover:opacity-90 transition-all"
            >
              Contact Us Today <ArrowRight size={16} />
            </a>
            <a
              href="/portfolio"
              className="inline-flex items-center justify-center font-[family-name:var(--font-inter)] font-bold text-[14px] text-white/60 hover:text-white transition-colors py-2"
            >
              View More Business Websites
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
