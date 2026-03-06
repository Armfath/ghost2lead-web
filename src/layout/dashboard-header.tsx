"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PAGES_URLS } from "@/config/pages";
import { STORAGE_KEYS } from "@/constants";
import { storage } from "@/lib/storage";

interface DashboardHeaderProps {
	userEmail: string;
	userName?: string;
}

function getInitial(email: string, name?: string): string {
	if (name) return name.charAt(0).toUpperCase();
	return email.charAt(0).toUpperCase();
}

function getDisplayName(email: string, name?: string): string {
	if (name) return name;
	const localPart = email.split("@")[0] ?? email;
	return localPart.charAt(0).toUpperCase() + localPart.slice(1);
}

export function DashboardHeader({ userEmail, userName }: DashboardHeaderProps) {
	const router = useRouter();
	const initial = getInitial(userEmail, userName);
	const displayName = getDisplayName(userEmail, userName);

	function handleLogout() {
		storage.removeItem(STORAGE_KEYS.ACCESS_TOKEN_KEY);
		router.push(PAGES_URLS.AUTH);
	}

	return (
		<header className="flex items-center justify-between px-4 py-3 border-b border-border">
			<SidebarTrigger className="md:hidden" />
			<div className="flex-1" />

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<button
						type="button"
						className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<Avatar className="size-8 cursor-pointer">
							<AvatarFallback className="bg-secondary text-secondary-foreground text-body-sm font-medium">
								{initial}
							</AvatarFallback>
						</Avatar>
					</button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col items-center gap-3 py-4">
						<Avatar className="size-16">
							<AvatarFallback
								className="text-heading-sm font-medium"
								style={{
									background:
										"linear-gradient(135deg, var(--g-accent-light), var(--g-accent-mid))",
									color: "var(--g-black)",
								}}
							>
								{initial}
							</AvatarFallback>
						</Avatar>
						<span className="text-body font-medium text-foreground">
							{displayName}
						</span>
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						onClick={handleLogout}
						className="cursor-pointer text-destructive !hover:text-white"
					>
						<LogOut className="mr-2 size-4 hover:text-white" />
						<span>Log out</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
}
