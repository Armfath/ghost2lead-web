"use client";

import { useState } from "react";
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ADMIN_DEFAULT_RANGE_DAYS, MS_PER_DAY } from "@/constants";
import { useLeadsOverTime } from "@/hooks/queries";
import { formatDisplayDate, toIsoDateString } from "@/lib/utils";
import { AdminStatsError } from "./admin-stats-error";
import { AdminChartSkeleton } from "./admin-stats-skeletons";

// ─── Design tokens ─────────────────────────────────────────────────────────────
const CHART_HEIGHT = 220;
const EMPTY_STATE_HEIGHT = 176;

const LEGEND_ACTIVE_WEIGHT = 600;
const LEGEND_INACTIVE_WEIGHT = 400;
const LEGEND_INACTIVE_OPACITY = 0.2;
const LINE_DIMMED_OPACITY = 0.08;
const LINE_HIGHLIGHTED_STROKE = 2.5;
const LINE_DEFAULT_STROKE = 1.5;

const AXIS_TICK_FONT_SIZE = 10;
const CHART_MARGIN = { top: 4, right: 8, bottom: 0, left: -16 } as const;
const TOOLTIP_STYLE = {
	fontSize: 12,
	borderRadius: 8,
	border: "1px solid var(--border)",
} as const;
const TOOLTIP_LABEL_STYLE = { fontWeight: 600, marginBottom: 4 } as const;

const GRANULARITY_OPTIONS = ["day", "week"] as const;
type Granularity = (typeof GRANULARITY_OPTIONS)[number];

// ─── Series config ─────────────────────────────────────────────────────────────
const SERIES_CONFIG = [
	{ key: "new_leads" as const, label: "New Leads", color: "var(--g-accent)" },
	{ key: "signups" as const, label: "Signups", color: "#3B82F6" },
	{ key: "pricing_views" as const, label: "Pricing", color: "#8B5CF6" },
	{ key: "first_actions" as const, label: "Actions", color: "#10B981" },
] satisfies { key: keyof TimeSeriesPoint; label: string; color: string }[];

// ─── Main component ───────────────────────────────────────────────────────────
export function AdminLeadsOverTimeSection() {
	const [granularity, setGranularity] = useState<Granularity>("day");
	const [fromDate, setFromDate] = useState(() =>
		toIsoDateString(
			new Date(Date.now() - ADMIN_DEFAULT_RANGE_DAYS * MS_PER_DAY),
		),
	);
	const [toDate, setToDate] = useState(() => toIsoDateString(new Date()));
	const [highlighted, setHighlighted] = useState<string | null>(null);

	const { data, isLoading, error, refetch } = useLeadsOverTime({
		granularity,
		fromDate,
		toDate,
	});
	const series = data?.series ?? [];

	function toggleHighlight(key: string) {
		setHighlighted((prev) => (prev === key ? null : key));
	}

	return (
		<div className="rounded-lg border border-border bg-card p-5">
			<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
				<h2 className="text-sm font-semibold text-foreground">
					Leads Over Time
				</h2>
				<div className="flex flex-wrap items-center gap-2">
					<div className="flex overflow-hidden rounded-md border border-border">
						{GRANULARITY_OPTIONS.map((g) => (
							<Button
								key={g}
								variant={granularity === g ? "default" : "ghost"}
								size="sm"
								rounded="none"
								className="h-7 rounded-none px-3 text-[12px]"
								onClick={() => setGranularity(g)}
							>
								{g[0].toUpperCase() + g.slice(1)}
							</Button>
						))}
					</div>
					<input
						type="date"
						value={fromDate}
						max={toDate}
						onChange={(e) => setFromDate(e.target.value)}
						className="rounded-md border border-border px-2 py-1 text-[12px] text-foreground outline-none focus:border-ring"
					/>
					<span className="text-[12px] text-muted-foreground">→</span>
					<input
						type="date"
						value={toDate}
						min={fromDate}
						onChange={(e) => setToDate(e.target.value)}
						className="rounded-md border border-border px-2 py-1 text-[12px] text-foreground outline-none focus:border-ring"
					/>
				</div>
			</div>

			{isLoading && <AdminChartSkeleton />}
			{error && (
				<AdminStatsError
					message={error instanceof Error ? error.message : undefined}
					onRetry={refetch}
				/>
			)}

			{!isLoading && !error && (
				<>
					<div className="mb-3 flex gap-4">
						{SERIES_CONFIG.map((s) => (
							<button
								key={s.key}
								type="button"
								onClick={() => toggleHighlight(s.key)}
								className="flex cursor-pointer items-center gap-1.5"
							>
								<div
									className="size-2.5 rounded-sm transition-opacity"
									style={{
										background: s.color,
										opacity:
											highlighted && highlighted !== s.key
												? LEGEND_INACTIVE_OPACITY
												: 1,
									}}
								/>
								<span
									className="text-[11.5px] transition-colors"
									style={{
										color:
											highlighted === s.key
												? "var(--foreground)"
												: "var(--g-gray-400)",
										fontWeight:
											highlighted === s.key
												? LEGEND_ACTIVE_WEIGHT
												: LEGEND_INACTIVE_WEIGHT,
									}}
								>
									{s.label}
								</span>
							</button>
						))}
					</div>

					{series.length === 0 ? (
						<div
							className="flex items-center justify-center"
							style={{ height: EMPTY_STATE_HEIGHT }}
						>
							<p className="text-[13px] text-muted-foreground">
								No data for selected range
							</p>
						</div>
					) : (
						<ResponsiveContainer width="100%" height={CHART_HEIGHT}>
							<LineChart data={series} margin={CHART_MARGIN}>
								<CartesianGrid
									strokeDasharray="3 3"
									stroke="var(--border)"
									vertical={false}
								/>
								<XAxis
									dataKey="date"
									tick={{
										fontSize: AXIS_TICK_FONT_SIZE,
										fill: "var(--g-gray-400)",
									}}
									tickFormatter={(v: string) => formatDisplayDate(v)}
									tickLine={false}
									axisLine={false}
									interval="preserveStartEnd"
								/>
								<YAxis
									tick={{
										fontSize: AXIS_TICK_FONT_SIZE,
										fill: "var(--g-gray-400)",
									}}
									tickLine={false}
									axisLine={false}
									allowDecimals={false}
								/>
								<Tooltip
									contentStyle={TOOLTIP_STYLE}
									labelStyle={TOOLTIP_LABEL_STYLE}
									labelFormatter={(label: string) => formatDisplayDate(label)}
								/>
								{SERIES_CONFIG.map((s) => (
									<Line
										key={s.key}
										type="monotone"
										dataKey={s.key}
										name={s.label}
										stroke={s.color}
										strokeWidth={
											highlighted === s.key
												? LINE_HIGHLIGHTED_STROKE
												: LINE_DEFAULT_STROKE
										}
										strokeOpacity={
											!highlighted || highlighted === s.key
												? 1
												: LINE_DIMMED_OPACITY
										}
										dot={false}
										activeDot={{ r: 4 }}
									/>
								))}
							</LineChart>
						</ResponsiveContainer>
					)}
				</>
			)}
		</div>
	);
}
