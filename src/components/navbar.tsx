"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
	{ href: "/", label: "Features" },
	{ href: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
	const pathname = usePathname();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<>
			<div className="bg-[var(--g-black)] text-[var(--g-white)] text-center text-body-sm font-medium px-3 py-2.5 sm:px-4">
				<strong className="text-[var(--g-accent-mid)]">New:</strong> AI Persona
				Builder v2 — deeper visitor profiling, smarter actions.
			</div>
			<nav className="sticky top-0 z-50 bg-[var(--g-white)]/88 backdrop-blur-[12px] border-b border-[var(--g-gray-100)]">
				<div className="flex items-center max-w-[1100px] mx-auto px-4 sm:px-6 h-14 gap-2 min-w-0">
					<Link
						href="/"
						className="flex items-center gap-2 font-semibold text-body mr-2 text-(--g-accent) shrink-0"
					>
						<Logo width={28} height={28} className="w-7 h-7 shrink-0" />
						<span className="truncate">Ghost2Lead</span>
					</Link>

					<div className="hidden md:flex gap-0.5 shrink-0">
						{NAV_LINKS.map(({ href, label }) => (
							<Link
								key={href}
								href={href}
								className={cn(
									"px-3 py-1.5 rounded-lg text-body-sm font-medium text-[var(--g-gray-600)] transition-colors hover:bg-[var(--g-gray-100)] hover:text-[var(--g-black)]",
									pathname === href &&
										"bg-[var(--g-gray-100)] text-[var(--g-black)]",
								)}
							>
								{label}
							</Link>
						))}
					</div>

					<div className="flex gap-1.5 sm:gap-2 items-center ml-auto shrink-0">
						<Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
							<SheetTrigger asChild>
								<Button
									variant="ghost"
									size="icon"
									className="md:hidden"
									aria-label="Open menu"
								>
									<MenuIcon className="size-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[min(320px,100vw-2rem)]">
								<SheetHeader>
									<SheetTitle className="sr-only">Menu</SheetTitle>
								</SheetHeader>
								<div className="flex flex-col gap-1 pt-4">
									{NAV_LINKS.map(({ href, label }) => (
										<Link
											key={href}
											href={href}
											onClick={() => setMobileOpen(false)}
											className={cn(
												"px-3 py-3 rounded-lg text-body font-medium text-[var(--g-gray-600)] transition-colors hover:bg-[var(--g-gray-100)] hover:text-[var(--g-black)]",
												pathname === href &&
													"bg-[var(--g-gray-100)] text-[var(--g-black)]",
											)}
										>
											{label}
										</Link>
									))}
									<div className="flex flex-col gap-2 mt-4 pt-4 border-t border-[var(--g-gray-100)]">
										<Button asChild variant="ghost" size="default" rounded="pill">
											<Link href="/auth" onClick={() => setMobileOpen(false)}>
												Log in
											</Link>
										</Button>
										<Button asChild size="default" rounded="pill">
											<Link href="/auth" onClick={() => setMobileOpen(false)}>
												Get started free
											</Link>
										</Button>
									</div>
								</div>
							</SheetContent>
						</Sheet>
						<div className="hidden md:flex gap-2 items-center">
							<Button asChild variant="ghost" size="pill-xs" rounded="pill">
								<Link href="/auth">Log in</Link>
							</Button>
							<Button asChild size="pill-sm" rounded="pill">
								<Link href="/auth">Get started free</Link>
							</Button>
						</div>
					</div>
				</div>
			</nav>
		</>
	);
}
