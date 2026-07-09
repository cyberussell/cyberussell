import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/marketing/Hero";
import OurProcess from "@/components/marketing/OurProcess";
import FeaturedProjects from "@/components/marketing/FeaturedProjects";
import Pricing from "@/components/marketing/Pricing";
import PricingPromoBanner from "@/components/marketing/PricingPromoBanner";
import FAQ from "@/components/marketing/FAQ";
import FinalCTA from "@/components/marketing/FinalCTA";

export const metadata: Metadata = {
  title: "Build With Us — Cyberussell",
  description:
    "Websites, AI automation, mobile apps, and technology consulting for business owners who want a trusted long-term technology partner.",
  alternates: { canonical: "https://www.cyberussell.com/build-with-us" },
  openGraph: {
    title: "Build With Us — Cyberussell",
    description:
      "Websites, AI automation, mobile apps, and technology consulting for business owners who want a trusted long-term technology partner.",
  },
};

export default function BuildWithUsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#07070B]">
        <Hero />
        <FeaturedProjects />
        <OurProcess />
        <Pricing />
        <PricingPromoBanner />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
