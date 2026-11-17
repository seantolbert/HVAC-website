import { business, telHref } from "@/lib/config";
import { Logo } from "./logo";
import { StatusPill } from "./status-pill";

export function SiteFooter() {
  const { office, onCall } = business.hours;
  const area = business.serviceArea;
  return (
    <footer className="on-ink mt-24 bg-ink text-paper md:mt-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-8 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Logo onInk />
          <a href={telHref} className="tabular mt-8 block font-heading text-4xl font-extrabold md:text-5xl">
            {business.phone}
          </a>
          <div className="mt-4">
            <StatusPill onInk />
          </div>
        </div>
        <div className="lg:col-span-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-muted">Where we go</h2>
          <p className="mt-4 text-lg">
            Within {area.radiusMiles} miles of {area.base}:
          </p>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-lg">
            {area.towns.map((town) => (
              <li key={town}>{town}</li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-3">
          <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-muted">Hours</h2>
          <dl className="mt-4 space-y-3">
            {[office, onCall].map((h) => (
              <div key={h.label}>
                <dt className="text-ink-muted">{h.label}</dt>
                <dd>
                  {h.days}, {h.time}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="border-t border-[#33363C]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-ink-muted md:flex-row md:justify-between md:px-8">
          <p>
            {business.name} · {business.license}
          </p>
          <p>{business.demoNote}</p>
        </div>
      </div>
    </footer>
  );
}
