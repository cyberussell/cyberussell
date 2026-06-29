import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Downloads from "@/components/Downloads";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Recommended For You — Cyberussell",
  description: "Guides, tools, and worksheets recommended for Filipinos who want to earn online. All free. No sign-up required.",
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
