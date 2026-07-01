import type { Metadata } from "next";
import SkillLessonLayout from "@/components/SkillLessonLayout";

export const metadata: Metadata = { title: "Print-Ready Designs: Flyers, Posters, and Merch — Graphic Design | Cyberussell", description: "How to produce print-quality work using AI tools without Photoshop.", alternates: { canonical: "https://www.cyberussell.com/learn/skills/graphic-design/print-ready-designs" }, openGraph: { title: "Print-Ready Designs with AI | Cyberussell", description: "Produce print-quality flyers, posters, and merch with AI tools.", url: "https://www.cyberussell.com/learn/skills/graphic-design/print-ready-designs", siteName: "Cyberussell", images: [{ url: "/og-image.jpg?v=2", width: 1200, height: 630 }], type: "article" } };

export default function LessonPage() {
  return (
    <SkillLessonLayout
      skill="Graphic Design"
      skillHref="/learn/skills/graphic-design"
      lessonNum="6" lessonTotal="6"
      title="Print-Ready Designs: Flyers, Posters, and Merch"
      subtitle="Print has different rules from digital. Know them before you send to the printer."
      tags={["Print"]}
      readTime="10 min"
      objective="Produce a print-ready design file using Canva — with the correct dimensions, resolution, and color settings for physical printing."
      sections={[
        { heading: "Why Print is Different from Digital", body: "A design that looks great on screen can look terrible when printed. The main reasons: resolution (low-res screen images look pixelated in print), color mode (screens use RGB, printers use CMYK), and bleed (print designs need extra space around the edges so trimming doesn't cut into your design)." },
        { heading: "The Print Design Checklist", items: [
          { title: "Resolution: 300 DPI minimum", desc: "Digital screens need 72 DPI. Print needs 300 DPI minimum. Always create print designs at 300 DPI. In Canva, when you download, select 'PDF Print' or 'PNG at 300 DPI'. Never scale up a low-res design." },
          { title: "Color mode: CMYK not RGB", desc: "RGB is for screens — it has a wider color range. CMYK is for printing. Some colors that look vibrant on screen will look duller when printed. Canva handles this automatically in its print workflow. If using Photoshop, change mode to CMYK before finalizing." },
          { title: "Bleed: add 3mm around the edges", desc: "Printers trim paper with slight variation. Add 3mm of bleed (extra space beyond your design edge) so if the cut is slightly off, it doesn't cut into your important content. Canva has a bleed setting in its print products." },
          { title: "Safe zone: keep important content 5mm from edges", desc: "Don't put text, logos, or key visuals within 5mm of the edge of your design. This is the 'safe zone' — anything outside it risks being trimmed." },
          { title: "Font embedding and outlines", desc: "When sending to a printer, convert text to outlines or embed fonts. Otherwise the printer may substitute a different font if they don't have yours installed. In Canva's PDF print export, this is handled automatically." },
        ] },
      ]}
      promptText={`I need to design a [flyer / poster / business card / t-shirt design] for [describe the purpose]. The key information to include is: [list the essential text and information]. The tone/style should be [describe]. I'm printing at [describe the print shop or method — local printer / Canva Print / online print service]. Help me: 1) Suggest the exact dimensions to use, 2) Describe the visual layout and hierarchy, 3) Suggest a color scheme that will look good in print, 4) List what to check before I send the file.`}
      checklistItems={["My design is created at 300 DPI", "I've added 3mm bleed to my document", "All important text is within the 5mm safe zone", "I'm exporting as PDF Print (not PNG for social)", "Colors look acceptable in CMYK mode"]}
      reflectText={`Print design is one of the most underrated freelance skills because so many designers only know digital. <span class="text-white font-bold">How many local businesses in your area could use better print materials than what they currently have?</span>`}
      takeaways={["300 DPI for print. Always. Low-res designs look terrible and unprofessional when printed.", "Add bleed. Every print design needs 3mm of bleed around all edges to account for trimming variation.", "CMYK for print, RGB for screen. Colors shift between these modes — what looks bright on screen may look muted in print.", "Convert fonts to outlines before sending to a printer. Canva's PDF Print export handles this automatically."]}
      challengeTitle="Design a flyer for a real or fictional event."
      challengeBody="Pick any event — a freelance workshop, a product launch, a local bazaar. Design a print-ready A5 flyer using the checklist above. Export it as PDF Print. This is a portfolio piece."
      nextTitle="Continue with Writing & Copywriting"
      nextHref="/learn/skills/writing-copywriting"
      nextMeta="Build Real Skills · Pillar 5 · Writing & Copywriting Track"
    />
  );
}
