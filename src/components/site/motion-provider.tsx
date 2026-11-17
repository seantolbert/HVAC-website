"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll-linked motion and smooth scroll run only on desktop with motion allowed.
export const MOTION_QUERY = "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const media = window.matchMedia(MOTION_QUERY);
    let lenis: Lenis | null = null;
    const tick = (time: number) => lenis?.raf(time * 1000);

    const start = () => {
      if (lenis || !media.matches) return;
      lenis = new Lenis({ autoRaf: false, anchors: true });
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    };
    const stop = () => {
      gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
    };
    const sync = () => (media.matches ? start() : stop());

    sync();
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return children;
}
