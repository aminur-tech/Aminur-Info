import React from "react";
import { Quote, Star } from "lucide-react";

import { Testimonial } from "../../types/portfolio";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

const Testimonials = ({ testimonials }: TestimonialsProps) => {
  return (
    <section
      id="proof"
      className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mb-14 max-w-2xl">
        <p className="eyebrow mb-4">
          Client perspective
        </p>

        <h2 className="section-title">
          Good work should leave people confident.
        </h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {testimonials.slice(0, 2).map((testimonial) => (
          <article
            key={testimonial.id}
            className="relative overflow-hidden rounded-[2rem] border border-[#17211d]/10 bg-white/70 p-8 dark:border-[#f1f4ef]/10 dark:bg-white/[0.03] md:p-10"
          >
            <Quote className="absolute right-8 top-8 h-12 w-12 opacity-10" />

            <div className="mb-6 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`h-4 w-4 ${
                    index < testimonial.rating
                      ? "fill-current"
                      : "opacity-20"
                  }`}
                />
              ))}
            </div>

            <blockquote className="max-w-2xl text-lg leading-8 tracking-tight md:text-xl">
              “{testimonial.comment}”
            </blockquote>

            <div className="mt-8">
              <p className="font-semibold">
                {testimonial.name}
              </p>

              {(testimonial.role || testimonial.company) && (
                <p className="mt-1 text-sm text-[#17211d]/60 dark:text-[#f1f4ef]/60">
                  {[testimonial.role, testimonial.company]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;