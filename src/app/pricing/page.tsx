import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "@/components/check-icon";
import { CtaSection } from "@/components/cta-section";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { pricingFaqs, proFeatures, starterFeatures } from "@/contents/pricing";

export const metadata: Metadata = {
	title: "Pricing — Ghost2Lead",
	description:
		"Start free. Upgrade when the leads start flowing. No credit card required.",
};

export default function PricingPage() {
	return (
		<main>
			<Navbar />

			{/* Header */}
			<div className="dot-bg py-[72px] px-6 text-center">
				<div className="text-body-sm font-semibold tracking-[0.08em] uppercase text-[var(--g-accent)] mb-4">
					Pricing
				</div>
				<h1 className="font-serif text-heading-sm md:text-heading leading-[1.1] tracking-tight text-[var(--g-black)]">
					Start free. Upgrade when
					<br />
					the leads start flowing.
				</h1>
				<p className="text-body text-[var(--g-gray-600)] leading-relaxed max-w-[460px] mx-auto mt-4">
					No credit card required. Cancel anytime.
				</p>
			</div>

			{/* Plans */}
			<section className="pb-24">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[780px] mx-auto px-6">
					{/* Starter */}
					<div className="bg-[var(--g-white)] border border-[var(--g-gray-200)] rounded-[var(--r-xl)] p-9 flex flex-col shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--lift)]">
						<div className="text-body-sm font-semibold text-[var(--g-gray-600)] mb-2">
							Starter
						</div>
						<div className="font-serif text-hero leading-none mb-1 text-[var(--g-black)]">
							$0
							<span className="text-body font-sans font-normal text-[var(--g-gray-400)]">
								{" "}
								/ month
							</span>
						</div>
						<p className="text-body-sm text-[var(--g-gray-600)] mt-2">
							Perfect for validating your idea
						</p>
						<div className="h-px bg-[var(--g-gray-100)] my-5" />
						{starterFeatures.map((feat) => (
							<div
								key={feat}
								className="flex items-start gap-2.5 text-body-sm text-[var(--g-gray-600)] py-1.5"
							>
								<CheckIcon className="shrink-0 mt-px text-[var(--g-accent)]" />
								{feat}
							</div>
						))}
						<div className="mt-auto pt-7">
							<Button
								asChild
								variant="outline"
								size="pill-md"
								rounded="pill"
								className="w-full"
							>
								<Link href="/auth">Start for free</Link>
							</Button>
						</div>
					</div>

					{/* Pro */}
					<div className="bg-[linear-gradient(160deg,#FDF3EC_0%,#FBE9DE_100%)] border border-[var(--g-accent-light)] rounded-[var(--r-xl)] p-9 flex flex-col shadow-[var(--shadow)] transition-shadow hover:shadow-[var(--lift)]">
						<div className="text-body-sm font-semibold text-[var(--g-accent)] mb-2">
							Pro
						</div>
						<div className="flex items-baseline gap-2">
							<span className="text-body-sm text-[var(--g-gray-400)] line-through">
								$59
							</span>
							<span className="font-serif text-hero leading-none text-[var(--g-black)]">
								$39
								<span className="text-body font-sans font-normal text-[var(--g-gray-400)]">
									{" "}
									/ month
								</span>
							</span>
						</div>
						<p className="text-body-sm text-[var(--g-gray-600)] mt-2">
							For founders serious about growth
						</p>
						<div className="h-px bg-[var(--g-accent)]/15 my-5" />
						{proFeatures.map((feat) => (
							<div
								key={feat}
								className="flex items-start gap-2.5 text-body-sm text-[var(--g-gray-600)] py-1.5"
							>
								<CheckIcon className="shrink-0 mt-px text-[var(--g-accent)]" />
								{feat}
							</div>
						))}
						<div className="mt-auto pt-7">
							<Button asChild size="pill-md" rounded="pill" className="w-full">
								<Link href="/auth">Get started</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<FaqSection
				label="FAQ"
				title={"Common\nquestions"}
				subtitle="Everything you need to know before getting started."
				items={pricingFaqs}
				supportText="Questions about pricing?"
			/>

			{/* CTA */}
			<CtaSection
				title={"Your next customer\nis already visiting"}
				highlight="."
				subtitle="Start identifying and converting ghost visitors today."
			/>

			<Footer />
		</main>
	);
}
