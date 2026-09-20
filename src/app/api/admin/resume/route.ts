import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../auth";
import { db } from "../../../../lib/db";

const resumeSchema = z.object({
  title: z.string().trim().min(2).max(160),
  fileUrl: z.string().trim().url().nullable().optional(),
  summary: z.string().trim().max(2000).nullable().optional(),
  isActive: z.boolean().default(false),
  version: z.string().trim().max(80).nullable().optional(),
  published: z.boolean().default(true),
  sortOrder: z.number().int().min(0).default(0),
});

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const resumes = await db.resume.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }] });
  return NextResponse.json(resumes);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = resumeSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the resume fields.", issues: parsed.error.flatten() }, { status: 422 });

  const payload = parsed.data;
  if (payload.isActive) {
    await db.resume.updateMany({ where: { isActive: true }, data: { isActive: false } });
  }

  const resume = await db.resume.create({
    data: {
      title: payload.title,
      fileUrl: payload.fileUrl ?? "",
      summary: payload.summary || null,
      isActive: payload.isActive,
      version: payload.version || null,
      published: payload.published,
      sortOrder: payload.sortOrder,
    },
  });

  return NextResponse.json(resume, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Resume id is required." }, { status: 400 });

  const parsed = resumeSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the resume fields.", issues: parsed.error.flatten() }, { status: 422 });

  const payload = parsed.data;
  if (payload.isActive) {
    await db.resume.updateMany({ where: { isActive: true, id: { not: id } }, data: { isActive: false } });
  }

  const resume = await db.resume.update({
    where: { id },
    data: {
      ...(payload.title ? { title: payload.title } : {}),
      ...(payload.fileUrl !== undefined ? { fileUrl: payload.fileUrl ?? "" } : {}),
      ...(payload.summary !== undefined ? { summary: payload.summary || null } : {}),
      ...(payload.version !== undefined ? { version: payload.version || null } : {}),
      ...(payload.isActive !== undefined ? { isActive: payload.isActive } : {}),
      ...(payload.published !== undefined ? { published: payload.published } : {}),
      ...(payload.sortOrder !== undefined ? { sortOrder: payload.sortOrder } : {}),
    },
  });

  return NextResponse.json(resume);
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Resume id is required." }, { status: 400 });
  await db.resume.delete({ where: { id } });
  return NextResponse.json({ message: "Resume deleted." });
}
