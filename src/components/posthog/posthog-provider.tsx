"use client";

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { envConfig } from "@/config";

export function PHProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		try {
			posthog.init(envConfig.POSTHOG_KEY, {
				api_host: envConfig.POSTHOG_HOST,
				defaults: "2026-01-30",
				person_profiles: "identified_only",
				capture_pageview: false,
			});
		} catch {
			// empty
		}
	}, []);
	return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
