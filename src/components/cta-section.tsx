import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSection({
	title,
	highlight,
	subtitle,
}: {
	title: string;
	highlight?: string;
	subtitle: string;
}) {
	return (
		<section className="py-24 px-6 bg-[var(--g-gray-50)]">
			<div className="max-w-[900px] mx-auto bg-[var(--g-white)] border border-[var(--g-gray-200)] rounded-[var(--r-xl)] py-20 px-10 text-center shadow-[var(--shadow)] relative overflow-hidden">
				{/* Radial glow at bottom */}
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,var(--g-accent-light)_0%,transparent_70%)] pointer-events-none" />

				{/* Decorative circles */}
				<div className="absolute rounded-full border border-[var(--g-gray-200)] pointer-events-none w-[260px] h-[260px] top-1/2 -left-[60px] -translate-y-1/2" />
				<div className="absolute rounded-full border border-[var(--g-gray-200)] pointer-events-none w-[200px] h-[200px] top-1/2 -left-[90px] -translate-y-1/2" />
				<div className="absolute rounded-full border border-[var(--g-gray-200)] pointer-events-none w-[260px] h-[260px] top-1/2 -right-[60px] -translate-y-1/2" />
				<div className="absolute rounded-full border border-[var(--g-gray-200)] pointer-events-none w-[200px] h-[200px] top-1/2 -right-[90px] -translate-y-1/2" />

				<h2 className="font-serif text-heading-sm md:text-heading leading-[1.1] tracking-tight relative z-10 mb-3 text-[var(--g-black)] whitespace-pre-line">
					{title}
					{highlight && (
						<span className="text-[var(--g-accent)]">{highlight}</span>
					)}
				</h2>
				<p className="text-body text-[var(--g-gray-600)] mb-7 relative z-10">
					{subtitle}
				</p>
				<Button asChild size="pill-lg" rounded="pill" className="relative z-10">
					<Link href="/auth">Get started free</Link>
				</Button>
			</div>
		</section>
	);
}
