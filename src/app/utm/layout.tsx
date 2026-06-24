import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UTM Link Builder — Cyberussell",
  description: "Generate tracking links for your social media posts. See exactly which platform drives traffic to your site in Google Analytics.",
};

export default function UTMLayout({ children }: { children: React.ReactNode }) {
  return children;
}
