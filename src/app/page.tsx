import WelcomeBanner from "@/components/WelcomeBanner";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PainSection from "@/components/PainSection";
import Infographic from "@/components/Infographic";
import SkillFinder from "@/components/SkillFinder";
import Downloads from "@/components/Downloads";
import AboutStory from "@/components/AboutStory";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <WelcomeBanner />
      <Navbar />
      <Hero />
      <PainSection />
      <Infographic />
      <SkillFinder />
      <Downloads />
      <AboutStory />
      <FinalCTA />
      <Footer />
      <StickyBottomBar />
    </>
  );
}
