import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = {
  title: "Launching, Testing, and Getting Feedback — Website Creation | Cyberussell",
  description: "How to ship your first version and use AI to iterate based on real feedback. Done is better than perfect.",
  alternates: { canonical: "https://www.cyberussell.com/learn/skills/website-creation/launching-testing-and-getting-feedback" },
  openGraph: { title: "Launching, Testing, and Getting Feedback | Cyberussell", description: "Ship your first version and iterate with AI.", url: "https://www.cyberussell.com/learn/skills/website-creation/launching-testing-and-getting-feedback", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" },
};

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Website Creation"
      skillHref="/learn/skills/website-creation"
      lessonNum="7" lessonTotal="7"
      title="Launching, Testing, and Getting Feedback"
      subtitle="The launch is not the end. It's the beginning of the real work."
      tags={["Launch"]}
      readTime="10 min"
      objective="Ship your site, run a basic pre-launch test, collect structured feedback, and use AI to prioritize what to fix next."
      sections={[
        {
          heading: "The Pre-Launch Checklist",
          items: [
            { title: "Mobile test", desc: "Open your site on your phone. Check that text is readable, buttons are tappable, and nothing is cut off. More than half of your visitors will use mobile." },
            { title: "Link check", desc: "Click every button and link. Make sure your CTA goes somewhere. Broken links lose clients instantly." },
            { title: "Contact form test", desc: "Fill out and submit your contact form. Did you actually receive the test email? If not, fix it before launch." },
            { title: "Grammar check", desc: "Paste your copy into ChatGPT and ask it to check for errors. Fresh eyes catch what you've stopped seeing." },
            { title: "Load speed", desc: "Open Chrome DevTools (F12) → Network tab. Reload the page. If it takes over 3 seconds, you need to compress your images." },
          ]
        },
        {
          heading: "How to Collect Useful Feedback",
          body: "Not all feedback is useful. 'I don't like the color blue' isn't actionable. Feedback that tells you whether your site does its job — that's what you want.\n\nSend your site to 3 people: one who knows your industry, one who doesn't, and one who represents your target client. Ask specific questions, not 'what do you think?'",
          items: [
            { title: "Questions to ask feedback givers", desc: "1) What do you think I do? 2) Who do you think my ideal client is? 3) What would stop you from contacting me? 4) What's the first thing you'd change?" },
          ]
        },
        {
          heading: "Using AI to Prioritize Improvements",
          body: "After collecting feedback, don't try to fix everything at once. Use AI to help you decide what matters most.",
        },
      ]}
      promptText={`I just launched my website and collected this feedback: [paste the feedback]. Help me: 1) Identify the 3 most important issues to fix first, 2) Categorize the rest as 'fix soon' or 'nice to have later', 3) Suggest specific changes for each of the top 3 issues. Focus on changes that would most affect whether a potential client contacts me.`}
      checklistItems={["Site tested on mobile — layout looks correct", "All links and buttons work correctly", "Contact form tested and receiving emails", "I've collected feedback from at least 2 people", "I have a prioritized list of improvements"]}
      reflectText={`Most people never launch because they're waiting for 'perfect'. <span class="text-white font-bold">What's the real cost of waiting another month to launch versus shipping something good today?</span>`}
      takeaways={[
        "A live imperfect site creates opportunities. A perfect offline site creates nothing.",
        "Test on mobile first. Most of your visitors will use their phone — design for that.",
        "Specific feedback questions get specific useful answers. 'What do you think?' gets useless answers.",
        "Use AI to prioritize feedback — not all issues are equally important to your business goal.",
      ]}
      challengeTitle="Share your live site URL with one potential client today."
      challengeBody="Not a friend. Not a family member. One actual potential client or someone in your professional network. Their reaction — even if they just acknowledge it — is more valuable than any amount of additional tweaking."
      nextTitle="Continue with SEO"
      nextHref="/learn/skills/seo"
      nextMeta="Build Real Skills · Pillar 5 · SEO Track"
    />
  );
}
