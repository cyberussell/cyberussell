import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Spreadsheets 101 — Excel & Spreadsheets | Cyberussell", description: "The absolute fundamentals of spreadsheets — for people who've always avoided them.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/spreadsheets-101" }, openGraph: { title: "Spreadsheets 101 | Cyberussell", description: "Learn spreadsheet basics from scratch with AI assistance.", url: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/spreadsheets-101", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Excel & Spreadsheets"
      skillHref="/learn/skills/excel-spreadsheets"
      lessonNum="1" lessonTotal="6"
      title="Spreadsheets 101"
      subtitle="If you can use a table, you can use a spreadsheet. You're already closer than you think."
      tags={["Fundamentals"]}
      readTime="10 min"
      objective="Set up a functional spreadsheet for a real use case — with proper structure, basic formulas, and formatting that makes data readable."
      sections={[
        { heading: "Why Spreadsheets Are Worth Learning", body: "Spreadsheets are the most universally useful software skill in business. Clients use them. Employers expect them. Freelancers need them to track income, clients, and projects.\n\nAI has dramatically lowered the learning curve — Claude can write any formula you need in seconds. You just need to understand the structure and know what to ask for." },
        { heading: "The Basics You Actually Need to Know", items: [
          { title: "Rows, columns, and cells", desc: "A spreadsheet is a grid. Columns go left to right (A, B, C...). Rows go top to bottom (1, 2, 3...). A cell is where a row and column intersect: A1, B3, C10. When you reference data in a formula, you use these cell addresses." },
          { title: "Data types", desc: "Text: names, labels, descriptions. Numbers: amounts, quantities, percentages. Dates: Excel and Google Sheets treat dates as numbers — important for calculations. Keep each column to one data type. Don't mix numbers and text in the same column." },
          { title: "The header row", desc: "Always put labels in Row 1: 'Name', 'Date', 'Amount', 'Status'. Never put data in Row 1. This makes your data sortable, filterable, and readable. It's the most important structural habit in spreadsheets." },
          { title: "Sorting and filtering", desc: "With your data structured correctly (header row + consistent data types), you can sort any column A–Z or smallest to largest, and filter to show only rows that match a condition. These two features alone are worth learning spreadsheets for." },
        ] },
        { heading: "Google Sheets vs Microsoft Excel", body: "Google Sheets: free, cloud-based, real-time collaboration, works on any device. Best for freelancers, small businesses, and shared tracking sheets.\n\nExcel: more powerful for complex analysis, better for offline work, standard in corporate environments. Has more advanced features but steeper learning curve.\n\nFor most people, Google Sheets is the right starting point. Everything you learn transfers to Excel." },
      ]}
      promptText={`Help me set up a spreadsheet for [describe your use case — tracking clients / managing income / tracking project tasks / monitoring inventory / etc.]. Tell me: 1) What columns I should have and in what order, 2) What data type each column should contain, 3) Any dropdown menus or data validation I should add to keep data consistent, 4) The most useful formula to add right away for this type of data. Set it up as a Google Sheets template I can copy and use today.`}
      checklistItems={["My spreadsheet has a clear header row with descriptive column names", "I've kept each column to one consistent data type", "I can sort and filter the data to answer a specific question", "I understand what each column tracks and why"]}
      reflectText={`A spreadsheet is just organized information. You already organize information every day — phone contacts, grocery lists, client notes. <span class="text-white font-bold">What information in your life or business would be more useful if it were organized in a table?</span>`}
      takeaways={["The header row is the most important structural habit. Always label your columns in Row 1.", "Keep each column to one data type (all text, all numbers, or all dates). Mixed types cause formula errors.", "Sorting and filtering are the two most powerful basic spreadsheet features — learn them first.", "Google Sheets for beginners and shared work. Excel for advanced analysis and corporate environments."]}
      challengeTitle="Set up a client or income tracking spreadsheet."
      challengeBody="Open Google Sheets. Create a new sheet. Ask Claude: 'Give me a simple income tracking spreadsheet template for a Filipino freelancer. Include columns for client name, project, amount, invoice date, payment date, and payment status.' Set it up. Add your last 5 projects. Practice sorting by date and filtering by status."
      nextTitle="Writing Formulas with AI"
      nextHref="/learn/skills/excel-spreadsheets/writing-formulas-with-ai"
      nextMeta="Excel & Spreadsheets · Lesson 2 of 6 · 10 min"
    />
  );
}
