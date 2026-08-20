import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Header from "@/components/demo/laundryflow/Header";
import Footer from "@/components/demo/laundryflow/Footer";
import OrderTracking from "@/components/demo/laundryflow/OrderTracking";

export const metadata: Metadata = {
  title: "Track Your Order — Aling Maria Laundry Shop",
  description: "Check the status of your laundry order anytime — no calls, no guessing. A Cyberussell portfolio concept demonstrating premium business website design.",
  robots: { index: false, follow: false },
};

export default function TrackOrderPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <OrderTracking />

      <section className="bg-white px-6 py-10 text-center">
        <a
          href="/lms/track"
          className="inline-flex items-center gap-2 font-[family-name:var(--font-inter)] font-bold text-[13.5px] text-[#14181F]/60 hover:text-[#14181F] transition-colors"
        >
          Prefer the full order-lookup page? Open it here <ArrowRight size={14} />
        </a>
      </section>

      <Footer />
    </div>
  );
}
