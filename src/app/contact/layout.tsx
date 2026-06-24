import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Cyberussell",
  description: "Have a question or want to collaborate? Send a message to the Cyberussell team.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
