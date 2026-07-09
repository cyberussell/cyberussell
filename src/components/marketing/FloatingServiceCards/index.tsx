import FloatingServiceCard from "@/components/marketing/FloatingServiceCard";
import type { HeroServiceItem } from "@/components/marketing/heroServices.data";

interface FloatingServiceCardsProps {
  services: HeroServiceItem[];
}

// Two symmetric columns flanking the centered portrait — 3 cards per side,
// identical card size, identical vertical gap within each column, and
// identical horizontal gap from the portrait on both sides (the parent grid
// in Hero applies the same `gap-x` between all three tracks). No per-card
// position/scale offsets — every card is laid out purely by flexbox/grid.
const FLOAT_DURATIONS = [6.1, 7.4, 8.3, 5.8, 7.0, 8.0];
const FLOAT_DELAYS = [0, 0.5, 1, 0.3, 0.8, 1.3];
const FLOAT_AMPLITUDES = [8, 9, 8, 8, 9, 8];
const FLOAT_X_DRIFTS = [3, -3, 3, -3, 3, -3];

export default function FloatingServiceCards({ services }: FloatingServiceCardsProps) {
  const left = services.slice(0, 3);
  const right = services.slice(3, 6);

  return (
    <>
      {/* Desktop (xl, 1280px+) — left column, portrait (sibling grid item), right column.
          Below xl there isn't room for a full-size portrait plus two card columns without
          overflow, so tablet/small-laptop falls back to the stacked grid below. */}
      <div className="hidden xl:order-1 xl:flex xl:flex-col xl:justify-center xl:gap-8">
        {left.map((service, i) => (
          <FloatingServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={service.href}
            floatDuration={FLOAT_DURATIONS[i]}
            floatDelay={FLOAT_DELAYS[i]}
            floatAmplitude={FLOAT_AMPLITUDES[i]}
            floatXDrift={FLOAT_X_DRIFTS[i]}
            rotateY={8}
            rotateZ={-1.5}
          />
        ))}
      </div>

      <div className="hidden xl:order-3 xl:flex xl:flex-col xl:justify-center xl:gap-8">
        {right.map((service, i) => (
          <FloatingServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            icon={service.icon}
            href={service.href}
            floatDuration={FLOAT_DURATIONS[i + 3]}
            floatDelay={FLOAT_DELAYS[i + 3]}
            floatAmplitude={FLOAT_AMPLITUDES[i + 3]}
            floatXDrift={FLOAT_X_DRIFTS[i + 3]}
            rotateY={-8}
            rotateZ={1.5}
          />
        ))}
      </div>

      {/* Mobile / tablet / small laptop — stacked grid below the portrait */}
      <div className="order-2 mt-10 grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-4 xl:hidden">
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
    </>
  );
}
