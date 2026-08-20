import type { Metadata } from "next";
import Header from "@/components/demo/laundryflow/Header";
import Footer from "@/components/demo/laundryflow/Footer";
import BookingFlow from "@/components/demo/laundryflow/BookingFlow";

export const metadata: Metadata = {
  title: "Book a Pickup — Aling Maria Laundry Shop",
  description: "Schedule a doorstep laundry pickup in 3 quick steps. A Cyberussell portfolio concept demonstrating premium business website design.",
  robots: { index: false, follow: false },
};

export default function BookAPickupPage() {
  return (
    <div className="bg-[#FFF8E1] min-h-screen">
      <Header />
      <BookingFlow />
      <Footer />
    </div>
  );
}
