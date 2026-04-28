"use client"
import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Code, Zap, Database, Globe, Cpu, GitBranch, Layout, Box } from 'lucide-react';

interface SkillCardProps {
  skill: string;
  icon: React.ReactNode;
  delay: number;
}

const SkillCard = ({ skill, icon, delay }: SkillCardProps) => (
  <Motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: delay * 0.05 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="group relative flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 rounded-3xl shadow-sm dark:shadow-none transition-all duration-300 hover:border-emerald-500/40 hover:shadow-lg dark:hover:bg-slate-800/50"
  >
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity rounded-3xl" />
    
    <div className="relative z-10 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl mb-4 group-hover:bg-emerald-600 transition-colors duration-300">
      <div className="text-emerald-700 dark:text-emerald-500 group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </div>
    
    <span className="relative z-10 text-xs font-bold tracking-widest text-slate-600 dark:text-slate-300 uppercase group-hover:text-emerald-700 dark:group-hover:text-white transition-colors">
      {skill}
    </span>
  </Motion.div>
);

export default function Skills() {
  const coreSkills = [
    { name: 'Next.js', icon: <Box size={24} /> },
    { name: 'React', icon: <Globe size={24} /> },
    { name: 'TypeScript', icon: <Code size={24} /> },
    { name: 'JavaScript', icon: <Code size={24} /> },
    { name: 'Node.js', icon: <Cpu size={24} /> },
    { name: 'Express.js', icon: <Zap size={24} /> },
    { name: 'MongoDB', icon: <Database size={24} /> },
    { name: 'Mongoose', icon: <Database size={24} /> },
    { name: 'Tailwind CSS', icon: <Layout size={24} /> },
    { name: 'Git/GitHub', icon: <GitBranch size={24} /> },
  ];

  return (
    <section className="relative overflow-hidden py-24 px-4 bg-white dark:bg-slate-950 transition-colors duration-500">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto">
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="h-[1px] w-8 bg-emerald-600 dark:bg-emerald-500/50"></div>
             <span className="text-emerald-700 dark:text-emerald-500 font-mono text-xs tracking-widest uppercase font-bold">Expertise</span>
             <div className="h-[1px] w-8 bg-emerald-600 dark:bg-emerald-500/50"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
            Tech <span className="text-emerald-600 dark:text-emerald-500">Stack</span>
          </h2>
        </Motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {coreSkills.map((skill, index) => (
            <SkillCard 
              key={index} 
              skill={skill.name} 
              icon={skill.icon} 
              delay={index} 
            />
          ))}
        </div>

        <Motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16 text-slate-500 dark:text-slate-600 font-mono text-xs sm:text-sm"
        >
          &lt; always learning /&gt;
        </Motion.p>
      </div>
    </section>
  );
}