import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Email Writing: Newsletters, Cold Outreach, and Sequences — Writing & Copywriting | Cyberussell", description: "Use Claude to draft emails that get opened, read, and replied to.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/writing-copywriting/email-writing" }, openGraph: { title: "Email Writing with AI | Cyberussell", description: "Write emails that get opened, read, and replied to.", url: "https://www.cyberussell.com/learn/skills/writing-copywriting/email-writing", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Writing & Copywriting"
      skillHref="/learn/skills/writing-copywriting"
      lessonNum="5" lessonTotal="7"
      title="Email Writing: Newsletters, Cold Outreach, and Sequences"
      subtitle="Email has the highest ROI of any marketing channel. But only if people open and read it."
      tags={["Email"]}
      readTime="10 min"
      objective="Write a cold outreach email and a newsletter using AI — with subject lines that get opened and body copy that drives clicks."
      sections={[
        { heading: "The 3 Types of Email and What Makes Each Work", items: [
          { title: "Cold outreach email", desc: "Purpose: get a response from someone who doesn't know you. Rules: short (under 100 words), specific (mention something real about them), one ask only, and no attachments. The goal is to start a conversation, not close a sale in one email." },
          { title: "Newsletter", desc: "Purpose: build trust, educate, and stay top-of-mind with your audience over time. Rules: one main topic per issue, write like you're talking to one person, always have a point of view, end with one CTA. Consistency beats quality every week." },
          { title: "Email sequence (drip)", desc: "Purpose: take a subscriber through a journey — from stranger to buyer. Each email in the sequence does one job: build trust, overcome an objection, demonstrate value, or make an offer. 5-7 emails, 2-3 days apart." },
        ] },
        { heading: "The Subject Line is 50% of Your Email", items: [
          { title: "What gets emails opened", desc: "Curiosity ('You're doing this wrong'), specificity ('3 clients in 7 days — here's how'), relevance ('If you're a freelancer in the Philippines, read this'), urgency ('Last chance — closing tonight'), personalization (their name or situation)." },
          { title: "What kills open rates", desc: "Salesy language ('Incredible deal inside!!!'), vague subject lines ('Newsletter #4'), ALL CAPS, obvious clickbait ('You won't believe this'), or anything that looks like a mass email." },
        ] },
      ]}
      promptText={`Write [a cold outreach email / a newsletter / email sequence] for [describe your purpose and audience]. Context: [explain what you're trying to achieve]. For cold outreach: the recipient is [describe them], I want to ask about [your ask], and one genuine thing I can mention about them is [specific detail]. For newsletter: the topic this week is [topic], my main point is [your perspective], and the CTA is [what you want them to do]. Keep it conversational, not salesy. Max 200 words.`}
      checklistItems={["My cold outreach email is under 100 words with one clear ask", "My subject line uses curiosity, specificity, or relevance — not generic phrases", "My newsletter sounds like it was written to one person, not a list", "I have a draft sequence of at least 3 emails for a new subscriber"]}
      reflectText={`Think about the last email that made you click or reply. What was the subject line? What was the first sentence? <span class="text-white font-bold">What did the writer do in those first 5 seconds to earn your attention?</span>`}
      takeaways={["Cold outreach that works is short, personal, and makes one clear ask. Templates get deleted.", "Your subject line determines whether any of your email copy gets read. Write 5 options before choosing one.", "Newsletters build trust over time — only if they're consistent and have a genuine point of view.", "An email sequence is a trust-building journey. Don't make an offer until you've provided real value first."]}
      challengeTitle="Write a 5-email welcome sequence for new subscribers."
      challengeBody="Use Claude to draft a 5-email sequence for someone who just joined your email list. Email 1: Welcome and what to expect. Email 2: Your story. Email 3: Your best piece of content. Email 4: A common mistake your audience makes. Email 5: Your offer. This is the foundation of email marketing."
      nextTitle="Writing for Social Media: Short-Form That Gets Attention"
      nextHref="/learn/skills/writing-copywriting/writing-for-social-media"
      nextMeta="Writing & Copywriting · Lesson 6 of 7 · 8 min"
    />
  );
}
