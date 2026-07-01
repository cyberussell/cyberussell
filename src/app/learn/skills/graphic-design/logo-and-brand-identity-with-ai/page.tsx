import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Logo and Brand Identity with AI — Graphic Design | Cyberussell", description: "Build a consistent visual brand from scratch using AI-powered design tools. No designer required.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/graphic-design/logo-and-brand-identity-with-ai" }, openGraph: { title: "Logo and Brand Identity with AI | Cyberussell", description: "Build a consistent visual brand with AI design tools.", url: "https://www.cyberussell.com/learn/skills/graphic-design/logo-and-brand-identity-with-ai", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Graphic Design"
      skillHref="/learn/skills/graphic-design"
      lessonNum="3" lessonTotal="6"
      title="Logo and Brand Identity with AI"
      subtitle="A consistent visual brand makes you memorable. AI makes it affordable to create one."
      tags={["Branding"]}
      readTime="12 min"
      objective="Create a simple brand identity system — logo, color palette, and font pairing — using AI tools and Canva."
      sections={[
        { heading: "What Brand Identity Actually Is", body: "Brand identity is not just a logo. It's the complete visual system that makes your brand recognizable: your logo, your colors, your fonts, your visual style across every touchpoint.\n\nWhen someone sees your Instagram post, your website, and your proposal document — they should all feel like they came from the same place. That consistency is what makes you look professional." },
        { heading: "The Brand Identity System You Need to Build", items: [
          { title: "Logo", desc: "At minimum: a wordmark (your name in a styled font) and a simple icon or symbol. You need both a light and dark version. Export as PNG with transparent background and SVG if possible." },
          { title: "Color palette", desc: "3-4 colors max. One primary brand color, one accent, and one or two neutrals (white, black, dark grey). Colors carry psychological weight — choose intentionally." },
          { title: "Typography", desc: "Two fonts maximum. One for headings (bold, distinctive) and one for body text (clean, readable). Use Google Fonts for free options. Never mix more than two font families." },
          { title: "Visual style", desc: "Describe your brand's visual personality in 3 adjectives. 'Bold, minimal, technical' looks completely different from 'warm, playful, handcrafted'. Your visuals should match those words." },
        ] },
      ]}
      promptText={`Help me build a brand identity for [your business name]. My business does [what you do]. My target client is [describe them]. The personality of my brand is [3 adjectives]. Give me: 1) A color palette with 4 hex codes and what emotion each color communicates, 2) Two Google Fonts that fit my brand personality — one for headings and one for body text, 3) A brief description of what my logo should visually communicate, 4) 3 logo concept directions (text-based, icon-based, combination mark). Include a rationale for each recommendation.`}
      checklistItems={["I have a defined color palette with hex codes", "I've chosen two fonts — one for headings, one for body", "I have at least one logo version I can use professionally", "I can describe my brand visual personality in 3 words"]}
      reflectText={`Look at any brand you admire. What colors do they use? What fonts? What's their visual personality? <span class="text-white font-bold">What does your brand's current visual identity say about you — and is that what you want it to say?</span>`}
      takeaways={["Brand identity is a system, not just a logo. Color, fonts, and visual style work together.", "3-4 colors maximum. More than that and your brand looks random instead of intentional.", "Two fonts maximum — one for headings, one for body. Consistency beats variety every time.", "Export your logo in multiple formats: PNG (transparent), dark version, light version. You'll need all of them."]}
      challengeTitle="Create a brand board on one Canva page."
      challengeBody="On a single Canva page, put your logo, your color palette (colored squares with hex codes), and your font choices side by side. This is your brand reference — use it every time you create anything for your brand."
      nextTitle="Presentation Design: From Bland to Boardroom-Ready"
      nextHref="/learn/skills/graphic-design/presentation-design"
      nextMeta="Graphic Design · Lesson 4 of 6 · 10 min"
    />
  );
}
