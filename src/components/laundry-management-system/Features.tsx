"use client";

import { motion } from "framer-motion";
import {
  Globe,
  CalendarCheck2,
  QrCode,
  PackageSearch,
  Users,
  BarChart3,
  Boxes,
  LayoutDashboard,
  UserCog,
  ShieldCheck,
  Smartphone,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }),
};

const FEATURES: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Globe, title: "Professional Website", desc: "A modern, branded website customers trust the moment they land on it." },
  { icon: CalendarCheck2, title: "Online Booking", desc: "Customers schedule pickups and drop-offs without a phone call." },
  { icon: QrCode, title: "QR Booking & Check-in", desc: "Every order gets a QR code for instant, error-free check-in." },
  { icon: PackageSearch, title: "Laundry Order Tracking", desc: "Know exactly where every order is, from drop-off to pickup." },
  { icon: Users, title: "Customer Database", desc: "Every customer and order history saved and searchable in one place." },
  { icon: BarChart3, title: "Monthly Sales Dashboard", desc: "Clear reports on revenue and order volume, updated automatically." },
  { icon: Boxes, title: "Simple Inventory Tracking", desc: "Keep tabs on detergent, supplies, and packaging stock levels." },
  { icon: LayoutDashboard, title: "Owner Dashboard", desc: "A single view of branch performance, orders, and staff activity." },
  { icon: UserCog, title: "Staff Dashboard", desc: "A focused view for staff to scan, update, and complete orders." },
  { icon: ShieldCheck, title: "Hosting & SSL Included", desc: "Secure, reliable hosting — nothing extra to set up or manage." },
  { icon: Smartphone, title: "Mobile Friendly", desc: "Looks and works great on phones, tablets, and desktops alike." },
  { icon: Wrench, title: "Ongoing Maintenance", desc: "Updates, fixes, and support included — not a one-time build." },
];

function FeatureCard({ item, index }: { item: (typeof FEATURES)[0]; index: number }) {
  const Icon = item.icon;
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      className="relative overflow-hidden bg-white/70 backdrop-blur-md border border-[#22D3EE]/20 hover:border-[#22D3EE]/40 rounded-2xl p-6 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-[2px] shadow-sm hover:shadow-[0_0_30px_rgba(34,211,238,0.18)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-4 -right-4 w-16 h-16 rounded-full bg-[#22D3EE]/20 blur-xl"
      />
      <div className="w-11 h-11 rounded-xl bg-[#0D9488]/15 border border-[#22D3EE]/25 flex items-center justify-center">
        <Icon size={19} className="text-[#0D9488]" strokeWidth={1.6} />
      </div>
      <h3 className="font-sans text-[15px] font-bold text-[#0B1B33]">{item.title}</h3>
      <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#0B1B33]/55 leading-[1.7]">{item.desc}</p>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section id="features" className="px-6 md:px-10 py-20 max-w-5xl mx-auto scroll-mt-24">
      <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="text-center mb-14">
        <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#0F766E] uppercase tracking-[3px]">Features</span>
        <h2 className="font-sans text-[28px] md:text-[38px] font-bold text-[#0B1B33] mt-2">
          Everything You Need to Run Your Laundry Business
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((item, i) => (
          <FeatureCard key={item.title} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}
