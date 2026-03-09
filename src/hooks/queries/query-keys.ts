export const LEADS_QUERY_KEY = ["leads"] as const;

export const leadsKeys = {
	all: LEADS_QUERY_KEY,
	list: (page?: number, pageSize?: number) =>
		[...LEADS_QUERY_KEY, "list", page, pageSize] as const,
} as const;

export const STATS_QUERY_KEY = ["stats"] as const;

export const statsKeys = {
	all: STATS_QUERY_KEY,
	leadsSummary: [...STATS_QUERY_KEY, "leads-summary"] as const,
	funnel: [...STATS_QUERY_KEY, "funnel"] as const,
	lostOpportunities: (baselineConversionRate: number) =>
		[...STATS_QUERY_KEY, "lost-opportunities", baselineConversionRate] as const,
	leadsOverTime: (granularity: string, fromDate: string, toDate: string) =>
		[
			...STATS_QUERY_KEY,
			"leads-over-time",
			granularity,
			fromDate,
			toDate,
		] as const,
	enrichment: [...STATS_QUERY_KEY, "enrichment"] as const,
} as const;
