import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "The Content Creator's AI Stack — Content Creation | Cyberussell", description: "Which AI tools to use for ideation, scripting, editing, and distribution. The complete creator toolkit.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/content-creation/the-content-creators-ai-stack" }, openGraph: { title: "The Content Creator's AI Stack | Cyberussell", description: "The complete AI toolkit for content creators.", url: "https://www.cyberussell.com/learn/skills/content-creation/the-content-creators-ai-stack", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Content Creation"
      skillHref="/learn/skills/content-creation"
      lessonNum="1" lessonTotal="6"
      title="The Content Creator's AI Stack"
      subtitle="The right tool for each stage of content creation. Not one tool for everything."
      tags={["Tools"]}
      readTime="10 min"
      objective="Build a personal AI content stack — one tool assigned to each stage of your content creation process."
      sections={[
        { heading: "Why You Need a Stack, Not One Tool", body: "One tool doesn't do everything well. ChatGPT is great for brainstorming but weaker at long-form drafting. Canva is perfect for graphics but useless for scripting. CapCut handles video but not strategy.\n\nA content stack means assigning the right tool to the right stage — so each step is as efficient as possible." },
        { heading: "The Content Creator's AI Stack by Stage", items: [
          { title: "Ideation", desc: "ChatGPT: Generate 30 content ideas in 5 minutes. Ask it to analyze your niche, your audience's questions, trending topics, and content gaps. Gemini: Research what's performing in your niche right now and what competitors are missing." },
          { title: "Scripting and Writing", desc: "Claude: Write long-form scripts, article drafts, captions, and email sequences. Claude produces the most natural, readable prose. Give it your voice document and it outputs content closest to your style." },
          { title: "Visual Creation", desc: "Canva AI: Social graphics, carousels, thumbnails, presentation slides. Fast, template-based, built for non-designers. Midjourney or DALL-E: Custom AI-generated images for unique visuals that stock photos don't have." },
          { title: "Video Editing", desc: "CapCut AI: Auto-captions, background removal, beat sync. Built for short-form. Descript: Transcript-based editing — edit video like a document. Perfect for podcasts and talking-head content." },
          { title: "Scheduling and Distribution", desc: "Buffer or Meta Business Suite: Schedule posts across platforms. Later: Instagram-focused scheduling with visual calendar. These aren't AI tools per se, but they complete the workflow." },
        ] },
      ]}
      promptText={`I'm a content creator in [your niche] creating content for [your platforms]. My current bottlenecks are [describe where you spend most time or feel most stuck]. Help me design an AI content stack: 1) Which AI tool should I use at each stage of my workflow, 2) What specific tasks each tool handles, 3) Which tools have free tiers vs require payment, 4) What order I should adopt them in (don't try to use everything at once). Be specific to my niche and platforms.`}
      checklistItems={["I've mapped out my full content creation process from idea to published", "I've assigned one AI tool to each stage", "I've created accounts for the free tools I need", "I know which paid tool would give me the biggest ROI if I had to pick one"]}
      reflectText={`The best content creators don't work harder — they've built systems that work consistently. <span class="text-white font-bold">What's the single stage of your content process that takes the most time and could be automated first?</span>`}
      takeaways={["A content stack assigns the right tool to the right stage. Don't use one tool for everything.", "Ideation: ChatGPT and Gemini. Scripting: Claude. Visuals: Canva AI. Video: CapCut or Descript. Scheduling: Buffer.", "Build your stack gradually — add one tool at a time until you're comfortable before adding the next.", "The goal of a stack is to reduce the time from idea to published piece without reducing quality."]}
      challengeTitle="Document your current content creation process."
      challengeBody="Write out every step you take from 'idea' to 'published post'. Then, next to each step, write the name of the AI tool that could help with it. This is the first draft of your stack."
      nextTitle="Idea Generation at Scale: Never Run Out of Content"
      nextHref="/learn/skills/content-creation/idea-generation-at-scale"
      nextMeta="Content Creation · Lesson 2 of 6 · 10 min"
    />
  );
}
