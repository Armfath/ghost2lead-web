"use client";

import { useQuery } from "@tanstack/react-query";
import {
	getEnrichmentStats,
	getFunnelStats,
	getLeadsOverTime,
	getLeadsSummary,
	getLostOpportunities,
} from "@/services/stats-service";
import { statsKeys } from "./query-keys";

export function useLeadsSummary() {
	return useQuery({
		queryKey: statsKeys.leadsSummary,
		queryFn: getLeadsSummary,
	});
}

export function useFunnelStats() {
	return useQuery({
		queryKey: statsKeys.funnel,
		queryFn: getFunnelStats,
	});
}

export function useLostOpportunities(baselineConversionRate: number) {
	return useQuery({
		queryKey: statsKeys.lostOpportunities(baselineConversionRate),
		queryFn: () => getLostOpportunities(baselineConversionRate),
	});
}

interface UseLeadsOverTimeParams {
	granularity: "day" | "week";
	fromDate: string;
	toDate: string;
}

export function useLeadsOverTime(params: UseLeadsOverTimeParams) {
	return useQuery({
		queryKey: statsKeys.leadsOverTime(
			params.granularity,
			params.fromDate,
			params.toDate,
		),
		queryFn: () => getLeadsOverTime(params),
	});
}

export function useEnrichmentStats() {
	return useQuery({
		queryKey: statsKeys.enrichment,
		queryFn: getEnrichmentStats,
	});
}
