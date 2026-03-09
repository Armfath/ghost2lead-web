export const API_ENDPOINTS = {
	AUTH: {
		GET_USER_PROFILE: "/api/v1/auth/me",
		REQUEST_OTP: "/api/v1/auth/request-otp",
		VERIFY_OTP: "/api/v1/auth/verify-otp",
	},
	LEADS: {
		CREATE: "/api/v1/leads",
		ENRICH: "/api/v1/leads",
		GET_LEADS: "/api/v1/leads",
	},
	STATS: {
		LEADS_SUMMARY: "/api/v1/stats/leads/summary",
		FUNNEL: "/api/v1/stats/funnel",
		LOST_OPPORTUNITIES: "/api/v1/stats/lost-opportunities",
		LEADS_OVER_TIME: "/api/v1/stats/leads/over-time",
		ENRICHMENT: "/api/v1/stats/enrichment",
	},
} as const;
