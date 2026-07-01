import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "Keyword Research with AI: Find What People Are Searching For — SEO | Cyberussell",
  description: "Use ChatGPT and Gemini to find keywords your competitors are missing. The AI-assisted keyword research workflow.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo/keyword-research-with-ai" },
  openGraph: { title: "Keyword Research with AI | Cyberussell", description: "Find keywords your competitors are missing using ChatGPT and Gemini.", url: "https://www.cyberussell.com/learn/skills/seo/keyword-research-with-ai", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="SEO"
      skillHref="/learn/skills/seo"
      lessonNum="2" lessonTotal="7"
      title="Keyword Research with AI: Find What People Are Searching For"
      subtitle="The words your audience uses are not always the words you use. Research bridges that gap."
      tags={["Research"]}
      readTime="12 min"
      objective="Use AI to build a keyword list for your niche — including long-tail keywords your competitors are overlooking."
      sections={[
        {
          heading: "What Keyword Research Is Really About",
          body: "Keyword research is not about finding the most popular search terms. It's about finding the exact words and phrases your target audience uses when they have a problem you can solve.\n\nThe mistake most beginners make is targeting high-volume keywords immediately. A new site trying to rank for 'graphic design' is competing with thousands of established sites. A new site trying to rank for 'affordable logo design for sari-sari stores in Cavite' has almost no competition — and exactly the right audience.",
        },
        {
          heading: "The 3 Types of Keywords You Need",
          items: [
            { title: "Short-tail keywords", desc: "1-2 words. High volume, high competition. Example: 'SEO Philippines'. Hard to rank for as a new site, but important to know so you understand your niche." },
            { title: "Long-tail keywords", desc: "3+ words. Lower volume, much lower competition, higher intent. Example: 'how to do SEO for a small business in the Philippines'. These are where new sites win." },
            { title: "Question keywords", desc: "Searches that start with 'how', 'what', 'why', 'best'. High intent — the searcher wants a specific answer. Perfect for blog posts and guides." },
          ]
        },
        {
          heading: "The AI Keyword Research Workflow",
          items: [
            { title: "Step 1: Seed keyword brainstorm", desc: "Tell ChatGPT your niche and target audience. Ask for 20 seed keywords — the broad topics your content should cover." },
            { title: "Step 2: Expand into long-tail", desc: "Take 3 seed keywords and ask ChatGPT to generate 10 long-tail variations of each. Focus on questions people actually ask." },
            { title: "Step 3: Validate with Google", desc: "Type your best keywords into Google. Look at the autocomplete suggestions and the 'People Also Ask' section. These are real search queries from real people." },
            { title: "Step 4: Check competition", desc: "For each keyword, Google it and look at the top results. Are they huge sites with thousands of backlinks? Or smaller sites with thin content? The latter means opportunity." },
          ]
        },
      ]}
      promptText={`I'm building a website about [your niche]. My target audience is [describe them]. Help me with keyword research: 1) Give me 15 seed keywords I should be trying to rank for, 2) For 3 of those keywords, give me 5 long-tail variations each, 3) Suggest 5 question-based keywords my audience would search, 4) Identify which keywords are likely to have lower competition for a new website. Explain why for each recommendation.`}
      checklistItems={["I have a list of at least 20 keyword targets", "I have 10+ long-tail keyword variations", "I've Googled my top 5 keywords and checked the competition", "I know which keyword I'll target first"]}
      reflectText={`Your audience searches in their language, not yours. <span class="text-white font-bold">What words does your target client use to describe their problem — and are those the same words you use to describe your solution?</span>`}
      takeaways={[
        "Target long-tail keywords first as a new site. Less competition, more specific intent, faster wins.",
        "The best keyword research tool for beginners is Google itself — autocomplete and 'People Also Ask' are gold.",
        "AI generates keyword ideas fast but can't verify real search volume. Always check keywords against actual Google results.",
        "One keyword, one page. Don't try to rank one page for 10 different keywords — it dilutes your signal.",
      ]}
      challengeTitle="Build a keyword list of 30 targets in your niche."
      challengeBody="Use the AI workflow above to generate 30 keyword targets across all three types (short-tail, long-tail, question). Pick your top 5 for the next piece of content you'll create."
      nextTitle="Writing SEO Content That Ranks and Reads Well"
      nextHref="/learn/skills/seo/writing-seo-content-that-ranks"
      nextMeta="SEO · Lesson 3 of 7 · 15 min"
    />
  );
}
