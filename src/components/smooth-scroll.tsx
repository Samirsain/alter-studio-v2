"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

// Shared so overlays (the mobile menu) can pause scrolling.
export const scroller: { lenis?: Lenis } = {};

// Inertia scrolling on GSAP's ticker so ScrollTrigger stays in sync.
// Touch keeps native scrolling (Lenis default); reduced-motion users get native scrolling everywhere.
export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.085 });
    const tick = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    scroller.lenis = lenis;
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      scroller.lenis = undefined;
    };
  }, []);

  return null;
}
