"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Totoo ba 'yung passive income?",
    a: "Totoo — pero hindi 'yung version na pinapakita sa TikTok. \"Passive\" doesn't mean walang ginagawa. Ang ibig sabihin, nag-invest ka ng heavy work sa simula (gumawa ng product, nag-build ng audience, nag-aral ng skill) tapos pwede na siyang kumita kahit tulog ka — eventually. Karamihan ng kumikita ng \"passively\" nag-trabaho ng 6-12 months bago nag-kick in 'yung results. 'Yung mga nakikita mong nag-quit ng work on Day 1? Usually may ipon, may asawa na kumikita, o years of experience na bago nila ginawa 'yun.",
  },
  {
    q: "Pwede ba talaga kumita online from the Philippines?",
    a: "Oo. Ang Pilipinas ang #2 freelancing country sa buong mundo. Filipinos earned over $1.5 billion sa online freelancing platforms in recent years. 'Yung BPO industry alone, 1.7 million Filipinos ang employed. Malaki ang demand sa remote Filipino workers — customer support, virtual assistance, graphic design, video editing, web development. Pero \"earning online\" doesn't mean walang trabaho — trabaho pa rin 'yan, ibang location lang.",
  },
  {
    q: "Kailangan ko bang mag-resign para magsimula?",
    a: "Hindi — at baka hindi mo pa dapat gawin 'yan ngayon. Karamihan ng successful na online earners nagsimula bilang side hustle habang may day job pa. 'Yung sweldo mo, pangtustos sa bills habang nag-aaral ka. Treat your first 3-6 months as training, hindi income replacement. 'Yung pinaka-malaking pagkakamali? Mag-resign agad, mauubos ang ipon, tapos babalik sa employment na stressed at may utang.",
  },
  {
    q: "Anong skill ang unahin kong aralin?",
    a: "Magsimula ka sa skills na in-demand at match sa alam mo na. Kung magaling ka sa tao — virtual assistance, customer support, community management. Kung organized ka — project management, data entry, bookkeeping. Kung creative ka — content writing, graphic design, video editing. Huwag mong habulin 'yung trending sa TikTok. Habulin mo 'yung kaya mong i-deliver within 30-60 days of practice.",
  },
  {
    q: "Mas maganda ba ang freelancing kaysa sa employment?",
    a: "Depende sa priorities mo. Freelancing gives you flexibility at mas mataas na earning potential — experienced Filipino freelancers earn ₱40,000-₱120,000+/month. Pero wala kang stability: walang 13th month pay, walang SSS/PhilHealth na sagot ng employer, walang paid leave. Ikaw ang bahala sa tax mo, ikaw ang hahanap ng clients, at may months na bababa ang income. Hindi siya mas maganda o mas pangit — iba lang ang trade-off.",
  },
  {
    q: "Pano 'yung pagbenta ng digital products? Ang dami kong nakikita na ganyan.",
    a: "Pwede — pero here's the reality: karamihan ng digital products (ebooks, templates, online courses) sells fewer than 50 copies. 'Yung mga nakikita mong successful sa TikTok, usually may malaking audience na bago pa nila ni-launch 'yung product. Kung wala ka pang audience, mas maraming oras ang mapupunta sa marketing kaysa sa actual na paggawa. Start by building a skill at audience muna. 'Yung product, susunod 'yan pag nagtitiwala na sa'yo ang tao.",
  },
  {
    q: "Magkano ang realistic na kita sa first 3 months ko?",
    a: "Kung nagsisimula ka from zero — expect ₱0 to ₱15,000/month sa first 3 months mo. Normal lang 'yan. Nag-aaral ka pa, nagbu-build ng portfolio, naghahanap ng first clients. By month 6-12, consistent freelancers typically earn ₱20,000-₱50,000/month. 'Yung jump to ₱80,000+, usually 1-2 years 'yan ng focused work. Kung may nag-promise sa'yo ng ₱100K sa first month — nagbebenta 'yan ng course, at malamang hindi talaga ito makatotohanan.",
  },
  {
    q: "Sulit ba ang mga online courses at mentorship programs?",
    a: "Meron sulit. Marami hindi. Bago ka bumili ng kahit anong course: check mo muna kung available 'yung info nang libre sa YouTube o sa government sites tulad ng TESDA Online. Ang magandang course, nakatipid ka ng oras kasi organized na 'yung info. Ang masamang course, ni-repackage lang 'yung libreng content na may hype. Red flags: income guarantees, countdown timers, \"3 slots na lang,\" at testimonials na walang verifiable names. Kung 'yung main income ng seller ay pagbebenta ng courses about making money — pag-isipan mo 'yan.",
  },
  {
    q: "Hindi ako tech-savvy. Kaya ko pa rin ba 'to?",
    a: "Oo. Maraming online jobs — virtual assistance, customer support, transcription, data entry — basic computer skills lang ang kailangan na malamang alam mo na (email, spreadsheets, video calls). Hindi mo kailangang mag-code. Hindi mo kailangang maging AI expert. Magsimula sa alam mo, tapos mag-level up habang tumatagal. TESDA at free platforms tulad ng Coursera at Google Digital Garage may free training na Filipino-friendly.",
  },
  {
    q: "Ano 'yung #1 na pinagkaiba ng mga nag-succeed online sa mga hindi?",
    a: "Hindi sila tumigil after month 2. 'Yun lang. Karamihan nag-quit within 60 days kasi hindi tugma 'yung results sa TikTok fantasy. 'Yung mga nag-succeed, hindi sila mas matalino o mas magaling — nag-stay lang sila nang matagal enough para mag-kick in 'yung compounding. Treat it like a real job. Mag-show up daily. Track your progress weekly. Mag-adjust monthly. 'Yung \"secret\"? Wala. Walang secret.",
  },
  {
    q: "Paano makakatulong ang cyberussell.com sa'yo?",
    a: "Ang Cyberussell.com ay ginawa para sa mga pilipinong nagsisimula pa lang sa online earning - walang hype, puro actionable. May mga free downloads ka dito tulang cheatsheets at guides apra sa AI tools at freelancing. At dahil bago-bago palang ito, siyempre dadami din ito. May blog posts na nagbi-breakdown ng mga trending topics nang walang sugarcoating. At may interactive tools na tutulong sa'yo para mafigure-out mo ng husto kung anong skill ang fit sa background mo. Hindi kami nagpo-promise ng overnight success - pero tutulungan ka naming mag-start ng tama.",
  },
];

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={i}
            className="border border-white/10 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/5 transition-colors"
            >
              <span className="text-white text-[15px] md:text-[16px] font-semibold pr-4">
                {faq.q}
              </span>
              <span
                className={`text-white/55 text-[20px] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
              >
                +
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-5 text-white/60 text-[14px] md:text-[15px] leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
