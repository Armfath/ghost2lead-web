import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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

		return (
			<main>
				<section className="pt-10 pb-6 px-6 max-w-[960px] mx-auto">
					<div className="flex items-baseline justify-between gap-4 flex-wrap">
						<div>
							<h1 className="font-serif text-heading-sm md:text-heading tracking-tight text-[var(--g-black)]">
								Admin dashboard
							</h1>
							<p className="mt-2 text-body-sm text-[var(--g-gray-600)] max-w-[520px]">
								Manage users, settings, and platform. Signed in as{" "}
								{user[AUTH_FIELDS.EMAIL]}.
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
