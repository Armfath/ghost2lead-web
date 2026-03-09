"use client";

import { ChevronDown, RefreshCcwIcon, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { VisitorProfileEmptyState } from "@/components/features/admin/visitor-profile-empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { CONFIDENCE_STYLES, DEFAULT_BEHAVIORS } from "@/constants/lead";
import { cn, formatDisplayDate } from "@/lib/utils";
import { enrichLead } from "@/services/lead-service";

function StatChip({
	label,
	value,
	icon,
}: {
	label: string;
	value: number;
	icon: string;
}) {
	return (
		<div className="flex flex-1 flex-col gap-1.5 rounded-xl border border-[var(--g-gray-200)] bg-white p-4">
			<span className="text-[13px]">{icon}</span>
			<span className="text-[28px] font-extrabold leading-none text-[var(--g-black)]">
				{value}
			</span>
			<span className="text-[11px] font-medium uppercase tracking-widest text-[var(--g-gray-400)]">
				{label}
			</span>
		</div>
	);
}

function ActionCard({
	action,
	reasoning,
	index,
}: {
	action: string;
	reasoning: string;
	index: number;
}) {
	const [open, setOpen] = useState(false);
	return (
		<button
			type="button"
			onClick={() => setOpen((prev) => !prev)}
			className={cn(
				"w-full overflow-hidden rounded-xl border text-left transition-all duration-200",
				open
					? "border-[var(--g-accent-mid)] bg-[var(--g-accent-light)]"
					: "border-[var(--g-gray-200)] bg-white",
			)}
		>
			<div className="flex items-start gap-3 px-4 py-3.5">
				<div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--g-accent)] text-[11px] font-extrabold text-white">
					{index + 1}
				</div>
				<p className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-[var(--g-black)]">
					{action}
				</p>
				<ChevronDown
					aria-hidden
					className={cn(
						"size-4 shrink-0 text-[var(--g-gray-400)] transition-transform",
						open && "rotate-180",
					)}
				/>
			</div>
			{open && (
				<div className="border-t border-[var(--g-accent-mid)] px-4 pb-3.5 pt-3 pl-[52px] text-[12px] leading-relaxed text-[var(--g-gray-600)]">
					<span className="font-bold text-[var(--g-accent)]">Why:</span>{" "}
					{reasoning}
				</div>
			)}
		</button>
	);
}

function TimelineRow({
	label,
	value,
	highlight = false,
}: {
	label: string;
	value: string;
	highlight?: boolean;
}) {
	return (
		<div className="flex items-center justify-between border-b border-[var(--g-gray-100)] py-2">
			<span className="text-[12px] font-medium text-[var(--g-gray-400)]">
				{label}
			</span>
			<span
				className={cn(
					"text-[12px] font-semibold",
					highlight ? "text-[var(--g-accent)]" : "text-[var(--g-black)]",
				)}
			>
				{value}
			</span>
		</div>
	);
}

interface VisitorProfileModalProps {
	lead: LeadResponse;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onLeadUpdated?: (lead: LeadResponse) => void;
}

export function VisitorProfileModal({
	lead,
	open,
	onOpenChange,
	onLeadUpdated,
}: VisitorProfileModalProps) {
	const behaviors = lead.behaviors ?? DEFAULT_BEHAVIORS;
	const profile = lead.profile;
	const actions = lead.actions ?? [];
	const isEnriched = Boolean(lead.enriched_at);
	const [tab, setTab] = useState<"overview" | "actions">("overview");
	const [isEnriching, setIsEnriching] = useState(false);

	async function handleEnrich() {
		setIsEnriching(true);
		try {
			const updated = await enrichLead(lead.id);
			onLeadUpdated?.(updated);
			toast.success("Visitor analyzed successfully");
		} catch (err) {
			const message =
				err && typeof err === "object" && "message" in err
					? String((err as { message: unknown }).message)
					: "Enrichment failed";
			toast.error(message);
		} finally {
			setIsEnriching(false);
		}
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent
				showCloseButton={false}
				className="max-h-[90vh] max-w-[560px] overflow-y-auto rounded-[20px] border-[1.5px] border-[var(--g-accent-mid)] p-0 shadow-[0_32px_80px_rgba(232,97,58,0.12),0_8px_24px_rgba(0,0,0,0.1)]"
			>
				<DialogTitle className="sr-only">Visitor Profile</DialogTitle>
				<div className="relative">
					<div
						className="rounded-t-[20px] border-b border-[var(--g-gray-100)] px-6 pt-5"
						style={{
							background: `linear-gradient(135deg, var(--g-accent-light) 0%, #fff 60%)`,
						}}
					>
						<div className="mb-4 flex items-start justify-between">
							<div className="flex items-center gap-2">
								<Sparkles
									aria-hidden
									className="size-[18px] text-[var(--g-accent)]"
								/>
								<span className="text-[12px] font-bold uppercase tracking-widest text-[var(--g-accent)]">
									Visitor Profile
								</span>
							</div>
							<Button
								variant="outline"
								size="icon-sm"
								rounded="pill"
								onClick={() => onOpenChange(false)}
								aria-label="Close"
							>
								✕
							</Button>
						</div>
						<div className={cn("mb-5", isEnriched && "mb-4")}>
							<div className="mb-2 flex flex-wrap items-center gap-2">
								{isEnriched &&
									profile &&
									(() => {
										const config =
											CONFIDENCE_STYLES[profile.confidence] ??
											CONFIDENCE_STYLES.Low;
										return (
											<Badge
												className="rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider"
												style={{
													color: config.color,
													background: config.bg,
													borderColor: "transparent",
												}}
											>
												<span
													className="mr-1 inline-block h-1.5 w-1.5 rounded-full"
													style={{ background: config.dot }}
												/>
												{config.label}
											</Badge>
										);
									})()}
								<Badge
									variant="secondary"
									className="rounded-full px-2.5 py-0.5 text-[11px] font-bold normal-case text-[var(--g-gray-600)]"
								>
									ID: {lead.id}
								</Badge>
							</div>
							{isEnriched && profile && (
								<>
									<h2 className="mb-1 text-[19px] font-extrabold leading-tight text-[var(--g-black)]">
										{profile.persona}
									</h2>
									<p className="text-[13px] leading-snug text-[var(--g-gray-600)]">
										<span className="font-bold text-[var(--g-accent)]">
											Primary objection:{" "}
										</span>
										{profile.primary_objection}
									</p>
								</>
							)}
						</div>
						{isEnriched && (
							<div className="-mb-px flex gap-1">
								{[
									["overview", "Overview"] as const,
									["actions", `Actions (${actions.length})`] as const,
								].map(([key, label]) => (
									<button
										key={key}
										type="button"
										onClick={() => setTab(key)}
										className={cn(
											"rounded-t-[10px] px-4 py-2 text-[13px] font-semibold transition-colors",
											tab === key
												? "bg-white text-[var(--g-black)] shadow-[inset_0_-2px_0_0_var(--g-accent)]"
												: "text-[var(--g-gray-400)]",
										)}
									>
										{label}
									</button>
								))}
							</div>
						)}
					</div>
					<div className="px-6 py-5 pb-6">
						{!isEnriched && (
							<VisitorProfileEmptyState
								firstSeenAt={behaviors.first_visit_at}
								onAnalyzeClick={handleEnrich}
								isAnalyzing={isEnriching}
							/>
						)}
						{isEnriched && tab === "overview" && profile && (
							<div className="flex flex-col gap-5">
								<div className="rounded-xl border-l-[3px] border-[var(--g-accent)] bg-[var(--g-accent-light)] p-4 pl-4">
									<p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[var(--g-accent)]">
										Strongest Signal
									</p>
									<p className="text-[13px] leading-snug text-[var(--g-black)]">
										{profile.strongest_signal}
									</p>
								</div>
								<div>
									<p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-[var(--g-gray-400)]">
										Engagement Activity
									</p>
									<div className="flex gap-2.5">
										<StatChip
											label="Homepage Visits"
											value={behaviors.homepage_visits}
											icon="🏠"
										/>
										<StatChip
											label="Pricing Page Views"
											value={behaviors.viewed_pricing}
											icon="💰"
										/>
									</div>
								</div>
								<div>
									<p className="mb-1 text-[11px] font-bold uppercase tracking-widest text-[var(--g-gray-400)]">
										Timeline
									</p>
									<div>
										<TimelineRow
											label="First visit"
											value={formatDisplayDate(behaviors.first_visit_at, {
												includeTime: true,
											})}
										/>
										<TimelineRow
											label="Last visit"
											value={formatDisplayDate(behaviors.last_visit_at, {
												includeTime: true,
											})}
										/>
										<TimelineRow
											label="Signed up"
											value={formatDisplayDate(behaviors.signed_up_at, {
												includeTime: true,
											})}
											highlight
										/>
										<TimelineRow
											label="Exported file"
											value={formatDisplayDate(behaviors.exported_file_at)}
										/>
										<TimelineRow
											label="Enriched at"
											value={formatDisplayDate(lead.enriched_at, {
												includeTime: true,
											})}
										/>
									</div>
								</div>
							</div>
						)}
						{isEnriched && tab === "actions" && (
							<div className="flex flex-col gap-2.5">
								<p className="mb-2 text-[13px] leading-snug text-[var(--g-gray-600)]">
									AI-suggested actions to convert this visitor. Tap each to see
									the reasoning.
								</p>
								{actions.map((actionItem, index) => (
									<ActionCard
										key={`${actionItem.action.slice(0, 40)}-${index}`}
										index={index}
										action={actionItem.action}
										reasoning={actionItem.reasoning}
									/>
								))}
							</div>
						)}
					</div>
					{isEnriched && (
						<div className="flex items-center justify-between border-t border-[var(--g-gray-100)] px-6 py-3">
							<span className="text-[11px] text-[var(--g-gray-400)]">
								Updated {formatDisplayDate(lead.updated_at)}
							</span>
							<Button
								variant="default"
								size="sm"
								rounded="pill"
								onClick={handleEnrich}
								disabled={isEnriching}
							>
								{isEnriching ? (
									<Spinner className="size-4 text-white" />
								) : (
									<RefreshCcwIcon className="size-4" />
								)}
								<span>{isEnriching ? "Analyzing…" : "Re-analyze Visitor"}</span>
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
