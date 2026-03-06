"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
	ADMIN_NAV_HOME,
	ADMIN_NAV_MANAGE,
	USER_NAV_HOME,
} from "@/config/sidebar";

interface AppSidebarProps {
	isAdmin?: boolean;
}

export function AppSidebar({ isAdmin }: AppSidebarProps) {
	const pathname = usePathname();
	const homeItems = isAdmin ? ADMIN_NAV_HOME : USER_NAV_HOME;

	return (
		<Sidebar>
			<SidebarHeader className="px-4 pt-4 pb-2">
				<Image
					src="/logo-full.png"
					alt="Ghost2Lead"
					width={240}
					height={48}
					className="h-10 w-auto object-contain object-left"
					priority
				/>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Home</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{homeItems.map((item) => {
								const isActive = pathname === item.href;
								return (
									<SidebarMenuItem key={item.label}>
										<SidebarMenuButton asChild isActive={isActive}>
											<Link href={item.href}>
												<item.icon className="size-4" />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				{isAdmin && (
					<SidebarGroup>
						<SidebarGroupLabel>Manage</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								<SidebarMenuItem>
									<SidebarMenuSub>
										{ADMIN_NAV_MANAGE.map((item) => {
											const isActive = pathname === item.href;
											return (
												<SidebarMenuSubItem key={item.label}>
													<SidebarMenuSubButton asChild isActive={isActive}>
														<Link href={item.href}>
															<item.icon className="size-4" />
															<span>{item.label}</span>
														</Link>
													</SidebarMenuSubButton>
												</SidebarMenuSubItem>
											);
										})}
									</SidebarMenuSub>
								</SidebarMenuItem>
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				)}
			</SidebarContent>
		</Sidebar>
	);
}
