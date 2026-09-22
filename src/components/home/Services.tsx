import React from "react";
import { ArrowUpRight, CheckCircle2, Clock3 } from "lucide-react";

import { Service } from "../../types/portfolio";

type ServicesProps = {
  services: Service[];
};

const Services = ({ services }: ServicesProps) => {
  return (
    <section
      id="services"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">
            Services
          </p>

          <h2 className="section-title">
            Focused services for building better digital products.
          </h2>
        </div>

        <p className="max-w-md text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
          From frontend experiences to backend systems, I help turn
          product ideas into reliable, maintainable web applications.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <article
            key={service.id}
            className="group relative overflow-hidden rounded-[2rem] border border-[#17211d]/10 bg-white/70 p-7 transition-transform duration-300 hover:-translate-y-1 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] md:p-9"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="text-sm font-semibold text-[#17211d]/35 dark:text-[#f1f4ef]/30">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#b6d900]/15">
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>

            <h3 className="mt-8 text-2xl font-semibold tracking-tight">
              {service.title}
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#17211d]/65 dark:text-[#f1f4ef]/65">
              {service.short_description}
            </p>

            {service.full_description && (
              <p className="mt-4 text-sm leading-7 text-[#17211d]/55 dark:text-[#f1f4ef]/55">
                {service.full_description}
              </p>
            )}

            {service.features?.length > 0 && (
              <div className="mt-7">
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm leading-6"
                    >
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#17211d]/60 dark:text-[#f1f4ef]/60" />

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.delivery_time && (
              <div className="mt-8 flex items-center gap-2 border-t border-[#17211d]/10 pt-5 text-xs font-medium text-[#17211d]/55 dark:border-[#f1f4ef]/10 dark:text-[#f1f4ef]/55">
                <Clock3 className="h-4 w-4" />

                <span>
                  Delivery: {service.delivery_time}
                </span>
              </div>
            )}

            <div className="pointer-events-none absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-[#b6d900]/10 blur-3xl transition-transform duration-500 group-hover:scale-150" />
          </article>
        ))}
      </div>
    </section>
  );
};

export default Services;