import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Gemini in Gmail — Meet Your AI Team | Cyberussell",
  description:
    "Use Gemini inside Gmail to write, reply to, and summarize emails faster than ever.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/gemini-in-gmail" },
};

export default function GeminiInGmailPage() {
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
            <span className="text-white/60">Gemini in Gmail</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#4F8EF7]/10 border border-[#4F8EF7]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#4F8EF7] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              Gemini · Gmail
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · Gemini Guide 1 of 5
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            Gemini in Gmail
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[16px] text-white/50 leading-[1.8]">
            AI built directly into your inbox — write, reply to, and summarize emails without leaving Gmail.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[16px] font-bold text-white leading-[1.5]">
              Use Gemini inside Gmail to write, reply to, and summarize emails faster than ever.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Email takes up more time than most people realize. You read an email, think about how to respond, rewrite your reply three times trying to sound professional, and then worry you did not say it right — all for a 3-sentence message.
            </p>
            <p>
              For many Filipinos, this is even harder when the email is in formal English or the situation requires a tone they are not used to — professional, firm, polite, urgent.
            </p>
            <p>
              Gemini is now built into Gmail. Without switching tabs, without copy-pasting, you can ask Gemini to write your email for you in seconds — and it already knows what you are replying to.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">What Gemini Can Do in Gmail</p>
            <div className="space-y-4">
              {[
                {
                  title: "Write an email from scratch",
                  how: "Click Compose → click the Gemini icon (stars/sparkle) → click \"Help me write\" → describe what you want. Gemini writes the full email.",
                },
                {
                  title: "Reply to an email",
                  how: "Open an email → click Reply → click the Gemini icon → describe your response. Gemini reads the original email and writes your reply with context.",
                },
                {
                  title: "Summarize a long email thread",
                  how: "Open a long email thread → click the Gemini icon at the top → click \"Summarize this email.\" Gemini reads the entire thread and gives you a short summary.",
                },
              ].map(({ title, how }) => (
                <div key={title} className="border-b border-white/[0.05] pb-4 last:border-0 last:pb-0">
                  <p className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white mb-1.5">{title}</p>
                  <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 leading-[1.6]">{how}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#4F8EF7]/5 border border-[#4F8EF7]/15 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#4F8EF7]/80 leading-[1.7]">
              <span className="font-bold text-[#4F8EF7]">Access:</span> Available in Gmail on desktop and mobile. Works with a personal Google account. If you do not see the Gemini icon, go to Gmail settings and look for the &ldquo;Gemini&rdquo; option — you may need to enable it or join a waitlist depending on your region.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">The Situation</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8]">
                Bea just finished a job interview and wants to send a professional follow-up email to the hiring manager — in English. She knows what she wants to say but is not confident writing formal English. She has been putting it off for two days.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#4F8EF7] uppercase tracking-[2px] mb-4">With Gemini in Gmail</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Bea opens Gmail, clicks Compose, and uses Gemini: &ldquo;Write a professional follow-up email to a hiring manager after a job interview for a customer service position. Thank them for the time, mention I enjoyed learning about the team culture, and say I am very interested in the role.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.8] mb-3">
                Gemini writes a perfect follow-up email in seconds. Bea reads it, adds one personal detail about a specific thing discussed in the interview, and sends it — all in under 2 minutes.
              </p>
              <div className="bg-[#4F8EF7]/8 border border-[#4F8EF7]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[13px] text-[#4F8EF7]/80 leading-[1.6]">
                  She sent the email the same day as the interview — and got called back for a second round.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-6">About 5 minutes · Gmail (Google account)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Open Gmail on your desktop → click Compose → look for the sparkle/stars icon or the Gemini icon in the compose toolbar.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Use this prompt</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[14px] text-[#4F8EF7] leading-[1.8]">
                    Write a professional email to [RECIPIENT — e.g., my team / a client / a company / my employer] asking about [TOPIC — e.g., my application status / a project update / a meeting schedule]. Keep it short, polite, and professional.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Edit and send</span>
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/65 mt-1 leading-[1.7]">
                  Read the generated email. Add or change any personal details. Click &ldquo;Insert&rdquo; to put it in your compose window, then send it (or save it as a draft if you just want to practice).
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
                "Found the Gemini \"Help me write\" button in Gmail",
                "Generated an email using Gemini with a specific prompt",
                "Edited the result and inserted it into a compose window",
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E] cursor-pointer" />
                  <span className="font-[family-name:var(--font-inter)] text-[13px] text-white/55 group-hover:text-white/75 transition-colors">{item}</span>
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
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/70 leading-[1.8]">
              What emails do you regularly put off writing because they feel hard or awkward? <span className="text-white font-bold">Gemini in Gmail can handle all of them — in seconds, without switching to another tool.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Gemini is built directly into Gmail — no need to copy-paste to another tool.",
              "You can use it to write from scratch, reply to existing emails, or summarize long threads.",
              "It reads the email you are replying to and uses that context when drafting your response.",
              "Always review the generated email before sending — add personal details and make sure the tone fits.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8EF7] mt-[7px] shrink-0" />
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 leading-[1.7]">{point}</p>
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
            <p className="font-sans text-[15px] font-bold text-white mb-2">Use Gemini for every work email this week.</p>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/55 leading-[1.7]">
              For one full week, every time you need to write a work email, use Gemini to draft it first. Review, edit, personalize, then send. At the end of the week, estimate how many minutes you saved.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[16px] font-bold text-white">Gemini in Docs</p>
              <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/45 mt-1">
                Meet Your AI Team · Gemini Guide 2 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/gemini-in-docs"
              className="inline-flex items-center gap-2 bg-[#4F8EF7] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[14px] px-5 py-3 rounded-xl shrink-0"
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
