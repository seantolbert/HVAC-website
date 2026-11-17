import { business } from "@/lib/config";

const BLADE = "M16 16C15.2 10.4 18.4 5.6 24.6 5.2C25.4 10.8 21.8 15 16 16Z";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <rect x="0.75" y="0.75" width="30.5" height="30.5" rx="4" fill="var(--ink)" />
      {[0, 120, 240].map((r) => (
        <path key={r} d={BLADE} fill="var(--accent)" transform={`rotate(${r} 16 16)`} />
      ))}
      <circle cx="16" cy="16" r="2.4" fill="var(--ink)" stroke="var(--accent)" strokeWidth="1.2" />
    </svg>
  );
}

export function Logo({ onInk = false }: { onInk?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2">
      <LogoMark className="size-8 shrink-0" />
      <span className="font-heading text-lg font-extrabold leading-none tracking-tight">
        {business.shortName}{" "}
        <span className={`font-bold ${onInk ? "inline text-ink-muted" : "hidden text-muted sm:inline"}`}>HVAC</span>
      </span>
    </span>
  );
}
