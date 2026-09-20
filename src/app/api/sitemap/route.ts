import { NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { env } from "../../../lib/env";
import { generateSitemap } from "../../../utils/sitemap";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = env.DATABASE_URL ? await db.project.findMany({ where: { published: true }, select: { slug: true } }) : [];
  const pages = ["/", ...projects.map((project) => `/projects/${project.slug}`)];
  const sitemap = generateSitemap(pages);
  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
