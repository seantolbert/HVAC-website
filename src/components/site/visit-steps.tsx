import { business } from "@/lib/config";

export function VisitSteps() {
  const { title, steps } = business.visit;
  return (
    <section aria-labelledby="visit-title" className="mx-auto max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
      <h2 id="visit-title" className="max-w-[18ch] text-4xl font-extrabold leading-tight md:text-5xl">
        {title}
      </h2>
      <ol className="mt-12 grid gap-0 md:grid-cols-5 md:gap-6">
        {steps.map((step, i) => (
          <li key={step.title} className="relative border-l border-ink pb-8 pl-6 md:border-t md:border-l-0 md:pt-6 md:pb-0 md:pl-0">
            <span
              aria-hidden="true"
              className="absolute top-0 -left-[5px] size-2.5 rounded-full bg-accent ring-1 ring-ink md:-top-[5px] md:left-0"
            />
            <p className="tabular font-heading text-sm font-bold text-muted">Step {i + 1}</p>
            <h3 className="mt-2 text-xl font-extrabold">{step.title}</h3>
            <p className="mt-2 text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
