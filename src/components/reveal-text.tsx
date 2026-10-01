"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type Props = {
  as?: "h1" | "h2";
  className?: string;
  children: React.ReactNode;
  // Play on page load (hero) instead of when scrolled into view.
  immediate?: boolean;
};

// Lines slide up from behind a mask. Starts hidden so there is no flash of unsplit text.
export function RevealText({ as: Tag = "h2", className = "", children, immediate = false }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current!;
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        autoSplit: true,
        // Returning the tween lets autoSplit keep its progress when it re-splits on resize / font load.
        onSplit: (self) => {
          gsap.set(el, { visibility: "visible" });
          return gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.2,
            stagger: 0.12,
            ease: "expo.out",
            delay: immediate ? 0.15 : 0,
            scrollTrigger: immediate ? undefined : { trigger: el, start: "top 85%", once: true },
          });
        },
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={`invisible ${className}`}>
      {children}
    </Tag>
  );
}
