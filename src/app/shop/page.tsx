import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Shop from "@/components/Shop";

export const metadata: Metadata = {
  title: "Shop — eBooks & Digital Products | Cyberussell",
  description:
    "eBooks, templates, and digital products para sa Filipino freelancers at small businesses. May free downloads din.",
  alternates: { canonical: "https://www.cyberussell.com/shop" },
  openGraph: {
    title: "Shop — eBooks & Digital Products",
    description:
      "eBooks, templates, and guides for Filipino freelancers. Free and paid downloads.",
    url: "https://www.cyberussell.com/shop",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-shop.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop — eBooks & Digital Products",
    description:
      "eBooks, templates, and guides for Filipino freelancers. Free and paid downloads.",
    images: ["/og/og-shop.jpg"],
  },
};

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="text-[#E8373A] font-[family-name:var(--font-inter)] text-[10px] font-bold tracking-[2.5px] uppercase mb-4">
            DIGITAL PRODUCTS
          </div>
          <h1 className="font-sans text-[28px] md:text-[36px] font-bold text-white leading-tight mb-3">
            eBooks & Templates
          </h1>
          <p className="text-white/45 text-[15px] md:text-[16px] max-w-lg leading-relaxed font-[family-name:var(--font-inter)]">
            Guides and templates to help you earn more online. Some are free —
            the rest are priced para accessible sa lahat.
          </p>
        </div>
        <Shop />
      </main>
      <Footer />
    </>
  );
}
