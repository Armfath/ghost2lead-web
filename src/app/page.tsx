import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { DashboardPreview } from "@/components/dashboard-preview";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { landingFaqs, landingFeatures } from "@/contents/landing";

export default function Home() {
	return (
		<main>
			<Navbar />

			{/* Hero */}
			<section className="text-center py-20 px-6 max-w-[720px] mx-auto">
				<div className="inline-flex items-center gap-2 px-3 py-[5px] pl-2 bg-[var(--g-white)] border border-[var(--g-gray-200)] rounded-full text-body-sm font-medium shadow-[var(--shadow)] fu">
					<span className="bg-[var(--g-accent)] text-[var(--g-white)] px-2 py-[2px] rounded-full text-body-sm font-bold tracking-[0.04em] uppercase">
						AI-Powered
					</span>
					Persona profiling is now live
				</div>
				<h1 className="font-serif text-heading md:text-hero leading-[1.1] tracking-tight mt-6 mb-4 fu d1 text-[var(--g-black)]">
					Turn ghost visitors
					<br />
					into real customers
				</h1>
				<p className="text-body text-[var(--g-gray-600)] leading-relaxed mb-8 max-w-[520px] mx-auto fu d2">
					Ghost2Lead tracks how anonymous visitors interact with your app, uses
					AI to build behavioral personas, and gives you practical conversion
					actions — so you know exactly who to target and how.
				</p>
				<div className="flex gap-3 justify-center flex-wrap fu d3">
					<Button asChild size="pill-lg" rounded="pill">
						<Link href="/auth">Start for free</Link>
					</Button>
					<Button asChild variant="outline" size="pill-lg" rounded="pill">
						<Link href="/pricing">See pricing</Link>
					</Button>
				</div>
			</section>

			{/* Dashboard Preview */}
			<DashboardPreview />

			{/* Stats Row */}
			<div className="grid grid-cols-2 md:grid-cols-4 border-t border-[var(--g-gray-100)] max-w-[900px] mx-auto px-6">
				<div className="py-8 px-6 border-r border-[var(--g-gray-100)] last:border-r-0">
					<div className="font-serif text-heading-sm text-[var(--g-accent)] mb-1.5">
						{"3×"}
					</div>
					<h3 className="text-body-sm font-semibold mb-1.5 text-[var(--g-black)]">
						More conversions
					</h3>
					<p className="text-body-sm text-[var(--g-gray-600)] leading-normal">
						Founders using Ghost2Lead convert 3x more anonymous visitors on
						average
					</p>
				</div>
				<div className="py-8 px-6 border-r border-[var(--g-gray-100)]">
					<div className="font-serif text-heading-sm text-[var(--g-accent)] mb-1.5">
						AI
					</div>
					<h3 className="text-body-sm font-semibold mb-1.5 text-[var(--g-black)]">
						Persona building
					</h3>
					<p className="text-body-sm text-[var(--g-gray-600)] leading-normal">
						Automatic behavioral profiling — no manual segmentation needed
					</p>
				</div>
				<div className="py-8 px-6 border-r border-[var(--g-gray-100)]">
					<div className="font-serif text-heading-sm text-[var(--g-accent)] mb-1.5">
						{"∞"}
					</div>
					<h3 className="text-body-sm font-semibold mb-1.5 text-[var(--g-black)]">
						Actionable insights
					</h3>
					<p className="text-body-sm text-[var(--g-gray-600)] leading-normal">
						Practical next-step suggestions tailored to each visitor type
					</p>
				</div>
				<div className="py-8 px-6">
					<div className="font-serif text-heading-sm text-[var(--g-accent)] mb-1.5">
						5m
					</div>
					<h3 className="text-body-sm font-semibold mb-1.5 text-[var(--g-black)]">
						Setup time
					</h3>
					<p className="text-body-sm text-[var(--g-gray-600)] leading-normal">
						Drop in one script tag and Ghost2Lead starts profiling instantly
					</p>
				</div>
			</div>

			{/* Features */}
			<section className="py-20">
				<div className="text-center mb-16">
					<div className="text-body-sm font-semibold tracking-[0.08em] uppercase text-[var(--g-accent)] mb-3">
						What you get
					</div>
					<h2 className="font-serif text-heading-sm md:text-heading leading-[1.1] tracking-tight mb-4 text-[var(--g-black)]">
						Every tool to convert
						<br />
						the invisible
					</h2>
					<p className="text-body text-[var(--g-gray-600)] leading-relaxed max-w-[460px] mx-auto">
						Built specifically for early-stage founders who can&apos;t afford to
						ignore any potential customer.
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[960px] mx-auto px-6">
					{landingFeatures.map((feature) => (
						<div
							key={feature.title}
							className="bg-[var(--g-white)] border border-[var(--g-gray-200)] rounded-[var(--r-lg)] px-7 py-8 shadow-[var(--shadow)] transition-all hover:shadow-[var(--lift)] hover:-translate-y-0.5"
						>
							<div className="w-11 h-11 rounded-[var(--r-md)] bg-[var(--g-accent-light)] grid place-items-center text-heading-sm mb-5">
								{feature.icon}
							</div>
							<h3 className="text-body font-semibold mb-2.5 text-[var(--g-black)]">
								{feature.title}
							</h3>
							<p className="text-body-sm text-[var(--g-gray-600)] leading-relaxed">
								{feature.desc}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 bg-[var(--g-gray-50)]">
				<div className="max-w-[900px] mx-auto px-6">
					<div className="text-center mb-16">
						<div className="text-body-sm font-semibold tracking-[0.08em] uppercase text-[var(--g-accent)] mb-3">
							How it works
						</div>
						<h2 className="font-serif text-heading-sm md:text-heading leading-[1.1] tracking-tight mb-4 text-[var(--g-black)]">
							From ghost to lead
							<br />
							in three steps
						</h2>
						<p className="text-body text-[var(--g-gray-600)] leading-relaxed max-w-[460px] mx-auto">
							Ghost2Lead does the heavy lifting — you just act on the
							recommendations.
						</p>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
						{/* Connecting line (desktop only) */}
						<div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-px bg-[linear-gradient(90deg,var(--g-accent-mid),var(--g-accent-light))] z-0" />

						<div className="text-center relative z-10">
							<div className="w-14 h-14 rounded-full bg-[var(--g-white)] border-2 border-[var(--g-accent-mid)] grid place-items-center mx-auto mb-5 font-serif text-heading-sm text-[var(--g-accent)] shadow-[var(--shadow)]">
								1
							</div>
							<h3 className="text-body font-semibold mb-2 text-[var(--g-black)]">
								Install the tracker
							</h3>
							<p className="text-body-sm text-[var(--g-gray-600)] leading-relaxed">
								Add a single script tag to your app. Ghost2Lead starts capturing
								behavioral data from every visitor immediately — no
								configuration needed.
							</p>
						</div>
						<div className="text-center relative z-10">
							<div className="w-14 h-14 rounded-full bg-[var(--g-white)] border-2 border-[var(--g-accent-mid)] grid place-items-center mx-auto mb-5 font-serif text-heading-sm text-[var(--g-accent)] shadow-[var(--shadow)]">
								2
							</div>
							<h3 className="text-body font-semibold mb-2 text-[var(--g-black)]">
								AI builds personas
							</h3>
							<p className="text-body-sm text-[var(--g-gray-600)] leading-relaxed">
								Our AI interprets interaction patterns and automatically
								segments your ghost visitors into meaningful behavioral personas
								with intent scores.
							</p>
						</div>
						<div className="text-center relative z-10">
							<div className="w-14 h-14 rounded-full bg-[var(--g-white)] border-2 border-[var(--g-accent-mid)] grid place-items-center mx-auto mb-5 font-serif text-heading-sm text-[var(--g-accent)] shadow-[var(--shadow)]">
								3
							</div>
							<h3 className="text-body font-semibold mb-2 text-[var(--g-black)]">
								Act on suggestions
							</h3>
							<p className="text-body-sm text-[var(--g-gray-600)] leading-relaxed">
								Ghost2Lead hands you a prioritized list of conversion actions.
								Follow the playbook and watch your ghost visitor conversion rate
								climb.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ */}
			<FaqSection
				label="FAQ"
				title={"Frequently\nasked questions"}
				subtitle="Answers to the most common questions from early-stage founders."
				items={landingFaqs}
				supportText="Got more questions? Email us:"
			/>

			{/* CTA */}
			<CtaSection
				title={"Stop leaving\nleads on the table"}
				highlight="."
				subtitle="Join hundreds of early-stage founders already converting their ghost visitors."
			/>

			<Footer />
		</main>
	);
}
