import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Writing Formulas with AI — Excel & Spreadsheets | Cyberussell", description: "Get any formula you need in seconds by describing what you want. No formula memorization required.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/writing-formulas-with-ai" }, openGraph: { title: "Writing Formulas with AI | Cyberussell", description: "Get any spreadsheet formula you need by describing it in plain language to AI.", url: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/writing-formulas-with-ai", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Excel & Spreadsheets"
      skillHref="/learn/skills/excel-spreadsheets"
      lessonNum="2" lessonTotal="6"
      title="Writing Formulas with AI"
      subtitle="You don't need to memorize VLOOKUP. You need to know how to ask for it."
      tags={["Formulas", "AI"]}
      readTime="10 min"
      objective="Get AI to write 5 different formulas for your spreadsheet — and understand what each formula does well enough to verify it works correctly."
      sections={[
        { heading: "The Old Way vs The AI Way", body: "Old way: open Google, search 'how to sum values if they meet a condition in Excel', read 3 Stack Overflow answers, try to adapt the formula to your data, realize you misunderstood the syntax, repeat.\n\nAI way: 'I have a column of sales amounts in column C and a column of salesperson names in column B. I want to sum all sales amounts where column B says \"Anna\". My data starts in row 2.' Claude writes the exact formula. Done in 30 seconds." },
        { heading: "The Most Useful Formulas and When to Use Them", items: [
          { title: "SUM / SUMIF / SUMIFS", desc: "SUM: add up a range of numbers. SUMIF: add numbers that meet one condition. SUMIFS: add numbers that meet multiple conditions. Use for: totaling income, summing by category, calculating totals for a specific client or time period." },
          { title: "COUNTIF / COUNTIFS", desc: "Count how many cells meet a condition. Use for: counting how many invoices are unpaid, how many clients you have in a category, how many tasks are completed." },
          { title: "VLOOKUP / XLOOKUP", desc: "Look up a value in one column and return a corresponding value from another column. Use for: pulling a client's email from another sheet when you have their name, matching invoice numbers to amounts." },
          { title: "IF / IFS", desc: "Return one value if a condition is true, another if false. Use for: marking invoices as 'Overdue' if their due date has passed, assigning a commission tier based on sales volume, flagging rows that need attention." },
          { title: "TEXT / DATE functions", desc: "Format dates, extract month or year from a date, calculate days between two dates. Use for: tracking days until deadlines, grouping data by month for reporting." },
        ] },
      ]}
      promptText={`I need help writing spreadsheet formulas. My spreadsheet is set up as: [describe your columns — e.g., Column A = client name, Column B = invoice date, Column C = amount, Column D = payment status]. I want to calculate: [describe in plain language what you want to know — e.g., 'the total amount of all invoices where payment status is Unpaid']. I'm using [Google Sheets / Excel]. Please: 1) Write the exact formula, 2) Explain in plain language what it does, 3) Tell me which cell to put it in, 4) Warn me about any common mistakes with this formula.`}
      checklistItems={["I've asked Claude to write at least 3 formulas for my spreadsheet", "I understand what each formula does well enough to explain it in one sentence", "I've tested each formula with data I can verify manually to confirm it's correct", "I know which cell to put each formula in and why"]}
      reflectText={`Formulas are how spreadsheets think. <span class="text-white font-bold">What question about your data would be answered automatically if the right formula existed in your spreadsheet right now?</span>`}
      takeaways={["Describe what you want in plain language and Claude writes the exact formula. No memorization needed.", "The most useful formulas: SUM/SUMIF, COUNTIF, VLOOKUP/XLOOKUP, IF, and date functions.", "Always test a formula on data where you already know the answer to verify it's correct.", "Understanding what a formula does (even if you didn't write it) lets you debug it when it breaks."]}
      challengeTitle="Add 3 new formulas to your spreadsheet."
      challengeBody="Open the spreadsheet you built in the last lesson. Identify 3 questions you want it to answer automatically (total income, count of unpaid invoices, average invoice value — whatever fits your use case). Ask Claude to write each formula. Add them to your sheet. Verify each one gives the right answer by checking the math manually on a small sample."
      nextTitle="Data Cleaning"
      nextHref="/learn/skills/excel-spreadsheets/data-cleaning"
      nextMeta="Excel & Spreadsheets · Lesson 3 of 6 · 8 min"
    />
  );
}
