import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Financial Basics — Business | Cyberussell", description: "The financial concepts every business owner needs to understand — income, expenses, profit, and cash flow.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/business/financial-basics" }, openGraph: { title: "Financial Basics for Business | Cyberussell", description: "Understand income, expenses, profit, and cash flow — the financial foundations of a business.", url: "https://www.cyberussell.com/learn/skills/business/financial-basics", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Business"
      skillHref="/learn/skills/business"
      lessonNum="5" lessonTotal="7"
      title="Financial Basics"
      subtitle="You don't need an accounting degree. You need to know if your business is actually making money."
      tags={["Finance", "Accounting"]}
      readTime="10 min"
      objective="Build a simple income and expense tracking system and understand your profit, burn rate, and runway — using AI to explain what the numbers mean."
      sections={[
        { heading: "The 4 Financial Concepts Every Business Owner Must Understand", items: [
          { title: "Revenue (gross income)", desc: "The total amount your business brings in from sales before deducting anything. If you invoice ₱50,000 this month, your revenue is ₱50,000. Revenue is not profit — it's the starting number." },
          { title: "Expenses", desc: "Everything you spend to run the business. Tools (Canva, Zapier, hosting), services, contractors, advertising, equipment, phone. Know your monthly expenses total. If your revenue is ₱50,000 and your expenses are ₱20,000, your profit is ₱30,000." },
          { title: "Profit (net income)", desc: "Revenue minus expenses. This is the number that actually matters. A business with ₱200,000 in revenue and ₱190,000 in expenses is barely profitable. A business with ₱50,000 in revenue and ₱10,000 in expenses is very healthy." },
          { title: "Cash flow", desc: "The difference between when money comes in and when it goes out. You can be profitable on paper but have a cash flow crisis: clients haven't paid yet but your expenses are due now. Cash flow problems kill profitable businesses. Track when money actually arrives, not just when it's owed." },
        ] },
        { heading: "The Simple Financial Tracking System", items: [
          { title: "Income tracker", desc: "A Google Sheet with: Date, Client, Service, Invoice Amount, Payment Date, Status. Review monthly: total invoiced, total received, total outstanding. This is your revenue picture." },
          { title: "Expense tracker", desc: "A Google Sheet with: Date, Description, Category, Amount. Or use Wave (free accounting software). Categories: tools, marketing, contractors, equipment, professional development. This is your cost picture." },
          { title: "Monthly P&L (profit and loss)", desc: "Once a month: total revenue this month - total expenses this month = net profit. That's your P&L. If you do this every month, you always know whether you're going in the right direction." },
        ] },
      ]}
      promptText={`Help me understand my business finances. Here's my situation: Monthly revenue: [amount]. Monthly expenses breakdown: [list main expense categories and amounts]. I have [number] clients paying [amounts]. Help me: 1) Calculate my current profit margin and tell me if that's healthy for my type of business, 2) Identify which expenses are necessary vs optional, 3) Tell me how much revenue I need to reach my take-home income goal of ₱[amount] after taxes and expenses, 4) Set up a simple monthly financial review I can do in 30 minutes, 5) What financial metrics should I track weekly vs monthly?`}
      checklistItems={["I know my total monthly revenue, expenses, and profit this month", "I have a simple tracking system (spreadsheet or Wave) for income and expenses", "I do a monthly P&L review on the first week of each month", "I know what revenue I need to reach my income goal"]}
      reflectText={`Many business owners who feel busy and stressed discover, when they look at the numbers, that they're not making as much as they thought — or as much as they need. <span class="text-white font-bold">When did you last calculate exactly how much profit your business made last month?</span>`}
      takeaways={["Revenue - Expenses = Profit. Know this number every month.", "Cash flow is different from profit. Profitable businesses fail when they run out of cash. Track both.", "Start with a simple spreadsheet. Wave (free) is the easiest accounting tool for Filipino freelancers.", "Monthly P&L review in 30 minutes is all you need to stay financially aware of your business."]}
      challengeTitle="Calculate your profit for last month."
      challengeBody="Open a spreadsheet. List every payment you received last month (revenue). List every peso you spent on the business last month (expenses). Subtract expenses from revenue. That's your profit. If you don't know these numbers off the top of your head, that's the problem. Now you know."
      nextTitle="Running Day-to-Day Operations"
      nextHref="/learn/skills/business/running-day-to-day-operations"
      nextMeta="Business · Lesson 6 of 7 · 8 min"
    />
  );
}
