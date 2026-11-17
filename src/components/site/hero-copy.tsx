"use client";

import { business, type Mode } from "@/lib/config";
import { useMode } from "@/lib/use-thermostat";

const MODES: Mode[] = ["cool", "heat", "hold"];

// All three versions sit in the same grid cell so the block keeps the height
// of the longest one and nothing below it moves when the dial changes mode.
export function HeroCopy() {
  const mode = useMode();
  return (
    <div className="grid">
      {MODES.map((m) => {
        const copy = business.hero[m];
        const active = m === mode;
        return (
          <div
            key={m}
            aria-hidden={!active}
            className={`col-start-1 row-start-1 ${active ? "visible" : "invisible"}`}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">{copy.eyebrow}</p>
            {active ? (
              <h1 className="mt-4 max-w-[14ch] text-5xl font-extrabold leading-[1.02] sm:text-6xl md:text-5xl lg:text-7xl">
                {copy.headline}
              </h1>
            ) : (
              <p className="mt-4 max-w-[14ch] font-heading text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-6xl md:text-5xl lg:text-7xl">
                {copy.headline}
              </p>
            )}
            <p className="mt-6 max-w-[34rem] text-lg text-muted">{copy.body}</p>
          </div>
        );
      })}
    </div>
  );
}
