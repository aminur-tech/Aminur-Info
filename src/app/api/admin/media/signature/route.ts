import { createHash } from "crypto";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";

export async function POST() {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) return NextResponse.json({ error: "Image storage is not configured." }, { status: 503 });

  const timestamp = Math.floor(Date.now() / 1000);
  const folder = "aminur-portfolio";
  const signature = createHash("sha1")
    .update(`folder=${folder}&timestamp=${timestamp}${apiSecret}`)
    .digest("hex");

  return NextResponse.json({
    cloudName,
    apiKey,
    timestamp,
    folder,
    signature,
    resourceType: "auto",
    uploadUrl: `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
  });
}
