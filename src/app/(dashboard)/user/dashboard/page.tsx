import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { EventsTable } from "@/components/features/admin/events-table";
import { ClickTracker } from "@/components/posthog";
import { PAGES_URLS } from "@/config/pages";
import { ANALYTICS_EVENTS } from "@/constants";
import { AUTH_FIELDS, USER_TYPES } from "@/constants/auth";
import { getServerUserProfile } from "@/services/auth-service";

const { USER_TYPE } = AUTH_FIELDS;

export const metadata: Metadata = {
	title: "Dashboard — Ghost2Lead",
	description:
		"See your ghost visitors, AI personas, and recommended conversion actions.",
};

export default async function UserDashboardPage() {
	const cookieStore = cookies();

	try {
		const user = await getServerUserProfile(await cookieStore);

		if (user[USER_TYPE] !== USER_TYPES.CUSTOMER) {
			redirect(PAGES_URLS.ADMIN_DASHBOARD);
		}

		const name =
			user.email.split("@")[0]?.charAt(0).toUpperCase() +
			(user.email.split("@")[0]?.slice(1) ?? "");

		return (
			<section>
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
					<ClickTracker eventName={ANALYTICS_EVENTS.EXPORTED_FILE}>
						<Plus className="size-4" />
						New Event
					</ClickTracker>
				</div>

				<div className="mt-6">
					<EventsTable />
				</div>
			</section>
		);
	} catch {
		redirect(PAGES_URLS.AUTH);
	}
}
