import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Finding Your Voice: AI That Sounds Like You — Writing & Copywriting | Cyberussell", description: "How to train AI to write in your tone so the output doesn't sound robotic or generic.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting/finding-your-voice" }, openGraph: { title: "Finding Your Voice with AI | Cyberussell", description: "Train AI to write in your tone — not generic AI-speak.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting/finding-your-voice", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Writing & Copywriting"
      skillHref="/learn/skills/writing-copywriting"
      lessonNum="2" lessonTotal="7"
      title="Finding Your Voice: AI That Sounds Like You"
      subtitle="Generic AI writing is the easiest thing to spot — and the easiest way to lose a client."
      tags={["Voice"]}
      readTime="10 min"
      objective="Build a personal voice document and use it to prompt AI to write in your specific tone — producing output that actually sounds like you."
      sections={[
        { heading: "Why Voice Matters", body: "The biggest problem with AI writing is that it sounds like AI writing. Smooth, polished, complete — and completely forgettable.\n\nYour voice is the thing that makes people follow you, trust you, and come back. It's your personality on the page. AI can approximate it — but only if you give it enough to work with." },
        { heading: "How to Build Your Voice Document", items: [
          { title: "Step 1: Collect 3-5 pieces of writing you're proud of", desc: "Pull from emails, social posts, old articles, or messages. Any writing that felt genuinely like you." },
          { title: "Step 2: Ask AI to analyze your voice", desc: "Paste those samples into Claude and ask it to describe your writing style: sentence length, vocabulary level, tone, formality, personality traits, common phrases. This is your voice profile." },
          { title: "Step 3: Add what AI misses", desc: "Read the analysis. What did it get right? What did it miss? Add the nuances yourself: 'I use Filipino references sometimes', 'I prefer short punchy sentences over long flowing ones', 'I'm direct but not cold'." },
          { title: "Step 4: Use it in every prompt", desc: "Start any writing prompt with: 'Use this voice profile: [paste your document]'. The difference between AI writing with and without this document is dramatic." },
        ] },
      ]}
      promptText={`Analyze my writing voice from these samples: [paste 3-5 examples of your best writing]. Tell me: 1) My sentence length and rhythm patterns, 2) My vocabulary level and formality, 3) My personality traits that come through, 4) Words or phrases I commonly use, 5) What makes my voice distinctly different from generic AI writing. Create a voice document I can paste into future prompts.`}
      checklistItems={["I have a voice document that describes my writing style specifically", "I've tested it by asking AI to rewrite a paragraph 'in my voice' vs. without it", "The AI output with my voice document sounds noticeably more like me"]}
      reflectText={`Your voice is built from everything you've read, everything you've experienced, and the person you are. <span class="text-white font-bold">What would someone who knows you well say is the most 'you' thing about how you communicate in writing?</span>`}
      takeaways={["Generic AI writing is the fastest way to lose a client. Your voice is your differentiation.", "Build a voice document from samples of your real writing — not from how you wish you sounded.", "The voice document should be pasted into every writing prompt. Don't rely on AI to remember from session to session.", "Even with a voice document, AI needs heavy editing to truly sound like you. Use it as a draft, not a final product."]}
      challengeTitle="Write your voice document this week."
      challengeBody="Collect 5 pieces of your writing. Paste them into Claude and ask for a voice analysis. Edit the output until it genuinely captures how you write. Save it somewhere you'll actually use it."
      nextTitle="Blog Writing at Scale: Research, Outline, Draft, Edit"
      nextHref="/learn/skills/writing-copywriting/blog-writing-at-scale"
      nextMeta="Writing & Copywriting · Lesson 3 of 7 · 12 min"
    />
  );
}
