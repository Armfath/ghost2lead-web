import type { LucideIcon } from "lucide-react";
import type { STORAGE_KEYS } from "@/constants";

declare global {
	type TStorageKeys = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

	interface SidebarNavItem {
		label: string;
		href: string;
		icon: LucideIcon;
	}
}
