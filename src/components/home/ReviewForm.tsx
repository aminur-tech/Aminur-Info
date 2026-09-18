"use client";

import { FormEvent, useState } from "react";
import { Star, Send } from "lucide-react";

export default function ReviewForm() {
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setStatus("");
    const form = event.currentTarget;
    const response = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });
    const result = await response.json();
    setStatus(result.message || result.error);
    setLoading(false);
    if (response.ok) form.reset();
  }

  return <form onSubmit={submit} className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900/60">
    <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
    <div className="grid gap-4 sm:grid-cols-2">
      <input name="name" required minLength={2} maxLength={80} placeholder="Your name" className="rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-slate-800 dark:text-white" />
      <input name="email" type="email" maxLength={200} placeholder="Email (optional)" className="rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-slate-800 dark:text-white" />
      <input name="role" maxLength={100} placeholder="Your role" className="rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-slate-800 dark:text-white" />
      <input name="company" maxLength={120} placeholder="Company" className="rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-slate-800 dark:text-white" />
    </div>
    <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">Rating<select name="rating" defaultValue="5" className="rounded-lg border border-slate-200 bg-white p-2 dark:border-white/10 dark:bg-slate-800 dark:text-white">{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{"★".repeat(rating)} ({rating})</option>)}</select></label>
    <textarea name="comment" required minLength={10} maxLength={1500} rows={4} placeholder="Share your experience" className="w-full rounded-xl border border-slate-200 bg-white p-3 outline-none focus:border-emerald-500 dark:border-white/10 dark:bg-slate-800 dark:text-white" />
    <button disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-50"><Send size={16} />{loading ? "Submitting..." : "Submit review"}</button>
    {status && <p role="status" className="text-sm text-emerald-700 dark:text-emerald-400"><Star size={15} className="mr-1 inline" />{status}</p>}
  </form>;
}
