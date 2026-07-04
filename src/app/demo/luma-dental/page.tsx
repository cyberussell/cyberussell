import type { Metadata } from "next";
import Header from "@/components/demo/luma-dental/Header";
import Hero from "@/components/demo/luma-dental/Hero";
import Stats from "@/components/demo/luma-dental/Stats";
import Services from "@/components/demo/luma-dental/Services";
import WhyUs from "@/components/demo/luma-dental/WhyUs";
import Team from "@/components/demo/luma-dental/Team";
import Testimonials from "@/components/demo/luma-dental/Testimonials";
import Booking from "@/components/demo/luma-dental/Booking";
import FAQ from "@/components/demo/luma-dental/FAQ";
import Footer from "@/components/demo/luma-dental/Footer";

export const metadata: Metadata = {
  title: "Bright Smiles Dental Studio — Web Design Concept by Cyberussell",
  description: "A fictional dental clinic website built as a Cyberussell portfolio concept — modern design with scroll animation.",
  robots: { index: false, follow: false },
};

export default function BrightSmilesDentalDemo() {
  return (
    <div className="bg-[#FAFAF8] text-[#0B1220] min-h-screen">
      <Header />
      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <Team />
      <Testimonials />
      <Booking />
      <FAQ />
      <Footer />
    </div>
  );
}
