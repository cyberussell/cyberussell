import Link from "next/link";
import { Check } from "lucide-react";
import Starburst from "./Starburst";

const FEATURES = [
  "Professional one-page website",
  "Mobile responsive",
  "Contact information",
  "Google Maps",
  "Social media links",
  "Basic SEO",
  "Contact form",
  "Fast deployment",
];

export default function PricingPromoBanner() {
  return (
    <section className="bg-[#07070B] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-[#FF7A1A]/20 bg-gradient-to-b from-white/[0.05] to-white/[0.01] p-8 backdrop-blur-xl md:p-12">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <span className="mb-4 block font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] text-[#FF7A1A]">
              Simple &amp; Affordable
            </span>
            <h2 className="mb-4 font-sans text-[26px] font-bold leading-tight text-white md:text-[34px]">
              Just Need an Online Presence?
            </h2>
            <p className="mb-6 max-w-md font-[family-name:var(--font-inter)] text-[15px] leading-[1.8] text-white/60">
              Not every business needs a full business platform. If you&apos;re simply looking to
              establish a professional online presence, we&apos;ve got you covered.
            </p>

            <ul className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FEATURES.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13.5px] text-white/70"
                >
                  <Check size={14} className="shrink-0 text-[#FF7A1A]" strokeWidth={2.5} />
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/services/inquire?service=Online%20Presence%20Package"
              className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#FF7A1A] px-8 font-[family-name:var(--font-inter)] text-[15px] font-bold text-[#07070B] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#FF8C3D]"
              style={{ boxShadow: "0 8px 30px rgba(255,122,26,0.2)" }}
            >
              Launch My Website
            </Link>
          </div>

          <Starburst />
        </div>
      </div>
    </section>
  );
}
