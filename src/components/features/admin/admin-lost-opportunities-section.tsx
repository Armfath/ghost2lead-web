"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { useLostOpportunities } from "@/hooks/queries";
import { AdminStatsError } from "./admin-stats-error";
import { AdminStatsCardSkeleton } from "./admin-stats-skeletons";

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_BASELINE_PCT = 5;
const SLIDER_MIN_PCT = 1;
const SLIDER_MAX_PCT = 80;
const SLIDER_STEP = 1;

// ─── Sub-components ───────────────────────────────────────────────────────────
interface OperandBoxProps {
	eyebrow: string;
	value: string;
	sub: string;
	variant: "default" | "actual";
}

function OperandBox({ eyebrow, value, sub, variant }: OperandBoxProps) {
	const isActual = variant === "actual";
	return (
		<div
			className={
				isActual
					? "rounded-[14px] border border-emerald-200 bg-emerald-50 p-[18px_10px] text-center"
					: "rounded-[14px] border border-zinc-100 bg-zinc-50 p-[18px_10px] text-center"
			}
		>
			<p
				className={`mb-1 text-[10px] font-bold uppercase tracking-[0.08em] ${isActual ? "text-emerald-500" : "text-[var(--g-gray-400)]"}`}
			>
				{eyebrow}
			</p>
			<p
				className={`text-[30px] font-extrabold leading-none tracking-[-1.5px] ${isActual ? "text-emerald-500" : "text-zinc-600"}`}
			>
				{value}
			</p>
			<p
				className={`mt-1 text-[11px] font-medium ${isActual ? "text-emerald-300" : "text-[var(--g-gray-400)]"}`}
			>
				{sub}
			</p>
		</div>
	);
}

interface OpSymbolProps {
	symbol: string;
	variant: "default" | "equals";
}

function OpSymbol({ symbol, variant }: OpSymbolProps) {
	return (
		<div className="flex items-center justify-center px-2.5">
			<div
				className={
					variant === "equals"
						? "flex size-7 items-center justify-center rounded-full bg-red-50 text-[18px] font-bold text-red-500"
						: "flex size-7 items-center justify-center rounded-full bg-zinc-100 text-[15px] font-bold text-zinc-600"
				}
			>
				{symbol}
			</div>
		</div>
	);
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AdminLostOpportunitiesSection() {
	const [sliderPct, setSliderPct] = useState(DEFAULT_BASELINE_PCT);
	const [committedPct, setCommittedPct] = useState(DEFAULT_BASELINE_PCT);

	const { data, isLoading, error, refetch } = useLostOpportunities(
		committedPct / 100,
	);

	const lostSharePct = data
		? Math.round(
				(data.lost_signups / (data.expected_signups_at_baseline || 1)) * 100,
			)
		: 0;

	if (isLoading) return <AdminStatsCardSkeleton />;

	if (error) {
		return (
			<div className="rounded-lg border border-border bg-card p-5">
				<p className="mb-4 text-sm font-semibold text-foreground">
					Lost Opportunities
				</p>
				<AdminStatsError
					message={error instanceof Error ? error.message : undefined}
					onRetry={refetch}
				/>
			</div>
		);
	}

	if (!data) return null;

	return (
		<div className="rounded-lg border border-border bg-card p-5">
			{/* Header */}
			<div className="mb-[22px] flex flex-wrap items-center justify-between gap-2">
				<h2 className="text-[16px] font-bold tracking-[-0.3px] text-foreground">
					Lost Opportunities
				</h2>
				<span className="rounded-full bg-[var(--g-accent-light)] px-3 py-1 text-[12px] font-semibold text-[var(--g-accent)]">
					Adjustable baseline
				</span>
			</div>

			{/* Equation: Expected − Actual = LOST */}
			<div className="mb-4 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
				<OperandBox
					eyebrow="Expected"
					value={data.expected_signups_at_baseline.toLocaleString()}
					sub="at baseline"
					variant="default"
				/>
				<OpSymbol symbol="−" variant="default" />
				<OperandBox
					eyebrow="Actual"
					value={data.actual_signups.toLocaleString()}
					sub="signed up"
					variant="actual"
				/>
				<OpSymbol symbol="=" variant="equals" />

				{/* Result */}
				<div className="rounded-[14px] border-2 border-red-200 bg-red-50 p-[20px_10px] text-center">
					<p className="mb-1 text-[10px] font-bold uppercase tracking-[0.08em] text-red-500">
						Lost
					</p>
					<p className="text-[52px] font-extrabold leading-none tracking-[-3px] text-red-500">
						{data.lost_signups.toLocaleString()}
					</p>
					<p className="mt-1 text-[11px] font-semibold text-red-400">
						signups missed
					</p>
				</div>
			</div>

			{/* Loss rate strip */}
			<div className="mb-5 flex items-center justify-between rounded-[10px] bg-red-50 px-4 py-2.5">
				<div className="flex items-center gap-1.5">
					<div className="size-[7px] shrink-0 rounded-full bg-red-500" />
					<span className="text-[13px] font-semibold text-red-500">
						of expected signups were lost
					</span>
				</div>
				<span className="font-mono text-[17px] font-extrabold tracking-[-0.5px] text-red-500">
					{lostSharePct}%
				</span>
			</div>

			{/* Slider */}
			<div className="mb-5">
				<div className="mb-2.5 flex items-center justify-between">
					<span className="text-[13px] font-semibold text-foreground">
						Baseline Conversion Rate
					</span>
					<span className="font-mono text-[15px] font-extrabold tracking-[-0.5px] text-[var(--g-accent)]">
						{sliderPct}%
					</span>
				</div>
				<Slider
					min={SLIDER_MIN_PCT}
					max={SLIDER_MAX_PCT}
					step={SLIDER_STEP}
					value={[sliderPct]}
					onValueChange={([v]) => setSliderPct(v)}
					onValueCommit={([v]) => setCommittedPct(v)}
					className="[&_[data-slot=slider-range]]:bg-[var(--g-accent)] [&_[data-slot=slider-thumb]]:border-[var(--g-accent)]"
				/>
				<div className="mt-1.5 flex justify-between">
					<span className="text-[10.5px] text-[var(--g-gray-400)]">
						{SLIDER_MIN_PCT}%
					</span>
					<span className="text-[10.5px] text-[var(--g-gray-400)]">
						{SLIDER_MAX_PCT}%
					</span>
				</div>
			</div>

			{/* Mini cards */}
			<div className="grid grid-cols-2 gap-2.5">
				<div className="rounded-[12px] border border-zinc-100 bg-zinc-50 p-3.5">
					<p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-[var(--g-gray-400)]">
						Actual Signups
					</p>
					<p className="text-[26px] font-extrabold leading-none tracking-[-1px] text-zinc-600">
						{data.actual_signups.toLocaleString()}
					</p>
					<p className="mt-1 text-[11px] text-[var(--g-gray-400)]">
						from {data.total_leads.toLocaleString()} total leads
					</p>
				</div>
				<div className="rounded-[12px] border border-zinc-100 bg-zinc-50 p-3.5">
					<p className="mb-1.5 text-[11px] font-medium uppercase tracking-[0.05em] text-[var(--g-gray-400)]">
						Total Leads
					</p>
					<p className="text-[26px] font-extrabold leading-none tracking-[-1px] text-blue-500">
						{data.total_leads.toLocaleString()}
					</p>
					<p className="mt-1 text-[11px] text-[var(--g-gray-400)]">
						ghost visitors tracked
					</p>
				</div>
			</div>
		</div>
	);
}
