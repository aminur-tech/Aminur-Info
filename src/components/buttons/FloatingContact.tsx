"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { MessageCircle, Mail } from "lucide-react";

// Premium spring animation for fluid entry
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  }),
};

export default function FloatingContact() {
  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col gap-4 md:bottom-10 md:right-10">
      
      {/* WhatsApp Button */}
      <motion.a
        custom={0}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        href="https://wa.me/8801327694078"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/25 ring-1 ring-white/20 transition-colors hover:bg-[#20bd5a] dark:ring-white/10"
        aria-label="Contact via WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
        
        {/* Subtle continuous ripple effect */}
        <span className="absolute -inset-1.5 -z-10 animate-ping rounded-full bg-[#25D366]/30 duration-1000" />

        {/* Floating Tooltip */}
        <div className="pointer-events-none absolute right-[calc(100%+16px)] top-1/2 flex -translate-y-1/2 translate-x-2 items-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span className="whitespace-nowrap rounded-xl bg-[#17211d] px-3.5 py-2 text-xs font-bold tracking-wide text-[#f6f6f2] shadow-xl dark:bg-[#f1f4ef] dark:text-[#101613]">
            WhatsApp Me
          </span>
          {/* Tooltip Caret */}
          <div className="h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-[#17211d] dark:border-l-[#f1f4ef]" />
        </div>
      </motion.a>

      {/* Email Button */}
      <motion.a
        custom={1}
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        href="https://mail.google.com/mail/?view=cm&fs=1&to=aminur.programme@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#17211d] shadow-xl shadow-black/10 ring-1 ring-black/5 transition-colors hover:bg-[#f8f9f5] dark:bg-[#17211d] dark:text-[#f1f4ef] dark:shadow-black/40 dark:ring-white/10 dark:hover:bg-[#1f2d28]"
        aria-label="Contact via Email"
      >
        <Mail className="h-6 w-6" />

        {/* Floating Tooltip */}
        <div className="pointer-events-none absolute right-[calc(100%+16px)] top-1/2 flex -translate-y-1/2 translate-x-2 items-center opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <span className="whitespace-nowrap rounded-xl bg-[#17211d] px-3.5 py-2 text-xs font-bold tracking-wide text-[#f6f6f2] shadow-xl dark:bg-[#f1f4ef] dark:text-[#101613]">
            Email Me
          </span>
          {/* Tooltip Caret */}
          <div className="h-0 w-0 border-y-[6px] border-l-[8px] border-y-transparent border-l-[#17211d] dark:border-l-[#f1f4ef]" />
        </div>
      </motion.a>
      
    </div>
  );
}