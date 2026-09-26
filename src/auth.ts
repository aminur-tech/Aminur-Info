import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { db } from "./lib/db";
import authConfig from "./auth.config";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  trustHost: true,
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(rawCredentials) {
        try {
          const parsed = credentialsSchema.safeParse(rawCredentials);
          if (!parsed.success) return null;

          const user = await db.user.findUnique({
            where: { email: parsed.data.email.trim().toLowerCase() },
          });

          if (!user || !user.passwordHash || !user.isActive || user.role !== "ADMIN") {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(
            parsed.data.password,
            user.passwordHash,
          );

          if (!isPasswordValid) return null;

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth Authorize Error:", error);
          return null;
        }
      },
    }),
  ],
});