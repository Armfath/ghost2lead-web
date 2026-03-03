import "@/styles/globals-custom.css";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600"],
	variable: "--font-dm-sans",
});

const instrumentSerif = Instrument_Serif({
	subsets: ["latin"],
	weight: ["400"],
	style: ["normal", "italic"],
	variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
	title: "Ghost2Lead — Turn ghost visitors into real customers",
	description:
		"Ghost2Lead tracks how anonymous visitors interact with your app, uses AI to build behavioral personas, and gives you practical conversion actions.",
	icons: {
		icon: "/logo.svg",
		apple: "/logo.svg",
	},
};

export const viewport: Viewport = {
	themeColor: "#0D0D0D",
	width: "device-width",
	initialScale: 1,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${dmSans.variable} ${instrumentSerif.variable}`}
		>
			<body className="font-sans antialiased">
				{children}
				<Toaster />
				<Analytics />
			</body>
		</html>
	);
}
