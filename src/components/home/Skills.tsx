"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Code2, Layers3, Sparkles } from "lucide-react";

import { Skill } from "../../types/portfolio";

type SkillsProps = {
  skills: Skill[];
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

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  },
};

const Skills = ({ skills }: SkillsProps) => {
  const groupedSkills = skills.reduce<Record<string, Skill[]>>(
    (groups, skill) => {
      const category = skill.category || "General";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(skill);
      return groups;
    },
    {},
  );

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      {/* Background Ambient Glow */}
      <div className="pointer-events-none absolute right-10 top-1/3 -z-10 h-96 w-96 rounded-full bg-[#b6d900]/5 blur-[140px]" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header Section */}
        <motion.div
          variants={fadeUpVariants}
          className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            {/* Eyebrow Header */}
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#b6d900]/20 bg-[#b6d900]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#b6d900] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Skills & Technologies</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-4xl lg:text-5xl">
              Tools I use to turn ideas into products.
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-[#17211d]/70 dark:text-[#f1f4ef]/70">
            A practical technology stack covering frontend engineering, scalable
            backends, databases, cloud APIs, and modern UI development.
          </p>
        </motion.div>

        {/* Grouped Skills Lists */}
        <div className="space-y-14">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <motion.div key={category} variants={fadeUpVariants}>
              {/* Category Label */}
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl border border-[#b6d900]/30 bg-[#b6d900]/15 text-[#b6d900] backdrop-blur-md">
                  <Layers3 className="h-4 w-4" />
                </div>

                <h3 className="text-xl font-bold tracking-tight text-[#17211d] dark:text-[#f1f4ef]">
                  {category}
                </h3>
              </div>

              {/* Skills Grid */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id || skill.name}
                    className="group relative rounded-3xl border border-[#17211d]/10 bg-white/60 p-5 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#b6d900]/40 hover:shadow-xl hover:shadow-[#b6d900]/5 dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#b6d900]/40"
                  >
                    <div className="flex items-center gap-4">
                      {/* Skill Icon Container */}
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-[#17211d]/5 bg-[#f6f6f2] transition-colors duration-300 group-hover:bg-[#b6d900]/10 dark:border-white/10 dark:bg-white/[0.08]">
                        {skill.icon ? (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="h-6 w-6 object-contain filter transition-all duration-300 dark:brightness-0 dark:invert"
                          />
                        ) : (
                          <Code2 className="h-5 w-5 text-[#17211d]/60 dark:text-[#f1f4ef]/80" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate text-base font-semibold text-[#17211d] dark:text-[#f1f4ef]">
                          {skill.name}
                        </h4>

                        {/* Skill Level Progress */}
                        {skill.level !== null && skill.level !== undefined && (
                          <div className="mt-2 flex items-center gap-2.5">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#17211d]/10 dark:bg-white/10">
                              <motion.div
                                className="h-full rounded-full bg-[#b6d900]"
                                initial={{ width: 0 }}
                                whileInView={{
                                  width: `${Math.min(
                                    Math.max(skill.level, 0),
                                    100,
                                  )}%`,
                                }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1,
                                  ease: [0.215, 0.61, 0.355, 1.0],
                                }}
                              />
                            </div>

                            <span className="text-xs font-medium text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                              {skill.level}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Years of Experience Badge */}
                    {skill.years !== null && skill.years !== undefined && (
                      <div className="mt-4 flex items-center justify-between border-t border-[#17211d]/5 pt-3 dark:border-white/5">
                        <span className="text-xs font-medium text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                          Experience
                        </span>
                        <span className="rounded-full bg-[#17211d]/5 px-2.5 py-0.5 text-xs font-semibold text-[#17211d]/80 dark:bg-white/5 dark:text-[#f1f4ef]/80">
                          {skill.years} {skill.years === 1 ? "year" : "years"}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;