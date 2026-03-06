"use client";

import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { trackEventWithLead } from "@/services/analytics-service";

interface ClickTrackerProps extends React.ComponentProps<typeof Button> {
	eventName: TAnalyticsEvent;
}

export function ClickTracker({
	eventName,
	onClick,
	...buttonProps
}: ClickTrackerProps) {
	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		void trackEventWithLead(eventName);
		onClick?.(event);
	};

	return <Button {...buttonProps} onClick={handleClick} />;
}
