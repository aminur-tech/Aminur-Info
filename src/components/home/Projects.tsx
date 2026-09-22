import React from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers3,
} from "lucide-react";

import { Project } from "../../types/portfolio";

type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  return (
    <section
      id="projects"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">
            Selected work
          </p>

          <h2 className="section-title">
            Projects built with purpose.
          </h2>
        </div>

        <div className="max-w-md text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
          A selection of products and platforms focused on practical
          problems, thoughtful interfaces, and reliable engineering.
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className={`group relative overflow-hidden rounded-[2rem] border border-[#17211d]/10 bg-white/70 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] ${
              index === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div
              className={`relative overflow-hidden ${
                index === 0
                  ? "h-[420px] md:h-[560px]"
                  : "h-[360px]"
              }`}
            >
              {project.thumbnail_url ? (
                <img
                  src={project.thumbnail_url}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[#e9ebe5] dark:bg-[#18201c]">
                  <Layers3 className="h-16 w-16 opacity-20" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-[#101613]/90 via-[#101613]/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies
                    ?.slice(0, 5)
                    .map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md"
                      >
                        {technology}
                      </span>
                    ))}
                </div>

                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                  <div className="max-w-2xl">
                    <h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
                      {project.title}
                    </h3>

                    {project.short_description && (
                      <p className="mt-3 max-w-xl text-sm leading-6 text-white/75 md:text-base">
                        {project.short_description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <a
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-[#b6d900] px-5 py-3 text-sm font-semibold text-[#17211d] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      View project
                      <ArrowUpRight className="h-4 w-4" />
                    </a>

                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} live demo`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}

                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${project.title} GitHub repository`}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;