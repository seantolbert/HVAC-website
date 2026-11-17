"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MOTION_QUERY } from "./motion-provider";

type Pt = [number, number];

// An orthogonal polyline with rounded elbows, like bent duct.
function elbowPath(points: Pt[], radius: number) {
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [px, py] = points[i - 1];
    const [cx, cy] = points[i];
    const [nx, ny] = points[i + 1];
    const inLen = Math.hypot(cx - px, cy - py);
    const outLen = Math.hypot(nx - cx, ny - cy);
    const r = Math.min(radius, inLen / 2, outLen / 2);
    if (r < 1) {
      d += ` L ${cx} ${cy}`;
      continue;
    }
    const a: Pt = [cx - ((cx - px) / inLen) * r, cy - ((cy - py) / inLen) * r];
    const b: Pt = [cx + ((nx - cx) / outLen) * r, cy + ((ny - cy) / outLen) * r];
    d += ` L ${a[0]} ${a[1]} Q ${cx} ${cy} ${b[0]} ${b[1]}`;
  }
  const last = points[points.length - 1];
  return `${d} L ${last[0]} ${last[1]}`;
}

// The page's one motion concept: a duct line leaves the thermostat, elbows
// into the services gutter, and branches to each service. Desktop with motion
// allowed scrubs it with scroll; everyone else sees it drawn complete.
export function AirflowPath({ branches }: { branches: number }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const mainRef = useRef<SVGPathElement>(null);
  const branchRefs = useRef<(SVGPathElement | null)[]>([]);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const svg = svgRef.current;
    const root = svg?.parentElement;
    const main = mainRef.current;
    if (!svg || !root || !main) return;

    let mm: gsap.MatchMedia | null = null;
    let frame = 0;

    const build = () => {
      const base = root.getBoundingClientRect();
      const rel = (el: Element) => {
        const r = el.getBoundingClientRect();
        return { left: r.left - base.left, top: r.top - base.top, width: r.width, height: r.height };
      };
      const startEl = root.querySelector("[data-airflow='start']");
      const spineEl = root.querySelector("[data-airflow='spine']");
      const branchEls = Array.from(root.querySelectorAll("[data-airflow='branch']"));
      if (!startEl || !spineEl || branchEls.length === 0) return;

      svg.setAttribute("viewBox", `0 0 ${base.width} ${base.height}`);
      const start = rel(startEl);
      const spine = rel(spineEl);
      const sx = start.left;
      const sy = start.top;
      const spineX = spine.left + spine.width / 2;
      const turnY = Math.max(sy + 32, spine.top - 48);
      const ends = branchEls.map((el) => {
        const r = rel(el);
        return { x: r.left - 10, y: r.top + r.height / 2 };
      });
      const lastY = ends[ends.length - 1].y;

      main.setAttribute(
        "d",
        elbowPath(
          [
            [sx, sy],
            [sx, turnY],
            [spineX, turnY],
            [spineX, lastY],
          ],
          32,
        ),
      );
      ends.forEach((end, i) => {
        const path = branchRefs.current[i];
        const node = nodeRefs.current[i];
        if (!path || !node) return;
        path.setAttribute(
          "d",
          `M ${spineX} ${end.y} L ${end.x} ${end.y} M ${end.x - 7} ${end.y - 6} L ${end.x} ${end.y} L ${end.x - 7} ${end.y + 6}`,
        );
        node.setAttribute("cx", String(spineX));
        node.setAttribute("cy", String(end.y));
      });

      mm?.revert();
      mm = gsap.matchMedia();
      const paths = [main, ...branchRefs.current.filter((p): p is SVGPathElement => !!p)];
      mm.add(MOTION_QUERY, () => {
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap.set(nodeRefs.current, { scale: 0, transformOrigin: "center", transformBox: "fill-box" });
        gsap.to(main, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: startEl,
            start: "bottom 85%",
            endTrigger: branchEls[branchEls.length - 1],
            end: "center 60%",
            scrub: 0.6,
          },
        });
        branchEls.forEach((el, i) => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "center 75%", end: "center 55%", scrub: 0.6 },
          });
          tl.to(nodeRefs.current[i], { scale: 1, duration: 0.15, ease: "none" });
          tl.to(branchRefs.current[i], { strokeDashoffset: 0, duration: 0.85, ease: "none" }, 0.1);
        });
      });
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(build);
    };

    schedule();
    document.fonts?.ready.then(schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mm?.revert();
    };
  }, [branches]);

  return (
    <svg
      ref={svgRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      preserveAspectRatio="none"
    >
      <g fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path ref={mainRef} />
        {Array.from({ length: branches }, (_, i) => (
          <path
            key={i}
            ref={(el) => {
              branchRefs.current[i] = el;
            }}
          />
        ))}
      </g>
      {Array.from({ length: branches }, (_, i) => (
        <circle
          key={i}
          r="5"
          fill="var(--accent)"
          stroke="var(--ink)"
          strokeWidth="1.5"
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        />
      ))}
    </svg>
  );
}
