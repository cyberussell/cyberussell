import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Email Marketing — Marketing | Cyberussell", description: "Build and grow an email list that converts. Why email beats social — and how to do it right.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing/email-marketing" }, openGraph: { title: "Email Marketing | Cyberussell", description: "Build an email list that converts. Email beats every social platform for ROI.", url: "https://www.cyberussell.com/learn/skills/marketing/email-marketing", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Marketing"
      skillHref="/learn/skills/marketing"
      lessonNum="4" lessonTotal="7"
      title="Email Marketing"
      subtitle="You don't own your social following. You own your email list."
      tags={["Email", "List Building"]}
      readTime="10 min"
      objective="Set up an email list, a lead magnet to grow it, and a 3-email welcome sequence using AI."
      sections={[
        { heading: "Why Email Beats Social Media", body: "When you post on Instagram, Meta decides who sees it. The average organic post reaches 1–5% of your followers. Email reaches 20–40% of your list on average — and you control it.\n\nWhen Instagram or TikTok disappears (or bans your account), your email list survives. It's the only audience you truly own." },
        { heading: "The Email Marketing Ecosystem", items: [
          { title: "Email service provider (ESP)", desc: "You need a platform to manage your list, design emails, and track results. Best for beginners: MailerLite (free up to 1,000 subscribers), ConvertKit (creator-focused), or Brevo (formerly Sendinblue). All have automation, landing pages, and templates built in." },
          { title: "The lead magnet", desc: "No one gives you their email for nothing. You need a lead magnet — a free resource people actually want. Best-performing types: checklist, template, mini-guide, free mini-course, resource list, discount code. The lead magnet must be immediately useful and directly related to what you sell." },
          { title: "The welcome sequence", desc: "When someone joins your list, send them a 3–5 email sequence over the first week. Email 1: Deliver the lead magnet + introduce yourself. Email 2: Your story + why this matters. Email 3: Your best content or insight. Email 4 (optional): Your offer with context. Email 5 (optional): Social proof + CTA. This sequence does the relationship-building work for you automatically." },
        ] },
        { heading: "Growing Your List", items: [
          { title: "Where to promote your lead magnet", desc: "Link in bio on every platform. Dedicated landing page. In the caption of your best-performing content posts. As a CTA at the end of every blog post or video. In your email signature. In conversation with anyone who asks what you do." },
          { title: "What to send (and how often)", desc: "Once a week maximum for most creators. Twice a month is sustainable and still builds the relationship. One topic per email. A genuine point of view. A clear link or CTA. No fluff just to fill space." },
        ] },
      ]}
      promptText={`Help me build an email marketing system. My niche: [your niche]. My offer: [what I ultimately sell]. My target audience: [describe them]. First, help me: 1) Generate 5 lead magnet ideas that would attract my ideal audience (they should be immediately useful and directly related to my offer), 2) Write a landing page headline and subheadline for my lead magnet, 3) Draft a 3-email welcome sequence: Email 1 (deliver lead magnet + intro), Email 2 (my story + why I do this), Email 3 (my best advice + soft CTA to my offer). Keep each email under 200 words.`}
      checklistItems={["I've signed up for an email service provider (MailerLite or ConvertKit)", "I have a lead magnet created or a clear plan to create one this week", "I have a landing page or link in bio pointing to my lead magnet signup", "I've written at least a 3-email welcome sequence"]}
      reflectText={`You could build 100,000 Instagram followers and lose them overnight if your account gets banned or the algorithm changes. <span class="text-white font-bold">If social media disappeared tomorrow, how would you reach your audience?</span>`}
      takeaways={["Email reaches 20–40% of subscribers vs 1–5% organic social reach. Email wins on distribution.", "You own your email list. You don't own your social following. Build the asset you control.", "A lead magnet that's immediately useful and relevant to your offer is the foundation of list growth.", "A welcome sequence does the relationship-building for you automatically. Set it up once, run forever."]}
      challengeTitle="Create your lead magnet and set up your email list this week."
      challengeBody="Pick one lead magnet idea from the prompt above. Create it in under 2 hours (a simple PDF or checklist in Canva works). Set up a free MailerLite account. Create a landing page. Write your 3-email welcome sequence. Add your signup link to every bio and your next 3 posts. You now have the foundation of an email marketing system."
      nextTitle="Organic Social Media Marketing"
      nextHref="/learn/skills/marketing/organic-social-media-marketing"
      nextMeta="Marketing · Lesson 5 of 7 · 10 min"
    />
  );
}
