import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
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
  verification: {
    google: "EeWYrcWq_5hFEPsOIR1Ga9yFadyNIocLdAPJsmc6JJA",
  },
  title: "Cyberussell — Your Skills. Your Income.",
  description:
    "Data-backed guides for Filipinos who want to earn online. Free. No email. No payment.",
  metadataBase: new URL("https://www.cyberussell.com"),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  facebook: {
    appId: "1580424853524034",
  },
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
      <head>
        <GoogleAnalytics gaId="G-MY6KY7VPJ9" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Can I earn money online in the Philippines without experience?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Many online jobs in the Philippines like virtual assistant work, affiliate marketing, and online selling require no prior experience — just your existing skills and a smartphone or laptop."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much can a Filipino earn online per month?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Filipino freelancers typically earn ₱5,000–₱20,000/month as beginners. With 6–12 months of experience, earning ₱30,000–₱80,000/month is realistic for online jobs in design, writing, or tech."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What skills do I need to earn money online in the Philippines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Any skill can earn online — cooking, Canva design, writing, phone repair, teaching English, and video editing are all in demand. Use the free Skill Finder on Cyberussell to match your skill to an income path."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is it possible to earn online from the province in the Philippines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Filipinos from Isabela, Cagayan Valley, Mindanao, and other provinces earn online full-time. All you need is a smartphone or laptop and a stable internet connection."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How do I receive online earnings in the Philippines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Most freelancing platforms pay via GCash, PayPal, Payoneer, or direct bank transfer — all widely available across the Philippines including rural areas."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the easiest online job for beginners in the Philippines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Virtual assistant work and online selling via Shopee or Facebook Marketplace are the most beginner-friendly online jobs for Filipinos — low barrier to entry and high demand from international clients."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How long does it take to start earning online in the Philippines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Online selling and affiliate marketing can generate income within the first week. Freelancing on platforms like Upwork or OnlineJobs.ph typically takes 2–8 weeks to land the first client."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How can Cyberussell help me earn online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Cyberussell provides free, data-backed guides and tools to help Filipinos find the right online income path. Use the AI-powered Skill Finder to discover how to earn from what you already know, download free PDF guides, and explore the best platforms for Filipino freelancers — all in one place."
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0F0F1A] text-white antialiased overflow-x-hidden">
        {children}
        <Analytics />
        <Script id="ga-conversion" strategy="afterInteractive">
          {`
            window.addEventListener('load', function() {
              if (window.gtag) {
                gtag('config', 'G-MY6KY7VPJ9', {
                  'conversion_event': 'pdf_download'
                });
              }
            });
          `}
        </Script>
      </body>
    </html>
  );
}
