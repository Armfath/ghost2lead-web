export {};

declare global {
	interface LeadCreateResponse extends EntityMetadata {}

	interface LeadBehavior {
		homepage_visits: number;
		viewed_pricing: number;
		signed_up_at: string | null;
		exported_file_at: string | null;
		first_visit_at: string | null;
		last_visit_at: string | null;
	}

	type ConfidenceLevel = "High" | "Medium" | "Low";

	interface ProfilingOutput {
		persona: string;
		primary_objection: string;
		strongest_signal: string;
		confidence: ConfidenceLevel;
	}

	interface LeadAction {
		action: string;
		reasoning: string;
	}

	interface LeadResponse extends EntityMetadata {
		behaviors: LeadBehavior | null;
		profile: ProfilingOutput | null;
		actions: LeadAction[] | null;
		enriched_at: string | null;
	}
}
