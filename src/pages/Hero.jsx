import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal, Code2, Cpu } from 'lucide-react';

const Hero = () => {
  const scrollToProjects = () => {
    const section = document.getElementById("projects");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-16 ">
     
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT CONTENT */}
          <div className="lg:w-3/5 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-emerald-500/30 text-emerald-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase"
            >
              <Terminal size={14} />
              Junior Full-Stack Engineer
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter text-white uppercase"
            >
              Architecting <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500">
                Future-Ready
              </span> <br /> 
              Solutions.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="max-w-xl mx-auto lg:mx-0 text-slate-400 text-lg md:text-xl font-light leading-relaxed"
            >
              Hi, I'm <span className="text-white font-semibold">Aminur Rahman</span>. I don't just write code; I build digital products that solve real-world problems using the <span className="text-emerald-400">MERN Stack</span>.
            </motion.p>

           
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 text-slate-500"
            >
              <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Code2 size={16} className="text-emerald-500" /> <span className="text-xs font-mono">React/Next.js</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Cpu size={16} className="text-blue-500" /> <span className="text-xs font-mono">Node/Express</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-white/5">
                <Sparkles size={16} className="text-amber-500" /> <span className="text-xs font-mono">MongoDB</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-4"
            >
              <button
                onClick={scrollToProjects}
                className="group relative inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-10 rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                <span className="uppercase tracking-tighter">Explore Projects</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" size={20} />
              </button>
              
              <a 
                href="#contact"
                className="text-white font-bold py-4 px-8 rounded-2xl border border-white/10 hover:bg-white/5 transition-all uppercase text-xs tracking-[0.2em]"
              >
                Start a Conversation
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE IMAGE (BENTO-STYLE FRAME) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="lg:w-2/5 relative"
          >
            <div className="relative w-72 h-[450px] md:w-96 md:h-[550px] bg-slate-900 rounded-[3.5rem] p-3 border border-emerald-500/20 shadow-2xl overflow-hidden group">
              <div 
                className="w-full h-full bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 rounded-[3rem]"
                style={{ backgroundImage: `url('https://i.ibb.co.com/gMxQc4vH/profile.jpg')` }}
              >
                {/* Status Badge */}
                <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white font-bold uppercase tracking-widest">Live in Dhaka</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-full p-10 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
                  <h2 className="text-white text-3xl font-black leading-none">AMINUR<br/>RAHMAN</h2>
                  <div className="mt-4 flex gap-2">
                    <span className="w-8 h-1 bg-emerald-500 rounded-full" />
                    <span className="w-2 h-1 bg-emerald-500/30 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decorative Box */}
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-slate-900 border border-white/10 p-6 rounded-[2rem] shadow-2xl hidden md:block animate-bounce-slow">
               <p className="text-emerald-500 text-2xl font-black">10+</p>
               <p className="text-slate-400 text-[10px] uppercase font-bold tracking-tighter">Completed Projects</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;