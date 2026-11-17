import businessJson from "@/config/business.json";
import themeJson from "@/config/theme.json";

export type Mode = "cool" | "heat" | "hold";
export type Urgency = "today" | "soon" | "later";
export type IllustrationKey = "condenser" | "heat-pump" | "furnace" | "ductwork";

export type Service = {
  slug: string;
  name: string;
  illustration: IllustrationKey;
  quoteLabel: string;
  summary: string;
  checks: string[];
  prices: { label: string; from: number }[];
};

export type Symptom = {
  id: string;
  label: string;
  urgency: Urgency;
  urgencyNote: string;
  causes: string[];
  tryFirst: string[];
  cost: [number, number];
};

type HeroCopy = { eyebrow: string; headline: string; body: string };

export type Business = {
  sample: boolean;
  demoNote: string;
  name: string;
  shortName: string;
  summary: string;
  phone: string;
  phoneE164: string;
  email: string;
  address: string;
  license: string;
  timezone: string;
  hours: {
    office: { label: string; days: string; time: string; weekdays: number[]; open: number; close: number };
    onCall: { label: string; days: string; time: string; open: number; close: number };
  };
  serviceArea: { base: string; radiusMiles: number; towns: string[] };
  hero: {
    indoorTemp: number;
    defaultSetpoint: number;
    min: number;
    max: number;
    cool: HeroCopy;
    heat: HeroCopy;
    hold: HeroCopy;
    dialHint: string;
    facts: string[];
    secondary: string;
  };
  services: Service[];
  triage: { intro: string; urgencyLabels: Record<Urgency, string>; symptoms: Symptom[] };
  repairOrReplace: {
    threshold: number;
    intro: string;
    repairVerdict: string;
    repairBody: string;
    replaceVerdict: string;
    replaceBody: string;
    r22Age: number;
    r22Note: string;
    disclaimer: string;
  };
  priceSheet: {
    title: string;
    intro: string;
    rows: { label: string; amount: number; from?: boolean; note: string }[];
    promises: { title: string; body: string }[];
  };
  visit: { title: string; steps: { title: string; body: string }[] };
  plan: {
    name: string;
    price: number;
    period: string;
    intro: string;
    seasons: { mode: "cool" | "heat"; when: string; title: string; body: string }[];
    perks: string[];
  };
  quote: { title: string; body: string; times: string[]; success: string; demoNote: string };
};

export type Theme = {
  colors: {
    ink: string;
    paper: string;
    paperCool: string;
    accent: string;
    accentInk: string;
    muted: string;
    seam: string;
    inkMuted: string;
  };
  fonts: { heading: string; body: string };
  radius: string;
};

export const business = businessJson as Business;
export const theme = themeJson as Theme;

export const telHref = `tel:${business.phoneE164}`;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export const formatPrice = (amount: number) => usd.format(amount);

export function modeFor(setpoint: number): Mode {
  const indoor = business.hero.indoorTemp;
  if (setpoint < indoor) return "cool";
  if (setpoint > indoor) return "heat";
  return "hold";
}
