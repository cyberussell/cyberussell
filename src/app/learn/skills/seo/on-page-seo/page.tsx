import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "On-Page SEO: Titles, Meta Descriptions, and Headers — SEO | Cyberussell",
  description: "The exact elements that affect search ranking — and how to optimize them with AI in under an hour.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo/on-page-seo" },
  openGraph: { title: "On-Page SEO: Titles, Meta Descriptions, and Headers | Cyberussell", description: "Optimize the exact elements that affect search ranking.", url: "https://www.cyberussell.com/learn/skills/seo/on-page-seo", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="SEO"
      skillHref="/learn/skills/seo"
      lessonNum="4" lessonTotal="7"
      title="On-Page SEO: Titles, Meta Descriptions, and Headers"
      subtitle="The on-page elements that directly influence whether Google shows your page — and whether people click."
      tags={["Technical"]}
      readTime="10 min"
      objective="Optimize every on-page SEO element for a real page: title tag, meta description, H1, H2 structure, and internal links."
      sections={[
        {
          heading: "The 6 On-Page Elements That Matter Most",
          items: [
            { title: "Title Tag (most important)", desc: "The clickable headline in Google results. Format: Primary Keyword — Secondary Info | Brand. Max 60 characters. Put the keyword first. Example: 'Freelance Web Designer Philippines | Affordable Websites'" },
            { title: "Meta Description", desc: "The summary below your title in search results. Doesn't directly affect ranking but dramatically affects click-through rate. Write it like ad copy. Max 160 characters. Include your keyword and a reason to click." },
            { title: "H1 Heading", desc: "The main heading on your page. One per page. Should include your primary keyword naturally. This is what Google reads first to understand the page topic." },
            { title: "H2 and H3 Headings", desc: "Section headings within your content. Use H2 for main sections, H3 for subsections. Include related keywords naturally in headings — they help Google understand your content depth." },
            { title: "Image Alt Text", desc: "Text description of every image. Google cannot see images — alt text tells it what the image shows. Also improves accessibility. Keep it descriptive: 'Filipino freelance web designer working on laptop' beats 'image1'." },
            { title: "Internal Links", desc: "Links from one page on your site to another. They spread 'link equity' across your site and help Google discover and index all your pages. Every page should link to at least 2-3 others." },
          ]
        },
      ]}
      promptText={`I'm optimizing a page about [your topic] for the keyword "[your keyword]". Write for me: 1) 3 title tag options (max 60 chars each, keyword first), 2) 2 meta description options (max 160 chars, include keyword, end with a hook to click), 3) An H1 suggestion that includes the keyword naturally, 4) 4 H2 headings for the main sections of the article. Make them all feel natural and not keyword-stuffed.`}
      checklistItems={["Every page has a unique title tag under 60 characters with the keyword first", "Meta descriptions are under 160 characters and written as a click pitch", "I have one H1 per page that includes the primary keyword", "Every image has descriptive alt text", "Each page links internally to at least 2 related pages"]}
      reflectText={`Your title tag is the first thing both Google and potential visitors see. <span class="text-white font-bold">Does yours answer 'what's on this page' AND give someone a reason to click — in 60 characters?</span>`}
      takeaways={[
        "The title tag is the most important on-page SEO element. Get the keyword first, keep it under 60 characters, make it a reason to click.",
        "Meta descriptions don't directly affect ranking but affect click-through rate — which indirectly affects ranking. Write them as ad copy.",
        "Internal links are free SEO. Every page should link to related pages to spread authority and help Google index your site.",
        "Alt text is both SEO and accessibility. Describe what's in the image in plain, specific language.",
      ]}
      challengeTitle="Audit and fix your top 3 pages right now."
      challengeBody="Pick the 3 most important pages on your site. Check each one: Does it have a proper title tag? A meta description? A single H1? Fix what's missing in the next 30 minutes."
      nextTitle="Building Backlinks Without Spending Money"
      nextHref="/learn/skills/seo/building-backlinks-without-spending-money"
      nextMeta="SEO · Lesson 5 of 7 · 12 min"
    />
  );
}
