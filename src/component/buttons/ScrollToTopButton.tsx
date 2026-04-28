"use client";
import React, { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi2";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 400px (standard UX for landing pages)
      setShowButton(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed right-6 bottom-6 z-50 p-3 rounded-full bg-emerald-500 text-white shadow-lg transition-all duration-300 ease-out hover:bg-emerald-600 hover:-translate-y-1 active:scale-95 ${
        showButton 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      <HiArrowUp className="w-6 h-6" />
    </button>
  );
};

export default ScrollToTopButton;