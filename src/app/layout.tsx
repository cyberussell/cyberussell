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
  alternates: { canonical: "https://www.cyberussell.com" },
  openGraph: {
    title: "Cyberussell — Your Skills. Your Income.",
    description:
      "Data-backed guides for Filipinos who want to earn online. Free. No email. No payment.",
    url: "https://www.cyberussell.com",
    siteName: "Cyberussell",
    images: [
      {
        url: "/api/og",
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
    images: ["/api/og"],
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
                  "name": "Why is it hard to earn online in the Philippines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "The problem is systemic — not enough jobs especially in the province, low minimum wages (Region II is among the lowest nationally), and most guides are written for Metro Manila or other markets, not for Filipinos starting from zero."
                  }
                },
                {
                  "@type": "Question",
                  "name": "How much can a beginner Filipino earn online?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Beginners in their first 1–3 months can realistically earn ₱1,800–₱5,000/month through microtasks, basic VA work, affiliate marketing, or online selling. With 6–18 months of experience this grows to ₱10,000–₱20,000/month."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do I need a college degree to earn online in the Philippines?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "No. Most online jobs — virtual assistant, data entry, social media management, content writing — require no degree. You need a skill, a device, and internet access."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is the best platform for Filipino beginners to find online work?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "OnlineJobs.ph is the most beginner-friendly — employers there are specifically searching for Filipino workers, and there is no bidding against the whole world."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is Cyberussell free?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. All guides, tools, and downloads on Cyberussell are completely free. No email required, no payment, no upsell."
                  }
                }
              ]
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cyberussell",
              "url": "https://www.cyberussell.com",
              "logo": "https://www.cyberussell.com/og-image.jpg",
              "description": "Data-backed guides for Filipinos who want to earn online. Free. No email. No payment.",
              "foundingLocation": {
                "@type": "Place",
                "name": "Isabela, Cagayan Valley, Philippines"
              },
              "sameAs": [
                "https://www.tiktok.com/@cyberussell",
                "https://www.facebook.com/cyberussellofficial",
                "https://www.youtube.com/@CyberRussell"
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0F0F1A] text-white antialiased overflow-x-hidden">
        {children}
        <Analytics />
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2492316481270729');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=2492316481270729&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
              var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              ttq.load('D8V26URC77UCME2CKKTG');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
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
