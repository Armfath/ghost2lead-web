import { API_ENDPOINTS } from "@/config";
import { post } from "@/lib/fetch";

const { CREATE } = API_ENDPOINTS.LEADS;

export async function getOrCreateLead(
	leadId?: string | null,
): Promise<LeadCreateResponse> {
	return post<LeadCreateResponse>(CREATE, {
		lead_id: leadId ?? undefined,
	});
}
