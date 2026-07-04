import type { Metadata } from "next";
import { serif, sans, mono } from "@/components/demo/glyph/fonts";
import CustomCursor from "@/components/demo/glyph/CustomCursor";
import Hero from "@/components/demo/glyph/Hero";
import Manifesto from "@/components/demo/glyph/Manifesto";
import Work from "@/components/demo/glyph/Work";
import Capabilities from "@/components/demo/glyph/Capabilities";
import Process from "@/components/demo/glyph/Process";
import CaseStudy from "@/components/demo/glyph/CaseStudy";
import Quote from "@/components/demo/glyph/Quote";
import Contact from "@/components/demo/glyph/Contact";
import Footer from "@/components/demo/glyph/Footer";

export const metadata: Metadata = {
  title: "Glyph — Creative Direction & Frontend Engineering | Cyberussell Portfolio Concept",
  description: "An award-style personal portfolio concept build by Cyberussell — creative direction, motion design, and Next.js engineering under one roof.",
  robots: { index: false, follow: false },
};

export default function GlyphDemo() {
  return (
    <div className={`${serif.variable} ${sans.variable} ${mono.variable} bg-[#0B0B0E] text-white min-h-screen`}>
      <CustomCursor />
      <Hero />
      <Manifesto />
      <Work />
      <Capabilities />
      <Process />
      <CaseStudy />
      <Quote />
      <Contact />
      <Footer />
    </div>
  );
}
