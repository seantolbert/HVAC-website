"use client";

import { business, formatPrice } from "@/lib/config";
import { useMode } from "@/lib/use-thermostat";

const plan = business.plan;

// The season that matches the hero thermostat's current mode is marked, so
// the dial the visitor played with carries through to the plan.
export function PlanBand() {
  const mode = useMode();
  return (
    <section aria-labelledby="plan-title" className="mx-auto max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-12 rounded-brand border border-ink p-6 md:p-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Maintenance</p>
          <h2 id="plan-title" className="mt-4 text-4xl font-extrabold leading-tight">
            {plan.name}
          </h2>
          <p className="tabular mt-4 font-heading text-5xl font-bold">
            {formatPrice(plan.price)}
            <span className="text-xl font-medium text-muted"> / {plan.period}</span>
          </p>
          <p className="mt-4 text-lg text-muted">{plan.intro}</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          {plan.seasons.map((season) => {
            const current = season.mode === mode;
            return (
              <div
                key={season.mode}
                className={`rounded-brand border-t-4 p-6 ${current ? "border-accent bg-paper" : "border-seam"}`}
              >
                <p className="flex flex-wrap items-center justify-between gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
                  {season.when}
                  {current && (
                    <span className="rounded-brand bg-ink px-2 py-0.5 text-xs tracking-[0.12em] text-paper">
                      Matches your dial
                    </span>
                  )}
                </p>
                <h3 className="mt-2 text-2xl font-extrabold">{season.title}</h3>
                <p className="mt-2">{season.body}</p>
              </div>
            );
          })}
          <ul className="flex flex-wrap gap-x-8 gap-y-2 sm:col-span-2">
            {plan.perks.map((perk) => (
              <li key={perk} className="flex items-center gap-3 font-medium">
                <span aria-hidden="true" className="h-0.5 w-3 bg-accent" />
                {perk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
