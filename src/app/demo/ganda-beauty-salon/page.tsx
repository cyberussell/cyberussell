import type { Metadata } from "next";
import Header from "@/components/demo/ganda-beauty-salon/Header";
import Hero from "@/components/demo/ganda-beauty-salon/Hero";
import About from "@/components/demo/ganda-beauty-salon/About";
import Services from "@/components/demo/ganda-beauty-salon/Services";
import Stylists from "@/components/demo/ganda-beauty-salon/Stylists";
import Booking from "@/components/demo/ganda-beauty-salon/Booking";
import Gallery from "@/components/demo/ganda-beauty-salon/Gallery";
import Testimonials from "@/components/demo/ganda-beauty-salon/Testimonials";
import Footer from "@/components/demo/ganda-beauty-salon/Footer";

export const metadata: Metadata = {
  title: "Ganda Beauty Salon — Salon Booking Website Concept by Cyberussell",
  description:
    "A fictional Filipino hair and beauty salon website built as a Cyberussell portfolio concept — editorial luxury design with appointment-system booking integration.",
  robots: { index: false, follow: false },
};

export default function GandaBeautySalonDemo() {
  return (
    <div className="bg-[#f6f1e9] text-[#241f1a] min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Stylists />
      <Booking />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  );
}
