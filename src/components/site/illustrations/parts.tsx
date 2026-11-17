import type { ReactNode } from "react";

// Shared drawing language for every cutaway: graphite strokes, paper and seam
// fills, orange only for moving air and numbered check points.
export const stroke = { stroke: "var(--ink)", strokeWidth: 1.75, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

export function Drawing({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label={label} className="block h-auto w-full">
      {children}
    </svg>
  );
}

export function Callout({ n, x, y, to }: { n: number; x: number; y: number; to: [number, number] }) {
  return (
    <g>
      <line x1={x} y1={y} x2={to[0]} y2={to[1]} stroke="var(--ink)" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx={to[0]} cy={to[1]} r="3" fill="var(--ink)" />
      <circle cx={x} cy={y} r="13" fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.5" />
      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
        fontWeight="800"
        fill="var(--accent-ink)"
        fontFamily="var(--heading-family)"
      >
        {n}
      </text>
    </g>
  );
}

// A short airflow arrow: shaft plus chevron, pointing along (dx, dy).
export function Air({ x, y, dx = 0, dy = -1, len = 28 }: { x: number; y: number; dx?: number; dy?: number; len?: number }) {
  const ex = x + dx * len;
  const ey = y + dy * len;
  const px = -dy * 6;
  const py = dx * 6;
  const bx = ex - dx * 8;
  const by = ey - dy * 8;
  return (
    <g fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d={`M ${x} ${y} L ${ex} ${ey}`} />
      <path d={`M ${bx + px} ${by + py} L ${ex} ${ey} L ${bx - px} ${by - py}`} />
    </g>
  );
}

export function Louvers({ x1, x2, y1, y2, gap = 8 }: { x1: number; x2: number; y1: number; y2: number; gap?: number }) {
  const lines = [];
  for (let x = x1; x <= x2; x += gap) lines.push(<line key={x} x1={x} y1={y1} x2={x} y2={y2} />);
  return (
    <g stroke="var(--ink)" strokeWidth="1" opacity="0.55">
      {lines}
    </g>
  );
}
