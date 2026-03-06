"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PAGE_SIZE_OPTIONS } from "@/constants/global";

export interface TablePaginationProps {
	currentPage: number;
	totalPages: number;
	pageSize: number;
	pageSizeOptions?: string[];
	onPageChange: (page: number) => void;
	onPageSizeChange: (value: string) => void;
	className?: string;
}

export function TablePagination({
	currentPage,
	totalPages,
	pageSize = Number(PAGE_SIZE_OPTIONS[0]),
	pageSizeOptions = PAGE_SIZE_OPTIONS,
	onPageChange,
	onPageSizeChange,
	className,
}: TablePaginationProps) {
	const isPreviousDisabled = currentPage <= 1;
	const isNextDisabled = currentPage >= totalPages;

	function handlePreviousClick(event: React.MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();
		if (!isPreviousDisabled) {
			onPageChange(Math.max(1, currentPage - 1));
		}
	}

	function handleNextClick(event: React.MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();
		if (!isNextDisabled) {
			onPageChange(Math.min(totalPages, currentPage + 1));
		}
	}

	function handlePageClick(
		event: React.MouseEvent<HTMLAnchorElement>,
		page: number,
	) {
		event.preventDefault();
		onPageChange(page);
	}

	return (
		<div className={className}>
			<Pagination className="w-auto justify-start mx-[unset]">
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious
							href="#"
							onClick={handlePreviousClick}
							className={
								isPreviousDisabled
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>
					{Array.from({ length: totalPages }, (_, index) => index + 1).map(
						(page) => (
							<PaginationItem key={page}>
								<PaginationLink
									href="#"
									isActive={page === currentPage}
									onClick={(event) => handlePageClick(event, page)}
									className="cursor-pointer size-8 justify-center"
								>
									{page}
								</PaginationLink>
							</PaginationItem>
						),
					)}
					<PaginationItem>
						<PaginationNext
							href="#"
							onClick={handleNextClick}
							className={
								isNextDisabled
									? "pointer-events-none opacity-50"
									: "cursor-pointer"
							}
						/>
					</PaginationItem>
				</PaginationContent>
			</Pagination>

			<Select value={String(pageSize)} onValueChange={onPageSizeChange}>
				<SelectTrigger size="sm" className="w-auto gap-1">
					<SelectValue />
				</SelectTrigger>
				<SelectContent align="end">
					{pageSizeOptions.map((option) => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
