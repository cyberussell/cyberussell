import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ChatGPT Canvas — Meet Your AI Team | Cyberussell",
  description:
    "Use ChatGPT Canvas to write, edit, and refine a real document — without going back and forth in chat.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/chatgpt-canvas" },
};

export default function ChatGPTCanvasPage() {
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
            <span className="text-white/60">ChatGPT Canvas</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#10B981] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              ChatGPT
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · ChatGPT Guide 6 of 6
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            ChatGPT Canvas
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Write documents with AI beside you — not buried in a chat thread below you.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#10B981]/8 border border-[#10B981]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Use ChatGPT Canvas to write, edit, and refine a real document — without going back and forth in chat.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Regular ChatGPT chat is back-and-forth. You ask for a draft, it writes one, you ask for changes, it rewrites the whole thing, and soon you are scrolling through a long conversation to find the version you actually wanted.
            </p>
            <p>
              Canvas solves this. It opens a document panel beside the chat — a real writing workspace where you and ChatGPT work on the same document together. You can see the whole document at once, highlight any section to request changes, and use quick-fix tools from a toolbar.
            </p>
            <p>
              Think of it like Google Docs, but ChatGPT is your co-writer sitting right next to you.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-4">What You Can Do in Canvas</p>
            <div className="space-y-3">
              {[
                { action: "Ask ChatGPT to write a first draft", detail: "Describe your document in the chat panel and ChatGPT opens Canvas with the draft." },
                { action: "Highlight any section and request edits", detail: "Select a paragraph → click the edit icon → say what you want changed. Only that section updates." },
                { action: "Use the toolbar for quick improvements", detail: "Buttons to make the whole document shorter, fix grammar, change tone, or translate it." },
                { action: "Edit it yourself directly", detail: "Click anywhere in the Canvas document and type — it is your document, you are in control." },
                { action: "Export when done", detail: "Copy the full text or use the export options to bring it into Google Docs, Word, or wherever you need it." },
              ].map(({ action, detail }) => (
                <div key={action} className="flex gap-3 py-3 border-b border-white/[0.05] last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-[6px] shrink-0" />
                  <div>
                    <p className="font-[family-name:var(--font-inter)] text-[15px] font-bold text-white/80">{action}</p>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-0.5 leading-[1.6]">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#10B981]/5 border border-[#10B981]/15 rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-3">
              Best Document Types for Canvas
            </p>
            <div className="grid grid-cols-2 gap-2">
              {["Business proposals", "Cover letters & resumes", "Social media posts & captions", "Email drafts", "Scripts & scripts outlines", "Study notes & summaries"].map((type) => (
                <div key={type} className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-[#10B981] shrink-0" />
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/55">{type}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Without Canvas</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
                Jake is a freelance graphic designer writing a project proposal for his biggest client yet. He asks ChatGPT to help him write it. ChatGPT writes a draft in chat. He asks for changes. ChatGPT rewrites it. He asks for a different introduction. Now there are 3 versions of the proposal scattered across the conversation — and he is not sure which parts to combine. It takes him 2 hours.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-4">With Canvas</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Jake opens Canvas and says: &ldquo;Help me write a project proposal for a branding project. The client is a small food business, budget is ₱15,000, timeline is 3 weeks. Include: intro, scope of work, deliverables, timeline, payment terms.&rdquo;
              </p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Canvas opens with a full draft. He highlights the payment terms section and says &ldquo;make this more professional and add a 50% deposit clause.&rdquo; Only that section updates. He edits the intro himself, uses the toolbar to shorten the whole document, and copies it into an email — all done in 20 minutes.
              </p>
              <div className="bg-[#10B981]/8 border border-[#10B981]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#10B981]/80 leading-[1.6]">
                  2 hours of back-and-forth writing reduced to 20 focused minutes.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 15 minutes · ChatGPT (free or paid)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Open Canvas</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Open ChatGPT on desktop → start a new chat → type &ldquo;Open Canvas&rdquo; or click the Canvas button in the toolbar if you see it. Alternatively, just ask ChatGPT to write a document and it may open Canvas automatically.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Use this starting prompt</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#10B981] leading-[1.8]">
                    Help me write a [TYPE OF DOCUMENT: professional email / business proposal / cover letter / social media post / script] for [YOUR SPECIFIC SITUATION — be detailed]. Open Canvas and write a full draft.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Edit in Canvas</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Once the draft appears in Canvas, highlight one section and ask for a specific change. Then try the toolbar options — &ldquo;Make shorter,&rdquo; &ldquo;Fix grammar,&rdquo; or &ldquo;Change tone.&rdquo;
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
                "Opened ChatGPT Canvas and got a full document draft",
                "Highlighted a section and requested a specific change",
                "Used at least one toolbar option (Make shorter / Fix grammar / Change tone)",
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
              What is one document you write regularly — emails, reports, proposals, posts — that you could use Canvas for instead? <span className="text-white font-bold">Pick the one that currently takes you the most time and frustration.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "Canvas opens a document panel beside the chat — you and ChatGPT work on the same document together.",
              "You can highlight specific sections to request targeted edits — the rest of the document stays unchanged.",
              "The toolbar has quick fixes: Make shorter, Fix grammar, Change tone — apply to the whole document in one click.",
              "Canvas is best for documents you want to write, edit, and refine — not just quick answers.",
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-[7px] shrink-0" />
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Write your best document yet.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Use Canvas to write the most important document in your life right now — a job application, a business proposal, a letter to a client, a school paper. Spend at least 30 minutes refining it in Canvas until you are genuinely proud of it. Then send it.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">Claude Artifacts</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · Claude Guide 1 of 5 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/claude-artifacts"
              className="inline-flex items-center gap-2 bg-[#F59E0B] hover:opacity-90 transition-opacity text-[#0F0F1A] font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
