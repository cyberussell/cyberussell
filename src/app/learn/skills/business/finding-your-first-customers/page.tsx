import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Finding Your First Customers — Business | Cyberussell", description: "How to find and close your first paying customers — without ads, an audience, or an established reputation.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/business/finding-your-first-customers" }, openGraph: { title: "Finding Your First Customers | Cyberussell", description: "Get your first paying customers with direct outreach, referrals, and communities.", url: "https://www.cyberussell.com/learn/skills/business/finding-your-first-customers", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Business"
      skillHref="/learn/skills/business"
      lessonNum="4" lessonTotal="7"
      title="Finding Your First Customers"
      subtitle="Your first customers come from relationships, not algorithms."
      tags={["Sales", "Customer Acquisition"]}
      readTime="10 min"
      objective="Identify your first 5 potential customers and reach out to at least 3 of them using a personalized, value-first approach — with AI helping you craft the messages."
      sections={[
        { heading: "The Mistake Early-Stage Businesses Make", body: "Most new business owners want to find customers through content, ads, or SEO before they have any customers at all. These channels work — but they take months and require an audience or budget.\n\nYour first customers won't come from your content. They'll come from your personal network, direct outreach, and referrals. These channels are available to you on day one." },
        { heading: "The 5 Places Your First Customers Come From", items: [
          { title: "1. Your existing network", desc: "People who already know, like, and trust you. Former colleagues, classmates, family friends, people from your church or community. Start by telling everyone you know what you offer. You'll be surprised how many people say 'I know someone who needs that.'" },
          { title: "2. Online communities", desc: "Facebook Groups, Reddit communities, Discord servers, LinkedIn groups where your target clients spend time. Provide genuine value — answer questions, share useful insights. Build reputation before pitching. Then when the right moment comes, mention what you do." },
          { title: "3. Direct outreach", desc: "Identify exactly who your ideal client is. Find them on LinkedIn, Facebook, or Instagram. Send a personalized message showing you understand their specific situation and have a relevant solution. Not a mass template — a real, researched message to one person at a time." },
          { title: "4. Freelance platforms", desc: "Upwork, Fiverr, OnlineJobs.ph, Freelancer.com. Platforms where clients are actively looking for help. Good for getting initial paid experience and testimonials, even if the rates are lower than your target market. A strong profile with 5 reviews opens doors." },
          { title: "5. Partnerships and referrals", desc: "Partner with non-competing businesses that serve the same customers you do. A web designer might refer clients to a copywriter. A business coach might refer clients to a bookkeeper. Build these relationships before you need them." },
        ] },
      ]}
      promptText={`I'm trying to find my first customers for [describe your business/offer]. My ideal customer: [describe them specifically]. I have [describe what's available to you — existing network of X people, social following of X, LinkedIn connections, etc.]. Help me: 1) Identify 3 specific places I can find my first 5 customers right now, 2) Write a personalized outreach message for my ideal customer on [platform], 3) What to say when they respond and ask for more details, 4) The exact next step if they say yes vs. if they say no, 5) A follow-up message if I don't hear back in 5 days.`}
      checklistItems={["I've told everyone in my personal network what I offer", "I've identified at least 5 specific potential customers I can reach out to by name", "I've sent at least 3 personalized outreach messages", "I have a clear answer ready for 'What do you charge?' and 'Can I see some of your work?'"]}
      reflectText={`Your first paying customer changes everything — the psychology of the business, your confidence, your validation that the idea works. <span class="text-white font-bold">Who is one specific person in your network who might need what you offer — or know someone who does?</span>`}
      takeaways={["First customers come from your network and direct outreach — not content or ads.", "Tell everyone you know what you do. Word of mouth is the most underused acquisition channel.", "Personalization is the difference between outreach that gets responses and outreach that gets ignored.", "A 'no' is not a rejection. It's information about fit. Keep the relationship, ask for a referral."]}
      challengeTitle="Send 3 personalized outreach messages today."
      challengeBody="Identify 3 specific people who might benefit from what you offer or know someone who would. Write a personalized message to each one using the approach above — not a template, a real message about their specific situation. Send all 3 today. Track responses. This is your first customer acquisition activity."
      nextTitle="Financial Basics"
      nextHref="/learn/skills/business/financial-basics"
      nextMeta="Business · Lesson 5 of 7 · 10 min"
    />
  );
}
