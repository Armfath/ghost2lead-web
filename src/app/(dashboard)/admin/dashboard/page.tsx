import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AdminDashboardStatsSection } from "@/components/features/admin/admin-dashboard-stats-section";
import { PAGES_URLS } from "@/config/pages";
import { AUTH_FIELDS, USER_TYPES } from "@/constants/auth";
import { getServerUserProfile } from "@/services/auth-service";

const { USER_TYPE } = AUTH_FIELDS;

export const metadata: Metadata = {
	title: "Overview — Ghost2Lead Admin",
	description: "Key metrics and analytics for Ghost2Lead.",
};

export default async function AdminOverviewPage() {
	const cookieStore = cookies();

	try {
		const user = await getServerUserProfile(await cookieStore);

		if (user[USER_TYPE] !== USER_TYPES.ADMIN) {
			redirect(PAGES_URLS.USER_DASHBOARD);
		}

		return (
			<section className="space-y-6">
				<div>
					<h1 className="font-serif text-heading-sm tracking-tight text-foreground">
						Overview
					</h1>
					<p className="mt-1 text-body-sm text-muted-foreground">
						Key metrics and analytics at a glance.
					</p>
				</div>

				<AdminDashboardStatsSection />
			</section>
		);
	} catch {
		redirect(PAGES_URLS.AUTH);
	}
}
