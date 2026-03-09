import { Button } from "@/components/ui/button";

interface AdminStatsErrorProps {
	message?: string;
	onRetry?: () => void;
}

export function AdminStatsError({ message, onRetry }: AdminStatsErrorProps) {
	const isUnauthorized = message === "UNAUTHORIZED";

	return (
		<div className="flex flex-col items-center justify-center gap-2.5 py-7 text-center">
			<span className="text-2xl">{isUnauthorized ? "🔒" : "⚠️"}</span>
			<p className="text-[13px] text-muted-foreground">
				{isUnauthorized
					? "Session expired — please log in again."
					: "Failed to load data."}
			</p>
			{!isUnauthorized && onRetry && (
				<Button variant="outline" size="sm" onClick={onRetry}>
					↻ Retry
				</Button>
			)}
		</div>
	);
}
