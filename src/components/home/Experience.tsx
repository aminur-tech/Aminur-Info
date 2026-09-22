import React from "react";
import { ArrowUpRight, BriefcaseBusiness } from "lucide-react";

import { Experience as ExperienceType } from "../../types/portfolio";

type ExperienceProps = {
  experience: ExperienceType[];
};

const Experience = ({ experience }: ExperienceProps) => {
  const formatDate = (date: string | null) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section
      id="experience"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mb-14 max-w-2xl">
        <p className="eyebrow mb-4">
          Experience
        </p>

        <h2 className="section-title">
          Experience shaped by building and shipping.
        </h2>
      </div>

      <div className="space-y-6">
        {experience.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-[2rem] border border-[#17211d]/10 bg-white/70 p-6 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* Icon */}
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#b6d900]/15 text-[#17211d] dark:text-[#f1f4ef]">
                <BriefcaseBusiness className="h-7 w-7" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {item.position}
                    </h3>

                    <p className="mt-2 text-base font-medium text-[#17211d]/70 dark:text-[#f1f4ef]/70">
                      {item.company}
                    </p>

                    {item.location && (
                      <p className="mt-1 text-sm text-[#17211d]/55 dark:text-[#f1f4ef]/55">
                        {item.location}
                      </p>
                    )}
                  </div>

                  {(item.start_date ||
                    item.end_date ||
                    item.current_position) && (
                    <div className="shrink-0 text-sm text-[#17211d]/55 dark:text-[#f1f4ef]/55 md:text-right">
                      {formatDate(item.start_date)}

                      {(item.start_date || item.end_date) && " — "}

                      {item.current_position
                        ? "Present"
                        : formatDate(item.end_date)}
                    </div>
                  )}
                </div>

                {item.description && (
                  <p className="mt-6 max-w-3xl text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
                    {item.description}
                  </p>
                )}

                {/* Responsibilities */}
                {item.responsibilities?.length > 0 && (
                  <div className="mt-6">
                    <ul className="space-y-3">
                      {item.responsibilities.map(
                        (responsibility) => (
                          <li
                            key={responsibility}
                            className="flex items-start gap-3 text-sm leading-6 text-[#17211d]/70 dark:text-[#f1f4ef]/70"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#b6d900]" />

                            <span>{responsibility}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                {item.technologies?.length > 0 && (
                  <div className="mt-7 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-[#17211d]/10 bg-[#f6f6f2] px-3 py-1.5 text-xs font-medium dark:border-[#f1f4ef]/10 dark:bg-white/[0.04]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <ArrowUpRight className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 opacity-[0.035] transition-transform duration-500 group-hover:scale-110" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Experience;