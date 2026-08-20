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

      <section className="bg-white px-6 py-14 md:py-16 text-center">
        <div className="max-w-lg mx-auto">
          <h2 className="font-sans font-black text-[22px] md:text-[24px] text-[#14181F] mb-3">Ready to Track a Real Order?</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.7] text-[#14181F]/60 mb-7">
            This page is powered by the real Laundry Management System that runs behind sites like this one — enter your order number and
            phone number to look up an actual order.
          </p>
          <a
            href="/lms/track"
            className="inline-flex items-center gap-2 bg-[#14181F] text-white font-[family-name:var(--font-inter)] font-bold text-[14px] py-3.5 px-7 rounded-full hover:opacity-90 transition-all"
          >
            Open Order Lookup <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
