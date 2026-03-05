export const PUBLIC_ROUTES = {
	HOMEPAGE: "/",
	AUTH: "/auth",
	VERIFY_OTP: "/verify-otp",
	OATH_FALLBACK: "/oath-fallback",
} as const;

export const PAGES_URLS = {
	...PUBLIC_ROUTES,
	USER_DASHBOARD: "/dashboard/user",
} as const;
