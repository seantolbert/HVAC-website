export type Verdict = "repair" | "replace";

export type RepairResult =
  | { kind: "empty" }
  | { kind: "result"; score: number; verdict: Verdict; share: number };

export const AGE_MAX = 40;
export const COST_MAX = 50000;

// Parses raw input text into a whole number within [0, max], or null when it isn't usable.
export function parseAmount(raw: string, max: number): number | null {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  if (cleaned === "") return null;
  const value = Number(cleaned);
  if (!Number.isFinite(value)) return null;
  return Math.min(Math.max(Math.round(value), 0), max);
}

// The "$5,000 rule": age in years times the repair quote. Share is the score's
// position on a meter that runs to twice the threshold.
export function repairOrReplace(age: number | null, cost: number | null, threshold: number): RepairResult {
  if (age === null || cost === null || age === 0 || cost === 0) return { kind: "empty" };
  const score = age * cost;
  return {
    kind: "result",
    score,
    verdict: score > threshold ? "replace" : "repair",
    share: Math.min(score / (threshold * 2), 1),
  };
}
