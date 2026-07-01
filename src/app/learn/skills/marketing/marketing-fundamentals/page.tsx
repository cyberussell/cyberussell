import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Marketing Fundamentals — Marketing | Cyberussell", description: "What marketing actually is and how it works. The foundation that makes every other marketing skill make sense.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing/marketing-fundamentals" }, openGraph: { title: "Marketing Fundamentals | Cyberussell", description: "The core marketing concepts that underpin every strategy and tactic.", url: "https://www.cyberussell.com/learn/skills/marketing/marketing-fundamentals", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Marketing"
      skillHref="/learn/skills/marketing"
      lessonNum="1" lessonTotal="7"
      title="Marketing Fundamentals"
      subtitle="Marketing is not about tricks. It's about understanding people and communicating value."
      tags={["Fundamentals"]}
      readTime="12 min"
      objective="Explain your own product or service using the 4 Ps of marketing — and identify which element is your biggest weakness."
      sections={[
        { heading: "What Marketing Actually Is", body: "Marketing is the process of helping the right people discover, understand, and want what you offer.\n\nThat's it. Everything else — ads, social media, email, SEO, content — is just a channel for delivering that message. If you're unclear on who you're for and what you offer, no channel will save you." },
        { heading: "The 4 Ps of Marketing", items: [
          { title: "Product", desc: "What are you actually selling? What problem does it solve? What transformation does it deliver? If you can't describe your product in one clear sentence, your marketing will be confused. Clarity about your product is the foundation of everything else." },
          { title: "Price", desc: "What are you charging — and why? Price is a positioning signal. A ₱500 service feels different from a ₱50,000 service, even if the deliverable is similar. Price communicates value, quality, and who the offer is for." },
          { title: "Place", desc: "Where and how do people buy from you? Online? In person? Through referrals? Your distribution channel must match where your audience spends time and how they prefer to buy." },
          { title: "Promotion", desc: "How do you reach your target audience and communicate your message? Ads, content, referrals, PR, partnerships — promotion is where most people focus, but it only works when the other three Ps are solid." },
        ] },
        { heading: "The Buyer Journey", items: [
          { title: "Awareness", desc: "They discover you exist. They've never heard of you before this moment. Your job: reach them where they spend time and give them a reason to notice you." },
          { title: "Consideration", desc: "They're aware you exist and are evaluating whether you're right for them. Your job: provide enough information and proof (testimonials, demos, case studies) to build trust." },
          { title: "Decision", desc: "They're ready to buy. They just need a clear path and a reason to choose you over alternatives. Your job: remove friction from the purchase process and make the decision feel easy." },
        ] },
      ]}
      promptText={`Analyze my marketing using the 4 Ps framework. My product/service: [describe what you sell]. My target audience: [describe them]. My current price: [price]. My current distribution channel: [how people find and buy from you]. My current promotion channels: [where you market]. Tell me: 1) Which P is my weakest and why, 2) What specific improvement would have the biggest impact on my results, 3) How a competitor in my space is likely positioning differently, 4) One marketing tactic I should test in the next 30 days.`}
      checklistItems={["I can describe my product in one clear sentence", "I understand why my price is set where it is and what it signals", "I know exactly where my target customers spend time online and offline", "I've identified which stage of the buyer journey my marketing is weakest at"]}
      reflectText={`Most failed marketing is not failed promotion — it's a product, price, or positioning problem disguised as a promotion problem. <span class="text-white font-bold">If your promotion efforts aren't working, which of the other 3 Ps might actually be the root cause?</span>`}
      takeaways={["Marketing is helping the right people discover and want what you offer. Channels are just delivery mechanisms.", "The 4 Ps (Product, Price, Place, Promotion) are interdependent. Weakness in one undermines the others.", "The buyer journey (Awareness → Consideration → Decision) helps you diagnose where leads are getting stuck.", "Most marketing failures are product or positioning problems, not promotion problems."]}
      challengeTitle="Write out your 4 Ps in one paragraph each."
      challengeBody="Don't skip this — it's the most clarifying exercise in marketing. Write one honest paragraph each for your Product, Price, Place, and Promotion. Read them together. The weak paragraph tells you exactly where to focus next."
      nextTitle="Building a Marketing Strategy"
      nextHref="/learn/skills/marketing/building-a-marketing-strategy"
      nextMeta="Marketing · Lesson 2 of 7 · 10 min"
    />
  );
}
