import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-8 lg:px-12 lg:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#17211d] px-7 py-14 text-[#f6f6f2] sm:px-10 sm:py-16 lg:px-16 lg:py-20 dark:bg-[#e8ece5] dark:text-[#101613]">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border-[45px] border-[#b6d900]/20 dark:border-[#91aa00]/20" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#b6d900]/10 blur-3xl dark:bg-[#91aa00]/10" />

        <div className="pointer-events-none absolute right-[20%] top-10">
          <Sparkles className="h-6 w-6 text-[#b6d900] dark:text-[#91aa00]" />
        </div>

        <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f6f6f2]/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] dark:border-[#101613]/15">
              <span className="h-2 w-2 rounded-full bg-[#b6d900] dark:bg-[#91aa00]" />
              Have a project in mind?
            </div>

            <h2 className="max-w-4xl text-4xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-5xl lg:text-7xl">
              Let&apos;s build something{" "}
              <span className="text-[#b6d900] dark:text-[#91aa00]">
                useful.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 opacity-65 sm:text-lg">
              Have an idea, product, or challenge you'd like to discuss?
              Let&apos;s turn it into a focused digital experience.
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#b6d900] px-6 py-4 text-sm font-bold text-[#17211d] transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:bg-[#91aa00] dark:text-[#101613]"
          >
            Start a conversation

            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#17211d]/10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 dark:bg-[#101613]/10">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;