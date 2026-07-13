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

// Kept in sync with FAQ.tsx's FAQS content — duplicated here (not imported)
// because FAQ.tsx is a client component, which turns named exports into
// opaque client references when imported into this server component.
const FAQS = [
  { q: "Is the subscription per branch?", a: "Yes. Each physical laundry branch requires its own subscription." },
  { q: "Is hosting included?", a: "Yes. Hosting, SSL, maintenance, and system updates are included." },
  { q: "Do customers need to install an app?", a: "No. Customers simply book online and receive a QR Code." },
  { q: "Can staff use mobile phones?", a: "Yes. The system is fully responsive and works on phones, tablets, and desktops." },
  { q: "How are monthly change requests handled?", a: "Change requests cover minor website and system updates. Larger feature requests are quoted separately." },
  { q: "Why isn't this a free app?", a: "Free laundry apps are usually generic templates with no dedicated support. Your subscription includes a professional website, hosting, ongoing maintenance, and monthly change requests — a real system built and supported for your business, not a shared app." },
];

export const metadata: Metadata = {
  title: "Laundry Management System | Cyberussell",
  description:
    "Everything your laundry business needs in one place — online bookings, QR check-ins, order tracking, and monthly sales reports. Starting at ₱399/month per branch.",
  alternates: { canonical: "https://www.cyberussell.com/lms" },
  openGraph: {
    title: "Laundry Management System | Cyberussell",
    description:
      "Professional website + simple laundry management system for small and growing laundry businesses in the Philippines.",
    url: "https://www.cyberussell.com/lms",
    siteName: "Cyberussell",
    type: "website",
    images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundry Management System | Cyberussell",
    description:
      "Everything your laundry business needs in one place — online bookings, QR check-ins, order tracking, and monthly sales reports.",
    images: ["/og-image.jpg?v=2"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      name: "Cyberussell Laundry Management System",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.cyberussell.com/lms",
      description:
        "Multi-tenant laundry business management system: online bookings, QR check-ins, order tracking, and monthly sales reports for laundry shops in the Philippines.",
      offers: [
        { "@type": "Offer", name: "Essential plan", price: "399", priceCurrency: "PHP" },
        { "@type": "Offer", name: "Professional plan", price: "699", priceCurrency: "PHP" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function LaundryManagementSystemPage() {
  return (
    <MouseAtmosphereProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
