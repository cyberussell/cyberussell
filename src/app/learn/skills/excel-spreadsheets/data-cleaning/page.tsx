import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Data Cleaning — Excel & Spreadsheets | Cyberussell", description: "Fix messy, inconsistent data before it breaks your analysis. The skill that makes everything else work.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/data-cleaning" }, openGraph: { title: "Data Cleaning in Spreadsheets | Cyberussell", description: "How to clean messy data in Google Sheets or Excel — with AI to write the fix formulas.", url: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/data-cleaning", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Excel & Spreadsheets"
      skillHref="/learn/skills/excel-spreadsheets"
      lessonNum="3" lessonTotal="6"
      title="Data Cleaning"
      subtitle="Bad data produces wrong answers, even with perfect formulas."
      tags={["Data Cleaning"]}
      readTime="8 min"
      objective="Clean a messy dataset — removing duplicates, fixing inconsistent formatting, and standardizing data types — using AI-assisted formulas and techniques."
      sections={[
        { heading: "Why Data Cleaning is Essential", body: "If your data is inconsistent, your formulas produce wrong results. 'Manila' and 'manila' look the same to a human but are treated as different values by a spreadsheet. '₱5,000' stored as text can't be summed. Duplicate rows inflate totals.\n\nGarbage in, garbage out. Data cleaning ensures your analysis is based on accurate, consistent data." },
        { heading: "The Most Common Data Problems and How to Fix Them", items: [
          { title: "Inconsistent capitalization", desc: "Problem: 'Manila', 'manila', 'MANILA' are treated as different values in COUNTIF. Fix: use =PROPER() to capitalize first letters, =UPPER() for all caps, =LOWER() for all lowercase. Apply to a helper column, then paste-as-values to replace the originals." },
          { title: "Extra spaces", desc: "Problem: 'John Doe ' (with a trailing space) doesn't match 'John Doe' in a VLOOKUP. Fix: =TRIM() removes leading, trailing, and extra internal spaces. One of the most-used data cleaning functions." },
          { title: "Numbers stored as text", desc: "Problem: amounts imported from another system have a currency symbol (₱1,500) or comma (1,500) and can't be summed. Fix: =VALUE() converts text to numbers. Or find-and-replace the currency symbol and commas first." },
          { title: "Duplicate rows", desc: "Problem: the same record appears multiple times, inflating counts and totals. Fix: use Data → Remove Duplicates (Google Sheets) or Data → Remove Duplicates (Excel). Or use COUNTIF to flag duplicates before deleting them." },
          { title: "Inconsistent date formats", desc: "Problem: some dates are '01/15/2024', some are 'January 15', some are '2024-01-15'. Fix: convert all dates to one standard format. Ask Claude for the specific formula to convert your date format to the standard." },
        ] },
      ]}
      promptText={`I have a messy spreadsheet with data problems. Here's what my data looks like: [paste a few example rows or describe the issues — inconsistent names, numbers stored as text, duplicate rows, bad date formats, etc.]. I'm using [Google Sheets / Excel]. Help me: 1) Write the exact formula to fix each specific problem I've described, 2) Tell me whether to fix in-place or use a helper column, 3) The steps to apply each fix without losing my original data, 4) How to verify my data is clean after applying the fixes.`}
      checklistItems={["I've used TRIM() to remove extra spaces from text columns", "I've standardized capitalization using PROPER(), UPPER(), or LOWER()", "I've checked for and removed duplicate rows", "All date values are in a consistent format and treated as dates (not text) by the spreadsheet"]}
      reflectText={`Bad data is invisible until it produces wrong answers. And wrong answers that look right are the most dangerous kind. <span class="text-white font-bold">When did messy data last give you an incorrect answer that you acted on?</span>`}
      takeaways={["Clean data is the foundation of accurate analysis. Bad input = bad output, regardless of how good your formulas are.", "TRIM removes spaces. PROPER/UPPER/LOWER standardize capitalization. VALUE converts text to numbers. These 4 functions solve 80% of data cleaning problems.", "Always work on a copy of your data when cleaning — never clean the original until you've verified the fix.", "Remove duplicates before building any summary or analysis — duplicate rows inflate every count and total."]}
      challengeTitle="Find and fix the messiest column in your spreadsheet."
      challengeBody="Open any spreadsheet you use regularly. Pick the column with the most inconsistency — names entered differently, amounts with currency symbols, dates in mixed formats. Describe the problem to Claude and ask for the specific fix. Apply it. Count how many rows needed fixing. Now think about how many formulas were returning wrong results before you cleaned it."
      nextTitle="Building Dashboards and Reports"
      nextHref="/learn/skills/excel-spreadsheets/building-dashboards-and-reports"
      nextMeta="Excel & Spreadsheets · Lesson 4 of 6 · 10 min"
    />
  );
}
