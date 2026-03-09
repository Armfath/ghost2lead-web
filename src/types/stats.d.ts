export {};

declare global {
	interface StatsDropOffs {
		visit_to_signup: number;
		signup_to_first_action: number;
		visit_to_pricing: number;
	}

	interface FunnelStats {
		total_leads: number;
		signed_up: number;
		first_actions: number;
		pricing_views: number;
		signup_conversion_rate: number;
		drop_offs: StatsDropOffs;
	}

	interface LostOpportunities {
		total_leads: number;
		actual_signups: number;
		expected_signups_at_baseline: number;
		lost_signups: number;
		baseline_used: number;
	}

	interface LeadsSummary {
		total_leads: number;
		anonymous_leads: number;
		signed_up_leads: number;
		enriched_leads: number;
		leads_with_pricing_view: number;
		pending_enrichment: number;
	}

	interface TimeSeriesPoint {
		date: string;
		new_leads: number;
		signups: number;
		pricing_views: number;
		first_actions: number;
	}

	interface OverTimeStats {
		granularity: string;
		from_date: string;
		to_date: string;
		series: TimeSeriesPoint[];
	}

	interface ConfidenceBreakdown {
		High: number;
		Medium: number;
		Low: number;
	}

	interface EnrichmentStats {
		total_enriched: number;
		not_enriched: number;
		confidence_breakdown: ConfidenceBreakdown;
	}
}
