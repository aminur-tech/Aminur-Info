import React from 'react';
import { motion } from 'framer-motion';
import { Code, Zap, Database, Globe, Cpu, GitBranch, Layout } from 'lucide-react';

const SkillCard = ({ skill, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: delay * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="group relative flex flex-col items-center justify-center p-6 bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-3xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-slate-800/50"
  >
    {/* Hover Glow Effect */}
    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity rounded-3xl" />
    
    <div className="relative z-10 p-4 bg-slate-800 rounded-2xl mb-4 group-hover:bg-emerald-500 transition-colors duration-300">
      <div className="text-emerald-500 group-hover:text-slate-950 transition-colors duration-300">
        {icon}
      </div>
    </div>
    
    <span className="relative z-10 text-sm font-bold tracking-widest text-slate-300 uppercase group-hover:text-white transition-colors">
      {skill}
    </span>
  </motion.div>
);

export default function Skills() {
  const coreSkills = [
    { name: 'React', icon: <Globe size={24} /> },
    { name: 'Node.js', icon: <Cpu size={24} /> },
    { name: 'Express.js', icon: <Zap size={24} /> },
    { name: 'MongoDB', icon: <Database size={24} /> },
    { name: 'Tailwind CSS', icon: <Layout size={24} /> },
    { name: 'Git & GitHub', icon: <GitBranch size={24} /> },
  ];

  return (
    <section className="relative overflow-hidden p-4">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full md:w-11/12 mx-auto px-2 md:p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
             <div className="h-[1px] w-8 bg-emerald-500/50"></div>
             <span className="text-emerald-500 font-mono text-xs tracking-widest uppercase font-bold">Expertise</span>
             <div className="h-[1px] w-8 bg-emerald-500/50"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
            Tech <span className="text-emerald-500">Stack</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {coreSkills.map((skill, index) => (
            <SkillCard 
              key={index} 
              skill={skill.name} 
              icon={skill.icon} 
              delay={index} 
            />
          ))}
        </div>

        {/* Optional: Simple Text Detail */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12 text-slate-500 font-mono text-sm"
        >
          &lt; constantly evolving /&gt;
        </motion.p>
      </div>
    </section>
  );
}