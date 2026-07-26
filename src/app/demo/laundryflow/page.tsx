import type { Metadata } from "next";
import Header from "@/components/demo/laundryflow/Header";
import Hero from "@/components/demo/laundryflow/Hero";
import Pricing from "@/components/demo/laundryflow/Pricing";
import Gallery from "@/components/demo/laundryflow/Gallery";
import Location from "@/components/demo/laundryflow/Location";
import PlansComparison from "@/components/demo/laundryflow/PlansComparison";
import Footer from "@/components/demo/laundryflow/Footer";

export const metadata: Metadata = {
  title: "Aling Maria Laundry Shop — Fresh Clothes, Professional Care",
  description: "Professional laundry pickup, wash, and delivery service. A Cyberussell portfolio concept demonstrating premium business website design.",
  robots: { index: false, follow: false },
};

export default function LaundryFlowDemo() {
  return (
    <div className="bg-[#2563EB] min-h-screen">
      <Header />
      <Hero />
      <Pricing />
      <Gallery />
      <Location />
      <Footer />
      <PlansComparison />
    </div>
  );
}
