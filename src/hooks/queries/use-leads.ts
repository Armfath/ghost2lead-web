"use client";

import { useQuery } from "@tanstack/react-query";
import { getLeads } from "@/services/lead-service";
import { leadsKeys } from "./query-keys";

interface UseLeadsParams {
	page?: number;
	pageSize?: number;
}

export function useLeads(params?: UseLeadsParams) {
	const page = params?.page ?? 1;
	const pageSize = params?.pageSize ?? 10;

	return useQuery({
		queryKey: leadsKeys.list(page, pageSize),
		queryFn: () => getLeads({ page, page_size: pageSize }),
	});
}
