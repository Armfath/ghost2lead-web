export const STORAGE_KEYS = {
	LEAD_ID_KEY: "lead_id",
	ACCESS_TOKEN_KEY: "access_token",
	SIDEBAR_COOKIE_NAME: "sidebar_state",
} as const;

export const APP_MODE = {
	DEV: "development",
	PROD: "production",
} as const;

export const PAGE_SIZE_OPTIONS = ["10", "20", "50", "100"];

export const MS_PER_DAY = 86_400_000;

export const ADMIN_DEFAULT_RANGE_DAYS = 30;
