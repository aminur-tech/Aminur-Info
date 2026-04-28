"use client";
import React, { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useGSAP(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Smoothness factor (lower = smoother/slower)
      wheelMultiplier: 1.2, // Speed multiplier for mouse wheel
      gestureOrientation: "vertical",
    });

    // 2. Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Add Lenis to GSAP's ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // 4. Disable lag smoothing for GSAP to prevent "stuttering" on scroll
    gsap.ticker.lagSmoothing(0);

    return () => {
      // 5. Cleanup on unmount
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return <>{children}</>;
}