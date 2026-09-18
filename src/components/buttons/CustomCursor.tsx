"use client";
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Spring physics for extra smoothness 
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e) => {
      const target = e.target;
      // বাটন, লিংক বা ইন্টারঅ্যাক্টিভ এলিমেন্টের ওপর গেলে কার্সার বড় হবে
      if (target.closest('button, a, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* ১. মেইন ছোট ডট (Precision Dot) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-emerald-400 rounded-full pointer-events-none z-[9999] hidden lg:block"
        style={{
          x: mousePosition.x - 3,
          y: mousePosition.y - 3,
        }}
      />

      {/* ২. বড় রিং (Lagging Fluid Ring) */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9998] hidden lg:block border border-emerald-500/50"
        animate={{
          width: isHovering ? 64 : 32,
          height: isHovering ? 64 : 32,
          x: isHovering ? mousePosition.x - 32 : mousePosition.x - 16,
          y: isHovering ? mousePosition.y - 32 : mousePosition.y - 16,
          backgroundColor: isHovering ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0)",
          borderColor: isHovering ? "rgba(16, 185, 129, 1)" : "rgba(16, 185, 129, 0.5)",
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.6 }}
      />

      {/* ৩. আউটার গ্লো (Subtle Ambient Glow) */}
      {isHovering && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed top-0 left-0 w-[100px] h-[100px] bg-emerald-500/20 blur-3xl rounded-full pointer-events-none z-[9997] hidden lg:block"
          style={{
            x: mousePosition.x - 50,
            y: mousePosition.y - 50,
          }}
        />
      )}
    </>
  );
}