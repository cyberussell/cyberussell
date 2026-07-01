import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Sales Copy That Converts: Headlines, CTAs, and Offers — Writing & Copywriting | Cyberussell", description: "Copywriting formulas (AIDA, PAS) applied with AI to write copy that actually sells.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting/sales-copy-that-converts" }, openGraph: { title: "Sales Copy That Converts | Cyberussell", description: "Apply AIDA, PAS, and other formulas with AI to write copy that sells.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting/sales-copy-that-converts", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Writing & Copywriting"
      skillHref="/learn/skills/writing-copywriting"
      lessonNum="4" lessonTotal="7"
      title="Sales Copy That Converts: Headlines, CTAs, and Offers"
      subtitle="Copywriting formulas are tested templates. Use them — then make them your own."
      tags={["Copywriting"]}
      readTime="12 min"
      objective="Write a short-form sales piece using either the AIDA or PAS formula, with AI generating the first draft."
      sections={[
        { heading: "The Two Formulas Every Copywriter Uses", items: [
          { title: "AIDA: Attention → Interest → Desire → Action", desc: "Attention: Hook them. One bold sentence that stops the scroll. Interest: Why they should care. What's the problem you're solving and why does it matter to them? Desire: Paint the outcome. What does life look like after they buy/signup/hire you? Action: Tell them exactly what to do next. One clear CTA, no alternatives." },
          { title: "PAS: Problem → Agitate → Solution", desc: "Problem: Name the exact pain your audience feels. Be specific — not 'you have too much work' but 'you're spending 3 hours a day on tasks that could be automated.' Agitate: Make the cost of the problem real. What does it cost them in time, money, opportunities, or stress? Solution: Present your offer as the way out. Connect every feature to a benefit they care about." },
        ] },
        { heading: "The 3 Elements That Determine Whether Copy Converts", items: [
          { title: "The headline", desc: "80% of people read the headline and skip the rest. Your headline must make a promise, spark curiosity, or state a benefit so clearly that the reader has to keep reading. Use numbers, power words, and specificity." },
          { title: "The offer", desc: "What exactly do they get? A clear offer removes the mental work of figuring out what they're buying. Name it, describe it, price it. Vague offers don't convert." },
          { title: "The CTA", desc: "One action. Present tense. Benefit-focused. Not 'Submit' — 'Get My Free Strategy Call'. Not 'Buy Now' — 'Start Building Your Website'. The CTA is a promise, not a command." },
        ] },
      ]}
      promptText={`Write sales copy for [your offer] using the [AIDA / PAS] formula. My offer: [describe exactly what you're selling]. Price: [price]. Target audience: [describe them]. Their main problem: [the problem you solve]. The outcome they get: [the transformation]. Write: 1) A headline (3 options), 2) The full copy following the formula (200-300 words), 3) A CTA button label. Voice: [paste your voice profile or describe your tone].`}
      checklistItems={["My copy follows either AIDA or PAS from start to finish", "My headline makes a specific promise or sparks genuine curiosity", "My offer is stated clearly — what exactly does the buyer get?", "My CTA is benefit-focused and tells them exactly what happens when they click"]}
      reflectText={`Read your CTA button label right now. Does it tell the reader what they get — or just what they do? <span class="text-white font-bold">'Click here' vs 'Get My Free Checklist' — which one makes you want to click?</span>`}
      takeaways={["AIDA and PAS are proven formulas — use them as scaffolding, then make the copy your own.", "The headline is 80% of your copy. Write 10 options before choosing one.", "Your offer must be crystal clear. If the reader has to figure out what they're buying, you've already lost them.", "CTAs should state a benefit, not just an action. 'Get Free Access' converts better than 'Sign Up'."]}
      challengeTitle="Write 10 headline variations for your main offer."
      challengeBody="Ask Claude to generate 10 different headline styles for your offer: one with a number, one with a question, one with 'how to', one with a bold claim, etc. Pick the best one and use it on your site or next post."
      nextTitle="Email Writing: Newsletters, Cold Outreach, and Sequences"
      nextHref="/learn/skills/writing-copywriting/email-writing"
      nextMeta="Writing & Copywriting · Lesson 5 of 7 · 10 min"
    />
  );
}
