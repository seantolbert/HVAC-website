import { business } from "./config";

// The thermostat setpoint is shared by the hero copy, the dial, and the plan
// band, so it lives in a tiny external store instead of a context provider.
let setpoint = business.hero.defaultSetpoint;
const listeners = new Set<() => void>();

export const thermostat = {
  get: () => setpoint,
  getServer: () => business.hero.defaultSetpoint,
  set(value: number) {
    const { min, max } = business.hero;
    const next = Math.min(Math.max(Math.round(value), min), max);
    if (next === setpoint) return;
    setpoint = next;
    listeners.forEach((l) => l());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
