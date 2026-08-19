"use client";

import { forwardRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { SALON, type Stylist } from "./data";

type StylistProfileProps = {
  stylist: Stylist;
  onClose: () => void;
};

const StylistProfile = forwardRef<HTMLButtonElement, StylistProfileProps>(function StylistProfile(
  { stylist, onClose },
  closeButtonRef
) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="stylist-profile-name"
      className="fixed inset-0 z-[200] overflow-y-auto bg-[#f6f1e9]"
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        aria-label="Close stylist profile"
        className="fixed top-6 right-6 md:top-8 md:right-8 z-[210] flex items-center justify-center w-11 h-11 rounded-full bg-[#141110] text-[#f6f1e9] hover:bg-[#241f1a] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a15a]"
      >
        <X size={20} />
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
        <div
          className="relative w-full h-[46vh] md:h-auto"
          style={{ viewTransitionName: `stylist-portrait-${stylist.slug}` } as React.CSSProperties}
        >
          <Image
            src={stylist.photo}
            alt={`${stylist.name}, ${stylist.role} at ${SALON.name}`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col justify-center px-[8%] md:px-[10%] py-14 md:py-[110px]">
          <div
            id="stylist-profile-content"
            style={{ viewTransitionName: "stylist-profile-content" } as React.CSSProperties}
          >
            <div
              id="stylist-profile-name"
              className="font-[family-name:var(--font-cormorant)] font-semibold text-[38px] md:text-[52px] leading-tight text-[#241f1a]"
              style={{ viewTransitionName: `stylist-name-${stylist.slug}` } as React.CSSProperties}
            >
              {stylist.name}
            </div>
            <div
              className="text-[12px] md:text-[13px] tracking-[1.5px] uppercase text-[#8a8378] mt-2 mb-8"
              style={{ viewTransitionName: `stylist-role-${stylist.slug}` } as React.CSSProperties}
            >
              {stylist.role}
            </div>

            <p className="text-[15px] md:text-[16px] leading-[1.8] text-[#5c5650] font-light max-w-[440px] mb-8">
              {stylist.bio}
            </p>

            <div className="flex flex-col gap-3 mb-10">
              <span className="text-[11px] tracking-[1.5px] uppercase text-[#c9a15a]">Specialties</span>
              <ul className="flex flex-wrap gap-2.5">
                {stylist.specialties.map((specialty) => (
                  <li
                    key={specialty}
                    className="px-4 py-2 border border-[#241f1a]/15 text-[13px] text-[#241f1a] font-light"
                  >
                    {specialty}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="#book"
              onClick={onClose}
              className="inline-flex items-center gap-2.5 px-[26px] py-[14px] bg-[#c9a15a] text-[#141110] text-[12px] tracking-[1.5px] uppercase font-medium hover:bg-[#e0be82] transition-colors w-fit"
            >
              Book with {stylist.name.split(" ")[0]} <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StylistProfile;
