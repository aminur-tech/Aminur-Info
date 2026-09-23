"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  MessageCircle,
  Clock,
  ArrowUp,
} from "lucide-react";

import type {
  Profile,
  SiteSettingsContent,
} from "../../types/portfolio";

type Props = {
  profile: Profile;
  siteSettings: SiteSettingsContent | null;
};

// =========================
// ANIMATION VARIANTS
// =========================
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

const Footer = ({ profile, siteSettings }: Props) => {
  const currentYear = new Date().getFullYear();
  const [localTime, setLocalTime] = useState<string>("");

  const siteName = siteSettings?.site_name || profile.name || "Portfolio";
  const professionalTitle =
    siteSettings?.professional_title || profile.title || "Full-stack developer";
  const footerText =
    siteSettings?.footer_text ||
    "Building thoughtful digital experiences with modern technology.";
  const copyrightText =
    siteSettings?.copyright_text ||
    `© ${currentYear} ${siteName}. All rights reserved.`;

  const connectLinks = [
    {
      label: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/aminur-tech",
    },
    {
      label: "GitHub",
      icon: Github,
      url: "https://github.com/aminur-tech",
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      url: "https://wa.me/+8801327694078",
    },
  ];

  // Live clock effect
  useEffect(() => {
    const updateClock = () => {
      setLocalTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // FIX: Changed HTMLAnchorElement to HTMLElement to support both <a> and <button> tags
  const scrollToTop = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-[#17211d]/10 bg-[#f8f9f5] dark:border-[#f1f4ef]/10 dark:bg-[#0a0f0d]">
      {/* Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -bottom-[50%] left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[#b6d900]/5 blur-[120px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative mx-auto max-w-7xl px-5 py-16 lg:py-24"
      >
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr]">
          
          {/* Left Column: Brand & Vision */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.a
                variants={itemVariants}
                href="#hero"
                onClick={scrollToTop}
                className="group inline-flex items-center gap-4"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#b6d900] text-lg font-black text-[#17211d] shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:shadow-xl dark:bg-[#b6d900]">
                  {profile.name?.charAt(0) || "A"}
                </div>
                <div>
                  <span className="block text-xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef]">
                    {siteName}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium opacity-60">
                    {professionalTitle}
                  </span>
                </div>
              </motion.a>

              <motion.h3
                variants={itemVariants}
                className="mt-8 max-w-md text-2xl font-semibold leading-tight tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-3xl"
              >
                {footerText}
              </motion.h3>

              {profile.email && (
                <motion.div variants={itemVariants} className="mt-8">
                  <a
                    href={`mailto:${profile.email}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#17211d]/15 bg-white/50 px-6 py-3 text-sm font-bold text-[#17211d] backdrop-blur-sm transition-all hover:bg-[#b6d900] hover:border-[#b6d900] dark:border-[#f1f4ef]/15 dark:bg-white/5 dark:text-[#f1f4ef] dark:hover:bg-[#b6d900] dark:hover:text-[#17211d]"
                  >
                    {profile.email}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Connect */}
          <div className="flex flex-col lg:items-end">
            <div className="w-full max-w-sm">
              <motion.p
                variants={itemVariants}
                className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#17211d]/40 dark:text-[#f1f4ef]/40"
              >
                Connect
              </motion.p>

              <div className="flex flex-col gap-3">
                {connectLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <motion.a
                      variants={itemVariants}
                      key={link.label}
                      href={link.url}
                      target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                      rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex items-center justify-between rounded-2xl border border-[#17211d]/10 bg-white/40 px-5 py-4 transition-colors hover:bg-[#17211d] hover:text-[#f6f6f2] dark:border-[#f1f4ef]/10 dark:bg-white/[0.02] dark:hover:bg-[#f1f4ef] dark:hover:text-[#101613]"
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-5 w-5 opacity-70 transition-opacity group-hover:opacity-100" />
                        <span className="text-sm font-semibold tracking-wide">
                          {link.label}
                        </span>
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex flex-col items-start gap-6 border-t border-[#17211d]/10 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-[#f1f4ef]/10"
        >
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
            <p className="text-xs font-medium tracking-wide opacity-50">
              {copyrightText}
            </p>
            
            {/* Live Clock Feature */}
            {localTime && (
              <div className="hidden items-center gap-2 text-xs font-semibold tracking-wide opacity-50 sm:flex">
                <span className="h-1 w-1 rounded-full bg-[#17211d] dark:bg-[#f1f4ef]" />
                <Clock className="h-3.5 w-3.5" />
                Local time: {localTime}
              </div>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#17211d]/50 transition-colors hover:text-[#17211d] dark:text-[#f1f4ef]/50 dark:hover:text-[#f1f4ef]"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full border border-[#17211d]/15 bg-white/50 transition-colors group-hover:bg-[#b6d900] group-hover:border-[#b6d900] group-hover:text-[#17211d] dark:border-[#f1f4ef]/15 dark:bg-white/5">
              <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;