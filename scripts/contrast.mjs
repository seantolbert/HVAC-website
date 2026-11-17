// Checks every text/background pair the page uses against WCAG AA (4.5:1).
import { readFileSync } from "node:fs";
const { colors: c } = JSON.parse(readFileSync(new URL("../src/config/theme.json", import.meta.url)));
const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const pairs = [
  ["ink", "paper"], ["ink", "paperCool"], ["muted", "paper"], ["muted", "paperCool"],
  ["paper", "ink"], ["inkMuted", "ink"], ["accent", "ink"], ["accentInk", "accent"],
];
let fail = 0;
for (const [fg, bg] of pairs) {
  const r = ratio(c[fg], c[bg]);
  const ok = r >= 4.5;
  if (!ok) fail++;
  console.log(`${ok ? "pass" : "FAIL"}  ${fg.padEnd(9)} on ${bg.padEnd(9)} ${r.toFixed(2)}:1`);
}
console.log(`accent on paper (non-text only): ${ratio(c.accent, c.paper).toFixed(2)}:1`);
process.exit(fail ? 1 : 0);
