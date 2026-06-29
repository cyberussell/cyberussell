import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Downloads from "@/components/Downloads";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Free Resources — Cyberussell",
  description: "Free guides, tools, and worksheets for Filipinos who want to earn online. No sign-up. No payment. Just use them.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0F0F1A] min-h-screen pt-8 md:pt-12">
        <Downloads />
      </main>
      <Footer />
    </>
  );
}
