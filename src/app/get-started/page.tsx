import type { Metadata } from "next";
import Footer from "@/components/Footer";
import GetStartedNav from "@/components/get-started/GetStartedNav";
import GetStartedHero from "@/components/get-started/GetStartedHero";
import ProblemsSection from "@/components/get-started/ProblemsSection";
import SolutionsSection from "@/components/get-started/SolutionsSection";
import ProcessSection from "@/components/get-started/ProcessSection";
import WhyCyberussellSection from "@/components/get-started/WhyCyberussellSection";
import AuditSection from "@/components/get-started/AuditSection";
import GetStartedFAQ from "@/components/get-started/GetStartedFAQ";
import GetStartedFinalCTA from "@/components/get-started/GetStartedFinalCTA";

const TITLE = "Get Started — AI, Automation & Websites for Your Business | Cyberussell";
const DESCRIPTION =
  "Practical AI consulting, automation, and modern websites for small businesses and professionals. Book a free consultation or get a free AI business audit.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "https://www.cyberussell.com/get-started" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "https://www.cyberussell.com/get-started",
    siteName: "Cyberussell",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function GetStartedPage() {
  return (
    <>
      <style>{`
        .reveal { opacity: 0; animation: get-started-reveal 0.7s ease-out forwards; }
        .reveal-delay-2 { animation-delay: 0.15s; }
        @keyframes get-started-reveal {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .reveal { animation: none; opacity: 1; }
        }
      `}</style>

      <GetStartedNav />
      <main>
        <GetStartedHero />
        <ProblemsSection />
        <SolutionsSection />
        <ProcessSection />
        <WhyCyberussellSection />
        <AuditSection />
        <GetStartedFAQ />
        <GetStartedFinalCTA />
      </main>
      <Footer />
    </>
  );
}
