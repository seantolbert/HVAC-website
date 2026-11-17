import { Air, Callout, Drawing, stroke } from "./parts";

export function Ductwork() {
  return (
    <Drawing label="Cross-section of an attic with supply ducts, insulation, a return, and ceiling registers, with four numbered check points">
      {/* heat above the roof */}
      <path d="M 196 18 q 8 -8 16 0 t 16 0 M 252 18 q 8 -8 16 0 t 16 0" fill="none" stroke="var(--muted-ink)" strokeWidth="1.5" />
      {/* roof and trusses */}
      <path d="M 16 176 L 240 44 L 464 176" fill="none" {...stroke} strokeWidth="3" />
      <path d="M 110 120 L 110 236 M 240 44 L 240 236 M 370 120 L 370 236 M 110 236 L 240 120 L 370 236" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.45" />
      {/* insulation blanket */}
      <path d="M 40 236 q 10 -12 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0" fill="none" stroke="var(--muted-ink)" strokeWidth="1.5" />
      <rect x="32" y="236" width="416" height="10" fill="var(--seam)" {...stroke} />
      {/* trunk duct with joints */}
      <rect x="70" y="166" width="300" height="34" rx="4" fill="var(--paper)" {...stroke} />
      {[140, 210, 280].map((x) => (
        <line key={x} x1={x} y1={166} x2={x} y2={200} stroke="var(--ink)" strokeWidth="2.5" />
      ))}
      <rect x="40" y="160" width="34" height="46" fill="var(--seam)" {...stroke} />
      {/* leaking joint */}
      <path d="M 210 162 q -6 -8 0 -16 q 6 -8 0 -16 M 220 160 q 6 -8 0 -14" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      {/* drops to registers */}
      {[110, 250].map((x) => (
        <g key={x}>
          <path d={`M ${x - 12} 200 L ${x - 12} 246 M ${x + 12} 200 L ${x + 12} 246`} {...stroke} />
          <rect x={x - 22} y={246} width="44" height="8" fill="var(--paper)" {...stroke} />
          <Air x={x} y={266} dx={0} dy={1} len={30} />
        </g>
      ))}
      {/* return grille */}
      <path d="M 396 246 L 396 196 L 440 196 L 440 246" fill="var(--paper)" {...stroke} />
      <rect x="388" y="246" width="60" height="8" fill="var(--paper)" {...stroke} />
      <Air x={418} y={300} dx={0} dy={-1} len={30} />
      {/* rooms below */}
      <path d="M 16 254 L 464 254" {...stroke} strokeWidth="3" />
      <path d="M 180 254 L 180 336 M 330 254 L 330 336" stroke="var(--ink)" strokeWidth="1" opacity="0.45" />
      <path d="M 16 336 L 464 336" {...stroke} />
      <Callout n={1} x={168} y={108} to={[210, 150]} />
      <Callout n={2} x={44} y={300} to={[70, 240]} />
      <Callout n={3} x={460} y={150} to={[434, 198]} />
      <Callout n={4} x={300} y={300} to={[262, 252]} />
    </Drawing>
  );
}
