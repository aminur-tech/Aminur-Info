"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Sparkles,
} from "lucide-react";

import { Service } from "../../types/portfolio";

type ServicesProps = {
  services: Service[];
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

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

const Services = ({ services }: ServicesProps) => {
  if (!services?.length) return null;

  return (
    <section
      id="services"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background Glow Overlay */}
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#b6d900]/5 blur-[140px]" />

      {/* =========================
          SECTION HEADER
      ========================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end"
      >
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b6d900]/20 bg-[#b6d900]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#b6d900] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Services</span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-4xl lg:text-5xl">
            Focused capabilities for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b6d900] to-[#88a300]">
              exceptional digital products.
            </span>
          </h2>
        </div>

        <p className="max-w-md text-base leading-relaxed text-[#17211d]/70 dark:text-[#f1f4ef]/70">
          From full-stack web applications to intuitive interactive interfaces,
          I deliver scalable, high-performance web solutions engineered for business growth.
        </p>
      </motion.div>

      {/* =========================
          SERVICES GRID
      ========================== */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-8 md:grid-cols-2"
      >
        {services.map((service, index) => (
          <motion.article
            key={service.id || index}
            variants={cardVariants}
            className="
              group
              relative
              flex
              flex-col
              justify-between
              overflow-hidden
              rounded-[2.5rem]
              border
              border-[#17211d]/10
              bg-white/60
              p-8
              shadow-lg
              shadow-black/[0.02]
              backdrop-blur-xl
              transition-all
              duration-500
              hover:-translate-y-2
              hover:border-[#b6d900]/40
              hover:shadow-2xl
              hover:shadow-[#b6d900]/10
              dark:border-white/10
              dark:bg-[#101613]/60
              md:p-10
            "
          >
            {/* Ambient Top Border Accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div>
              {/* Card Header Index & Action Button */}
              <div className="flex items-center justify-between gap-6">
                <span className="text-sm font-bold tracking-widest text-[#17211d]/40 dark:text-[#f1f4ef]/40">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#b6d900]/30 bg-[#b6d900]/15 text-[#17211d] shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#b6d900] group-hover:text-[#111815] dark:text-[#b6d900]">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" />
                </div>
              </div>

              {/* Title */}
              <h3 className="mt-8 text-2xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-3xl">
                {service.title}
              </h3>

              {/* Short Description */}
              {service.short_description && (
                <p className="mt-4 text-base leading-relaxed text-[#17211d]/75 dark:text-[#f1f4ef]/75">
                  {service.short_description}
                </p>
              )}

              {/* Full Description */}
              {service.full_description && (
                <p className="mt-3 text-sm leading-relaxed text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                  {service.full_description}
                </p>
              )}

              {/* Feature Highlights */}
              {service.features?.length > 0 && (
                <div className="mt-8">
                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm font-medium text-[#17211d]/80 dark:text-[#f1f4ef]/80"
                      >
                        <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#b6d900]/20 text-[#b6d900]">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Delivery Time Footer Badge */}
            {service.delivery_time && (
              <div className="mt-10 flex items-center gap-2 border-t border-[#17211d]/10 pt-5 text-xs font-semibold text-[#17211d]/60 dark:border-white/10 dark:text-[#f1f4ef]/60">
                <Clock3 className="h-4 w-4 text-[#b6d900]" />
                <span>Delivery timeframe: {service.delivery_time}</span>
              </div>
            )}

            {/* Corner Decorative Blur Effect */}
            <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-[#b6d900]/10 blur-2xl transition-all duration-700 ease-out group-hover:scale-150 group-hover:bg-[#b6d900]/20" />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;