import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "../../../lib/db";
import { sendContactNotification } from "../../../lib/email/contact-notification";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  company: z.string().trim().max(160).optional(),
  projectType: z.string().trim().max(160).optional(),
  budgetRange: z.string().trim().max(160).optional(),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional().or(z.literal("")).optional(),
});

function normalizePayload(raw: Record<string, unknown>) {
  const normalized = Object.fromEntries(
    Object.entries(raw).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.trim()];
      }
      return [key, value];
    }),
  ) as Record<string, unknown>;

  return {
    ...normalized,
    website: normalized.website ?? "",
  };
}

async function parseContactRequest(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return normalizePayload(await request.json());
  }

  const formData = await request.formData();
  return normalizePayload(Object.fromEntries(formData.entries()));
}

export async function POST(request: Request) {
  try {
    const body = contactSchema.parse(await parseContactRequest(request));
    if (body.website) return NextResponse.json({ message: "Message received." });
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ error: "Contact service is not configured." }, { status: 503 });
    }
    const contact = await db.contactMessage.create({ data: {
      name: body.name, email: body.email, company: body.company || null, projectType: body.projectType || null, budgetRange: body.budgetRange || null, subject: body.subject, message: body.message, source: "portfolio",
    } });
    try {
      await sendContactNotification(contact);
    } catch (emailError) {
      console.error("Contact notification failed", emailError);
    }
    return NextResponse.json({ message: "Message sent! I will get back to you soon." }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Please check the form fields.", fields: error.flatten().fieldErrors }, { status: 400 });
    }
    return NextResponse.json({ error: "Unable to process your message." }, { status: 500 });
  }
}