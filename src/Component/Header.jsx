import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  HiCode as Code,
  HiMenuAlt3 as Menu,
  HiX as X,
} from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Scroll background effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

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
    const y =
      el.getBoundingClientRect().top + window.pageYOffset + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-500 ${scrolled
        ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 text-lg font-black text-white"
          >
            <div className="p-2 bg-emerald-500 rounded-xl hover:rotate-12 transition">
              <Code className="h-5 w-5 text-slate-950" />
            </div>
            <span className="uppercase">
              Aminur<span className="text-emerald-500">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="relative text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all group-hover:w-full" />
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=aminur.programme@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 font-bold hover:text-emerald-500 transition"
                >
                 Email Me
                </a>

              </li>
            </ul>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 bg-slate-900/80 backdrop-blur border border-white/20 rounded-xl text-white"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 80 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-slate-950 border-l border-white/10 z-[101] lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-end mb-10">
                <button onClick={() => setIsOpen(false)}>
                  <X size={32} className="text-slate-400" />
                </button>
              </div>

              <ul className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-4xl font-black uppercase text-white hover:text-emerald-500 transition"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">
                  Let’s collaborate
                </p>
                <p className="text-white font-bold">
                  aminurrahman9793@gmail.com
                </p>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
