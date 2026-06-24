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
import SubscribeForm from "@/components/SubscribeForm";

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
      <section className="bg-[#0F0F1A] px-6 py-16">
        <div className="max-w-xl mx-auto">
          <SubscribeForm />
        </div>
      </section>
      <FinalCTA />
      <Footer />
      <StickyBottomBar />
    </>
  );
}
