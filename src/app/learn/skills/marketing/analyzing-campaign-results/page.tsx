import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Analyzing Campaign Results — Marketing | Cyberussell", description: "How to read marketing data, identify what's working, and make better decisions with AI.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/marketing/analyzing-campaign-results" }, openGraph: { title: "Analyzing Campaign Results | Cyberussell", description: "Read marketing analytics and make better decisions with AI assistance.", url: "https://www.cyberussell.com/learn/skills/marketing/analyzing-campaign-results", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Marketing"
      skillHref="/learn/skills/marketing"
      lessonNum="6" lessonTotal="7"
      title="Analyzing Campaign Results"
      subtitle="Data without interpretation is just noise. Learn to turn numbers into decisions."
      tags={["Analytics", "Data"]}
      readTime="8 min"
      objective="Analyze the results of a recent marketing campaign using AI — and identify one specific change to make based on the data."
      sections={[
        { heading: "The Only Reason to Analyze Data", body: "The purpose of marketing analytics is to answer one question: should I do more of this, less of this, or something different?\n\nIf your analysis doesn't lead to a clear action, you're collecting data, not using it. Every analytics session should end with a decision." },
        { heading: "The Key Metrics by Channel", items: [
          { title: "Social media organic", desc: "Reach: how many people saw it. Engagement rate: (likes + comments + shares + saves) ÷ reach. Profile visits from this post. Follows gained. What to optimize: posts with the highest saves and shares — those signal real value." },
          { title: "Paid ads (Meta)", desc: "CTR: click-through rate (aim for 1%+). CPC: cost per click. CPL: cost per lead. ROAS: revenue ÷ ad spend (aim for 3x+). What to do if ROAS is below 2x: pause, fix the offer or landing page, retest." },
          { title: "Email marketing", desc: "Open rate (aim for 25%+): driven by subject lines. Click rate (aim for 3%+): driven by content and CTA. Unsubscribe rate (alarm if above 0.5%): driven by content relevance. What to optimize: test 2 subject line variations and track open rates over 3 sends." },
          { title: "Website / landing pages", desc: "Conversion rate: visitors ÷ actions taken. Aim for 3–5% on lead gen, 1–3% on e-commerce. Bounce rate: % who leave without taking action. Heatmaps (use Hotjar) show where people click and where they stop reading." },
        ] },
        { heading: "How AI Helps You Analyze Faster", body: "Paste your analytics data into Claude and ask for analysis. It can identify patterns, suggest what to test next, and explain which metrics matter for your specific goal — in plain language without spreadsheet expertise." },
      ]}
      promptText={`Analyze my marketing results and tell me what to do next. Channel: [social / email / paid ads / website]. My goal was: [describe the campaign goal]. Here are my results: [paste your data — whatever metrics you have]. Specifically tell me: 1) Which number is the most important indicator of success or failure, 2) What's the most likely reason for the results I'm seeing, 3) What is the ONE thing I should change or test next, 4) What would I need to see in the next 30 days to know it's working. Don't give me a list of 10 recommendations — give me one clear action.`}
      checklistItems={["I've identified the one metric most important for my current goal", "I've compared this period's results to the previous period", "I've identified whether the problem is reach, engagement, click-through, or conversion", "I have one specific action to take based on what the data shows"]}
      reflectText={`Most marketers analyze the wrong thing. They check vanity metrics (likes, follower count) and ignore business metrics (leads, conversions, revenue). <span class="text-white font-bold">What metrics are you currently tracking — and do they actually tell you whether your marketing is making money?</span>`}
      takeaways={["Analytics only matter if they lead to a decision. Every analysis session should end with one action.", "Saves and shares = organic. CTR and ROAS = paid. Open and click rate = email. Know your channel's key metric.", "AI can analyze raw analytics data and give you plain-language recommendations — paste your numbers in.", "One focused experiment beats ten unfocused changes. Test one variable at a time."]}
      challengeTitle="Run a 30-minute analytics review on your last 30 days of marketing."
      challengeBody="Pull the data from whichever channels you used in the last 30 days. Paste it into Claude with the analysis prompt above. Get one clear recommendation. Implement that one change this week. Schedule your next analytics review in 30 days."
      nextTitle="Marketing for Freelancers and Small Businesses"
      nextHref="/learn/skills/marketing/marketing-for-freelancers-and-small-businesses"
      nextMeta="Marketing · Lesson 7 of 7 · 10 min"
    />
  );
}
