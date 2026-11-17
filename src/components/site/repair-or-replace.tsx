"use client";

import { useId, useState } from "react";
import { business, formatPrice } from "@/lib/config";
import { AGE_MAX, COST_MAX, parseAmount, repairOrReplace } from "@/lib/repair-or-replace";

const copy = business.repairOrReplace;

export function RepairOrReplace() {
  const [ageRaw, setAgeRaw] = useState("12");
  const [costRaw, setCostRaw] = useState("650");
  const ids = { age: useId(), cost: useId(), result: useId() };

  const age = parseAmount(ageRaw, AGE_MAX);
  const cost = parseAmount(costRaw, COST_MAX);
  const result = repairOrReplace(age, cost, copy.threshold);

  return (
    <section aria-labelledby="ror-title" className="mx-auto max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-12 border-t border-seam pt-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Repair or replace</p>
          <h2 id="ror-title" className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Do the math before you pay for a repair.
          </h2>
          <p className="mt-4 max-w-[34rem] text-lg text-muted">{copy.intro}</p>
        </div>

        <div className="lg:col-span-7">
          <div className="grid gap-6 sm:grid-cols-2">
            <label htmlFor={ids.age} className="block">
              <span className="font-medium">System age, in years</span>
              <input
                id={ids.age}
                inputMode="numeric"
                autoComplete="off"
                value={ageRaw}
                onChange={(e) => setAgeRaw(e.target.value)}
                aria-describedby={ids.result}
                className="tabular mt-2 block w-full rounded-brand border border-ink bg-transparent px-4 py-3 font-heading text-3xl font-bold"
              />
            </label>
            <label htmlFor={ids.cost} className="block">
              <span className="font-medium">Repair quote, in dollars</span>
              <span className="relative mt-2 block">
                <span aria-hidden="true" className="absolute top-1/2 left-4 -translate-y-1/2 font-heading text-3xl font-bold text-muted">
                  $
                </span>
                <input
                  id={ids.cost}
                  inputMode="numeric"
                  autoComplete="off"
                  value={costRaw}
                  onChange={(e) => setCostRaw(e.target.value)}
                  aria-describedby={ids.result}
                  className="tabular block w-full rounded-brand border border-ink bg-transparent py-3 pr-4 pl-10 font-heading text-3xl font-bold"
                />
              </span>
            </label>
          </div>

          <div id={ids.result} aria-live="polite" className="mt-8">
            {result.kind === "empty" ? (
              <p className="text-lg text-muted">Enter the system’s age and the repair quote to see where it lands.</p>
            ) : (
              <>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <p className="tabular font-heading text-2xl font-bold">
                    {age} × {formatPrice(cost ?? 0)} = {result.score.toLocaleString("en-US")}
                  </p>
                  <p className="text-muted">against {copy.threshold.toLocaleString("en-US")}</p>
                </div>

                {/* meter: the line at the middle is the threshold */}
                <div className="relative mt-4 h-3 rounded-brand bg-seam" aria-hidden="true">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-brand ${result.verdict === "replace" ? "bg-accent" : "bg-ink"}`}
                    style={{ width: `${Math.max(result.share * 100, 1)}%` }}
                  />
                  <div className="absolute -inset-y-2 left-1/2 w-0.5 bg-ink" />
                </div>
                <div className="mt-2 flex justify-between text-sm text-muted" aria-hidden="true">
                  <span>Repair</span>
                  <span>Replace</span>
                </div>

                <p className="mt-8 font-heading text-3xl font-extrabold">
                  {result.verdict === "replace" ? copy.replaceVerdict : copy.repairVerdict}
                </p>
                <p className="mt-2 max-w-[38rem] text-lg">
                  {result.verdict === "replace" ? copy.replaceBody : copy.repairBody}
                </p>
                {age !== null && age >= copy.r22Age && (
                  <p className="mt-4 max-w-[38rem] border-l-2 border-accent pl-4">{copy.r22Note}</p>
                )}
              </>
            )}
            <p className="mt-6 text-sm text-muted">{copy.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
