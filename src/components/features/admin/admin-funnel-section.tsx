"use client";

import { useFunnelStats } from "@/hooks/queries";
import { AdminStatsError } from "./admin-stats-error";
import { AdminStatsCardSkeleton } from "./admin-stats-skeletons";

// ─── Design tokens ────────────────────────────────────────────────────────────
const STAGE_COLORS = {
	orange: { solid: "var(--g-accent)", tint: "#f5956a" },
	blue: { solid: "#3B6FE8", tint: "#7fabf5" },
	purple: { solid: "#7C3BE8", tint: "#b48af5" },
	green: { solid: "#1EB87A", tint: "#5de0a8" },
} as const;

const BADGE_BG = "var(--g-accent-light)";
const BADGE_TEXT = "var(--g-accent)";
const BAR_TRACK_BG = "#F4F4F5";

const SPINE_LINE_OPACITY = 0.2;
const STAGE_NUM_OPACITY = 0.7;
const MIN_BAR_WIDTH_PCT = 0.5;

// ─── Stage config ─────────────────────────────────────────────────────────────
const STAGES = [
	{
		label: "Visitors",
		key: "total_leads" as const,
		colors: STAGE_COLORS.orange,
		dropOffKey: "visit_to_pricing" as const,
		dropOffLabel: "never saw pricing",
	},
	{
		label: "Pricing Views",
		key: "pricing_views" as const,
		colors: STAGE_COLORS.blue,
		dropOffKey: "visit_to_signup" as const,
		dropOffLabel: "didn't sign up after pricing",
	},
	{
		label: "Signed Up",
		key: "signed_up" as const,
		colors: STAGE_COLORS.purple,
		dropOffKey: "signup_to_first_action" as const,
		dropOffLabel: "no action after signup",
	},
	{
		label: "First Actions",
		key: "first_actions" as const,
		colors: STAGE_COLORS.green,
		dropOffKey: null,
		dropOffLabel: null,
	},
] satisfies {
	label: string;
	key: keyof FunnelStats;
	colors: { solid: string; tint: string };
	dropOffKey: keyof FunnelStats["drop_offs"] | null;
	dropOffLabel: string | null;
}[];

// ─── Sub-components ───────────────────────────────────────────────────────────
function DropArrowIcon() {
	return (
		<svg
			width="10"
			height="10"
			viewBox="0 0 10 10"
			fill="none"
			aria-label="drop-off"
		>
			<path
				d="M5 1v7M2 5.5l3 3 3-3"
				stroke="#EF4444"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

interface DropOffRowProps {
	dropPct: number;
	dropOffLabel: string;
}

function DropOffRow({ dropPct, dropOffLabel }: DropOffRowProps) {
	return (
		<div className="mb-4 flex items-center gap-2">
			<div className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-red-100">
				<DropArrowIcon />
			</div>
			<span className="rounded-md bg-red-100 px-2 py-0.5 font-mono text-[12px] font-bold text-red-500">
				{dropPct.toFixed(1)}%
			</span>
			<span className="text-[12px] font-medium text-muted-foreground">
				{dropOffLabel}
			</span>
		</div>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AdminFunnelSection() {
	const { data, isLoading, error, refetch } = useFunnelStats();

	if (isLoading) return <AdminStatsCardSkeleton />;
	if (error) {
		return (
			<div className="rounded-lg border border-border bg-card p-5">
				<p className="mb-4 text-sm font-semibold text-foreground">
					Conversion Funnel
				</p>
				<AdminStatsError
					message={error instanceof Error ? error.message : undefined}
					onRetry={refetch}
				/>
			</div>
		);
	}
	if (!data) return null;

	const total = data.total_leads || 1;
	const isLastIndex = STAGES.length - 1;

	return (
		<div className="rounded-lg border border-border bg-card p-5">
			<div className="mb-7 flex flex-wrap items-center justify-between gap-2">
				<h2 className="text-[15px] font-bold tracking-[-0.3px] text-foreground">
					Conversion Funnel
				</h2>
				<span
					className="rounded-full px-3 py-1 text-[12px] font-semibold"
					style={{ background: BADGE_BG, color: BADGE_TEXT }}
				>
					{data.signup_conversion_rate.toFixed(1)}% signup rate
				</span>
			</div>

			<div>
				{STAGES.map((stage, i) => {
					const value = data[stage.key] as number;
					const pct = (value / total) * 100;
					const isLast = i === isLastIndex;
					const dropPct = stage.dropOffKey
						? data.drop_offs[stage.dropOffKey]
						: null;

					return (
						<div key={stage.key} className="flex items-stretch gap-4">
							<div className="flex w-5 shrink-0 flex-col items-center pt-5">
								<div
									className="relative z-10 size-2.5 shrink-0 rounded-full border-2 bg-card"
									style={{ borderColor: stage.colors.solid }}
								/>
								{!isLast && (
									<div
										className="w-0.5 flex-1"
										style={{
											background: stage.colors.solid,
											opacity: SPINE_LINE_OPACITY,
											minHeight: 20,
										}}
									/>
								)}
							</div>

							<div className="flex-1">
								<div className="flex items-center gap-3 pb-2.5 pt-4">
									<div className="flex-1">
										<p
											className="mb-0.5 text-[10px] font-bold uppercase tracking-[0.08em]"
											style={{
												color: stage.colors.solid,
												opacity: STAGE_NUM_OPACITY,
											}}
										>
											Stage {i + 1}
										</p>
										<p className="text-[15px] font-bold text-foreground">
											{stage.label}
										</p>
									</div>
									<div className="shrink-0 text-right">
										<p
											className="text-[28px] font-extrabold leading-none tracking-[-1px]"
											style={{ color: stage.colors.solid }}
										>
											{value.toLocaleString()}
										</p>
										<p className="mt-0.5 text-[11px] font-medium text-muted-foreground">
											{pct.toFixed(0)}% of visitors
										</p>
									</div>
								</div>

								<div
									className="mb-3.5 h-1.5 overflow-hidden rounded-full"
									style={{ background: BAR_TRACK_BG }}
								>
									<div
										className="h-full rounded-full transition-[width] duration-700"
										style={{
											width: `${Math.max(pct, MIN_BAR_WIDTH_PCT)}%`,
											background: `linear-gradient(90deg, ${stage.colors.tint}, ${stage.colors.solid})`,
										}}
									/>
								</div>

								{dropPct !== null && stage.dropOffLabel !== null && (
									<DropOffRow
										dropPct={dropPct}
										dropOffLabel={stage.dropOffLabel}
									/>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
