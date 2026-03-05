import { API_ENDPOINTS } from "@/config";
import { post } from "@/lib/fetch";

const { CREATE } = API_ENDPOINTS.LEADS;

export async function getOrCreateLead(
	leadId?: string | null,
): Promise<ApiSuccess<LeadCreateResponse>> {
	return post<ApiSuccess<LeadCreateResponse>>(CREATE, {
		lead_id: leadId ?? undefined,
	});
}
