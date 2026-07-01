import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Thumbnail and Cover Design for Content Creators — Graphic Design | Cyberussell", description: "The formulas behind high-click thumbnails — and how to generate them with AI.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/graphic-design/thumbnail-and-cover-design" }, openGraph: { title: "Thumbnail and Cover Design | Cyberussell", description: "High-click thumbnail formulas and how to generate them with AI.", url: "https://www.cyberussell.com/learn/skills/graphic-design/thumbnail-and-cover-design", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Graphic Design"
      skillHref="/learn/skills/graphic-design"
      lessonNum="5" lessonTotal="6"
      title="Thumbnail and Cover Design for Content Creators"
      subtitle="A bad thumbnail kills good content. A great thumbnail is the most underrated growth lever."
      tags={["Content"]}
      readTime="10 min"
      objective="Create a thumbnail using proven visual formulas that consistently get higher click-through rates."
      sections={[
        { heading: "Why Thumbnails Are Your Most Important Design Skill", body: "On YouTube, your thumbnail is the ad for your video. On Spotify, your cover is the ad for your podcast. On Instagram, your post image is the ad for your content.\n\nThe average person decides whether to click in under 1 second. A great thumbnail can be the difference between 1,000 views and 100,000 views on the exact same video." },
        { heading: "The 5 Thumbnail Formulas That Always Work", items: [
          { title: "The Face + Emotion formula", desc: "A close-cropped face showing strong emotion (shock, excitement, confusion). Human faces draw the eye naturally. Add a 3-6 word text label. This is the most common YouTube format for a reason — it works." },
          { title: "The Before/After formula", desc: "Two side-by-side images: the problem state and the result state. Works for tutorials, transformations, and case studies. Immediately communicates value." },
          { title: "The Bold Number formula", desc: "A large, bold number on a contrasting background. '7 Mistakes', '₱50K Month', '30 Days'. Numbers are specific and scannable — the brain processes them faster than words." },
          { title: "The Curiosity Gap formula", desc: "A visual that raises a question the thumbnail doesn't answer. 'I tried this for 30 days...' with a reaction image. Forces the click to resolve the tension." },
          { title: "The Clean Minimal formula", desc: "White or solid-color background, product or subject front and center, minimal text. Works for product reviews, tools, and professional content. Stands out against busy feeds." },
        ] },
      ]}
      promptText={`I'm creating a thumbnail for [describe your content — YouTube video/podcast cover/article feature image]. The topic is [your topic]. My target audience is [describe them]. Give me: 1) 3 thumbnail concept ideas using different formulas, 2) For each concept: the text overlay (max 6 words), the visual description, and which formula it uses, 3) The hex color scheme that would make this pop. Describe it specifically enough that I can create it in Canva.`}
      checklistItems={["I've designed a thumbnail using at least one of the 5 formulas", "The text on my thumbnail is readable at 100px wide (thumbnail size)", "My thumbnail communicates the value of the content in under 1 second", "I've tested my thumbnail by squinting at it — the key message is still clear"]}
      reflectText={`Look at the thumbnails of the top 5 videos in your niche right now. <span class="text-white font-bold">What formula are most of them using? And what would you have to do to stand out from that pattern?</span>`}
      takeaways={["The thumbnail is the most important piece of creative for any video or article. Don't treat it as an afterthought.", "Faces with emotion outperform almost every other format. The eye gravitates toward human faces.", "Readable at thumbnail size means large, bold text with high contrast. Test yours by shrinking it to 100px wide.", "Consistency in thumbnail style builds recognition over time. Viewers should recognize your content before they read the title."]}
      challengeTitle="Redesign your worst-performing thumbnail."
      challengeBody="Look at your last 5 pieces of content. Pick the one with the lowest click-through rate. Redesign the thumbnail using one of the 5 formulas above. Repost and track the difference."
      nextTitle="Print-Ready Designs: Flyers, Posters, and Merch"
      nextHref="/learn/skills/graphic-design/print-ready-designs"
      nextMeta="Graphic Design · Lesson 6 of 6 · 10 min"
    />
  );
}
