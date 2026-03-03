export function DashboardPreview() {
	return (
		<div className="max-w-[900px] mx-auto mb-20 px-6 fu d4">
			<div className="rounded-[var(--r-xl)] overflow-hidden border border-[var(--g-gray-200)] shadow-[var(--lift)] bg-[linear-gradient(135deg,#0f0f1a_0%,#1a1225_40%,#2a1008_100%)] p-5">
				{/* Top bar */}
				<div className="flex items-center gap-1.5 mb-4">
					<span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
					<span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
					<span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
					<span className="mx-auto text-[11px] font-semibold text-white/40">
						Ghost2Lead — Visitor Intelligence
					</span>
				</div>

				<div className="flex gap-3">
					{/* Sidebar */}
					<div className="w-[136px] shrink-0 bg-white/5 rounded-[var(--r-md)] p-3 hidden md:flex flex-col gap-1">
						<SidebarItem label="Dashboard" active />
						<SidebarItem label="Ghost Visitors" />
						<SidebarItem label="AI Personas" isNew />
						<SidebarItem label="Actions" />
						<div className="h-px bg-white/[0.07] my-1.5" />
						<SidebarItem label="Segments" />
						<SidebarItem label="Integrations" />
						<SidebarItem label="Analytics" />
						<div className="h-px bg-white/[0.07] my-1.5" />
						<SidebarItem label="Settings" />
					</div>

					{/* Main */}
					<div className="flex-1 flex flex-col gap-2.5 min-w-0">
						{/* Stats */}
						<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
							<StatCard
								label="Ghost Visitors"
								value="4,821"
								change="12.4%"
								up
							/>
							<StatCard label="Profiled" value="2,345" change="8.1%" up />
							<StatCard label="Conversion" value="6.8%" change="2.3%" up />
							<StatCard label="Avg. Score" value="74/100" change="5pts" up />
						</div>

						{/* Bottom */}
						<div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-2.5">
							{/* Chart */}
							<div className="bg-white/[0.04] rounded-lg p-3">
								<div className="text-[9px] font-semibold text-white/45 mb-2">
									Visitor engagement — this month
								</div>
								<svg
									className="w-full"
									viewBox="0 0 320 70"
									preserveAspectRatio="none"
									height="70"
								>
									<title>Visitor engagement chart</title>
									<defs>
										<linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
											<stop offset="0%" stopColor="#6e7de8" stopOpacity="0.6" />
											<stop offset="100%" stopColor="#6e7de8" stopOpacity="0" />
										</linearGradient>
										<linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="0%"
												stopColor="#e8622a"
												stopOpacity="0.35"
											/>
											<stop offset="100%" stopColor="#e8622a" stopOpacity="0" />
										</linearGradient>
									</defs>
									<path
										d="M0 55 C25 50 40 25 70 30 S110 45 140 20 S190 35 220 15 S270 28 320 12 L320 70 L0 70Z"
										fill="url(#g1)"
									/>
									<path
										d="M0 55 C25 50 40 25 70 30 S110 45 140 20 S190 35 220 15 S270 28 320 12"
										fill="none"
										stroke="#6e7de8"
										strokeWidth="1.5"
									/>
									<path
										d="M0 62 C35 58 60 48 90 44 S135 54 175 40 S240 50 280 36 S305 44 320 32 L320 70 L0 70Z"
										fill="url(#g2)"
									/>
									<path
										d="M0 62 C35 58 60 48 90 44 S135 54 175 40 S240 50 280 36 S305 44 320 32"
										fill="none"
										stroke="#e8622a"
										strokeWidth="1.5"
										strokeDasharray="4 3"
									/>
								</svg>
							</div>

							{/* Personas */}
							<div className="bg-white/[0.04] rounded-lg p-3">
								<div className="text-[9px] font-semibold text-white/45 mb-2">
									Top AI Personas
								</div>
								<PersonaRow
									initials="SC"
									name="Solo Founder"
									type="High intent · SaaS"
									score="92"
								/>
								<PersonaRow
									initials="GM"
									name="Growth Marketer"
									type="Medium intent · B2B"
									score="78"
								/>
								<PersonaRow
									initials="TC"
									name="Tech Curious"
									type="Low intent · Explorer"
									score="41"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function SidebarItem({
	label,
	active,
	isNew,
}: {
	label: string;
	active?: boolean;
	isNew?: boolean;
}) {
	return (
		<div
			className={`py-[7px] px-2.5 rounded-lg text-[10px] font-medium ${
				active ? "bg-white/10 text-white/90" : "text-white/40"
			}`}
		>
			{label}
			{isNew && (
				<span className="text-[8px] bg-[rgba(232,98,42,0.4)] text-[#f4a87c] rounded px-1 py-px ml-1">
					AI
				</span>
			)}
		</div>
	);
}

function StatCard({
	label,
	value,
	change,
	up,
}: {
	label: string;
	value: string;
	change: string;
	up?: boolean;
}) {
	return (
		<div className="bg-white/[0.06] rounded-lg px-3 py-2.5">
			<div className="text-[9px] text-white/40 mb-1">{label}</div>
			<div className="text-sm font-bold text-white">{value}</div>
			<div
				className={`text-[8px] inline-block mt-1 px-[5px] py-px rounded ${
					up
						? "bg-[rgba(40,200,100,0.2)] text-[#5de898]"
						: "bg-[rgba(255,80,80,0.2)] text-[#ff7979]"
				}`}
			>
				{up ? "↑" : "↓"} {change}
			</div>
		</div>
	);
}

function PersonaRow({
	initials,
	name,
	type,
	score,
}: {
	initials: string;
	name: string;
	type: string;
	score: string;
}) {
	return (
		<div className="flex items-center gap-1.5 py-[5px] border-b border-white/5">
			<div className="w-5 h-5 rounded-full bg-[linear-gradient(135deg,#e8622a,#f4a87c)] grid place-items-center text-[8px] text-white font-bold shrink-0">
				{initials}
			</div>
			<div className="flex-1 min-w-0">
				<div className="text-[9px] font-semibold text-white/80">{name}</div>
				<div className="text-[8px] text-white/40">{type}</div>
			</div>
			<div className="text-[9px] font-bold text-[#5de898]">{score}</div>
		</div>
	);
}
