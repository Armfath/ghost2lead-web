import posthog from "posthog-js";

import { STORAGE_KEYS } from "@/config";
import { ERROR_CODE } from "@/constants/api";
import { storage } from "@/lib/storage";
import { getOrCreateLead } from "@/services/lead-service";

const { getItem, setItem, removeItem } = storage;
const LEAD_ID_KEY = STORAGE_KEYS.LEAD_ID;

function persistLeadIdAndReturn(resolvedId: string): string {
	setItem(LEAD_ID_KEY, resolvedId);
	return resolvedId;
}

async function getOrCreateLeadFromBackend(
	leadId?: string | null,
): Promise<string | null> {
	try {
		const response = await getOrCreateLead(leadId);
		return persistLeadIdAndReturn(response.data.id);
	} catch (error) {
		const apiError = error as ApiError;
		if (apiError.error === ERROR_CODE.NOT_FOUND) {
			const response = await getOrCreateLead();
			return persistLeadIdAndReturn(response.data.id);
		}
		removeItem(LEAD_ID_KEY);
		throw error;
	}
}

export async function trackEventWithLead(
	eventName: TAnalyticsEvent,
): Promise<boolean> {
	const storedLeadId = getItem(LEAD_ID_KEY);
	const leadId = await getOrCreateLeadFromBackend(storedLeadId);

	if (!leadId) {
		return false;
	}

	posthog.identify(leadId);
	posthog.capture(eventName, { lead_id: leadId });

	return true;
}
