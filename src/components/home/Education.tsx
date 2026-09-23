"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowUpRight,
  BookOpen,
  Calendar,
  GraduationCap,
  Sparkles,
} from "lucide-react";

import { Education as EducationType } from "../../types/portfolio";

type EducationProps = {
  education: EducationType[];
};

// =========================
// ANIMATION VARIANTS
// =========================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

const Education = ({ education }: EducationProps) => {
  if (!education?.length) return null;

  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      id="education"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-[#b6d900]/5 blur-[120px]" />

      {/* =========================
          SECTION HEADER
      ========================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-2xl"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b6d900]/20 bg-[#b6d900]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#b6d900] backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Education</span>
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-4xl lg:text-5xl">
          Academic foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b6d900] to-[#88a300]">continuous growth.</span>
        </h2>
      </motion.div>

      {/* =========================
          EDUCATION LIST
      ========================== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="space-y-6"
      >
        {education.map((item) => (
          <motion.article
            key={item.id}
            variants={cardVariants}
            className="
              group
              relative
              overflow-hidden
              rounded-[2.5rem]
              border
              border-[#17211d]/10
              bg-white/60
              p-7
              shadow-lg
              shadow-black/[0.02]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-1.5
              hover:border-[#b6d900]/40
              hover:shadow-2xl
              hover:shadow-[#b6d900]/5
              dark:border-white/10
              dark:bg-[#101613]/60
              md:p-10
            "
          >
            {/* Top Ambient Highlight Gradient */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* Icon Frame */}
              <div
                className="
                  grid
                  h-16
                  w-16
                  shrink-0
                  place-items-center
                  rounded-2xl
                  border
                  border-[#b6d900]/30
                  bg-[#b6d900]/15
                  text-[#17211d]
                  shadow-inner
                  transition-transform
                  duration-500
                  group-hover:scale-110
                  dark:text-[#f1f4ef]
                "
              >
                <GraduationCap className="h-8 w-8 text-[#17211d] dark:text-[#b6d900]" />
              </div>

              {/* Content Body */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-[#17211d] dark:text-[#f1f4ef]">
                      {item.degree}
                    </h3>

                    <p className="mt-1.5 text-base font-semibold text-[#17211d]/80 dark:text-[#f1f4ef]/80">
                      {item.institution}
                    </p>

                    {item.field && (
                      <div className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                        <BookOpen className="h-3.5 w-3.5 opacity-70" />
                        <span>{item.field}</span>
                      </div>
                    )}
                  </div>

                  {/* Dates Badge */}
                  {(item.start_date || item.end_date) && (
                    <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#17211d]/10 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-[#17211d]/70 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef]/70">
                      <Calendar className="h-3.5 w-3.5 text-[#b6d900]" />
                      <span>
                        {formatDate(item.start_date)}
                        {item.start_date && item.end_date && " — "}
                        {formatDate(item.end_date)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Grade Badge */}
                {item.grade && (
                  <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#b6d900]/30 bg-[#b6d900]/10 px-4 py-1.5 text-xs font-bold tracking-wider text-[#17211d] dark:text-[#b6d900]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#b6d900]" />
                    <span>Grade: {item.grade}</span>
                  </div>
                )}

                {/* Description */}
                {item.description && (
                  <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[#17211d]/70 dark:text-[#f1f4ef]/70 md:text-base">
                    {item.description}
                  </p>
                )}
              </div>
            </div>

            {/* Background Watermark Arrow */}
            <ArrowUpRight className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 text-[#17211d] opacity-[0.03] transition-all duration-700 ease-out group-hover:scale-125 group-hover:opacity-[0.07] dark:text-white" />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Education;