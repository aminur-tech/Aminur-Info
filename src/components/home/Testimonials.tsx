import type { Testimonial } from "../../types/portfolio";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return <section className="mx-auto mt-24 max-w-6xl px-4" id="testimonials">
    <div className="mb-10 text-center"><p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-600">Client feedback</p><h2 className="mt-3 text-4xl font-black text-slate-900 dark:text-white">Trusted by thoughtful teams</h2></div>
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{testimonials.map((testimonial) => <article key={testimonial.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900"><div className="mb-4 text-amber-500" aria-label={`${testimonial.rating} out of 5 stars`}>{"★".repeat(testimonial.rating)}{"☆".repeat(5 - testimonial.rating)}</div><blockquote className="text-slate-700 dark:text-slate-300">“{testimonial.comment}”</blockquote><footer className="mt-6 border-t border-slate-100 pt-4 dark:border-white/10"><p className="font-bold text-slate-900 dark:text-white">{testimonial.name}</p><p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}{testimonial.role && testimonial.company ? " at " : ""}{testimonial.company}</p></footer></article>)}</div>
  </section>;
}