import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "Technical SEO Basics: Speed, Mobile, and Crawlability — SEO | Cyberussell",
  description: "What technical SEO means and the minimum you need to get right. No developer required.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo/technical-seo-basics" },
  openGraph: { title: "Technical SEO Basics | Cyberussell", description: "The minimum technical SEO you need to get right.", url: "https://www.cyberussell.com/learn/skills/seo/technical-seo-basics", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="SEO"
      skillHref="/learn/skills/seo"
      lessonNum="6" lessonTotal="7"
      title="Technical SEO Basics: Speed, Mobile, and Crawlability"
      subtitle="If Google can't access and read your site properly, nothing else matters."
      tags={["Technical"]}
      readTime="10 min"
      objective="Identify and fix the 3 most critical technical SEO issues on any website without needing developer knowledge."
      sections={[
        {
          heading: "What Technical SEO Actually Is",
          body: "Technical SEO is about making sure search engines can find, access, crawl, and understand your website. It's the foundation everything else sits on.\n\nIf your site is slow, not mobile-friendly, or has broken pages, Google will rank it lower — regardless of how good your content is. The good news: the basics are simple and most no-code platforms handle much of it automatically.",
        },
        {
          heading: "The Technical SEO Minimum Every Site Needs",
          items: [
            { title: "Mobile-friendly design", desc: "More than 60% of searches happen on mobile. Google uses mobile-first indexing, meaning it ranks based on your mobile experience, not desktop. Test at Google's Mobile-Friendly Test tool." },
            { title: "Page speed", desc: "Slow pages rank lower and lose visitors. Google's target is under 3 seconds. The biggest speed killer: large uncompressed images. Compress all images to under 200KB using TinyPNG or Squoosh before uploading." },
            { title: "HTTPS (SSL certificate)", desc: "Your site URL should start with https://, not http://. Modern hosting platforms include SSL free. If yours doesn't, switch hosting. Google marks non-HTTPS sites as 'not secure'." },
            { title: "Crawlable pages", desc: "Google needs to be able to find and read your pages. Submit your sitemap to Google Search Console. Make sure no important pages are accidentally set to 'no-index'." },
            { title: "No broken links (404 errors)", desc: "Broken links frustrate visitors and waste Google's crawl budget. Check for them monthly using a free tool like Broken Link Checker or Screaming Frog." },
          ]
        },
      ]}
      promptText={`Explain technical SEO to me as a complete beginner. I use [your website platform — Carrd/Framer/WordPress/etc.]. Tell me: 1) Which technical SEO issues are handled automatically by my platform, 2) Which ones I need to check manually, 3) How to check my page speed and what a good score looks like, 4) What Google Search Console is and why I should set it up. Keep it practical — I don't know how to code.`}
      checklistItems={["My site has an SSL certificate (URL starts with https://)", "I've tested my site on Google's Mobile-Friendly Test", "My images are compressed and under 200KB each", "I've set up Google Search Console and submitted my sitemap", "I've checked for and fixed any broken links"]}
      reflectText={`Technical SEO is invisible when it's done right. <span class="text-white font-bold">What technical issue on your site right now is costing you rankings without you knowing it?</span> Run a check before the week ends.`}
      takeaways={[
        "Mobile-first indexing means Google ranks based on your mobile experience. If your mobile site is bad, your ranking is bad.",
        "Page speed is a ranking factor. Compress your images before uploading — this alone solves 80% of speed issues.",
        "HTTPS is non-negotiable. Any site still on HTTP is at a serious disadvantage and flagged as 'not secure' in browsers.",
        "Google Search Console is free and essential. It shows you how Google sees your site and what errors exist.",
      ]}
      challengeTitle="Set up Google Search Console for your site today."
      challengeBody="It's free, takes 10 minutes to set up, and gives you data you cannot get anywhere else. Submit your sitemap after setup. You'll start seeing search performance data within a few days."
      nextTitle="Tracking Your Rankings and Iterating"
      nextHref="/learn/skills/seo/tracking-your-rankings-and-iterating"
      nextMeta="SEO · Lesson 7 of 7 · 8 min"
    />
  );
}
