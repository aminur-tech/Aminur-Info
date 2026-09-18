import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

function validateDatabaseUrl() {
  const value = process.env.DATABASE_URL;
  if (!value) throw new Error("DATABASE_URL is missing. Add a MongoDB connection string to .env.");

  const databaseName = new URL(value).pathname.replace(/^\//, "");
  if (!databaseName) {
    throw new Error("DATABASE_URL must include a database name after .net/, for example /aminur_info?appName=Cluster0.");
  }
}

async function main() {
  validateDatabaseUrl();
  const email = (process.env.ADMIN_EMAIL ?? "admin@example.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "ChangeMe123!";
  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: { passwordHash, role: "ADMIN", isActive: true, name: "Portfolio Admin" },
    create: { email, passwordHash, role: "ADMIN", name: "Portfolio Admin" },
  });

  await db.profile.upsert({
    where: { id: "000000000000000000000001" },
    update: {},
    create: {
      id: "000000000000000000000001",
      name: "Aminur Rahman",
      title: "MERN Stack & Full Stack Developer",
      shortBio: "I build fast, accessible, and thoughtful digital products.",
      email: "aminur.programme@gmail.com",
      location: "Satkhira, Bangladesh",
      availabilityStatus: "available",
    },
  });

  await db.siteSettings.upsert({
    where: { id: "000000000000000000000002" },
    update: {},
    create: { id: "000000000000000000000002", siteName: "Aminur Rahman" },
  });

  console.log(`Seeded admin account: ${email}`);
  console.log("Set ADMIN_PASSWORD to a new value before production use.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}).finally(() => db.$disconnect());
