import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "The Difference Between Writing and Copywriting — Writing & Copywriting | Cyberussell", description: "Why copywriting pays more — and how AI changes both disciplines.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting/the-difference-between-writing-and-copywriting" }, openGraph: { title: "Writing vs Copywriting | Cyberussell", description: "Why copywriting pays more — and how AI changes both.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting/the-difference-between-writing-and-copywriting", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Writing & Copywriting"
      skillHref="/learn/skills/writing-copywriting"
      lessonNum="1" lessonTotal="7"
      title="The Difference Between Writing and Copywriting"
      subtitle="One is a craft. The other is a business weapon. You need to know which one you're doing."
      tags={["Foundations"]}
      readTime="8 min"
      objective="Explain the difference between writing and copywriting — and identify which type of writing a given task requires."
      sections={[
        { heading: "Writing vs Copywriting: The Core Difference", comparison: {
          a: { label: "Writing", items: ["Goal: to express, inform, or entertain", "Success = engaged reader", "Blog posts, articles, books, essays", "Written for audiences who seek it out", "Measured by time-on-page, shares, comments"] },
          b: { label: "Copywriting", items: ["Goal: to persuade and drive action", "Success = click, purchase, signup, call", "Ads, landing pages, emails, sales pages", "Written for audiences who might ignore it", "Measured by conversion rate and revenue"] },
        } },
        { heading: "Why Copywriting Pays More", body: "A 1,000-word blog post might earn ₱500 from a content mill. A single email sequence that converts 3% of a 10,000-person list at ₱2,000 per product? That's ₱600,000 in revenue — and the copywriter who wrote it gets a premium fee.\n\nCopywriting is paid based on the value it creates, not the word count. That's why skilled copywriters charge 10x what content writers charge for the same number of words." },
        { heading: "How AI Changes Both", items: [
          { title: "AI + Content Writing", desc: "AI can research, outline, draft, and even optimize content quickly. A task that took 3 hours now takes 45 minutes. Your value shifts to editorial judgment, topic expertise, and quality control." },
          { title: "AI + Copywriting", desc: "AI can generate headlines, subject lines, and first drafts of sales copy. But the best copy requires understanding psychology, knowing the audience deeply, and testing. AI produces volume — humans produce the insight that makes copy convert." },
        ] },
      ]}
      promptText={`I have a writing task: [describe the task]. Help me determine: 1) Is this writing or copywriting — what's the primary goal?, 2) What does success look like for this piece?, 3) What specific writing approach should I use (tone, structure, length)?, 4) What's the one thing this piece absolutely must make the reader feel or do? Then give me an outline to start from.`}
      checklistItems={["I can define the difference between writing and copywriting in one sentence", "I know which type of writing my current project requires", "I understand why the goal of a piece determines how it should be written"]}
      reflectText={`Think about the last piece of writing you were paid for — or the last piece you created for your brand. <span class="text-white font-bold">Was it writing or copywriting? And did you approach it with the right goal in mind?</span>`}
      takeaways={["Writing informs and entertains. Copywriting persuades and converts. The goal changes everything about how you write.", "Copywriting is paid more because it's measured by results — revenue, signups, conversions — not word count.", "AI can generate both types of content quickly. Your value lies in knowing the goal, directing the AI, and editing the output.", "Before writing anything, ask: what is the one action I want the reader to take after finishing this?"]}
      challengeTitle="Rewrite one piece of your content as copywriting."
      challengeBody="Take your last blog post or social caption. Rewrite it as if the goal is to drive one specific action. What changes? Notice how different the same information feels when it's written to convert versus to inform."
      nextTitle="Finding Your Voice: AI That Sounds Like You"
      nextHref="/learn/skills/writing-copywriting/finding-your-voice"
      nextMeta="Writing & Copywriting · Lesson 2 of 7 · 10 min"
    />
  );
}
