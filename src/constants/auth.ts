export const TOKEN_TYPE = {
	ACCESS_TOKEN: "access_token",
} as const;

export const USER_TYPES = {
	ADMIN: "admin",
	CUSTOMER: "customer",
} as const;

export const AUTH_FIELDS = {
	EMAIL: "email",
	OTP: "otp",
	LEAD_ID: "lead_id",
	USER_TYPE: "user_type",
	IS_NEW_USER: "is_new_user",
} as const;
