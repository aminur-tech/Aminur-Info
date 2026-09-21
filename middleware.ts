import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authConfig from "./src/auth.config";

const { auth } = NextAuth(authConfig);
const authMiddleware = auth as unknown as (request: NextRequest) => Response | Promise<Response>;

export async function middleware(request: NextRequest) {
	try {
		return await authMiddleware(request);
	} catch {
		if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();
		return NextResponse.redirect(new URL("/admin/login", request.url));
	}
}

export const config = { matcher: ["/admin/:path*"] };