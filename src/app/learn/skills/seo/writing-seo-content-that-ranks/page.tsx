import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "Writing SEO Content That Ranks and Reads Well — SEO | Cyberussell",
  description: "How to use Claude to write blog posts and landing pages that satisfy both Google and humans.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo/writing-seo-content-that-ranks" },
  openGraph: { title: "Writing SEO Content That Ranks | Cyberussell", description: "Write content that satisfies both Google and humans.", url: "https://www.cyberussell.com/learn/skills/seo/writing-seo-content-that-ranks", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="SEO"
      skillHref="/learn/skills/seo"
      lessonNum="3" lessonTotal="7"
      title="Writing SEO Content That Ranks and Reads Well"
      subtitle="Content that ranks but doesn't engage wastes every visitor who arrives."
      tags={["Content"]}
      readTime="15 min"
      objective="Write an SEO-optimized piece of content using Claude that targets a specific keyword, matches search intent, and reads naturally."
      sections={[
        {
          heading: "The Two Mistakes That Kill SEO Content",
          comparison: {
            a: { label: "Written for Google Only", items: ["Keywords stuffed unnaturally", "Thin content that covers the topic shallowly", "No real perspective or expertise", "Hard to read — written for algorithms", "Gets traffic but no conversions"] },
            b: { label: "Written for Humans Only", items: ["Great depth but misses the keyword target", "No structure (H2s, H3s) for Google to parse", "Doesn't match what the searcher actually wanted", "May rank eventually but takes much longer", "Misses the compounding traffic opportunity"] },
          }
        },
        {
          heading: "The SEO Content Formula",
          items: [
            { title: "Match search intent first", desc: "Before writing, Google your keyword. Are the top results blog posts? Product pages? Videos? Match the format. If Google shows listicles, write a listicle." },
            { title: "Include your keyword naturally", desc: "In the title, first paragraph, at least one H2, and a few times in the body. Never more than makes sense. Google detects stuffing." },
            { title: "Use a clear H2/H3 structure", desc: "Google reads heading tags to understand your page structure. Each major section needs an H2. Subsections get H3. This also helps readers scan." },
            { title: "Cover the topic completely", desc: "Look at the top 3 results for your keyword and identify every subtopic they cover. Your article should cover all of those — plus at least one thing they don't." },
            { title: "Add original value", desc: "A personal story, an example from your experience, a unique perspective, original data. This is what AI cannot fake — and what Google increasingly rewards." },
          ]
        },
      ]}
      promptText={`Write an SEO-optimized blog post targeting the keyword "[your keyword]". The post should: 1) Start with an intro that hooks the reader and uses the keyword in the first 100 words, 2) Use H2 headings for each major section, 3) Cover these subtopics: [list 4-5 subtopics based on your research], 4) Include a practical example or tip in each section, 5) End with a conclusion and a single CTA. Target length: 1,000 words. Write naturally — not stuffed with keywords.`}
      checklistItems={["My keyword appears in the title, first paragraph, and at least one H2", "The article matches the search intent format (listicle/guide/how-to etc.)", "I've covered all the subtopics the top 3 results cover", "I've added at least one piece of original value they don't have"]}
      reflectText={`The best SEO content genuinely helps someone solve a real problem. <span class="text-white font-bold">If someone found your article through Google, would they leave feeling like they got what they came for — or would they go back and click another result?</span>`}
      takeaways={[
        "Search intent is the most important SEO signal. Match the format (listicle, guide, how-to) before optimizing for anything else.",
        "Use your keyword naturally — in the title, intro, and headings. Don't count occurrences. Write for the reader.",
        "H2 and H3 structure helps both Google and humans. Use them to organize every piece of content.",
        "Original value (your experience, your examples, your data) is what AI can write quickly but cannot actually provide. Add it after the draft.",
      ]}
      challengeTitle="Audit an existing piece of your content against these principles."
      challengeBody="Take any blog post or page you've already written. Check it against the formula above. Does it match search intent? Does it have proper heading structure? Does it have original value? Fix the biggest gap."
      nextTitle="On-Page SEO: Titles, Meta Descriptions, and Headers"
      nextHref="/learn/skills/seo/on-page-seo"
      nextMeta="SEO · Lesson 4 of 7 · 10 min"
    />
  );
}
