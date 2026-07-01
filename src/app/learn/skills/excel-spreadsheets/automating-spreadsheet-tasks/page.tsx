import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Automating Spreadsheet Tasks — Excel & Spreadsheets | Cyberussell", description: "Use Google Apps Script and Zapier to automate repetitive spreadsheet tasks — without learning to code.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/automating-spreadsheet-tasks" }, openGraph: { title: "Automating Spreadsheet Tasks | Cyberussell", description: "Automate repetitive spreadsheet tasks with Google Apps Script and Zapier.", url: "https://www.cyberussell.com/learn/skills/excel-spreadsheets/automating-spreadsheet-tasks", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Excel & Spreadsheets"
      skillHref="/learn/skills/excel-spreadsheets"
      lessonNum="6" lessonTotal="6"
      title="Automating Spreadsheet Tasks"
      subtitle="Spreadsheets can do things automatically. Most people don't know that."
      tags={["Automation", "Apps Script"]}
      readTime="10 min"
      objective="Set up at least one automated spreadsheet task — a scheduled action, automatic data import, or trigger-based workflow — using AI-written scripts."
      sections={[
        { heading: "Two Ways to Automate Spreadsheets", body: "You can automate spreadsheets in two ways: scripts (code that runs inside the spreadsheet) and external tools (Zapier or Make connecting the spreadsheet to other apps).\n\nFor most people, the combination is: Zapier handles automating data into and out of the spreadsheet (connecting it to your other tools), while Google Apps Script handles automating tasks within the spreadsheet itself." },
        { heading: "Google Apps Script (for Google Sheets)", items: [
          { title: "What it can do", desc: "Run code inside your spreadsheet. Send emails based on spreadsheet data. Format cells based on conditions. Generate reports and email them automatically. Import data from external sources on a schedule. Trigger when a cell changes." },
          { title: "How AI makes it accessible", desc: "You don't need to learn JavaScript to use Apps Script. Describe what you want in plain language to Claude: 'Write a Google Apps Script that sends me an email every Monday morning with the total of column C and the names in column A where column D says Unpaid.' Claude writes the exact script. Paste it into Extensions → Apps Script → Run." },
        ] },
        { heading: "Zapier for Spreadsheet Automation", items: [
          { title: "Bringing data in automatically", desc: "New form submission → add a row. New payment received → add a row. New calendar event → add a row. Any trigger in another app can automatically add data to your spreadsheet." },
          { title: "Taking action when data changes", desc: "New row added → send a Slack notification. Status changes to 'Paid' → send a confirmation email. Row added to client list → create a folder in Google Drive. Spreadsheets become active workflow hubs, not just data stores." },
        ] },
        { heading: "The Most Useful Spreadsheet Automations", items: [
          { title: "Weekly summary email", desc: "Every Monday: script pulls last week's data from the spreadsheet, summarizes key metrics, emails you a plain-language report. Never manually calculate weekly numbers again." },
          { title: "Overdue invoice alert", desc: "Daily: script checks the 'Due Date' column. If today is past the due date and 'Status' is not 'Paid', send an alert email with the client name and amount. Never miss a payment chase again." },
          { title: "Auto-formatting new data", desc: "Trigger: new row added. Action: automatically apply formatting (date format, currency format, status dropdown) to new entries. Keeps data consistent without manual formatting after every entry." },
        ] },
      ]}
      promptText={`I want to automate a spreadsheet task. My spreadsheet has these columns: [describe your columns]. The task I want to automate: [describe what you want to happen automatically — e.g., 'Every Monday morning, I want an email sent to me with the total of column C for the current month and a list of all rows where column D says Unpaid']. I'm using Google Sheets. Please: 1) Write the complete Google Apps Script that does this, 2) Step-by-step instructions for adding the script to my sheet and setting up the trigger, 3) How to test it before setting up the automated schedule.`}
      checklistItems={["I've opened Extensions → Apps Script in my Google Sheet", "I've pasted an AI-written script and run it manually to test it", "I've set up a time-driven trigger to run the script automatically", "The automation has run successfully at least once without errors"]}
      reflectText={`There are tasks in your spreadsheet that you repeat every week that could be running automatically while you sleep. <span class="text-white font-bold">What's the most tedious thing you do in your spreadsheet every week that happens the same way every time?</span>`}
      takeaways={["Google Apps Script runs inside Google Sheets and can send emails, format data, and trigger on schedules.", "Claude writes Apps Script for you — describe what you want in plain English and paste the result.", "Zapier connects spreadsheets to your other tools: data flows in and out automatically.", "The most valuable spreadsheet automations: weekly summary emails, overdue invoice alerts, automatic data imports."]}
      challengeTitle="Set up a weekly summary email from your spreadsheet."
      challengeBody="Ask Claude: 'Write a Google Apps Script for Google Sheets that sends me a weekly email every Monday at 8am with the following summary from my sheet: [describe your key metrics and column names].' Paste the script into Extensions → Apps Script. Run it once manually to test. Then set up a time-driven trigger for Monday at 8am. You've just made your spreadsheet proactively report to you."
      nextTitle="Continue with Business"
      nextHref="/learn/skills/business"
      nextMeta="Build Real Skills · Pillar 5 · Business Track"
    />
  );
}
