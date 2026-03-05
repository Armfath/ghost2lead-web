import type { STORAGE_KEYS } from "@/constants";

declare global {
	type TStorageKeys = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
}
