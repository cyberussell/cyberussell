import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FreelancerKitProduct from "@/components/FreelancerKitProduct";

export const metadata: Metadata = {
  title: "Freelancer Starter Kit — Complete Edition | Cyberussell",
  description:
    "11 ready-to-use files para sa Filipino beginners na gustong kumita online — mula sa setup hanggang sa unang kliyente at unang bayad.",
  alternates: { canonical: "https://www.cyberussell.com/shop/freelancer-kit" },
  openGraph: {
    title: "Freelancer Starter Kit — Complete Edition",
    description:
      "11 ready-to-use files para sa Filipino beginners na gustong kumita online.",
    url: "https://www.cyberussell.com/shop/freelancer-kit",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-shop.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelancer Starter Kit — Complete Edition",
    description:
      "11 ready-to-use files para sa Filipino beginners na gustong kumita online.",
    images: ["/og/og-shop.jpg"],
  },
};

export default function FreelancerKitPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 md:px-10 py-10 pb-24 max-w-4xl mx-auto">
        <FreelancerKitProduct />
      </main>
      <Footer />
    </>
  );
}
