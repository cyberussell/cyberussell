import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "FAQ — Cyberussell",
  description:
    "Frequently asked questions about earning online as a Filipino. Coming soon.",
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <span className="text-[48px] mb-4">❓</span>
        <h1 className="text-white text-[28px] md:text-[36px] font-bold mb-3">
          FAQ coming soon
        </h1>
        <p className="text-white/50 text-[15px] md:text-[17px] max-w-md leading-relaxed">
          Got questions about freelancing, AI tools, or earning online? We&apos;re putting together answers to the most common ones.
        </p>
        <a
          href="/"
          className="mt-8 bg-[#E8373A] text-white text-[13px] font-bold font-[family-name:var(--font-inter)] tracking-[0.05em] px-[24px] py-[10px] rounded-[6px] hover:opacity-90 transition-all"
        >
          Back to Home
        </a>
      </main>
      <Footer />
    </>
  );
}
