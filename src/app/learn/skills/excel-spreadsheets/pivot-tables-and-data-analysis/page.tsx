import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Pivot Tables and Data Analysis — Excel & Spreadsheets | Cyberussell", description: "Pivot tables let you slice and analyze data instantly. The most powerful spreadsheet feature most people skip.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/pivot-tables-and-data-analysis" }, openGraph: { title: "Pivot Tables and Data Analysis | Cyberussell", description: "Learn pivot tables — the most powerful spreadsheet feature for analysis.", url: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/pivot-tables-and-data-analysis", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Excel & Spreadsheets"
      skillHref="/learn/skills/excel-spreadsheets"
      lessonNum="5" lessonTotal="6"
      title="Pivot Tables and Data Analysis"
      subtitle="A pivot table can answer in 10 seconds what would take 20 formulas."
      tags={["Pivot Tables", "Analysis"]}
      readTime="10 min"
      objective="Create a pivot table from a dataset and use it to answer 3 specific analytical questions — grouping, summarizing, and filtering data without formulas."
      sections={[
        { heading: "What a Pivot Table Actually Does", body: "A pivot table is an interactive summary of your data. You drag columns into rows, values, and filters — and the spreadsheet instantly summarizes the data in that arrangement.\n\n'Show me total revenue by client, for Q1, sorted highest to lowest.' That's a pivot table. What would take 10 SUMIF formulas takes 30 seconds of dragging." },
        { heading: "When to Use a Pivot Table vs Formulas", items: [
          { title: "Use a pivot table when", desc: "You want to summarize data by a category (by client, by month, by product). You want to explore your data from multiple angles. You're doing one-time analysis and don't need it to update automatically." },
          { title: "Use formulas when", desc: "You want the summary to update automatically as you add data. You need the output to feed into another calculation. You have a specific, fixed summary that will always be the same." },
        ] },
        { heading: "How to Create a Pivot Table", items: [
          { title: "Google Sheets", desc: "Select your data range (including the header row). Click Insert → Pivot Table. Drag fields into Rows, Columns, Values, and Filters. Change the Value summarization (Sum, Count, Average) by clicking the field in the Values section." },
          { title: "Excel", desc: "Select your data range. Click Insert → PivotTable. The interface is the same: drag fields into Rows, Columns, Values, Filters. Refresh the pivot table after adding new data by right-clicking → Refresh." },
          { title: "The most useful pivot table configurations", desc: "Revenue by client (Rows: client name, Values: SUM of amount). Revenue by month (Rows: month/year, Values: SUM of amount). Count of tasks by status (Rows: status, Values: COUNT of task name). Top clients by revenue (apply filter or sort)." },
        ] },
      ]}
      promptText={`I have a spreadsheet with this data structure: [describe your columns — e.g., Date, Client Name, Project Type, Invoice Amount, Payment Status]. I want to use a pivot table to answer these questions: [list 2-3 specific questions — e.g., 'Which client has paid me the most this year?' 'How much did I earn per month in the first half of this year?' 'How many projects are in each status?']. I'm using [Google Sheets / Excel]. For each question: 1) Tell me exactly how to set up the pivot table (what to put in Rows, Values, Columns, Filters), 2) Any sorting or filtering to apply to get the clearest answer, 3) Whether a pivot chart would help visualize this answer.`}
      checklistItems={["I've created at least one pivot table from my data", "My pivot table answers a specific question I had about my data", "I've experimented with different Row and Value configurations to see how the summary changes", "I know the difference between when to use a pivot table and when to use formulas"]}
      reflectText={`Most people who work with data every day don't know how to use a pivot table. Which means most data-related questions get answered with hours of manual work instead of 30 seconds of dragging. <span class="text-white font-bold">What question about your data has taken you the longest to answer manually?</span>`}
      takeaways={["A pivot table summarizes your data interactively — drag fields instead of writing formulas.", "Use pivot tables for exploratory analysis. Use formulas for automated, always-updating summaries.", "The most powerful pivot table configurations: by category (client, product, status) and by time period (month, quarter).", "Refresh pivot tables after adding new data. They don't update automatically like formulas."]}
      challengeTitle="Create a pivot table that answers your most important data question."
      challengeBody="Open your spreadsheet. Select all your data including the header row. Insert a pivot table. Drag 'Client Name' (or equivalent) into Rows and 'Invoice Amount' into Values (set to Sum). Sort by the value column. You just created a ranked list of your clients by revenue. Try 2 more configurations: same thing by month, and a count by status. That's 3 different answers from the same data in under 5 minutes."
      nextTitle="Automating Spreadsheet Tasks"
      nextHref="/learn/skills/excel-spreadsheets/automating-spreadsheet-tasks"
      nextMeta="Excel & Spreadsheets · Lesson 6 of 6 · 10 min"
    />
  );
}
