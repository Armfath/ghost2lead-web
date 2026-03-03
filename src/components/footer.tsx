import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
	return (
		<footer className="border-t border-[var(--g-gray-100)] pt-14 pb-8">
			<div className="max-w-[1100px] mx-auto px-6">
				<div className="flex items-center gap-2 mb-10">
					<Logo width={24} height={24} className="w-6 h-6" />
					<span className="font-semibold text-body text-(--g-accent)">
						Ghost2Lead
					</span>
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
					<div>
						<h4 className="text-body-sm font-semibold text-[var(--g-black)] mb-4">
							Product
						</h4>
						<Link
							href="/"
							className="block text-body-sm text-[var(--g-accent)] py-[3px] hover:opacity-70 transition-opacity"
						>
							Features
						</Link>
						<Link
							href="/"
							className="block text-body-sm text-[var(--g-accent)] py-[3px] hover:opacity-70 transition-opacity"
						>
							AI Personas
						</Link>
						<Link
							href="/pricing"
							className="block text-body-sm text-[var(--g-accent)] py-[3px] hover:opacity-70 transition-opacity"
						>
							Pricing
						</Link>
						<span className="block text-body-sm text-[var(--g-accent)] py-[3px] hover:opacity-70 transition-opacity cursor-pointer">
							Integrations
						</span>
						<span className="block text-body-sm text-[var(--g-accent)] py-[3px] hover:opacity-70 transition-opacity cursor-pointer">
							Changelog
						</span>
					</div>
					<div>
						<h4 className="text-body-sm font-semibold text-[var(--g-black)] mb-4">
							Company
						</h4>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							About
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Blog
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Careers
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Terms of Use
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Privacy Policy
						</span>
					</div>
					<div>
						<h4 className="text-body-sm font-semibold text-[var(--g-black)] mb-4">
							Founders
						</h4>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Case studies
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Docs
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							API reference
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Community
						</span>
					</div>
					<div>
						<h4 className="text-body-sm font-semibold text-[var(--g-black)] mb-4">
							Connect
						</h4>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							GitHub
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							Twitter/X
						</span>
						<span className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors cursor-pointer">
							LinkedIn
						</span>
						<a
							href="mailto:hello@ghost2lead.com"
							className="block text-body-sm text-[var(--g-gray-600)] py-[3px] hover:text-[var(--g-black)] transition-colors"
						>
							Email us
						</a>
					</div>
				</div>

				<div className="border-t border-[var(--g-gray-100)] pt-6 flex justify-between items-center">
					<span className="text-body-sm text-[var(--g-gray-400)]">
						{"© 2026 Ghost2Lead // All rights reserved"}
					</span>
				</div>
			</div>
		</footer>
	);
}
