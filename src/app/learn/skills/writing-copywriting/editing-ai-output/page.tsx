import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Editing AI Output: How to Spot and Fix What's Off — Writing & Copywriting | Cyberussell", description: "AI writes fast but makes mistakes. Learn to edit for accuracy, tone, and flow.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting/editing-ai-output" }, openGraph: { title: "Editing AI Output | Cyberussell", description: "How to edit AI writing for accuracy, tone, and flow.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting/editing-ai-output", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Writing & Copywriting"
      skillHref="/learn/skills/writing-copywriting"
      lessonNum="7" lessonTotal="7"
      title="Editing AI Output: How to Spot and Fix What's Off"
      subtitle="Publishing AI output without editing is like serving raw ingredients as a meal."
      tags={["Editing"]}
      readTime="10 min"
      objective="Edit a piece of AI-generated content using the 5-pass editing method — fixing accuracy, tone, flow, specificity, and length."
      sections={[
        { heading: "Why AI Output Always Needs Editing", body: "AI generates text that is grammatically correct, logically structured, and professionally worded. It also hallucinates facts, over-hedges, adds padding, sounds like no one in particular, and uses phrases that mark it as AI-written immediately.\n\nEditing AI output is a skill. The better you are at it, the more value you extract from AI — and the more your final content sounds like yours." },
        { heading: "The 5-Pass Editing Method", items: [
          { title: "Pass 1: Fact-check", desc: "Highlight every statistic, claim, quote, or specific fact. Verify each one independently. AI confabulates with confidence. Never assume a number or attribution is accurate." },
          { title: "Pass 2: Remove AI filler", desc: "Search for and delete these phrases: 'It's important to note that', 'In conclusion', 'Certainly!', 'As an AI', 'Dive deep into', 'In today's fast-paced world', 'Leverage'. These are AI fingerprints. Cut them all." },
          { title: "Pass 3: Add specificity", desc: "AI writes in generalities. Replace vague statements with specific details from your own experience or knowledge. 'Many businesses struggle' becomes 'My freelance client in Quezon City struggled with this last month'." },
          { title: "Pass 4: Match your voice", desc: "Read each paragraph aloud. Does it sound like something you would actually say? If not, rewrite it. AI copy is often too formal, too smooth, or missing your personality. This is where you inject yourself." },
          { title: "Pass 5: Cut for length", desc: "AI tends to over-explain. After the other passes, cut the draft by 20-30% by removing redundant explanations, repeated points, and any paragraph that doesn't add new information." },
        ] },
      ]}
      promptText={`Edit this piece of AI-generated content and make it sound more like mine: [paste the AI output]. Please: 1) Identify any claims that should be fact-checked, 2) Remove AI filler phrases, 3) Flag anywhere the writing is too vague or generic and suggest how to make it specific, 4) Rewrite the intro to hook the reader faster, 5) Cut the overall length by 20% without losing key information. Voice profile: [paste your voice document].`}
      checklistItems={["I fact-checked every specific claim and statistic", "I removed all AI filler phrases", "I added at least one specific personal detail or example", "The content sounds like something I would actually say", "I cut the overall length by at least 15%"]}
      reflectText={`The best AI-assisted writers are excellent editors first. <span class="text-white font-bold">If you published your last AI draft without editing it, how would a reader know it wasn't written by a real person with real expertise?</span>`}
      takeaways={["Fact-check everything. AI writes wrong things with complete confidence. You are responsible for what you publish.", "AI filler phrases are easy to spot: 'In conclusion', 'It's important to note', 'Dive deep'. Delete them all.", "Specificity is what AI can't add — because it doesn't have your experience. You add that in editing.", "Cut 20-30% after the other passes. Shorter, tighter writing is almost always better."]}
      challengeTitle="Edit an old AI-generated piece you published without fully editing."
      challengeBody="Find something you wrote with AI help and posted. Run the 5-pass method on it now. What would you change? Apply those changes and repost or update. Notice the difference in quality."
      nextTitle="Continue with Content Creation"
      nextHref="/learn/skills/content-creation"
      nextMeta="Build Real Skills · Pillar 5 · Content Creation Track"
    />
  );
}
