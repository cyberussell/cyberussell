import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gemini in Sheets — Meet Your AI Team | Cyberussell",
  description:
    "Use Gemini inside Google Sheets to create formulas, analyze data, and build a useful tracker — without knowing spreadsheet formulas.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/gemini-in-sheets" },
};

export default function GeminiInSheetsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#0F0F1A]">

        <div className="px-6 md:px-10 pt-10 max-w-3xl mx-auto">
          <nav className="flex items-center gap-2 text-[12px] font-[family-name:var(--font-inter)] text-white/35 mb-8">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/learn" className="hover:text-white transition-colors">Learn</a>
            <span>/</span>
            <a href="/learn/ai-team" className="hover:text-white transition-colors">Meet Your AI Team</a>
            <span>/</span>
            <span className="text-white/60">Gemini in Sheets</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#4F8EF7] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Gemini · Google Sheets
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Gemini Guide 3 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Gemini in Sheets
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Stop avoiding spreadsheets. Gemini turns plain language into formulas — and your data into answers.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use Gemini inside Google Sheets to create formulas, analyze data, and build a useful tracker — without knowing spreadsheet formulas.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Spreadsheets are one of the most powerful tools in existence for managing money, tracking data, and making decisions. But most people only use 10% of what they can do — because they do not know the formulas.
            </p>
            <p>
              VLOOKUP. SUMIF. COUNTIFS. IF statements. These are genuinely useful tools that most people have heard of but cannot use without Googling for 20 minutes every time.
            </p>
            <p>
              Gemini in Sheets lets you describe what you want in plain language and it writes the formula for you. It can also look at your data and answer questions about it — like a data analyst sitting next to you.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">What Gemini Can Do in Sheets</p>
            <div className="space-y-4">
              {[
                {
                  title: "Create formulas in plain language",
                  example: "\"Calculate the total of column B only for rows where column A says Paid.\" → Gemini writes the SUMIF formula.",
                },
                {
                  title: "Analyze your data",
                  example: "\"What is the trend in my sales this month?\" / \"Which category had the most expenses?\" → Gemini reads your data and answers.",
                },
                {
                  title: "Generate a template",
                  example: "\"Create a monthly budget tracker for a small business with columns for income, expenses, and profit.\" → Gemini creates the whole spreadsheet.",
                },
                {
                  title: "Explain a formula",
                  example: "Click on any formula → ask Gemini \"What does this formula do?\" → get a plain-language explanation.",
                },
              ].map(({ title, example }) => (
                <div key={title} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                  <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white mb-1.5">{title}</p>
                  <p className="font-mono text-[12px] text-[#4F8EF7]/80 italic leading-[1.6]">{example}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">The Situation</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
                Aling Nora runs a small market stall in Caloocan selling vegetables, fruits, and snacks. She tracks her daily sales in a Google Sheets spreadsheet — product name, quantity sold, price per unit. Every week she wants to know which product made the most money, but she has no idea how to calculate it.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-4">With Gemini in Sheets</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Aling Nora opens her spreadsheet and clicks the Gemini icon. She types: &ldquo;Which product made the most money this week? My data is in columns A (product name), B (quantity sold), and C (price per unit).&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Gemini reads her data, calculates the revenue per product, and tells her: &ldquo;Sayote had the highest revenue this week at ₱1,250 across 250 pieces sold.&rdquo; It also shows her the formula it used.
              </p>
              <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#4F8EF7]/80 leading-[1.6]">
                  She now makes weekly restock decisions based on data instead of guessing — without knowing a single spreadsheet formula.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 10 minutes · Google Sheets</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Open Google Sheets</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Go to sheets.google.com → open an existing spreadsheet or create a new one → look for the Gemini icon (stars/sparkle) on the right side or in the toolbar.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Ask Gemini to create a tracker</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#4F8EF7] leading-[1.8]">
                    Create a simple [CHOOSE ONE: expense tracker / sales tracker / monthly budget planner / inventory tracker] for me. Add sample data so I can see how it works. Include a formula to calculate the total automatically.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Ask a question about the data</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Once the tracker is set up with sample data, ask Gemini: &ldquo;What is the total in this spreadsheet?&rdquo; or &ldquo;Which category has the highest amount?&rdquo;
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#22C55E]/5 border border-[#22C55E]/15 rounded-[14px] p-5">
            <div className="flex items-center gap-2 mb-3">
              <CheckSquare size={14} className="text-[#22C55E]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#22C55E] uppercase tracking-[1.5px]">Mark Complete</span>
            </div>
            <div className="space-y-2">
              {[
                "Found the Gemini button inside Google Sheets",
                "Asked Gemini to create a tracker with sample data",
                "Asked Gemini a question about the data and got an answer",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
                </label>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#A855F7]/5 border border-[#A855F7]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb size={14} className="text-[#A855F7]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#A855F7] uppercase tracking-[1.5px]">Reflect</span>
            </div>
            <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/70 leading-[1.8]">
              What data are you not tracking right now because setting up a spreadsheet seemed too complicated? <span className="text-white font-bold">Gemini can build the tracker for you in seconds — you just need to show up with your data.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Gemini in Sheets lets you describe what you want in plain language — and it writes the formula.",
              "You can ask Gemini to analyze your data and answer questions about it — no formula knowledge needed.",
              "Gemini can create a full tracker template with sample data from scratch.",
              "Spreadsheets become powerful tools once you use Gemini to handle the technical parts.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.7]">{point}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/15 rounded-[14px] p-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy size={14} className="text-[#F59E0B]" />
              <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#F59E0B] uppercase tracking-[1.5px]">Challenge — Optional</span>
            </div>
            <p className="font-sans text-[16px] font-bold text-white mb-2">Start tracking one thing in your life.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Pick one area of your life where you know data would help — spending, sales, client hours, inventory, grades, health. Ask Gemini in Sheets to create a tracker for it. Fill it in for one week and see what you learn about yourself.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Gemini Deep Research</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Gemini Guide 4 of 5 · Beginner · 10 min
              </p>
            </div>
            <a
              href="/learn/ai-team/gemini-deep-research"
              className="inline-flex items-center gap-2 bg-[#4F8EF7] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
            >
              Next Guide <ArrowRight size={14} />
            </a>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
