
import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "../../../lib/db";
import { env } from "../../../lib/env";

export default async function ProjectCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!env.DATABASE_URL || env.SKIP_DATABASE === "true") {
    notFound();
  }

  const project = await db.project.findFirst({
    where: {
      slug,
      published: true,
    },
  });

  if (!project) {
    notFound();
  }

  const formatDate = (date?: Date | null) =>
    date
      ? date.toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        })
      : null;

  const startDate = formatDate(project.startDate);
  const completionDate = formatDate(project.completionDate);

  return (
    <main
      className="
        min-h-screen
        bg-[#f6f6f2]
        text-[#17211d]
        transition-colors
        duration-300
        dark:bg-[#101412]
        dark:text-[#f3f5ef]
      "
    >
      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pt-14">
        <div className="mx-auto max-w-6xl">
          {/* Back */}
          <Link
            href="/#projects"
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              font-bold
              text-[#657b00]
              transition
              hover:text-[#506300]
              dark:text-[#b6d900]
              dark:hover:text-[#c9eb18]
            "
          >
            <span aria-hidden="true">←</span>
            Back to selected work
          </Link>

          {/* Hero content */}
          <header className="mt-16 max-w-4xl lg:mt-24">
            {project.category && (
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-[#657b00]
                  dark:text-[#b6d900]
                "
              >
                {project.category}
              </p>
            )}

            <h1
              className="
                mt-5
                max-w-5xl
                font-serif
                text-5xl
                font-medium
                leading-[0.95]
                tracking-[-0.055em]
                sm:text-7xl
                lg:text-8xl
              "
            >
              {project.title}
            </h1>

            <p
              className="
                mt-8
                max-w-3xl
                text-lg
                leading-8
                text-[#52605a]
                sm:text-xl
                dark:text-[#aab4ae]
              "
            >
              {project.shortDescription}
            </p>

            {/* Project metadata */}
            {(project.clientName ||
              startDate ||
              completionDate) && (
              <div
                className="
                  mt-8
                  flex
                  flex-wrap
                  items-center
                  gap-x-4
                  gap-y-2
                  text-sm
                  font-semibold
                  text-[#52605a]
                  dark:text-[#aab4ae]
                "
              >
                {project.clientName && (
                  <span>{project.clientName}</span>
                )}

                {project.clientName &&
                  (startDate || completionDate) && (
                    <span
                      className="
                        hidden
                        h-1
                        w-1
                        rounded-full
                        bg-current
                        sm:block
                      "
                    />
                  )}

                {startDate && (
                  <span>{startDate}</span>
                )}

                {startDate && completionDate && (
                  <span aria-hidden="true">—</span>
                )}

                {completionDate && (
                  <span>{completionDate}</span>
                )}
              </div>
            )}
          </header>

          {/* Hero image */}
          {project.thumbnailUrl && (
            <div
              className="
                mt-14
                overflow-hidden
                rounded-[1.5rem]
                border
                border-black/5
                bg-white
                shadow-[0_20px_70px_rgba(23,33,29,0.08)]
                sm:mt-16
                sm:rounded-[2rem]
                dark:border-white/10
                dark:bg-[#171d1a]
                dark:shadow-[0_20px_70px_rgba(0,0,0,0.3)]
              "
            >
              <img
                src={project.thumbnailUrl}
                alt={`${project.title} project preview`}
                className="
                  block
                  h-auto
                  max-h-[680px]
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-[1.015]
                "
              />
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          PROJECT OVERVIEW
      ========================================================= */}

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <div
            className="
              grid
              gap-10
              border-y
              border-black/10
              py-12
              md:grid-cols-3
              dark:border-white/10
            "
          >
            {/* Problem */}
            <CaseStudySection
              label="Problem"
              content={
                project.challenges ||
                project.fullDescription ||
                project.shortDescription
              }
            />

            {/* Solution */}
            <CaseStudySection
              label="Solution"
              content={
                project.solutions ||
                "A focused digital product experience shaped around the project requirements, user needs, and technical goals."
              }
            />

            {/* Result */}
            <CaseStudySection
              label="Result"
              content={
                project.results ||
                "The completed project is available to explore through the live and source links below."
              }
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          FULL DESCRIPTION
      ========================================================= */}

      {project.fullDescription && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
              <div>
                <p
                  className="
                    text-xs
                    font-bold
                    uppercase
                    tracking-[0.18em]
                    text-[#657b00]
                    dark:text-[#b6d900]
                  "
                >
                  Overview
                </p>
              </div>

              <div className="max-w-3xl">
                <p
                  className="
                    whitespace-pre-line
                    text-lg
                    leading-8
                    text-[#52605a]
                    dark:text-[#b3bcb7]
                  "
                >
                  {project.fullDescription}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          TECHNOLOGIES
      ========================================================= */}

      {project.technologies.length > 0 && (
        <section className="px-5 pb-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div
              className="
                rounded-[1.5rem]
                border
                border-black/10
                bg-white/60
                p-7
                sm:rounded-[2rem]
                sm:p-10
                dark:border-white/10
                dark:bg-[#171d1a]/70
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#657b00]
                  dark:text-[#b6d900]
                "
              >
                Technology
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="
                      rounded-full
                      border
                      border-[#17211d]/10
                      bg-[#f6f6f2]
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      text-[#17211d]
                      dark:border-white/10
                      dark:bg-[#101412]
                      dark:text-[#e9eee9]
                    "
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          PROJECT LINKS
      ========================================================= */}

      {(project.demoUrl ||
        project.githubUrl ||
        project.frontendGithubUrl ||
        project.backendGithubUrl ||
        project.serverSiteUrl ||
        project.clientUrl) && (
        <section className="px-5 pb-24 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div
              className="
                border-t
                border-black/10
                pt-10
                dark:border-white/10
              "
            >
              <p
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-[#657b00]
                  dark:text-[#b6d900]
                "
              >
                Explore project
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.demoUrl && (
                  <ProjectLink
                    href={project.demoUrl}
                    primary
                  >
                    Visit live demo
                  </ProjectLink>
                )}

                {project.githubUrl && (
                  <ProjectLink href={project.githubUrl}>
                    View source
                  </ProjectLink>
                )}

                {project.frontendGithubUrl && (
                  <ProjectLink href={project.frontendGithubUrl}>
                    Frontend source
                  </ProjectLink>
                )}

                {project.backendGithubUrl && (
                  <ProjectLink href={project.backendGithubUrl}>
                    Backend source
                  </ProjectLink>
                )}

                {project.serverSiteUrl && (
                  <ProjectLink href={project.serverSiteUrl}>
                    Server / API
                  </ProjectLink>
                )}

                {project.clientUrl && (
                  <ProjectLink href={project.clientUrl}>
                    Visit client
                  </ProjectLink>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

/* ===============================================================
   CASE STUDY SECTION
================================================================ */

function CaseStudySection({
  label,
  content,
}: {
  label: string;
  content: string;
}) {
  return (
    <section>
      <p
        className="
          text-xs
          font-bold
          uppercase
          tracking-[0.18em]
          text-[#657b00]
          dark:text-[#b6d900]
        "
      >
        {label}
      </p>

      <p
        className="
          mt-4
          text-[15px]
          leading-7
          text-[#52605a]
          dark:text-[#aab4ae]
        "
      >
        {content}
      </p>
    </section>
  );
}

/* ===============================================================
   PROJECT LINK
================================================================ */

function ProjectLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={
        primary
          ? `
            inline-flex
            items-center
            rounded-full
            bg-[#17211d]
            px-5
            py-3
            text-sm
            font-bold
            text-white
            transition
            hover:-translate-y-0.5
            hover:bg-[#29352f]
            dark:bg-[#e9eee9]
            dark:text-[#101412]
            dark:hover:bg-white
          `
          : `
            inline-flex
            items-center
            rounded-full
            border
            border-[#17211d]/15
            bg-transparent
            px-5
            py-3
            text-sm
            font-bold
            text-[#17211d]
            transition
            hover:-translate-y-0.5
            hover:bg-[#17211d]
            hover:text-white
            dark:border-white/15
            dark:text-[#e9eee9]
            dark:hover:bg-[#e9eee9]
            dark:hover:text-[#101412]
          `
      }
    >
      {children}
      <span className="ml-2 text-xs" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}
