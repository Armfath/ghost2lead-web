import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LeadsTable } from "@/components/features/admin/leads-table";
import { PAGES_URLS } from "@/config/pages";
import { AUTH_FIELDS, USER_TYPES } from "@/constants/auth";
import { getServerUserProfile } from "@/services/auth-service";

const { USER_TYPE } = AUTH_FIELDS;

export const metadata: Metadata = {
	title: "Admin Dashboard — Ghost2Lead",
	description: "Manage Ghost2Lead: users, settings, and platform overview.",
};

export default async function AdminDashboardPage() {
	const cookieStore = cookies();

	try {
		const user = await getServerUserProfile(await cookieStore);

		if (user[USER_TYPE] !== USER_TYPES.ADMIN) {
			redirect(PAGES_URLS.USER_DASHBOARD);
		}

		const name =
			user.email.split("@")[0]?.charAt(0).toUpperCase() +
			(user.email.split("@")[0]?.slice(1) ?? "");

		return (
			<section className="space-y-6">
				<div className="flex items-start justify-between gap-4 flex-wrap">
					<div>
						<h1 className="font-serif text-heading-sm tracking-tight text-foreground">
							Dashboard
						</h1>
						<p className="mt-1 text-body-sm text-muted-foreground">
							{"Welcome back, "}
							{name}
							{"! Here's what's happening today."}
						</p>
					</div>
				</div>

				<LeadsTable />
			</section>
		);
	} catch {
		redirect(PAGES_URLS.AUTH);
	}
}
