import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
	className?: string;
	alt?: string;
	width?: number;
	height?: number;
};

export function Logo({
	className,
	alt = "Ghost2Lead",
	width = 28,
	height = 28,
}: LogoProps) {
	return (
		<Image
			src="/logo.svg"
			alt={alt}
			width={width}
			height={height}
			className={cn("shrink-0", className)}
		/>
	);
}
