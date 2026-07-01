import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Marketing for Freelancers and Small Businesses — Marketing | Cyberussell", description: "Low-budget, high-impact marketing strategies for freelancers, solopreneurs, and small businesses.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing/marketing-for-freelancers-and-small-businesses" }, openGraph: { title: "Marketing for Freelancers and Small Businesses | Cyberussell", description: "High-impact, low-budget marketing strategies for freelancers and small business owners.", url: "https://www.cyberussell.com/learn/skills/marketing/marketing-for-freelancers-and-small-businesses", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Marketing"
      skillHref="/learn/skills/marketing"
      lessonNum="7" lessonTotal="7"
      title="Marketing for Freelancers and Small Businesses"
      subtitle="You don't need a big budget. You need the right strategy for your size."
      tags={["Freelance", "Small Business"]}
      readTime="10 min"
      objective="Build a simple, zero-budget marketing system using referrals, content, and direct outreach — designed for freelancers and small businesses."
      sections={[
        { heading: "Marketing at Your Scale Is Different", body: "Fortune 500 marketing advice is built for companies with millions in budget, full-time teams, and existing brand recognition. That's not you.\n\nFreelancers and small businesses win on personal relationships, niche expertise, and referrals — not brand campaigns and Super Bowl ads. Your advantage is the ability to be specific and personal in ways that large companies can't." },
        { heading: "The 3 Best Zero-Budget Marketing Channels", items: [
          { title: "Referrals (highest ROI)", desc: "Ask every satisfied client for a referral. This feels uncomfortable. It works. A simple system: at the end of every successful project, say 'Do you know anyone else who might need this? I'd love to help them too.' Most freelancers get 50–80% of new clients from referrals but never ask for them systematically." },
          { title: "Content marketing (compound over time)", desc: "Share your expertise publicly. A Filipino freelancer who regularly posts about their specific skill — with examples, case studies, and useful advice — attracts inbound clients. This takes 6–12 months to compound, but clients who come to you are easier to close than those you approach cold." },
          { title: "Direct outreach (fastest results)", desc: "Identify exactly who your ideal clients are. Find them on LinkedIn, Facebook, Instagram, or in local business groups. Send a personal, specific message about their situation and how you can help. Not a template — a real message showing you've done your homework." },
        ] },
        { heading: "AI-Assisted Marketing for Small Budgets", items: [
          { title: "Outreach at scale", desc: "Use Claude to research prospects and generate personalized outreach messages at scale. Still review and personalize each one — but AI speeds up the research and drafting 5–10x." },
          { title: "Content without a team", desc: "Use AI to generate content ideas, write first drafts, repurpose content across platforms, and write email sequences. You get agency-level content output at solo-operator cost." },
          { title: "Proposal and quote generation", desc: "Use AI to write faster, more professional proposals. A well-crafted proposal is a marketing document — it communicates your expertise, process, and value before the client even decides to hire you." },
        ] },
      ]}
      promptText={`I'm a freelancer/small business owner offering [your service/product]. My ideal client is [describe them specifically — industry, company size, problem they have]. I have [zero / a small] budget for marketing. Help me: 1) Write a referral request script I can send to my 5 best past clients (genuine, not pushy), 2) Write a direct outreach message template for my ideal client profile on LinkedIn/Facebook, 3) Suggest 5 content ideas that would attract my ideal client and demonstrate my expertise, 4) Create a 30-day marketing action plan I can execute with less than 1 hour per day.`}
      checklistItems={["I've sent referral requests to my top 5 past clients", "I've written a personalized outreach message to at least 3 potential ideal clients", "I've posted one piece of content this week demonstrating my expertise", "I have a simple CRM or tracking system to follow up with prospects"]}
      reflectText={`The best freelancers aren't always the most skilled — they're the most visible and trusted in their niche. <span class="text-white font-bold">If your ideal client searched for someone with your exact skills on LinkedIn right now, would they find you?</span>`}
      takeaways={["Referrals have the highest ROI of any channel. Ask every satisfied client systematically.", "Content marketing takes 6–12 months to compound but produces the highest quality inbound leads.", "Direct outreach is the fastest path to new clients — but it requires genuine personalization, not templates.", "AI gives solo operators agency-level content and outreach capability. Use it to punch above your weight."]}
      challengeTitle="Message 5 past clients asking for referrals today."
      challengeBody="Write a genuine, personal message to your 5 best past clients using the referral script Claude generates. Send them today. Not tomorrow. Not next week. Today. You'll get at least one response. That one response pays for everything in this track."
      nextTitle="Continue with Programming"
      nextHref="/learn/skills/programming"
      nextMeta="Build Real Skills · Pillar 5 · Programming Track"
    />
  );
}
