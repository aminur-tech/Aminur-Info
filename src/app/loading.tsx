"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-slate-950 transition-colors duration-500">
      <div className="relative flex flex-col items-center gap-6">
        
        {/* Pulsing Logo Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-20 h-20 rounded-2xl bg-emerald-500 flex items-center justify-center shadow-[0_0_40px_-10px_rgba(16,185,129,0.5)]"
        >
          {/* Inner Pulse Ring */}
          <motion.div
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-2xl border-2 border-emerald-500"
          />
          
          <img src="/logo.png" alt="logo" className="w-full h-full object-cover rounded-2xl"/>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <h3 className="text-slate-900 dark:text-white font-bold tracking-widest uppercase text-sm">
            Loading
          </h3>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scaleY: [1, 1.5, 1] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1 h-3 bg-emerald-500 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}