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
      <main className="min-h-[70vh] bg-[#0F0F1A]">
        <section className="px-6 md:px-10 pt-20 pb-12 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#E8373A]/10 border border-[#E8373A]/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E8373A] animate-pulse" />
            <span className="text-[#E8373A] text-[11px] font-bold uppercase tracking-[2px] font-[family-name:var(--font-inter)]">
              Shop
            </span>
          </div>
          <h1 className="font-sans text-[40px] md:text-[58px] font-bold text-white mb-5 leading-tight">
            eBooks & Templates for{" "}
            <span className="text-[#FFD23F]">Filipinos</span>
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] md:text-[18px] text-white/55 max-w-xl mx-auto leading-[1.8]">
            Guides and templates to help you earn more online. Some are free —
            the rest are priced para accessible sa lahat.
          </p>
        </section>
        <div className="px-6 md:px-10 pb-24 max-w-7xl mx-auto">
          <Shop />
        </div>
      </main>
      <Footer />
    </>
  );
}
