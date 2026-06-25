import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free AI & Business Tools — Cyberussell",
  description:
    "Free tools to help Filipino freelancers and small businesses earn more online. Coming soon.",
};

export default function ToolsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
        <span className="text-[48px] mb-4">🛠️</span>
        <h1 className="text-white text-[28px] md:text-[36px] font-bold mb-3">
          Tools are coming soon
        </h1>
        <p className="text-white/50 text-[15px] md:text-[17px] max-w-md leading-relaxed">
          Free AI-powered tools to help you earn more, work smarter, and grow your business. Stay tuned.
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
