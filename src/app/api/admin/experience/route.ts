import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../auth";
import { db } from "../../../../lib/db";

const optionalText = z.string().trim().max(500).nullable().optional();
const experienceSchema = z.object({
  company: z.string().trim().min(2).max(120),
  position: z.string().trim().min(2).max(120),
  employmentType: optionalText,
  location: optionalText,
  workMode: optionalText,
  startDate: z.string().datetime().nullable().optional(),
  endDate: z.string().datetime().nullable().optional(),
  currentPosition: z.boolean().default(false),
  description: z.string().trim().max(3000).nullable().optional(),
  responsibilities: z.array(z.string().trim().min(1).max(240)).max(30).default([]),
  technologies: z.array(z.string().trim().min(1).max(80)).max(30).default([]),
  companyLogoUrl: z.string().url().nullable().optional(),
  companyUrl: z.string().url().nullable().optional(),
  published: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
});

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

function toData(input: z.infer<typeof experienceSchema>) {
  return {
    ...input,
    startDate: input.startDate ? new Date(input.startDate) : null,
    endDate: input.endDate ? new Date(input.endDate) : null,
    employmentType: input.employmentType || null,
    location: input.location || null,
    workMode: input.workMode || null,
    description: input.description || null,
    companyLogoUrl: input.companyLogoUrl || null,
    companyUrl: input.companyUrl || null,
  };
}

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const experiences = await db.experience.findMany({ orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }] });
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = experienceSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the experience fields.", issues: parsed.error.flatten() }, { status: 422 });
  const experience = await db.experience.create({ data: toData(parsed.data) });
  return NextResponse.json(experience, { status: 201 });
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Experience id is required." }, { status: 400 });
  const parsed = experienceSchema.partial().safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Please check the experience fields.", issues: parsed.error.flatten() }, { status: 422 });
  const data = toData({
    company: parsed.data.company ?? "",
    position: parsed.data.position ?? "",
    ...parsed.data,
  } as z.infer<typeof experienceSchema>);
  const experience = await db.experience.update({ where: { id }, data });
  return NextResponse.json(experience);
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Experience id is required." }, { status: 400 });
  await db.experience.delete({ where: { id } });
  return NextResponse.json({ message: "Experience deleted." });
}
