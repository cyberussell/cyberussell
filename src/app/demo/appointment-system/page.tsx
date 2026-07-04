import type { Metadata } from "next";
import Header from "@/components/demo/appointment-system/Header";
import Hero from "@/components/demo/appointment-system/Hero";
import ProblemSolution from "@/components/demo/appointment-system/ProblemSolution";
import UserTypes from "@/components/demo/appointment-system/UserTypes";
import Onboarding from "@/components/demo/appointment-system/Onboarding";
import BookingJourney from "@/components/demo/appointment-system/BookingJourney";
import Dashboard from "@/components/demo/appointment-system/Dashboard";
import MobileExperience from "@/components/demo/appointment-system/MobileExperience";
import DatabaseArchitecture from "@/components/demo/appointment-system/DatabaseArchitecture";
import Features from "@/components/demo/appointment-system/Features";
import Roadmap from "@/components/demo/appointment-system/Roadmap";
import Highlights from "@/components/demo/appointment-system/Highlights";
import Footer from "@/components/demo/appointment-system/Footer";

export const metadata: Metadata = {
  title: "Appointment System — Scheduling SaaS Concept by Cyberussell",
  description:
    "A fictional appointment scheduling SaaS concept for doctors, dentists, and lawyers — built as a Cyberussell portfolio piece to demonstrate modern UX and full-stack design.",
  robots: { index: false, follow: false },
};

export default function AppointmentSystemDemo() {
  return (
    <div className="bg-[#FAFBFF] text-[#0B1220] min-h-screen">
      <Header />
      <Hero />
      <ProblemSolution />
      <UserTypes />
      <Onboarding />
      <BookingJourney />
      <Dashboard />
      <MobileExperience />
      <DatabaseArchitecture />
      <Features />
      <Roadmap />
      <Highlights />
      <Footer />
    </div>
  );
}
