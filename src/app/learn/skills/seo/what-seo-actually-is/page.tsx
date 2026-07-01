import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "What SEO Actually Is (and Why Most People Do It Wrong) — SEO | Cyberussell",
  description: "Forget keyword stuffing. Learn how Google really ranks pages — and where AI fits in.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/seo/what-seo-actually-is" },
  openGraph: { title: "What SEO Actually Is | Cyberussell", description: "How Google really ranks pages — and where AI fits in.", url: "https://www.cyberussell.com/learn/skills/seo/what-seo-actually-is", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="SEO"
      skillHref="/learn/skills/seo"
      lessonNum="1" lessonTotal="7"
      title="What SEO Actually Is (and Why Most People Do It Wrong)"
      subtitle="Google's job is to find the best answer. Your job is to be the best answer."
      tags={["Foundations"]}
      readTime="8 min"
      objective="Explain how Google decides what to rank — and identify the 3 factors that matter most for getting a page to the top."
      sections={[
        {
          heading: "The Misconception Most People Start With",
          body: "Most people think SEO is about tricking Google. They stuff keywords into their content, buy backlinks, and repeat phrases so many times the writing becomes unreadable.\n\nThat approach worked in 2010. It gets you penalized in 2025.\n\nGoogle's algorithm has one goal: show the user the most helpful, trustworthy, relevant answer to their search. Your job is to be that answer — not to game a system.",
        },
        {
          heading: "How Google Actually Decides What Ranks",
          items: [
            { title: "Relevance", desc: "Does your page actually answer what the person searched for? Google matches search intent, not just keywords. A page about 'how to lose weight' should provide genuinely useful weight-loss information — not just contain the phrase 100 times." },
            { title: "Authority", desc: "Does Google trust your site? Authority is built over time through backlinks (other sites linking to you), consistent publishing, and how long your domain has existed. New sites start with low authority." },
            { title: "Experience (E-E-A-T)", desc: "Google now evaluates Experience, Expertise, Authoritativeness, and Trustworthiness. Who wrote the content? Do they know what they're talking about? Is the information accurate and up to date?" },
          ]
        },
        {
          heading: "Where AI Fits In",
          comparison: {
            a: { label: "What AI Can Do for SEO", items: ["Research keywords faster than any tool", "Outline articles around user intent", "Write first drafts of optimized content", "Generate meta titles and descriptions", "Identify content gaps vs. competitors"] },
            b: { label: "What AI Cannot Replace", items: ["Your real-world experience and expertise", "Original research and data", "Building trust with your audience over time", "Getting other sites to link to you", "Verifying that AI-written facts are accurate"] },
          }
        },
      ]}
      promptText={`Explain to me how Google's ranking algorithm works in 2025. I'm a beginner. Focus on: 1) What 'search intent' means and why it matters, 2) The difference between on-page and off-page SEO, 3) What E-E-A-T means and how I can demonstrate it, 4) One thing beginners do that hurts their rankings. Keep it practical.`}
      checklistItems={["I can explain what 'search intent' means in my own words", "I understand the difference between on-page and off-page SEO", "I know the 3 main ranking factors: relevance, authority, experience"]}
      reflectText={`If Google's job is to find the best answer, <span class="text-white font-bold">how would you make your content genuinely the best answer to a question your target audience is asking?</span> That's the real SEO strategy.`}
      takeaways={[
        "SEO is not about tricking Google — it's about being the most helpful result for a real search.",
        "The 3 ranking factors are relevance (does your content answer the query?), authority (does Google trust your site?), and experience (does the author know what they're talking about?).",
        "AI accelerates SEO research and content creation — but can't replace real expertise and genuine helpfulness.",
        "Search intent is the most important thing to understand before writing any piece of SEO content.",
      ]}
      challengeTitle="Google a question your target client would ask."
      challengeBody="Search a real question your potential client might type into Google. Look at the top 3 results. What do they have in common? That's what Google thinks the ideal answer looks like — and your content needs to be better than all of them."
      nextTitle="Keyword Research with AI: Find What People Are Searching For"
      nextHref="/learn/skills/seo/keyword-research-with-ai"
      nextMeta="SEO · Lesson 2 of 7 · 12 min"
    />
  );
}
