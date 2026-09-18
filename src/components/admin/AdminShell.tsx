"use client";

import { Menu, X, LayoutDashboard, UserRound, Sparkles, BriefcaseBusiness, GraduationCap, MessageSquare, Settings, Search, LogOut, Quote, BookOpen, Wrench, Info, Award, Blocks, Link2, ShieldCheck } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "../buttons/ToggleBtn";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: UserRound },
  { href: "/admin/hero", label: "Hero", icon: Sparkles },
  { href: "/admin/about", label: "About", icon: Info },
  { href: "/admin/roles", label: "Roles", icon: Blocks },
  { href: "/admin/projects", label: "Projects", icon: BriefcaseBusiness },
  { href: "/admin/experience", label: "Experience", icon: GraduationCap },
  { href: "/admin/education", label: "Education", icon: BookOpen },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/skills", label: "Skills", icon: Wrench },
  { href: "/admin/contact-messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/services", label: "Services", icon: BriefcaseBusiness },
  { href: "/admin/social-links", label: "Social links", icon: Link2 },
  { href: "/admin/site-settings", label: "Site settings", icon: Settings },
  { href: "/admin/seo-settings", label: "SEO settings", icon: ShieldCheck },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isLogin = pathname === "/admin/login";

  if (isLogin) return <>{children}</>;

  return <div className="min-h-screen bg-slate-100 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
    {open && <button aria-label="Close navigation" className="fixed inset-0 z-30 bg-slate-950/60 lg:hidden" onClick={() => setOpen(false)} />}
    <aside className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform dark:border-slate-800 dark:bg-slate-900 lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800"><div><p className="text-[10px] font-bold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400">Aminur CMS</p><p className="mt-1 text-sm font-bold">Control center</p></div><button className="lg:hidden" aria-label="Close navigation" onClick={() => setOpen(false)}><X size={20} /></button></div>
      <nav className="flex-1 space-y-1 p-3">{navigation.map(({ href, label, icon: Icon }) => { const active = href === "/admin" ? pathname === href : pathname.startsWith(href); return <a key={href} href={href} onClick={() => setOpen(false)} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${active ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}><Icon size={18} />{label}</a>; })}</nav>
      <div className="border-t border-slate-200 p-3 dark:border-slate-800"><button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"><LogOut size={18} />Log out</button></div>
    </aside>
    <div className="lg:pl-64"><header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 sm:px-6"><div className="flex items-center gap-3"><button className="lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}><Menu size={22} /></button><div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-400 sm:flex dark:border-slate-700"><Search size={16} /><span>Search content</span><kbd className="ml-8 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] dark:bg-slate-800">⌘K</kbd></div><h1 className="text-sm font-bold sm:hidden">Admin</h1></div><div className="flex items-center gap-2"><ThemeToggle /><div className="hidden text-right sm:block"><p className="text-sm font-semibold">Portfolio owner</p><p className="text-xs text-slate-500 dark:text-slate-400">Administrator</p></div><div className="grid size-9 place-items-center rounded-full bg-emerald-100 font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">A</div></div></header><main>{children}</main></div>
  </div>;
}
