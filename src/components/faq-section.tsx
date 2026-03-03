"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface FaqItem {
	question: string;
	answer: string;
}

export function FaqSection({
	label,
	title,
	subtitle,
	items,
	supportText,
}: {
	label: string;
	title: string;
	subtitle: string;
	items: FaqItem[];
	supportText?: string;
}) {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	return (
		<section className="py-24">
			<div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16 items-start max-w-[900px] mx-auto px-6">
				<div>
					<div className="text-body-sm font-semibold tracking-[0.08em] uppercase text-[var(--g-accent)] mb-3">
						{label}
					</div>
					<h2 className="font-serif text-heading-sm md:text-heading leading-[1.1] tracking-tight mb-4 text-[var(--g-black)] whitespace-pre-line">
						{title}
					</h2>
					<p className="text-body text-[var(--g-gray-600)] leading-relaxed max-w-[460px]">
						{subtitle}
					</p>
				</div>
				<div>
					<div className="flex flex-col">
						{items.map((item, index) => {
							const isOpen = openIndex === index;

							return (
								<div
									key={item.question}
									className="border-b border-[var(--g-gray-100)]"
								>
									<Button
										type="button"
										variant="disclosure"
										onClick={() => setOpenIndex(isOpen ? null : index)}
									>
										{item.question}
										<span
											className={`shrink-0 w-5 h-5 rounded-full grid place-items-center text-body-sm transition-all ${
												isOpen
													? "bg-[var(--g-black)] text-[var(--g-white)] rotate-45"
													: "bg-[var(--g-gray-100)] text-[var(--g-black)]"
											}`}
										>
											+
										</span>
									</Button>
									<div
										className={`text-body-sm text-[var(--g-gray-600)] leading-[1.7] overflow-hidden transition-all duration-[350ms] ease-in-out ${
											isOpen ? "max-h-[200px] pb-4" : "max-h-0"
										}`}
									>
										{item.answer}
									</div>
								</div>
							);
						})}
					</div>
					{supportText && (
						<div className="mt-5 text-body-sm text-[var(--g-gray-400)] text-right">
							{supportText}
							<br />
							<a
								href="mailto:hello@ghost2lead.com"
								className="text-[var(--g-accent)] font-medium"
							>
								hello@ghost2lead.com
							</a>
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
