import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../lib/db";

const reviewSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().trim().min(10).max(1500),
  website: z.string().max(0).optional(),
});

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 3;

function getClientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = attempts.get(key);
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function POST(request: Request) {
  try {
    const body = reviewSchema.parse(await request.json());
    if (body.website) return NextResponse.json({ message: "Review received." }, { status: 201 });
    if (isRateLimited(getClientKey(request))) return NextResponse.json({ error: "Too many submissions. Please try again later." }, { status: 429 });

    await db.testimonial.create({
      data: {
        name: body.name,
        email: body.email || null,
        role: body.role || null,
        company: body.company || null,
        rating: body.rating,
        comment: body.comment,
        status: "pending",
        featured: false,
      },
    });

    return NextResponse.json({ message: "Thank you. Your review is awaiting approval." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) return NextResponse.json({ error: "Please check the review fields." }, { status: 400 });
    return NextResponse.json({ error: "Unable to submit your review." }, { status: 500 });
  }
}
