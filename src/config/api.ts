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
} as const;
