"use client";

import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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

interface Event {
	id: number;
	code: string;
	name: string;
	createdAt: string;
}

const MOCK_EVENTS: Event[] = [
	{
		id: 1,
		code: "product_launch",
		name: "Product Launch",
		createdAt: "2025-03-01T10:00:00Z",
	},
	{
		id: 2,
		code: "webinar_signup",
		name: "Webinar Signup",
		createdAt: "2025-03-02T14:30:00Z",
	},
	{
		id: 3,
		code: "newsletter_open",
		name: "Newsletter Open",
		createdAt: "2025-03-03T09:15:00Z",
	},
	{
		id: 4,
		code: "demo_request",
		name: "Demo Request",
		createdAt: "2025-03-04T16:45:00Z",
	},
	{
		id: 5,
		code: "pricing_view",
		name: "Pricing View",
		createdAt: "2025-03-05T11:20:00Z",
	},
	{
		id: 6,
		code: "contact_form",
		name: "Contact Form",
		createdAt: "2025-03-05T13:00:00Z",
	},
	{
		id: 7,
		code: "download_pdf",
		name: "Download PDF",
		createdAt: "2025-03-05T15:30:00Z",
	},
	{
		id: 8,
		code: "trial_start",
		name: "Trial Start",
		createdAt: "2025-03-06T08:00:00Z",
	},
];

export function EventsTable() {
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(Number(PAGE_SIZE_OPTIONS[0]));

	const totalPages = Math.max(1, Math.ceil(MOCK_EVENTS.length / pageSize));

	const paginatedEvents = useMemo(() => {
		const start = (currentPage - 1) * pageSize;
		return MOCK_EVENTS.slice(start, start + pageSize);
	}, [currentPage, pageSize]);

	function handlePageSizeChange(value: string) {
		setPageSize(Number(value));
		setCurrentPage(1);
	}

	function handleEdit(event: Event) {
		console.log("Edit event", event.id);
	}

	function handleDelete(event: Event) {
		console.log("Delete event", event.id);
	}

	return (
		<div className="rounded-lg border border-border">
			<div className="px-5 py-4">
				<h2 className="text-body font-semibold text-foreground">Events</h2>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="pl-5">ID</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Code</TableHead>
						<TableHead>Created at</TableHead>
						<TableHead className="text-right pr-5">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedEvents.map((event) => (
						<TableRow key={event.id}>
							<TableCell className="pl-5 font-medium">#{event.id}</TableCell>
							<TableCell>{event.name}</TableCell>
							<TableCell>
								<code className="inline-flex items-center rounded-md border border-border bg-muted px-2 py-1 font-mono text-body-sm text-foreground">
									{event.code}
								</code>
							</TableCell>
							<TableCell className="text-muted-foreground">
								{formatDisplayDate(event.createdAt, { includeTime: true })}
							</TableCell>
							<TableCell className="text-right pr-5">
								<div className="inline-flex items-center gap-2">
									<Button
										variant="outline"
										size="sm"
										className="inline-flex items-center gap-2 text-body-sm"
										onClick={() => handleEdit(event)}
										aria-label={`Edit event ${event.name}`}
									>
										<Pencil className="size-3.5" />
										<span>Edit</span>
									</Button>
									<Button
										variant="outline"
										size="sm"
										className="inline-flex items-center gap-2 text-body-sm text-destructive hover:text-destructive"
										onClick={() => handleDelete(event)}
										aria-label={`Delete event ${event.name}`}
									>
										<Trash2 className="size-3.5" />
										<span>Delete</span>
									</Button>
								</div>
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
		</div>
	);
}
