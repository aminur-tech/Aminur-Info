import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../auth";
import { db } from "../../../../lib/db";

const resources = {
  about: "about", certifications: "certification", education: "education", hero: "hero", roles: "role",
  media: "media", profile: "profile", projects: "project", services: "service",
  skills: "skill", "social-links": "socialLink", testimonials: "testimonial",
  "site-settings": "siteSettings", "seo-settings": "sEOSettings", "contact-messages": "contactMessage",
  "blog-categories": "blogCategory", "blog-posts": "blogPost", analytics: "analytics",
} as const;

type ResourceKey = keyof typeof resources;
type ModelName = (typeof resources)[ResourceKey];
type ModelDelegate = {
  findMany: (args?: Record<string, unknown>) => Promise<unknown[]>;
  findFirst: (args?: Record<string, unknown>) => Promise<unknown>;
  create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
  update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

const singletonResources = new Set(["about", "hero", "profile", "site-settings", "seo-settings"]);
const ignoredFields = new Set(["id", "createdAt", "updatedAt", "posts"]);
const dateFields = new Set(["startDate", "endDate", "issueDate", "expiryDate", "publishedAt", "scheduledAt"]);
const arrayFields = new Set(["highlights", "values", "responsibilities", "technologies", "features", "tags", "keywords", "projectIds", "skills", "achievements"]);
const booleanFields = new Set(["featured", "published", "starred", "allowIndexing", "currentPosition", "isPublic"]);
const numberFields = new Set(["level", "years", "sortOrder", "rating", "startingPrice", "readingTime", "value", "size", "width", "height"]);

async function getDelegate(resource: string) {
  const model = resources[resource as ResourceKey] as ModelName | undefined;
  if (!model) return null;
  return (db as unknown as Record<string, ModelDelegate>)[model];
}

async function requireAdmin() {
  const session = await auth();
  return session?.user?.role === "ADMIN";
}

function normalizeData(input: Record<string, unknown>) {
  const data: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (ignoredFields.has(key) || value === undefined) continue;
    if (dateFields.has(key)) data[key] = value ? new Date(String(value)) : null;
    else if (arrayFields.has(key)) data[key] = Array.isArray(value) ? value.map(String).filter(Boolean) : String(value ?? "").split(",").map((item) => item.trim()).filter(Boolean);
    else if (booleanFields.has(key)) data[key] = value === true || value === "true";
    else if (numberFields.has(key) && value !== "" && value !== null) data[key] = Number(value);
    else data[key] = value === "" ? null : value;
  }
  return data;
}

export async function GET(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  const delegate = await getDelegate(resource);
  if (!delegate) return NextResponse.json({ error: "Unknown admin resource." }, { status: 404 });
  const id = new URL(request.url).searchParams.get("id");
  const result = id ? await delegate.findFirst({ where: { id } }) : singletonResources.has(resource) ? await delegate.findFirst() : await delegate.findMany({ orderBy: { updatedAt: "desc" } });
  return NextResponse.json(result);
}

export async function POST(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  const delegate = await getDelegate(resource);
  if (!delegate) return NextResponse.json({ error: "Unknown admin resource." }, { status: 404 });
  if (singletonResources.has(resource) && await delegate.findFirst()) return NextResponse.json({ error: "This resource can only have one record." }, { status: 409 });
  const body = await request.json();
  const parsed = z.record(z.string(), z.unknown()).safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid request body." }, { status: 422 });
  return NextResponse.json(await delegate.create({ data: normalizeData(parsed.data) }), { status: 201 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  const delegate = await getDelegate(resource);
  if (!delegate) return NextResponse.json({ error: "Unknown admin resource." }, { status: 404 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Resource id is required." }, { status: 400 });
  const parsed = z.record(z.string(), z.unknown()).safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "Invalid request body." }, { status: 422 });
  return NextResponse.json(await delegate.update({ where: { id }, data: normalizeData(parsed.data) }));
}

export async function DELETE(request: Request, { params }: { params: Promise<{ resource: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { resource } = await params;
  const delegate = await getDelegate(resource);
  if (!delegate) return NextResponse.json({ error: "Unknown admin resource." }, { status: 404 });
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Resource id is required." }, { status: 400 });
  await delegate.delete({ where: { id } });
  return NextResponse.json({ message: "Resource deleted." });
}