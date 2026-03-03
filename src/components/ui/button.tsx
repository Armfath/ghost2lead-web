import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive:
					"bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
				outline:
					"border-[1.5px] border-[var(--g-gray-200)] bg-transparent text-[var(--g-black)] shadow-xs hover:border-[var(--g-accent)] hover:bg-[var(--g-accent-light)]/30 hover:text-[var(--g-accent)] dark:bg-transparent dark:hover:bg-[var(--g-accent-light)]/20",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-secondary/80",
				ghost:
					"hover:bg-[var(--g-accent-light)]/40 hover:text-[var(--g-accent)] dark:hover:bg-[var(--g-accent-light)]/20",
				disclosure:
					"w-full justify-between text-left rounded-none h-auto py-[18px] gap-3 font-medium text-[var(--g-black)] hover:bg-transparent hover:text-[var(--g-accent)] dark:hover:bg-transparent transition-colors",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2 has-[>svg]:px-3",
				sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
				lg: "h-10 px-6 has-[>svg]:px-4",
				"pill-lg": "h-auto px-8 py-3.5",
				"pill-md": "h-auto px-6 py-[11px]",
				"pill-sm": "h-auto px-[18px] py-2",
				"pill-xs": "h-auto px-4 py-[7px]",
				icon: "size-9",
				"icon-sm": "size-8",
				"icon-lg": "size-10",
			},
			rounded: {
				default: "rounded-md",
				pill: "rounded-full",
				none: "rounded-none",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
			rounded: "default",
		},
		compoundVariants: [
			{
				variant: "default",
				rounded: "pill",
				class:
					"font-semibold hover:shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:-translate-y-px active:translate-y-0",
			},
			{
				variant: "outline",
				rounded: "pill",
				class: "font-semibold hover:-translate-y-px active:translate-y-0",
			},
			{
				variant: "ghost",
				rounded: "pill",
				class:
					"hover:bg-transparent dark:hover:bg-transparent text-[var(--g-gray-600)] hover:text-[var(--g-accent)]",
			},
		],
	},
);

function Button({
	className,
	variant,
	size,
	rounded,
	asChild = false,
	...props
}: React.ComponentProps<"button"> &
	VariantProps<typeof buttonVariants> & {
		asChild?: boolean;
	}) {
	const Comp = asChild ? Slot : "button";

	return (
		<Comp
			data-slot="button"
			className={cn(buttonVariants({ variant, size, rounded, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
