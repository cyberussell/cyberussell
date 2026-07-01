import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Scaling: When and How to Grow — Business | Cyberussell", description: "When to scale, what to scale, and how to grow without losing quality or burning out.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/business/scaling-when-and-how-to-grow" }, openGraph: { title: "Scaling: When and How to Grow | Cyberussell", description: "Understand when and how to scale your business sustainably.", url: "https://www.cyberussell.com/learn/skills/business/scaling-when-and-how-to-grow", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Business"
      skillHref="/learn/skills/business"
      lessonNum="7" lessonTotal="7"
      title="Scaling: When and How to Grow"
      subtitle="Growth before foundation is just chaos at scale."
      tags={["Growth", "Scaling"]}
      readTime="10 min"
      objective="Identify whether your business is ready to scale and define one growth lever to pull — without compromising quality or burning out."
      sections={[
        { heading: "The Signs You're Ready to Scale", body: "Scaling a broken business just makes it break faster. Before growing, make sure you have: a proven offer (clients are getting results), a repeatable delivery process (you can do it consistently), stable revenue (you're profitable month-over-month), and capacity constraints (you're turning away work or can't take more clients at your current rates).\n\nIf those four things are true, you're ready to scale. If not, fix the foundation first." },
        { heading: "The 4 Ways to Scale", items: [
          { title: "Raise your prices", desc: "The simplest and most overlooked form of scaling. If you can charge ₱20,000 per project instead of ₱10,000, you double your revenue with the same number of clients. This is the first lever to pull — before hiring or expanding. Higher prices also filter for better clients." },
          { title: "Increase volume with systems", desc: "Deliver more projects in the same time by building better systems: SOPs, templates, automation, AI tools. If you can serve 3 clients at the same quality as 1, you've scaled without hiring anyone." },
          { title: "Hire and delegate", desc: "Contract out the parts of your work that don't require you specifically: admin, social media management, parts of delivery. Start with contractors, not employees. Delegation only works if you have documented systems (SOPs) for what you're delegating." },
          { title: "Add revenue streams", desc: "Add products alongside services: a digital template, a course, a group program. These generate income outside your time. Build these only after your primary offer is stable — productized services come before courses." },
        ] },
        { heading: "AI as a Scaling Tool", body: "AI is one of the most powerful scaling tools for solo operators and small teams. Claude can handle first drafts of client deliverables, customer support responses, research, proposal writing, and content — tasks that would otherwise require additional headcount.\n\nA solo operator using AI well can do the work of a 3-person team. This is the scaling advantage that wasn't available even 3 years ago." },
      ]}
      promptText={`I want to scale my [describe your business]. Currently: [number] clients, [monthly revenue], [hours worked per week]. My current bottleneck is: [describe what's limiting your growth — time, capacity, price, clients, skills]. Help me: 1) Identify which of the 4 scaling levers (price, systems, delegation, new revenue streams) is most appropriate for my current situation, 2) A 90-day scaling plan with specific milestones, 3) What I would need to have in place before delegating any part of my work, 4) The risks of scaling too fast in my specific situation and how to mitigate them, 5) What 'success' looks like at the end of 12 months if this scaling plan works.`}
      checklistItems={["I've confirmed my business has a proven offer, repeatable process, stable revenue, and capacity constraint", "I've identified which of the 4 scaling levers to pull first", "I have a 90-day scaling plan with specific milestones", "I understand the risks of scaling too fast and have a plan to mitigate them"]}
      reflectText={`Most people want to scale before they've built something worth scaling. The hard truth is that fixing a broken foundation is always faster than scaling around it. <span class="text-white font-bold">If you scaled your current business by 3x tomorrow, would it be 3x better — or 3x more chaotic?</span>`}
      takeaways={["Scale only after you have a proven offer, repeatable delivery, stable revenue, and capacity constraints.", "The first scaling lever: raise your prices. Before hiring, before expanding, before productizing.", "AI lets solo operators deliver the output of a small team. Use it before hiring humans.", "Delegation requires documented systems. You cannot delegate what only exists in your head."]}
      challengeTitle="Identify your first scaling lever and your first milestone."
      challengeBody="Based on your current situation, write down: 1) Which of the 4 scaling levers you'll pull first and why, 2) What you'll do differently starting next month, 3) What success looks like in 90 days with a specific, measurable outcome. Share this with Claude for feedback. Then commit to the plan — scaling happens one lever at a time."
      nextTitle="You've completed the Business track."
      nextHref="/learn/skills"
      nextMeta="Build Real Skills · Pillar 5 · Explore all 11 skill tracks"
    />
  );
}
