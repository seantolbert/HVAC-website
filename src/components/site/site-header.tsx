import { business, telHref } from "@/lib/config";
import { Logo } from "./logo";
import { StatusPill } from "./status-pill";

const nav = [
  { href: "#services", label: "Services" },
  { href: "#triage", label: "What’s it doing?" },
  { href: "#prices", label: "Prices" },
  { href: "#quote", label: "Get a quote" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-seam bg-surface">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 md:h-20 md:px-8">
        <a href="#top" aria-label={`${business.name}, back to top`} className="rounded-brand">
          <Logo />
        </a>
        <nav aria-label="Sections" className="hidden lg:block">
          <ul className="flex gap-8 text-base font-medium">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="underline-offset-8 decoration-2 decoration-accent hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex shrink-0 items-center gap-6">
          <span className="hidden md:inline-flex">
            <StatusPill />
          </span>
          <a
            href={telHref}
            className="tabular whitespace-nowrap rounded-brand bg-ink px-3 py-2 font-heading text-base font-bold text-paper md:px-4"
          >
            <span className="sr-only">Call </span>
            {business.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
