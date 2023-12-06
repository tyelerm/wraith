"use client";
import React from "react";
import { PersonIcon, WidthIcon, OpacityIcon,ClipboardIcon,ClockIcon, StarIcon,PlayIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavLinks() {
	const pathname = usePathname();

	const links = [
		{
			href: "/dashboard/leaderboardleaderboard",
			text: "Leaderboard",
			Icon: PersonIcon,
		},
		{
			href: "/dashboard/running",
			text: "Earn Points",
			Icon: StarIcon,
		},
		{
			href: "/dashboard/accounts",
			text: "Bridge",
			Icon: WidthIcon,
		},
		{
			href: "/dashboard/tasks",
			text: "Faucet",
			Icon: OpacityIcon,
		},
		{
			href: "/dashboard/events",
			text: "Docs",
			Icon: ClipboardIcon,
		},
	];

	return (
		<div className="space-y-5">
			{links.map((link, index) => {
				const Icon = link.Icon;
				return (
					<Link
						onClick={() =>
							document.getElementById("sidebar-close")?.click()
						}
						href={link.href}
						key={index}
						className={cn(
							"flex items-center gap-2 rounded-sm p-2",
							{
								" bg-green-500 dark:bg-green-700 text-white ":
									pathname === link.href,
							}
						)}
					>
						<Icon />
						{link.text}
					</Link>
				);
			})}
		</div>
	);
}
