import { Cormorant_Garamond, Playfair_Display, Jost } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["italic"],
  variable: "--font-playfair",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export default function GandaBeautySalonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${cormorant.variable} ${playfair.variable} ${jost.variable} font-[family-name:var(--font-jost)]`}>
      {children}
    </div>
  );
}
