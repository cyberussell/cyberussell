import FloatingServiceCard from "@/components/marketing/FloatingServiceCard";
import type { HeroServiceItem } from "@/components/marketing/heroServices.data";

interface FloatingServiceCardsProps {
  services: HeroServiceItem[];
}

// A single centered grid — 1 column on mobile, 2 on tablet, 3 on desktop.
// Every card is the same size with the same gap; no per-card position/tilt
// offsets, just a gentle vertical float so the grid still feels alive.
const FLOAT_DURATIONS = [6.1, 7.4, 8.3, 5.8, 7.0, 8.0];
const FLOAT_DELAYS = [0, 0.5, 1, 0.3, 0.8, 1.3];
const FLOAT_AMPLITUDES = [8, 9, 8, 8, 9, 8];

export default function FloatingServiceCards({ services }: FloatingServiceCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
      {services.map((service, i) => (
        <FloatingServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          icon={service.icon}
          href={service.href}
          floatDuration={FLOAT_DURATIONS[i]}
          floatDelay={FLOAT_DELAYS[i]}
          floatAmplitude={FLOAT_AMPLITUDES[i]}
        />
      ))}
    </div>
  );
}
