import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "Tracking Your Rankings and Iterating — SEO | Cyberussell",
  description: "How to read your SEO data and use AI to decide what to do next. The iteration loop that compounds over time.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo/tracking-your-rankings-and-iterating" },
  openGraph: { title: "Tracking Your Rankings and Iterating | Cyberussell", description: "Read your SEO data and use AI to decide what to fix next.", url: "https://www.cyberussell.com/learn/skills/seo/tracking-your-rankings-and-iterating", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="SEO"
      skillHref="/learn/skills/seo"
      lessonNum="7" lessonTotal="7"
      title="Tracking Your Rankings and Iterating"
      subtitle="SEO without tracking is guessing. Data tells you what's working and what to fix next."
      tags={["Analytics"]}
      readTime="8 min"
      objective="Set up rank tracking, read your Google Search Console data, and use AI to generate an action plan from your SEO performance."
      sections={[
        {
          heading: "What to Track and Why",
          items: [
            { title: "Keyword rankings", desc: "Which position does your page appear in for your target keyword? Positions 1-3 get 70%+ of clicks. Positions 4-10 still get traffic. Anything beyond page 1 gets almost nothing." },
            { title: "Organic traffic", desc: "How many people are visiting your site from Google? This is the ultimate measure of SEO success — more than rankings." },
            { title: "Click-through rate (CTR)", desc: "Of everyone who saw your result in Google, what percentage clicked? A low CTR often means your title tag or meta description needs improvement." },
            { title: "Pages indexed", desc: "Is Google finding and indexing all your important pages? Google Search Console shows you which pages are indexed and which have errors." },
          ]
        },
        {
          heading: "The Monthly SEO Review Process",
          items: [
            { title: "Week 1: Check your Search Console data", desc: "Look at which queries are bringing impressions. Are there keywords you're getting impressions for but not ranking well? Those are optimization opportunities." },
            { title: "Week 2: Update underperforming content", desc: "Take your page ranked #8-20 for an important keyword. Update it: add more depth, improve the title tag, add internal links. This is often faster than creating new content." },
            { title: "Week 3: Publish new content", desc: "Target one new keyword with a new piece of content. Use everything you've learned in this track." },
            { title: "Week 4: Build one backlink", desc: "Reach out for one guest post or resource page link. Consistency compounds." },
          ]
        },
      ]}
      promptText={`I'm reviewing my SEO performance. Here's my data from Google Search Console: [paste or describe your top queries, impressions, clicks, and average position]. Help me: 1) Identify my top 3 quick wins — pages I should improve immediately, 2) Spot any keywords where I'm getting impressions but low clicks (CTR problem), 3) Suggest what to update on each underperforming page, 4) Recommend my content priority for next month.`}
      checklistItems={["I have Google Search Console set up and can read my performance data", "I know which keyword gives me the most impressions", "I've identified at least one page I can improve to move from position 8-20 to top 5", "I have a monthly SEO review scheduled"]}
      reflectText={`SEO is one of the highest-leverage skills you can build — but only if you're consistent. <span class="text-white font-bold">What would your organic traffic look like in 12 months if you published one SEO-optimized piece of content every week starting today?</span>`}
      takeaways={[
        "Google Search Console is the most important free SEO tool. Check it monthly at minimum.",
        "Updating existing content often outranks creating new content. A page ranked #10 is one good update away from page 1.",
        "CTR (click-through rate) tells you whether your title and meta description are compelling. Low CTR = fix your copy.",
        "SEO compounds. The work you do today keeps paying off for years. The only way to lose is to stop.",
      ]}
      challengeTitle="Schedule your monthly SEO review right now."
      challengeBody="Open your calendar and block 60 minutes on the same day each month for your SEO review. The habit of reviewing and iterating is what separates sites that grow from sites that stagnate."
      nextTitle="Continue with Graphic Design"
      nextHref="/learn/skills/graphic-design"
      nextMeta="Build Real Skills · Pillar 5 · Graphic Design Track"
    />
  );
}
