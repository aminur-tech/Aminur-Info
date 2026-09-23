"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ChevronDown, Sparkles, User } from "lucide-react";

import { AboutContent, Profile } from "../../types/portfolio";

type AboutProps = {
  profile: Profile;
  about: AboutContent | null;
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

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

const About = ({ profile, about }: AboutProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const aboutPoints =
    about?.highlights?.length
      ? about.highlights
      : [
          "From idea to production deployment",
          "Intuitive interfaces built for users",
          "Scalable APIs & reliable data architecture",
          "Long-term engineering ownership & iteration",
        ];

  const bioText =
    about?.description ||
    profile?.long_bio ||
    profile?.short_bio ||
    "";

  return (
    <section
      id="about"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute left-10 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-[#b6d900]/5 blur-[130px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16"
      >
        {/* =========================
            PROFILE IMAGE / MEDIA FRAME
        ========================== */}
        <motion.div variants={fadeUpVariants} className="relative group">
          {/* Ambient Card Background Glow */}
          <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-tr from-[#b6d900]/20 via-transparent to-[#b6d900]/10 opacity-70 blur-xl transition-all duration-500 group-hover:opacity-100" />

          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#17211d]/10 bg-white/60 p-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#101613]/60">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#e9ebe5] dark:bg-[#17211d]">
              {about?.image_url || profile?.profile_image_url ? (
                <img
                  src={about?.image_url || profile?.profile_image_url || ""}
                  alt={profile?.name || "Profile"}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <User className="h-24 w-24 text-[#17211d]/20 dark:text-white/20" />
                </div>
              )}

              {/* Gradient Vignette Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101613]/80 via-transparent to-transparent opacity-60" />

              {/* Status Badge Tag */}
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/20 bg-white/20 p-3.5 backdrop-blur-md dark:bg-black/30">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b6d900] opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#b6d900]" />
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-white">
                    Available for new projects
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================
            EDITORIAL CONTENT
        ========================== */}
        <motion.div variants={fadeUpVariants} className="flex flex-col justify-center">
          {/* Eyebrow Header */}
          <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#b6d900]/20 bg-[#b6d900]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#b6d900] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>About</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-4xl lg:text-5xl">
            {about?.title || "Building useful products with thoughtful engineering."}
          </h2>

          {/* Collapsible Description Container */}
          {bioText && (
            <div className="mt-6 text-base leading-relaxed text-[#17211d]/75 dark:text-[#f1f4ef]/75 sm:text-lg">
              <AnimatePresence initial={false}>
                {!isExpanded ? (
                  <motion.div
                    key="collapsed"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="line-clamp-2">{bioText}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{bioText}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Read More / Read Less Toggle */}
              <button
                type="button"
                onClick={() => setIsExpanded((prev) => !prev)}
                className="mt-2.5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#b6d900] transition-colors hover:text-[#91ad00] focus:outline-none"
              >
                <span>{isExpanded ? "Show less" : "Read more"}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}

          {/* Key Highlights */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {aboutPoints.map((point) => (
              <div
                key={point}
                className="flex items-center gap-3 rounded-2xl border border-[#17211d]/5 bg-white/40 p-3.5 backdrop-blur-md dark:border-white/5 dark:bg-white/[0.02]"
              >
                <div className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#b6d900]/20 text-[#b6d900]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-[#17211d]/85 dark:text-[#f1f4ef]/85">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Core Values Badges */}
          {about?.values && about.values.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                Core Principles
              </p>
              <div className="flex flex-wrap gap-2">
                {about.values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-[#17211d]/10 bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#17211d] backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-[#f1f4ef]"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Callout Link */}
          <div className="mt-10">
            <a
              href="#contact"
              className="
                group
                inline-flex
                items-center
                gap-3
                rounded-full
                border
                border-[#17211d]/15
                bg-white/80
                px-6
                py-3.5
                text-sm
                font-bold
                text-[#17211d]
                shadow-md
                backdrop-blur-md
                transition-all
                duration-300
                hover:border-[#b6d900]
                hover:bg-[#b6d900]
                hover:text-[#111815]
                hover:shadow-lg
                hover:shadow-[#b6d900]/20
                dark:border-white/15
                dark:bg-white/10
                dark:text-[#f1f4ef]
                dark:hover:bg-[#b6d900]
                dark:hover:text-[#111815]
              "
            >
              <span>Let&apos;s work together</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;