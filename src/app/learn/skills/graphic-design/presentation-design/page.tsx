import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Presentation Design: From Bland to Boardroom-Ready — Graphic Design | Cyberussell", description: "Use AI to turn a wall of text into a professional deck in minutes.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/graphic-design/presentation-design" }, openGraph: { title: "Presentation Design with AI | Cyberussell", description: "Turn bullet points into boardroom-ready slides with AI.", url: "https://www.cyberussell.com/learn/skills/graphic-design/presentation-design", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Graphic Design"
      skillHref="/learn/skills/graphic-design"
      lessonNum="4" lessonTotal="6"
      title="Presentation Design: From Bland to Boardroom-Ready"
      subtitle="A great presentation doesn't just inform — it persuades. Design is how you control attention."
      tags={["Presentations"]}
      readTime="10 min"
      objective="Use AI to restructure and redesign a presentation — turning text-heavy slides into clean, visual slides that communicate clearly."
      sections={[
        { heading: "Why Most Presentations Fail", body: "Most presentations are walls of text that the presenter reads aloud while the audience reads ahead and zones out.\n\nThe rule: if your slide can be understood without you talking, it doesn't need you. Slides should support your voice — not replace it. Each slide should make one point, visually." },
        { heading: "The One-Point-Per-Slide Rule", items: [
          { title: "One idea per slide", desc: "If you have 5 points to make, you need 5 slides — not one slide with 5 bullet points. Each point gets its own space, its own visual treatment, its own moment of attention." },
          { title: "Reduce text by 70%", desc: "Take your current slide text. Cut it by 70%. What's left should be the essence, not the explanation. You explain verbally. The slide holds the anchor point." },
          { title: "Add one visual per slide", desc: "A chart, an icon, an image, a diagram. Visuals are processed 60,000x faster than text. Even a simple icon next to a heading makes a slide more effective than a heading alone." },
          { title: "Use a consistent template", desc: "Same font, same background, same color scheme throughout. Consistency = professionalism. Canva and Google Slides both have templates that do this automatically." },
        ] },
      ]}
      promptText={`I have a presentation about [your topic] for [your audience]. Here's my current content: [paste your bullet points or notes]. Help me redesign it: 1) Suggest how to restructure this into clean one-point slides, 2) For each main point, suggest a visual element (chart, icon, image type) that would make it clearer, 3) Write the condensed slide text for each slide (max 1 sentence per slide), 4) Suggest a color scheme and font pairing for this presentation's tone.`}
      checklistItems={["Each slide has one main point", "Slide text has been reduced to one sentence or headline per slide", "Every slide has at least one visual element", "The whole deck uses consistent fonts and colors"]}
      reflectText={`When you look at your slides, are they designed for you to remember your points — or for your audience to understand them? <span class="text-white font-bold">Those are two different documents.</span>`}
      takeaways={["One point per slide. If you have more to say, use more slides — don't cram.", "Reduce text by 70%. Your voice carries the explanation. The slide carries the anchor.", "Every slide needs a visual. Even a single icon makes a slide dramatically more effective.", "Consistent design (template, fonts, colors) is what separates professional decks from amateur ones."]}
      challengeTitle="Take your last presentation and cut every slide's text in half."
      challengeBody="Open your most recent presentation. For every slide with more than 2 bullet points, cut it to 1. Move the removed content to speaker notes. Notice how the deck suddenly looks more professional."
      nextTitle="Thumbnail and Cover Design for Content Creators"
      nextHref="/learn/skills/graphic-design/thumbnail-and-cover-design"
      nextMeta="Graphic Design · Lesson 5 of 6 · 10 min"
    />
  );
}
