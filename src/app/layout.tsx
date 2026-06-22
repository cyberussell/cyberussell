import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cyberussell — Your Skills. Your Income.",
  description:
    "Data-backed guides for Filipinos who want to earn online. Free. No email. No payment.",
  metadataBase: new URL("https://www.cyberussell.com"),
  openGraph: {
    title: "Cyberussell — Your Skills. Your Income.",
    description:
      "Data-backed guides for Filipinos who want to earn online. Free. No email. No payment.",
    url: "https://www.cyberussell.com",
    siteName: "Cyberussell",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Cyberussell — Your Skills. Your Income.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cyberussell — Your Skills. Your Income.",
    description:
      "Data-backed guides for Filipinos who want to earn online. Free. No email. No payment.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tl"
      className={`${syne.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[#0F0F1A] text-white antialiased overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
