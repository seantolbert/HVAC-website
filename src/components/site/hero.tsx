import { business, telHref } from "@/lib/config";
import { HeroCopy } from "./hero-copy";
import { ThermostatDial } from "./thermostat-dial";

export function Hero() {
  return (
    <section id="top" className="mx-auto max-w-7xl px-4 pt-12 md:px-8 md:pt-16 lg:pt-24">
      <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-7">
          <HeroCopy />
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <a
              href={telHref}
              className="tabular rounded-brand bg-accent px-6 py-4 font-heading text-lg font-bold text-accent-ink hover:bg-ink hover:text-paper"
            >
              Call now · {business.phone}
            </a>
            <a href="#quote" className="font-medium underline decoration-accent decoration-2 underline-offset-4">
              {business.hero.secondary}
            </a>
          </div>
          <ul className="mt-12 grid max-w-xl grid-cols-1 gap-3 border-t border-seam pt-6 sm:grid-cols-3 sm:gap-6">
            {business.hero.facts.map((fact) => (
              <li key={fact} className="flex gap-3 text-base font-medium sm:flex-col sm:gap-2">
                <span aria-hidden="true" className="mt-2.5 h-0.5 w-4 shrink-0 bg-accent sm:mt-0" />
                {fact}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-5">
          <ThermostatDial />
        </div>
      </div>
    </section>
  );
}
