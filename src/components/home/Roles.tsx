"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Code2, Sparkles } from "lucide-react";

import type { Profile, Role } from "../../types/portfolio";

type Props = {
  profile: Profile;
  roles: Role[];
};

const fallbackRoles: Role[] = [];

const Roles = ({ profile, roles }: Props) => {
  const roleData = roles.length
    ? roles
    : fallbackRoles.length
      ? fallbackRoles
      : [
          {
            id: "engineering",
            title: profile.title || "Full-stack engineering",
            slug: "engineering",
            summary:
              profile.short_bio ||
              "Building reliable, user-focused web products from idea to deployment.",
            responsibilities: [
              "Design and build modern web applications",
              "Develop reliable APIs and backend systems",
              "Create responsive and accessible interfaces",
              "Work with databases, authentication, and integrations",
              "Improve products through iteration and feedback",
            ],
            technologies: [
              "React.js",
              "Next.js",
              "TypeScript",
              "Node.js",
              "Express.js",
              "MongoDB",
              "PostgreSQL",
            ],
            achievements: [],
            skills: [],
            project_ids: [],
            cta_label: "Discuss engineering",
            cta_url: "#contact",
          },
          {
            id: "product",
            title: "Product-minded delivery",
            slug: "product-minded-delivery",
            summary:
              "Turning product ideas into focused experiences with thoughtful UX and dependable engineering.",
            responsibilities: [
              "Translate ideas into practical product experiences",
              "Balance UX, performance, and maintainability",
              "Ship features with a focus on real user needs",
            ],
            technologies: [
              "Next.js",
              "React.js",
              "TypeScript",
              "Node.js",
            ],
            achievements: [],
            skills: [],
            project_ids: [],
            cta_label: "Discuss a product",
            cta_url: "#contact",
          },
        ];

  const [roleIndex, setRoleIndex] = useState(0);

  const activeRole = roleData[roleIndex] || roleData[0];

  if (!activeRole) return null;

  return (
    <section
      id="roles"
      className="relative overflow-hidden border-t border-[#17211d]/10 px-6 py-20 sm:px-8 lg:px-12 lg:py-28 dark:border-[#f1f4ef]/10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#17211d]/50 dark:text-[#f1f4ef]/50">
              <span className="h-px w-8 bg-[#17211d]/30 dark:bg-[#f1f4ef]/30" />
              What I do
            </div>

            <h2 className="max-w-xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Roles I can play in your product.
            </h2>
          </div>

          <p className="max-w-2xl text-base leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65 lg:ml-auto">
            From building complete web applications to turning product ideas
            into polished digital experiences, I focus on practical,
            maintainable solutions.
          </p>
        </div>

        {/* Role selector */}
        <div className="grid gap-6 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="space-y-3">
            {roleData.map((role, index) => {
              const active = index === roleIndex;

              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setRoleIndex(index)}
                  className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-[#17211d] bg-[#17211d] text-[#f6f6f2] dark:border-[#b6d900] dark:bg-[#b6d900] dark:text-[#101613]"
                      : "border-[#17211d]/10 bg-white/50 hover:border-[#17211d]/25 hover:bg-white dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] dark:hover:border-[#f1f4ef]/20 dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span
                        className={`mb-2 block text-xs font-bold uppercase tracking-[0.18em] ${
                          active
                            ? "opacity-60"
                            : "text-[#17211d]/40 dark:text-[#f1f4ef]/40"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      <span className="block text-lg font-semibold tracking-tight">
                        {role.title}
                      </span>
                    </div>

                    <ArrowUpRight
                      className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-300 ${
                        active ? "rotate-45" : "group-hover:rotate-45"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active role */}
          <div className="relative min-h-[440px] overflow-hidden rounded-3xl bg-[#e9ebe3] p-7 sm:p-9 lg:p-10 dark:bg-[#171e1a]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRole.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#b6d900] text-[#17211d] dark:bg-[#91aa00]">
                    <Code2 className="h-5 w-5" />
                  </div>

                  <Sparkles className="h-5 w-5 opacity-30" />
                </div>

                <h3 className="max-w-2xl text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {activeRole.title}
                </h3>

                {activeRole.summary && (
                  <p className="mt-4 max-w-2xl text-base leading-7 opacity-65">
                    {activeRole.summary}
                  </p>
                )}

                {activeRole.responsibilities.length > 0 && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {activeRole.responsibilities.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-[#17211d]/10 bg-white/40 p-4 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03]"
                      >
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#b6d900] text-[#17211d]">
                          <Check className="h-3 w-3" />
                        </span>

                        <span className="text-sm leading-6 opacity-80">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeRole.technologies.length > 0 && (
                  <div className="mt-8">
                    <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] opacity-45">
                      Technologies
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {activeRole.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-[#17211d]/10 px-3 py-1.5 text-xs font-medium dark:border-[#f1f4ef]/10"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {activeRole.cta_label && activeRole.cta_url && (
                  <div className="mt-9">
                    <a
                      href={activeRole.cta_url}
                      className="inline-flex items-center gap-2 rounded-full bg-[#17211d] px-5 py-3 text-sm font-semibold text-[#f6f6f2] transition-transform duration-300 hover:-translate-y-0.5 dark:bg-[#f1f4ef] dark:text-[#101613]"
                    >
                      {activeRole.cta_label}
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Decorative background */}
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full border-[40px] border-[#b6d900]/20 dark:border-[#91aa00]/10" />
            <div className="pointer-events-none absolute -right-10 top-10 h-24 w-24 rounded-full bg-[#b6d900]/10 blur-2xl dark:bg-[#91aa00]/10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roles;