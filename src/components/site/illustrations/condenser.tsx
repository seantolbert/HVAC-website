import { Air, Callout, Drawing, Louvers, stroke } from "./parts";

export function Condenser() {
  return (
    <Drawing label="Cutaway of an outdoor AC unit with four numbered check points">
      <rect x="64" y="318" width="352" height="14" fill="var(--seam)" {...stroke} />
      {/* fan guard dome */}
      <path d="M 120 96 Q 240 36 360 96" fill="var(--paper)" {...stroke} />
      <path d="M 160 82 Q 240 52 320 82 M 200 70 L 200 96 M 240 64 L 240 96 M 280 70 L 280 96" fill="none" stroke="var(--ink)" strokeWidth="1" opacity="0.55" />
      <rect x="84" y="92" width="312" height="14" rx="2" fill="var(--paper)" {...stroke} />
      {/* cabinet */}
      <rect x="92" y="106" width="296" height="212" fill="var(--paper)" {...stroke} />
      <Louvers x1={104} x2={216} y1={118} y2={306} />
      {/* cutaway window */}
      <rect x="228" y="118" width="108" height="188" fill="var(--paper)" stroke="var(--ink)" strokeWidth="1.25" strokeDasharray="6 4" />
      {/* fan blade and motor */}
      <ellipse cx="256" cy="134" rx="24" ry="5" fill="var(--seam)" {...stroke} />
      <ellipse cx="308" cy="134" rx="24" ry="5" fill="var(--seam)" {...stroke} />
      <circle cx="282" cy="134" r="7" fill="var(--ink)" />
      <rect x="272" y="141" width="20" height="28" rx="3" fill="var(--seam)" {...stroke} />
      <path d="M 240 176 L 324 176" {...stroke} />
      {/* compressor */}
      <rect x="252" y="206" width="60" height="92" rx="26" fill="var(--seam)" {...stroke} />
      <path d="M 300 214 C 330 196 352 250 388 262" fill="none" {...stroke} />
      <path d="M 304 236 C 330 236 350 286 388 284" fill="none" {...stroke} />
      {/* electrical panel with capacitor */}
      <rect x="344" y="118" width="36" height="74" fill="var(--paper)" {...stroke} />
      <rect x="352" y="134" width="20" height="36" rx="3" fill="var(--seam)" {...stroke} />
      <ellipse cx="362" cy="134" rx="10" ry="3" fill="var(--paper)" {...stroke} />
      <circle cx="358" cy="180" r="2" fill="var(--ink)" />
      <circle cx="368" cy="180" r="2" fill="var(--ink)" />
      {/* line set and service valves */}
      <path d="M 388 262 L 432 262 M 388 284 L 432 284" fill="none" {...stroke} strokeWidth="4" />
      <rect x="424" y="254" width="14" height="16" rx="2" fill="var(--seam)" {...stroke} />
      <rect x="424" y="276" width="14" height="16" rx="2" fill="var(--seam)" {...stroke} />
      <Air x={196} y={52} dx={-0.4} dy={-1} />
      <Air x={240} y={44} />
      <Air x={284} y={52} dx={0.4} dy={-1} />
      <Callout n={1} x={440} y={118} to={[372, 150]} />
      <Callout n={2} x={44} y={180} to={[112, 196]} />
      <Callout n={3} x={150} y={36} to={[256, 132]} />
      <Callout n={4} x={452} y={324} to={[432, 288]} />
    </Drawing>
  );
}
