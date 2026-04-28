"use client"
import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: "Complete Web Development Course",
      issuer: "Programming Hero",
      batch: "Batch-12",
      id: "WEB12-0983",
      certificateImage: "/Certifications.png", 
      description: "Rigorous certification validating excellence in MERN stack development (JavaScript, HTML, CSS, React) and project-based application.",
      skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "MERN Stack"]
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-950 transition-colors duration-500 py-24" id="certifications">
      <div className="w-full max-w-7xl mx-auto px-4">
        
        {/* Header - Stays Centered */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-emerald-600 dark:text-emerald-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Professional Development
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
            Certifications & <span className="text-emerald-600 dark:text-emerald-500">Excellence</span>
          </h2>
        </Motion.div>

        {/* Content */}
        <div className="space-y-12">
          {certifications.map((cert, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              // Grid structure
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              
              {/* Image Column */}
              <div className="lg:col-span-5 relative group">
                <div className="absolute inset-0 bg-emerald-500/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                <div className="relative overflow-hidden bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-white/5 shadow-2xl transition-all duration-500 group-hover:border-emerald-500/30 group-hover:scale-[1.02]">
                  <img 
                    src={cert.certificateImage} 
                    alt={`${cert.title} by ${cert.issuer}`}
                    className="w-full h-auto rounded-xl object-contain filter brightness-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center rounded-xl p-6">
                    <ShieldCheck className="text-emerald-400 w-16 h-16" />
                  </div>
                </div>
              </div>

              {/* Text Column - Centered on Mobile, Left-aligned on Desktop */}
              <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                <div>
                  <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
                    {cert.title}
                  </h3>
                  <p className="text-emerald-700 dark:text-emerald-500 font-medium text-lg mt-1">
                    {cert.issuer} • {cert.batch}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-500 font-mono text-sm bg-slate-100 dark:bg-slate-800/60 px-4 py-2 rounded-full w-fit">
                  <Award size={16} />
                  <span>Certificate ID: {cert.id}</span>
                </div>

                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-light max-w-2xl">
                  {cert.description}
                </p>

                {/* Skills Section - Alignment shifts based on parent */}
                <div className="flex flex-col items-center lg:items-start gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 w-full max-w-2xl">
                  <span className="text-slate-900 dark:text-white font-bold text-sm tracking-widest uppercase">Validated Skills</span>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                    {cert.skills.map((skill, i) => (
                      <span key={i} className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 rounded-md text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <a 
                    href="#contact"  
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl overflow-hidden transition-all shadow-lg shadow-emerald-500/20"
                  >
                    <span className="relative z-10 uppercase tracking-tighter text-sm">Contact Me</span>
                    <ExternalLink className="relative z-10 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </div>

            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}