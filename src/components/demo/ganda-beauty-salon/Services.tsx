"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAppointmentServices, formatPeso, type AppointmentService } from "./data";
import { fadeUp } from "./motion";

// Category is purely a presentation grouping for this page — the
// Appointment System's services table has no category concept, so this
// only decides which of these 4 columns a live service's name falls under.
const CATEGORY_ORDER = ["Hair", "Color", "Nails", "Spa"];
const CATEGORY_FOR_SERVICE_NAME: Record<string, string> = {
  "Signature Cut": "Hair",
  "Blowout & Style": "Hair",
  "Keratin Treatment": "Hair",
  "Balayage": "Color",
  "Root Touch-Up": "Color",
  "Full Color": "Color",
  "Gel Manicure": "Nails",
  "Classic Pedicure": "Nails",
  "Scalp Spa Treatment": "Spa",
  "Hand & Foot Spa": "Spa",
};

export default function Services() {
  const [services, setServices] = useState<AppointmentService[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchAppointmentServices()
      .then((data) => {
        if (!cancelled) setServices(data);
      })
      .catch(() => {
        if (!cancelled) setError("Couldn't load services right now.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = CATEGORY_ORDER.map((name) => ({
    name,
    items: (services ?? []).filter((s) => (CATEGORY_FOR_SERVICE_NAME[s.name] ?? "Hair") === name),
  })).filter((cat) => cat.items.length > 0);

  return (
    <section id="services" className="bg-[#141110] px-[8%] py-16 md:py-[110px]">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-16"
      >
        <div className="font-[family-name:var(--font-playfair)] italic text-[18px] text-[#c9a15a] mb-2.5">
          What we offer
        </div>
        <h2 className="font-[family-name:var(--font-cormorant)] font-semibold text-[32px] md:text-[42px] text-[#f8f4ec]">
          Services &amp; Pricing
        </h2>
      </motion.div>

      {error ? (
        <p className="text-center text-[13px] text-[#e08a6b]">{error}</p>
      ) : !services ? (
        <p className="text-center text-[13px] text-[#8a8378]">Loading services…</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-9 max-w-[1280px] mx-auto">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="border-t border-[rgba(201,161,90,0.35)] pt-[22px]"
            >
              <h3 className="font-[family-name:var(--font-cormorant)] font-semibold text-[20px] md:text-[22px] text-[#c9a15a] mb-4">
                {cat.name}
              </h3>
              {cat.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between gap-2.5 mb-3.5 pb-3 border-b border-white/[0.08]"
                >
                  <span className="text-[13.5px] md:text-[14.5px] text-[#e6e1d6] font-light">{item.name}</span>
                  <span className="text-[13.5px] md:text-[14.5px] text-[#c9a15a] font-medium whitespace-nowrap">
                    {formatPeso(item.price)}
                  </span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
