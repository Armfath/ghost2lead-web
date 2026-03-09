"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useLeads, leadsKeys } from "@/hooks/queries";
import { useState } from "react";
import { AiEnrichIcon } from "@/components/ui/ai-enrich-icon";
import { Button } from "@/components/ui/button";
import { VisitorProfileModal } from "@/components/features/admin/visitor-profile-modal";
import { Checkbox } from "@/components/ui/checkbox";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/ui/table-pagination";
import { PAGE_SIZE_OPTIONS } from "@/constants/global";
import { formatDisplayDate } from "@/lib/utils";

function formatLeadIdDisplay(id: string): string {
	const segments = id.split("-");
	return segments[segments.length - 1] ?? id;
}

export function LeadsTable() {
	const queryClient = useQueryClient();
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
	const [pageSize, setPageSize] = useState(Number(PAGE_SIZE_OPTIONS[0]));
	const [profileLead, setProfileLead] = useState<LeadResponse | null>(null);

	const { data, isLoading, isError, error } = useLeads({
		page: currentPage,
		pageSize,
	});

	const items = data?.items ?? [];
	const pagination = data?.pagination;
	const totalPages = pagination
		? Math.max(1, Math.ceil(pagination.total / pagination.page_size))
		: 1;

	const paginatedLeads = items;

	const allOnPageSelected =
		paginatedLeads.length > 0 &&
		paginatedLeads.every((lead) => selectedIds.has(lead.id));

	function handleSelectAll(checked: boolean) {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			for (const lead of paginatedLeads) {
				if (checked) {
					next.add(lead.id);
				} else {
					next.delete(lead.id);
				}
			}
			return next;
		});
	}

	function handleSelectOne(id: string, checked: boolean) {
		setSelectedIds((prev) => {
			const next = new Set(prev);
			if (checked) {
				next.add(id);
			} else {
				next.delete(id);
			}
			return next;
		});
	}

	function handlePageSizeChange(value: string) {
		setPageSize(Number(value));
		setCurrentPage(1);
	}

	if (isLoading) {
		return (
			<div className="rounded-lg border border-border px-5 py-8 text-center text-muted-foreground">
				Loading leads…
			</div>
		);
	}

	if (isError) {
		return (
			<div className="rounded-lg border border-border px-5 py-8 text-center text-destructive">
				{error instanceof Error ? error.message : "Failed to load leads"}
			</div>
		);
	}

	return (
		<div className="rounded-lg border border-border">
			<div className="px-5 py-4">
				<h2 className="text-body font-semibold text-foreground">Leads</h2>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-12 pl-5">
							<Checkbox
								checked={allOnPageSelected}
								onCheckedChange={(checked) => handleSelectAll(checked === true)}
								aria-label="Select all leads"
							/>
						</TableHead>
						<TableHead>ID</TableHead>
						<TableHead>Enriched At</TableHead>
						<TableHead className="text-right pr-5">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedLeads.map((lead) => (
						<TableRow key={lead.id}>
							<TableCell className="pl-5">
								<Checkbox
									checked={selectedIds.has(lead.id)}
									onCheckedChange={(checked) =>
										handleSelectOne(lead.id, checked === true)
									}
									aria-label={`Select lead #${formatLeadIdDisplay(lead.id)}`}
								/>
							</TableCell>
							<TableCell className="font-medium">#{formatLeadIdDisplay(lead.id)}</TableCell>
							<TableCell className="text-muted-foreground">
								{formatDisplayDate(lead.enriched_at, { includeTime: true })}
							</TableCell>
							<TableCell className="text-right pr-5">
								<Button
									variant="outline"
									size="sm"
									className="inline-flex items-center gap-2 text-body-sm"
									onClick={() => setProfileLead(lead)}
								>
									<AiEnrichIcon />
									<span>AI Enrich</span>
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			<TablePagination
				currentPage={currentPage}
				totalPages={totalPages}
				pageSize={pageSize}
				onPageChange={setCurrentPage}
				onPageSizeChange={handlePageSizeChange}
				className="flex items-center justify-between px-5 py-3 border-t border-border"
			/>
			{profileLead && (
				<VisitorProfileModal
					lead={profileLead}
					open={Boolean(profileLead)}
					onOpenChange={(open) => !open && setProfileLead(null)}
					onLeadUpdated={(updated) => {
						setProfileLead(updated);
						queryClient.invalidateQueries({ queryKey: leadsKeys.all });
					}}
				/>
			)}
		</div>
	);
}
