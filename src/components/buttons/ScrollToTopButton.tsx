"use client";

import React, { useState } from "react";
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useMotionValueEvent 
} from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Highly optimized scroll listener from Framer Motion
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 400);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="
            fixed bottom-6 left-6 z-[90] 
            flex h-12 w-12 items-center justify-center 
            rounded-full border border-[#17211d]/10 bg-white/80 text-[#17211d] 
            shadow-xl backdrop-blur-xl transition-colors 
            hover:border-[#b6d900] hover:bg-[#b6d900] 
            md:bottom-10 md:left-10 
            dark:border-white/10 dark:bg-[#17211d]/80 dark:text-[#f1f4ef] 
            dark:hover:bg-[#b6d900] dark:hover:text-[#101613]
          "
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}