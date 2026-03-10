export const PUBLIC_ROUTES = {
	HOMEPAGE: "/",
	AUTH: "/auth",
	VERIFY_OTP: "/verify-otp",
	OATH_FALLBACK: "/oath-fallback",
	PRICING: "/pricing",
} as const;

export const PAGES_URLS = {
	...PUBLIC_ROUTES,
	USER_DASHBOARD: "/user/dashboard",
	ADMIN_LEADS: "/admin/leads",
	ADMIN_DASHBOARD: "/admin/dashboard",
} as const;
