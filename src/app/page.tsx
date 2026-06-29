import WelcomeBanner from "@/components/WelcomeBanner";
import StickyBottomBar from "@/components/StickyBottomBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ChoosePath from "@/components/ChoosePath";
import Downloads from "@/components/Downloads";
import AboutStory from "@/components/AboutStory";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <>
      <WelcomeBanner />
      <Navbar />
      <Hero />
      <ChoosePath />
      <Downloads />
      <AboutStory />
      <Footer />
      <StickyBottomBar />
    </>
  );
}
