import React from "react";
import { ArrowUpRight, GraduationCap } from "lucide-react";

import { Education as EducationType } from "../../types/portfolio";

type EducationProps = {
  education: EducationType[];
};

const Education = ({ education }: EducationProps) => {
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
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mb-14 max-w-2xl">
        <p className="eyebrow mb-4">
          Education
        </p>

        <h2 className="section-title">
          Academic foundation for continuous growth.
        </h2>
      </div>

      <div className="space-y-6">
        {education.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-[2rem] border border-[#17211d]/10 bg-white/70 p-6 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-start">
              {/* Icon */}
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[#b6d900]/15 text-[#17211d] dark:text-[#f1f4ef]">
                <GraduationCap className="h-7 w-7" />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-col justify-between gap-3 md:flex-row md:items-start">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                      {item.degree}
                    </h3>

                    <p className="mt-2 text-base font-medium text-[#17211d]/70 dark:text-[#f1f4ef]/70">
                      {item.institution}
                    </p>

                    {item.field && (
                      <p className="mt-1 text-sm text-[#17211d]/55 dark:text-[#f1f4ef]/55">
                        {item.field}
                      </p>
                    )}
                  </div>

                  {(item.start_date || item.end_date) && (
                    <div className="shrink-0 text-sm text-[#17211d]/55 dark:text-[#f1f4ef]/55">
                      {formatDate(item.start_date)}

                      {item.start_date && item.end_date && " — "}

                      {formatDate(item.end_date)}
                    </div>
                  )}
                </div>

                {item.grade && (
                  <div className="mt-5 inline-flex rounded-full border border-[#17211d]/10 bg-[#f6f6f2] px-4 py-2 text-xs font-semibold dark:border-[#f1f4ef]/10 dark:bg-white/[0.04]">
                    Grade: {item.grade}
                  </div>
                )}

                {item.description && (
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
                    {item.description}
                  </p>
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

export default Education;