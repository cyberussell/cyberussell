import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Creating Social Media Graphics That Stop the Scroll — Graphic Design | Cyberussell", description: "Design principles + AI tools for making visuals people actually engage with.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/graphic-design/creating-social-media-graphics" }, openGraph: { title: "Creating Social Media Graphics That Stop the Scroll | Cyberussell", description: "Make visuals people actually engage with.", url: "https://www.cyberussell.com/learn/skills/graphic-design/creating-social-media-graphics", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Graphic Design"
      skillHref="/learn/skills/graphic-design"
      lessonNum="2" lessonTotal="6"
      title="Creating Social Media Graphics That Stop the Scroll"
      subtitle="The difference between a graphic that gets scrolled past and one that gets saved."
      tags={["Social Media"]}
      readTime="12 min"
      objective="Apply the 5 principles of scroll-stopping design to create at least one social media graphic using Canva AI."
      sections={[
        { heading: "Why Most Social Graphics Get Ignored", body: "Most graphics get ignored because they look like every other graphic in the feed. They use the same stock-photo style, the same fonts, the same color schemes.\n\nStopping the scroll requires contrast — something unexpected. A bold color against a muted background. A big number. A provocative question. A visual that makes someone wonder 'what is that?'" },
        { heading: "The 5 Principles of Scroll-Stopping Design", items: [
          { title: "1. One focal point", desc: "Every great social graphic has one thing to look at first. Too many elements compete for attention and the eye gives up. Put one clear subject front and center." },
          { title: "2. Bold, readable text", desc: "Most people see your graphic without sound and often on a small screen. Your text must be large enough to read in a thumbnail. Thin fonts disappear. Bold fonts work." },
          { title: "3. High contrast", desc: "Light text on dark background. Dark text on light background. High contrast colors draw the eye. Low contrast blends into the feed." },
          { title: "4. Emotional hook", desc: "Does the graphic make the viewer feel something? Curiosity, surprise, recognition, humor? Emotion drives engagement more than information." },
          { title: "5. Brand consistency", desc: "Use the same fonts, colors, and style across your posts. Recognition builds trust over time. Random styles make you look amateur." },
        ] },
      ]}
      promptText={`I need to create a social media graphic for [platform — Instagram/Facebook/TikTok]. The message I want to communicate is [your core message]. My brand colors are [colors] and my target audience is [describe them]. Give me: 1) 3 visual concept ideas for this post, 2) The ideal headline (max 8 words), 3) A description of what the background/visual should look like, 4) Which Canva template type to search for. Make it designed to stop the scroll.`}
      checklistItems={["My graphic has one clear focal point", "Text is bold and readable at thumbnail size", "I'm using high contrast — no text is hard to read against the background", "There's an emotional hook that would make someone pause"]}
      reflectText={`Open Instagram or Facebook right now and scroll for 60 seconds. Count how many graphics actually made you stop. <span class="text-white font-bold">What did they have in common? What did the ones you scrolled past have in common?</span>`}
      takeaways={["One focal point beats a busy layout every time. Simplify ruthlessly.", "Bold, high-contrast text is the #1 factor in scroll-stopping designs. Thin, light text fails every time.", "Emotion beats information on social media. Make them feel something before you tell them something.", "Brand consistency is a long game. The 10th post in your consistent style is more powerful than the first."]}
      challengeTitle="Create 3 variations of the same post."
      challengeBody="Take one idea and create 3 different visual treatments for it in Canva. Different background colors, different layouts, different text sizes. Post the one that feels boldest. Iteration is how design skill is built."
      nextTitle="Logo and Brand Identity with AI"
      nextHref="/learn/skills/graphic-design/logo-and-brand-identity-with-ai"
      nextMeta="Graphic Design · Lesson 3 of 6 · 12 min"
    />
  );
}
