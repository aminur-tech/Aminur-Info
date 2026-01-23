import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCode as Code, HiMenuAlt3 as Menu, HiX as X } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // স্ক্রল করলে ব্যাকগ্রাউন্ড কালার চেঞ্জ হবে (Glassmorphism effect)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      setIsOpen(false);
      const offset = 80; // Navbar height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = section.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <header className={`sticky top-0 z-[100] transition-all duration-500 ${
      scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo with Emerald Glow */}
          <Link
            to="/"
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-2 text-xl font-black text-white tracking-tighter"
          >
            <div className="p-2 bg-emerald-500 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Code className="h-5 w-5 text-slate-950" />
            </div>
            <span className="hidden sm:block uppercase">Aminur<span className="text-emerald-500">.</span>Rahman</span>
          </Link>

          {/* Desktop Menu - Modern Hover State */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="relative text-sm font-bold uppercase tracking-widest text-slate-400 hover:text-emerald-400 transition-colors group"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-emerald-500 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
              <li>
                <button 
                   onClick={() => scrollToSection('contact')}
                   className="px-6 py-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full text-xs font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-lg shadow-emerald-500/5"
                >
                  Hire Me
                </button>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden p-2 text-white bg-slate-900 border border-white/10 rounded-xl"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>
      </div>

      {/* Mobile Sidebar - Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-slate-950 border-l border-white/5 shadow-2xl z-[101] lg:hidden"
          >
            <div className="flex flex-col h-full p-8">
               <div className="flex justify-end mb-12">
                  <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400"><X size={32}/></button>
               </div>
               
               <ul className="flex flex-col gap-8">
                {navLinks.map((link, idx) => (
                  <motion.li 
                    key={link.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <button 
                      onClick={() => scrollToSection(link.id)}
                      className="text-4xl font-black text-white uppercase tracking-tighter hover:text-emerald-500 transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto border-t border-white/5 pt-8">
                 <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-4">Let's collaborate</p>
                 <p className="text-white font-bold">aminurrahman9793@gmail.com</p>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}