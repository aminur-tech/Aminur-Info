"use client";

import React, { useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type SmoothScrollProps = {
  children: React.ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Initialize Lenis with premium, weightier physics
    const lenis = new Lenis({
      lerp: 0.07, // Slightly lowered for a more luxurious, weighty feel
      wheelMultiplier: 1,
      touchMultiplier: 2, // Prevents trackpads/touch from feeling sluggish
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    /* =========================
       LENIS → GSAP SYNC
    ========================== */
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    /* =========================
       GSAP → LENIS SYNC
    ========================== */
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);

    /* =========================
       PREVENT DOUBLE SMOOTHING
    ========================== */
    gsap.ticker.lagSmoothing(0);

    /* =========================
       DYNAMIC LAYOUT TRACKING
    ========================== */
    // This prevents ScrollTrigger markers from breaking when React 
    // dynamically renders content, opens accordions, or loads lazy images.
    let resizeObserver: ResizeObserver | null = null;
    
    if (contentRef.current) {
      resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(contentRef.current);
    } else {
      // Fallback just in case
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    }

    /* =========================
       CLEANUP
    ========================== */
    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div ref={contentRef} className="relative w-full">
      {children}
    </div>
  );
}