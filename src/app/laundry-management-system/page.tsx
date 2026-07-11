import type { Metadata } from "next";
import Footer from "@/components/Footer";
import AtmosphereBackground, { MouseAtmosphereProvider } from "@/components/laundry-management-system/Atmosphere";
import LandingNav from "@/components/laundry-management-system/LandingNav";
import Hero from "@/components/laundry-management-system/Hero";
import Features from "@/components/laundry-management-system/Features";
import HowItWorks from "@/components/laundry-management-system/HowItWorks";
import Pricing from "@/components/laundry-management-system/Pricing";
import ChangeRequests from "@/components/laundry-management-system/ChangeRequests";
import FAQ from "@/components/laundry-management-system/FAQ";
import FinalCTA from "@/components/laundry-management-system/FinalCTA";

export const metadata: Metadata = {
  title: "Laundry Management System | Cyberussell",
  description:
    "Everything your laundry business needs in one place — online bookings, QR check-ins, order tracking, and monthly sales reports. Starting at ₱399/month per branch.",
  alternates: { canonical: "https://www.cyberussell.com/laundry-management-system" },
  openGraph: {
    title: "Laundry Management System | Cyberussell",
    description:
      "Professional website + simple laundry management system for small and growing laundry businesses in the Philippines.",
    url: "https://www.cyberussell.com/laundry-management-system",
    siteName: "Cyberussell",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry Management System | Cyberussell",
    description:
      "Everything your laundry business needs in one place — online bookings, QR check-ins, order tracking, and monthly sales reports.",
  },
};

export default function LaundryManagementSystemPage() {
  return (
    <MouseAtmosphereProvider>
      <AtmosphereBackground />
      <LandingNav />
      <main className="relative min-h-screen">
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <ChangeRequests />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </MouseAtmosphereProvider>
  );
}
