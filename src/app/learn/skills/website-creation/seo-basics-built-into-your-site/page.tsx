import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "SEO Basics Built Into Your Site from Day One — Website Creation | Cyberussell",
  description: "The minimum SEO setup every website needs — and how AI helps you do it in under an hour.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation/seo-basics-built-into-your-site" },
  openGraph: { title: "SEO Basics Built Into Your Site from Day One | Cyberussell", description: "The minimum SEO setup every website needs.", url: "https://www.cyberussell.com/learn/skills/website-creation/seo-basics-built-into-your-site", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Website Creation"
      skillHref="/learn/skills/website-creation"
      lessonNum="6" lessonTotal="7"
      title="SEO Basics Built Into Your Site from Day One"
      subtitle="The minimum setup that makes Google notice your site — done with AI assistance."
      tags={["SEO"]}
      readTime="10 min"
      objective="Set up the minimum SEO foundation on any new site: title tags, meta descriptions, headings, and image alt text — using AI to write them."
      sections={[
        {
          heading: "Why SEO from Day One Matters",
          body: "Most people build their site, launch it, and then think about SEO months later. By then, they're retrofitting — fixing things that would have taken 20 minutes to get right from the start.\n\nSEO built into your site from the beginning means every page is discoverable from day one. You're not starting from zero after launch.",
        },
        {
          heading: "The 5 SEO Basics Every Site Needs",
          items: [
            { title: "1. Page Title Tags", desc: "The text that appears in the browser tab and in Google search results. Every page needs a unique title that includes your main keyword. Format: 'Keyword — Brand Name'. Ideal length: 50–60 characters." },
            { title: "2. Meta Descriptions", desc: "The 1–2 sentence summary under your title in Google results. Doesn't directly affect ranking but affects click-through rate. Write it as a pitch to click. 150–160 characters max." },
            { title: "3. H1 Heading", desc: "One H1 per page — the main heading. It should include your primary keyword naturally. This is the first thing Google reads to understand what a page is about." },
            { title: "4. Image Alt Text", desc: "A short description of every image. Google can't 'see' images — alt text tells it what they show. Also critical for accessibility." },
            { title: "5. Page Speed", desc: "Compress your images before uploading. Use tools like TinyPNG or Squoosh. Slow pages rank lower and lose visitors. Aim for images under 200KB." },
          ]
        },
      ]}
      promptText={`Write SEO-optimized title tags and meta descriptions for my website. My site is about [what your site covers]. My primary keyword is [your main keyword]. I need: 1) A title tag for my homepage (max 60 chars), 2) A meta description for my homepage (max 160 chars), 3) H1 suggestion for my homepage, 4) Alt text for a hero image that shows [describe the image]. Make them natural — not keyword-stuffed.`}
      checklistItems={["Every page on my site has a unique title tag", "My homepage meta description reads like a compelling pitch", "I have one H1 per page with my main keyword included naturally", "All images have descriptive alt text"]}
      reflectText={`SEO is a long game. Plants grow slowly — but you have to plant them first. <span class="text-white font-bold">If you skip SEO setup today, when do you think you'll come back to fix it?</span> Do it now while the site is fresh.`}
      takeaways={[
        "SEO basics take 20 minutes to set up and pay dividends for years. Do it before launch, not after.",
        "Title tags and meta descriptions are the first thing Google and searchers see — write them like copy, not just metadata.",
        "One H1 per page, targeting one keyword. Don't dilute the signal by cramming multiple keywords into one heading.",
        "Image compression is the single fastest way to improve site speed. Do it before every upload.",
      ]}
      challengeTitle="Run a free site audit on your new site."
      challengeBody="Go to Google Search Console and add your site property. Or use Ubersuggest's free site audit tool. Read what it says and pick one thing to fix immediately."
      nextTitle="Launching, Testing, and Getting Feedback"
      nextHref="/learn/skills/website-creation/launching-testing-and-getting-feedback"
      nextMeta="Website Creation · Lesson 7 of 7 · 10 min"
    />
  );
}
