/** biome-ignore-all lint/suspicious/noConsole: console is used for logging in development */

import { envConfig } from "@/config";
import { APP_MODE } from "@/constants";

const isDev = envConfig.ENV === APP_MODE.DEV;

function noop() {}

/**
 * App logger: console only in development. Other modes are no-op for now.
 */
export const logger = {
	log: isDev ? (...args: unknown[]) => console.log(...args) : noop,
	warn: isDev ? (...args: unknown[]) => console.warn(...args) : noop,
	error: (...args: unknown[]) => console.error(...args),
	debug: isDev ? (...args: unknown[]) => console.debug(...args) : noop,
	info: isDev ? (...args: unknown[]) => console.info(...args) : noop,
};
