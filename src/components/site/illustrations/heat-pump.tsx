import { Air, Callout, Drawing, Louvers, stroke } from "./parts";

export function HeatPump() {
  return (
    <Drawing label="Cutaway of a split heat pump: outdoor unit, line set through the wall, and indoor air handler, with four numbered check points">
      {/* ground and wall */}
      <rect x="20" y="320" width="230" height="12" fill="var(--seam)" {...stroke} />
      <rect x="252" y="40" width="22" height="292" fill="var(--seam)" {...stroke} />
      <path d="M 252 70 L 274 92 M 252 130 L 274 152 M 252 190 L 274 212 M 252 250 L 274 272" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
      {/* outdoor unit */}
      <rect x="36" y="166" width="168" height="154" fill="var(--paper)" {...stroke} />
      <rect x="30" y="156" width="180" height="12" rx="2" fill="var(--paper)" {...stroke} />
      <Louvers x1={46} x2={102} y1={180} y2={308} gap={7} />
      <rect x="112" y="180" width="82" height="128" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" strokeDasharray="6 4" />
      {/* reversing valve: body with four stubs */}
      <rect x="128" y="222" width="50" height="18" rx="9" fill="var(--seam)" {...stroke} />
      <path d="M 153 222 L 153 206 M 138 240 L 138 256 M 153 240 L 153 256 M 168 240 L 168 256" {...stroke} />
      <rect x="132" y="268" width="44" height="34" rx="14" fill="var(--seam)" {...stroke} />
      {/* line set */}
      <path d="M 204 286 L 244 286 L 244 300 L 292 300 L 292 250" fill="none" stroke="var(--ink)" strokeWidth="9" strokeLinejoin="round" />
      <path d="M 204 286 L 244 286 L 244 300 L 292 300 L 292 250" fill="none" stroke="var(--seam)" strokeWidth="5" strokeLinejoin="round" />
      <path d="M 204 304 L 236 304 L 236 314 L 304 314 L 304 250" fill="none" {...stroke} strokeWidth="3" />
      {/* indoor air handler */}
      <rect x="284" y="56" width="152" height="196" fill="var(--paper)" {...stroke} />
      <path d="M 300 160 L 360 92 L 420 160" fill="none" {...stroke} strokeWidth="3" />
      <path d="M 312 160 L 360 106 L 408 160" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.5" />
      <rect x="296" y="160" width="128" height="10" fill="var(--seam)" {...stroke} />
      <circle cx="360" cy="208" r="30" fill="var(--seam)" {...stroke} />
      <circle cx="360" cy="208" r="10" fill="var(--paper)" {...stroke} />
      <path d="M 424 166 L 456 166 L 456 196" fill="none" {...stroke} strokeWidth="3" />
      {/* heat moves both ways */}
      <Air x={60} y={140} dx={1} dy={0} len={44} />
      <Air x={150} y={124} dx={-1} dy={0} len={44} />
      <Air x={330} y={48} />
      <Air x={390} y={48} />
      <Callout n={1} x={226} y={150} to={[166, 224]} />
      <Callout n={2} x={20} y={244} to={[60, 244]} />
      <Callout n={3} x={226} y={346} to={[268, 300]} />
      <Callout n={4} x={462} y={232} to={[456, 196]} />
    </Drawing>
  );
}
