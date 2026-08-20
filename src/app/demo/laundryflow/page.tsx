import type { Metadata } from "next";
import Header from "@/components/demo/laundryflow/Header";
import Hero from "@/components/demo/laundryflow/Hero";
import TrustStrip from "@/components/demo/laundryflow/TrustStrip";
import Services from "@/components/demo/laundryflow/Services";
import Satisfaction from "@/components/demo/laundryflow/Satisfaction";
import ContactBooking from "@/components/demo/laundryflow/ContactBooking";
import Footer from "@/components/demo/laundryflow/Footer";

export const metadata: Metadata = {
  title: "Aling Maria Laundry Shop — Fresh Clothes, Professional Care",
  description: "Professional laundry pickup, wash, and delivery service. A Cyberussell portfolio concept demonstrating premium business website design.",
  robots: { index: false, follow: false },
};

export default function LaundryFlowDemo() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
      <Hero />
      <TrustStrip />
      <Services />
      <Satisfaction />
      <ContactBooking />
      <Footer />
    </div>
  );
}
