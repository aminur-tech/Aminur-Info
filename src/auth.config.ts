import type { NextAuthConfig } from "next-auth";

export default {
  providers: [],
  pages: { signIn: "/admin/login" },
  callbacks: {
    authorized({ auth: session, request }) {
      if (!request.nextUrl.pathname.startsWith("/admin")) return true;
      if (request.nextUrl.pathname === "/admin/login") return true;
      return session?.user?.role === "ADMIN";
    },
  },
} satisfies NextAuthConfig;
