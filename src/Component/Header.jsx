import React, { useState, useEffect } from "react";
import { HiCode as Code, HiX } from "react-icons/hi";
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

  // Close menu on window resize to prevent ghost overlays
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    setIsOpen(false);
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2 group">
          <div className="p-2 bg-emerald-500 rounded-lg group-hover:rotate-12 transition-transform">
            <Code className="h-5 w-5 text-slate-950" />
          </div>
          <span className="text-white font-black uppercase text-xl tracking-tight">
            Aminur<span className="text-emerald-500">.</span>
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-xs uppercase tracking-[0.2em] font-bold text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          aria-label="Toggle Menu"
        >
          {isOpen ? <HiX className="text-2xl" /> : <HiOutlineBars3 className="text-2xl" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-slate-900 border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-white/5">
            <span className="text-emerald-500 font-bold uppercase tracking-widest">Navigation</span>
            <button onClick={() => setIsOpen(false)} className="text-slate-400"><HiX size={24} /></button>
          </div>
          
          <nav className="flex flex-col p-6 gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left text-lg font-medium text-slate-200 hover:text-emerald-400 transition-colors border-b border-white/5 pb-2"
              >
                {link.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for Mobile Drawer */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}
    </header>
  );
}