import { AiEnrichIcon } from "@/components/ui/ai-enrich-icon";
import { Button } from "@/components/ui/button";
import { formatDisplayDate } from "@/lib/utils";

interface VisitorProfileEmptyStateProps {
	firstSeenAt: string | null;
}

export function VisitorProfileEmptyState({
	firstSeenAt,
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
			<Button variant="default" size="pill-md" rounded="pill" className="mt-1">
				<AiEnrichIcon />
				<span>Analyze this Visitor</span>
			</Button>
			<p className="text-[11px] text-[var(--g-gray-400)]">
				First seen {formatDisplayDate(firstSeenAt, { includeTime: true })}
			</p>
		</div>
	);
}
