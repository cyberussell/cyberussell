import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatGptClaudeProduct from "@/components/ChatGptClaudeProduct";

export const metadata: Metadata = {
  title: "ChatGPT & Claude for Filipinos | Cyberussell",
  description:
    "20-page guide — paano gamitin ang ChatGPT at Claude para kumita online. 10 prompts, 3 earning paths, real income data.",
  alternates: { canonical: "https://www.cyberussell.com/shop/chatgpt-claude" },
  openGraph: {
    title: "ChatGPT & Claude for Filipinos",
    description:
      "20-page guide — 10 prompts, 3 earning paths, real income data mula sa PSA at DOLE.",
    url: "https://www.cyberussell.com/shop/chatgpt-claude",
    siteName: "Cyberussell",
    images: [{ url: "/og/og-shop.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT & Claude for Filipinos",
    description:
      "20-page guide — 10 prompts, 3 earning paths, real income data mula sa PSA at DOLE.",
    images: ["/og/og-shop.jpg"],
  },
};

export default function ChatGptClaudePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] px-6 md:px-10 py-10 pb-24 max-w-4xl mx-auto">
        <ChatGptClaudeProduct />
      </main>
      <Footer />
    </>
  );
}
