"use client";
import React, { useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlineBars3 } from "react-icons/hi2";
import ToggleBtn from "../buttons/ToggleBtn"; // Ensure this path is correct
import { HiX } from "react-icons/hi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setIsOpen(false);
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 transition-colors duration-300">
      <div className="full md:w-11/12 mx-auto px-4 md:px-6 h-16 flex justify-between items-center">

        {/* Logo */}
        <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-md" />
          </div>
          <span className="text-slate-900 dark:text-white font-bold text-lg tracking-tighter">
            Aminur<span className="text-emerald-500">.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
          <div className="pl-4 border-l border-slate-200 dark:border-slate-800">
            <ToggleBtn />
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden p-2 text-slate-900 dark:text-white text-2xl"
          aria-label="Open menu"
        >
          <HiOutlineBars3 />
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-white dark:bg-slate-950 md:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-slate-200 dark:border-slate-800">
              <span className="font-bold text-slate-900 dark:text-white uppercase tracking-widest text-xs">Menu</span>
              <div className="flex items-center gap-2">
                <ToggleBtn />
                <button onClick={() => setIsOpen(false)} className="p-2 text-2xl text-slate-900 dark:text-white hover:rotate-90 transition-transform">
                  <HiX />
                </button>
              </div>
            </div>

            <nav className="flex flex-col p-8 gap-2 bg-white dark:bg-slate-950  justify-center items-start">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-left text-2xl font-bold text-slate-700 dark:text-slate-200 hover:text-emerald-500 transition-colors"
                >
                  {link.name}
                </button>
              ))}

            </nav>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}