"use client";

import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { HiOutlineBars3 } from "react-icons/hi2";
import { HiX } from "react-icons/hi";
import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import ToggleBtn from "../buttons/ToggleBtn";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

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

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* 
          Sticky Navbar 
          Using 'fixed' and 'inset-x-0' ensures it stretches across mobile.
          'z-40' keeps it below the drawer overlay.
      */}
      <header className="fixed inset-x-0 top-0 z-40 w-full border-b border-[#17211d]/10 bg-[#f6f6f2]/90 backdrop-blur-xl transition-all duration-300 dark:border-[#f1f4eb]/10 dark:bg-[#101512]/90">
        <div className="mx-auto flex h-[4.5rem] w-full max-w-7xl items-center justify-between px-2">
          
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#657b00] shadow-lg shadow-[#657b00]/20">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="font-serif text-xl font-bold tracking-tight text-[#17211d] dark:text-[#f1f4eb]">
              Aminur<span className="text-[#657b00]">.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group relative text-xs font-bold uppercase tracking-[0.16em] text-[#52605a] transition-all duration-300 hover:text-[#657b00] dark:text-[#aab5ad] dark:hover:text-[#a5bd2a]"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-[#657b00] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            <div className="border-l border-[#17211d]/15 pl-4 dark:border-[#f1f4eb]/15">
              <ToggleBtn />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-full p-2 text-2xl text-[#17211d] transition hover:bg-[#e9eee4] dark:text-[#f1f4eb] dark:hover:bg-[#202b24] md:hidden"
            aria-label="Open Menu"
          >
            <HiOutlineBars3 />
          </button>
        </div>
      </header>

      {/* Spacer - Ensures content doesn't hide under the fixed header */}
      <div className="h-16 w-full" />

      {/* Mobile Drawer UI */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay - z-50 to stay above header */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer - z-50 to stay above header */}
            <Motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-[#17211d]/10 bg-[#f6f6f2] shadow-2xl dark:border-[#f1f4eb]/10 dark:bg-[#101512] md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-[#17211d]/10 px-5 py-5 dark:border-[#f1f4eb]/10">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#17211d] dark:text-[#f1f4eb]">
                    Aminur<span className="text-[#657b00]">.</span>
                  </h2>
                  <p className="text-xs text-[#657b00] dark:text-[#a5bd2a]">
                    Full Stack Developer
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <ToggleBtn />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-2xl text-[#17211d] transition hover:rotate-90 hover:bg-[#e9eee4] dark:text-[#f1f4eb] dark:hover:bg-[#202b24]"
                  >
                    <HiX />
                  </button>
                </div>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col py-4">
                {navLinks.map((link, idx) => (
                  <Motion.button
                    key={link.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => scrollToSection(link.id)}
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-[0.14em] text-[#52605a] transition-all duration-300 hover:bg-[#e9eee4] hover:text-[#657b00] dark:text-[#aab5ad] dark:hover:bg-[#202b24] dark:hover:text-[#a5bd2a]"
                  >
                    {link.name}
                  </Motion.button>
                ))}
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}