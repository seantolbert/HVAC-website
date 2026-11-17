"use client";

import { useSyncExternalStore } from "react";
import { business } from "@/lib/config";
import { statusAt } from "@/lib/hours";

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

const snapshot = () => {
  const s = statusAt(new Date());
  return `${s.open ? 1 : 0}|${s.label}`;
};

// Rendered on the server as the always-true hours line, then swapped for the
// live status in Phoenix time once the browser takes over.
export function StatusPill({ onInk = false }: { onInk?: boolean }) {
  const value = useSyncExternalStore(subscribe, snapshot, () => null);
  const [open, label] = value
    ? [value.startsWith("1"), value.slice(2)]
    : [true, `${business.hours.onCall.label} ${business.hours.onCall.time}`];

  return (
    <span
      className={`inline-flex items-center gap-2 text-sm font-medium ${onInk ? "text-paper" : "text-ink"}`}
    >
      <span className="relative flex size-2.5" aria-hidden="true">
        <span className={`absolute inset-0 rounded-full ${open ? "bg-accent" : "bg-muted"}`} />
      </span>
      {label}
    </span>
  );
}
