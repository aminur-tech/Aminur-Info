import React from 'react';
import { User, Target, Rocket, Award, Code2, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="relative overflow-hidden py-8">
      {/* --- Abstract Background Decor --- */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[150px] rounded-full -z-10 animate-pulse" />
      <div className="absolute bottom-0 left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-3xl md:max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-20 text-center"
        >
          <div className="flex items-center gap-2 mb-4">
             <span className="h-[1px] w-8 bg-emerald-500"></span>
             <span className="text-emerald-500 font-mono text-sm tracking-[0.3em] uppercase">Discovery</span>
             <span className="h-[1px] w-8 bg-emerald-500"></span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">
            About <span className="text-emerald-500 not-italic">Me</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-20 items-center">
          
          {/* --- Left Side: Advanced Image Frame --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative group mb-10 lg:mb-0"
          >
            {/* Geometric Background Shapes */}
            <div className="absolute -top-6 -left-6 w-32 h-32 border-t-2 border-l-2 border-emerald-500/30 rounded-tl-3xl group-hover:-top-4 group-hover:-left-4 transition-all" />
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-2 border-r-2 border-emerald-500/30 rounded-br-3xl group-hover:-bottom-4 group-hover:-right-4 transition-all" />

            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-slate-900 border border-white/10 shadow-2xl">
              <img
                src="https://i.ibb.co.com/gMxQc4vH/profile.jpg"
                alt="Aminur Rahman"
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100 max-h-[320px] sm:max-h-[400px] md:max-h-[500px]"
              />
              
              {/* Glass Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                 <div className="flex items-center gap-4 text-white">
                    <Code2 className="text-emerald-400" />
                    <span className="font-mono text-xs tracking-widest uppercase">MERN Architect</span>
                 </div>
              </div>
            </div>

            
          </motion.div>

          {/* --- Right Side: Content & Micro-Interactions --- */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 space-y-8 sm:space-y-10"
          >
            <div className="space-y-6 text-center lg:text-left">
              <h3 className="text-xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Digital Excellence</span> with Code.
              </h3>
              <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-2xl">
                I am a <span className="text-white font-semibold italic">Full Stack Developer</span> specializing in the MERN ecosystem. My approach combines rigorous logic with aesthetic fluidity, ensuring every pixel serves a purpose. From <span className="text-emerald-400">Database Schema</span> design to <span className="text-emerald-400">Frontend Optimization</span>, I handle the full lifecycle of modern web apps.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: <Target className="text-emerald-500" />, title: "Goal Oriented", desc: "Building apps that solve real-world problems." },
                { icon: <Cpu className="text-blue-500" />, title: "Modern Tech", desc: "Proficient in Next.js, Redux, and Tailwind." }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/[0.08] transition-colors group">
                  <div className="mb-3 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-8 pt-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-10 py-3 sm:py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-black uppercase tracking-widest text-xs rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.2)] transition-all"
              >
                Download Portfolio
              </motion.button>
              
              <div className="flex items-center gap-4 group cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500 transition-all">
                   <Rocket size={18} className="text-emerald-500 group-hover:text-slate-900" />
                </div>
                <span className="text-white font-bold text-sm tracking-widest uppercase">My Journey</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}