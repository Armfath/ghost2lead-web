import { BarChart2, Home, Users } from "lucide-react";
import { PAGES_URLS } from "@/config/pages";

export const USER_NAV_HOME: SidebarNavItem[] = [
	{ label: "Dashboard", href: PAGES_URLS.USER_DASHBOARD, icon: Home },
];

export const ADMIN_NAV_HOME: SidebarNavItem[] = [
	{ label: "Dashboard", href: PAGES_URLS.ADMIN_DASHBOARD, icon: BarChart2 },
	{ label: "Leads", href: PAGES_URLS.ADMIN_LEADS, icon: Users },
];

export const ADMIN_NAV_MANAGE: SidebarNavItem[] = [
	{ label: "Users", href: "/users", icon: Users },
];
