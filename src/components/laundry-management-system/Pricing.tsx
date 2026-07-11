"use client";

import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

type Plan = {
  name: string;
  price: string;
  label: string;
  setup: string;
  features: string[];
  highlight: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Essential",
    price: "₱399/month",
    label: "Per Branch",
    setup: "₱2,999 one-time setup",
    highlight: false,
    features: [
      "Professional Website",
      "Hosting & SSL",
      "Custom Domain Connection",
      "Online Booking",
      "QR Booking",
      "Laundry Order Tracking",
      "Customer Database",
      "Monthly Sales Dashboard",
      "Simple Inventory Tracking",
      "Owner Dashboard",
      "Up to 3 Staff Accounts",
      "Standard Support",
      "Up to 2 Website/System Change Requests per Month",
    ],
  },
  {
    name: "Professional",
    price: "₱699/month",
    label: "Per Branch",
    setup: "₱4,999 one-time setup",
    highlight: true,
    features: [
      "Everything in Essential, plus:",
      "Unlimited Staff Accounts",
      "Pickup & Delivery Management",
      "Google Business Profile Setup",
      "Priority Support",
      "Up to 6 Website/System Change Requests per Month",
    ],
  },
];

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
      className={`relative overflow-hidden rounded-[24px] p-8 flex flex-col h-full ${
        plan.highlight
          ? "bg-gradient-to-b from-[#162033]/70 to-[#0B1120]/70 backdrop-blur-md border-2 border-[#38BDF8]/50 shadow-[0_0_40px_rgba(56,189,248,0.15)]"
          : "bg-[#162033]/40 backdrop-blur-md border border-[#38BDF8]/10"
      }`}
    >
      {plan.highlight && (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#38BDF8]/20 blur-2xl"
        />
      )}
      {plan.highlight && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2563EB] to-[#38BDF8] text-white font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1.5px] px-4 py-1.5 rounded-full">
          Most Popular
        </span>
      )}

      <h3 className="font-sans text-[20px] font-bold text-white mb-1">{plan.name}</h3>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-sans text-[36px] font-bold text-white">{plan.price}</span>
      </div>
      <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/40 uppercase tracking-[1.5px] mb-4">
        {plan.label}
      </span>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 mb-6">{plan.setup}</p>

      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {plan.features.map((feature) => {
          const isHeader = feature.endsWith(":");
          return (
            <li
              key={feature}
              className={`flex items-start gap-2.5 font-[family-name:var(--font-inter)] text-[13.5px] leading-[1.6] ${
                isHeader ? "text-white/40 font-bold uppercase tracking-[0.5px] text-[11px] mt-1" : "text-white/70"
              }`}
            >
              {!isHeader && <Check size={15} className="text-[#38BDF8] shrink-0 mt-[2px]" />}
              {feature}
            </li>
          );
        })}
      </ul>

      <a
        href={`/services/inquire?service=${encodeURIComponent(`Laundry Management System - ${plan.name}`)}`}
        className={`inline-flex items-center justify-center gap-2 font-[family-name:var(--font-inter)] font-bold text-[15px] px-6 py-3.5 rounded-xl transition-all hover:-translate-y-[2px] ${
          plan.highlight
            ? "bg-gradient-to-r from-[#2563EB] to-[#38BDF8] hover:brightness-110 hover:shadow-[0_0_24px_rgba(56,189,248,0.4)] text-white"
            : "bg-white/[0.08] hover:bg-white/[0.12] border border-[#38BDF8]/15 hover:border-[#38BDF8]/30 text-white"
        }`}
      >
        Start Now <ArrowRight size={16} />
      </a>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="px-6 md:px-10 py-20 max-w-5xl mx-auto scroll-mt-24">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#38BDF8] uppercase tracking-[3px]">Pricing</span>
        <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-white mt-2">Simple, Transparent Pricing</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {PLANS.map((plan, i) => (
          <PlanCard key={plan.name} plan={plan} index={i} />
        ))}
      </div>
    </section>
  );
}
