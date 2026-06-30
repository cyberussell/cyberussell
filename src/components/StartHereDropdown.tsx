"use client";

const choices = [
  {
    color: "bg-blue-500/10 border-blue-500/30",
    dot: "🟦",
    title: "I'm completely new",
    desc: "Discover Your Path",
    href: "/discover",
  },
  {
    color: "bg-yellow-500/10 border-yellow-500/30",
    dot: "🟨",
    title: "I already have skills",
    desc: "Skill Finder",
    href: "/#skill-finder",
  },
  {
    color: "bg-green-500/10 border-green-500/30",
    dot: "🟩",
    title: "I'm ready to earn",
    desc: "8 Ways to Earn Online",
    href: "/guides/8-ways",
  },
];

export default function StartHereDropdown() {
  return (
    <div className="absolute top-full left-0 mt-1 w-72 bg-[#18181F] border border-white/[0.1] rounded-xl shadow-xl p-3 z-50">
      <div className="flex flex-col gap-2">
        {choices.map((choice, i) => (
          <a
            key={i}
            href={choice.href}
            className={`border rounded-lg p-4 transition-all hover:border-opacity-100 hover:bg-opacity-20 ${choice.color}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-[18px] mt-0.5">{choice.dot}</span>
              <div className="flex-1">
                <p className="font-bold text-[13px] text-white">
                  {choice.title}
                </p>
                <p className="text-[12px] text-white/60 mt-0.5">
                  {choice.desc}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
