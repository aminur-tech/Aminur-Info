"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
// 1. Added Transition to the imports
import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  ExternalLink,
  FileText,
  X,
  Maximize2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Certification } from "../../types/portfolio";

type CertificationsProps = {
  certifications: Certification[];
};

const AUTOPLAY_INTERVAL = 4000;

// 2. Explicitly typed as Transition
const smoothSpring: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
};

const isPdf = (url?: string | null) => {
  if (!url) return false;
  return url.split("?")[0].split("#")[0].toLowerCase().endsWith(".pdf");
};

const isImage = (url?: string | null) => {
  if (!url) return false;
  return /\.(jpg|jpeg|png|webp|gif|avif|svg)$/.test(
    url.split("?")[0].split("#")[0].toLowerCase()
  );
};

const Certifications = ({ certifications }: CertificationsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const total = certifications.length;

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const normalizeIndex = useCallback(
    (index: number) => {
      if (!total) return 0;
      return ((index % total) + total) % total;
    },
    [total]
  );

  const handlePrev = useCallback(() => {
    if (!total) return;
    setCurrentIndex((prev) => normalizeIndex(prev - 1));
  }, [normalizeIndex, total]);

  const handleNext = useCallback(() => {
    if (!total) return;
    setCurrentIndex((prev) => normalizeIndex(prev + 1));
  }, [normalizeIndex, total]);

  useEffect(() => {
    if (total <= 1 || selectedIndex !== null || isHovered) return;

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => normalizeIndex(prev + 1));
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(interval);
  }, [total, selectedIndex, isHovered, normalizeIndex]);

  const visibleCertificates = useMemo(() => {
    if (!total) return [];

    if (visibleCount === 1) {
      return [
        {
          certification: certifications[currentIndex],
          originalIndex: currentIndex,
          position: "center",
        },
      ];
    }

    if (visibleCount === 2) {
      const nextIndex = normalizeIndex(currentIndex + 1);
      return [
        {
          certification: certifications[currentIndex],
          originalIndex: currentIndex,
          position: "center",
        },
        {
          certification: certifications[nextIndex],
          originalIndex: nextIndex,
          position: "side",
        },
      ];
    }

    const previousIndex = normalizeIndex(currentIndex - 1);
    const nextIndex = normalizeIndex(currentIndex + 1);

    return [
      {
        certification: certifications[previousIndex],
        originalIndex: previousIndex,
        position: "side",
      },
      {
        certification: certifications[currentIndex],
        originalIndex: currentIndex,
        position: "center",
      },
      {
        certification: certifications[nextIndex],
        originalIndex: nextIndex,
        position: "side",
      },
    ];
  }, [certifications, currentIndex, normalizeIndex, total, visibleCount]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedIndex !== null) {
        if (event.key === "ArrowLeft") {
          setSelectedIndex((prev) =>
            prev === null ? null : normalizeIndex(prev - 1)
          );
        }
        if (event.key === "ArrowRight") {
          setSelectedIndex((prev) =>
            prev === null ? null : normalizeIndex(prev + 1)
          );
        }
        if (event.key === "Escape") setSelectedIndex(null);
        return;
      }

      if (event.key === "ArrowLeft") handlePrev();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handlePrev, handleNext, normalizeIndex]);

  if (!certifications.length) return null;

  const activeCert =
    selectedIndex !== null ? certifications[selectedIndex] : null;

  return (
    <>
      <section
        id="certifications"
        className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-32 overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b6d900]/5 blur-[160px]" />

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpVariants}
          className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b6d900]/20 bg-[#b6d900]/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#b6d900] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Certifications</span>
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-4xl lg:text-5xl">
              Continuous learning, backed by credentials.
            </h2>
          </div>

          <p className="max-w-md text-base leading-relaxed text-[#17211d]/70 dark:text-[#f1f4ef]/70">
            Professional certifications and completed learning programs that
            validate my engineering standards and domain expertise.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Navigation Controls */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous certificate"
                className="absolute left-0 top-1/2 z-30 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#17211d]/10 bg-white/90 text-[#17211d] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#b6d900]/50 hover:bg-[#b6d900] hover:text-[#111815] dark:border-white/10 dark:bg-[#111815]/90 dark:text-white dark:hover:bg-[#b6d900] dark:hover:text-[#111815]"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Next certificate"
                className="absolute right-0 top-1/2 z-30 grid h-12 w-12 translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#17211d]/10 bg-white/90 text-[#17211d] shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-110 hover:border-[#b6d900]/50 hover:bg-[#b6d900] hover:text-[#111815] dark:border-white/10 dark:bg-[#111815]/90 dark:text-white dark:hover:bg-[#b6d900] dark:hover:text-[#111815]"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Cards Grid */}
          <div
            className={`grid gap-6 ${
              visibleCount === 1
                ? "grid-cols-1"
                : visibleCount === 2
                ? "grid-cols-2"
                : "grid-cols-3"
            }`}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCertificates.map(
                ({ certification, originalIndex, position }) => {
                  const pdf = isPdf(certification.imageUrl);
                  const image = isImage(certification.imageUrl);
                  const isMain = position === "center";
                  const isExpanded = expandedIndex === originalIndex;

                  return (
                    <motion.article
                      key={`${certification.id || originalIndex}-${currentIndex}`}
                      layout="position"
                      initial={{
                        opacity: 0,
                        x: position === "side" ? 30 : 0,
                        scale: isMain ? 0.98 : 0.95,
                      }}
                      animate={{
                        opacity: isMain ? 1 : 0.6,
                        x: 0,
                        scale: isMain ? 1 : 0.95,
                      }}
                      exit={{
                        opacity: 0,
                        x: -30,
                        scale: 0.95,
                      }}
                      transition={smoothSpring}
                      onClick={() => {
                        if (!isMain) setCurrentIndex(originalIndex);
                      }}
                      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border bg-white/70 p-5 backdrop-blur-xl transition-colors duration-300 dark:bg-white/[0.03] lg:rounded-[2.5rem] lg:p-6 will-change-transform ${
                        isMain
                          ? "border-[#b6d900]/40 shadow-2xl shadow-[#b6d900]/10 ring-1 ring-[#b6d900]/20 z-10"
                          : "cursor-pointer border-[#17211d]/10 shadow-sm hover:border-[#b6d900]/30 hover:shadow-xl dark:border-white/10 z-0"
                      }`}
                    >
                      <div>
                        {/* Featured Badge */}
                        {isMain && (
                          <div className="absolute right-4 top-4 z-20 rounded-full border border-[#b6d900]/30 bg-[#b6d900]/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#b6d900] backdrop-blur-md">
                            Featured
                          </div>
                        )}

                        {/* Certificate Preview Box - MAGIC MOVE ID */}
                        <motion.div
                          layoutId={`cert-box-${originalIndex}`}
                          className="relative mb-5 aspect-[4/3] w-full overflow-hidden rounded-[1.5rem] border border-[#17211d]/10 bg-[#f5f6f1] dark:border-white/10 dark:bg-[#0d1210]"
                        >
                          {image ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(originalIndex);
                              }}
                              className="group/img relative h-full w-full focus:outline-none"
                              aria-label={`View ${certification.title}`}
                            >
                              <img
                                src={certification.imageUrl!}
                                alt={certification.title}
                                className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover/img:scale-105"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover/img:opacity-100">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#111815] shadow-xl transition-transform duration-300 group-hover/img:scale-105">
                                  <Maximize2 className="h-4 w-4" />
                                  View Certificate
                                </span>
                              </div>
                            </button>
                          ) : pdf ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(originalIndex);
                              }}
                              className="group/pdf relative h-full w-full focus:outline-none"
                            >
                              <iframe
                                src={`${certification.imageUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                title={certification.title}
                                className="pointer-events-none h-full w-full bg-white"
                              />
                              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover/pdf:opacity-100">
                                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#111815] shadow-xl">
                                  <Maximize2 className="h-4 w-4" />
                                  Open PDF
                                </span>
                              </div>
                            </button>
                          ) : (
                            <div className="flex h-full flex-col items-center justify-center gap-3">
                              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#b6d900]/15 text-[#b6d900]">
                                <Award className="h-7 w-7" />
                              </div>
                              <span className="text-xs font-semibold text-[#17211d]/50 dark:text-white/50">
                                Preview Unavailable
                              </span>
                            </div>
                          )}
                        </motion.div>

                        {/* Card Info */}
                        <div className="px-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#17211d]/50 dark:text-white/50 sm:text-xs">
                            {certification.issuer}
                          </p>

                          <h3 className="mt-1.5 line-clamp-2 text-lg font-bold tracking-tight text-[#17211d] dark:text-[#f1f4ef] sm:text-xl">
                            {certification.title}
                          </h3>

                          {certification.description && (
                            <motion.div layout className="mt-2">
                              <motion.div
                                layout="position"
                                className="text-sm leading-relaxed text-[#17211d]/70 dark:text-white/70"
                              >
                                <p className={isExpanded ? "" : "line-clamp-2"}>
                                  {certification.description}
                                </p>
                              </motion.div>

                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedIndex(
                                    isExpanded ? null : originalIndex
                                  );
                                }}
                                aria-expanded={isExpanded}
                                className="mt-1 text-xs font-bold text-[#b6d900] transition-colors hover:underline focus:outline-none"
                              >
                                {isExpanded ? "Read less" : "Read more"}
                              </button>
                            </motion.div>
                          )}

                          {certification.credentialId && (
                            <motion.p layout="position" className="mt-3 truncate text-[11px] text-[#17211d]/50 dark:text-white/50">
                              Credential ID:{" "}
                              <span className="font-semibold text-[#17211d]/80 dark:text-white/80">
                                {certification.credentialId}
                              </span>
                            </motion.p>
                          )}
                        </div>
                      </div>

                      {/* Card Actions */}
                      <motion.div layout="position" className="mt-5 flex items-center justify-between border-t border-[#17211d]/5 pt-4 dark:border-white/5">
                        <div className="flex items-center gap-4">
                          {certification.imageUrl && (image || pdf) && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedIndex(originalIndex);
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17211d] transition-colors hover:text-[#b6d900] dark:text-[#f1f4ef] dark:hover:text-[#b6d900]"
                            >
                              View
                              <Maximize2 className="h-3.5 w-3.5 text-[#b6d900]" />
                            </button>
                          )}

                          {certification.credentialUrl && (
                            <a
                              href={certification.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#17211d] transition-colors hover:text-[#b6d900] dark:text-[#f1f4ef] dark:hover:text-[#b6d900]"
                            >
                              Verify
                              <ExternalLink className="h-3.5 w-3.5 text-[#b6d900]" />
                            </a>
                          )}
                        </div>

                        <ArrowUpRight className="h-5 w-5 text-[#17211d]/20 dark:text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </motion.div>
                    </motion.article>
                  );
                }
              )}
            </AnimatePresence>
          </div>

          {/* Autoplay Progress Bar */}
          {total > 1 && (
            <div className="mx-auto mt-8 h-1 w-32 overflow-hidden rounded-full bg-[#17211d]/10 dark:bg-white/10">
              <motion.div
                key={`${currentIndex}-${isHovered}-${selectedIndex}`}
                initial={{ width: "0%" }}
                animate={{
                  width: isHovered || selectedIndex !== null ? "0%" : "100%",
                }}
                transition={{
                  duration:
                    isHovered || selectedIndex !== null
                      ? 0
                      : AUTOPLAY_INTERVAL / 1000,
                  ease: "linear",
                }}
                className="h-full rounded-full bg-[#b6d900]"
              />
            </div>
          )}

          {/* Pagination Dots & Counter */}
          {total > 1 && (
            <div className="mt-4 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                {certifications.map((cert, index) => (
                  <button
                    key={cert.id || index}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    aria-label={`Go to slide ${index + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      index === currentIndex
                        ? "w-8 bg-[#b6d900]"
                        : "w-1.5 bg-[#17211d]/20 hover:bg-[#b6d900]/60 dark:bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#17211d]/40 dark:text-white/40">
                {currentIndex + 1} / {total}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Fullscreen Certificate Viewer Modal */}
      <AnimatePresence>
        {selectedIndex !== null && activeCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col bg-black/80 p-4 backdrop-blur-2xl sm:p-6"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Modal Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ delay: 0.2, ...smoothSpring }}
              className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 py-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold uppercase tracking-widest text-[#b6d900]">
                  {activeCert.issuer}
                </p>
                <h3 className="truncate text-base font-bold text-white sm:text-xl">
                  {activeCert.title}
                </h3>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white/70">
                  {selectedIndex + 1} / {total}
                </span>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close viewer"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:scale-105 hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </motion.div>

            {/* Modal View Area */}
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center py-4"
              onClick={(e) => e.stopPropagation()}
            >
              {total > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev === null ? null : normalizeIndex(prev - 1)
                    )
                  }
                  className="absolute left-2 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
                  aria-label="Previous certificate"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
              )}

              {/* MAGIC MOVE TARGET */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  layoutId={`cert-box-${selectedIndex}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  transition={smoothSpring}
                  className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#101613] shadow-2xl sm:rounded-3xl will-change-transform"
                >
                  {isPdf(activeCert.imageUrl) ? (
                    <iframe
                      src={activeCert.imageUrl || undefined}
                      title={activeCert.title}
                      className="h-full w-full bg-white"
                    />
                  ) : isImage(activeCert.imageUrl) ? (
                    <img
                      src={activeCert.imageUrl || undefined}
                      alt={activeCert.title}
                      className="max-h-full max-w-full object-contain p-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-5 px-6 text-center text-white">
                      <FileText className="h-14 w-14 text-[#b6d900]" />
                      <p className="text-sm text-white/70">
                        Preview is not available for this file format.
                      </p>
                      {activeCert.imageUrl && (
                        <a
                          href={activeCert.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-2xl bg-[#b6d900] px-5 py-3 text-sm font-bold text-[#111815] transition-transform hover:scale-105"
                        >
                          Open File
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {total > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev === null ? null : normalizeIndex(prev + 1)
                    )
                  }
                  className="absolute right-2 z-30 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur-xl transition-all hover:scale-110 hover:bg-white/20"
                  aria-label="Next certificate"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Certifications;