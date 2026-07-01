import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Idea Generation at Scale: Never Run Out of Content — Content Creation | Cyberussell", description: "Use AI to generate weeks of content ideas from a single prompt. Stop staring at a blank screen.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/content-creation/idea-generation-at-scale" }, openGraph: { title: "Idea Generation at Scale | Cyberussell", description: "Generate weeks of content ideas with AI. Never run out again.", url: "https://www.cyberussell.com/learn/skills/content-creation/idea-generation-at-scale", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Content Creation"
      skillHref="/learn/skills/content-creation"
      lessonNum="2" lessonTotal="6"
      title="Idea Generation at Scale: Never Run Out of Content"
      subtitle="The blank screen is the enemy. AI eliminates it permanently."
      tags={["Ideation"]}
      readTime="10 min"
      objective="Generate 30 content ideas across 3 different frameworks in one AI session — enough to fill a month of posting."
      sections={[
        { heading: "Why Content Creators Run Out of Ideas", body: "Running out of ideas usually means one of two things: you're trying to come up with ideas at the last minute, or you don't have a system for capturing and generating them.\n\nAI solves both. It can generate 30 ideas in 2 minutes — and it never has creative block. Your job is to have the right prompting frameworks and to filter the output." },
        { heading: "The 4 Idea Generation Frameworks", items: [
          { title: "The Question Framework", desc: "Ask: 'What are the 20 most common questions my audience asks about [topic]?' Then ask: 'What are the 20 questions they're afraid to ask?' Each question is a content piece. This framework alone gives you 40+ ideas in one session." },
          { title: "The Transformation Framework", desc: "Ask: 'What is the before/after transformation my content delivers?' Then list 15 versions of that transformation. 'From confused to confident', 'From broke to earning', 'From intimidated by AI to using it daily'. Each transformation is a content hook." },
          { title: "The Content Remix Framework", desc: "Ask Claude: 'Take this existing piece of content and give me 10 ways to repurpose or expand it into new content.' Your best-performing post can become 10 more. Nothing is wasted." },
          { title: "The Trending Angle Framework", desc: "Ask: 'What are the current conversations in [niche] right now? What's controversial? What do most people get wrong? What's changing?' Trending topics with your unique angle = high-engagement content." },
        ] },
      ]}
      promptText={`I'm a content creator in [your niche]. My audience is [describe them — who they are, what they want, what they struggle with]. Generate 30 content ideas using these angles: 1) 10 ideas based on the most common questions my audience has, 2) 10 ideas based on common mistakes or misconceptions they have, 3) 10 ideas based on transformation hooks (before/after). For each idea, give me: the core topic, the angle/hook, and which platform it would work best for (TikTok/Instagram/Facebook/YouTube). Make the hooks punchy, not generic.`}
      checklistItems={["I've generated at least 30 content ideas in one session", "I've filtered the list down to my top 12 (one per week for 3 months)", "I've noted which platform each idea works best for", "I've saved the list somewhere I can access it when it's time to post"]}
      reflectText={`Most creators post reactively — they think of something and scramble to create it. <span class="text-white font-bold">What would it feel like to have 30 content ideas banked and ready, so every week you just pick one and execute?</span>`}
      takeaways={["AI can generate 30+ content ideas in minutes. Your job is to prompt well and filter ruthlessly.", "The Question Framework ('What does my audience ask?') alone can keep you posting for months.", "Your best content can be remixed into 10 more pieces. Repurposing is not cheating — it's strategy.", "Batch your idea generation monthly. One 30-minute session gives you a full month of direction."]}
      challengeTitle="Run a 30-idea brainstorm session right now."
      challengeBody="Open Claude, paste the prompt above with your niche filled in, and generate 30 ideas in one go. Then mark the top 4 — one for each of the next 4 weeks. You just eliminated content anxiety for a month."
      nextTitle="Scripting Short-Form Video with AI"
      nextHref="/learn/skills/content-creation/scripting-short-form-video-with-ai"
      nextMeta="Content Creation · Lesson 3 of 6 · 10 min"
    />
  );
}
