import { ImageResponse } from "next/og";
import { business, theme } from "@/lib/config";

export const alt = `${business.name}: a thermostat dial set to cool to 72 degrees`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const c = theme.colors;

export default function OpengraphImage() {
  const ticks = Array.from({ length: 31 }, (_, i) => i);
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: c.paperCool, padding: 72 }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 640 }}>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 800, color: c.ink }}>
            {business.shortName}
            <span style={{ marginLeft: 12, color: c.muted }}>HVAC</span>
          </div>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.02, color: c.ink, letterSpacing: -2 }}>
            {business.hero.cool.headline}
          </div>
          <div style={{ display: "flex", alignSelf: "flex-start", background: c.accent, color: c.accentInk, fontSize: 32, fontWeight: 700, padding: "16px 28px", borderRadius: 4 }}>
            {business.phone}
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "flex-end" }}>
          <svg width="420" height="420" viewBox="0 0 400 400">
            <circle cx="200" cy="200" r="198" fill={c.ink} />
            {ticks.map((i) => {
              const deg = 135 + (i / 30) * 270;
              const rad = (deg * Math.PI) / 180;
              const lit = i >= 12 && i <= 18;
              const inner = i % 5 === 0 ? 154 : 160;
              return (
                <line
                  key={i}
                  x1={200 + 176 * Math.cos(rad)}
                  y1={200 + 176 * Math.sin(rad)}
                  x2={200 + inner * Math.cos(rad)}
                  y2={200 + inner * Math.sin(rad)}
                  stroke={lit ? c.accent : c.inkMuted}
                  strokeWidth={i % 5 === 0 ? 3 : 2}
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx={200 + 168 * Math.cos((135 + 12 * 9) * (Math.PI / 180))} cy={200 + 168 * Math.sin((135 + 12 * 9) * (Math.PI / 180))} r="15" fill={c.accent} stroke={c.ink} strokeWidth="4" />
          </svg>
          <div style={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: "center", width: 420, right: 72, top: 260 }}>
            <div style={{ display: "flex", fontSize: 18, letterSpacing: 4, color: c.inkMuted }}>COOLING TO</div>
            <div style={{ display: "flex", fontSize: 110, fontWeight: 700, color: c.paper, letterSpacing: -4 }}>72°</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
