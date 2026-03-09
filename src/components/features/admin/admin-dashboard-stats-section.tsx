import { AdminFunnelSection } from "./admin-funnel-section";
import { AdminKpiCards } from "./admin-kpi-cards";
import { AdminLeadsOverTimeSection } from "./admin-leads-over-time-section";
import { AdminLostOpportunitiesSection } from "./admin-lost-opportunities-section";

export function AdminDashboardStatsSection() {
	return (
		<div className="space-y-4">
			<AdminKpiCards />

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
				<AdminFunnelSection />
				<AdminLostOpportunitiesSection />
			</div>

			<AdminLeadsOverTimeSection />
		</div>
	);
}
