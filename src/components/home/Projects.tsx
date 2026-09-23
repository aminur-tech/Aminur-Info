"use client";

import React from "react";
import {
  ArrowUpRight,
  ExternalLink,
  Github,
  Layers3,
  Sparkles,
} from "lucide-react";

import { Project } from "../../types/portfolio";

type ProjectsProps = {
  projects: Project[];
};

const Projects = ({ projects }: ProjectsProps) => {
  if (!projects?.length) return null;

  return (
    <section
      id="projects"
      className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36"
    >
      {/* Background Decorative Glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#b6d900]/5 blur-[140px]" />

      {/* =========================
          SECTION HEADER
      ========================== */}
      <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b6d900]/20 bg-[#b6d900]/10 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-[#b6d900] uppercase backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Selected Work</span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-5xl lg:text-6xl">
            Crafted with <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#b6d900] to-[#88a300]">precision & purpose.</span>
          </h2>
        </div>

        <p className="max-w-md text-base leading-relaxed text-[#17211d]/70 dark:text-[#f1f4ef]/70">
          A curated portfolio of digital products, scalable engineering solutions, and thoughtful user experiences built for impact.
        </p>
      </div>

      {/* =========================
          STACKED CARDS CONTAINER
      ========================== */}
      <div className="relative space-y-12 md:space-y-24">
        {projects.map((project, index) => {
          // Subtle stacking transform logic via inline styling
          const topOffset = 96 + index * 16; // Incremental top spacing for stacked look

          return (
            <div
              key={project.id || index}
              className="sticky top-24 transition-all duration-500 ease-out"
              style={{
                top: `${topOffset}px`,
                zIndex: index + 1,
              }}
            >
              <article
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-[2.5rem]
                  border
                  border-white/10
                  bg-[#0d1210]
                  shadow-[0_30px_100px_-15px_rgba(0,0,0,0.7)]
                  transition-transform
                  duration-500
                  hover:-translate-y-1
                "
              >
                {/* Visual Frame Container */}
                <div className="relative h-[80vh] min-h-[520px] max-h-[680px] w-full overflow-hidden">
                  
                  {/* Background Image / Fallback */}
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
                        duration-1000
                        ease-out
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-radial from-[#18231e] to-[#0c120f]">
                      <Layers3 className="h-20 w-20 text-white/10" />
                    </div>
                  )}

                  {/* Multi-stage Luxury Gradient Overlays */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0f0d] via-[#0a0f0d]/60 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a0f0d]/80 via-transparent to-transparent opacity-60" />

                  {/* Top Badge: Project Counter */}
                  <div className="absolute left-6 top-6 md:left-10 md:top-10">
                    <div
                      className="
                        flex
                        h-12
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/15
                        bg-black/40
                        px-5
                        text-xs
                        font-bold
                        tracking-[0.25em]
                        text-white
                        shadow-inner
                        backdrop-blur-xl
                      "
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
                    {/* Tech Stack Pills */}
                    {project.technologies?.length > 0 && (
                      <div className="mb-5 flex flex-wrap gap-2">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="
                              rounded-full
                              border
                              border-white/10
                              bg-white/5
                              px-4
                              py-1.5
                              text-xs
                              font-medium
                              tracking-wide
                              text-white/90
                              shadow-sm
                              backdrop-blur-md
                              transition-colors
                              duration-300
                              group-hover:border-white/25
                            "
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Title, Description & Action Buttons */}
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                      <div className="max-w-2xl">
                        <h3 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-5xl">
                          {project.title}
                        </h3>

                        {project.short_description && (
                          <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
                            {project.short_description}
                          </p>
                        )}
                      </div>

                      {/* CTA Action Bar */}
                      <div className="flex shrink-0 items-center gap-3">
                        {/* Primary Action: View Details */}
                        <a
                          href={`/projects/${project.slug}`}
                          className="
                            group/btn
                            inline-flex
                            items-center
                            gap-2.5
                            rounded-full
                            bg-[#b6d900]
                            px-6
                            py-3.5
                            text-sm
                            font-bold
                            text-[#111815]
                            shadow-lg
                            shadow-[#b6d900]/10
                            transition-all
                            duration-300
                            hover:bg-[#c6eb00]
                            hover:shadow-xl
                            hover:shadow-[#b6d900]/25
                            active:scale-95
                          "
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                        </a>

                        {/* Secondary Action: External Live Demo */}
                        {project.demo_url && (
                          <a
                            href={project.demo_url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.title} live demo`}
                            className="
                              grid
                              h-12
                              w-12
                              place-items-center
                              rounded-full
                              border
                              border-white/15
                              bg-white/10
                              text-white
                              backdrop-blur-md
                              transition-all
                              duration-300
                              hover:border-white/40
                              hover:bg-white/20
                              hover:scale-105
                              active:scale-95
                            "
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}

                        {/* Secondary Action: GitHub Repo */}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={`Open ${project.title} GitHub repository`}
                            className="
                              grid
                              h-12
                              w-12
                              place-items-center
                              rounded-full
                              border
                              border-white/15
                              bg-white/10
                              text-white
                              backdrop-blur-md
                              transition-all
                              duration-300
                              hover:border-white/40
                              hover:bg-white/20
                              hover:scale-105
                              active:scale-95
                            "
                          >
                            <Github className="h-5 w-5" />
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