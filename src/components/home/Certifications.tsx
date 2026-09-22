import React from "react";
import {
  ArrowUpRight,
  Award,
  ExternalLink,
} from "lucide-react";

import { Certification } from "../../types/portfolio";

type CertificationsProps = {
  certifications: Certification[];
};

const Certifications = ({
  certifications,
}: CertificationsProps) => {
  return (
    <section
      id="certifications"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">
            Certifications
          </p>

          <h2 className="section-title">
            Continuous learning, backed by credentials.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
          Professional certifications and completed learning programs
          that support my practical development experience.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {certifications.map((certification) => (
          <article
            key={certification.id}
            className="group relative overflow-hidden rounded-[2rem] border border-[#17211d]/10 bg-white/70 p-6 transition-transform duration-300 hover:-translate-y-1 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] md:p-8"
          >
            <div className="flex flex-col gap-6 sm:flex-row">
              {/* Certificate Image / Icon */}
              <div className="shrink-0">
                {certification.imageUrl ? (
                  <div className="h-24 w-24 overflow-hidden rounded-2xl border border-[#17211d]/10 bg-[#f6f6f2] dark:border-[#f1f4ef]/10 dark:bg-[#18201c]">
                    <img
                      src={certification.imageUrl}
                      alt={certification.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="grid h-24 w-24 place-items-center rounded-2xl bg-[#b6d900]/15 text-[#17211d] dark:text-[#f1f4ef]">
                    <Award className="h-9 w-9" />
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                  {certification.issuer}
                </p>

                <h3 className="mt-2 text-xl font-semibold tracking-tight">
                  {certification.title}
                </h3>

                {certification.description && (
                  <p className="mt-3 text-sm leading-6 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
                    {certification.description}
                  </p>
                )}

                {certification.credentialId && (
                  <p className="mt-4 text-xs text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                    Credential ID:{" "}
                    <span className="font-medium">
                      {certification.credentialId}
                    </span>
                  </p>
                )}

                {certification.credentialUrl && (
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#b6d900] decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                  >
                    View credential
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.04] transition-transform duration-500 group-hover:scale-110">
              <ArrowUpRight className="h-28 w-28" />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Certifications;