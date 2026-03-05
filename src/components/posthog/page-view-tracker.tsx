"use client";

import type { ReactElement } from "react";
import { useEffect } from "react";

import { trackEventWithLead } from "@/services/analytics-service";

interface PageViewTrackerProps {
	eventName: TAnalyticsEvent;
}

export function PageViewTracker({
	eventName,
}: PageViewTrackerProps): ReactElement | null {
	useEffect(() => {
		void trackEventWithLead(eventName);
	}, [eventName]);

	return null;
}
