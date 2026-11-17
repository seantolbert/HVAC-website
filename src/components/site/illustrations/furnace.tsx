import { Air, Callout, Drawing, stroke } from "./parts";

export function Furnace() {
  return (
    <Drawing label="Cutaway of a gas furnace showing burners, heat exchanger, blower, and filter, with four numbered check points">
      <rect x="96" y="326" width="288" height="10" fill="var(--seam)" {...stroke} />
      {/* supply plenum and flue */}
      <rect x="168" y="36" width="144" height="26" fill="var(--paper)" {...stroke} />
      <path d="M 296 36 L 296 14 M 312 36 L 312 14" {...stroke} />
      {/* cabinet */}
      <rect x="160" y="62" width="160" height="264" fill="var(--paper)" {...stroke} />
      {/* heat exchanger clamshells */}
      {[180, 222, 264].map((x) => (
        <path key={x} d={`M ${x} 168 L ${x} 96 Q ${x + 18} 74 ${x + 36} 96 L ${x + 36} 168 Z`} fill="var(--seam)" {...stroke} />
      ))}
      {/* burners and flames */}
      <rect x="176" y="190" width="128" height="10" fill="var(--seam)" {...stroke} />
      {[198, 240, 282].map((x) => (
        <path key={x} d={`M ${x - 8} 188 Q ${x - 6} 176 ${x} 170 Q ${x + 6} 176 ${x + 8} 188 Z`} fill="var(--accent)" stroke="var(--ink)" strokeWidth="1.25" />
      ))}
      {/* flame sensor rod */}
      <path d="M 304 182 L 316 182 M 304 182 L 296 176" {...stroke} strokeWidth="2.5" />
      {/* gas line and valve */}
      <path d="M 320 196 L 356 196 L 356 236 L 404 236" fill="none" {...stroke} strokeWidth="4" />
      <rect x="340" y="186" width="24" height="20" rx="2" fill="var(--seam)" {...stroke} />
      {/* divider and blower */}
      <path d="M 160 214 L 320 214" {...stroke} />
      <circle cx="240" cy="268" r="42" fill="var(--seam)" {...stroke} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <line
            key={i}
            x1={240 + 18 * Math.cos(a)}
            y1={268 + 18 * Math.sin(a)}
            x2={240 + 38 * Math.cos(a)}
            y2={268 + 38 * Math.sin(a)}
            stroke="var(--ink)"
            strokeWidth="1.25"
          />
        );
      })}
      <circle cx="240" cy="268" r="14" fill="var(--paper)" {...stroke} />
      {/* return and filter */}
      <rect x="100" y="228" width="60" height="90" fill="var(--paper)" {...stroke} />
      <path d="M 112 236 L 124 246 L 112 256 L 124 266 L 112 276 L 124 286 L 112 296 L 124 306" fill="none" stroke="var(--ink)" strokeWidth="1.25" />
      <Air x={62} y={272} dx={1} dy={0} len={30} />
      <Air x={208} y={30} />
      <Air x={248} y={30} />
      <Callout n={1} x={420} y={150} to={[314, 182]} />
      <Callout n={2} x={110} y={110} to={[184, 128]} />
      <Callout n={3} x={408} y={300} to={[282, 268]} />
      <Callout n={4} x={62} y={322} to={[118, 300]} />
    </Drawing>
  );
}
