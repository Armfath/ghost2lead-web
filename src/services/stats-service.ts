import { API_ENDPOINTS } from "@/config";
import { get } from "@/lib/fetch";

const {
	LEADS_SUMMARY,
	FUNNEL,
	LOST_OPPORTUNITIES,
	LEADS_OVER_TIME,
	ENRICHMENT,
} = API_ENDPOINTS.STATS;

export async function getLeadsSummary(): Promise<LeadsSummary> {
	return get<LeadsSummary>(LEADS_SUMMARY);
}

export async function getFunnelStats(): Promise<FunnelStats> {
	return get<FunnelStats>(FUNNEL);
}

export async function getLostOpportunities(
	baselineConversionRate: number,
): Promise<LostOpportunities> {
	return get<LostOpportunities>(LOST_OPPORTUNITIES, {
		params: {
			searchParams: {
				baseline_conversion_rate: baselineConversionRate.toFixed(3),
			},
		},
	});
}

interface LeadsOverTimeParams {
	granularity: "day" | "week";
	fromDate: string;
	toDate: string;
}

export async function getLeadsOverTime(
	params: LeadsOverTimeParams,
): Promise<OverTimeStats> {
	return get<OverTimeStats>(LEADS_OVER_TIME, {
		params: {
			searchParams: {
				granularity: params.granularity,
				from_date: params.fromDate,
				to_date: params.toDate,
			},
		},
	});
}

export async function getEnrichmentStats(): Promise<EnrichmentStats> {
	return get<EnrichmentStats>(ENRICHMENT);
}
