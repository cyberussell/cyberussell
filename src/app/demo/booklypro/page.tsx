import type { Metadata } from "next";
import Header from "@/components/demo/booklypro/Header";
import Hero from "@/components/demo/booklypro/Hero";
import ProblemSolution from "@/components/demo/booklypro/ProblemSolution";
import UserTypes from "@/components/demo/booklypro/UserTypes";
import Onboarding from "@/components/demo/booklypro/Onboarding";
import BookingJourney from "@/components/demo/booklypro/BookingJourney";
import Dashboard from "@/components/demo/booklypro/Dashboard";
import MobileExperience from "@/components/demo/booklypro/MobileExperience";
import DatabaseArchitecture from "@/components/demo/booklypro/DatabaseArchitecture";
import Features from "@/components/demo/booklypro/Features";
import Roadmap from "@/components/demo/booklypro/Roadmap";
import Highlights from "@/components/demo/booklypro/Highlights";
import Footer from "@/components/demo/booklypro/Footer";

export const metadata: Metadata = {
  title: "BooklyPro — Appointment Scheduling SaaS Concept by Cyberussell",
  description:
    "A fictional appointment scheduling SaaS concept for doctors, dentists, and lawyers — built as a Cyberussell portfolio piece to demonstrate modern UX and full-stack design.",
  robots: { index: false, follow: false },
};

export default function BooklyProDemo() {
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
