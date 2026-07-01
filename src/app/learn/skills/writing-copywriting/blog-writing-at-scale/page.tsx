import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Blog Writing at Scale: Research, Outline, Draft, Edit — Writing & Copywriting | Cyberussell", description: "The full AI-assisted workflow for producing high-quality blog content fast and consistently.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting/blog-writing-at-scale" }, openGraph: { title: "Blog Writing at Scale | Cyberussell", description: "The full AI workflow for producing high-quality blog content fast.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting/blog-writing-at-scale", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Writing & Copywriting"
      skillHref="/learn/skills/writing-copywriting"
      lessonNum="3" lessonTotal="7"
      title="Blog Writing at Scale: Research, Outline, Draft, Edit"
      subtitle="The workflow that turns 4-hour articles into 45-minute ones — without sacrificing quality."
      tags={["Workflow"]}
      readTime="12 min"
      objective="Complete one full blog article using the 4-stage AI workflow: research → outline → draft → edit."
      sections={[
        { heading: "The 4-Stage Blog Writing Workflow", items: [
          { title: "Stage 1: Research (10 min)", desc: "Use Gemini to research the topic: top questions people have, existing content, statistics, and expert opinions. Ask Gemini: 'Research [topic] for a blog post. Give me: key facts, common questions, recent statistics, and what the top articles miss.'" },
          { title: "Stage 2: Outline (5 min)", desc: "Hand the research to Claude and ask for a structured outline. Specify: target keyword, target audience, article length, and the angle you want to take (beginner guide, controversial take, practical how-to, etc.)." },
          { title: "Stage 3: Draft (15 min)", desc: "Ask Claude to write the full draft based on the outline. Include your voice document if you have one. Ask for the intro hook, each section, and a conclusion with one clear CTA." },
          { title: "Stage 4: Edit (15 min)", desc: "This is where you add your humanity. Fact-check everything. Add your personal examples and experiences. Cut sentences that sound too formal or generic. Replace AI phrases ('In conclusion', 'It's important to note') with your natural voice." },
        ] },
        { heading: "What AI Gets Wrong in Blog Writing", items: [
          { title: "Overconfident facts", desc: "AI states things as fact that may be wrong, outdated, or unverifiable. Check every statistic and claim before publishing." },
          { title: "Generic intros", desc: "AI almost always starts with a boring overview. Rewrite the intro to hook the reader immediately with a bold statement, surprising stat, or relatable scenario." },
          { title: "Padding", desc: "AI adds filler to hit word counts. Cut any paragraph that doesn't add new information or move the reader forward." },
        ] },
      ]}
      promptText={`Write a 1,000-word blog post about [your topic] targeting the keyword "[keyword]" for [target audience]. Use this outline: [paste your outline from Stage 2]. Voice profile: [paste your voice document]. The hook should start with [a surprising stat / a bold claim / a relatable scenario]. Each section should include one practical example. End with a clear CTA to [your desired action]. Do not use filler phrases or formal transitions.`}
      checklistItems={["I completed all 4 stages for one article", "I fact-checked every statistic and claim", "I rewrote the intro to hook the reader immediately", "I removed all AI filler phrases and generic transitions", "The article sounds like it was written by a person who knows the topic"]}
      reflectText={`The difference between a 45-minute blog post and a 4-hour blog post is process. <span class="text-white font-bold">How many more articles could you publish per month if you had this workflow running reliably?</span>`}
      takeaways={["Research → Outline → Draft → Edit is the workflow. Never skip stages.", "Gemini for research. Claude for drafting. You for editing and adding real expertise.", "The edit stage is where you turn AI content into your content. Budget at least 15 minutes for it.", "Fact-check everything. AI writes confidently about things it made up. You are responsible for what you publish."]}
      challengeTitle="Complete one full article using the 4-stage workflow."
      challengeBody="Pick a topic, run the full workflow, and publish the result. Time each stage. By the third time you do this, you'll have the whole process down to under an hour."
      nextTitle="Sales Copy That Converts: Headlines, CTAs, and Offers"
      nextHref="/learn/skills/writing-copywriting/sales-copy-that-converts"
      nextMeta="Writing & Copywriting · Lesson 4 of 7 · 12 min"
    />
  );
}
