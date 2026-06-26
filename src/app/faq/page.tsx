import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FaqAccordion from "@/components/FaqAccordion";

export const metadata: Metadata = {
  title: "FAQ — Cyberussell",
  description:
    "Mga honest na sagot tungkol sa online earning, freelancing, at passive income para sa mga Pilipino.",
  openGraph: {
    title: "Real Talk: Online Earning FAQ — Cyberussell",
    description:
      "Walang hype. Walang pa-flex. Puro totoo lang. 11 honest na sagot para sa mga Pilipinong curious sa online earning.",
    url: "https://www.cyberussell.com/faq",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-faq.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Talk: Online Earning FAQ — Cyberussell",
    description:
      "Walang hype. Walang pa-flex. Puro totoo lang. 11 honest na sagot para sa mga Pilipinong curious sa online earning.",
    images: ["/og/og-faq.jpg"],
  },
};

export default function FaqPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-white text-[28px] md:text-[36px] font-bold mb-3">
            Real Talk: Online Earning FAQ
          </h1>
          <p className="text-white/50 text-[15px] md:text-[17px] max-w-md mx-auto leading-relaxed">
            Walang hype. Walang pa-flex. Puro totoo lang.
          </p>
        </div>
        <FaqAccordion />
      </main>
      <Footer />
    </>
  );
}
