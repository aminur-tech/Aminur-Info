"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/session").then(async (response) => {
      const session = await response.json();
      if (session?.user?.role === "ADMIN") router.replace("/admin");
    });
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const values = Object.fromEntries(new FormData(event.currentTarget));
    try {
      const result = await signIn("credentials", {
        email: String(values.email),
        password: String(values.password),
        redirect: false,
      });
      if (!result?.ok) throw new Error("Invalid credentials");
      router.push("/admin");
    } catch { setError("Invalid credentials or unavailable authentication service."); }
    finally { setLoading(false); }
  }

  return <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-900 p-8 shadow-2xl">
      <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-emerald-500">Portfolio CMS</p><h1 className="mt-3 text-3xl font-black text-white">Admin login</h1></div>
      <label className="block text-sm text-slate-300">Email<input name="email" type="email" required className="mt-2 w-full rounded-xl bg-slate-800 p-3 text-white outline-none ring-emerald-500 focus:ring-2" /></label>
      <label className="block text-sm text-slate-300">Password<input name="password" type="password" required className="mt-2 w-full rounded-xl bg-slate-800 p-3 text-white outline-none ring-emerald-500 focus:ring-2" /></label>
      {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-emerald-600 p-3 font-bold text-white hover:bg-emerald-700 disabled:opacity-50">{loading ? "Signing in..." : "Sign in"}</button>
    </form>
  </main>;
}