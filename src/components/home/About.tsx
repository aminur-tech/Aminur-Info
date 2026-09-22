import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

import { AboutContent, Profile } from "../../types/portfolio";

type AboutProps = {
  profile: Profile;
  about: AboutContent | null;
};

const About = ({ profile, about }: AboutProps) => {
  const aboutPoints =
    about?.highlights?.length
      ? about.highlights
      : [
          "From idea to deployment",
          "Interfaces people understand",
          "Reliable APIs and data models",
          "Long-term ownership and iteration",
        ];

  return (
    <section
      id="about"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        {/* Image */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#e9ebe5] dark:bg-[#18201c]">
            {about?.image_url || profile.profile_image_url ? (
              <img
                src={about?.image_url || profile.profile_image_url || ""}
                alt={profile.name}
                className="aspect-[4/5] h-full w-full object-cover"
              />
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center">
                <span className="text-6xl font-semibold opacity-10">
                  {profile.name?.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="eyebrow mb-4">
            About
          </p>

          <h2 className="section-title">
            {about?.title || "Building useful products with thoughtful engineering."}
          </h2>

          <div className="mt-8 max-w-2xl space-y-5 text-base leading-8 text-[#17211d]/70 dark:text-[#f1f4ef]/70">
            {about?.description ? (
              <p>{about.description}</p>
            ) : profile.long_bio ? (
              <p>{profile.long_bio}</p>
            ) : profile.short_bio ? (
              <p>{profile.short_bio}</p>
            ) : null}
          </div>

          {/* Highlights */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {aboutPoints.map((point) => (
              <div
                key={point}
                className="flex items-start gap-3"
              >
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 opacity-60" />

                <span className="text-sm leading-6">
                  {point}
                </span>
              </div>
            ))}
          </div>

          {/* Values */}
          {about?.values?.length > 0 && (
            <div className="mt-10">
              <div className="flex flex-wrap gap-2">
                {about.values.map((value) => (
                  <span
                    key={value}
                    className="rounded-full border border-[#17211d]/10 bg-white/60 px-4 py-2 text-xs font-medium dark:border-[#f1f4ef]/10 dark:bg-white/[0.03]"
                  >
                    {value}
                  </span>
                ))}
              </div>
            </div>
          )}

          <a
            href="#contact"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#b6d900] decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
          >
            Let&apos;s work together
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;