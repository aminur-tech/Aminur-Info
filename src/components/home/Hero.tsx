"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Download,
  Sparkles,
} from "lucide-react";

import type {
  HeroContent,
  Profile,
  Resume,
} from "../../types/portfolio";

type Props = {
  profile: Profile;
  hero: HeroContent | null;
  activeResume: Resume | null;
};

// =========================
// ANIMATION VARIANTS
// =========================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.215, 0.61, 0.355, 1.0], // Custom cubic-bezier for spring-like feel
    },
  },
};

const headingWordVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = ({ profile, hero, activeResume }: Props) => {
  const heading = hero?.heading || "Building digital products that matter.";
  const highlightedText =
    hero?.highlighted_text || profile.title || "Full-stack developer";

  const description =
    hero?.description ||
    profile.short_bio ||
    "I build modern, reliable web applications with thoughtful UX and production-ready engineering.";

  const availabilityText =
    hero?.availabilityBadge ||
    profile.availability_status ||
    "Available for new work";

  const primaryCtaLabel = hero?.primary_cta_label || "View my work";
  const primaryCtaUrl = hero?.primary_cta_url || "#projects";

  const secondaryCtaLabel =
    hero?.secondary_cta_label || "Let's work together";
  const secondaryCtaUrl = hero?.secondary_cta_url || "#contact";

  const imageUrl = hero?.image_url || profile.profile_image_url;

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-6 pb-20 pt-8 sm:px-8 lg:min-h-[calc(100vh-80px)] lg:px-12 lg:pb-12 lg:pt-12"
    >
      {/* =========================
          DECORATIVE BACKGROUND (FLOATING ANIMATION)
      ========================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#b6d900]/15 blur-3xl dark:bg-[#91aa00]/15"
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#b6d900]/15 blur-3xl dark:bg-[#91aa00]/15"
        />

        <motion.div
          animate={{
            rotate: 360,
            y: [0, -15, 0],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" },
          }}
          className="absolute right-[10%] top-[15%] hidden h-40 w-40 rounded-full border border-dashed border-[#17211d]/15 lg:block dark:border-[#f1f4ef]/15"
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-140px)] max-w-7xl items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          
          {/* =========================
              LEFT COLUMN: CONTENT
          ========================== */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            // FIX: Added order-2 for mobile (bottom) and lg:order-1 for desktop (left)
            className="order-2 lg:order-1"
          >
            {/* Availability Status Badge */}
            <motion.div variants={itemVariants} className="mb-7 inline-block">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-[#17211d]/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] backdrop-blur-md dark:border-[#f1f4ef]/10 dark:bg-white/[0.04]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b6d900] opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#b6d900]" />
                </span>

                {availabilityText}
              </div>
            </motion.div>

            {/* Headline with Masked Word Reveal */}
            <div className="max-w-5xl overflow-hidden pb-4">
              <motion.h1 className="text-[clamp(3.2rem,7vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.065em]">
                {heading.split(" ").map((word, index) => (
                  <span 
                    key={index} 
                    className="mr-[0.25em] inline-block align-top pb-4 -mb-4 pt-1 overflow-hidden"
                  >
                    <motion.span
                      variants={headingWordVariants}
                      className="inline-block"
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </motion.h1>
            </div>

            {/* Highlight Title Line */}
            <motion.div
              variants={itemVariants}
              className="mt-6 flex items-center gap-3"
            >
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "2.5rem" }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="h-1 rounded-full bg-[#b6d900] sm:w-16"
              />

              <span className="text-lg font-medium tracking-tight text-[#17211d]/75 sm:text-xl dark:text-[#f1f4ef]/75">
                {highlightedText}
              </span>
            </motion.div>

            {/* Description Paragraph */}
            <motion.p
              variants={itemVariants}
              className="mt-7 max-w-2xl text-base leading-7 text-[#17211d]/65 sm:text-lg sm:leading-8 dark:text-[#f1f4ef]/65"
            >
              {description}
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              variants={itemVariants}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              {/* Primary CTA */}
              <motion.a
                href={primaryCtaUrl}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#17211d] px-7 py-3.5 text-sm font-semibold text-[#f6f6f2] shadow-md transition-shadow hover:shadow-xl dark:bg-[#f1f4ef] dark:text-[#101613]"
              >
                {primaryCtaLabel}
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>

              {/* Secondary CTA */}
              <motion.a
                href={secondaryCtaUrl}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211d]/15 bg-white/40 px-6 py-3.5 text-sm font-semibold backdrop-blur-sm transition-colors hover:bg-white dark:border-[#f1f4ef]/15 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
              >
                {secondaryCtaLabel}
              </motion.a>

              {/* Resume CTA */}
              {activeResume?.file_url && (
                <motion.a
                  href={activeResume.file_url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211d]/15 px-5 py-3.5 text-sm font-semibold transition-colors hover:bg-white/50 dark:border-[#f1f4ef]/15 dark:hover:bg-white/5"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </motion.a>
              )}
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div variants={itemVariants}>
              <a
                href="#about"
                className="mt-14 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#17211d]/50 transition-colors hover:text-[#17211d] dark:text-[#f1f4ef]/50 dark:hover:text-[#f1f4ef]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#17211d]/15 dark:border-[#f1f4ef]/15">
                  <ArrowDown className="h-4 w-4 animate-bounce" />
                </span>
                Scroll to explore
              </a>
            </motion.div>
          </motion.div>

          {/* =========================
              RIGHT COLUMN: VISUAL / IMAGE
          ========================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            // FIX: Added order-1 for mobile (top) and lg:order-2 for desktop (right)
            className="relative mx-auto w-full max-w-md lg:ml-auto order-1 lg:order-2"
          >
            {/* Floating Sparkles Badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [6, 10, 6],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
              className="absolute -right-3 -top-3 z-20 grid min-h-20 w-20 transform-gpu place-items-center rounded-2xl bg-[#b6d900] p-3 text-center text-xs font-bold leading-tight text-[#17211d] shadow-xl dark:bg-[#91aa00]"
            >
              <Sparkles className="absolute -right-2 -top-2 h-5 w-5 text-[#17211d]/50 dark:text-[#f1f4ef]/50" />
              {availabilityText}
            </motion.div>

            {/* Main Image Frame Container */}
            <div className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#e4e7de] shadow-2xl dark:bg-[#1a211d]">
              {imageUrl ? (
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  src={imageUrl}
                  alt={profile.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-full bg-[#b6d900] text-2xl font-bold text-[#17211d]">
                      {profile.name?.charAt(0) || "A"}
                    </div>

                    <p className="text-xl font-semibold tracking-tight">
                      {profile.name}
                    </p>

                    <p className="mt-2 text-sm opacity-50">
                      {profile.title}
                    </p>
                  </div>
                </div>
              )}

              {/* Gradient Overlay on Bottom of Image */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#101613]/40 to-transparent" />
            </div>

            {/* Floating Decorative Outer Ring */}
            <div className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full border-[24px] border-[#b6d900]/20 dark:border-[#91aa00]/10" />

            {/* Animated Name Card Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
              className="absolute -bottom-5 left-5 rounded-2xl border border-white/20 bg-[#17211d]/90 px-5 py-4 text-[#f6f6f2] shadow-2xl backdrop-blur-xl dark:bg-[#f1f4ef]/90 dark:text-[#101613]"
            >
              <p className="text-sm font-semibold">{profile.name}</p>

              {profile.location && (
                <p className="mt-0.5 text-xs opacity-60">{profile.location}</p>
              )}
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;