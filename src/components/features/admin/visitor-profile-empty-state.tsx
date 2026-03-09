import { AiEnrichIcon } from "@/components/ui/ai-enrich-icon";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { formatDisplayDate } from "@/lib/utils";

interface VisitorProfileEmptyStateProps {
	firstSeenAt: string | null;
	onAnalyzeClick?: () => void;
	isAnalyzing?: boolean;
}

export function VisitorProfileEmptyState({
	firstSeenAt,
	onAnalyzeClick,
	isAnalyzing = false,
}: VisitorProfileEmptyStateProps) {
	return (
		<div className="flex flex-col items-center gap-4 px-2 pt-4 text-center">
			<div className="flex h-16 w-16 items-center justify-center rounded-full border-[1.5px] border-dashed border-[var(--g-accent-mid)] bg-[var(--g-accent-light)] text-[26px]">
				🔍
			</div>
			<div>
				<h3 className="mb-1.5 text-[17px] font-extrabold text-[var(--g-black)]">
					No profile yet
				</h3>
				<p className="mx-auto max-w-[300px] text-[13px] leading-relaxed text-[var(--g-gray-600)]">
					This visitor hasn't been analyzed yet. Run an enrichment to uncover
					their persona, intent signals, and conversion actions.
				</p>
			</div>
			<Button
				variant="default"
				size="pill-md"
				rounded="pill"
				className="mt-1"
				onClick={onAnalyzeClick}
				disabled={isAnalyzing}
			>
				{isAnalyzing ? (
					<Spinner className="size-4 text-white" />
				) : (
					<AiEnrichIcon />
				)}
				<span>{isAnalyzing ? "Analyzing…" : "Analyze this Visitor"}</span>
			</Button>
			{isAnalyzing && (
				<p className="text-[11px] text-[var(--g-gray-500)]">
					This might take a moment.
				</p>
			)}
			<p className="text-[11px] text-[var(--g-gray-400)]">
				First seen {formatDisplayDate(firstSeenAt, { includeTime: true })}
			</p>
		</div>
	);
}
