import React from 'react';
import { User, Target, Rocket, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="relative overflow-hidden p-4">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-16 text-center"
        >
          <div className="p-3 bg-emerald-500/10 rounded-2xl mb-4">
            <User className="h-8 w-8 text-emerald-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            About <span className="text-emerald-500">Me</span>
          </h2>
          <div className="h-1 w-20 bg-emerald-600 mt-4 rounded-full" />
        </motion.div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Left Side: Profile Image with Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 mb-12 lg:mb-0 relative group"
          >
            {/* Animated Ring around photo */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500 to-blue-500 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-pulse" />
            
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 mx-auto relative z-10 p-2 border border-emerald-500/30 rounded-full">
                <img
                  src="https://i.ibb.co.com/gMxQc4vH/profile.jpg"
                  alt="Aminur Rahman Profile"
                  className="rounded-full w-full h-full object-cover border-4 border-slate-900 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 right-4 md:right-10 z-20 bg-slate-900 border border-white/10 p-4 rounded-2xl shadow-xl backdrop-blur-md"
              >
                <Award className="text-emerald-500 h-6 w-6 mb-1" />
                <p className="text-xs font-bold text-white uppercase tracking-widest">MERN Stack</p>
                <p className="text-[10px] text-emerald-400">Developer</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                Crafting Scalable Web Solutions with <span className="text-emerald-500 underline decoration-emerald-500/30 underline-offset-8">Passion & Precision.</span>
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed font-light">
                I'm a passionate <span className="text-white font-medium">Junior MERN Stack Developer</span>, dedicated to building high-performance web applications. I thrive in the intersection of design and logic, working seamlessly with <span className="text-emerald-400">React, Node.js, Express, and MongoDB</span>.
              </p>
            </div>

            {/* Micro Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-900/50 border border-white/5 rounded-2xl flex items-start gap-4">
                <Target className="text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">Clean Code</h4>
                  <p className="text-slate-500 text-xs">Writing readable and maintainable architecture.</p>
                </div>
              </div>
              <div className="p-4 bg-slate-900/50 border border-white/5 rounded-2xl flex items-start gap-4">
                <Rocket className="text-emerald-500 shrink-0" />
                <div>
                  <h4 className="text-white font-bold text-sm">Fast Learner</h4>
                  <p className="text-slate-500 text-xs">Always evolving with the latest tech trends.</p>
                </div>
              </div>
            </div>

            <motion.div 
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-emerald-500 font-bold tracking-widest text-sm uppercase group cursor-pointer"
            >
              Let's build something extraordinary 
              <span className="h-[2px] w-8 bg-emerald-500 transition-all group-hover:w-12"></span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}