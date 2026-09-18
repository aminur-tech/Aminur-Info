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

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/aminur-rahman4078",
      icon: <FaLinkedinIn />,
    },
    {
      name: "GitHub",
      url: "https://github.com/aminur-tech",
      icon: <FaGithub />,
    },
    {
      name: "WhatsApp",
      url: "https://wa.me/8801327694078",
      icon: <FaWhatsapp />,
    },
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
      <header className="fixed inset-x-0 top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-slate-950/80">
        <div className="mx-auto flex h-16 w-full items-center justify-between px-4 md:w-11/12 md:px-6">
          
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
              Aminur<span className="text-emerald-500">.</span>
            </span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="group relative text-sm font-medium text-slate-600 transition-all duration-300 hover:text-emerald-500 dark:text-slate-300 dark:hover:text-emerald-400"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}

            <div className="border-l border-slate-200 pl-4 dark:border-slate-700">
              <ToggleBtn />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="rounded-lg p-2 text-2xl text-slate-900 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800 md:hidden"
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
              className="fixed left-0 top-0 z-50 flex h-full w-[280px] flex-col border-r border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950 md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-5 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    Aminur<span className="text-emerald-500">.</span>
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Full Stack Developer
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <ToggleBtn />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 text-2xl text-slate-900 transition hover:rotate-90 hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
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
                    className="px-6 py-4 text-left text-base font-medium text-slate-700 transition-all duration-300 hover:bg-slate-100 hover:text-emerald-500 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-emerald-400"
                  >
                    {link.name}
                  </Motion.button>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="mt-auto border-t border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                  Connect With Me
                </p>

                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-all duration-300 hover:border-emerald-500 hover:bg-emerald-500 hover:text-white dark:border-slate-700 dark:text-slate-300"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </Motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}