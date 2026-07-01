import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "Building Backlinks Without Spending Money — SEO | Cyberussell",
  description: "Practical link-building strategies using AI to craft outreach and find opportunities — no paid tools required.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo/building-backlinks-without-spending-money" },
  openGraph: { title: "Building Backlinks Without Spending Money | Cyberussell", description: "Free link-building strategies using AI for outreach.", url: "https://www.cyberussell.com/learn/skills/seo/building-backlinks-without-spending-money", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="SEO"
      skillHref="/learn/skills/seo"
      lessonNum="5" lessonTotal="7"
      title="Building Backlinks Without Spending Money"
      subtitle="Backlinks are votes of trust from other websites. You earn them — not buy them."
      tags={["Off-Page"]}
      readTime="12 min"
      objective="Identify 5 free backlink opportunities for your site and write an outreach email using Claude."
      sections={[
        {
          heading: "Why Backlinks Matter",
          body: "When another website links to yours, it's telling Google: 'This page is worth referencing.' The more high-quality sites link to you, the more Google trusts your site — and the higher it ranks.\n\nBuying backlinks violates Google's guidelines and risks penalization. Earning them through genuine value is slower but permanent.",
        },
        {
          heading: "5 Free Backlink Strategies That Work",
          items: [
            { title: "Guest posting", desc: "Write an article for another website in your niche. In exchange, you get a link back to your site. Target sites that accept contributors in your field." },
            { title: "Resource page link building", desc: "Many websites maintain 'resource pages' — lists of useful links for their audience. Find these pages in your niche and ask to be included. Google: '[your niche] + useful resources' or '[your niche] + links'." },
            { title: "Broken link building", desc: "Find a broken link on someone's website, then email them to suggest replacing it with your relevant content. They fix a problem and you get a link." },
            { title: "HARO / journalist outreach", desc: "Help a Reporter Out (HARO) sends daily requests from journalists needing expert sources. Respond with useful quotes and you may get cited (with a link) in major publications." },
            { title: "Create linkable assets", desc: "Original research, data-driven reports, free tools, or comprehensive guides attract natural backlinks. Make something genuinely useful that people want to reference." },
          ]
        },
      ]}
      promptText={`Write me a cold outreach email for link building. Context: I run a website about [your niche]. I want to reach out to [type of site — blog, resource page, directory] to ask for a link back to my page about [specific page/topic]. The email should: 1) Be short (under 150 words), 2) Lead with something genuine about their site, 3) Explain the relevance of my link to their audience, 4) Make a clear but non-pushy ask. Don't sound like a template.`}
      checklistItems={["I've identified 5 specific link-building opportunities in my niche", "I have an outreach email drafted using Claude", "I understand the difference between earned links and paid links", "I've sent at least one outreach email"]}
      reflectText={`Link building is about creating genuine value for other websites' audiences. <span class="text-white font-bold">What content or resource on your site would another website in your niche genuinely want to link to?</span> If the answer is nothing yet, that's your next content project.`}
      takeaways={[
        "Backlinks are the single biggest off-page SEO factor. One good backlink from a relevant, trusted site is worth more than 100 from irrelevant ones.",
        "You cannot shortcut link building permanently. Earn links by creating things worth linking to.",
        "Guest posting and resource page outreach are the two fastest free strategies for most beginners.",
        "Use AI to write outreach emails — but personalize them. Generic outreach gets ignored.",
      ]}
      challengeTitle="Send one backlink outreach email today."
      challengeBody="Find one website in your niche that could logically link to your content. Use Claude to write the email. Send it. The worst they can do is not reply. Most people never even try."
      nextTitle="Technical SEO Basics: Speed, Mobile, and Crawlability"
      nextHref="/learn/skills/seo/technical-seo-basics"
      nextMeta="SEO · Lesson 6 of 7 · 10 min"
    />
  );
}
