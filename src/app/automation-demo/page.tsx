import type { Metadata } from "next";
import ScrollProgressBar from "@/components/automation-demo/ScrollProgressBar";
import Nav from "@/components/automation-demo/Nav";
import Hero from "@/components/automation-demo/Hero";
import Problem from "@/components/automation-demo/Problem";
import LiveDemo from "@/components/automation-demo/LiveDemo";
import HowItWorks from "@/components/automation-demo/HowItWorks";
import TechStack from "@/components/automation-demo/TechStack";
import AboutContact from "@/components/automation-demo/AboutContact";

export const metadata: Metadata = {
  title: "Lead Follow-Up Agent — Cyberussell",
  description:
    "A real, connected automation: an AI agent that drafts an email with Claude, sends it via Gmail, books a calendar follow-up, and logs the lead to Google Drive — live, not mocked.",
  alternates: { canonical: "https://www.cyberussell.com/automation-demo" },
  openGraph: {
    title: "Lead Follow-Up Agent — Cyberussell",
    description: "Drafts, sends, schedules and logs a lead follow-up — live, through your own connected Google account.",
    url: "https://www.cyberussell.com/automation-demo",
  },
};

export default function AutomationDemoPage() {
  return (
    <div className="min-h-screen bg-[#0A0E17] text-[#E7EAF2] overflow-x-hidden">
      <ScrollProgressBar />
      <Nav />
      <Hero />
      <Problem />
      <LiveDemo />
      <HowItWorks />
      <TechStack />
      <AboutContact />
    </div>
  );
}
