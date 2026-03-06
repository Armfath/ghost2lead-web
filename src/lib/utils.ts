import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const DISPLAY_DATE_FALLBACK = "\u2014";

const DATE_ONLY_OPTIONS: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
};

const DATE_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
	...DATE_ONLY_OPTIONS,
	hour: "2-digit",
	minute: "2-digit",
};

export function formatDisplayDate(
	value: string | null | undefined,
	options?: { includeTime?: boolean },
): string {
	if (value == null || value === "") {
		return DISPLAY_DATE_FALLBACK;
	}
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) {
		return DISPLAY_DATE_FALLBACK;
	}
	if (options?.includeTime) {
		return date.toLocaleString(undefined, DATE_TIME_OPTIONS);
	}
	return date.toLocaleDateString(undefined, DATE_ONLY_OPTIONS);
}
