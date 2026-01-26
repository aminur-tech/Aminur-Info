import React from 'react';
import { Layers, ArrowRight, ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Projects() {
  const projects = [
    
    {
      title: 'Digital-Life-Lessons',
      description: 'Digital Life Lessons is a platform where users can create, store, and share meaningful life lessons, personal growth insights, and wisdom. Users can organize lessons, mark favorites, track learning progress, and browse public lessons shared by others. Built with React, Tailwind CSS, Firebase Auth, Node.js, Express.js, and MongoDB.',
      link: 'https://digital-life-lessons-seven.vercel.app',
      tags: ['React', 'Node.js',"javascript", 'MongoDB'],
      accent: 'from-emerald-500 to-teal-400'
    },
    {
      title: 'PlateShare',
      description: 'Community-driven food-sharing platform to reduce food waste and help the needy. Built with React, Tailwind CSS, Firebase Auth, Node.js, Express.js, and MongoDB.',
      link: 'https://plate-share-client-olive.vercel.app',
      tags: ['React', 'Node.js',"javascript", 'MongoDB'],
      accent: 'from-emerald-500 to-teal-400'
    },
    {
      title: 'Hero Kidz',
      description: "Hero Kidz is a modern, single-vendor e-commerce web application built with Next.js. It is designed for selling children's products and toys online, providing a seamless shopping experience for users.",
      link: 'https://hero-kidz-six.vercel.app',
      tags: ['Next.js', 'NextAuth.js', "javascript", 'MongoDB'],
      accent: 'from-emerald-500 to-teal-400'
    },
  ];

  return (
    <section className="relative w-full max-w-full md:w-11/12 mx-auto px-2 sm:px-4 md:p-4">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 md:mb-24"
      >
        
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white">
          Featured <span className="text-emerald-500">Projects</span>
        </h2>
      </motion.div>

      <div className="flex flex-col gap-16 md:gap-32">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="sticky top-20 md:top-28 w-full group"
          >
            {/* Main Card Frame */}
            <div className="relative overflow-hidden bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-2xl md:rounded-[4rem] p-4 sm:p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:border-emerald-500/30">
              
              {/* Subtle Gradient Border Effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-0 group-hover:opacity-5 transition-opacity duration-700`} />

              {/* Big Background Number */}
              <span className="absolute -right-2 sm:-right-6 -bottom-6 sm:-bottom-10 text-[8rem] sm:text-[20rem] font-black text-white/[0.015] leading-none select-none group-hover:text-emerald-500/[0.03] transition-colors duration-700">
                0{index + 1}
              </span>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10">
                {/* Content Side */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${project.accent} flex items-center justify-center text-slate-950 font-black rotate-3 group-hover:rotate-0 transition-transform shadow-lg`}>
                        0{index + 1}
                      </div>
                      <div className="h-[1px] w-12 bg-slate-700"></div>
                      <span className="text-xs font-mono tracking-[0.3em] text-slate-500 uppercase">Case Study</span>
                    </div>

                    <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 text-white tracking-tight group-hover:translate-x-2 transition-transform duration-500">
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-8">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold tracking-widest text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-4 py-1.5 rounded-lg uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-slate-400 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl font-light">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-8 sm:mt-12">
                    <motion.a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group/btn relative inline-flex items-center gap-2 sm:gap-4 px-6 sm:px-10 py-4 sm:py-5 bg-emerald-500 text-slate-950 font-black rounded-2xl overflow-hidden"
                    >
                      <span className="relative z-10 uppercase tracking-tighter text-sm">Explore Live Demo</span>
                      <ArrowRight className="relative z-10 w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </motion.a>
                  </div>
                </div>

                {/* Visual Side (Mockup Placeholder) */}
                <div className="hidden md:flex items-center justify-center relative min-h-[200px] md:min-h-[400px]">
                   <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                   <div className="relative w-full h-full min-h-[400px] bg-slate-800/30 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-700">
                      <Layers className="w-24 h-24 text-white/5 group-hover:text-emerald-500/10 transition-colors" />
                      {/* Decorative Lines */}
                      <div className="absolute top-0 left-0 w-full h-full border-[1px] border-emerald-500/5 scale-90 rounded-2xl pointer-events-none" />
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}