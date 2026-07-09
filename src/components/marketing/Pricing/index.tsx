import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "./pricingPlans.data";
import ComparisonTable from "./ComparisonTable";

export default function Pricing() {
  return (
    <section className="bg-[#0B0E1C] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="mb-4 block font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[2.5px] text-[#FF7A1A]">
            Pricing &amp; Engagement
          </span>
          <h2 className="mb-4 font-sans text-[28px] font-bold leading-tight tracking-tight text-white md:text-[40px]">
            Choose the Right Solution for Your Business
          </h2>
          <p className="font-[family-name:var(--font-inter)] text-[16px] leading-[1.8] text-white/60 md:text-[17px]">
            Whether you&apos;re launching your first business website or building a complete
            business platform, we create scalable solutions designed to grow with you. Choose the
            option that matches your current stage, knowing you can always expand as your
            business evolves.
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-8">
          {PRICING_PLANS.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.id}
                className={`relative flex h-full flex-col rounded-2xl border p-8 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-1 ${
                  plan.highlighted
                    ? "border-[#FF7A1A]/50 bg-gradient-to-b from-[#FF7A1A]/[0.08] to-white/[0.02]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20"
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#FF7A1A] px-4 py-1 font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase tracking-[1px] text-[#07070B]">
                    {plan.badge}
                  </span>
                )}

                <Icon className="h-9 w-9 text-[#FF7A1A]" strokeWidth={1.5} />

                <h3 className="mt-4 font-sans text-[22px] font-extrabold text-white">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="mt-2 font-[family-name:var(--font-inter)] text-[13px] leading-[1.6] text-white/55">
                    {plan.description}
                  </p>
                )}

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="font-sans text-[34px] font-extrabold leading-none text-white">
                    {plan.price}
                  </span>
                  {plan.priceSuffix && (
                    <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/50">
                      {plan.priceSuffix}
                    </span>
                  )}
                </div>
                {plan.priceSubtext && (
                  <p className="mt-1.5 font-[family-name:var(--font-inter)] text-[13px] text-white/50">
                    {plan.priceSubtext}
                  </p>
                )}

                <div className="my-6 h-px bg-white/10" />

                {plan.featuresIntro && (
                  <p className="mb-3 font-[family-name:var(--font-inter)] text-[13px] font-bold text-white/70">
                    {plan.featuresIntro}
                  </p>
                )}
                <ul className="flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 font-[family-name:var(--font-inter)] text-[14px] leading-[1.4] text-white/70"
                    >
                      <Check size={16} className="mt-0.5 shrink-0 text-[#FF7A1A]" strokeWidth={2.5} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`mt-8 flex min-h-[48px] w-full items-center justify-center rounded-xl px-6 font-[family-name:var(--font-inter)] text-[15px] font-bold transition-all duration-300 ease-out hover:-translate-y-0.5 ${
                    plan.highlighted
                      ? "bg-[#FF7A1A] text-[#07070B] hover:bg-[#FF8C3D]"
                      : "border border-white/15 bg-white/[0.05] text-white hover:border-white/30 hover:bg-white/[0.09]"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        <ComparisonTable />

        <p className="mx-auto mt-6 max-w-3xl text-center font-[family-name:var(--font-inter)] text-[13px] italic leading-[1.7] text-white/45">
          *After the first year: Your website remains yours. All the codes and access will be
          given to you during the deployment. To keep it online, you&apos;ll only need to renew
          your domain name and web hosting annually. We can handle the renewal for you or
          transfer everything to your own accounts upon request. Or you may want to avail our
          reduced and very affordable monthly price for managing your website.
        </p>
      </div>
    </section>
  );
}
