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
    // এই দুটি কলব্যাক auth.ts থেকে এখানে নিয়ে আসা হয়েছে
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
        session.user.role = String(token.role ?? "USER");
      }
      return session;
    },
  },
} satisfies NextAuthConfig;