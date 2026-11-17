import { business, formatPrice } from "@/lib/config";
import { illustrations } from "./illustrations";
import { ServiceLink } from "./service-link";

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="mx-auto max-w-7xl px-4 pt-24 md:px-8 md:pt-32">
      <div className="relative pl-10 md:pl-16">
        <span data-airflow="spine" aria-hidden="true" className="absolute inset-y-0 left-3 w-px md:left-6" />
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">What we work on</p>
            <h2 id="services-title" className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Four systems, drawn the way we check them.
            </h2>
          </div>
          <p className="max-w-[34rem] self-end text-lg text-muted lg:col-span-5">
            Every numbered point on a drawing is something the tech tests on the visit, in that order.
          </p>
        </div>

        <div className="mt-16">
          {business.services.map((service, i) => {
            const Drawing = illustrations[service.illustration];
            const flip = i % 2 === 1;
            return (
              <article key={service.slug} aria-labelledby={`svc-${service.slug}`} className="border-t border-seam py-12 md:py-16">
                <div className="flex items-center gap-4">
                  <span
                    data-airflow="branch"
                    className="tabular rounded-brand border border-ink px-2 py-1 font-heading text-sm font-bold"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 id={`svc-${service.slug}`} className="text-3xl font-extrabold md:text-4xl">
                    {service.name}
                  </h3>
                </div>

                <div className="mt-8 grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
                  <div className={`max-w-2xl lg:col-span-7 lg:max-w-none ${flip ? "lg:order-2" : ""}`}>
                    <Drawing />
                  </div>
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                    <p className="max-w-[34rem] text-lg">{service.summary}</p>
                    <h4 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-muted">What we check</h4>
                    <ol className="mt-4 space-y-3">
                      {service.checks.map((check, n) => (
                        <li key={check} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="tabular mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border border-ink bg-accent font-heading text-sm font-extrabold text-accent-ink"
                          >
                            {n + 1}
                          </span>
                          <span>
                            <span className="sr-only">{n + 1}. </span>
                            {check}
                          </span>
                        </li>
                      ))}
                    </ol>
                    <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-4 border-t border-seam pt-6">
                      {service.prices.map((price) => (
                        <div key={price.label}>
                          <dt className="text-sm text-muted">{price.label}, from</dt>
                          <dd className="tabular font-heading text-3xl font-bold">{formatPrice(price.from)}</dd>
                        </div>
                      ))}
                    </dl>
                    <ServiceLink slug={service.slug} className="mt-6 inline-block font-medium underline decoration-accent decoration-2 underline-offset-4">
                      {service.quoteLabel}
                    </ServiceLink>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
