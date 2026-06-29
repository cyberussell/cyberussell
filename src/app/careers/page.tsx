import { getAllCareers } from "@/lib/careers/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Blueprints — Cyberussell",
  description: "Step-by-step blueprints for Filipinos to start earning online. Pick a skill and follow the roadmap.",
};

const CATEGORY_LABEL: Record<string, string> = {
  creative: "Creative",
  technical: "Technical",
  service: "Service",
  teaching: "Teaching",
  selling: "Selling",
  content: "Content",
  trades: "Trades",
  admin: "Admin",
};

export default function CareersIndex() {
  const careers = getAllCareers();

  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] min-h-screen pt-12 md:pt-20 pb-16 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <span className="block text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[2.5px] mb-4">
            Career Blueprints
          </span>
          <h1 className="font-sans text-[32px] md:text-[48px] font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            Pick a skill. Get your blueprint.
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/55 max-w-[560px] leading-[1.7] mb-6">
            Each blueprint is a complete step-by-step plan — from zero to earning online. No fluff. Just decisions, actions, and resources.
          </p>
          <a
            href="/discover"
            className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] text-[13px] font-medium text-[#FFD23F]/70 hover:text-[#FFD23F] transition-colors mb-12"
          >
            Not sure which skill to choose? Discover your best match →
          </a>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {careers.map((career) => (
              <a
                key={career.slug}
                href={`/careers/${career.slug}`}
                className="group bg-[#18181F] border border-white/[0.08] rounded-xl p-6 flex flex-col gap-3 hover:border-[#FFD23F]/30 hover:-translate-y-[2px] transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <h2 className="font-sans text-[18px] font-bold text-white group-hover:text-[#FFD23F] transition-colors">
                    {career.skill}
                  </h2>
                  <span className="font-[family-name:var(--font-inter)] text-[10px] font-bold uppercase tracking-[0.05em] text-white/30 bg-white/[0.04] border border-white/[0.08] px-2 py-0.5 rounded-full">
                    {CATEGORY_LABEL[career.category] ?? career.category}
                  </span>
                </div>
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 leading-[1.6] flex-grow">
                  {career.tagline}
                </p>
                <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 uppercase tracking-[0.5px]">Potential monthly earning</span>
                    <span className="font-sans text-[14px] font-bold text-[#00C97A]">
                      ₱{career.earning_range.min.toLocaleString()}–₱{career.earning_range.max.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-[family-name:var(--font-inter)] text-[10px] text-white/25 uppercase tracking-[0.5px]">First income in</span>
                    <span className="font-[family-name:var(--font-inter)] text-[12px] text-white/40 font-medium">
                      {career.time_to_first_income}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
