export const CONFIDENCE_STYLES: Record<
	ConfidenceLevel,
	{ color: string; bg: string; dot: string; label: string }
> = {
	High: {
		color: "#166534",
		bg: "#DCFCE7",
		dot: "#22C55E",
		label: "High confidence",
	},
	Medium: {
		color: "#92400E",
		bg: "#FEF3C7",
		dot: "#F59E0B",
		label: "Medium confidence",
	},
	Low: {
		color: "#374151",
		bg: "#F3F4F6",
		dot: "#9CA3AF",
		label: "Low confidence",
	},
};

export const DEFAULT_BEHAVIORS: LeadBehavior = {
	homepage_visits: 0,
	viewed_pricing: 0,
	signed_up_at: null,
	exported_file_at: null,
	first_visit_at: null,
	last_visit_at: null,
};
