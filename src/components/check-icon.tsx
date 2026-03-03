export function CheckIcon({ className }: { className?: string }) {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 16 16"
			fill="none"
			className={className}
		>
			<title>Check icon</title>
			<circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
			<path
				d="M5 8l2 2 4-4"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
