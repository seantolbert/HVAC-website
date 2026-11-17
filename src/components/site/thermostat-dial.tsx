"use client";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import { business, modeFor } from "@/lib/config";
import { thermostat } from "@/lib/thermostat-store";
import { useSetpoint } from "@/lib/use-thermostat";

const { min: MIN, max: MAX, indoorTemp: INDOOR } = business.hero;
const SIZE = 400;
const C = SIZE / 2;
const START = 135; // degrees, clockwise from 3 o'clock; the gap sits at the bottom
const SWEEP = 270;
const TICK_OUTER = 176;
const TICK_INNER = 160;
const TRACK = 168;

const angleOf = (v: number) => START + ((v - MIN) / (MAX - MIN)) * SWEEP;

function polar(deg: number, r: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) };
}

function arc(from: number, to: number, r: number) {
  const a = polar(angleOf(from), r);
  const b = polar(angleOf(to), r);
  const large = angleOf(to) - angleOf(from) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

// Maps a pointer position to a temperature. Positions in the bottom gap clamp
// to whichever end of the scale they are nearer.
function valueAt(deg: number) {
  let d = deg < 0 ? deg + 360 : deg;
  if (d < 90) d += 360;
  if (d < START) return MIN;
  if (d > START + SWEEP) return MAX;
  return MIN + ((d - START) / SWEEP) * (MAX - MIN);
}

const MODE_LABEL = { cool: "Cooling to", heat: "Heating to", hold: "Holding at" } as const;

const ticks = Array.from({ length: MAX - MIN + 1 }, (_, i) => MIN + i);

export function ThermostatDial() {
  const setpoint = useSetpoint();
  const mode = modeFor(setpoint);
  const svgRef = useRef<SVGSVGElement>(null);
  const dragging = useRef(false);

  // The page surface follows the dial: fully cool a few degrees below indoor,
  // fully warm a few degrees above.
  useEffect(() => {
    const warmth = Math.min(Math.max(0.5 + (setpoint - INDOOR) / 8, 0), 1);
    document.documentElement.style.setProperty("--warmth", warmth.toFixed(3));
  }, [setpoint]);

  const setFromPointer = (e: PointerEvent<SVGSVGElement>) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const next = valueAt((Math.atan2(dy, dx) * 180) / Math.PI);
    // Ignore jumps across the bottom gap while dragging.
    if (dragging.current && Math.abs(next - thermostat.get()) > 8) return;
    thermostat.set(next);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1,
      PageUp: 5,
      PageDown: -5,
    };
    if (e.key in steps) thermostat.set(thermostat.get() + steps[e.key]);
    else if (e.key === "Home") thermostat.set(MIN);
    else if (e.key === "End") thermostat.set(MAX);
    else return;
    e.preventDefault();
  };

  const knob = polar(angleOf(setpoint), TRACK);
  const indoorMark = polar(angleOf(INDOOR), TICK_OUTER + 12);
  const [litFrom, litTo] = setpoint < INDOOR ? [setpoint, INDOOR] : [INDOOR, setpoint];

  return (
    <div className="relative flex flex-col items-center gap-4 pb-12">
      <div
        role="slider"
        tabIndex={0}
        aria-label="Thermostat setpoint"
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={setpoint}
        aria-valuetext={`${MODE_LABEL[mode]} ${setpoint} degrees. Inside is ${INDOOR} degrees.`}
        onKeyDown={onKeyDown}
        className="relative w-full max-w-[18rem] rounded-full sm:max-w-[22rem] lg:max-w-[26rem]"
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="block w-full cursor-grab touch-none select-none active:cursor-grabbing"
          aria-hidden="true"
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            dragging.current = false;
            setFromPointer(e);
            dragging.current = true;
          }}
          onPointerMove={(e) => dragging.current && setFromPointer(e)}
          onPointerUp={() => (dragging.current = false)}
          onPointerCancel={() => (dragging.current = false)}
        >
          <circle cx={C} cy={C} r={C - 2} fill="var(--ink)" />
          <circle cx={C} cy={C} r={C - 14} fill="none" stroke="#2A2D32" strokeWidth="1" />

          {ticks.map((t) => {
            const major = t % 5 === 0;
            const a = polar(angleOf(t), TICK_OUTER);
            const b = polar(angleOf(t), major ? TICK_INNER - 6 : TICK_INNER);
            const lit = mode !== "hold" && t >= litFrom && t <= litTo;
            return (
              <line
                key={t}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={lit ? "var(--accent)" : major ? "var(--ink-muted)" : "#4A4E55"}
                strokeWidth={major ? 3 : 2}
                strokeLinecap="round"
              />
            );
          })}

          {mode !== "hold" && (
            <path
              d={arc(litFrom, litTo, TRACK - 22)}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity="0.35"
              strokeWidth="2"
            />
          )}

          {[60, 70, 80, 90].map((t) => {
            const p = polar(angleOf(t), 132);
            return (
              <text
                key={t}
                x={p.x}
                y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="var(--ink-muted)"
                fontSize="15"
                fontFamily="var(--heading-family)"
                fontWeight="600"
              >
                {t}
              </text>
            );
          })}

          {/* indoor reading marker */}
          <circle cx={indoorMark.x} cy={indoorMark.y} r="4" fill="var(--paper)" />

          <text
            x={C}
            y={C - 62}
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontSize="15"
            fontWeight="600"
            letterSpacing="2.5"
            fontFamily="var(--body-family)"
          >
            {MODE_LABEL[mode].toUpperCase()}
          </text>
          <text
            x={C + 10}
            y={C + 30}
            textAnchor="middle"
            fill="var(--paper)"
            fontSize="104"
            fontWeight="700"
            letterSpacing="-4"
            fontFamily="var(--heading-family)"
            style={{ fontVariantNumeric: "tabular-nums" }}
          >
            {setpoint}°
          </text>
          <text
            x={C}
            y={C + 72}
            textAnchor="middle"
            fill="var(--ink-muted)"
            fontSize="16"
            fontFamily="var(--body-family)"
          >
            Inside {INDOOR}°
          </text>

          <circle cx={knob.x} cy={knob.y} r="15" fill="var(--accent)" stroke="var(--ink)" strokeWidth="4" />
          <circle cx={knob.x} cy={knob.y} r="4" fill="var(--ink)" />

          <text
            x={C}
            y={SIZE - 34}
            textAnchor="middle"
            fill="#6B7078"
            fontSize="12"
            fontWeight="700"
            letterSpacing="3"
            fontFamily="var(--heading-family)"
          >
            {business.shortName.toUpperCase()}
          </text>
        </svg>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => thermostat.set(thermostat.get() - 1)}
          className="rounded-brand border border-ink px-4 py-2 font-medium hover:bg-ink hover:text-paper"
        >
          <span aria-hidden="true">− </span>Cooler
        </button>
        <button
          type="button"
          onClick={() => thermostat.set(thermostat.get() + 1)}
          className="rounded-brand border border-ink px-4 py-2 font-medium hover:bg-ink hover:text-paper"
        >
          <span aria-hidden="true">+ </span>Warmer
        </button>
      </div>
      <p className="text-sm text-muted">{business.hero.dialHint}</p>
      <span data-airflow="start" className="absolute bottom-0 left-1/2 size-px" aria-hidden="true" />
    </div>
  );
}
