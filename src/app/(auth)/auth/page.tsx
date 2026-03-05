import type { Metadata } from "next";
import Link from "next/link";
import { EmailForm } from "@/components/features/auth/email-form";

export const metadata: Metadata = {
	title: "Log in — Ghost2Lead",
	description: "Log in or sign up to Ghost2Lead. It's free.",
};

export default function AuthPage() {
	return (
		<>
			<h1 className="font-serif text-heading-sm tracking-tight mb-2.5 text-[var(--g-black)]">
				Welcome to Ghost2Lead
			</h1>
			<p className="text-sm text-[var(--g-gray-400)] mb-8">
				Log in or{" "}
				<span className="text-[var(--g-accent)] font-medium">sign up</span>
				{" — it's free"}
			</p>

			<EmailForm />

			<Link
				href="/"
				className="mt-5 inline-block text-xs text-[var(--g-gray-400)] hover:text-[var(--g-black)] transition-colors"
			>
				{"← Back to home"}
			</Link>
		</>
	);
}
