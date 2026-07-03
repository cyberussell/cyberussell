import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, CheckSquare, Lightbulb, Trophy, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "ChatGPT Image Generation — Meet Your AI Team | Cyberussell",
  description:
    "Generate your first AI image using ChatGPT and use it for something real — a post, a logo concept, or a product visual.",
  alternates: { canonical: "https://www.cyberussell.com/learn/ai-team/chatgpt-image-generation" },
};

export default function ChatGPTImageGenerationPage() {
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
            <span className="text-white/60">ChatGPT Image Generation</span>
          </nav>
        </div>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#10B981]/10 border border-[#10B981]/20 rounded-full px-3 py-1 text-[11px] font-bold text-[#10B981] font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              <BookOpen size={10} /> Beginner
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              ChatGPT Plus
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-full px-3 py-1 text-[11px] font-bold text-white/40 font-[family-name:var(--font-inter)] uppercase tracking-[1.5px]">
              5 min
            </span>
          </div>

          <p className="font-[family-name:var(--font-inter)] text-[12px] text-white/30 uppercase tracking-[2px] mb-3">
            Meet Your AI Team · ChatGPT Guide 4 of 6
          </p>

          <h1 className="font-sans text-[32px] md:text-[46px] font-bold text-white mb-5 leading-tight">
            ChatGPT Image Generation
          </h1>
          <p className="font-[family-name:var(--font-inter)] text-[17px] text-white/50 leading-[1.8]">
            Create professional-looking visuals in seconds — without a designer, without Canva, without a budget.
          </p>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <div className="bg-[#10B981]/8 border border-[#10B981]/20 rounded-[14px] p-5">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-2">
              After This Guide, You Will Be Able To
            </p>
            <p className="font-sans text-[17px] font-bold text-white leading-[1.5]">
              Generate your first AI image using ChatGPT and use it for something real — a post, a logo concept, or a product visual.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-4">Why This Matters</h2>
          <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-4">
            <p>
              Hiring a designer costs money. Getting a professional photoshoot done costs more. For small business owners, freelancers, and students, this has always been a barrier.
            </p>
            <p>
              AI image generation changes this. You can create product photos, social media graphics, logo concepts, and marketing visuals in seconds — just by describing what you want in plain language.
            </p>
            <p>
              The images are not always perfect. But they are often good enough to test an idea, create a post, or show a client what you are thinking — without spending anything on design.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Core Concept</h2>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-6">
            <p className="font-sans text-[18px] font-bold text-white mb-3">How It Works</p>
            <div className="font-[family-name:var(--font-inter)] text-[16px] text-white/60 leading-[1.9] space-y-3">
              <p>
                ChatGPT uses a system called DALL-E to generate images from text descriptions. It is available to ChatGPT Plus subscribers (paid plan). Free users can try it in limited amounts.
              </p>
              <p>
                You just describe what you want — the more specific, the better. ChatGPT generates 1–4 images you can download and use.
              </p>
            </div>
          </div>

          <div className="bg-[#10B981]/5 border border-[#10B981]/15 rounded-[14px] p-6 mb-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-3">
              What to Include in Your Image Prompt
            </p>
            <div className="space-y-3">
              {[
                { label: "Subject", example: "A bar of handmade lavender soap" },
                { label: "Style", example: "Clean, minimalist / bright and colorful / rustic, natural" },
                { label: "Colors", example: "White and purple, soft pastel tones" },
                { label: "Background", example: "White marble surface / wooden table / outdoor setting" },
                { label: "Mood / Use", example: "Social media product photo, professional, lifestyle feel" },
              ].map(({ label, example }) => (
                <div key={label} className="flex gap-3">
                  <span className="font-[family-name:var(--font-inter)] text-[14px] font-bold text-white/50 w-20 shrink-0">{label}:</span>
                  <span className="font-[family-name:var(--font-inter)] text-[14px] text-white/60 italic">{example}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
            <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-3">Example Prompt</p>
            <p className="font-mono text-[15px] text-[#10B981] leading-[1.8]">
              &ldquo;Generate a product photo of handmade lavender soap bars. Style: clean and minimalist. Colors: white and soft purple. Background: white marble surface with a small sprig of dried lavender beside it. Make it look like a professional social media product photo for an online shop.&rdquo;
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-6">Real Example</h2>

          <div className="space-y-3">
            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Before AI Images</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8]">
                Ana sells homemade organic soap online. She takes photos with her phone, but they look amateur compared to big brand competitors. She cannot afford a photoshoot. Her posts get low engagement because the visuals do not look professional enough to stop the scroll.
              </p>
            </div>

            <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6">
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-[#10B981] uppercase tracking-[2px] mb-4">After AI Image Generation</p>
              <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/60 leading-[1.8] mb-3">
                Ana uses ChatGPT to generate product lifestyle photos of her soap in different settings — a marble bathroom counter, a wooden tray with flowers, a gift box arrangement. She uses these for Facebook posts and her Shopee listings. Her listings look professional, and customers comment on how beautiful the photos are.
              </p>
              <div className="bg-[#10B981]/8 border border-[#10B981]/15 rounded-lg px-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] text-[#10B981]/80 leading-[1.6]">
                  She generated 20 product images for free — no photographer, no studio, no equipment needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-2">Interactive Exercise</h2>
          <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/40 mb-6">About 5 minutes · ChatGPT (Plus recommended, free has limited tries)</p>

          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 mb-4">
            <div className="space-y-5">
              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 1 — Choose your subject</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  Think of a product you sell or want to sell, a business idea you have, or just something you want to see as an image.
                </p>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 2 — Use this prompt template</span>
                <div className="bg-[#0F0F1A] border border-white/[0.08] rounded-[10px] p-4 mt-2">
                  <p className="font-mono text-[15px] text-[#10B981] leading-[1.8]">
                    Generate an image of [YOUR PRODUCT OR IDEA] in a [STYLE: clean and professional / bright and colorful / minimalist / rustic and natural] style. The background should be [COLOR OR SETTING]. Make it look like a social media product photo that would stop someone from scrolling.
                  </p>
                </div>
              </div>

              <div>
                <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px]">Step 3 — Download and save</span>
                <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/65 mt-1 leading-[1.7]">
                  If you like the result, download it. If not, ask ChatGPT to try again with adjustments: &ldquo;Try the same image but with a darker background and a more luxurious feel.&rdquo;
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
                "Generated at least one AI image using ChatGPT",
                "Tried a specific, detailed prompt with subject, style, and background",
                "Downloaded or saved the image",
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
              Where in your life or work could AI-generated images save you time or money? <span className="text-white font-bold">Think about the visuals you currently spend time or money on — or avoid creating because it costs too much.</span>
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-10 max-w-3xl mx-auto">
          <h2 className="font-sans text-[20px] font-bold text-white mb-5">Key Takeaways</h2>
          <div className="space-y-3">
            {[
              "ChatGPT uses DALL-E to generate images from text descriptions — available for Plus subscribers.",
              "The more specific your prompt (subject, style, colors, background, mood), the better the result.",
              "AI images are not perfect, but they are good enough for social media, testing ideas, and visual brainstorming.",
              "You can ask ChatGPT to adjust an image — make it darker, add something, change the style — without starting over.",
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
            <p className="font-sans text-[16px] font-bold text-white mb-2">Create 5 images for a real use case.</p>
            <p className="font-[family-name:var(--font-inter)] text-[15px] text-white/55 leading-[1.7]">
              Pick something real — your business, a project, a social media account. Generate 5 AI images with different styles, backgrounds, and moods. Post the best one and see how people respond.
            </p>
          </div>
        </section>

        <section className="px-6 md:px-10 pb-20 max-w-3xl mx-auto">
          <div className="bg-[#18181F] border border-white/[0.08] rounded-[14px] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1.5px] mb-1">What&rsquo;s Next</p>
              <p className="font-sans text-[17px] font-bold text-white">ChatGPT Deep Research</p>
              <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/45 mt-1">
                Meet Your AI Team · ChatGPT Guide 5 of 6 · Beginner · 5 min
              </p>
            </div>
            <a
              href="/learn/ai-team/chatgpt-deep-research"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:opacity-90 transition-opacity text-white font-bold font-[family-name:var(--font-inter)] text-[15px] px-5 py-3 rounded-xl shrink-0"
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
