"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { business, formatPrice, telHref, type Urgency } from "@/lib/config";

const { symptoms, urgencyLabels, intro } = business.triage;

const urgencyStyle: Record<Urgency, string> = {
  today: "bg-accent text-accent-ink border-ink",
  soon: "bg-transparent text-ink border-ink",
  later: "bg-transparent text-muted border-seam",
};

export function SymptomTriage() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const symptom = symptoms[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next: number | null = null;
    if (e.key in moves) next = (active + moves[e.key] + symptoms.length) % symptoms.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = symptoms.length - 1;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="triage" aria-labelledby="triage-title" className="mx-auto max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Before you call</p>
          <h2 id="triage-title" className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            What’s it doing?
          </h2>
          <p className="mt-4 max-w-[34rem] text-lg text-muted">{intro}</p>

          <div
            role="tablist"
            aria-label="Symptoms"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="mt-8 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1"
          >
            {symptoms.map((s, i) => {
              const selected = i === active;
              return (
                <button
                  key={s.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={selected}
                  aria-controls="triage-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`flex items-center justify-between gap-4 rounded-brand border px-4 py-3 text-left font-medium ${
                    selected ? "border-ink bg-ink text-paper" : "border-seam hover:border-ink"
                  }`}
                >
                  {s.label}
                  <span
                    aria-hidden="true"
                    className={`size-2 shrink-0 rounded-full ${selected ? "bg-accent" : "bg-seam"}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div
          role="tabpanel"
          id="triage-panel"
          aria-labelledby={`tab-${symptom.id}`}
          tabIndex={0}
          className="rounded-brand border border-ink p-6 md:p-12 lg:col-span-8"
        >
          <div className="flex flex-wrap items-center gap-4">
            <span className={`rounded-brand border px-3 py-1 text-sm font-bold uppercase tracking-[0.12em] ${urgencyStyle[symptom.urgency]}`}>
              {urgencyLabels[symptom.urgency]}
            </span>
            <h3 className="text-2xl font-extrabold md:text-3xl">{symptom.label}</h3>
          </div>
          <p className="mt-4 max-w-[38rem] text-lg">{symptom.urgencyNote}</p>

          <div className="mt-12 grid gap-12 md:grid-cols-2">
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Usually one of these</h4>
              <ol className="mt-4 space-y-3">
                {symptom.causes.map((cause, i) => (
                  <li key={cause} className="flex gap-3 border-b border-seam pb-3">
                    <span className="tabular font-heading font-bold text-muted">{i + 1}</span>
                    {cause}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">Safe to check yourself</h4>
              <ul className="mt-4 space-y-3">
                {symptom.tryFirst.map((step) => (
                  <li key={step} className="flex gap-3 border-b border-seam pb-3">
                    <span aria-hidden="true" className="mt-3 h-0.5 w-3 shrink-0 bg-accent" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-ink pt-6">
            <div>
              <p className="text-sm text-muted">Typical cost, diagnosis included</p>
              <p className="tabular font-heading text-4xl font-bold md:text-5xl">
                {formatPrice(symptom.cost[0])}–{formatPrice(symptom.cost[1])}
              </p>
            </div>
            {symptom.urgency === "today" ? (
              <a href={telHref} className="tabular rounded-brand bg-accent px-6 py-4 font-heading text-lg font-bold text-accent-ink hover:bg-ink hover:text-paper">
                Call now · {business.phone}
              </a>
            ) : (
              <a href="#quote" className="rounded-brand bg-ink px-6 py-4 font-heading text-lg font-bold text-paper hover:bg-accent hover:text-accent-ink">
                Request a visit
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
