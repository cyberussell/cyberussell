import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Facebook and Instagram Ads — Marketing | Cyberussell", description: "Run your first Facebook or Instagram ad campaign. Targeting, creative, copy, and how to read results.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing/facebook-and-instagram-ads" }, openGraph: { title: "Facebook and Instagram Ads | Cyberussell", description: "Run your first Facebook or Instagram ad — targeting, creative, copy, and reading results.", url: "https://www.cyberussell.com/learn/skills/marketing/facebook-and-instagram-ads", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Marketing"
      skillHref="/learn/skills/marketing"
      lessonNum="3" lessonTotal="7"
      title="Facebook and Instagram Ads"
      subtitle="Paid ads amplify what's already working. They don't fix what isn't."
      tags={["Paid Ads", "Meta"]}
      readTime="12 min"
      objective="Set up your first Facebook or Instagram ad campaign with correct targeting, ad creative, and copy — and know how to read the results."
      sections={[
        { heading: "Before You Spend One Peso on Ads", body: "Ads amplify what already works organically. If your offer, landing page, and message aren't converting from free traffic, ads will just show your broken funnel to more people faster.\n\nBefore running ads: test your offer organically, make sure your landing page converts (3–5% minimum), and have a clear answer to 'what happens after they click?'" },
        { heading: "The Meta Ads Structure", items: [
          { title: "Campaign level", desc: "This is where you set your objective. Awareness, Traffic, Engagement, Leads, or Sales. Choose based on what you actually want people to do. Most beginners should choose Traffic or Leads, not Awareness." },
          { title: "Ad set level", desc: "This is where you set your audience, placement, and budget. Start with one ad set, one audience. Detailed targeting: interests + demographics. Or better — use Advantage+ audience and let Meta's AI find your people. Budget: ₱200–₱500/day to test." },
          { title: "Ad level", desc: "This is your actual creative and copy. One image or video. Headline (under 40 characters). Primary text (first 3 lines are what people see before 'see more'). CTA button. Start with one ad creative and test from there." },
        ] },
        { heading: "Writing Ad Copy with AI", items: [
          { title: "The ad copy formula", desc: "Hook line (stops the scroll) → Problem (they recognize themselves) → Solution (your offer as the way out) → Proof (one specific result or social proof) → CTA (one clear action). This formula works because it follows the buyer's natural thought process." },
          { title: "Key metrics to track", desc: "CTR (click-through rate): target 1%+ for good creative. CPC (cost per click): varies by niche, but ₱5–₱25 is typical in the Philippines. ROAS (return on ad spend): you want to earn back at least ₱3 for every ₱1 spent. If not, fix the offer or page before scaling." },
        ] },
      ]}
      promptText={`Write Facebook/Instagram ad copy for my offer. My offer: [describe what you're selling]. Price: [price]. Target audience: [describe them — age, interests, situation, problem they have]. Goal: [clicks to landing page / lead form / direct messages]. Write: 1) 3 different hook options for the primary text (first 2 lines), 2) Full ad copy using the formula (Problem → Solution → Proof → CTA) under 150 words, 3) 3 headline options (under 40 characters each), 4) The CTA button I should use. Voice: [describe your tone].`}
      checklistItems={["My landing page converts from organic traffic before I run ads", "I've set up a Facebook Business Manager account and Meta Pixel", "I've written at least 3 ad copy variations to test", "I know what CTR and CPC benchmarks to watch for my niche"]}
      reflectText={`Ads are a lever that multiplies your existing results — positive or negative. <span class="text-white font-bold">If you spent ₱500/day promoting your current offer, are you confident the math would work?</span>`}
      takeaways={["Fix your funnel before running ads. Paid traffic amplifies what's already happening, good or bad.", "Meta Ads structure: Campaign (objective) → Ad Set (audience + budget) → Ad (creative + copy).", "Start with one audience, one creative, low budget. Test and scale what works, kill what doesn't.", "Track CTR (aim for 1%+) and ROAS (aim for 3x+). If you're not hitting these, fix the creative before scaling."]}
      challengeTitle="Write 3 ad copy variations and choose your first test creative."
      challengeBody="Use the prompt above to generate 3 versions of ad copy for your offer. Choose the strongest one and pair it with either a photo or short video. Set up the ad in Meta Ads Manager with a ₱200/day budget and let it run for 3 days. Then check your CTR and CPC before deciding whether to scale or adjust."
      nextTitle="Email Marketing"
      nextHref="/learn/skills/marketing/email-marketing"
      nextMeta="Marketing · Lesson 4 of 7 · 10 min"
    />
  );
}
