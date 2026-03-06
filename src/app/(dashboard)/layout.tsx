import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PAGES_URLS } from "@/config/pages";
import { AUTH_FIELDS, USER_TYPES } from "@/constants/auth";
import { AppSidebar } from "@/layout/app-sidebar";
import { DashboardHeader } from "@/layout/dashboard-header";
import { getServerUserProfile } from "@/services/auth-service";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies();

	let user: UserRead;

	try {
		user = await getServerUserProfile(await cookieStore);
	} catch {
		redirect(PAGES_URLS.AUTH);
	}

	const isAdmin = user[AUTH_FIELDS.USER_TYPE] === USER_TYPES.ADMIN;

	return (
		<SidebarProvider>
			<AppSidebar isAdmin={isAdmin} />
			<SidebarInset>
				<DashboardHeader userEmail={user[AUTH_FIELDS.EMAIL]} />
				<div className="flex-1 px-6 py-6">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
