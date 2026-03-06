export const LEADS_QUERY_KEY = ["leads"] as const;

export const leadsKeys = {
	all: LEADS_QUERY_KEY,
	list: (page?: number, pageSize?: number) =>
		[...LEADS_QUERY_KEY, "list", page, pageSize] as const,
} as const;
