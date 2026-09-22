import React from "react";
import { Code2, Layers3 } from "lucide-react";

import { Skill } from "../../types/portfolio";

type SkillsProps = {
  skills: Skill[];
};

const Skills = ({ skills }: SkillsProps) => {
  const groupedSkills = skills.reduce<Record<string, Skill[]>>(
    (groups, skill) => {
      if (!groups[skill.category]) {
        groups[skill.category] = [];
      }

      groups[skill.category].push(skill);

      return groups;
    },
    {},
  );

  return (
    <section
      id="skills"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">
            Skills & technologies
          </p>

          <h2 className="section-title">
            Tools I use to turn ideas into products.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
          A practical technology stack covering frontend development,
          backend engineering, databases, APIs, and modern product
          development.
        </p>
      </div>

      <div className="space-y-10">
        {Object.entries(groupedSkills).map(
          ([category, categorySkills]) => (
            <div key={category}>
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#b6d900]/15">
                  <Layers3 className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">
                  {category}
                </h3>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="group rounded-2xl border border-[#17211d]/10 bg-white/70 p-5 transition-transform duration-300 hover:-translate-y-1 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#f6f6f2] dark:bg-white/[0.05]">
                        {skill.icon ? (
                          <img
                            src={skill.icon}
                            alt=""
                            className="h-6 w-6 object-contain"
                          />
                        ) : (
                          <Code2 className="h-5 w-5 opacity-60" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-semibold">
                          {skill.name}
                        </h4>

                        {skill.level !== null && (
                          <div className="mt-2 flex items-center gap-2">
                            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#17211d]/10 dark:bg-white/10">
                              <div
                                className="h-full rounded-full bg-[#b6d900]"
                                style={{
                                  width: `${Math.min(
                                    Math.max(skill.level, 0),
                                    100,
                                  )}%`,
                                }}
                              />
                            </div>

                            <span className="text-xs text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                              {skill.level}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {skill.years !== null && (
                      <p className="mt-4 text-xs text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                        {skill.years}{" "}
                        {skill.years === 1 ? "year" : "years"}{" "}
                        experience
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
};

export default Skills;