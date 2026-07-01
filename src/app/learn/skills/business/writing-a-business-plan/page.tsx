import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Writing a Business Plan — Business | Cyberussell", description: "Write a practical business plan that actually guides your business — not a 50-page document nobody reads.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/business/writing-a-business-plan" }, openGraph: { title: "Writing a Business Plan | Cyberussell", description: "Write a practical, action-focused business plan with AI assistance.", url: "https://www.cyberussell.com/learn/skills/business/writing-a-business-plan", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Business"
      skillHref="/learn/skills/business"
      lessonNum="2" lessonTotal="7"
      title="Writing a Business Plan"
      subtitle="A business plan is not a document. It's a set of decisions."
      tags={["Planning", "Strategy"]}
      readTime="10 min"
      objective="Write a one-page business plan that clarifies your offer, audience, revenue model, and 90-day action plan — using AI to structure and stress-test your thinking."
      sections={[
        { heading: "The Business Plan Most People Write vs The One That Actually Works", body: "Traditional business plans are 50-page documents full of projections, charts, and market analysis that nobody reads after they're written. They take months and are usually wrong within 3 months of launching.\n\nA better business plan is a 1-page document that answers 6 essential questions. Update it quarterly. Use it to make decisions, not to impress investors." },
        { heading: "The 6-Question Business Plan", items: [
          { title: "1. What is the problem you solve?", desc: "Describe the specific pain your customer feels. Be concrete: not 'freelancers struggle with clients' but 'Filipino freelancers waste 5+ hours per week on invoicing and client communication because they have no system'." },
          { title: "2. Who exactly is your customer?", desc: "One specific person, not a demographic range. 'Maria, a 28-year-old graphic designer from Cebu who just started freelancing and has 3 clients but no business systems.' The more specific, the better your decisions." },
          { title: "3. What is your solution?", desc: "What exactly do you sell? Not your company or your vision — the specific product or service the customer pays for." },
          { title: "4. How do you make money?", desc: "Your revenue model: per-project, retainer, subscription, product sale. What does it cost to deliver your service? What can you charge? Is the math viable?" },
          { title: "5. How do customers find you?", desc: "Your primary customer acquisition channel. Be specific. 'I get clients through referrals from past clients and LinkedIn outreach to small business owners.' Not 'social media'." },
          { title: "6. What are the 3 priorities for the next 90 days?", desc: "The 3 things that, if done, would make the business meaningfully better. Not 20 things — 3. These become your weekly to-do list." },
        ] },
      ]}
      promptText={`Help me write a one-page business plan. My business idea: [describe it]. The problem I solve: [describe the specific pain]. My target customer: [describe them as a specific person, not a demographic]. My product or service: [what exactly I'm selling]. My intended price: [price]. How I'll get customers: [your acquisition channel]. Help me: 1) Stress-test each section — what's weak or unclear?, 2) Identify the biggest assumption I'm making that needs to be validated, 3) Help me write the 3 90-day priorities that will determine whether this business succeeds or fails, 4) What does success look like at the end of 90 days in concrete, measurable terms?`}
      checklistItems={["I've answered all 6 business plan questions in one paragraph each", "I know who my specific customer is and can describe them as one person", "My revenue model math makes sense (cost to deliver vs price charged vs target income)", "I have 3 specific priorities for the next 90 days"]}
      reflectText={`The purpose of a business plan is not to have one. It's to force clarity on decisions you'll have to make every week. <span class="text-white font-bold">When you're unsure what to do next week, does your current plan give you the answer?</span>`}
      takeaways={["A one-page plan that you use beats a 50-page plan you don't read. Write to decide, not to impress.", "The 6 questions: Problem, Customer, Solution, Revenue model, Acquisition channel, 90-day priorities.", "The biggest assumption in every business plan is 'people will pay for this.' Validate it before expanding the plan.", "Update your business plan every quarter. It should evolve as you learn from real customers."]}
      challengeTitle="Write your one-page business plan in the next hour."
      challengeBody="Open a document. Answer the 6 questions. One paragraph each. Don't overthink — write what you currently believe, knowing you'll update it. Paste it into Claude for feedback. Make one revision based on the most important piece of feedback. You now have a business plan."
      nextTitle="Pricing Your Product or Service"
      nextHref="/learn/skills/business/pricing-your-product-or-service"
      nextMeta="Business · Lesson 3 of 7 · 10 min"
    />
  );
}
