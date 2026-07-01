import { AdAutoOptOut, AdBanner } from "@/components/ads";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AdAutoOptOut />
      {children}
      {/* Subtle bottom ad — sits between content and footer */}
      <div className="max-w-2xl mx-auto px-6 pb-6 opacity-70">
        <AdBanner />
      </div>
    </>
  );
}
