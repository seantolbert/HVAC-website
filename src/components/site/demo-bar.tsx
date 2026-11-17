import { business } from "@/lib/config";

export function DemoBar() {
  if (!business.sample) return null;
  return (
    <div className="on-ink bg-ink text-paper">
      <p className="mx-auto max-w-7xl px-4 py-2 text-sm md:px-8">{business.demoNote}</p>
    </div>
  );
}
