export {};

declare global {
	type ServerCookies =
		| Map<string, string>
		| { get: (key: string) => { value: string } | undefined };
}
