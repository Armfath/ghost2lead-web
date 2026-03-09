import { Skeleton } from "@/components/ui/skeleton";

export function AdminKpiCardsSkeleton() {
	const CARD_KEYS = ["total", "signups", "analyzed", "pricing"] as const;
	return (
		<div className="grid grid-cols-2 gap-4 md:grid-cols-4">
			{CARD_KEYS.map((key) => (
				<div
					key={key}
					className="rounded-lg border border-border bg-card p-5 space-y-3"
				>
					<Skeleton className="h-3 w-24" />
					<Skeleton className="h-8 w-20" />
					<Skeleton className="h-3 w-16" />
				</div>
			))}
		</div>
	);
}

export function AdminStatsCardSkeleton() {
	return (
		<div className="rounded-lg border border-border bg-card p-5 space-y-3">
			<Skeleton className="h-4 w-36" />
			<Skeleton className="h-32 w-full" />
		</div>
	);
}

export function AdminChartSkeleton() {
	return (
		<div className="rounded-lg border border-border bg-card p-5 space-y-3">
			<Skeleton className="h-4 w-36" />
			<Skeleton className="h-48 w-full" />
		</div>
	);
}
