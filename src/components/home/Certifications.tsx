"use client";

import React, { useState } from "react";
import {
  ArrowUpRight,
  Award,
  ExternalLink,
  FileText,
  X,
  Maximize2,
} from "lucide-react";

import { Certification } from "../../types/portfolio";

type CertificationsProps = {
  certifications: Certification[];
};

const Certifications = ({
  certifications,
}: CertificationsProps) => {
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certification | null>(null);

  const isPdf = (url?: string | null) => {
    if (!url) return false;

    const cleanUrl = url.split("?")[0].split("#")[0].toLowerCase();

    return cleanUrl.endsWith(".pdf");
  };

  const isImage = (url?: string | null) => {
    if (!url) return false;

    const cleanUrl = url.split("?")[0].split("#")[0].toLowerCase();

    return /\.(jpg|jpeg|png|webp|gif|avif|svg)$/.test(cleanUrl);
  };

  return (
    <>
      <section
        id="certifications"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
      >
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Certifications</p>

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
          {certifications.map((certification) => {
            const pdf = isPdf(certification.imageUrl);
            const image = isImage(certification.imageUrl);

            return (
              <article
                key={certification.id}
                className="group relative overflow-hidden rounded-[2rem] border border-[#17211d]/10 bg-white/70 p-6 transition-transform duration-300 hover:-translate-y-1 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] md:p-8"
              >
                <div className="flex flex-col gap-6 sm:flex-row">
                  {/* Certificate Preview */}
                  <div className="shrink-0">
                    {image ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificate(certification)
                        }
                        className="group/preview relative h-24 w-24 overflow-hidden rounded-2xl border border-[#17211d]/10 bg-[#f6f6f2] dark:border-[#f1f4ef]/10 dark:bg-[#18201c]"
                        aria-label={`View ${certification.title}`}
                      >
                        <img
                          src={certification.imageUrl!}
                          alt={certification.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover/preview:scale-105"
                        />

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/preview:bg-black/45 group-hover/preview:opacity-100">
                          <Maximize2 className="h-5 w-5 text-white" />
                        </div>
                      </button>
                    ) : pdf ? (
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedCertificate(certification)
                        }
                        className="group/pdf relative grid h-24 w-24 place-items-center overflow-hidden rounded-2xl border border-[#17211d]/10 bg-[#f6f6f2] dark:border-[#f1f4ef]/10 dark:bg-[#18201c]"
                        aria-label={`View ${certification.title} PDF`}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <FileText className="h-9 w-9 text-[#17211d]/60 dark:text-[#f1f4ef]/60" />
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#17211d]/50 dark:text-[#f1f4ef]/50">
                            PDF
                          </span>
                        </div>

                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover/pdf:bg-black/45 group-hover/pdf:opacity-100">
                          <Maximize2 className="h-5 w-5 text-white" />
                        </div>
                      </button>
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

                    <div className="mt-5 flex flex-wrap items-center gap-4">
                      {certification.imageUrl &&
                        (image || pdf) && (
                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCertificate(certification)
                            }
                            className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#b6d900] decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                          >
                            View certificate
                            <Maximize2 className="h-4 w-4" />
                          </button>
                        )}

                      {certification.credentialUrl && (
                        <a
                          href={certification.credentialUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#b6d900] decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
                        >
                          View credential
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pointer-events-none absolute -right-6 -top-6 opacity-[0.04] transition-transform duration-500 group-hover:scale-110">
                  <ArrowUpRight className="h-28 w-28" />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Full Certificate Modal */}
      {selectedCertificate?.imageUrl && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedCertificate(null)}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setSelectedCertificate(null)}
            className="absolute right-4 top-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            aria-label="Close certificate preview"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Modal Content */}
          <div
            className="relative flex max-h-[92vh] max-w-[95vw] items-center justify-center overflow-hidden rounded-2xl bg-[#111613] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            {isPdf(selectedCertificate.imageUrl) ? (
              <iframe
                src={selectedCertificate.imageUrl}
                title={selectedCertificate.title}
                className="h-[85vh] w-[90vw] max-w-6xl rounded-xl bg-white"
              />
            ) : isImage(selectedCertificate.imageUrl) ? (
              <img
                src={selectedCertificate.imageUrl}
                alt={selectedCertificate.title}
                className="max-h-[90vh] max-w-[95vw] object-contain"
              />
            ) : (
              <div className="flex min-h-60 min-w-80 flex-col items-center justify-center gap-4 p-8 text-center text-white">
                <FileText className="h-12 w-12 opacity-60" />

                <p className="text-sm text-white/70">
                  Preview is not available for this file format.
                </p>

                <a
                  href={selectedCertificate.imageUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#b6d900] px-5 py-3 text-sm font-semibold text-[#17211d]"
                >
                  Open file
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Certifications;