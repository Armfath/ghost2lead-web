import { Home, Users } from "lucide-react";
import { PAGES_URLS } from "@/config/pages";

export const USER_NAV_HOME: SidebarNavItem[] = [
	{ label: "Dashboard", href: PAGES_URLS.USER_DASHBOARD, icon: Home },
];

export const ADMIN_NAV_HOME: SidebarNavItem[] = [
	{ label: "Dashboard", href: PAGES_URLS.ADMIN_DASHBOARD, icon: Home },
];

export const ADMIN_NAV_MANAGE: SidebarNavItem[] = [
	{ label: "Users", href: "/users", icon: Users },
];
