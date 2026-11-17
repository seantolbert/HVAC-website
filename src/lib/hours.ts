import { business } from "./config";

export type Status = { open: boolean; label: string };

// Phoenix doesn't observe daylight saving, so a fixed zone lookup is exact.
export function statusAt(date: Date): Status {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: business.timezone,
    weekday: "short",
    hour: "numeric",
    hourCycle: "h23",
  }).formatToParts(date);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const weekdayName = parts.find((p) => p.type === "weekday")?.value ?? "Sun";
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(weekdayName);

  const { office, onCall } = business.hours;
  if (office.weekdays.includes(weekday) && hour >= office.open && hour < office.close) {
    return { open: true, label: "Open now" };
  }
  if (hour >= onCall.open && hour < onCall.close) {
    return { open: true, label: "On call until midnight" };
  }
  return { open: false, label: "Answering again at 7am" };
}
