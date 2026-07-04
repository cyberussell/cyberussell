"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CheckCircle2, ArrowRight, ChevronRight, ChevronDown } from "lucide-react";
import { getAllServices } from "@/lib/services/data";
import { getServiceIcon } from "@/components/services/icons";
import type { Service } from "@/lib/services/types";

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.07 } }),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const TRUST = [
  { icon: CheckCircle2, title: "Practical AI Solutions", desc: "No hype. Only solutions that solve real business problems and deliver measurable results." },
  { icon: CheckCircle2, title: "Modern Technology", desc: "Fast, secure, and scalable websites and applications built with current best practices." },
  { icon: CheckCircle2, title: "Business-Focused", desc: "Every solution is designed to save time, improve efficiency, or increase customer engagement." },
  { icon: CheckCircle2, title: "End-to-End Delivery", desc: "From planning and design to launch and ongoing support — I see projects through to completion." },
];

// ─── Components ───────────────────────────────────────────────────────────────

function TrustCard({ item, index }: { item: typeof TRUST[0]; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      custom={index}
      className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 flex flex-col gap-2"
    >
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 shrink-0 rounded-xl bg-[#FFD23F]/10 flex items-center justify-center">
          <Icon size={15} className="text-[#FFD23F]" strokeWidth={1.8} />
        </div>
        <h3 className="font-sans text-[15px] font-bold text-white">{item.title}</h3>
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">{item.desc}</p>
    </motion.div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = getServiceIcon(service.icon);

  return (
    <motion.a
      href={`/services/${service.slug}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      className="group bg-[#111118] border border-white/[0.06] hover:border-white/[0.14] rounded-[20px] p-7 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-[2px]"
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{ backgroundColor: `${service.color}14`, border: `1px solid ${service.color}28` }}
      >
        <Icon size={22} style={{ color: service.color }} strokeWidth={1.5} />
      </div>

      <div className="flex-1">
        <h2 className="font-sans text-[18px] font-bold text-white mb-2 group-hover:text-[#FFD23F] transition-colors">
          {service.name}
        </h2>
        <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/50 leading-[1.7]">
          {service.tagline}
        </p>
      </div>

      <span
        className="inline-flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[13px] font-bold"
        style={{ color: service.color }}
      >
        View Details <ChevronRight size={14} />
      </span>
    </motion.a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  const services = getAllServices();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0A0A14]">

        {/* ── Hero ── */}
        <section className="relative flex flex-col overflow-hidden min-h-[680px] md:min-h-0">
          {/* Background photo — desktop */}
          <div className="hidden md:block absolute inset-0 z-0 min-h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/russell-hero.jpg"
              alt="Russell Parayno — AI, Automation & Web Services"
              className="w-full h-full object-cover object-[30%_60%] [transform:scaleX(-1)]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/95 via-[#0A0A14]/80 to-[#0A0A14]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-[#0A0A14]/40" />
          </div>

          {/* Background photo — mobile (portrait, flipped so face is on right) */}
          <div className="md:hidden absolute inset-0 z-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/russell-hero-mobile.jpg"
              alt="Russell Parayno — AI, Automation & Web Services"
              className="w-full h-full object-cover object-top"
            />
            {/* Heavy left gradient so text is readable, face shows through on right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/95 via-[#0A0A14]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A14] via-transparent to-transparent" />
          </div>

          {/* Main content */}
          <div className="relative z-10 px-6 md:px-10 max-w-5xl mx-auto w-full pt-28 pb-12">
            <div className="w-full">
              <motion.div variants={fadeIn} initial="hidden" animate="show" custom={0}>
                <span className="inline-flex items-center gap-2 bg-[#FFD23F]/10 border border-[#FFD23F]/25 rounded-full px-4 py-1.5 mb-8">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD23F] animate-pulse" />
                  <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[2px]">
                    Services
                  </span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={1}
                className="font-sans text-[28px] md:text-[58px] lg:text-[66px] font-bold text-white mb-6 leading-[1.1] max-w-[55%] md:max-w-3xl"
              >
                Helping Businesses Grow Through{" "}
                <span className="text-[#FFD23F]">AI, Automation</span>{" "}
                &amp; Modern Websites
              </motion.h1>

              <motion.p
                variants={fadeUp}
                initial="hidden"
                animate="show"
                custom={2}
                className="font-[family-name:var(--font-inter)] text-[13px] md:text-[18px] text-white/55 max-w-[52%] md:max-w-xl leading-[1.8] mb-10"
              >
                Whether you&apos;re launching a new business, improving an existing website, or exploring how AI can streamline your operations, I build practical solutions that save time, attract customers, and help your business grow.
              </motion.p>

              <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/services/inquire?service=General+Inquiry"
                  className="inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 transition-all text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
                >
                  Let&apos;s Discuss Your Project <ArrowRight size={16} />
                </a>
                <a
                  href="/portfolio"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
                >
                  Sample Work
                </a>
              </motion.div>
            </div>
          </div>

          {/* ── Services preview strip ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="relative z-10 w-full border-t border-white/[0.08] bg-[#0A0A14]/70 backdrop-blur-md"
          >
            {/* "What I offer" label + scroll cue */}
            <div className="flex items-center justify-between px-6 md:px-10 pt-4 pb-2 max-w-5xl mx-auto">
              <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/30 uppercase tracking-[2.5px]">
                What I offer
              </span>
              <span className="flex items-center gap-1.5 font-[family-name:var(--font-inter)] text-[11px] text-white/30">
                Scroll to explore
                <ChevronDown size={13} className="animate-bounce" />
              </span>
            </div>

            {/* Pill row — wraps on mobile */}
            <div className="pb-5 pt-1 px-6 md:px-10">
              <div className="flex flex-wrap justify-center gap-2">
                {services.map((s) => {
                  const Icon = getServiceIcon(s.icon);
                  return (
                    <a
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-full border transition-all hover:scale-105 shrink-0"
                      style={{
                        borderColor: `${s.color}25`,
                        backgroundColor: `${s.color}08`,
                      }}
                    >
                      <Icon size={13} style={{ color: s.color }} strokeWidth={2} />
                      <span
                        className="font-[family-name:var(--font-inter)] text-[12px] font-medium whitespace-nowrap"
                        style={{ color: s.color }}
                      >
                        {s.shortLabel}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </section>

        {/* ── Trust ── */}
        <section className="px-6 md:px-10 py-20 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-sans text-[28px] md:text-[36px] font-bold text-white mb-3">
              Why Businesses Work With Me
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 max-w-lg mx-auto">
              Straightforward. Business-focused. Delivered.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRUST.map((item, i) => <TrustCard key={item.title} item={item} index={i} />)}
          </div>
        </section>

        {/* ── Services ── */}
        <section className="px-6 md:px-10 pb-20 max-w-5xl mx-auto">
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
            <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[3px]">What I Offer</span>
            <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-white mt-2">
              Six Ways I Help Businesses Grow
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="px-6 md:px-10 pb-24 max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative rounded-[24px] overflow-hidden"
          >
            <div className="absolute inset-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80"
                alt="Two professionals collaborating in a bright modern office"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A14]/95 via-[#0A0A14]/80 to-[#0A0A14]/60" />
            </div>
            <div className="relative z-10 px-8 md:px-14 py-16 md:py-20">
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#FFD23F] uppercase tracking-[3px] mb-4 block">
                Ready to Start?
              </span>
              <h2 className="font-sans text-[30px] md:text-[44px] font-bold text-white mb-4 leading-tight max-w-xl">
                Let&apos;s Build Something Great Together
              </h2>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 max-w-lg leading-[1.8] mb-8">
                Whether you need a website, a mobile app, AI automation, or a custom business solution, I&apos;d love to hear about your project. Let&apos;s talk about what you need.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="/services/inquire?service=General+Inquiry"
                  className="inline-flex items-center justify-center gap-2 bg-[#FFD23F] hover:bg-[#FFD23F]/90 transition-all text-[#0A0A14] font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
                >
                  Request a Free Consultation <ArrowRight size={16} />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] border border-white/[0.12] transition-all text-white font-[family-name:var(--font-inter)] font-bold text-[15px] px-7 py-3.5 rounded-xl"
                >
                  View Cyberussell
                </a>
              </div>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
