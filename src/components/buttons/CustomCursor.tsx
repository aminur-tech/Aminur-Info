"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);

  // 1. Zero-rerender motion values for instant tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // 2. Fluid spring physics for the trailing ring
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      // Updates the motion values directly, bypassing React state
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect interactive elements for hover state
      if (target.closest('button, a, input, textarea, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 
        Note: For the best experience, add this to your global CSS:
        @media (min-width: 1024px) {
          * { cursor: none !important; }
        }
      */}

      {/* 1. Precision Dot (Instant Tracking) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-2 w-2 rounded-full bg-[#b6d900] mix-blend-difference lg:block"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 0 : 1, // Shrink dot when hovering
          opacity: isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 2. Fluid Ring (Spring Physics) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] hidden rounded-full border border-[#b6d900]/60 mix-blend-difference lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 72 : 36,
          height: isHovering ? 72 : 36,
          backgroundColor: isHovering ? "rgba(182, 217, 0, 0.15)" : "rgba(182, 217, 0, 0)",
          borderColor: isHovering ? "rgba(182, 217, 0, 1)" : "rgba(182, 217, 0, 0.5)",
        }}
        transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.5 }}
      />

      {/* 3. Subtle Ambient Glow (Optional) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] hidden h-32 w-32 rounded-full bg-[#b6d900]/10 blur-[40px] lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
      />
    </>
  );
}