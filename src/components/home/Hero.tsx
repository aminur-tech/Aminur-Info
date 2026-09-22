"use client";

import React from "react";
import { motion } from "framer-motion";
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

const Hero = ({ profile, hero, activeResume }: Props) => {
  const heading = hero?.heading || "Building digital products that matter.";
  const highlightedText =
    hero?.highlighted_text || profile.title || "Full-stack developer";

  const description =
    hero?.description ||
    profile.short_bio ||
    "I build modern, reliable web applications with thoughtful UX and production-ready engineering.";

  const availabilityText =
    hero?.availability_badge ||
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
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#b6d900]/10 blur-3xl dark:bg-[#91aa00]/10" />

        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#b6d900]/10 blur-3xl dark:bg-[#91aa00]/10" />

        <div className="absolute right-[10%] top-[15%] hidden h-40 w-40 rounded-full border border-[#17211d]/10 lg:block dark:border-[#f1f4ef]/10" />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-140px)] max-w-7xl items-center">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          >
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#17211d]/10 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] dark:border-[#f1f4ef]/10 dark:bg-white/[0.04]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#b6d900] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#b6d900]" />
              </span>

              {availabilityText}
            </motion.div>

            {/* Heading */}
            <h1 className="max-w-5xl text-[clamp(3.2rem,7vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.065em]">
              {heading}
            </h1>

            {/* Highlight */}
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25, duration: 0.55 }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="h-1 w-10 rounded-full bg-[#b6d900] sm:w-16" />

              <span className="text-lg font-medium tracking-tight text-[#17211d]/70 sm:text-xl dark:text-[#f1f4ef]/70">
                {highlightedText}
              </span>
            </motion.div>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-base leading-7 text-[#17211d]/65 sm:text-lg sm:leading-8 dark:text-[#f1f4ef]/65">
              {description}
            </p>

            {/* CTAs */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={primaryCtaUrl}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#17211d] px-6 py-3.5 text-sm font-semibold text-[#f6f6f2] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl dark:bg-[#f1f4ef] dark:text-[#101613]"
              >
                {primaryCtaLabel}

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href={secondaryCtaUrl}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211d]/15 bg-white/40 px-6 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:bg-white dark:border-[#f1f4ef]/15 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
              >
                {secondaryCtaLabel}
              </a>

              {activeResume?.file_url && (
                <a
                  href={activeResume.file_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#17211d]/15 px-5 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 dark:border-[#f1f4ef]/15"
                >
                  <Download className="h-4 w-4" />
                  Resume
                </a>
              )}
            </div>

            {/* Scroll indicator */}
            <a
              href="#about"
              className="mt-14 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#17211d]/45 transition-colors hover:text-[#17211d] dark:text-[#f1f4ef]/45 dark:hover:text-[#f1f4ef]"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full border border-[#17211d]/10 dark:border-[#f1f4ef]/10">
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </span>

              Scroll to explore
            </a>
          </motion.div>

          {/* Image / Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md lg:ml-auto"
          >
            {/* Floating badge */}
            <div className="absolute right-2 top-2 z-10 grid min-h-20 w-20 rotate-6 transform-gpu place-items-center rounded-2xl bg-[#b6d900] p-3 text-center text-xs font-bold leading-tight text-[#17211d] shadow-xl dark:bg-[#91aa00]">
              <Sparkles className="mb-1 h-4 w-4" />
              Build.
              <br />
              Ship.
              <br />
              Iterate.
            </div>

            {/* Image frame */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-[#e4e7de] dark:bg-[#1a211d]">
              {imageUrl ? (
                <img
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

              {/* Image overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#101613]/35 to-transparent" />
            </div>

            {/* Decorative ring */}
            <div className="pointer-events-none absolute -bottom-8 -left-8 -z-10 h-32 w-32 rounded-full border-[24px] border-[#b6d900]/20 dark:border-[#91aa00]/10" />

            {/* Name card */}
            <div className="absolute -bottom-5 left-5 rounded-2xl border border-white/20 bg-[#17211d]/90 px-5 py-4 text-[#f6f6f2] shadow-2xl backdrop-blur-xl dark:bg-[#f1f4ef]/90 dark:text-[#101613]">
              <p className="text-sm font-semibold">{profile.name}</p>

              {profile.location && (
                <p className="mt-1 text-xs opacity-55">{profile.location}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;