import { redirect } from "next/navigation";
import { auth } from "../../auth";
import { db } from "../db";

export async function requireAdmin() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") redirect("/admin/login");

  const user = await db.user.findUnique({ where: { id: session.user.id } });
  if (!user || !user.isActive || user.role !== "ADMIN") redirect("/admin/login");

  return { db, user };
}
