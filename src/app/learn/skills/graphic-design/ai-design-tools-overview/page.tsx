import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "AI Design Tools Overview: Canva AI, Adobe Firefly, Midjourney — Graphic Design | Cyberussell",
  description: "What each AI design tool does best and when to use which one. The honest comparison for Filipino creators.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/graphic-design/ai-design-tools-overview" },
  openGraph: { title: "AI Design Tools Overview | Cyberussell", description: "Canva AI vs Adobe Firefly vs Midjourney — the honest comparison.", url: "https://www.cyberussell.com/learn/skills/graphic-design/ai-design-tools-overview", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Graphic Design"
      skillHref="/learn/skills/graphic-design"
      lessonNum="1" lessonTotal="6"
      title="AI Design Tools Overview: Canva AI, Adobe Firefly, Midjourney"
      subtitle="Each tool has a different strength. Knowing which to reach for saves hours of frustration."
      tags={["Tools"]}
      readTime="10 min"
      objective="Choose the right AI design tool for any given task — and explain why the other tools aren't the right choice for that specific job."
      sections={[
        {
          heading: "Why Tool Choice Matters",
          body: "Using Midjourney to make a Facebook post template is like using a chainsaw to slice bread. You can technically do it, but there's a better tool for the job.\n\nEach AI design tool was built for a different use case. Understanding that saves you time and produces better results.",
        },
        {
          heading: "The Main Players",
          items: [
            { title: "Canva AI", desc: "Best for: social media graphics, presentations, marketing materials, anything that needs to look professional fast. Canva's AI features (Magic Design, text-to-image, background remover) are built into a familiar drag-and-drop editor. Free tier is generous. Start here if you're new to design." },
            { title: "Adobe Firefly", desc: "Best for: professional-quality image generation that's safe to use commercially. Firefly is trained on licensed Adobe Stock images, so outputs can be used in commercial work without copyright risk. Integrated into Photoshop and Illustrator if you use those." },
            { title: "Midjourney", desc: "Best for: high-quality artistic and photorealistic image generation. Produces stunning outputs but runs via Discord and has a learning curve for prompting. Best for concept art, hero images, and creative visuals where you have time to iterate." },
            { title: "DALL-E (via ChatGPT)", desc: "Best for: quick image generation during a ChatGPT session. Convenient but lower quality than Midjourney or Firefly for professional work. Good for rough drafts and concepts." },
            { title: "Ideogram / Leonardo AI", desc: "Best for: text-in-images (logos, posters with readable text). Midjourney struggles with legible text — Ideogram was built specifically to handle it." },
          ]
        },
      ]}
      promptText={`I want to create [describe what you want to make — social media post, logo, presentation, etc.]. My budget is [free / I have Canva Pro / I have Adobe Creative Cloud]. I need it to look [describe the style]. Which AI design tool should I use and why? Give me a step-by-step on how to get started with that tool specifically.`}
      checklistItems={["I know which tool is best for social media graphics", "I know which tool handles text-in-images best", "I've created a free account on at least one tool and explored it", "I can explain when to use Canva AI vs Midjourney vs Firefly"]}
      reflectText={`The best designers don't use every tool — they master one or two and use them deeply. <span class="text-white font-bold">Which one tool, if you got really good at it, would unlock the most opportunities for your specific work?</span>`}
      takeaways={[
        "Canva AI is the right starting point for most people — fast, beginner-friendly, and good enough for most commercial work.",
        "Midjourney produces the highest artistic quality but requires prompting skill and runs via Discord.",
        "Adobe Firefly is the safest for commercial use — trained on licensed content with commercial usage rights.",
        "For text-in-images (logos, posters), use Ideogram or Leonardo — other tools still struggle with legible text.",
      ]}
      challengeTitle="Create one graphic using an AI tool you've never used before."
      challengeBody="Pick a tool from this lesson you haven't tried. Create one design — anything. A social post, a poster, a header image. The goal is familiarity, not perfection. You have 30 minutes."
      nextTitle="Creating Social Media Graphics That Stop the Scroll"
      nextHref="/learn/skills/graphic-design/creating-social-media-graphics"
      nextMeta="Graphic Design · Lesson 2 of 6 · 12 min"
    />
  );
}
