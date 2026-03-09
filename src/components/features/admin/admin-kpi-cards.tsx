"use client";

import { useLeadsSummary } from "@/hooks/queries";
import { AdminStatsError } from "./admin-stats-error";
import { AdminKpiCardsSkeleton } from "./admin-stats-skeletons";

const ICON_BG_ALPHA = 0.09;

const KPI_ACCENT_COLORS = {
	orange: { solid: "var(--g-accent)", bg: `rgba(232,98,42,${ICON_BG_ALPHA})` },
	blue: { solid: "#3B82F6", bg: `rgba(59,130,246,${ICON_BG_ALPHA})` },
	purple: { solid: "#8B5CF6", bg: `rgba(139,92,246,${ICON_BG_ALPHA})` },
	emerald: { solid: "#10B981", bg: `rgba(16,185,129,${ICON_BG_ALPHA})` },
} as const;

interface KpiCardProps {
	label: string;
	value: number;
	sub: string;
	icon: string;
	accent: keyof typeof KPI_ACCENT_COLORS;
}

function KpiCard({ label, value, sub, icon, accent }: KpiCardProps) {
	const colors = KPI_ACCENT_COLORS[accent];
	return (
		<div className="relative overflow-hidden rounded-lg border border-border bg-card p-5">
			<div
				className="absolute inset-x-0 top-0 h-[3px] rounded-t-lg"
				style={{
					background: `linear-gradient(90deg, ${colors.solid}, transparent)`,
				}}
			/>
			<div className="flex items-start justify-between">
				<div>
					<p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-muted-foreground">
						{label}
					</p>
					<p className="text-[30px] font-extrabold leading-none tracking-tight text-foreground">
						{value.toLocaleString()}
					</p>
					<p className="mt-1 text-[12px] text-muted-foreground">{sub}</p>
				</div>
				<div
					className="flex size-[38px] shrink-0 items-center justify-center rounded-[10px] text-base"
					style={{ background: colors.bg, color: colors.solid }}
				>
					{icon}
				</div>
			</div>
		</div>
	);
}

export function AdminKpiCards() {
	const { data, isLoading, error, refetch } = useLeadsSummary();

	if (isLoading) return <AdminKpiCardsSkeleton />;

	if (error) {
		return (
			<div className="rounded-lg border border-border bg-card">
				<AdminStatsError
					message={error instanceof Error ? error.message : undefined}
					onRetry={refetch}
				/>
			</div>
		);
	}

	if (!data) return null;

	const signupPct =
		data.total_leads > 0
			? ((data.signed_up_leads / data.total_leads) * 100).toFixed(1)
			: "0.0";

	const cards: KpiCardProps[] = [
		{
			label: "Total Leads",
			value: data.total_leads,
			sub: `${data.anonymous_leads.toLocaleString()} anonymous`,
			icon: "◈",
			accent: "orange",
		},
		{
			label: "Signed Up",
			value: data.signed_up_leads,
			sub: `${signupPct}% of total`,
			icon: "✓",
			accent: "blue",
		},
		{
			label: "AI Analyzed",
			value: data.enriched_leads,
			sub: `${data.pending_enrichment} pending`,
			icon: "⟡",
			accent: "purple",
		},
		{
			label: "Viewed Pricing",
			value: data.leads_with_pricing_view,
			sub: "high-intent signals",
			icon: "⊞",
			accent: "emerald",
		},
	];

	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
			{cards.map((card) => (
				<KpiCard key={card.label} {...card} />
			))}
		</div>
	);
}
