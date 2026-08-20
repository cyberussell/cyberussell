import type { Metadata } from "next";
import Header from "@/components/demo/laundryflow/Header";
import Footer from "@/components/demo/laundryflow/Footer";
import BuildOrder from "@/components/demo/laundryflow/BuildOrder";

export const metadata: Metadata = {
  title: "Build Your Order — Aling Maria Laundry Shop",
  description: "Pick your services and quantities from our real, live price list, then schedule a pickup. A Cyberussell portfolio concept demonstrating premium business website design.",
  robots: { index: false, follow: false },
};

export default function BuildOrderPage() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <BuildOrder />
      <Footer />
    </div>
  );
}
