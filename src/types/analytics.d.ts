import type { ANALYTICS_EVENTS } from "@/config/constants";

declare global {
	type TAnalyticsEvent = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];
}
