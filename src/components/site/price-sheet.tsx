import { business, formatPrice } from "@/lib/config";

const sheet = business.priceSheet;

export function PriceSheet() {
  return (
    <section id="prices" aria-labelledby="prices-title" className="on-ink mt-24 bg-ink text-paper md:mt-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-muted">Prices</p>
          <h2 id="prices-title" className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            {sheet.title}
          </h2>
          <p className="mt-4 max-w-[34rem] text-lg text-ink-muted">{sheet.intro}</p>

          <dl className="mt-12">
            {sheet.rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[1fr_auto] gap-x-6 border-t border-[#33363C] py-4 sm:grid-cols-[1fr_auto]">
                <dt>
                  <span className="font-medium">{row.label}</span>
                  <span className="block text-ink-muted">{row.note}</span>
                </dt>
                <dd className="tabular self-center text-right font-heading text-2xl font-bold">
                  {row.from && <span className="mr-2 align-middle text-sm font-medium text-ink-muted">from</span>}
                  {formatPrice(row.amount)}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-4 lg:col-start-9 lg:pt-32">
          <ul className="space-y-12">
            {sheet.promises.map((promise) => (
              <li key={promise.title} className="border-l-2 border-accent pl-6">
                <h3 className="text-2xl font-extrabold">{promise.title}</h3>
                <p className="mt-2 text-lg text-ink-muted">{promise.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
