import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PAGES_URLS, PUBLIC_ROUTES } from "@/config";
import { API_ENDPOINTS } from "@/config/api";
import { TOKEN_TYPE } from "@/constants/auth";
import { get } from "@/lib/fetch";

const { ACCESS_TOKEN } = TOKEN_TYPE;
const { GET_USER_PROFILE } = API_ENDPOINTS.AUTH;
const { AUTH } = PAGES_URLS;

async function validateToken(
	accessToken: string,
	cookies: NextRequest["cookies"],
): Promise<boolean> {
	try {
		await get(GET_USER_PROFILE, { accessToken, cookies });
		return true;
	} catch {
		return false;
	}
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const accessToken = request.cookies.get(ACCESS_TOKEN)?.value;

	const isPublicRoute = Object.values(PUBLIC_ROUTES).some((route) => {
		return pathname === route || pathname.startsWith(`${route}/`);
	});

	if (!isPublicRoute) {
		if (!accessToken) {
			const loginUrl = new URL(AUTH, request.url);
			loginUrl.searchParams.set("redirect", pathname);
			return NextResponse.redirect(loginUrl);
		}

		const isValidToken = await validateToken(accessToken, request.cookies);
		if (!isValidToken) {
			const loginUrl = new URL(AUTH, request.url);
			loginUrl.searchParams.set("redirect", pathname);
			const response = NextResponse.redirect(loginUrl);
			response.cookies.delete(ACCESS_TOKEN);
			return response;
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
	],
};
