const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

function setCookie(name: string, value: string | boolean) {
	if (typeof document !== "undefined") {
		const expires = new Date();
		expires.setTime(expires.getTime() + COOKIE_MAX_AGE * 1000);
		const isProduction = process.env.NODE_ENV === "production";
		const secure = isProduction ? "; Secure" : "";
		// biome-ignore lint/suspicious/noDocumentCookie: document.cookie is required for browser cookie management
		document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; SameSite=Lax${secure}`;
	}
}

function getCookie(name: string, serverCookies?: ServerCookies): string | null {
	if (typeof document === "undefined" && serverCookies) {
		if (serverCookies instanceof Map) {
			return serverCookies.get(name) ?? null;
		}
		if (typeof serverCookies.get === "function") {
			return serverCookies.get(name)?.value ?? null;
		}
		return null;
	}

	if (typeof document === "undefined") return null;
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop()?.split(";").shift() ?? null;
	return null;
}

function deleteCookie(name: string) {
	if (typeof document !== "undefined") {
		// biome-ignore lint/suspicious/noDocumentCookie: document.cookie is required for browser cookie management
		document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
	}
}

export const storage = {
	setItem: (key: TStorageKeys, value: string | boolean) => {
		setCookie(key, value);
	},
	getItem: (key: TStorageKeys, serverCookies?: ServerCookies) => {
		return getCookie(key, serverCookies);
	},
	removeItem: (key: TStorageKeys) => {
		deleteCookie(key);
	},
};
