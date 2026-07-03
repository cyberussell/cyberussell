import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TypingPracticeShell from "@/components/TypingPracticeShell";

export const metadata: Metadata = {
  title: "Typing Practice — Free Typing Speed Test with Keyboard | Cyberussell",
  description: "Practice typing with a full interactive keyboard. Track your WPM, accuracy, and time. Free, no sign-up required.",
  alternates: { canonical: "https://www.cyberussell.com/tools/typing-practice" },
  openGraph: {
    title: "Typing Practice — Free Typing Speed Test | Cyberussell",
    description: "Practice typing with a full interactive keyboard. Track WPM, accuracy, and time. Free.",
    url: "https://www.cyberussell.com/tools/typing-practice",
    siteName: "Cyberussell",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Typing Practice — Free Typing Speed Test | Cyberussell",
    description: "Practice typing with a full interactive keyboard. Track WPM, accuracy, and time.",
  },
};

export default function TypingPracticePage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@500&display=swap" rel="stylesheet" />
      <Navbar />
      <TypingPracticeShell />
      <Footer />
    </>
  );
}
