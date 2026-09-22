import React from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  FileText,
} from "lucide-react";

import { Resume as ResumeType } from "../../types/portfolio";

type ResumeProps = {
  activeResume: ResumeType;
};

const Resume = ({ activeResume }: ResumeProps) => {
  return (
    <section
      id="resume"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="relative overflow-hidden rounded-[2.5rem] border border-[#17211d]/10 bg-[#17211d] p-8 text-white dark:border-[#f1f4ef]/10 dark:bg-[#18201c] md:p-12 lg:p-16">
        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#b6d900] text-[#17211d]">
              <FileText className="h-7 w-7" />
            </div>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Resume
            </p>

            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              {activeResume.title || "My professional resume"}
            </h2>

            {activeResume.summary && (
              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65 md:text-base">
                {activeResume.summary}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/50">
              {activeResume.version && (
                <span>
                  Version {activeResume.version}
                </span>
              )}

              {activeResume.version && (
                <span className="h-1 w-1 rounded-full bg-white/30" />
              )}

              <span>
                Updated resume
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a
              href={activeResume.file_url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#b6d900] px-6 py-3.5 text-sm font-semibold text-[#17211d] transition-transform duration-300 hover:-translate-y-0.5"
            >
              View resume
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <a
              href={activeResume.file_url}
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/15"
            >
              Download
              <ArrowDownToLine className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#b6d900]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>
    </section>
  );
};

export default Resume;