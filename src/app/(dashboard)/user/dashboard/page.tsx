import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PAGES_URLS } from "@/config/pages";
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

		return (
			<main>
				<section className="pt-10 pb-6 px-6 max-w-[960px] mx-auto">
					<div className="flex items-baseline justify-between gap-4 flex-wrap">
						<div>
							<h1 className="font-serif text-heading-sm md:text-heading tracking-tight text-[var(--g-black)]">
								Welcome back, {user.email}
							</h1>
							<p className="mt-2 text-body-sm text-[var(--g-gray-600)] max-w-[520px]">
								This is your Ghost2Lead home base. See how your anonymous
								visitors are behaving and which personas are most likely to
								convert!!!!
							</p>
						</div>
					</div>
				</section>
			</main>
		);
	} catch {
		redirect(PAGES_URLS.AUTH);
	}
}
