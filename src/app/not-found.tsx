"use client";

import React from 'react';
import Link from 'next/link';
import { motion as Motion } from 'framer-motion';
import { ArrowLeft, Ghost } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 transition-colors duration-500">
      <div className="max-w-2xl text-center">
        
        {/* Animated Icon */}
        <Motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/5">
            <Ghost size={64} className="text-emerald-500" />
          </div>
        </Motion.div>

        {/* Text */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-8xl md:text-9xl font-black text-slate-900 dark:text-white tracking-tighter mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Lost in Space?
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-md mx-auto">
            The page you are looking for has been moved, deleted, or never existed in this dimension. Let's get you back home.
          </p>

          {/* Home Link */}
          <Link 
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl transition-all shadow-lg shadow-emerald-500/20 hover:scale-105"
          >
            <ArrowLeft size={20} />
            Back to Safety
          </Link>
        </Motion.div>

      </div>
    </section>
  );
}