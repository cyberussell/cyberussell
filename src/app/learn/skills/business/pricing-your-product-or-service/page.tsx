import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Pricing Your Product or Service — Business | Cyberussell", description: "How to price what you offer — not by guessing, but by understanding value, market, and your costs.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/business/pricing-your-product-or-service" }, openGraph: { title: "Pricing Your Product or Service | Cyberussell", description: "Set the right price for what you sell — using value-based pricing principles and AI.", url: "https://www.cyberussell.com/learn/skills/business/pricing-your-product-or-service", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Business"
      skillHref="/learn/skills/business"
      lessonNum="3" lessonTotal="7"
      title="Pricing Your Product or Service"
      subtitle="You are probably undercharging. Almost everyone starting out is."
      tags={["Pricing", "Revenue"]}
      readTime="10 min"
      objective="Set a defensible price for your product or service using value-based pricing principles — and build a simple pricing calculation that shows you the math."
      sections={[
        { heading: "The 3 Ways to Price (and Why 2 of Them Are Wrong)", items: [
          { title: "Cost-plus pricing (problematic)", desc: "Add a markup to your costs. Problem: it ignores what the customer values and what the market will pay. It ties your price to your costs, not to the outcome you deliver. Freelancers who calculate their 'hourly rate' and multiply by hours are doing cost-plus pricing." },
          { title: "Competitor pricing (limiting)", desc: "Charge what competitors charge. Problem: you don't know their costs, their margins, or why they set their prices where they did. You can end up in a race to the bottom. Competitor pricing is a starting point for research, not a pricing strategy." },
          { title: "Value-based pricing (correct)", desc: "Charge based on the value you deliver to the customer, not on your costs or what others charge. If your service saves a business ₱100,000 per year, pricing it at ₱20,000 per year is an easy yes for them — even if it costs you only ₱2,000 to deliver." },
        ] },
        { heading: "How to Apply Value-Based Pricing", items: [
          { title: "Step 1: Quantify the value", desc: "Ask: what does the customer gain from this? Revenue generated, cost saved, time freed up, risk avoided, problem eliminated. Make it specific: 'My clients save an average of 8 hours per week on social media, which at their billable rate of ₱500/hr = ₱4,000/week = ₱16,000/month.'" },
          { title: "Step 2: Price at a fraction of the value", desc: "A common rule: price at 10–20% of the value you deliver. If you save a client ₱16,000/month, pricing your service at ₱3,000–₱5,000/month is still a clear win for them." },
          { title: "Step 3: Test and observe", desc: "Set a price, offer it, and watch the response. If nobody hesitates at the price, you're undercharging. If everyone objects, you may have a value communication problem (or the price is too high). Price resistance is information." },
        ] },
      ]}
      promptText={`Help me set the right price for my offer. My offer: [describe exactly what you deliver]. The outcome the customer gets: [describe the specific benefit — time saved, revenue gained, problem eliminated]. Comparable services in my market: [describe what competitors charge if you know]. My target customer: [describe them — what size business, what budget range]. Help me: 1) Quantify the value I deliver in measurable terms, 2) Suggest 3 price points (low / mid / high) with the reasoning for each, 3) How to present my price so the value is clear before I name the number, 4) What to say if a client says 'that's too expensive.'`}
      checklistItems={["I can articulate the specific, quantifiable value my service delivers before naming a price", "I've identified what competitors charge and understand why my price is positioned differently", "I have 3 price options ready for different customer situations or value levels", "I know how to handle price objections by refocusing on value, not defending the number"]}
      reflectText={`Undercharging doesn't make clients appreciate you more. It often makes them value you less. <span class="text-white font-bold">If you raised your price by 30% tomorrow, would your best clients still hire you?</span>`}
      takeaways={["Value-based pricing: price based on the outcome delivered, not your costs or what competitors charge.", "Quantify the value before naming the price. If the client understands the value, the price makes sense.", "Price resistance is useful information. Adjust either the price or how you communicate the value.", "Almost every freelancer and early-stage business underprices. Raise your price and watch who stays."]}
      challengeTitle="Calculate the value you deliver in ₱."
      challengeBody="For your main service or product, complete this sentence: 'My client gets [specific result] which is worth ₱[amount] because [reason].' If you can't fill that in, you don't understand your own value yet — and neither will your clients. Spend 20 minutes with Claude figuring this out. Then compare what you deliver to what you charge."
      nextTitle="Finding Your First Customers"
      nextHref="/learn/skills/business/finding-your-first-customers"
      nextMeta="Business · Lesson 4 of 7 · 10 min"
    />
  );
}
