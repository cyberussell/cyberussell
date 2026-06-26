import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownloadContent from "@/components/DownloadContent";

export const metadata: Metadata = {
  title: "Download Your Purchase | Cyberussell",
  robots: { index: false, follow: false },
};

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 md:px-10 py-10 pb-24 max-w-7xl mx-auto flex items-center justify-center">
        <DownloadContent />
      </main>
      <Footer />
    </>
  );
}
