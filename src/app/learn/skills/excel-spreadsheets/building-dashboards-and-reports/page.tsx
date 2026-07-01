import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Building Dashboards and Reports — Excel & Spreadsheets | Cyberussell", description: "Turn raw data into a visual dashboard that answers your most important business questions at a glance.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/building-dashboards-and-reports" }, openGraph: { title: "Building Dashboards and Reports | Cyberussell", description: "Build a visual dashboard in Google Sheets or Excel that summarizes your key metrics.", url: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/building-dashboards-and-reports", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Excel & Spreadsheets"
      skillHref="/learn/skills/excel-spreadsheets"
      lessonNum="4" lessonTotal="6"
      title="Building Dashboards and Reports"
      subtitle="A dashboard turns rows of data into answers to questions."
      tags={["Dashboards", "Reporting"]}
      readTime="10 min"
      objective="Build a simple dashboard in Google Sheets that displays your key metrics visually — pulling from a data sheet automatically."
      sections={[
        { heading: "What Makes a Good Dashboard", body: "A good dashboard answers your most important questions in one glance, without requiring you to scroll through data or manually calculate anything.\n\nA bad dashboard is a spreadsheet with a chart on it. The difference: a dashboard is designed around decisions, not data. Every element answers a specific question you actually make decisions from." },
        { heading: "The Dashboard Building Process", items: [
          { title: "Step 1: Define your 3–5 key metrics", desc: "What numbers do you check weekly to know if your business is healthy? Total revenue this month. Number of active clients. Unpaid invoices. Tasks completed vs overdue. Write these down before opening the spreadsheet. Your dashboard is built around these." },
          { title: "Step 2: Set up a separate data sheet", desc: "Your raw data lives in one sheet (Sheet1 or 'Data'). Your dashboard pulls from it using formulas. This separation means your dashboard updates automatically when you add data — you never manually update the numbers." },
          { title: "Step 3: Use summary formulas in the dashboard", desc: "On your Dashboard sheet, use SUMIF, COUNTIF, and basic arithmetic to pull each key metric from the data sheet. Format these prominently — large font, color, clear label. No tables of data on the dashboard — just the answers." },
          { title: "Step 4: Add one chart", desc: "One chart is usually enough for a simple dashboard. Revenue over time (line chart) or revenue by client/category (bar chart) adds visual context that numbers alone can't. Don't add charts for every metric — focus on the one that shows trend or comparison most usefully." },
          { title: "Step 5: Add conditional formatting", desc: "Color cells automatically based on their value: green if the number is above target, red if below, yellow if borderline. This is the feature that makes dashboards truly 'at a glance' — you see the status without reading numbers." },
        ] },
      ]}
      promptText={`I want to build a dashboard in Google Sheets for my [describe your use case — freelance business / content creation / sales tracking / personal finances]. My key metrics are: [list the 3–5 numbers you check most often]. My data lives in Sheet1 with these columns: [describe your column structure]. Help me: 1) The formula for each metric to pull it from Sheet1 to the Dashboard sheet, 2) How to set up conditional formatting for each metric (what counts as good/bad), 3) What type of chart would be most useful and how to create it, 4) What the dashboard layout should look like (where to put each element).`}
      checklistItems={["My dashboard is on a separate sheet from my raw data", "Each key metric updates automatically when I add data to the data sheet", "I have conditional formatting that color-codes at least one metric based on its value", "I can answer my 3–5 most important business questions just by opening the dashboard"]}
      reflectText={`The best dashboard you can build is the one you actually look at every week. <span class="text-white font-bold">What's the one number that, if it went wrong, would tell you immediately that your business had a problem?</span>`}
      takeaways={["A dashboard answers specific questions — it's not just data with a chart on top.", "Raw data in Sheet1. Dashboard in Sheet2. Formulas connect them. Never mix data and dashboard on the same sheet.", "3–5 key metrics is enough. Every additional metric dilutes attention. Focus on the ones you actually decide from.", "Conditional formatting is what makes a dashboard actually 'at a glance'. Add it to every key number."]}
      challengeTitle="Build your first dashboard from your existing data."
      challengeBody="Open the spreadsheet you've been building in this track. Create a new sheet called 'Dashboard'. Define your 3 most important questions. Use Claude to write the formulas that answer them, pulling from your data sheet. Add conditional formatting. Add one chart. Send yourself the link to open it on your phone every Monday morning."
      nextTitle="Pivot Tables and Data Analysis"
      nextHref="/learn/skills/excel-spreadsheets/pivot-tables-and-data-analysis"
      nextMeta="Excel & Spreadsheets · Lesson 5 of 6 · 10 min"
    />
  );
}
