"use client";
import React from 'react';
import { Target, Code2, Cpu, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-20 px-4 transition-colors duration-500 bg-white dark:bg-slate-950">
      {/* Background Orbs - Adjusted opacity for light mode */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 dark:bg-emerald-600/10 blur-[150px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <div className="flex items-center gap-2 mb-4">
             <span className="h-[1px] w-8 bg-emerald-500"></span>
             <span className="text-emerald-600 dark:text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase">Discovery</span>
             <span className="h-[1px] w-8 bg-emerald-500"></span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">
            About <span className="text-emerald-500 not-italic">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left: Image Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative group"
          >
            <div className="relative overflow-hidden rounded-3xl bg-slate-200 dark:bg-slate-900 border border-slate-200 dark:border-white/10 shadow-2xl">
              <img
                src="https://i.ibb.co.com/gMxQc4vH/profile.jpg"
                alt="Aminur Rahman"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                 <div className="flex items-center gap-4 text-white">
                    <Code2 className="text-emerald-400" />
                    <span className="font-mono text-xs tracking-widest uppercase">MERN Architect</span>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-6 text-center lg:text-left">
              <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Engineering <span className="text-emerald-600 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:to-cyan-400">Digital Excellence</span>.
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                I am a Full Stack Developer specializing in the MERN ecosystem. My approach combines rigorous logic with aesthetic fluidity. From database schema design to frontend optimization, I handle the full lifecycle of modern web apps.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Target className="text-emerald-500" />, title: "Goal Oriented", desc: "Building apps that solve real-world problems." },
                { icon: <Cpu className="text-blue-500" />, title: "Modern Tech", desc: "Proficient in Next.js, Redux, and Tailwind." }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl hover:bg-slate-200 dark:hover:bg-white/[0.08] transition-colors group">
                  <div className="mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-slate-900 dark:text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex flex-col md:flex-row items-center gap-6 pt-4">
              <motion.button 
                onClick={() => scrollToSection("projects")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black uppercase tracking-widest text-xs rounded-full shadow-lg transition-all"
              >
                view my work
              </motion.button>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-slate-300 dark:border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-all">
                   <Rocket size={18} className="text-emerald-600 dark:text-emerald-500 group-hover:text-white" />
                </div>
                <span className="text-slate-900 dark:text-white font-bold text-sm tracking-widest uppercase">My Journey</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}