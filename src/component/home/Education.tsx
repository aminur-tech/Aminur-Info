"use client"
import React from 'react';
import { motion as Motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, BookOpen, ExternalLink } from 'lucide-react';

export default function Education() {
  const education = [
    {
      degree: "Diploma in Engineering",
      major: "Computer Science and Technology",
      institution: "Nobojibon Polytechnic Institute",
      year: "2026",
      location: "Satkhira, Bangladesh"
    }
  ];

  return (
    <section className=" bg-white dark:bg-slate-950 transition-colors duration-500" id="education">
      <div className="w-full max-w-4xl mx-auto p-4">
        {/* Section Header */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-left md:text-center mb-16"
        >
          <span className="text-emerald-600 dark:text-emerald-500 font-bold tracking-[0.2em] uppercase text-xs text-center mb-4 block">
            Academic Background
          </span>
          <h2 className="text-4xl md:text-5xl text-center font-black text-slate-900 dark:text-white tracking-tighter">
            Education  <span className="text-emerald-600 dark:text-emerald-500">Qualifications</span>
          </h2>
        </Motion.div>

        {/* Education Card */}
        <div className="space-y-8">
          {education.map((edu, index) => (
            <Motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative p-8 md:p-12 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 rounded-3xl shadow-xl shadow-slate-200/20 dark:shadow-none hover:border-emerald-500/30 transition-all duration-300"
            >
              {/* Header: Title and Time */}
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-slate-200 dark:border-slate-800 pb-8">
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{edu.degree}</h3>
                  <p className="text-xl text-emerald-700 dark:text-emerald-500 font-medium">{edu.major}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-mono text-sm bg-white dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 w-fit">
                  <Calendar size={16} />
                  <span>Graduated: {edu.year}</span>
                </div>
              </div>

              {/* Institution Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                    <GraduationCap size={20} className="text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Institution</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{edu.institution}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                    <MapPin size={20} className="text-emerald-600 dark:text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">Location</p>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{edu.location}</p>
                  </div>
                </div>
              </div>

            </Motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}