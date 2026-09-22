"use client";

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
      {/* =========================
          Section Header
      ========================== */}
      <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Selected work</p>
          <h2 className="section-title">
            Projects built with purpose.
          </h2>
        </div>

        <div className="max-w-md text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
          A selection of products and platforms focused on practical
          problems, thoughtful interfaces, and reliable engineering.
        </div>
      </div>

      {/* =========================
          Stacked Projects Container
      ========================== */}
      <div className="relative flex flex-col gap-16 pb-24">
        {projects.map((project, index) => {
          // Dynamic calculation for proper offset stacking
          const topOffset = 100 + index * 32;

          return (
            <div
              key={project.id}
              className="sticky transition-all duration-300 ease-out"
              style={{
                top: `${topOffset}px`,
                zIndex: index + 1,
              }}
            >
              {/* =========================
                  Project Card
              ========================== */}
              <article
                className="
                  group
                  relative
                  mx-auto
                  overflow-hidden
                  rounded-[2rem]
                  border
                  border-[#17211d]/10
                  bg-[#101613]
                  shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  dark:border-[#f1f4ef]/10
                "
              >
                {/* Image Container */}
                <div className="relative h-[480px] w-full overflow-hidden md:h-[580px] lg:h-[640px]">
                  {project.thumbnail_url ? (
                    <img
                      src={project.thumbnail_url}
                      alt={project.title}
                      loading={index === 0 ? "eager" : "lazy"}
                      className="
                        h-full
                        w-full
                        object-cover
                        object-top
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#18201c]">
                      <Layers3 className="h-16 w-16 opacity-20 text-white" />
                    </div>
                  )}

                  {/* Gradient Overlay for Text Readability */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-[#101613]
                      via-[#101613]/50
                      to-transparent
                    "
                  />

                  {/* Project Counter Badge */}
                  <div className="absolute left-6 top-6 md:left-8 md:top-8">
                    <div
                      className="
                        flex
                        h-11
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-black/40
                        px-4
                        text-xs
                        font-semibold
                        tracking-[0.2em]
                        text-white
                        backdrop-blur-md
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Card Main Body Details */}
                  <div
                    className="
                      absolute
                      inset-x-0
                      bottom-0
                      p-6
                      md:p-8
                      lg:p-10
                    "
                  >
                    {/* Technologies Tag Pills */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 6).map((tech) => (
                          <span
                            key={tech}
                            className="
                              rounded-full
                              border
                              border-white/15
                              bg-white/10
                              px-3.5
                              py-1
                              text-xs
                              font-medium
                              text-white
                              backdrop-blur-md
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title + Action Area */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                      <div className="max-w-2xl">
                        <h3 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
                          {project.title}
                        </h3>

                        {project.short_description && (
                          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 md:text-base">
                            {project.short_description}
                          </p>
                        )}
                      </div>

                      {/* Action Links */}
                      <div className="flex shrink-0 items-center gap-3">
                        <a
                          href={`/projects/${project.slug}`}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-[#b6d900]
                            px-5
                            py-3
                            text-sm
                            font-semibold
                            text-[#17211d]
                            transition-all
                            duration-300
                            hover:bg-[#c4e817]
                            hover:shadow-lg
                            hover:shadow-[#b6d900]/20
                          "
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
                            className="
                              grid
                              h-11
                              w-11
                              place-items-center
                              rounded-full
                              border
                              border-white/20
                              bg-white/10
                              text-white
                              backdrop-blur-md
                              transition-all
                              duration-300
                              hover:bg-white/20
                            "
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
                            className="
                              grid
                              h-11
                              w-11
                              place-items-center
                              rounded-full
                              border
                              border-white/20
                              bg-white/10
                              text-white
                              backdrop-blur-md
                              transition-all
                              duration-300
                              hover:bg-white/20
                            "
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;