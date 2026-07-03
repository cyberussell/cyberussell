import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Cyberussell",
  description: "How Cyberussell collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#0F0F1A] px-6 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="font-sans text-[30px] md:text-[40px] font-bold text-white leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55">
            Last updated: June 24, 2026
          </p>
        </div>

        <div className="flex flex-col gap-8 font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">1. Overview</h2>
            <p>
              Cyberussell (<strong className="text-white">cyberussell.com</strong>) is a free resource built to help Filipinos find legitimate ways to earn income online. This Privacy Policy explains what information we collect, how we use it, and your rights as a visitor.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">2. Information We Collect</h2>
            <ul className="flex flex-col gap-2 list-none">
              {[
                { label: "Analytics data", detail: "Page views, device type, location (country/city), and traffic source. Collected automatically via Google Analytics 4 when you visit the site." },
                { label: "Contact form submissions", detail: "Your name, email address, and message when you contact us through the contact page. Sent directly to cyberussellofficial@gmail.com." },
                { label: "Email subscriptions", detail: "Your name (optional) and email address if you subscribe to updates. Stored in a private database accessible only to the site owner." },
              ].map(({ label, detail }) => (
                <li key={label} className="flex gap-3">
                  <span className="text-[#FFD23F] mt-1 shrink-0">→</span>
                  <span><strong className="text-white">{label}</strong> — {detail}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">3. Cookies</h2>
            <p>
              Google Analytics uses cookies to distinguish unique visitors and track sessions. These cookies do not identify you personally. You can disable cookies in your browser settings at any time. We do not use any advertising or tracking cookies beyond Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">4. How We Use Your Information</h2>
            <p>We use the information collected only to:</p>
            <ul className="flex flex-col gap-2 mt-3 list-none">
              {[
                "Understand which content is most helpful to Filipinos who want to earn online",
                "Respond to your questions and inquiries sent through the contact form",
                "Send you updates on new guides and tools (email subscribers only)",
                "Improve the tools and resources on this site",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[#00C97A] mt-1 shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">We do not sell, share, or rent your personal information to anyone.</p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">5. Third-Party Services</h2>
            <p>This site uses the following third-party services, each with their own privacy policies:</p>
            <ul className="flex flex-col gap-2 mt-3 list-none">
              {[
                { name: "Google Analytics 4", url: "https://policies.google.com/privacy", note: "site traffic analysis" },
                { name: "Vercel", url: "https://vercel.com/legal/privacy-policy", note: "hosting and deployment" },
                { name: "Supabase", url: "https://supabase.com/privacy", note: "email list storage" },
              ].map(({ name, note }) => (
                <li key={name} className="flex gap-3">
                  <span className="text-white/55 mt-1 shrink-0">—</span>
                  <span><strong className="text-white">{name}</strong> ({note})</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">6. Disclaimer</h2>
            <p>
              The information, guides, and tools on Cyberussell are provided for educational and informational purposes only. They do not constitute financial, legal, or professional advice. Earning results vary based on individual effort, skills, market conditions, and other factors outside our control.
            </p>
            <p className="mt-3">
              Cyberussell is not responsible for any decisions made based on content found on this site. Some pages may contain affiliate links — if you click one and make a purchase, we may earn a small commission at no extra cost to you.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">7. Data Retention</h2>
            <p>
              Contact form submissions are retained in email as long as needed to respond to your inquiry. Email subscriber data is stored in our database and can be deleted upon request. Analytics data is retained for 14 months per Google Analytics default settings.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">8. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal data we hold about you. To exercise these rights, contact us at{" "}
              <a href="mailto:cyberussellofficial@gmail.com" className="text-[#FFD23F] hover:underline">
                cyberussellofficial@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">9. Data Deletion Request</h2>
            <p>
              Cyberussell does not require account creation. However, if you have submitted your email address through our subscribe form or contact form and would like your data permanently removed, you can request deletion at any time.
            </p>
            <p className="mt-3">To request deletion of your data:</p>
            <ul className="flex flex-col gap-2 mt-3 list-none">
              {[
                "Email us at cyberussellofficial@gmail.com with the subject line \"Data Deletion Request\"",
                "Include the email address you used when subscribing or contacting us",
                "We will permanently delete your data from our records within 7 business days",
                "You will receive a confirmation email once the deletion is complete",
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-[#E8373A] mt-1 shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Note: Deleting your data removes it from our subscriber list and contact records. It does not affect anonymized analytics data collected by Google Analytics, as that data is not linked to your identity.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="font-sans text-[20px] font-bold text-white mb-3">11. Contact</h2>
            <p>
              Questions about this Privacy Policy? Reach us at{" "}
              <a href="mailto:cyberussellofficial@gmail.com" className="text-[#FFD23F] hover:underline">
                cyberussellofficial@gmail.com
              </a>{" "}
              or through the{" "}
              <a href="/contact" className="text-[#FFD23F] hover:underline">contact page</a>.
            </p>
          </section>

        </div>

        <div className="mt-12 text-center">
          <a href="/" className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 hover:text-white transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
