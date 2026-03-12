import React, { useState } from "react";
import { HiCode as Code,  HiX } from "react-icons/hi";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setIsOpen(false);
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md">
      <div className="w-full md:w-11/12 mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Logo */}
        <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500 rounded-xl">
            <Code className="h-5 w-5 text-slate-950" />
          </div>
          <span className="text-white font-black uppercase text-lg">
            Aminur<span className="text-emerald-500">.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm uppercase tracking-widest font-bold text-slate-400 hover:text-emerald-400 transition"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-white text-2xl"
        >
        <HiOutlineBars3 />
        </button>
      </div>

      {/* Simple Mobile Drawer, no animation */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40"
          />
          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-48 z-50 shadow-2xl flex flex-col">
            {/* Close */}
            <div className="flex justify-between items-center p-4 border-b ">
              <span className="text-white font-bold">Menu</span>
              <button onClick={() => setIsOpen(false)} className="text-white bg-black p-1 text-xl">
                <HiX />
              </button>
            </div>
            {/* Links */}
            <ul className="flex flex-col gap-5 p-6 bg-gray-900 opacity-90 shadow-2xl rounded-2xl text-white">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-lg font-semibold text-slate-200 hover:text-emerald-400 transition"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
