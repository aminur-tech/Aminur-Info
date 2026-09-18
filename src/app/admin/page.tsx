import { redirect } from "next/navigation";
import { db } from "../../lib/db";
import { auth } from "../../auth";


export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const [projects, skills, messages, pendingTestimonials] = await Promise.all([
    db.project.count(),
    db.skill.count(),
    db.contactMessage.count({ where: { status: "new" } }),
    db.testimonial.count({ where: { status: "pending" } }),
  ]);

  const cards = [
    ["Projects", projects],
    ["Skills", skills],
    ["New messages", messages],
    ["Pending reviews", pendingTestimonials],
  ] as const;

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">Overview</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Good to see you, {session.user?.name ?? "Admin"}.</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">Keep your public portfolio current from one place.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-3 text-3xl font-black">{value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
          <h2 className="text-lg font-bold">Quick actions</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {[["/admin/projects", "Manage projects"], ["/admin/skills", "Manage skills"], ["/admin/hero", "Edit hero"]].map(([href, label]) => (
              <a key={href} href={href} className="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-700">{label}</a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}